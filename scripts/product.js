// ================= ELEMENTS =================
const loadingText = document.getElementById("loading");
const productContent = document.getElementById("productContent");

const productImage = document.getElementById("productImage");
const productTitle = document.getElementById("productTitle");
const productPrice = document.getElementById("productPrice");
const productDescription = document.getElementById("productDescription");

const qtyText = document.getElementById("quantity");
const decreaseBtn = document.getElementById("decreaseQty");
const increaseBtn = document.getElementById("increaseQty");

const addToCartBtn = document.getElementById("addToCartBtn");
const successMsg = document.getElementById("successMsg");
const cartCount = document.getElementById("cartCount");

// ================= URL SE PRODUCT ID =================
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// ================= QUANTITY =================
let quantity = 1;

// ================= LOAD PRODUCT =================
async function loadProduct() {
    try {
        const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
        );

        if (!response.ok) {
            throw new Error("API Error");
        }

        const product = await response.json();

        // Hide loading, show content
        loadingText.style.display = "none";
        productContent.style.display = "flex";

        // Fill data
        productImage.src = product.image;
        productTitle.innerText = product.title;
        productPrice.innerText = product.price;
        productDescription.innerText = product.description;

        // Add to cart click
        addToCartBtn.addEventListener("click", () => {
            addToCart(product);
        });

    } catch (error) {
        loadingText.innerText = "Product load nahi ho paaya ❌";
        console.error(error);
    }
}

// ================= QUANTITY CONTROLS =================
increaseBtn.addEventListener("click", () => {
    quantity++;
    qtyText.innerText = quantity;
});

decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
        quantity--;
        qtyText.innerText = quantity;
    }
});

// ================= ADD TO CART =================
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    successMsg.style.display = "block";
    setTimeout(() => {
        successMsg.style.display = "none";
    }, 1500);
}

// ================= CART COUNT =================
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );
    cartCount.innerText = totalItems;
}

// ================= INIT =================
updateCartCount();
loadProduct();
