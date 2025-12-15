
async function fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('error for fetching products', error);
      return [];
    }
  }
  

  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart-btn" data-product-id="${product.id}">
        Add to Cart
      </button>
    `;
    
    const button = card.querySelector('.add-to-cart-btn');
    button.addEventListener('click', () => {

      window.dispatchEvent(new CustomEvent('addToCart', { 
        detail: product 
      }));
    });
    
    return card;
  }
  

  async function renderProducts() {
    const container = document.getElementById('products-list');
    const products = await fetchProducts();
    

    container.innerHTML = '<p>Loading products...</p>';
    

    container.innerHTML = '';
    products.forEach(product => {
      container.appendChild(createProductCard(product));
    });
  }
  

  document.addEventListener('DOMContentLoaded', renderProducts);
  
  export { renderProducts };