//uuendab lõpphinda
function updatePrice(hind) {
    let selectedSeats = document.querySelectorAll(".selected");
    let newPrice = selectedSeats.length * hind;
    document.getElementById("ticketPrice").innerText = `${newPrice} €`;
}

//Istehohtade valiku boxide kinni panek kui vajutatakse
function otsiIstekohad(){
    let aknaAares = document.getElementById('akna-aares');
    let korvuti = document.getElementById('korvuti');
    let jalaruum = document.getElementById('jalaruum');
    let lahValja = document.getElementById('lah-valja');

    // Check which one is checked
    switch (true) {
        case aknaAares.checked:
            toggleCheckboxes('akna-aares', 'korvuti', 'jalaruum', 'lah-valja');
            break;
        case korvuti.checked:
            toggleCheckboxes('korvuti', 'akna-aares', 'jalaruum', 'lah-valja');
            break;
        case jalaruum.checked:
            toggleCheckboxes('jalaruum', 'akna-aares', 'korvuti', 'lah-valja');
            break;
        case lahValja.checked:
            toggleCheckboxes('lah-valja', 'akna-aares', 'korvuti', 'jalaruum');
            break;
        default:
            // If none are checked, set default
            document.getElementById('lah-valja').checked = true;
            toggleCheckboxes('lah-valja', 'akna-aares', 'korvuti', 'jalaruum');
            break;
    }

}


function toggleCheckboxes(currentId, other1Id, other2Id, other3Id) {
    let current = document.getElementById(currentId);
    let other1 = document.getElementById(other1Id);
    let other2 = document.getElementById(other2Id);
    let other3 = document.getElementById(other3Id);
    const plus = document.getElementById("plusButton");
    plus.classList.remove("disabled-button");
    if (current.checked) {
        other1.checked = false;
        other2.checked = false;
        other3.checked = false;

        //üleval togelimine
        //
        //all istekohtade valik

        unselectAllSeats();
        if(current.id==="akna-aares"){
            margiaken();
        }
        if(current.id==="korvuti"){
            margikorvuti();
        }
        if(current.id==="jalaruum"){
            margijala();
        }
        if(current.id==="lah-valja"){
            margilah();
        }
    }else{
        console.log("error in toggleCheckboxes")
    }
}

//UNselectib kõik boxid
function nupudUnselect(){
    document.getElementById('akna-aares').checked = false;
    document.getElementById('korvuti').checked = false;
    document.getElementById('jalaruum').checked = false;
    document.getElementById('lah-valja').checked = false;
}


//akna aluste istekohtade soovitamine
function margiaken(){
    let firstRow = document.querySelector(".row"); // Selects the first row
    let seatCount = firstRow.querySelectorAll(".seat").length; // Counts the seats in the row
    let mitu= parseInt(document.getElementById("reisijaCount").innerText);
    let i = 0;
    let seats = document.querySelectorAll(".seat");
    let istekohaNR = 1;
    for (let seat of seats) {
        if (istekohaNR % seatCount ===1 || istekohaNR % seatCount ===0) {
            if (!seat.classList.contains("booked")) {
                seat.classList.add("selected");
                i++;
                if (i === mitu) {
                    break;
                }
            }
        }istekohaNR++;
    }if(i<mitu){
        polePiisavaltKohti(i, "aken", mitu);
        return;
    }
}

//kõrvuti istekohtade soovitamine
function margikorvuti(){
    let mitu= parseInt(document.getElementById("reisijaCount").innerText);
    let rows = document.querySelectorAll(".row");

    //kui lennuk pole piisavalt lai
    let firstRow = document.querySelector(".row"); // Selects the first row
    let seatCount = firstRow.querySelectorAll(".seat").length; // Counts the seats in the row
    if(mitu> seatCount){
        polePiisavaltKohti(seatCount, "korvuti", mitu);//ütleb mitu sellist kohta on
        setTimeout(margikorvuti(),200);//jalaruum laheb katki sellega(kui siin pole siis see ei tööta ja kui jalaruumil on siis jalaruum ei tööta IDK)
        return;
    }

    for(let row of rows){
        let seats = row.querySelectorAll(".seat");
        let jarjestVaba=0;
        let jarjestVabaMAX = 0;
        let algusIndeks = 0;
        let jooksevIndeks=0;
        let KasSobib = 0;

        //kontrollib kas rida on sobiv;
        for (let seat of seats) {
            if(seat.classList.contains("booked")){
                jarjestVaba=0;
                algusIndeks=jooksevIndeks;
            }else{
                jarjestVaba++;
                if(jarjestVaba>jarjestVabaMAX){jarjestVabaMAX=jarjestVaba}
            }jooksevIndeks++;
            if(jarjestVabaMAX===mitu){
                KasSobib=1;
                break;
            }
        }
        //kui see rida sobis siis täidab
        if(KasSobib===1){
            for (let i = algusIndeks; i < seats.length; i++) {
                let seat = seats[i];
                //igaks juhuks
                if(!seat.classList.contains("booked")){
                    seat.classList.add("selected");
                    mitu--;
                    if(mitu===0){
                        return;
                    }
                }
            }
        }
    }
}

//rohkem jalaruumi istekohtade soovitamine
function margijala(){

    let mitu= parseInt(document.getElementById("reisijaCount").innerText);
    let rows = document.querySelectorAll(".row");
    let rowsCount = rows.length;
    let r= 1;

    for(let row of rows){
        if(r === Math.ceil(rowsCount / 2)+1){
            let nextRowSeats = row.querySelectorAll(".seat");
            let i = 0;
            for (let seat of nextRowSeats) {
                if(!seat.classList.contains("booked")){
                    seat.classList.add("selected");
                    i++;
                    if (i===mitu){
                        break;
                    }
                }
            }
            //kui piisavalt kohti ei ole siis vähendab reisijate arvu ja ütleb
            if(i<mitu){
                polePiisavaltKohti(i, "jalaruum", mitu);//ütleb mitu sellist kohta on
                return;
            }
        }r++;
    }
}

//uksele lähedal istekohtade soovitamine
function margilah(){
    let mitu= parseInt(document.getElementById("reisijaCount").innerText);
    let i = 0;
    let seats = document.querySelectorAll(".seat");

    for (let seat of seats) {
        if(!seat.classList.contains("booked")){
            seat.classList.add("selected");
            i++;
            if (i===mitu){
                break;
            }
        }
    }if(i<mitu){
        polePiisavaltKohti(i, "lahedal", mitu);
        return;
    }
}

// kui pole piisavalt kohti
/**
 *
 * @param mituOnLisatudLennukisse - mitu kohta mahtus lennukisse
 * @param tuup - millisest funktsioonist tuleb
 * @param mituSooviti - mitu kohta kasutaja soovi saada
 */
function polePiisavaltKohti(mituOnLisatudLennukisse, tuup, mituSooviti){
    console.log("joudsin siia")
    const plus = document.getElementById("plusButton");
    plus.classList.add("disabled-button");
    muudaReisija(-(mituSooviti-mituOnLisatudLennukisse), 'ei');
    // add a popup
}


//Kui on 4 kohta real siis viimane täht on D(istekohtade tähistuseks vajalik)
function leiaSuurimTaht(rows){
    switch (rows) {
        case 1:
            return "A";
        case 2:
            return "B";
        case 3:
            return "C";
        case 4:
            return "D";
        case 5:
            return "E";
        case 6:
            return "F";
        case 7:
            return "G";
        case 8:
            return "H";
        default:
            return "X"; // Handle any other cases if needed
    }
}


// kinniste istekohtade määramine
function getBookedSeats(piletid, seatsPerRow) {
    const bookedSeats = new Set();
    console.log(piletid)
    piletid.forEach(ridad => {
        if (ridad.vaba === false) {  // Check if the seat is not free
            let reanumber = Math.floor(ridad.kohaNumber / seatsPerRow);
            let koigeSuuremTaht = leiaSuurimTaht(seatsPerRow);
            let taht = "";
            let ajutine = ridad.kohaNumber % seatsPerRow;

            // Switch to determine the seat letter based on the seat index
            switch (ajutine) {
                case 1:
                    taht = "A";
                    break;
                case 2:
                    taht = "B";
                    break;
                case 3:
                    taht = "C";
                    break;
                case 4:
                    taht = "D";
                    break;
                case 5:
                    taht = "E";
                    break;
                case 6:
                    taht = "F";
                    break;
                case 0:
                    taht = koigeSuuremTaht;
                    break;
                default:
                    console.log("Other value: " + ajutine);
                    taht = "X";
                    break;
            }

            // lisab set'i kohad mis on juba hõivatud
            bookedSeats.add(`${reanumber}${taht}`);
        }
    });
    return bookedSeats
}


//lennuki suuruse järgi plaani tegemine
function looIstekohad(rows, seatsPerRow, bookedSeats) {
    let selectedSeatsQueue = [];  // Queue to keep track of selected seats
    const planeDiv = document.getElementById("plane");
    planeDiv.innerHTML = ""; // Puhastame enne loomist

    for (let r = 1; r <= rows; r++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");

        // Add extra spacing before the middle row
        if (r === Math.ceil(rows / 2)+1) {
            let legroomDiv = document.createElement("div");
            legroomDiv.classList.add("legroom");
            planeDiv.appendChild(legroomDiv); // Insert a gap before the middle row
        }

        for (let s = 1; s <= seatsPerRow; s++) {
            // vahekäigud
            if (seatsPerRow === 6 && s === 4) {
                let aisleDiv = document.createElement("div");
                aisleDiv.classList.add("aisle");
                rowDiv.appendChild(aisleDiv);
            }
            // vahekäigud
            if (seatsPerRow === 4 && s === 3) {
                let aisleDiv = document.createElement("div");
                aisleDiv.classList.add("aisle");
                rowDiv.appendChild(aisleDiv);
            }
            // vahekäigud
            if (seatsPerRow === 7 &&( s === 3 || s===6)) {
                let aisleDiv = document.createElement("div");
                aisleDiv.classList.add("aisle");
                rowDiv.appendChild(aisleDiv);
            }

            let seatID = r + String.fromCharCode(64 + s);
            let seatDiv = document.createElement("div");
            seatDiv.classList.add("seat");
            seatDiv.innerText = seatID;

            if (bookedSeats.has(seatID)) {
                seatDiv.classList.add("booked");
            }

            seatDiv.addEventListener("click", function () {
                if (!this.classList.contains("booked")) {
                    const selectedSeats = document.querySelectorAll(".selected");
                    nupudUnselect()
                    // ei lase alla 1 istme selectidu istmeid
                    if (this.classList.contains("selected") && selectedSeats.length === 1) {
                        return;
                    }

                    // Toggle selection state
                    this.classList.toggle("selected");

                    // Update the count
                    if (this.classList.contains("selected")) {
                        muudaReisija(1, 'ei');
                    } else {
                        muudaReisija(-1, 'ei');
                    }

                    document.getElementById("reisijaCount").innerText = document.querySelectorAll(".selected").length;
                }
            });

            rowDiv.appendChild(seatDiv);
        }
        planeDiv.appendChild(rowDiv);
    }
}

function unselectAllSeats() {
    document.querySelectorAll(".seat.selected").forEach(seat => {
        seat.classList.remove("selected");
    });
}

function Ostapilet() {
    // Show popup and overlay
    document.getElementById("popupModal").style.display = "block";
    document.getElementById("popupOverlay").style.display = "block";

    //kuvab valitud piletid
    let selectedSeats = document.querySelectorAll(".selected");
    let kokkuvalitud = selectedSeats.length;
    let seatList = [];
    selectedSeats.forEach(seat => {
        seatList.push(seat.innerText);
    });
    if(kokkuvalitud===1)document.getElementById("pop-tekst").innerText = "Valitud istekoht:";
    else document.getElementById("pop-tekst").innerText = "Valitud istekohad:";
    document.getElementById("selectedSeats").innerText = seatList.join(" | ");
}

function closePopup() {
    // Hide popup and overlay
    document.getElementById("popupModal").style.display = "none";
    document.getElementById("popupOverlay").style.display = "none";
}

function confirmPurchase() {
    BookiPiletidBackendis();
    alert("Ost oli edukas!");
        //backendis ka muuta
    TagasiEsiLeh();
    closePopup();
}


function TagasiEsiLeh(){
    window.location.href = 'index.html';
}
function BookiPiletidBackendis(){
    let selectedSeats = document.querySelectorAll(".selected");
    let seatList = [];
    selectedSeats.forEach(seat => {
        seatList.push(seat.innerText);
    });
    let IsteKArvud = TeeArvudeks(seatList);
    console.log(IsteKArvud);
    //nüüd mul on valitud kohtade numbrid nagu backendis
    //saadan info backendi
    console.log("Lennud ID:", window.lennudID);
    let lennud = window.lennudID;
    console.log(lennud);
    let requestData = {
        seats: IsteKArvud,
        planeId: lennud
    };


    console.log("Sending JSON:", JSON.stringify(requestData));
    // Backendi saatmine
    fetch("http://localhost:8080/api/book-seats", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Midagi läks valesti");
        });


}


function TeeArvudeks(seatList){
    let firstRow = document.querySelector(".row");
    let seatCount = firstRow.querySelectorAll(".seat").length;

    const seatLetters = ["A", "B", "C", "D", "E", "F", "G", "H"]; // sest 8 on max ridu
    let seatNumbers = [];

    seatList.forEach(seatLabel => {
        //chatgtp logic
        let rowNumber = parseInt(seatLabel.match(/\d+/)[0], 10);
        let seatLetter = seatLabel.match(/[A-Z]/)[0];
        let seatIndex = seatLetters.indexOf(seatLetter);

        if (seatIndex !== -1) {
            let seatNumber = (rowNumber - 1) * seatCount + (seatIndex + 1);
            seatNumbers.push(seatNumber);
        }
    });

    return seatNumbers;

}