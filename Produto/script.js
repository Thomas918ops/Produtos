let editingProductId = null;
let products = [];

function generateProductId() {
  return products.length > 0 ? products[products.length - 1].id + 1 : 1;
}

function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

function loadFromLocalStorage() {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  }
}

function saveProduct(event) {
  event.preventDefault();

  const name = document.getElementById('nome').value;
  const quantity = document.getElementById('quantidade').value;
  const description = document.getElementById('descricao').value;

  if (!name || !quantity || !description) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (editingProductId === null) {
    // Adicionar um novo produto
    const newProduct = {
      id: generateProductId(),
      name: name,
      quantity: parseInt(quantity),
      description: description
    };
    products.push(newProduct);
  } else {
    // Editar um produto existente
    const product = products.find(p => p.id === editingProductId);
    product.name = name;
    product.quantity = parseInt(quantity);
    product.description = description;
    editingProductId = null;
  }

  document.getElementById('nome').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('descricao').value = '';

  saveToLocalStorage();
  renderProductTable();
}

function renderProductTable() {
  const tbody = document.querySelector('table tbody');
  tbody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>${product.description}</td>
      <td>
        <button class="edit-btn" onclick="editProduct(${product.id})">Editar</button>
        <button class="delete-btn" onclick="deleteProduct(${product.id})">Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  document.getElementById('nome').value = product.name;
  document.getElementById('quantidade').value = product.quantity;
  document.getElementById('descricao').value = product.description;
  editingProductId = id;
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);

  saveToLocalStorage();
  renderProductTable();
}

loadFromLocalStorage();
renderProductTable();
document.getElementById('formProduto').addEventListener('submit', saveProduct);
