const cartItemsDiv = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= RENDER CART ================= */
function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.innerText = "0";
        checkoutBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            
            <div class="cart-info">
                <h4>${item.title}</h4>
                <p>Price: ₹ ${item.price}</p>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>

                <p class="item-total">Item Total: ₹ ${itemTotal}</p>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;

        cartItemsDiv.appendChild(div);
    });

    cartTotal.innerText = total.toFixed(2);
}

/* ================= QUANTITY UPDATE ================= */
function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        cart[index].quantity = 1;
    }

    updateCart();
}

/* ================= REMOVE ITEM ================= */
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

/* ================= UPDATE LOCAL STORAGE ================= */
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

/* ================= CHECKOUT ================= */
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    alert("Proceeding to checkout 🚀");
    // later: window.location.href = "checkout.html";
});

/* ================= INITIAL LOAD ================= */
renderCart();
