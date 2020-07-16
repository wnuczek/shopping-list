class ProductList {
  constructor() {
    this.data = [];
    var cachedProductList = localStorage.getItem('shoppingList');
    //var cachedProductList = localStorage.getItem('shoppingList');

    if (cachedProductList) {
      this.data = JSON.parse(cachedProductList);
    }
  }

  add(product) {
    this.data.push(product);
  }

  delete(productId) {
    this.data.splice(productId, 1);
  }

  length() {
    return this.data.length;
  }

  categoryFilter(filter) {
    const filteredArray = this.data.filter(product => product.cat === filter);
    return filteredArray;
  }

  sumQty(filter) {
    const filteredArray = this.data.filter(product => product.unit === filter);
    const sumQty = filteredArray.reduce((acc, product) => +acc + +product.qty, 0);
    return sumQty;
  }
}
export { ProductList };
