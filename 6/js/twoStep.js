//fetching environments once
const environmentsPromise = fetch('js/environments.json')
    .then(response => response.json())
    .then(data => data.environments)
    .catch(function(error) {
        console.error('Error fetching Environment content:', error);
    });

// variables for keeping track of step process
let isEnvironment = true;
let environmentIndex = -1;


// Initializes the two-step process by setting up event listeners and updating the back button.
async function init() {
    updateBackButton();

    const environments = await environmentsPromise;
    const cards = document.querySelectorAll('.two-step-card');

    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            if(isEnvironment) {
                environmentIndex = index;

                changeHero(environments[environmentIndex]);
                setAnimals(environments[environmentIndex]);
                
                isEnvironment = false;
                updateBackButton();
            } else {
                getAnimal(environments[environmentIndex].animals[index])
            }
        });
    });
}


// adds listeners and action for first step of getting environment
function setAnimals(environment) {  
    // for each card we are going to change to the respective environments to animals when clicked.
    for(let j = 0; j < 4; j++) {
        const animal = environment.animals[j];
        envToAnimals(animal, j + 1);
    }
}

// changes the hero image to the resepective environment
function changeHero(environment) {
     //swap the hero image out. 
    let heroImage = document.querySelector('.hero-image');
    heroImage.setAttribute('src', environment.heroImage);
    heroImage.setAttribute('alt', environment.heroAlt);
}

// adds listener and action for second step of getting animal
function getAnimal(animal) {
    console.log(animal);
}

// function to replace environment cards with animal cards
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

init();