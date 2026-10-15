// >>>>>>>>>>>>>>>>>>>>>>> 
//  Fetching Environments 
// <<<<<<<<<<<<<<<<<<<<<<<

// Fetching the environments JSON file and storing it as a promise.
const ENVIRONMENTS_PROMISE = fetch('js/environments.json')
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
    const TITLE_ELEMENT = document.querySelector('title');
    TITLE_ELEMENT.textContent = item.title;
}

// Clears the main content area of the page.
function clearMain() {
    const MAIN = document.querySelector('main');
    MAIN.innerHTML = '';
}

// Swaps the hero image to the resepective environment
function changeHeroImage(item) { 
    const HERO_IMAGE = document.querySelector('.hero-image');
    HERO_IMAGE.setAttribute('src', item.heroImage);
    HERO_IMAGE.setAttribute('alt', item.heroAlt);
}

// Changes the hero title
function changeHeroTitle(item) {
    const HERO_TITLE = document.querySelector('.hero-title');
    HERO_TITLE.textContent = item.name;
}

// adds a section bar (horizontal rule) to the specified element.
function addSectionBar(element) {
    const BAR = document.createElement('hr');
    BAR.classList.add('section-bar');
    element.appendChild(BAR);
}




// >>>>>>>>>>>>>>>>>>>>>>>>>>
// Back Button Functionality
// <<<<<<<<<<<<<<<<<<<<<<<<<<

// Sets the back button functionality based on the current step.
const BACK_BUTTON_ELEMENT = document.querySelector('#twoStep-back');
BACK_BUTTON_ELEMENT.addEventListener('click', () => {
    if (isEnvironment) {
        window.location.href = 'index.html';
    } else {
        window.location.reload();
    }
});

// Updates the back button text based on the current step.
function updateBackButton() {
    BACK_BUTTON_ELEMENT.textContent = isEnvironment
        ? 'Back to Lights Out'
        : 'Back to Environments';
}

// Sets the animal endpoint functionality.
function setAnimalEndpointBackButton() {
    const ANIMAL_BACK_BUTTON = document.querySelector('#animal-back');

    ANIMAL_BACK_BUTTON.addEventListener('click', () => {
        window.location.href = 'twoStep.html';
    });
}




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  Step One: Environment Selection
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Swapping image and title elements for the environment to animal card step.
function envToAnimals(animal, cardNum) {
    //creating new image element
    const IMAGE = document.createElement('img');
    IMAGE.src = animal.image;
    IMAGE.alt = animal.alt;
    IMAGE.classList.add('wide-img-window');

    //creating new card title element
    const STRONG = document.createElement('strong');
    STRONG.textContent = animal.name;
    STRONG.classList.add('two-step-title');

    //getting child and parent elements for swap. 
    const IMG_CHILD = document.querySelector(`#card${cardNum} img`);
    const STRONG_CHILD = document.querySelector(`#card${cardNum} strong`);
    const PARENT = IMG_CHILD.parentNode;

    //swapping image and title elements with new information and order.
    PARENT.replaceChild(IMAGE, STRONG_CHILD);
    PARENT.replaceChild(STRONG, IMG_CHILD);
}

// Sets the animal cards for the selected environment.
function setAnimals(environment) {  
    // for each card we are going to change to the respective environments to animals when clicked.
    for(let j = 0; j < environment.animals.length; j++) {
        const ANIMAL = environment.animals[j];
        envToAnimals(ANIMAL, j + 1);
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
    const ENDPOINT = animal.endpoint;
    
    clearMain();
    const MAIN = document.querySelector('main');
    

    // Adding the animal endpoint
    addSectionBar(MAIN);
    MAIN.innerHTML += `
        <section class="content-box" aria-label="Little brown bat photograph">
            <figure class="animal-profile-pic">
                <img class="wide-img-window" src=${animal.image} alt="${animal.alt}">
                <figcaption>${animal.name}. Source: <a href="https://www.pexels.com/">Pexels.com</a></figcaption>
            </figure>
        </section>
    `;
    addSectionBar(MAIN);
    MAIN.innerHTML += `
        <section class="content-box" aria-label="${animal.name} information">
            <div class="animal-info">
                <div class="animal-quick-facts">
                    <h3>Quick Facts</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <ul>
                        <li><strong>Size:</strong> ${ENDPOINT.quickFacts.size}</li>
                        <li><strong>Weight:</strong> ${ENDPOINT.quickFacts.weight}</li>
                        <li><strong>Lifespan:</strong> ${ENDPOINT.quickFacts.lifespan}</li>
                        <li><strong>Conservation Status:</strong> ${ENDPOINT.quickFacts.conservationStatus}</li>
                        <li><strong>Range:</strong> ${ENDPOINT.quickFacts.range}</li>
                    </ul>
                </div>
                <div class="animal-description">
                    <h3>Key Nighttime Adaptations</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <p>${ENDPOINT.adaptations}</p>
                    <h3>Diet</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <p>${ENDPOINT.diet}</p>
                    <h3>Role in Ecosystem</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <p>${ENDPOINT.role}</p>
                    <div class="animal-fun-fact"><p><strong>Fun Fact:</strong> ${ENDPOINT.funFact}</p></div>
                </div>
                <figure class="animal-range-map">
                    <img class="wide-img-window" src="${ENDPOINT.rangeMap}" alt="${ENDPOINT.rangeMapAlt}">
                    <figcaption>${ENDPOINT.rangeMapCaption}
                    </figcaption>
                </figure>
            </div>
        </section>
    `;
    addSectionBar(MAIN);
    MAIN.innerHTML += `
        <section class="content-box" aria-label="${ENDPOINT.effectTitle}">
            <div class="animal-light-effect">
                <h3 class="change glow">${ENDPOINT.effectTitle}</h3>
                <p>${ENDPOINT.effectDescription}</p>
            </div>
            <button class="button" id="animal-back">Back to Environments</button>
        </section>
    `;
    addSectionBar(MAIN);
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
    const ENVIRONMENTS = await ENVIRONMENTS_PROMISE;
    const CARDS = document.querySelectorAll('.two-step-card');

    // Adding click event listeners to each card for the two-step selection process.
    CARDS.forEach((card, index) => {
        card.addEventListener('click', function() {
            if(isEnvironment) {
                // setting environment index to the clicked card so we know which environment was selected for the second step
                environmentIndex = index;
                stepOne(ENVIRONMENTS[environmentIndex]);
            } else {
                stepTwo(ENVIRONMENTS[environmentIndex].animals[index])
            }
        });
    });
}

init();