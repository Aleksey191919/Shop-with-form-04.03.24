/** @format */

window.addEventListener('DOMContentLoaded', showCategories);

document.getElementById('categories').addEventListener('click', (event) => {
  const categoryId = event.target.getAttribute('data-category');
  showProductsByCategory(categoryId);
});

document.getElementById('products').addEventListener('click', (event) => {
  const productId = event.target.getAttribute('data-product');
  const categoryId = event.target.getAttribute('data-category');

  showProductInfo(categoryId, productId);
});
