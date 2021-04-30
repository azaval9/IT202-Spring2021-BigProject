// ! ---------- INITIALIZE DATABASE --------------
const db = new Dexie('MyDatabase');

// Declare tables, IDs and indexes
db.version(1).stores({
    favorites: '++id, name, type, barDescription, cocktailDescription',
    reviews: '++id, name, type, rating, review, username'
});

function addFavoriteToDatabase(fname, ftype, fbarDescription, fcocktailDescription){
    db.reviews.put(
        {
            name: fname,
            type: ftype,
            barDescription: fbarDescription,
            cocktailDescription: fcocktailDescription
        }
    ).catch(function(error) {
        alert ("Ooops: " + error);
    });
};

function addFavoriteCard(item, cursor){
    //debugger;
    let divFavoriteCards = document.querySelector("#divFavoriteCards")
    let exampleCard = document.querySelector("#exampleFavoriteCard");
    let cloneCard = exampleCard.cloneNode(true);

    cloneCard.querySelector("#favoriteName").innerText = item.name;
    cloneCard.querySelector("#favoriteType").innerText = item.type;
    cloneCard.querySelector("#reviewBreweryDescription").innerText = item.barDescription;
    cloneCard.querySelector("#reviewCocktailDescription").innerText = item.cocktailDescription;

    cloneCard.classList.remove("hide-favoriteCard");
    cloneCard.classList.add("favoriteCard")
    divFavoriteCards.append(cloneCard);
}

function refreshFavoritesPage(){
    debugger;
    // //remove all cards 
    let favoriteCards = document.querySelectorAll(".favoriteCard:not(#exampleFavoriteCard)")
    favoriteCards.forEach(element => {
        element.remove();
    });

    //loop through the data base and add card
    db.reviews.each(addFavoriteCard);

};

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

let breweryWebsite = document.querySelector("#brewWebsite");
mdc.ripple.MDCRipple.attachTo(breweryWebsite);

brewerySearch.addEventListener("click", (e) => {
    // debugger;
    //user wants to search for a brewery 

    //delete all the cards 
    let cards = document.querySelectorAll(".breweryCard:not(#exampleCard)")
    cards.forEach(element => {
        element.remove();
    });

    //create only one option at a time 
    let dataString = "https://api.openbrewerydb.org/breweries";

    let name = document.querySelector("#inputName").value;
    let type = document.querySelector("#inputType").value;
    let city = document.querySelector("#inputCity").value;
    if(name != ""){
        // debugger;
        dataString += "/search?query=" + name; 
    }
    else if(type != ""){
        // debugger;
        dataString += "?by_type=" + type;
    }
    else if(city != ""){
        // debugger;
        dataString += "?by_city=" + city;
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


// ! ----------- COCKTAIL PAGE --------------------
//add event listeners to search on every click to search 
let cocktailName = document.querySelector("#inputCocktailName");
mdc.textField.MDCTextField.attachTo(cocktailName);

let cocktailSearch = document.querySelector("#btnCocktailSearch");
mdc.ripple.MDCRipple.attachTo(cocktailSearch);

let chipRandomSearch = document.querySelector("#chipRandom");
chipRandomSearch.addEventListener("click", (e) => {
    let dataString = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    removeCocktailCards();
    fetchAndDisplayCockatils(dataString);    
});

let chipAlcoholicSearch = document.querySelector("#chipAlcoholic");
chipAlcoholicSearch.addEventListener("click", (e) => {
    let dataString = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
    removeCocktailCards();
    fetchAndDisplayCockatils(dataString);
});

let chipNonAlcoholic = document.querySelector("#chipNonAlcoholic");
chipNonAlcoholic.addEventListener("click", (e) => {
    let dataString = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
    removeCocktailCards();
    fetchAndDisplayCockatils(dataString);
});

let chipNameSearch = document.querySelector("#btnCocktailSearch");
chipNameSearch.addEventListener("click", (e) => {
    let dataString = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    let name = document.querySelector("#inputCName").value;
    if(name != ""){
        dataString += name;
    }
    removeCocktailCards();
    fetchAndDisplayCockatils(dataString);
});

function removeCocktailCards(){
    let cocktailCards = document.querySelectorAll(".cocktailCard:not(#exampleCard)")
    cocktailCards.forEach(element => {
        element.remove();
    });
};

function fetchAndDisplayCockatils(dataString){
//fetch data and display 
    fetch(dataString)
    .then((response) => {
        return response.json();
    }).then((json) => {
        //debugger;
        for (let row in json) {
            console.log(row);
            let drinkArray = json[row];           
            drinkArray.forEach(drink => {
                console.log(drink);
            
                let divCards = document.querySelector("#divCocktailCards")
                let exampleCard = document.querySelector("#exampleCocktailCard");
                let cloneCard = exampleCard.cloneNode(true);
                // debugger;
                cloneCard.querySelector("#cocktailImage").src = drink["strDrinkThumb"];
                cloneCard.querySelector("#drinkANA").innerText = drink["strAlcoholic"]
                cloneCard.querySelector("#drinkName").innerText = drink["strDrink"];
                let listOfIngr = "Ingredients:" + "\n";
                for(i=1; i<=15; i++){
                    let ingred = "strIngredient" + i;
                    let measure = "strMeasure" + i;
                    if(drink[ingred] != null && drink[ingred] != ""){
                        let tempIngred = drink[ingred].replace('\n','');
                        let tempMeasure = "";
                        if(drink[measure] != null && drink[measure] != ""){
                            tempMeasure = drink[measure].replace('\n','');
                        }
                        else{
                            tempMeasure = drink[measure];
                        }
                        listOfIngr += i + ". " + tempIngred + " (" + tempMeasure + ")" + "\n";
                    }
                }
                cloneCard.querySelector("#drinkIngred").innerText = listOfIngr;
                cloneCard.querySelector("#drinkGlass").innerText = "Glass (Optional): " + drink["strGlass"];
                cloneCard.querySelector("#drinkInstr").innerText = "Instructions: " + drink["strInstructions"];
                cloneCard.id = drink["idDrink"];

                //add event listener to favorites button 
                cloneCard.querySelector("#btnCocktailAddFavorite").addEventListener("click", (e) => {
                    //add to the database send it all information
                    debugger;
                    let currentCard = e.currentTarget.parentElement;
                    let cName = currentCard.querySelector("#drinkName").innerText;
                    let cType = "Cocktail: " + currentCard.querySelector("#drinkANA").innerText;
                    let cBarDesc = "";
                    let cDescription = currentCard.querySelector("#drinkIngred").innerText;
                    addFavoriteToDatabase(cName, cType, cBarDesc, cDescription);
                    refreshFavoritesPage();
                });

                cloneCard.classList.remove("hide-cocktailCard");
                cloneCard.classList.add("cocktailCard");
                divCards.append(cloneCard);
            });
        }
    });
};


// ! ----------- HOME PAGE --------------------
// show home at the start of the program
document.querySelector("#home").style.display = "block";

// ! ----------- REVIEW PAGE ------------------
let presetReviews = [
    {
        name: "Goose Island Brewpub",
        type: "Brewery",
        rating: "9",
        barDescription: "Awesome pub in the Chicago. Good atmosphere. I would come again.",
        cocktailDescription: ""
    },
    {
        name: "Lagunitas Brewing Co",
        type: "Brewery",
        rating: "8",
        barDescription: "Good brewery, I like their drinks.",
        cocktailDescription: ""
    },
    {
        name: "Citrus Coke",
        type: "Cocktail",
        rating: "9.5",
        barDescription: "",
        cocktailDescription: "Simple and easy drink. I enjoy it on a lazy night."
    },
    {
        name: "Whiskey Sour",
        type: "Cocktail",
        rating: "9",
        barDescription: "",
        cocktailDescription: "Great flavor, I like to order them at weddings and special ocasions. Great drink to sip on until the food comes out."
    }
];

function removeReviewCards(){
    let reviewCards = document.querySelectorAll(".hide-reviewCard:not(#exampleReviewCard)")
    reviewCards.forEach(element => {
        element.remove();
    });
}

presetReviews.forEach(review => {
    removeReviewCards();

    let divCards = document.querySelector("#divReviewCards");
    let exampleCard = document.querySelector("#exampleReviewCard");
    let cloneCard = exampleCard.cloneNode(true);

    cloneCard.querySelector("#reviewName").innerText = review.name;
    cloneCard.querySelector("#reviewType").innerText = review.type;
    cloneCard.querySelector("#reviewRating").innerText = review.rating  + "/10";

    if(review.type == "Brewery"){
        cloneCard.querySelector("#reviewDescription").innerText = review.barDescription
    }
    else{
        cloneCard.querySelector("#reviewDescription").innerText = review.cocktailDescription
    }

    cloneCard.classList.remove("hide-reviewCard");   
    cloneCard.classList.add("reviewCard");
    divCards.append(cloneCard);
});


// ! ---------- FAVORITES PAGE ----------------
let cocktailFavoriteButtons = document.querySelectorAll("#btnCocktailAddFavorite")


