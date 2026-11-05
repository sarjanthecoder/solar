/**
 * cloudinary.js
 * Uploads images to Cloudinary CDN using env-only credentials.
 * Never hardcode fallback cloud name or preset in source.
 */

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME   || '';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

export function isCloudinaryConfigured() {
  return Boolean(CLOUD_NAME && UPLOAD_PRESET);
}

export async function uploadToCloudinary(file) {
  const cloudName = (CLOUD_NAME || '').trim();
  const uploadPreset = (UPLOAD_PRESET || '').trim();

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary credentials missing');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'solar_arise_projects');

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const res = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Cloudinary upload failed (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.secure_url; // Permanent HTTPS CDN URL
}
