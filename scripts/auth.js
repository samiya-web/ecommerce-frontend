/* ================= FIREBASE IMPORTS ================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ================= FIREBASE CONFIG ================= */
const firebaseConfig = {
  apiKey: "AIzaSyAVncj5Il4JXFI7MoL5yaKkt2Fb2CJqwhY",
  authDomain: "mystore-auth-8be56.firebaseapp.com",
  projectId: "mystore-auth-8be56",
  storageBucket: "mystore-auth-8be56.appspot.com",
  messagingSenderId: "162193634730",
  appId: "1:162193634730:web:268713555915fc2ad3a7d3"
};

/* ================= INIT FIREBASE ================= */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ================= ELEMENTS ================= */
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

/* ================= TOGGLE ================= */
loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");

  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");

  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

/* ================= SIGNUP ================= */
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("confirmPassword").value;
  const errorBox = document.getElementById("signupError");

  errorBox.textContent = "";

  if (password !== confirm) {
    errorBox.textContent = "Passwords do not match ❌";
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    // ✅ DIRECT REDIRECT (NO ALERT)
   window.location.href = "/ecommerce-frontend/index.html";



  } catch (err) {
    errorBox.textContent = err.message;
  }
});

/* ================= LOGIN ================= */
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const errorBox = document.getElementById("loginError");

  errorBox.textContent = "";

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // ✅ DIRECT REDIRECT (NO ALERT)
   window.location.href = "/ecommerce-frontend/index.html";



  } catch (err) {
    errorBox.textContent = "Invalid email or password ❌";
  }
});
