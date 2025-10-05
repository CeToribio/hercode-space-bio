export const normalizeText = (str = "") =>
  str
    .toLowerCase()
    .normalize("NFD") // quita tildes
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
