const tripCount = document.getElementById("tripCount");
const savedCount = document.getElementById("savedCount");

const editProfileBtn = document.getElementById("editProfileBtn");
const settingsBtn = document.getElementById("settingsBtn");

const travelStyleBtn = document.getElementById("travelStyleBtn");
const travelPreferencesBtn = document.getElementById("travelPreferencesBtn");

const notificationsBtn = document.getElementById("notificationsBtn");
const privacyBtn = document.getElementById("privacyBtn");
const helpBtn = document.getElementById("helpBtn");


/* =========================
   LOAD TRIP DATA
========================= */

const savedTrip =
    JSON.parse(
        localStorage.getItem("triplyTrip")
    );


if (savedTrip) {
    tripCount.textContent = "1";
} else {
    tripCount.textContent = "0";
}


/* =========================
   LOAD SAVED DESTINATIONS
========================= */

const savedDestinations =
    JSON.parse(
        localStorage.getItem("triplySaved")
    ) || [];


savedCount.textContent =
    savedDestinations.length;


/* =========================
   EDIT PROFILE
========================= */

editProfileBtn.addEventListener("click", function () {

    alert(
        "Profile editing will be added in the next step."
    );

});


/* =========================
   SETTINGS
========================= */

settingsBtn.addEventListener("click", function () {

    alert(
        "Settings will be added in the next step."
    );

});


/* =========================
   TRAVEL STYLE
========================= */

travelStyleBtn.addEventListener("click", function () {

    alert(
        "Travel style preferences will be added in the next step."
    );

});


/* =========================
   TRAVEL PREFERENCES
========================= */

travelPreferencesBtn.addEventListener("click", function () {

    alert(
        "Travel preferences will be added in the next step."
    );

});


/* =========================
   NOTIFICATIONS
========================= */

notificationsBtn.addEventListener("click", function () {

    alert(
        "Notification settings will be added in the next step."
    );

});


/* =========================
   PRIVACY
========================= */

privacyBtn.addEventListener("click", function () {

    alert(
        "Privacy & security settings will be added in the next step."
    );

});


/* =========================
   HELP
========================= */

helpBtn.addEventListener("click", function () {

    alert(
        "How can we help? Support features will be added soon."
    );

});