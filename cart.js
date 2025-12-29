const cartItemsDiv = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.innerText = "";
        return;
    }

    cart.forEach(item => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.image}">
            <div>
                <h4>${item.title}</h4>
                <p>₹ ${item.price}</p>
            </div>
        `;
        cartItemsDiv.appendChild(div);
    });

    cartTotal.innerText = `Total: ₹ ${total.toFixed(2)}`;
}

renderCart();
