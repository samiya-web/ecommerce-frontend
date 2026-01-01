const cartItemsDiv = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const cartCount = document.querySelector(".cart .count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalQty;
}

function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "";
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
            <img src="${item.image}">
            <div class="cart-info">
                <h4>${item.title}</h4>
                <p>₹ ${item.price}</p>

                <div class="quantity">
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;

        cartItemsDiv.appendChild(div);
    });

    cartTotal.textContent = `Total: ₹ ${total.toFixed(2)}`;
}

function changeQty(index, change) {
    if (cart[index].quantity + change < 1) return;
    cart[index].quantity += change;
    saveCart();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

renderCart();
updateCartCount();
