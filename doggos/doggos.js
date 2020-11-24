const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");

fetch(BREEDS_URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        const breedsObject = data.message;
        const breedsArray = Object.keys(breedsObject);

        breedsArray.forEach(breeds => {
            const option = document.createElement("option");
            option.value = breeds;
            option.innerText = breeds;
            select.appendChild(option);
        })
    })

const img = document.querySelector(".dog-img");
const icon = document.querySelector(".load-icon");

function getDoggo(url) {
    icon.classList.add("show");
    img.classList.remove("show");
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            img.src = data.message;
        });
    //this will appear before the fetch() stuff
}

img.addEventListener("load", () => {
    icon.classList.remove("show");
    img.classList.add("show");
});

select.addEventListener("change", function(event) {
    const URL = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    const loadIcon = document.querySelector(".load-icon");

    getDoggo(URL);
});








/* select.addEventListener("change", function(event) {
    const BREED_URL = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    const loadIcon = document.querySelector(".load-icon");

    fetch(BREED_URL) 
        .then(response => {
            return response.json();
        })
        .then(data => {
            const img = document.querySelector(".dog-img");
            img.src = data.message;
            img.alt = `Cute ${event.target.value}`;

            loadIcon.classList.remove("spin");            
        })
    loadIcon.classList.add("spin");
}) */


// make url
// show loading spinner
// fetch from the API
// use the URL to change the current image
// stop showing loading spinner