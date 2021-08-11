export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(URL);
  const data = await request.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const fetcher = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const data = await fetcher.json();

  return data;
}

export async function getProductsFromId(Id) {
  const fetcher = await fetch(`https://api.mercadolibre.com/items?ids=${Id}`);
  const jsonItem = await fetcher.json().then((response) => response[0].body);
  return jsonItem;
}
