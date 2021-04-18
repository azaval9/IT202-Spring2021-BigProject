// let topBar = mdc.topAppBar.MDCTopAppBar.attachTo(
//     document.querySelector(".mdc-top-app-bar")
// );
const drawer = mdc.drawer.MDCDrawer.attachTo( document.querySelector(".mdc-drawer"));
const listEl = document.querySelector(".mdc-drawer .mdc-list");
const mainContentEl = document.querySelector(".main-content");


listEl.addEventListener("click", (event) => {
    drawer.open = false;

    document.querySelectorAll(".screen").forEach((screen) => {
            screen.style.display = "none";
    });

    debugger;
    //read data-screen attribute
    let theScreen = event.target.getAttribute("data-screen");

    //get the class screen that the user clicked on
    let targetScreen = document.querySelector("#div" + theScreen);

    //show display
    targetScreen.style.display = "block";
});



document.querySelector("#btnNavBarMenu").addEventListener("click", () => {
    drawer.open = true;
});


// let navAnchors = document.querySelectorAll("a.nav-link");
// //console.log("hello");
// //add a click event listener to each nav link
// navAnchors.forEach((anchor) => {
//     anchor.addEventListener("click", (event) => {
//         //hide all screens first
//         document.querySelectorAll(".screen").forEach((screen) => {
//             screen.style.display = "none";
//         });

//         //read data-screen attribute
//         let theScreen = event.target.getAttribute("data-screen");

//         //get the class screen that the user clicked on
//         let targetScreen = document.querySelector("#" + theScreen);

//         //show display
//         targetScreen.style.display = "block";
//     });
// });