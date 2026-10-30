/**
 * githubApi.js
 * Commits project data + images directly to the GitHub repo.
 * Vercel auto-deploys on every push → changes go live in ~1-2 minutes.
 */

const REPO_OWNER = 'sarjanthecoder';
const REPO_NAME  = 'solar';
const DATA_PATH  = 'public/data/admin-projects.json';
const IMG_DIR    = 'public/images/projects';
const BRANCH     = 'main';

const API = 'https://api.github.com';

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

/* ── Validate token has repo access ── */
export async function validateToken(token) {
  try {
    const res = await fetch(`${API}/repos/${REPO_OWNER}/${REPO_NAME}`, {
      headers: headers(token),
    });
    return res.ok;
  } catch { return false; }
}

/* ── Read the projects JSON from repo ── */
export async function readProjects(token) {
  try {
    const res = await fetch(
      `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_PATH}?ref=${BRANCH}`,
      { headers: headers(token) }
    );
    if (res.status === 404) return { projects: [], sha: null };
    if (!res.ok) throw new Error('Failed to read projects');
    const data = await res.json();
    const content = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))));
    return { projects: JSON.parse(content), sha: data.sha };
  } catch { return { projects: [], sha: null }; }
}

/* ── Write projects JSON to repo ── */
export async function writeProjects(token, projects, sha) {
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(projects, null, 2))));
  const body = {
    message: `[Admin] Update projects — ${new Date().toLocaleDateString('en-IN')}`,
    content,
    branch: BRANCH,
    ...(sha ? { sha } : {}),
  };
  const res = await fetch(
    `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_PATH}`,
    { method: 'PUT', headers: headers(token), body: JSON.stringify(body) }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to save projects');
  }
  const result = await res.json();
  return result.content.sha; // return new SHA for next update
}

/* ── Upload image to repo and return its public URL ── */
export async function uploadImage(token, base64DataUrl, projectId) {
  // Extract raw base64 from data URL
  const [meta, base64Content] = base64DataUrl.split(',');
  const ext = meta.match(/image\/(jpeg|jpg|png|webp|gif)/)?.[1] || 'jpg';
  const filename = `project-${projectId}.${ext}`;
  const path = `${IMG_DIR}/${filename}`;

  // Check if file already exists (get SHA for overwrite)
  let existingSha = null;
  try {
    const check = await fetch(
      `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,
      { headers: headers(token) }
    );
    if (check.ok) {
      const existing = await check.json();
      existingSha = existing.sha;
    }
  } catch (_) {}

  const body = {
    message: `[Admin] Upload project image ${filename}`,
    content: base64Content,
    branch: BRANCH,
    ...(existingSha ? { sha: existingSha } : {}),
  };

  const res = await fetch(
    `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    { method: 'PUT', headers: headers(token), body: JSON.stringify(body) }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to upload image');
  }

  // Return the public path that Vercel will serve
  return `/images/projects/${filename}`;
}

/* ── Delete image from repo ── */
export async function deleteImage(token, imagePath) {
  try {
    if (!imagePath || !imagePath.startsWith('/images/projects/')) return;
    const repoPath = `public${imagePath}`;
    const check = await fetch(
      `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repoPath}?ref=${BRANCH}`,
      { headers: headers(token) }
    );
    if (!check.ok) return;
    const { sha } = await check.json();
    await fetch(
      `${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${repoPath}`,
      {
        method: 'DELETE',
        headers: headers(token),
        body: JSON.stringify({
          message: `[Admin] Remove project image`,
          sha,
          branch: BRANCH,
        }),
      }
    );
  } catch (_) {}
}

