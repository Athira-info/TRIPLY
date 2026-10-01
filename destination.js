const backBtn = document.getElementById("backBtn");
const saveBtn = document.getElementById("saveBtn");
const planTripBtn = document.getElementById("planTripBtn");


/* =========================
   BACK BUTTON
========================= */

backBtn.addEventListener("click", function () {

    window.location.href = "explore.html";

});


/* =========================
   SAVE DESTINATION
========================= */

saveBtn.addEventListener("click", function () {

    this.classList.toggle("saved");

    const icon = this.querySelector("i");

    if (this.classList.contains("saved")) {

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");

    } else {

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");

    }

});


/* =========================
   CREATE TRIP
========================= */

planTripBtn.addEventListener("click", function () {

    window.location.href = "create-trip.html";

});