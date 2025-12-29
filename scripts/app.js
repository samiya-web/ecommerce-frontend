const grid = document.getElementById("productGrid");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");

async function fetchProducts() {
  try {
    loading.style.display = "block";

    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    showProducts(products);

  } catch (error) {
    errorMsg.style.display = "block";
  } finally {
    loading.style.display = "none";
  }
}

function showProducts(products) {
  grid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" loading="lazy">
      <h3>${product.title}</h3>
      <p>₹${product.price * 80}</p>
      <button>Add to Cart</button>
    `;

    grid.appendChild(card);
  });
}

fetchProducts();

