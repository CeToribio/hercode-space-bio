
export const slugify = (text) =>
  text
    .toLowerCase()
    .normalize("NFD") // elimina tildes
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const unslugify = (slug) =>
  slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
