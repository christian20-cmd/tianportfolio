// src/lib/resolveImageUrl.js
const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;

export function resolveImageUrl(value) {
  if (!value) return null;
  if (value.startsWith("http")) return value;
  return `${UPLOADS_URL}${value}`;
}