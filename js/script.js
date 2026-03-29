import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHup4M5P3z-fy9fVRElBx0hutREWZGSAM",
  authDomain: "anandhavruksham-3aa36.firebaseapp.com",
  projectId: "anandhavruksham-3aa36",
  storageBucket: "anandhavruksham-3aa36.firebasestorage.app",
  messagingSenderId: "604117717957",
  appId: "1:604117717957:web:3df03ca1c702dba99331ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;

        // Reset errors
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        usernameInput.style.borderColor = '#ddd';
        passwordInput.style.borderColor = '#ddd';

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic Validation
        if (username === '') {
            usernameError.textContent = 'Username or email is required';
            usernameError.style.display = 'block';
            usernameInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }

        if (password === '') {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            passwordInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }

        if (isValid) {
            const submitBtn = loginForm.querySelector('.login-btn');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.textContent = 'Verifying...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            try {
                // Query Firestore for the login credentials
                const loginRef = collection(db, 'login');
                const q = query(loginRef, where("username", "==", username), where("password", "==", password));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Successful login
                    alert('Login Successful! Welcome back.');
                    // In a real application, you might save session info here
                    window.location.href = 'login/index.html'; 
                } else {
                    // Invalid credentials
                    passwordError.textContent = 'Invalid username or password';
                    passwordError.style.display = 'block';
                    passwordInput.style.borderColor = '#ff6b6b';
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }
            } catch (error) {
                console.error("Login Error:", error);
                alert('An error occurred during login. Please try again.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        }
    });

    // Real-time validation feedback
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.style.borderColor = '#6a11cb';
                const errorId = input.id + 'Error';
                document.getElementById(errorId).style.display = 'none';
            }
        });
    });
});

