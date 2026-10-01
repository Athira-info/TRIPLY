const backBtn = document.getElementById("backBtn");

const tripForm = document.getElementById("tripForm");

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");

const travellerCount =
    document.getElementById("travellerCount");

const styleOptions =
    document.querySelectorAll(".style-option");


let travellers = 2;
let selectedStyle = "Relaxed";


/* =========================
   BACK BUTTON
========================= */

backBtn.addEventListener("click", function () {

    window.location.href = "destination.html";

});


/* =========================
   TRAVELLER - DECREASE
========================= */

minusBtn.addEventListener("click", function () {

    if (travellers > 1) {

        travellers--;

        travellerCount.textContent = travellers;

    }

});


/* =========================
   TRAVELLER - INCREASE
========================= */

plusBtn.addEventListener("click", function () {

    if (travellers < 20) {

        travellers++;

        travellerCount.textContent = travellers;

    }

});


/* =========================
   TRAVEL STYLE
========================= */

styleOptions.forEach(option => {

    option.addEventListener("click", function () {

        styleOptions.forEach(item => {

            item.classList.remove("active");

        });

        this.classList.add("active");

        selectedStyle = this.dataset.style;

    });

});


/* =========================
   FORM SUBMIT
========================= */

tripForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const tripName =
        document.getElementById("tripName").value.trim();

    const destination =
        document.getElementById("destination").value.trim();

    const startDate =
        document.getElementById("startDate").value;

    const endDate =
        document.getElementById("endDate").value;

    const notes =
        document.getElementById("notes").value.trim();


    /* Check date */

    if (endDate < startDate) {

        alert("End date cannot be before the start date.");

        return;

    }


    /* Create trip data */

    const tripData = {

        tripName: tripName,

        destination: destination,

        startDate: startDate,

        endDate: endDate,

        travellers: travellers,

        travelStyle: selectedStyle,

        notes: notes

    };


    /* Store trip */

    localStorage.setItem(
        "triplyTrip",
        JSON.stringify(tripData)
    );


    /* Move to itinerary */

    window.location.href = "itinerary.html";

});