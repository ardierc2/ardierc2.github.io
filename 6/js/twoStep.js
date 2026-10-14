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
                stepTwo(environments[environmentIndex].animals[index])
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
function stepTwo(animal) {
    changeTitle(animal);
    changeHeroTitle(animal);

    renderAnimal(animal);
}

function renderAnimal(animal) {
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
                        <li><strong>Size:</strong> ${animal.endpoint.quickFacts.size}</li>
                        <li><strong>Weight:</strong> ${animal.endpoint.quickFacts.weight}</li>
                        <li><strong>Lifespan:</strong> ${animal.endpoint.quickFacts.lifespan}</li>
                        <li><strong>Conservation Status:</strong> ${animal.endpoint.quickFacts.conservationStatus}</li>
                        <li><strong>Range:</strong> ${animal.endpoint.quickFacts.range}</li>
                    </ul>
                </div>
                <div class="animal-description">
                    <h3>Key Nighttime Adaptations</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <p>${animal.endpoint.adaptations}</p>
                    <h3>Diet</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <p>${animal.endpoint.diet}</p>
                    <h3>Role in Ecosystem</h3>
                    <div class="sub-section-bar" aria-hidden="true"></div>
                    <p>${animal.endpoint.role}</p>
                    <div class="animal-fun-fact"><p><strong>Fun Fact:</strong> ${animal.endpoint.funFact}</p></div>
                </div>
                <figure class="animal-range-map">
                    <img class="wide-img-window" src="${animal.endpoint.rangeMap}" alt="${animal.endpoint.rangeMapAlt}">
                    <figcaption>${animal.endpoint.rangeMapCaption}
                    </figcaption>
                </figure>
            </div>
        </section>
    `;
    addSectionBar(main);
    main.innerHTML += `
        <section class="content-box" aria-label="${animal.endpoint.effectTitle}">
            <div class="animal-light-effect">
                <h3 class="change glow">${animal.endpoint.effectTitle}</h3>
                <p>${animal.endpoint.effectDescription}</p>
            </div>
            <a class="button" href="index.html">${animal.endpoint.back}</a>
        </section>
    `;
    addSectionBar(main);
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

// adds a section bar (horizontal rule) to the specified element.
function addSectionBar(element) {
    let bar = document.createElement('hr');
    bar.classList.add('section-bar');
    element.appendChild(bar);
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