import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ⚠️ IMPORTANT
// ye line tumhare firebase-init file se aani chahiye
// example:
// import { auth } from "./firebase.js";

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

// ================= SIGNUP =================
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // ✅ LOGIN STATE SAVE
      localStorage.setItem("loggedIn", "true");

      alert("Signup successful ✅");
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

// ================= LOGIN =================
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ LOGIN STATE SAVE
      localStorage.setItem("loggedIn", "true");

      alert("Login successful ✅");
      window.location.href = "index.html";
    } catch (error) {
      alert("Invalid email or password ❌");
    }
  });
}
