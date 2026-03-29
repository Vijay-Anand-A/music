document.addEventListener('DOMContentLoaded', () => {
    // Logout handling
    const logoutLinks = document.querySelectorAll('.logout-item');
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!confirm('Are you sure you want to logout?')) {
                e.preventDefault();
            } else {
                alert('Logging out...');
                // window.location.href = 'login.html';
            }
        });
    });

    // Mobile Sidebar Toggle (Optional enhancement)
    // You could add a toggle button here for mobile views

    // Submenu Toggling
    const submenus = document.querySelectorAll('.has-submenu');
    submenus.forEach(submenu => {
        const trigger = submenu.querySelector('.menu-item-content');
        trigger.addEventListener('click', () => {
            submenu.classList.toggle('open');
        });
    });

    // Payment Modal Handling
    const modal = document.getElementById('paymentModal');
    const openBtn = document.getElementById('openPaymentModal');
    const closeBtns = document.querySelectorAll('.close-modal, #closePaymentModal');
    const paymentForm = document.getElementById('paymentForm');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            // Set today's date as default
            const dateInput = document.getElementById('paymentDate');
            if (dateInput) {
                dateInput.valueAsDate = new Date();
            }
        });

        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(paymentForm);
                const data = Object.fromEntries(formData.entries());
                console.log('Payment Saved:', data);
                
                alert('Payment saved successfully!');
                modal.style.display = 'none';
                paymentForm.reset();
                
                // Here you would typically update the table or send to Firebase
            });
        }
    }
});
