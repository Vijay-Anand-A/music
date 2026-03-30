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

    // Function to highlight active menu item
    const highlightActiveMenu = () => {
        const currentPath = window.location.pathname;
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const links = sidebar.querySelectorAll('a');
        links.forEach(link => {
            const linkPath = link.getAttribute('href');
            const listItem = link.querySelector('li');
            
            if (listItem) {
                // Check if current path ends with link path
                if (currentPath.endsWith(linkPath)) {
                    listItem.classList.add('active');
                    
                    // If it's inside a submenu, open the submenu parent
                    const submenuParent = listItem.closest('.has-submenu');
                    if (submenuParent) {
                        submenuParent.classList.add('open');
                    }
                } else {
                    listItem.classList.remove('active');
                }
            }
        });
    };

    // Watch for sidebar content being loaded
    const sidebarContainer = document.getElementById('sidebar');
    if (sidebarContainer) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    highlightActiveMenu();
                }
            });
        });

        observer.observe(sidebarContainer, { childList: true });
        
        // Also try immediately in case it's already there
        highlightActiveMenu();
    }

    // Submenu Toggling (Modified for dynamic content)
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.menu-item-content');
        if (trigger) {
            const submenuParent = trigger.closest('.has-submenu');
            if (submenuParent) {
                submenuParent.classList.toggle('open');
            }
        }
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
