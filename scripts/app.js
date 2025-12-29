const productGrid = document.getElementById("productGrid");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");

// FakeStore API
const API_URL = "https://fakestoreapi.com/products";

// ================= FETCH PRODUCTS =================
async function loadProducts() {
    try {
        loadingText.style.display = "block";
        errorText.style.display = "none";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("API error");
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

// ================= DISPLAY PRODUCTS =================
function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <a href="product.html?id=${product.id}" class="product-link">
                <img 
                    src="${product.image}" 
                    alt="${product.title}" 
                    loading="lazy"
                >
                <h3>${product.title}</h3>
                <p class="price">₹ ${product.price}</p>
            </a>

            <button class="add-cart-btn">Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });
}

// ================= LOAD ON PAGE OPEN =================
loadProducts();



