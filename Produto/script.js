function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const tbody = document.getElementById('produto-tabela');
    tbody.innerHTML = ''; 

    produtos.forEach(produto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.descricao}</td>
        `;
        tbody.appendChild(row);
    });
}

function adicionarProduto(produto) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarProdutos();
}


document.getElementById('formProduto').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const id = document.getElementById('id').value;
    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const descricao = document.getElementById('descricao').value;

    const produto = { id, nome, quantidade, descricao };

    adicionarProduto(produto);

    document.getElementById('formProduto').reset();
});

window.onload = function() {
    carregarProdutos();
};
