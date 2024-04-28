const searchForm = document.querySelector(".plantForm");
const searchInput = document.querySelector(".plantInput");
const card = document.querySelector(".card");
const rightwrapper = document.querySelector(".right-card-wrap")

searchForm.addEventListener("submit", async event => {
    event.preventDefault();

    const searchQuery = searchInput.value;
    if (searchQuery) {
        try {
            const plantData = await getPlantData(searchQuery);
            displayPlantInfo(plantData);
            console.log(plantData)
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
    card.textContent = ""; // Clear previous content
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
        const rightWrap = document.createElement("div");

        commonNameDisplay.textContent = commonName;
        scientificNameDisplay.textContent = `Scientific Name: ${scientificName}`;
        familyDisplay.textContent = `Family: ${family}`;
        imageDisplay.src = image;

        commonNameDisplay.classList.add("common-name-display");
        scientificNameDisplay.classList.add("scientific-name-display");
        familyDisplay.classList.add("family-display");
        imageDisplay.classList.add("image-display");
        rightWrap.classList.add("right-card-wrap");

        rightWrap.appendChild(commonNameDisplay);
        rightWrap.appendChild(scientificNameDisplay);
        rightWrap.appendChild(familyDisplay);
        card.appendChild(imageDisplay);
        card.appendChild(rightWrap);
    } else {
        displayError("No plant found.");
    }
}

