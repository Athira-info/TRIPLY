/* ==============================
   CATEGORY SELECTION
================================ */

const categories = document.querySelectorAll(".category");

categories.forEach(category => {

    category.addEventListener("click", () => {

        categories.forEach(item => {
            item.classList.remove("active");
        });

        category.classList.add("active");

    });

});


/* ==============================
   FAVORITES
================================ */

const heartButtons = document.querySelectorAll(
    ".heart-btn, .mini-heart"
);

heartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");

        if (icon.classList.contains("fa-solid")) {

            button.style.color = "#EF4444";

        } else {

            button.style.color = "";

        }

    });

});


/* ==============================
   SEARCH
================================ */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const cards =
        document.querySelectorAll(".recommended-card");

    cards.forEach(card => {

        const destination =
            card.querySelector("h3")
                .textContent
                .toLowerCase();

        if (destination.includes(searchValue)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});


/* ==============================
   BOTTOM NAVIGATION
================================ */

const navItems =
    document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    item.addEventListener("click", () => {

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");

    });

});