// Select elements
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

// Toggle menu on hamburger click
hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});
