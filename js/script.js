document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Reset errors
        usernameError.style.display = 'none';
        passwordError.style.display = 'none';
        usernameInput.style.borderColor = '#ddd';
        passwordInput.style.borderColor = '#ddd';

        // Basic Validation
        if (usernameInput.value.trim() === '') {
            usernameError.textContent = 'Username or email is required';
            usernameError.style.display = 'block';
            usernameInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }

        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            passwordInput.style.borderColor = '#ff6b6b';
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long';
            passwordError.style.display = 'block';
            passwordInput.style.borderColor = '#ff6b6b';
            isValid = false;
        }

        if (isValid) {
            // Simulate a successful login for now
            const submitBtn = loginForm.querySelector('.login-btn');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                alert('Login Successful! Welcome back to Anandhavruksham Music School.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                // You would normally redirect or send data to a server here
            }, 1500);
        }
    });

    // Optional: Real-time validation or feedback
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
