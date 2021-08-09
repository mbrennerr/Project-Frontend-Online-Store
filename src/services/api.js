export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(URL);
  const data = await request.json()
    .then((results) => results);
  return data;
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}
