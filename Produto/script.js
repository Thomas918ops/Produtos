// script.js
let editingProductId = null;  // Para saber se estamos editando um produto existente
let products = [];  // Array para armazenar os produtos

// Função para gerar o ID de produto
function generateProductId() {
    return products.length > 0 ? products[products.length - 1].id + 1 : 1;
}

// Função para salvar no LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));  // Armazena os dados como string JSON
}

// Função para carregar os produtos do LocalStorage
function loadFromLocalStorage() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);  // Converte a string JSON de volta para um array de objetos
    }
}

// Função para salvar o produto (editar ou adicionar)
function saveProduct() {
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const description = document.getElementById('product-description').value;

    // Verificar se os campos são válidos
    if (!name || !price || !description) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (editingProductId === null) {
        // Adicionar um novo produto
        const newProduct = {
            id: generateProductId(),
            name: name,
            price: parseFloat(price),
            description: description
        };
        products.push(newProduct);
    } else {
        // Editar um produto existente
        const product = products.find(p => p.id === editingProductId);
        product.name = name;
        product.price = parseFloat(price);
        product.description = description;
        editingProductId = null;
    }

    // Limpar os campos
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-description').value = '';

    // Salvar os dados no LocalStorage
    saveToLocalStorage();

    // Atualizar a tabela
    renderProductTable();
}

// Função para renderizar a tabela de produtos
function renderProductTable() {
    const tbody = document.querySelector('#product-table tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos produtos

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price.toFixed(2)}</td>
            <td>${product.description}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${product.id})">Editar</button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para editar um produto
function editProduct(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-description').value = product.description;
    editingProductId = id;
    document.getElementById('save-button').textContent = "Atualizar Produto";
}

// Função para excluir um produto
function deleteProduct(id) {
    products = products.filter(p => p.id !== id); // Remove o produto da lista

    // Salva novamente no LocalStorage após a exclusão
    saveToLocalStorage();

    renderProductTable();
}

// Inicializar a tabela e carregar os produtos
loadFromLocalStorage(); // Carrega os produtos do LocalStorage ao carregar a página
renderProductTable();
