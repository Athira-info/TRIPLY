const destinations = [

    {
        id: "munnar",
        name: "Munnar",
        location: "Kerala, India",
        category: "mountains",
        type: "Nature",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "bali",
        name: "Bali",
        location: "Indonesia",
        category: "beach",
        type: "Relaxing",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "Dubai",
        name: "Dubai",
        location: "UAE",
        category: "city",
        type: "Luxury",
        rating: "4.7",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "Paris",
        name: "Paris",
        location: "France",
        category: "city",
        type: "Cultural",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "Manali",
        name: "Manali",
        location: "Himachal Pradesh, India",
        category: "mountains",
        type: "Adventure",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "Goa",
        name: "Goa",
        location: "India",
        category: "beach",
        type: "Relaxing",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "Santorini",
        name: "Santorini",
        location: "Greece",
        category: "beach",
        type: "Luxury",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "Tokyo",
        name: "Tokyo",
        location: "Japan",
        category: "city",
        type: "Cultural",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "Rishikesh",
        name: "Rishikesh",
        location: "Uttarakhand, India",
        category: "adventure",
        type: "Adventure",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1595815771614-ade9d3e1c7c1?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: "Queenstown",
        name: "Queenstown",
        location: "New Zealand",
        category: "adventure",
        type: "Adventure",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80"
    }

];


const destinationGrid = document.getElementById("destinationGrid");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

const categoryButtons = document.querySelectorAll(".category-chip");

const filterBtn = document.getElementById("filterBtn");
const filterOverlay = document.getElementById("filterOverlay");
const closeFilter = document.getElementById("closeFilter");
const applyFilter = document.getElementById("applyFilter");

const resetSearch = document.getElementById("resetSearch");
const backBtn = document.getElementById("backBtn");


let currentCategory = "all";
let searchTerm = "";


/* =========================
   RENDER DESTINATIONS
========================= */

function renderDestinations(data) {

    destinationGrid.innerHTML = "";

    resultCount.textContent =
        `${data.length} ${data.length === 1 ? "place" : "places"}`;


    if (data.length === 0) {

        emptyState.classList.add("show");

        return;
    }

    emptyState.classList.remove("show");


    data.forEach(destination => {

        const savedDestinations =
        JSON.parse(
            localStorage.getItem("triplySaved")
        ) || [];

    const isSaved =
        savedDestinations.includes(destination.id);

        const card = document.createElement("article");

        card.className = "destination-card";

        card.innerHTML = `

            <div class="destination-image">

                <img
                    src="${destination.image}"
                    alt="${destination.name}"
                    loading="lazy"
                >

                <button
                class="save-btn ${isSaved ? "saved" : ""}"
                aria-label="Save ${destination.name}"
            >            
                <i class="${isSaved ? "fa-solid" : "fa-regular"} fa-heart"></i>
            </button>

            </div>


            <div class="destination-content">

                <h3>${destination.name}</h3>

                <div class="destination-location">

                    <i class="fa-solid fa-location-dot"></i>

                    <span>${destination.location}</span>

                </div>


                <div class="destination-meta">

                    <div class="rating">

                        <i class="fa-solid fa-star"></i>

                        <span>${destination.rating}</span>

                    </div>


                    <span class="destination-type">
                        ${destination.type}
                    </span>

                </div>

            </div>
        `;


        /* Save button */

        const saveButton = card.querySelector(".save-btn");

        saveButton.addEventListener("click", function (event) {

            event.stopPropagation();

            this.classList.toggle("saved");

            const icon = this.querySelector("i");
            

            let saved =
        JSON.parse(
            localStorage.getItem("triplySaved")
        ) || [];

            if (this.classList.contains("saved")) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                

            } 
            if (!saved.includes(destination.id)) {

            saved.push(destination.id);

            
            } else {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");


        saved = saved.filter(
            id => id !== destination.id
        );

    }


    localStorage.setItem(
        "triplySaved",
        JSON.stringify(saved)
    );

});

        /* Open destination details */

card.addEventListener("click", function (event) {

    if (event.target.closest(".save-btn")) {
        return;
    }

    window.location.href = "destination.html";

});



        destinationGrid.appendChild(card);

    });

}


/* =========================
   FILTER DESTINATIONS
========================= */

function filterDestinations() {

    const filtered = destinations.filter(destination => {

        const matchesCategory =
            currentCategory === "all" ||
            destination.category === currentCategory;


        const searchableText =
            `${destination.name} ${destination.location} ${destination.type}`
            .toLowerCase();


        const matchesSearch =
            searchableText.includes(searchTerm.toLowerCase());


        return matchesCategory && matchesSearch;

    });


    renderDestinations(filtered);

}


/* =========================
   CATEGORY FILTER
========================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", function () {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        currentCategory = this.dataset.category;

        filterDestinations();

    });

});


/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", function () {

    searchTerm = this.value.trim();

    if (searchTerm.length > 0) {
        clearSearch.classList.add("show");
    } else {
        clearSearch.classList.remove("show");
    }

    filterDestinations();

});


/* =========================
   CLEAR SEARCH
========================= */

clearSearch.addEventListener("click", function () {

    searchInput.value = "";

    searchTerm = "";

    clearSearch.classList.remove("show");

    filterDestinations();

    searchInput.focus();

});


/* =========================
   RESET SEARCH
========================= */

resetSearch.addEventListener("click", function () {

    searchInput.value = "";

    searchTerm = "";

    currentCategory = "all";


    categoryButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.category === "all") {
            button.classList.add("active");
        }

    });


    clearSearch.classList.remove("show");

    filterDestinations();

});


/* =========================
   FILTER PANEL
========================= */

filterBtn.addEventListener("click", function () {

    filterOverlay.classList.add("show");

});


closeFilter.addEventListener("click", function () {

    filterOverlay.classList.remove("show");

});


filterOverlay.addEventListener("click", function (event) {

    if (event.target === filterOverlay) {

        filterOverlay.classList.remove("show");

    }

});


applyFilter.addEventListener("click", function () {

    filterOverlay.classList.remove("show");

});


/* =========================
   BACK BUTTON
========================= */

backBtn.addEventListener("click", function () {

    window.location.href = "index.html";

});


/* =========================
   INITIAL LOAD
========================= */

renderDestinations(destinations);