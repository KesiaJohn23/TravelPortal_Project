fetch("destination.json")
    .then((response) => response.json())
    .then((data) => {
        let output = "";
        data.forEach((destination) => {
            output += `
                <div class="destination-card">
                    <h3>${destination.name}</h3>
                    <img src="${destination.image}" alt="${destination.name}">
                    <p>${destination.description}</p>
                    <a href="destination.html?id=${destination.id}">View Details</a>
                </div>
            `;
        });
        document.getElementById("destinations-container").innerHTML = output;
    })
    .catch((error) => console.error("Error fetching JSON:", error));