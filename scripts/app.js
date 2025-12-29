const productGrid = document.getElementById("productGrid");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");

// FakeStore API
const API_URL = "https://fakestoreapi.com/products";

// Fetch products
async function loadProducts() {
    try {
        loadingText.style.display = "block";

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("API Error");
        }

        const products = await response.json();

        loadingText.style.display = "none";
        displayProducts(products);

    } catch (error) {
        loadingText.style.display = "none";
        errorText.style.display = "block";
        console.error(error);
    }
}

// Display products
function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <h3>${product.title}</h3>
            <p>₹ ${product.price}</p>
            <button>Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });
}

// Load on page load
loadProducts();


