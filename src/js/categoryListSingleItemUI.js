class CategoryListSingleItemUI {
  constructor(product) {
    const item = document.createElement('li');
    item.setAttribute('data-id', product.id);
    // item.setAttribute('draggable', true);
    // item.setAttribute('ondragstart', 'drag(event)');

    const itemName = document.createElement('span');
    itemName.setAttribute('class', 'itemName');
    itemName.appendChild(document.createTextNode(product.name));
    const itemQty = document.createElement('span');
    itemQty.setAttribute('class', 'itemQty');
    itemQty.appendChild(document.createTextNode(product.qty));
    const itemUnit = document.createElement('span');
    itemUnit.setAttribute('class', 'itemUnit');
    itemUnit.appendChild(document.createTextNode(product.unit));

    const editButton = document.createElement('span');
    editButton.setAttribute('class', 'editButton');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    const deleteButton = document.createElement('span');
    deleteButton.setAttribute('class', 'deleteButton');
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';
    item.appendChild(itemName);
    item.appendChild(itemQty);
    item.appendChild(itemUnit);
    item.appendChild(editButton);
    item.appendChild(deleteButton);
    return item;
  }
}

export { CategoryListSingleItemUI };
