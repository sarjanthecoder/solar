/**
 * cloudinary.js
 * Automatically uploads images to Cloudinary CDN using environment variables.
 * Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env or Vercel dashboard.
 */

const ENV_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const ENV_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

export function isCloudinaryConfigured() {
  return Boolean(ENV_CLOUD_NAME && ENV_UPLOAD_PRESET);
}

export async function uploadToCloudinary(file) {
  const cloudName = (ENV_CLOUD_NAME || '').trim();
  const uploadPreset = (ENV_UPLOAD_PRESET || '').trim();

  if (!cloudName || !uploadPreset) {
    throw new Error('VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET are missing in .env');
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
