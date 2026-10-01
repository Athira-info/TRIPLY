const savedGrid =
    document.getElementById("savedGrid");

const savedCount =
    document.getElementById("savedCount");

const categoryTabs =
    document.querySelectorAll(".category-tab");


/* =========================
   DESTINATION DATA
========================= */

const destinations = [

    {
        id: "munnar",

        name: "Munnar",

        location: "Kerala, India",

        category: "mountains",

        rating: "4.8",

        image:
            "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: "bali",

        name: "Bali",

        location: "Indonesia",

        category: "beach",

        rating: "4.9",

        image:
            "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: "dubai",

        name: "Dubai",

        location: "UAE",

        category: "city",

        rating: "4.7",

        image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: "paris",

        name: "Paris",

        location: "France",

        category: "city",

        rating: "4.8",

        image:
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: "manali",

        name: "Manali",

        location: "Himachal Pradesh",

        category: "mountains",

        rating: "4.6",

        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: "goa",

        name: "Goa",

        location: "India",

        category: "beach",

        rating: "4.5",

        image:
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: "santorini",

        name: "Santorini",

        location: "Greece",

        category: "beach",

        rating: "4.9",

        image:
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: "tokyo",

        name: "Tokyo",

        location: "Japan",

        category: "city",

        rating: "4.8",

        image:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: "rishikesh",

        name: "Rishikesh",

        location: "Uttarakhand, India",

        category: "adventure",

        rating: "4.6",

        image:
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=85"
    },


    {
        id: "queenstown",

        name: "Queenstown",

        location: "New Zealand",

        category: "adventure",

        rating: "4.9",

        image:
            "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=700&q=85"
    }

];


/* =========================
   LOCAL STORAGE
========================= */

function getSavedDestinations() {

    return JSON.parse(
        localStorage.getItem("triplySaved")
    ) || [];

}


function saveDestinations(saved) {

    localStorage.setItem(
        "triplySaved",
        JSON.stringify(saved)
    );

}


/* =========================
   RENDER SAVED
========================= */

function renderSaved(category = "all") {

    const saved =
        getSavedDestinations();


    savedCount.textContent =
        saved.length;


    savedGrid.innerHTML = "";


    let filtered =
        destinations.filter(
            destination =>
                saved.includes(destination.id)
        );


    if (category !== "all") {

        filtered =
            filtered.filter(
                destination =>
                    destination.category === category
            );

    }


    if (filtered.length === 0) {

        showEmptyState();

        return;

    }


    filtered.forEach(destination => {

        const card =
            document.createElement("article");


        card.className =
            "saved-card";


        card.innerHTML = `

            <div class="card-image">

                <img
                    src="${destination.image}"
                    alt="${destination.name}"
                >


                <button
                    class="remove-btn"
                    title="Remove from saved"
                >

                    <i class="fa-solid fa-heart"></i>

                </button>

            </div>


            <div class="card-body">

                <h2>
                    ${destination.name}
                </h2>


                <div class="location">

                    <i class="fa-solid fa-location-dot"></i>

                    ${destination.location}

                </div>


                <div class="card-footer">

                    <div class="rating">

                        <i class="fa-solid fa-star"></i>

                        ${destination.rating}

                    </div>


                    <span class="explore-link">
                        Explore
                        <i class="fa-solid fa-arrow-right"></i>
                    </span>

                </div>

            </div>

        `;


        /* Remove */

        const removeBtn =
            card.querySelector(".remove-btn");


        removeBtn.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();


                let current =
                    getSavedDestinations();


                current =
                    current.filter(
                        id =>
                            id !== destination.id
                    );


                saveDestinations(current);


                renderSaved(category);

            }
        );


        /* Open destination */

        card.addEventListener(
            "click",
            function(event) {

                if (
                    event.target.closest(
                        ".remove-btn"
                    )
                ) {

                    return;

                }


                window.location.href =
                    "destination.html";

            }
        );


        savedGrid.appendChild(card);

    });

}


/* =========================
   EMPTY STATE
========================= */

function showEmptyState() {

    savedGrid.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">

                <i class="fa-regular fa-heart"></i>

            </div>


            <h2>
                Nothing saved yet
            </h2>


            <p>
                Save destinations you love
                and find them here whenever
                you're ready to plan.
            </p>


            <button
                class="explore-btn"
                id="exploreBtn"
            >

                Explore destinations

            </button>

        </div>

    `;


    document
        .getElementById("exploreBtn")
        .addEventListener(
            "click",
            function() {

                window.location.href =
                    "explore.html";

            }
        );

}


/* =========================
   CATEGORY FILTER
========================= */

categoryTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        function() {

            categoryTabs.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            this.classList.add("active");


            renderSaved(
                this.dataset.category
            );

        }
    );

});


/* =========================
   INITIAL LOAD
========================= */

renderSaved();