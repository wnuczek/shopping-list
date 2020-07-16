import { Product } from './product';
import { ProductList } from './productList';

// var productList = document.getElementById('productList');
let productList = new ProductList();
let submitButton = document.getElementById('submit');
let deleteButton = document.getElementsByClassName('delete');

let deleteButtons = document.querySelectorAll('deleteButton');

deleteButtons.forEach((elem) => {
  elem.addEventListener('click', () => {
    console.log('delete this item');
    // this function does stuff
  });
});

submitButton.addEventListener('click', addToList);

function addToList() {
  // console.log('adding product to shopping list');
  let newProduct = document.createElement('li');
  const newProductContent = getInputData();
  newProduct = newProduct.appendChild(document.createTextNode(newProductContent));
  getProductListLen();

  // productList.appendChild(newProduct);
}

function getInputData() {
  const name = document.querySelector('[name="productName"]').value;
  const qty = document.querySelector('[name="productQty"]').value;
  const unit = document.querySelector('[name="productQtyUnit"]').value;
  const cat = document.querySelector('[name="productCat"]').value;
  if (name && qty && unit && cat) {
    console.log('true');
  }
  const newProduct = new Product(name, qty, unit, cat);
  console.log(newProduct);
  productList.addToList(newProduct);
  console.log(productList);
  return newProduct;
}

function getProductListLen() {
  let span = document.getElementById('productListLen');
  const len = Object.keys(productList).length;
  console.log(len);
  span.innerHTML = Object.keys(productList).length;
}
