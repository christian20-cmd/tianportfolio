// src/i18n/pick.js
export function pick(field, lang) {
  if (field == null) return field;
  if (typeof field === "object" && !Array.isArray(field)) {
    return field[lang] ?? field.fr ?? field;
  }
  return field;
}