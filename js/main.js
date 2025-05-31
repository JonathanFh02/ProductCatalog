const endpoint = 'https://rib2lqvh0b.execute-api.us-east-1.amazonaws.com/P/product';
let allProducts = [];
let currentProducts = [];

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}


function addCart(product) {
  let cart = getCart();
  cart.push(product);
  saveCart(cart);
  showCartInfo();
  updateCartUI()
}

function removeCartItem(idx) {
  let cart = getCart();
  cart.splice(idx, 1);
  saveCart(cart);
  updateCartUI();
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCartUI();
}

function openCartModal() {
  document.getElementById('cart-modal').classList.add('show');
}

function closeCartModal() {
  document.getElementById('cart-modal').classList.remove('show');
}

function updateCartUI() {
  const cart = getCart();

  document.getElementById('cart-count').textContent = cart.length;


  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';
  if (cart.length === 0) {
    cartList.innerHTML = '<li>El carrito está vacío.</li>';
  } else {
    cart.forEach((product, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${product.name} - $${product.price.toLocaleString('es-CO')}</span>
        <button class="btn-remove" data-idx="${idx}">Eliminar</button>
      `;
      cartList.appendChild(li);
    });

    cartList.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = this.getAttribute('data-idx');
        removeCartItem(idx);
      });
    });
  }
  const total = cart.reduce((acc, prod) => acc + prod.price, 0);
  document.getElementById('cart-total').textContent =
    `Total: $${total.toLocaleString('es-CO')}`;

  document.getElementById('cart-information').textContent = `Carrito: ${cart.length} producto(s)`;
}

function showCartInfo() {
  const cart = getCart();
  const info = document.getElementById('cart-information');
  info.textContent = `Carrito: ${cart.length} producto(s)`;
}
function renderProducts(products) {
  currentProducts = [...products];
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  grid.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card';

    let categoryText = '';
    if (product.category === 2) {
      categoryText = 'Pantalonetas';
    } else if (product.category === 1) {
      categoryText = 'Camisetas';
    } else if (product.category === 3) {
      categoryText = 'Zapatos';
    }
    else {
      categoryText = 'Otra categoría';
    }

    card.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.name}">
      <div class="name">${product.name}</div>
      <div class="category">${categoryText}</div>
      <div class="description">${product.description}</div>
      <div class="price"><i class="fa-solid fa-tag"></i>$${product.price.toLocaleString('es-CO')}</div>
      <div class="stock"><i class="fa-solid fa-box"></i> Stock: ${product.stock}</div>
      <button class="btn-cart" product-name="${product.name}">Agregar al carrito</button>
    `;
    grid.appendChild(card);

    const btn = card.querySelector('.btn-cart');
    btn.addEventListener('click', function () {
      addCart(product);
      btn.textContent = "¡Agregado!";
      btn.style.background = "#28a745";
      setTimeout(() => {
        btn.textContent = "Agregar al carrito";
        btn.style.background = "";
      }, 1000);
    });
  });

}


fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    let products = data.body;
    products = JSON.parse(products);
    allProducts = products;
    renderProducts(products);
    updateCartUI();
  })
  .catch(error => {
    const grid = document.getElementById('product-grid');
    if (grid) grid.innerHTML = '<p>Error al cargar productos.</p>';
    console.error('Error al obtener productos:', error);
  });


document.getElementById('category-filter').addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-filter')) {
    const category = e.target.getAttribute('data-category');
    if (category === 'all') {
      renderProducts(allProducts);
    } else {
      const productFilter = allProducts.filter(p => p.category == category);
      renderProducts(productFilter);
      applySort();
    }
  }
});


document.getElementById('sort-price').addEventListener('change', function () {
  applySort();
});
function applySort() {
  const sortValue = document.getElementById('sort-price').value;
  let sorted = [...currentProducts];
  if (sortValue === 'asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'desc') {
    sorted.sort((a, b) => b.price - a.price);
  }
  renderProducts(sorted);
}

document.getElementById('filter-by-range').addEventListener('click', function () {
  const min = Number(document.getElementById('min-price').value) || 0;
  const max = Number(document.getElementById('max-price').value) || Infinity;
  const filtered = allProducts.filter(product =>
    product.price >= min && product.price <= max
  );
  renderProducts(filtered);
});

document.getElementById('open-cart-modal').addEventListener('click', openCartModal);
document.getElementById('close-cart-modal').addEventListener('click', closeCartModal);
document.getElementById('empty-cart').addEventListener('click', function () {
  clearCart();
  alert('¡Carrito vaciado!');
});

window.onclick = function (event) {
  const modal = document.getElementById('cart-modal');
  if (event.target === modal) {
    closeCartModal();
  }
}

