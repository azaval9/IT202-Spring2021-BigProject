// let topBar = mdc.topAppBar.MDCTopAppBar.attachTo(
//     document.querySelector(".mdc-top-app-bar")
// );
const drawer = mdc.drawer.MDCDrawer.attachTo( document.querySelector(".mdc-drawer"));
const listEl = document.querySelectorAll(".mdc-list-item");
const mainContentEl = document.querySelector(".main-content");

//listEl contains all the listElements
listEl.forEach(item => {
    item.addEventListener("click", (event) => {
        drawer.open = false;
        document.querySelectorAll(".screen").forEach((screen) => {
                screen.style.display = "none";
                screen.classList.remove("mdc-list-item--activated");
        });

        //debugger;
        //read data-screen attribute
        let theScreen = event.currentTarget.getAttribute("href");

        //get the class screen that the user clicked on
        let targetScreen = document.querySelector(theScreen);

        //show display
        targetScreen.style.display = "block";
        targetScreen.classList.add("mdc-list-item--activated");
    });
});

document.querySelector("#btnNavBarMenu").addEventListener("click", () => {
    drawer.open = true;
});

// ! ----------- BREWERY PAGE --------------------
let breweryName = document.querySelector("#inputBrewName");
mdc.textField.MDCTextField.attachTo(breweryName);

let breweryType = document.querySelector("#inputBrewType");
mdc.textField.MDCTextField.attachTo(breweryType);

let breweryCity = document.querySelector("#inputBrewCity");
mdc.textField.MDCTextField.attachTo(breweryCity);

let brewerySearch = document.querySelector("#btnBrewSearch");
mdc.ripple.MDCRipple.attachTo(brewerySearch);

brewerySearch.addEventListener("click", () => {
    debugger;
    //user wants to search for a brewery 

    //delete all the cards 
    let cards = document.querySelectorAll(".breweryCard:not(#exampleCard)")
    cards.forEach(element => {
        element.remove();
    });

    //create all the string to fetch the information
    // let params = new URLSearchParams(
    //     [
    //     ["name", document.querySelector("#inputName").value]
    //     ,["brewery_type", document.querySelector("#inputType").value]
    //     ,["city", document.querySelector("#inputCity").value]
    //     ]
    // )

    let dataString = "https://api.openbrewerydb.org/breweries";
    if(breweryName != ""){
        debugger;
        let name = document.querySelector("#inputName").value;
        dataString += "/search?query=" + name; 
    }

    fetch(dataString)
    .then((response) => {
        return response.json();
    }).then((json) => {
        for (let row of json) {
            console.log(row);
            let divCards = document.querySelector("#divCards")
            let exampleCard = document.querySelector("#exampleCard");
            let cloneCard = exampleCard.cloneNode(true);

            cloneCard.querySelector("#brewName").innerText = row["name"];
            cloneCard.querySelector("#brewType").innerText = row["brewery_type"];
            cloneCard.querySelector("#brewAddress").innerText = 
                row["street"] + "\n" 
                + row["city"] + ", " + row["state"] + " " + row["postal_code"] + "\n"
                + row["country"]; 
            cloneCard.querySelector("#brewPhone").innerText = row["phone"];
            cloneCard.querySelector("#brewWebsite").href = row["website_url"];

            cloneCard.id = row["id"];
            cloneCard.classList.remove("hide-breweryCard");
            cloneCard.classList.add("breweryCard");
            divCards.append(cloneCard);
        }
    });
});

let breweryWebsite = document.querySelector("#brewWebsite");
mdc.ripple.MDCRipple.attachTo(breweryWebsite);




// show home at the start of the program
document.querySelector("#home").style.display = "block";

