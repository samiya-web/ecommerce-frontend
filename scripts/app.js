// Select elements
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

// Toggle menu on hamburger click
hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");

});
// ===== PRODUCT FETCH =====
const productGrid = document.getElementById("productGrid");

fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        data.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title.substring(0, 40)}...</h3>
                <p>₹ ${Math.round(product.price * 80)}</p>
                <button>Add to Cart</button>
            `;

            productGrid.appendChild(card);
        });
    })
    .catch(error => {
        console.log("Error fetching products:", error);
    });
