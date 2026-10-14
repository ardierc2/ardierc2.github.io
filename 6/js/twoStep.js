/*
 * Main logic for the two-step process of selecting environments and animals.
*/

// variables for keeping track of step process
isEnvironment = true;
environmentIndex = -1;

//adding event listeners to buttons based on previous step
for(let i = 0; i < 4; i++) {
    const cardButton = document.querySelector(`#card${i + 1}`);

    cardButton.addEventListener('click', function() {
        // fetching environments json object promise 
        fetch('js/environments.json')
        .then(function(response) {
            // parsing promise to json object
            return response.json();
        })
        .then(function(data) {
            //retrieving environments object from .json
            environments = data.environments;

            //checking which step we are on, keeping track of step, and adding listeners accordingly
            if(isEnvironment) {
                environmentIndex = i;

                changeHero(environments[environmentIndex]);
                
                setAnimals(environments[environmentIndex])

                backToEnvironments();

                //set for keeping track of the current step in the two-step process
                isEnvironment = false;
            } else {
                //adds listener for second step of getting the animal
                getAnimal(environments[environmentIndex].animals[i])
            }

        }).catch(function(error) {
            console.error('Error fetching Environment content:', error);
        });
    });
}




/*
    Two-step process functions.
*/

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



/* 
   Navigation and back button functionality.
*/

// event listener for back to home button
document.querySelector('#twoStep-back').addEventListener('click', function() {
    window.location.href = 'index.html';
});

//swaps the back button from back to lights out to back to environments
function backToEnvironments() {
    let backButton = document.querySelector('#twoStep-back');
    backButton.textContent = "Back to Environments"

    backButton.addEventListener('click', () => location.reload());
}
