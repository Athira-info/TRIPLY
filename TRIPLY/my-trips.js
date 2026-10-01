const tripsContainer =
    document.getElementById("tripsContainer");

const addTripBtn =
    document.getElementById("addTripBtn");

const filterChips =
    document.querySelectorAll(".filter-chip");


/* =========================
   GET SAVED TRIP
========================= */

const savedTrip =
    JSON.parse(localStorage.getItem("triplyTrip"));


/* =========================
   FORMAT DATE
========================= */

function formatDate(dateString) {

    if (!dateString) {

        return "Dates not selected";

    }


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================
   CALCULATE DAYS
========================= */

function calculateDays(start, end) {

    if (!start || !end) {

        return 3;

    }


    const startDate =
        new Date(start);

    const endDate =
        new Date(end);


    const difference =
        endDate - startDate;


    return (
        Math.round(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1
    );

}


/* =========================
   DETERMINE STATUS
========================= */

function getTripStatus(startDate) {

    if (!startDate) {

        return "Upcoming";

    }


    const today =
        new Date();

    today.setHours(0, 0, 0, 0);


    const start =
        new Date(startDate);

    start.setHours(0, 0, 0, 0);


    if (start >= today) {

        return "Upcoming";

    }


    return "Past";

}


/* =========================
   RENDER TRIPS
========================= */

function renderTrips(filter = "all") {

    tripsContainer.innerHTML = "";


    if (!savedTrip) {

        showEmptyState();

        return;

    }


    const status =
        getTripStatus(savedTrip.startDate);


    if (
        filter !== "all" &&
        filter !== status.toLowerCase()
    ) {

        showEmptyState(
            filter === "upcoming"
                ? "No upcoming trips"
                : "No past trips"
        );

        return;

    }


    const days =
        calculateDays(
            savedTrip.startDate,
            savedTrip.endDate
        );


    const card =
        document.createElement("article");


    card.className =
        "trip-card";


    card.innerHTML = `

        <div class="trip-image">

            <img
                src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85"
                alt="${savedTrip.destination}"
            >

            <span class="trip-status">
                ${status}
            </span>

        </div>


        <div class="trip-body">

            <h2>
                ${savedTrip.tripName || "My Trip"}
            </h2>


            <div class="trip-location">

                <i class="fa-solid fa-location-dot"></i>

                ${savedTrip.destination}

            </div>


            <div class="trip-meta">

                <div class="meta-item">

                    <i class="fa-regular fa-calendar"></i>

                    ${
                        formatDate(savedTrip.startDate)
                    }

                </div>


                <div class="meta-item">

                    <i class="fa-solid fa-clock"></i>

                    ${days} days

                </div>


                <div class="meta-item">

                    <i class="fa-solid fa-user-group"></i>

                    ${savedTrip.travellers}

                </div>

            </div>


            <button
                class="trip-action"
                id="viewTripBtn"
            >

                View itinerary

                <i class="fa-solid fa-arrow-right"></i>

            </button>

        </div>

    `;


    tripsContainer.appendChild(card);


    document
        .getElementById("viewTripBtn")
        .addEventListener(
            "click",
            function () {

                window.location.href =
                    "itinerary.html";

            }
        );

}


/* =========================
   EMPTY STATE
========================= */

function showEmptyState(
    title = "No trips yet"
) {

    tripsContainer.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">

                <i class="fa-solid fa-suitcase-rolling"></i>

            </div>


            <h2>
                ${title}
            </h2>


            <p>
                Start planning your next adventure
                and your trips will appear here.
            </p>


            <button
                class="create-btn"
                id="createTripBtn"
            >

                Plan a trip

            </button>

        </div>

    `;


    document
        .getElementById("createTripBtn")
        .addEventListener(
            "click",
            function () {

                window.location.href =
                    "create-trip.html";

            }
        );

}


/* =========================
   FILTERS
========================= */

filterChips.forEach(chip => {

    chip.addEventListener(
        "click",
        function () {

            filterChips.forEach(item => {

                item.classList.remove("active");

            });


            this.classList.add("active");


            renderTrips(
                this.dataset.filter
            );

        }
    );

});


/* =========================
   ADD TRIP
========================= */

addTripBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "create-trip.html";

    }
);


/* =========================
   INITIAL LOAD
========================= */

renderTrips();