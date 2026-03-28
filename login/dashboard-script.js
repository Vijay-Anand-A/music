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
});
