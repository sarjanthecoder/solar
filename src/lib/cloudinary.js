/**
 * cloudinary.js
 * Uploads images directly to Cloudinary using an Unsigned Upload Preset.
 * Returns the permanent HTTPS CDN URL.
 */

export async function uploadToCloudinary(file, cloudName, uploadPreset) {
  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary Cloud Name and Upload Preset are required.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'solar_arise_projects');

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`;

  const res = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Cloudinary upload failed (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.secure_url; // Permanent HTTPS image URL
}
