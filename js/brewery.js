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
let brewewryName = document.querySelector("#inputBrewName");
mdc.textField.MDCTextField.attachTo(brewewryName);

let brewewryType = document.querySelector("#inputBrewType");
mdc.textField.MDCTextField.attachTo(brewewryType);

let brewewryCity = document.querySelector("#inputBrewCity");
mdc.textField.MDCTextField.attachTo(brewewryCity);

let brewerySearch = document.querySelector("#btnBrewSearch");
mdc.ripple.MDCRipple.attachTo(brewerySearch);

brewerySearch.addEventListener("click", () => {
    debugger;
    //user wants to search for a brewery 

    //take the available inputs and display a list of card breweries
});

let breweryWebsite = document.querySelector("#brewWebsite");
mdc.ripple.MDCRipple.attachTo(breweryWebsite);




// show home at the start of the program
document.querySelector("#home").style.display = "block";

