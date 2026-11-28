const tombolMenu = document.querySelector(".menu-toggle");
const header = document.querySelector(".header-container");
const tautanNav = document.querySelectorAll(".navbar-container a");

function tutupMenu() {
    header.classList.remove("menu-open");
    tombolMenu.setAttribute("aria-expanded", "false");
    tombolMenu.setAttribute("aria-label", "Buka menu");
}

if (tombolMenu && header) {
    tombolMenu.addEventListener("click", function () {
        header.classList.toggle("menu-open");
        const sedangTerbuka = header.classList.contains("menu-open");
        if (sedangTerbuka) {
            tombolMenu.setAttribute("aria-expanded", "true");
            tombolMenu.setAttribute("aria-label", "Tutup menu");
        } else {
            tombolMenu.setAttribute("aria-expanded", "false");
            tombolMenu.setAttribute("aria-label", "Buka menu");
        }
    });

    tautanNav.forEach(function (tautan) {
        tautan.addEventListener("click", tutupMenu);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            tutupMenu();
        }
    });
}
