const name_label=document.getElementById('name');
const stack_label=document.getElementById('stack');
const description_label=document.getElementById('description');

let editingProductId=null;
let products=[];

function updateProductLabel(name,stack,description){
  name_label.value=name||'';
  stack_label.value=stack||'';
  description_label.value=description||'';
}

function generateProductId(){
  return products.length>0?products[products.length-1].id+1:1;
}

function saveToLocalStorage(){
  localStorage.setItem('products',JSON.stringify(products));
}

function loadFromLocalStorage(){
  const storedProducts=localStorage.getItem('products');
  if (storedProducts){
    products=JSON.parse(storedProducts);
  }
}

function saveProduct(event){
  event.preventDefault();
  const name=name_label.value;
  const stack=stack_label.value;
  const description=description_label.value;

  if (!name||!stack||!description){
    console.log('Algum componente não está preenchido')
    return;
  }

  if (editingProductId===null){
    const product_data={
      id:generateProductId(),
      name:name,
      stack:parseInt(stack),
      description:description
    };
    products.push(product_data);
  }else{
    const product_data=products.find(p=>p.id===editingProductId);
    product_data.name=name;
    product_data.stack=parseInt(stack);
    product_data.description=description;
    editingProductId=null;
  }

  updateProductLabel();
  saveToLocalStorage();
  renderProductTable();
}

function renderProductTable(){
  const tbody=document.querySelector('table tbody');
  tbody.innerHTML='';

  products.forEach(product_data=>{
    const row=document.createElement('tr');
    row.innerHTML=`
      <td>${product_data.id}</td>
      <td>${product_data.name}</td>
      <td>${product_data.stack}</td>
      <td>${product_data.description}</td>
      <td>
        <button class='edit-btn' onclick='editProduct(${product_data.id})'>Editar</button>
        <button class='delete-btn' onclick='deleteProduct(${product_data.id})'>Excluir</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function editProduct(id){
  const product_data=products.find(p=>p.id===id);
  updateProductLabel(product_data.name,product_data.stack,product_data.description);
  editingProductId=id;
}

function deleteProduct(id){
  products=products.filter(p=>p.id!==id);
  saveToLocalStorage();
  renderProductTable();
}

loadFromLocalStorage();
renderProductTable();
document.getElementById('form-product').addEventListener('submit',saveProduct);
