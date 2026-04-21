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


});