// ================= ELEMENTS =================
const productGrid = document.getElementById("productGrid");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");
const cartCount = document.querySelector(".cart .count");

// ================= API =================
const API_URL = "https://fakestoreapi.com/products";

// ================= CART HELPERS =================
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// 🔴 FIXED: NaN + Edge issue handled
function updateCartCount() {
    const cart = getCart();

    const totalItems = cart.reduce((sum, item) => {
        return sum + Number(item.quantity || 0);
    }, 0);

    // cartCount null check (important)
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

function addToCart(product) {
    let cart = getCart();

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    showToast("Item added to cart 🛒");
}

// ================= FETCH PRODUCTS =================
async function loadProducts() {
    try {
        if (loadingText) loadingText.style.display = "block";
        if (errorText) errorText.style.display = "none";

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("API Error");

        const products = await res.json();

        if (loadingText) loadingText.style.display = "none";
        displayProducts(products);

    } catch (err) {
        if (loadingText) loadingText.style.display = "none";
        if (errorText) errorText.style.display = "block";
        console.error(err);
    }
}

// ================= DISPLAY PRODUCTS =================
function displayProducts(products) {
    if (!productGrid) return;

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

        // Add to cart button
        card.querySelector(".add-cart-btn")
            .addEventListener("click", (e) => {
                e.preventDefault();
                addToCart(product);
            });

        productGrid.appendChild(card);
    });
}

// ================= TOAST MESSAGE =================
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ================= INIT =================
updateCartCount();
loadProducts();



