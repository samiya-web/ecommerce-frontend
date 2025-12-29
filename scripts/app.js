const productGrid = document.getElementById("productGrid");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");
const cartCount = document.querySelector(".cart .count");

const API_URL = "https://fakestoreapi.com/products";

// ================= CART FUNCTIONS =================
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = total;
}

function addToCart(product) {
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }

    saveCart(cart);
    alert("Product added to cart 🛒");
}

// ================= FETCH PRODUCTS =================
async function loadProducts() {
    try {
        loadingText.style.display = "block";
        errorText.style.display = "none";

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("API Error");

        const products = await res.json();
        loadingText.style.display = "none";
        displayProducts(products);

    } catch (err) {
        loadingText.style.display = "none";
        errorText.style.display = "block";
        console.error(err);
    }
}

// ================= DISPLAY PRODUCTS =================
function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <h3>${product.title}</h3>
                <p class="price">₹ ${product.price}</p>
            </a>
            <button class="add-cart-btn">Add to Cart</button>
        `;

        card.querySelector(".add-cart-btn")
            .addEventListener("click", () => addToCart(product));

        productGrid.appendChild(card);
    });
}

// ================= INIT =================
updateCartCount();
loadProducts();



