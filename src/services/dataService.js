import axios from "axios";

const DATA_URL = "/data/categories_full.json";
const DELAY_MS = 5000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let cachedCategoriesPromise = null;

export async function fetchCategories({ force = false } = {}) {
  if (!force && cachedCategoriesPromise) {
    await sleep(DELAY_MS);
    return cachedCategoriesPromise;
  }

  const dataPromise = (async () => {
    await sleep(DELAY_MS);
    const response = await axios.get(DATA_URL);
    return response.data;
  })();

  if (!force) {
    cachedCategoriesPromise = dataPromise;
  }

  return dataPromise;
}

export async function fetchAllPapers({ force = false } = {}) {
  const categories = await fetchCategories({ force });
  const papers = categories.flatMap((category) =>
    (category.papers || []).map((paper) => ({
      ...paper,
      category: category.name,
    }))
  );
  return { categories, papers };
}
