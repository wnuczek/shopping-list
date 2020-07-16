import { Product } from './product';
import { ProductList } from './productList';

// var productList = document.getElementById('productList');
const productList = new ProductList();
const productListHTML = document.getElementById('productList');
const submitButton = document.getElementById('submit');
let categoryList = ['warzywa', 'owoce', 'nabiał'];
const categoryListHTML = document.getElementById('productCatList');

var cachedCategoryList = localStorage.getItem('categoryList');
if (cachedCategoryList) {
  categoryList = JSON.parse(cachedCategoryList);
}

init();

document.addEventListener('click', (e) => {
  if (e.target && e.target.className === 'deleteButton') {
    // do something
    deleteFromList(e.target);
  }
});

submitButton.addEventListener('click', addToList);

function init() {
  renderCategoryList();
  renderList();
  getProductListStats();
}

function addToList() {
  try {
    const newProductContent = getProductDataFromInput();
    // const id = productList.length() + 1;
    // productListHTML.appendChild(renderSingleItem(newProductContent, id));
    productList.add(newProductContent);
    updateProductList();
  } catch (e) {
    switch (e) {
      case 'product name is required':
        document.getElementById('productNameAlert').classList.add('d-block');
    }
  }
}

function deleteFromList(item) {
  try {
    const parent = item.parentElement;
    const id = parent.getAttribute('data-id');
    productList.delete(id);
    updateProductList();
  } catch (e) {
    console.log(e);
  }
}

function renderList() {
  productListHTML.innerHTML = '';
  categoryList.forEach( (item) => {
    const subList = document.createElement('ul');
    subList.setAttribute('id', 'productList' + item);
    const filteredProducts = productList.categoryFilter(item);
    if (filteredProducts.length > 0) subList.appendChild(document.createTextNode(item));
    for (let i = 0; i < filteredProducts.length; i++) {
      // render single item
      subList.appendChild(renderSingleItem(filteredProducts[i], i));
    }
    productListHTML.appendChild(subList);

  });

}

function renderSingleItem(product, id) {
  const item = document.createElement('li');
  item.setAttribute('data-id', id);
  const itemHTML = `Name: ${product.name}  Qty: ${product.qty} ${product.unit} Cat: ${product.cat}`;
  const deleteButton = document.createElement('span');
  deleteButton.setAttribute('class', 'deleteButton');
  deleteButton.innerHTML = 'X';
  item.appendChild(document.createTextNode(itemHTML));
  item.appendChild(deleteButton);
  return item;
}

function updateProductList() {
  localStorage.setItem('shoppingList', JSON.stringify(productList.data));
  renderList();
  getProductListStats();
}

function getProductDataFromInput() {
  const name = document.querySelector('[name="productName"]').value;
  if (!name) throw 'product name is required';
  const qty = document.querySelector('[name="productQty"]').value;
  if (!qty) throw 'product qty is required';
  const unit = document.querySelector('[name="productQtyUnit"]:checked').value;
  if (!unit) throw 'product unit is required';
  const cat = document.querySelector('[name="productCat"]').value;
  if (!cat) throw 'product category is required';
  if (!categoryList.includes(cat)) {
    categoryList.push(cat);
    categoryListHTML.appendChild(
      document.createElement('option').appendChild(document.createTextNode(cat))
    );
    localStorage.setItem('categoryList', JSON.stringify(categoryList));
  }
  // reset inputs and warnings
  document.querySelectorAll('.alert').forEach( (item) => {
    item.classList.remove('d-block')
  });

  const newProduct = new Product(name, qty, unit, cat);
  return newProduct;
}

function renderCategoryList() {
  categoryList.forEach( (item) => {
    const option = document.createElement('option');
    option.appendChild(document.createTextNode(item));
    categoryListHTML.appendChild(option);
  });
}

function getProductListStats() {
  const lenElem = document.getElementById('productListLen');
  const pscElem = document.getElementById('productListPscSum');
  const weightElem = document.getElementById('productListWeightSum');
  const len = productList.length();
  // console.log(len);
  lenElem.innerHTML = len;
  pscElem.innerHTML = `${productList.sumQty('szt.')} szt.`;
  weightElem.innerHTML = `${productList.sumQty('kg')} kg`;
}
