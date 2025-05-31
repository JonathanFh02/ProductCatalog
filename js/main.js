const endpoint = 'https://rib2lqvh0b.execute-api.us-east-1.amazonaws.com/P/product';
let todosLosProductos = [];

function renderizarProductos(productos) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '';
  productos.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'card';

    let categoriaTexto = '';
    if (producto.category === 2) {
      categoriaTexto = 'Pantalonetas';
    } else if (producto.category === 1) {
      categoriaTexto = 'Camisetas';
    } else if (producto.category === 3) {
      categoriaTexto = 'Zapatos';
    }
    else {
      categoriaTexto = 'Otra categoría';
    }

    card.innerHTML = `
      <img src="${producto.imageUrl}" alt="${producto.name}">
      <div class="name">${producto.name}</div>
      <div class="category">${categoriaTexto}</div>
      <div class="description">${producto.description}</div>
      <div class="price">$${producto.price.toLocaleString('es-CO')}</div>
      <div class="stock">Stock: ${producto.stock}</div>
      <button class="btn-cart" product-name="${producto.name}">Agregar al carrito</button>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll('.btn-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      const ProductName = this.getAttribute('product-name');
      alert(`Producto ${ProductName} agregado al carrito!`);
    });
  });
}


fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    let productos = data.body;
    productos = JSON.parse(productos);
    todosLosProductos = productos;
    renderizarProductos(productos);
  })
  .catch(error => {
    const grid = document.getElementById('product-grid');
    if (grid) grid.innerHTML = '<p>Error al cargar productos.</p>';
    console.error('Error al obtener productos:', error);
  });


document.getElementById('category-filter').addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-filter')) {
    const categoria = e.target.getAttribute('data-category');
    if (categoria === 'all') {
      renderizarProductos(todosLosProductos);
    } else {
      const productosFiltrados = todosLosProductos.filter(p => p.category == categoria);
      renderizarProductos(productosFiltrados);
    }
  }
});
