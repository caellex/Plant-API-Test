const weatherForm = document.querySelector(".weatherForm");
const searchInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async event => {
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
        const apiKey = 'bFxe5hBZx4Mj6bk-MPbIvj-TVyt86x-1hGRPc2DAcyE';
        const apiUrl = `https://cors-anywhere.herokuapp.com/https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${searchQuery}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Could not fetch data");
        }
        return await response.json();
    } catch (error) {
        throw new Error("Failed to fetch data from Trefle API: " + error.message);
    }
}

function displayPlantInfo(data) {
    card.textContent = "";
    card.style.display = "flex";

    const { data: plants } = data;
    if (plants && plants.length > 0) {
        const plant = plants[0];
        const commonName = plant.common_name || "N/A";
        const scientificName = plant.scientific_name || "N/A";
        const family = plant.family || "N/A";
        const image = plant.image_url || "N/A";

        const commonNameDisplay = document.createElement("h1");
        const scientificNameDisplay = document.createElement("p");
        const familyDisplay = document.createElement("p");
        const imageDisplay = document.createElement("img");

        commonNameDisplay.textContent = commonName;
        scientificNameDisplay.textContent = `Scientific Name: ${scientificName}`;
        familyDisplay.textContent = `Family: ${family}`;
        imageDisplay.src = image;

        commonNameDisplay.classList.add("commonNameDisplay");
        scientificNameDisplay.classList.add("scientificNameDisplay");
        familyDisplay.classList.add("familyDisplay");
        imageDisplay.classList.add("imageDisplay");

        card.appendChild(commonNameDisplay);
        card.appendChild(scientificNameDisplay);
        card.appendChild(familyDisplay);
        card.appendChild(imageDisplay);
    } else {
        displayError("No plant found.");
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
