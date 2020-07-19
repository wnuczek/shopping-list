import { Product } from './product';
import { ProductList } from './productList';
import { CategoryListUI } from './categoryListUI';
import { CategoryListSingleItemUI } from './categoryListSingleItemUI';

// var productList = document.getElementById('productList');
const productList = new ProductList();
const productListHTML = document.getElementById('productList');
const submitButton = document.getElementById('submit');
const alertDOM = document.getElementById('formAlert');

let categoryList = ['warzywa', 'owoce', 'nabiał'];
const categoryListHTML = document.getElementById('productCatList');

const cachedCategoryList = localStorage.getItem('categoryList');
if (cachedCategoryList) {
  categoryList = JSON.parse(cachedCategoryList);
}

const nameInput = document.querySelector('[name="productName"]');
const qtyInput = document.querySelector('[name="productQty"]');
let unitInput = document.querySelector('[name="productQtyUnit"]:checked');
const catInput = document.querySelector('[name="productCat"]');

init();

document.addEventListener('click', (e) => {
  if (e.target) {
    switch (e.target.className) {
      case 'addButton':
        addToList();
        break;
      case 'updateButton':
        updateProduct();
        break;
      case 'fas fa-times':
        deleteFromList(e.target);
        break;
      case 'fas fa-edit':
        editProduct(e.target);
        break;
      default:
        break;
    }
  }
});

document.getElementById('productCat').addEventListener('focusin', (e) => {
  e.target.value = '';
});

document.querySelectorAll('[name="productQtyUnit"]').forEach((item) => {
  item.addEventListener('click', (e) => {
    unitInput = e.target;
  });
});

function init() {
  renderCategoryList();
  renderProductList();
  getProductListStats();
}

function addToList() {
  try {
    const id = productList.nextId();
    const newProductContent = getProductDataFromInput(id);
    if (!newProductContent) throw new Error('No product info found.');
    alertDOM.classList.add('d-none');
    productList.add(newProductContent);
    updateProductList();
  } catch (err) {
    alertDOM.innerHTML = err;
    alertDOM.classList.remove('d-none');
  }
}

function deleteFromList(item) {
  const parent = item.parentElement.parentElement;
  const id = parent.getAttribute('data-id');

  productList.delete(id);
  updateProductList();
}

function editProduct(item) {
  const parent = item.parentElement.parentElement;
  const id = parent.getAttribute('data-id');

  nameInput.setAttribute('data-id', id);
  nameInput.value = productList.productById(id).name;
  qtyInput.value = productList.productById(id).qty;
  unitInput.value = productList.productById(id).unit;
  catInput.value = productList.productById(id).cat;
  submitButton.innerText = 'Update';
  submitButton.classList.remove('addButton');
  submitButton.classList.add('updateButton');
}

function updateProduct() {
  const id = nameInput.getAttribute('data-id');
  const updatedProduct = getProductDataFromInput(id);
  productList.update(updatedProduct);
  updateProductList();
}

function renderProductList() {
  productListHTML.innerHTML = '';
  if (productList.length() > 0) {
    categoryList.forEach((item) => {
      const filteredProducts = productList.categoryFilter(item);
      if (filteredProducts.length > 0) {
        const subList = new CategoryListUI(item);
        for (let i = 0; i < filteredProducts.length; i++) {
          subList.appendChild(renderSingleItem(filteredProducts[i]));
        }
        productListHTML.appendChild(subList);
      }
    });
  }
}

function renderSingleItem(product) {
  const item = new CategoryListSingleItemUI(product);
  return item;
}

function updateProductList() {
  localStorage.setItem('shoppingList', JSON.stringify(productList.data));
  renderProductList();
  getProductListStats();
}

function getProductDataFromInput(id) {
  try {
    if (!nameInput.value) throw new Error('product name is required');
    if (!qtyInput.value) throw new Error('product qty is required');
    if (!unitInput.value) throw new Error('product unit is required');
    if (!catInput.value) throw new Error('product category is required');

    alertDOM.classList.add('d-none');

    if (!categoryList.includes(catInput.value)) {
      categoryList.push(catInput.value);
      categoryListHTML.appendChild(
        document.createElement('option').appendChild(document.createTextNode(catInput.value))
      );
      localStorage.setItem('categoryList', JSON.stringify(categoryList));
    }
    // console.log(nameInput.value);
    const newProduct = new Product(
      id,
      nameInput.value,
      qtyInput.value,
      unitInput.value,
      catInput.value
    );

    document.querySelector('[name="productName"]').value = '';
    document.querySelector('[name="productQty"]').value = '';
    submitButton.innerText = 'Add';
    submitButton.classList.add('addButton');
    submitButton.classList.remove('updateButton');

    return newProduct;
  } catch (err) {
    alertDOM.innerHTML = err;
    alertDOM.classList.remove('d-none');
  }
  // return null;
}

function renderCategoryList() {
  categoryList.forEach((item) => {
    const option = document.createElement('option');
    option.appendChild(document.createTextNode(item));
    categoryListHTML.appendChild(option);
  });
}

function getProductListStats() {
  const lenElem = document.createElement('span');
  lenElem.setAttribute('class', 'itemName');
  const pscElem = document.createElement('span');
  pscElem.setAttribute('class', 'itemQty');
  const weightElem = document.createElement('span');
  weightElem.setAttribute('class', 'itemQty');
  const len = productList.length();
  const statsDOM = document.createElement('ul');
  const statsDOMChild = document.createElement('li');

  lenElem.innerHTML = `${len} items`;
  pscElem.innerHTML = `${productList.sumQty('pcs.')} pcs.`;
  weightElem.innerHTML = `${productList.sumQty('kg')} kg`;
  const subTitle = document.createElement('p');
  subTitle.innerHTML = 'SUM:';
  statsDOM.appendChild(subTitle);
  statsDOMChild.appendChild(lenElem);
  statsDOMChild.appendChild(pscElem);
  statsDOMChild.appendChild(weightElem);
  statsDOM.appendChild(statsDOMChild);
  productListHTML.appendChild(statsDOM);
}
