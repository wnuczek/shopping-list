class ProductList {
  constructor() {
    const cachedProductList = localStorage.getItem('shoppingList');
    this.data = [];
    if (cachedProductList) {
      this.data = JSON.parse(cachedProductList);
    }
  }

  add(product) {
    this.data.push(product);
  }

  update(product) {
    const id = this.data.map((item) => item.id).indexOf(Number(product.id));
    this.data.splice(id, 1, product);
  }

  delete(productId) {
    const id = this.data.map((item) => item.id).indexOf(Number(productId));
    this.data.splice(id, 1);
  }

  length() {
    return this.data.length;
  }

  nextId() {
    if (this.data.length > 0) {
      const max = this.data.reduce((prev, current) => {
        return prev.id > current.id ? prev : current;
      });
      return Number(max.id) + 1;
    }
    return 0;
  }

  categoryFilter(filter) {
    const filteredArray = this.data.filter((product) => product.cat === filter);
    return filteredArray;
  }

  productById(filter) {
    const filteredArray = this.data.filter((product) => product.id === Number(filter));
    return filteredArray[0];
  }

  sumQty(filter) {
    const filteredArray = this.data.filter((product) => product.unit === filter);
    const sumQty = filteredArray.reduce((acc, product) => Number(acc) + Number(product.qty), 0);
    return sumQty;
  }
}
export { ProductList };
