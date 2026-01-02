const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// TOGGLE
loginTab.onclick = () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
};

signupTab.onclick = () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
};

// PASSWORD STRENGTH
const passwordInput = document.getElementById("signupPassword");
const strengthText = document.getElementById("strength");

passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;
    if (value.length < 8) {
        strengthText.textContent = "Weak password";
        strengthText.style.color = "red";
    } else if (/[A-Z]/.test(value) && /[0-9]/.test(value)) {
        strengthText.textContent = "Strong password";
        strengthText.style.color = "green";
    } else {
        strengthText.textContent = "Medium password";
        strengthText.style.color = "orange";
    }
});

// SIGNUP VALIDATION
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const pass = signupPassword.value;
    const confirm = confirmPassword.value;

    if (pass !== confirm) {
        signupError.textContent = "Passwords do not match";
        return;
    }

    localStorage.setItem("user", JSON.stringify({
        name: name.value,
        email: signupEmail.value,
        password: pass
    }));

    alert("Signup successful! Please login.");
    loginTab.click();
});

// LOGIN VALIDATION
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.email !== loginEmail.value || user.password !== loginPassword.value) {
        loginError.textContent = "Invalid email or password";
        return;
    }

    alert("Login successful!");
    window.location.href = "index.html";
});
