const productDetail = document.getElementById("productDetail");

// URL se product ID lena
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
    try {
        const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
        );
        const product = await response.json();

        productDetail.innerHTML = `
            <div class="detail-container">
                <img src="${product.image}" alt="${product.title}">

                <div class="detail-info">
                    <h1>${product.title}</h1>
                    <h2>₹ ${product.price}</h2>
                    <p>${product.description}</p>

                    <label>Size:</label>
                    <select>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                    </select>

                    <button class="hero-btn">Add to Cart</button>
                </div>
            </div>
        `;
    } catch (error) {
        productDetail.innerHTML = "<p>Product load nahi ho paaya</p>";
    }
}

loadProduct();
