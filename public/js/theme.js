document.addEventListener("DOMContentLoaded", function () {
    const theme = localStorage.getItem("theme-mode");
    const themeSwitch = document.querySelector(".theme-switch img");

    if (theme && theme === "dark") {
        document.body.classList.add("active");
        if (themeSwitch) {
            themeSwitch.src = '/images/sun.svg';
        }
    }

    if (themeSwitch) {
        themeSwitch.addEventListener("click", function (e) {
            if (document.body.classList.contains("active")) {
                document.body.classList.remove("active");
                e.target.src = '/images/moon.svg';
                localStorage.setItem("theme-mode", "light");
            } else {
                document.body.classList.add("active");
                e.target.src = '/images/sun.svg';
                localStorage.setItem("theme-mode", "dark");
            }
        });
    }
});