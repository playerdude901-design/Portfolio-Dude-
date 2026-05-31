document.addEventListener('DOMContentLoaded', () => {
    // Basic interaction setup
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            e.target.classList.add('active');
        });
    });

    console.log("Portfolio loaded successfully.");
});
