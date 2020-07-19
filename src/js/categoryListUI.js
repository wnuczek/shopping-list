class CategoryListUI {
  constructor(title) {
    const subList = document.createElement('ul');

    subList.setAttribute('id', `productList${title}`);
    // subList.setAttribute('ondrop', 'drop(event)');
    // subList.setAttribute('ondragover', 'allowDrop(event)');

    const subTitle = document.createElement('p');
    subTitle.appendChild(document.createTextNode(title));

    subList.appendChild(subTitle);

    return subList;
  }
}

export { CategoryListUI };
