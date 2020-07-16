class ProductList {
  constructor() {
    this.productList = [];
  }

  addToList(product) {
    this.productList.push(product);
  }

  deleteFromList(productId) {
    this.productList.splice(productId, 1);
  }
}
export { ProductList };
