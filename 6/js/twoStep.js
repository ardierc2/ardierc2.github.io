// >>>>>>>>>>>>>>>>>>>>>>> 
//  Fetching Environments 
// <<<<<<<<<<<<<<<<<<<<<<<
const environmentsPromise = fetch('js/environments.json')
    .then(response => response.json())
    .then(data => data.environments)
    .catch(function(error) {
        console.error('Error fetching Environment content:', error);
    });



// >>>>>>>>>>>>>>>>>>>>>>> 
//    Two-Step Process
// <<<<<<<<<<<<<<<<<<<<<<<
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
                // setting environment index to the clicked card so we know which environment was selected for the second step
                environmentIndex = index;
                stepOne(environments[environmentIndex]);
            } else {
                renderAnimal(environments[environmentIndex].animals[index])
            }
        });
    });
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  Step One: Environment Selection
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// Transition from environment selection to animal selection.
function stepOne(environment) {
    changeTitle(environment);
    changeHeroImage(environment);
    changeHeroTitle(environment);
    setAnimals(environment);

    isEnvironment = false;
    updateBackButton();
}

// Sets the animal cards for the selected environment.
function setAnimals(environment) {  
    // for each card we are going to change to the respective environments to animals when clicked.
    for(let j = 0; j < 4; j++) {
        const animal = environment.animals[j];
        envToAnimals(animal, j + 1);
    }
}

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




// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
//  Step Two: Animal Selection
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<
// renders the final endpoint for an animal.
function renderAnimal(animal) {
    // Get references to the main sections of the page
    const head = document.querySelector('head');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    clearMain();
    changeTitle(animal);
    changeHeroTitle(animal);


}



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





// >>>>>>>>>>>>>>>>>
// Back Button Functionality
// <<<<<<<<<<<<<<<

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


// >>>>>>>>>>>>>>>>>
//  Initialization
// <<<<<<<<<<<<<<<<<
init();