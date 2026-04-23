document.addEventListener("DOMContentLoaded", function () {
    const userMenu = document.querySelector("header .user-menu");
    const dropdown = document.querySelector("header .dropdown-menu");

    userMenu.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
        if (!userMenu.contains(e.target)) {
            dropdown.classList.remove("active");
        }
    });

    const menuToggle = document.querySelector("header .menu-toggle");
    const sidebar = document.querySelector("aside");

    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            sidebar.classList.toggle("active");
        });

        document.addEventListener("click", function (e) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove("active");
            }
        });
    }
});