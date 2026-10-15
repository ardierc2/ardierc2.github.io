// >>>>>>>>>>>>>>>>>>>>>>> 
//  Fetching Environments 
// <<<<<<<<<<<<<<<<<<<<<<<

// Fetching the environments JSON file and storing it as a promise.
const environmentsPromise = fetch('js/environments.json')
    .then(response => response.json())
    .then(data => data.environments)
    .catch(function(error) {
        console.error('Error fetching Environment content:', error);
    });

    


// >>>>>>>>>>>>>>>>>>>>>>>>>>
//   Two-Step Process State
// <<<<<<<<<<<<<<<<<<<<<<<<<<

// Variables for keeping track of the two-step process
let isEnvironment = true;
let environmentIndex = -1;




// >>>>>>>>>>>>>
//    Helpers
// <<<<<<<<<<<<<

// Changes the document title.
function changeTitle(item) {
    const titleElement = document.querySelector('title');
    titleElement.textContent = item.title;
}

// Clears the main content area of the page.
function clearMain() {
    const main = document.querySelector('main');
    main.innerHTML = '';
}

// Swaps the hero image to the resepective environment
function changeHeroImage(item) { 
    let heroImage = document.querySelector('.hero-image');
    heroImage.setAttribute('src', item.heroImage);
    heroImage.setAttribute('alt', item.heroAlt);
}

// Changes the hero title
function changeHeroTitle(item) {
    let heroTitle = document.querySelector('.hero-title');
    heroTitle.textContent = item.name;
}

// adds a section bar (horizontal rule) to the specified element.
function addSectionBar(element) {
    let bar = document.createElement('hr');
    bar.classList.add('section-bar');
    element.appendChild(bar);
}




// >>>>>>>>>>>>>>>>>>>>>>>>>>
// Back Button Functionality
// <<<<<<<<<<<<<<<<<<<<<<<<<<

// Sets the back button functionality based on the current step.
const backButtonElement = document.querySelector('#twoStep-back');
backButtonElement.addEventListener('click', () => {
    if (isEnvironment) {
        window.location.href = 'index.html';
    } else {
        window.location.reload();
    }
});

// Updates the back button text based on the current step.
function updateBackButton() {
    backButtonElement.textContent = isEnvironment
        ? 'Back to Lights Out'
        : 'Back to Environments';
}

// Sets the animal endpoint functionality.
function setAnimalEndpointBackButton() {
    const animalBackButton = document.querySelector('#animal-back');

    animalBackButton.addEventListener('click', () => {
        window.location.href = 'twoStep.html';
    });
}




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  Step One: Environment Selection
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Swapping image and title elements for the environment to animal card step.
function envToAnimals(animal, cardNum) {
    //creating new image element
    let image = document.createElement('img');
    image.src = animal.image;
    image.alt = animal.alt;
    image.classList.add('wide-img-window');

    //creating new card title element
    let strong = document.createElement('strong');
    strong.textContent = animal.name;
    strong.classList.add('two-step-title');

    //getting child and parent elements for swap. 
    let imgChild = document.querySelector(`#card${cardNum} img`);
    let strongChild = document.querySelector(`#card${cardNum} strong`);
    let parent = imgChild.parentNode;

    //swapping image and title elements with new information and order.
    parent.replaceChild(image, strongChild);
    parent.replaceChild(strong, imgChild);
}

// Sets the animal cards for the selected environment.
function setAnimals(environment) {  
    // for each card we are going to change to the respective environments to animals when clicked.
    for(let j = 0; j < environment.animals.length; j++) {
        const animal = environment.animals[j];
        envToAnimals(animal, j + 1);
    }
}

// Transition from environment selection to animal selection.
function stepOne(environment) {
    changeTitle(environment);
    changeHeroImage(environment);
    changeHeroTitle(environment);
    setAnimals(environment);

    isEnvironment = false;
    updateBackButton();
}




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  Step Two: Animal Selection
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Renders the detailed information for the selected animal.
function renderAnimal(animal) {
    const endpoint = animal.endpoint;
    
    clearMain();
    const main = document.querySelector('main');
    

    // Adding the animal endpoint
    addSectionBar(main);
    main.innerHTML += `
        <section class="content-box" aria-label="Little brown bat photograph">
            <figure class="animal-profile-pic">
                <img class="wide-img-window" src=${animal.image} alt="${animal.alt}">
                <figcaption>${animal.name}. Source: <a href="https://www.pexels.com/">Pexels.com</a></figcaption>
            </figure>
        </section>
    `;
    addSectionBar(main);
    main.innerHTML += `
        <section class="content-box" aria-label="${animal.name} information">
            <div class="animal-info">
                <div class="animal-quick-facts">
                    <h3>Quick Facts</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <ul>
                        <li><strong>Size:</strong> ${endpoint.quickFacts.size}</li>
                        <li><strong>Weight:</strong> ${endpoint.quickFacts.weight}</li>
                        <li><strong>Lifespan:</strong> ${endpoint.quickFacts.lifespan}</li>
                        <li><strong>Conservation Status:</strong> ${endpoint.quickFacts.conservationStatus}</li>
                        <li><strong>Range:</strong> ${endpoint.quickFacts.range}</li>
                    </ul>
                </div>
                <div class="animal-description">
                    <h3>Key Nighttime Adaptations</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <p>${endpoint.adaptations}</p>
                    <h3>Diet</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <p>${endpoint.diet}</p>
                    <h3>Role in Ecosystem</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <p>${endpoint.role}</p>
                    <div class="animal-fun-fact"><p><strong>Fun Fact:</strong> ${endpoint.funFact}</p></div>
                </div>
                <figure class="animal-range-map">
                    <img class="wide-img-window" src="${endpoint.rangeMap}" alt="${endpoint.rangeMapAlt}">
                    <figcaption>${endpoint.rangeMapCaption}
                    </figcaption>
                </figure>
            </div>
        </section>
    `;
    addSectionBar(main);
    main.innerHTML += `
        <section class="content-box" aria-label="${endpoint.effectTitle}">
            <div class="animal-light-effect">
                <h3 class="change glow">${endpoint.effectTitle}</h3>
                <p>${endpoint.effectDescription}</p>
            </div>
            <button class="button" id="animal-back">Back to Environments</button>
        </section>
    `;
    addSectionBar(main);
}

// renders the final endpoint for an animal.
function stepTwo(animal) {
    changeTitle(animal);
    changeHeroTitle(animal);
    renderAnimal(animal);

    setAnimalEndpointBackButton();
}




// >>>>>>>>>>>>>>>>>
//  Initialization
// <<<<<<<<<<<<<<<<<

// Initializes the two-step process by setting up event listeners and updating the back button.
async function init() {
    updateBackButton();

    // Waiting for the environments data to be fetched before setting up the event listeners.
    const environments = await environmentsPromise;
    const cards = document.querySelectorAll('.two-step-card');

    // Adding click event listeners to each card for the two-step selection process.
    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            if(isEnvironment) {
                // setting environment index to the clicked card so we know which environment was selected for the second step
                environmentIndex = index;
                stepOne(environments[environmentIndex]);
            } else {
                stepTwo(environments[environmentIndex].animals[index])
            }
        });
    });
}

init();