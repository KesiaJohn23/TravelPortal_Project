
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const destinationId = params.get("id"); 

    fetch("destination.json")
        .then((response) => response.json())
        .then((data) => {
            const destination = data.find(dest => dest.id == destinationId);

            if (destination) {
                document.getElementById("destination-title").textContent = destination.name;
                document.getElementById("destination-image").src = destination.image;
                document.getElementById("destination-description").textContent = destination.description;

                const itineraryList = document.getElementById("itinerary-list");
                destination.details.itinerary.forEach((item) => {
                    const li = document.createElement("li");
                    li.textContent = item;
                    itineraryList.appendChild(li);
                });

                const map = L.map("map").setView([destination.details.location.latitude, destination.details.location.longitude], 10);
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors"
                }).addTo(map);
                L.marker([destination.details.location.latitude, destination.details.location.longitude])
                    .addTo(map)
                    .bindPopup(destination.name);
            } else {
                console.error("Destination not found.");
                document.querySelector(".container").innerHTML = "<h2>Destination not found.</h2>";
            }
        })
        .catch((error) => console.error("Error fetching JSON:", error));

    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function(event) {
            event.preventDefault(); 
            const name = document.getElementById("traveler-name").value.trim();  
            const email = document.getElementById("email").value.trim();
            const travelers = parseInt(document.getElementById("travelers").value, 10);
            const travelDate = document.getElementById("travel-date").value;

            if (!name || !email || !travelers || !travelDate) {
                alert("Please fill out all fields.");
                return;
            }

            if (new Date(travelDate) < new Date()) {
                alert("Travel date must be in the future.");
                return;
            }            

            if (travelers < 1) {
                alert("Number of travelers must be at least 1.");
                return;
            }

            console.log("Booking Details:", { name, email, travelers, travelDate });
            alert("Tour Booked!");

            bookingForm.reset();
        });
    } else {
        console.error("Booking form not found in the DOM.");
    }
});
