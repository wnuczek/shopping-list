class Product {
  constructor(name, qty, unit, cat) {
    this.name = name;
    this.qty = qty;
    this.unit = unit;
    this.cat = cat;
  }

  render() {
    return this.name;
  }
}

export { Product };
