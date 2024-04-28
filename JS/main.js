const searchForm = document.querySelector(".plantForm");
const searchInput = document.querySelector(".plantInput");
const cardDisplay = document.querySelector(".card-display");
const rightwrapper = document.querySelector(".right-card-wrap")

searchForm.addEventListener("submit", async event => {
    event.preventDefault();

    const searchQuery = searchInput.value;
    if (searchQuery) {
        try {
            const plantData = await getPlantData(searchQuery);
            displayPlantInfo(plantData);
        } catch (error) {
            console.error(error);
            displayError("An error occurred while fetching data from the server");
        }
    } else {
        displayError("Please enter a search query!");
    }
});

async function getPlantData(searchQuery) {
    try {
        const apiKey = 'im sorry but i still have some brain left after this';
        const proxyUrl = 'http://localhost:3000/api/proxy';
        const apiUrl = `https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${searchQuery}`;
        const response = await fetch(`${proxyUrl}?url=${encodeURIComponent(apiUrl)}`);
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch data from Trefle API: " + error.message);
    }
}


function displayPlantInfo(data) {
    cardDisplay.textContent = "";
    const { data: plants } = data;
    for(i = 0; i < plants.length; i++) {

    cardDisplay.style.display = "flex";
    if (plants && plants.length > 0) {
        const plant = plants[i];
        const commonName = plant.common_name || "N/A";
        const scientificName = plant.scientific_name || "N/A";
        const family = plant.family || "N/A";
        const image = plant.image_url || "N/A";

        const commonNameDisplay = document.createElement("h1");
        const scientificNameDisplay = document.createElement("p");
        const familyDisplay = document.createElement("p");
        const imageDisplay = document.createElement("img");
        const rightWrap = document.createElement("div");
        const cardWrap = document.createElement("div");

        commonNameDisplay.textContent = commonName;
        scientificNameDisplay.textContent = `Scientific Name: ${scientificName}`;
        familyDisplay.textContent = `Family: ${family}`;
        imageDisplay.src = image;

        commonNameDisplay.classList.add("common-name-display");
        scientificNameDisplay.classList.add("scientific-name-display");
        familyDisplay.classList.add("family-display");
        imageDisplay.classList.add("image-display");
        rightWrap.classList.add("right-card-wrap");
        cardWrap.classList.add("card-wrap")

        cardDisplay.appendChild(cardWrap)
        rightWrap.appendChild(commonNameDisplay);
        rightWrap.appendChild(scientificNameDisplay);
        rightWrap.appendChild(familyDisplay);
        cardWrap.appendChild(imageDisplay);
        cardWrap.appendChild(rightWrap);
        
    } else {
        displayError("No plant found.");
    }

} 
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}