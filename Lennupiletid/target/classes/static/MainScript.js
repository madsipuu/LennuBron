


function fetchLennud() {
    fetch("http://localhost:8080/api") // Ensure your backend is running
        .then(response => response.json()) // Convert response to JSON
        .then(data => {
            console.log(data); // Debugging: Check data in browser console
        })
        .catch(error => console.error("Error fetching data:", error));
}

function toggleDropdown(type) {
    if (type === 'alates') {
        var dropdown = document.getElementById("dropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    } else if (type === 'kuhu') {
        var dropdown = document.getElementById("sihtkoht-dropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }else if (type === 'dates') {
        var dropdown = document.getElementById("date-dropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }
}

function fetchLocations() {
    fetch("http://localhost:8080/api/alates")
        .then(response => response.json())
        .then(data => {
            populateDropdown(data);
        })
        .catch(error => console.error("Error fetching locations:", error));
}

function fetchLocationDestinations(departure) {
    console.log("Fetching destinations for:", departure); // Debugging

    fetch("http://localhost:8080/api") // Fetch all flights
        .then(response => response.json())
        .then(data => {
            // Filter destinations based on the selected departure
            const destinations = new Set();
            data.forEach(flight => {
                if (flight.algusKoht  === departure) {
                    destinations.add(flight.sihtkoht);
                }
            });

            // Convert Set to Array and populate "Kuhu" dropdown
            populateSihtkohadDropdown(Array.from(destinations));
        })
        .catch(error => console.error("Error fetching destinations:", error));
}


function fetchFlightDates() {
    // Get selected departure and destination
    let departure = document.getElementById("lähtekoht").innerText;
    let destination = document.getElementById("sihtkoht").innerText;

    console.log("Fetching available dates for:", departure, "->", destination); // Debugging

    fetch("http://localhost:8080/api") // Fetch all flights
        .then(response => response.json())
        .then(data => {
            const availableDates = new Set();

            data.forEach(flight => {
                if (flight.algusKoht === departure && flight.sihtkoht === destination) {

                    let formattedDate = new Date(flight.kuupaev).toISOString().split("T")[0]; //Always formats to YYYY-MM-DD
                    availableDates.add(formattedDate);
                    console.log("Filtered flights:", availableDates);
                }
            });

            // Convert Set to Array and populate the date dropdown
            populateDateDropdown(Array.from(availableDates));

        })

        .catch(error => console.error("Error fetching available dates:", error));
}
function populateDateDropdown(dates) {
    console.log("populateDateDropDown has been activated", dates)
    const dropdown = document.getElementById("date-dropdown");
    dropdown.innerHTML = ""; // Clear previous options

    if (dates.length > 0) {
        dropdown.style.display = "block"; // Make dropdown visible

        dates.forEach(date => {
            let p = document.createElement("p");
            p.innerText = date;

            p.onclick = function () {
                document.getElementById("datebutton").innerText = date; // Update selected date text
                dropdown.style.display = "none"; // Close dropdown
                document.getElementById("end-button").removeAttribute("disabled"); // aktiveerib end buttoni
            };
            toggleDropdown('dates')
            dropdown.appendChild(p);
        });
    }
}

function populateDropdown(locations) {
    const dropdown = document.getElementById("dropdown");
    dropdown.innerHTML = ""; // Clear previous options

    locations.forEach(location => {
        let p = document.createElement("p");
        p.innerText = location;
        //peaks muutma siis selle sihtkoha asjad siis ära vb?
        p.onclick = function () {
            document.getElementById("lähtekoht").innerText = location; // Update button text
            dropdown.style.display = "none"; // Close dropdown
            fetchLocationDestinations(location);
            document.getElementById("sihtkohabutton").removeAttribute("disabled"); // aktiveerib date buttoni
            document.getElementById("datebutton").innerText = "Vali aeg";// kui nuppu uuest valida siis tühjendab date
            document.getElementById("sihtkoht").innerText = "Vali sihtkoht"; // kui muuta alguspunkti, siis sihtkoht töhjeneb
            document.getElementById("end-button").setAttribute("disabled", "true"); // aktiveerib end buttoni
        };
        dropdown.appendChild(p);
    });
}
function populateSihtkohadDropdown(destinations) {
    const dropdown = document.getElementById("sihtkoht-dropdown");
    dropdown.innerHTML = ""; // Clear previous options

    destinations.forEach(destination => {
        let p = document.createElement("p");
        p.innerText = destination;

        p.onclick = function () {
            document.getElementById("sihtkoht").innerText = destination; // Update destination text
            dropdown.style.display = "none"; // Close dropdown
            document.getElementById("datebutton").removeAttribute("disabled"); // aktiveerib date buttoni
            fetchFlightDates()//fetchib date info
            document.getElementById("datebutton").innerText = "Vali aeg"; // kui nuppu uuest valida siis tühjendab date
            document.getElementById("end-button").setAttribute("disabled", "true"); // aktiveerib end buttoni
        };

        dropdown.appendChild(p);
    });


}


function openSalePage() {
    const alguskoht = document.getElementById("lähtekoht").innerText;
    localStorage.setItem("alguskoht", alguskoht);

    const sihtkoht = document.getElementById("sihtkoht").innerText;
    localStorage.setItem("sihtkoht", sihtkoht);

    const date = document.getElementById("datebutton").innerText;
    localStorage.setItem("date", date);

    const reisijaid = document.getElementById("reisijaCount").innerText;
    localStorage.setItem("reisijaid", reisijaid);


    window.location.href= "sale.html";
}




