const backBtn = document.getElementById("backBtn");

const tripTitle = document.getElementById("tripTitle");
const tripDestination = document.getElementById("tripDestination");
const tripDates = document.getElementById("tripDates");
const tripTravellers = document.getElementById("tripTravellers");
const tripStyle = document.getElementById("tripStyle");

const dayContent = document.getElementById("dayContent");

const dayTabs = document.querySelectorAll(".day-tab");

const editBtn = document.getElementById("editBtn");
const addActivity = document.getElementById("addActivity");
const shareBtn = document.getElementById("shareBtn");
const doneBtn = document.getElementById("doneBtn");


/* =========================
   GET SAVED TRIP
========================= */

const savedTrip =
    JSON.parse(localStorage.getItem("triplyTrip"));


let currentDay = 1;


/* =========================
   DEFAULT TRIP
========================= */

const defaultTrip = {

    tripName: "Munnar Escape",

    destination: "Munnar, Kerala",

    startDate: "",

    endDate: "",

    travellers: 2,

    travelStyle: "Relaxed",

    notes: ""

};


/* Use saved trip or default */

const trip = savedTrip || defaultTrip;


/* =========================
   DISPLAY TRIP DETAILS
========================= */

tripTitle.textContent =
    trip.tripName || "Munnar Escape";


tripDestination.textContent =
    trip.destination || "Munnar, Kerala";


tripTravellers.textContent =
    `${trip.travellers || 2} ${
        trip.travellers == 1 ? "person" : "people"
    }`;


tripStyle.textContent =
    trip.travelStyle || "Relaxed";


/* =========================
   CALCULATE DATES
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


    const days =
        Math.round(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1;


    return days > 0 ? days : 3;

}


const numberOfDays =
    calculateDays(
        trip.startDate,
        trip.endDate
    );


tripDates.textContent =
    `${numberOfDays} ${
        numberOfDays === 1 ? "day" : "days"
    }`;


/* =========================
   ITINERARY DATA
========================= */

const itinerary = {

    1: [

        {
            time: "09:00 AM",
            title: "Arrive in Munnar",
            description:
                "Check in to your stay and settle in.",
            type: "Arrival",
            image:
                "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=500&q=80"
        },

        {
            time: "11:30 AM",
            title: "Explore tea gardens",
            description:
                "Walk through the beautiful tea plantations.",
            type: "Nature",
            image:
                "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=500&q=80"
        },

        {
            time: "04:00 PM",
            title: "Visit a scenic viewpoint",
            description:
                "Enjoy the mountain views and capture some photos.",
            type: "Sightseeing",
            image:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80"
        }

    ],


    2: [

        {
            time: "08:00 AM",
            title: "Breakfast & morning walk",
            description:
                "Start your day with a relaxed walk around Munnar.",
            type: "Relax",
            image:
                "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80"
        },

        {
            time: "10:30 AM",
            title: "Visit Mattupetty Dam",
            description:
                "Explore the dam and surrounding mountain scenery.",
            type: "Sightseeing",
            image:
                "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=500&q=80"
        },

        {
            time: "05:00 PM",
            title: "Sunset viewpoint",
            description:
                "End the day with a peaceful mountain sunset.",
            type: "Experience",
            image:
                "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80"
        }

    ],


    3: [

        {
            time: "09:00 AM",
            title: "Local breakfast",
            description:
                "Try a local breakfast before exploring the town.",
            type: "Food",
            image:
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80"
        },

        {
            time: "11:00 AM",
            title: "Explore local markets",
            description:
                "Discover local products and souvenirs.",
            type: "Culture",
            image:
                "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&w=500&q=80"
        },

        {
            time: "03:00 PM",
            title: "Departure",
            description:
                "Check out and begin your journey back home.",
            type: "Departure",
            image:
                "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80"
        }

    ]

};


/* =========================
   RENDER DAY
========================= */

function renderDay(day) {

    const activities =
        itinerary[day] || [];


    dayContent.innerHTML = "";


    const timeline =
        document.createElement("div");


    timeline.className = "timeline";


    activities.forEach(activity => {

        const activityElement =
            document.createElement("div");


        activityElement.className =
            "activity";


        activityElement.innerHTML = `

            <div class="activity-dot"></div>


            <div class="activity-card">

                <div class="activity-image">

                    <img
                        src="${activity.image}"
                        alt="${activity.title}"
                    >

                </div>


                <div class="activity-details">

                    <div class="activity-time">
                        ${activity.time}
                    </div>

                    <h3>
                        ${activity.title}
                    </h3>

                    <p>
                        ${activity.description}
                    </p>

                    <span class="activity-type">
                        ${activity.type}
                    </span>

                </div>

            </div>

        `;


        timeline.appendChild(
            activityElement
        );

    });


    dayContent.appendChild(timeline);

}


/* =========================
   DAY TAB
========================= */

dayTabs.forEach(tab => {

    tab.addEventListener("click", function () {

        dayTabs.forEach(item => {

            item.classList.remove("active");

        });


        this.classList.add("active");


        currentDay =
            Number(this.dataset.day);


        renderDay(currentDay);

    });

});


/* =========================
   BACK
========================= */

backBtn.addEventListener("click", function () {

    window.location.href =
        "create-trip.html";

});


/* =========================
   EDIT
========================= */

editBtn.addEventListener("click", function () {

    window.location.href =
        "create-trip.html";

});


/* =========================
   ADD ACTIVITY
========================= */

addActivity.addEventListener("click", function () {

    alert(
        "Activity planner will be added in the next step."
    );

});


/* =========================
   SHARE
========================= */

shareBtn.addEventListener("click", async function () {

    const shareText =
        `${trip.tripName} - ${trip.destination}`;

    if (navigator.share) {

        try {

            await navigator.share({

                title: trip.tripName,

                text: shareText

            });

        } catch (error) {

            console.log("Share cancelled.");

        }

    } else {

        alert(
            "Trip sharing is available on supported devices."
        );

    }

});


/* =========================
   VIEW MY TRIPS
========================= */

doneBtn.addEventListener("click", function () {

    window.location.href =
        "my-trips.html";

});


/* =========================
   INITIAL RENDER
========================= */

renderDay(1);