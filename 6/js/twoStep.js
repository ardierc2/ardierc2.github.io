// variables for keeping track of step process
isEnvironment = true;
environmentIndex = -1;

//adding event listeners to buttons based on previous step
for(let i = 0; i < 4; i++) {
    document.querySelector(`#card${i + 1}`).addEventListener('click', function() {
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
                //adds listener for first step of getting environment 
                setAnimals(environments[environmentIndex])
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


// adds listeners for first step of getting environment
function setAnimals(environment) {
    // change the back button to simple reload the page instead of going to home page
    document.querySelector('#twoStep-back').addEventListener('click', function() {
        location.reload();
    });
    document.querySelector('#twoStep-back').textContent = "Back to Environments";
    
    // for each card we are going to change to the respective environments to animals when clicked.
    for(let j = 0; j < 4; j++) {
        const animal = environment.animals[j];
        replaceCards(animal, j + 1);
    }
}

// adds listener for second step of getting animal
function getAnimal(animal) {
    console.log(animal);
}







// function to replace environment cards with animal cards
function replaceCards(animal, cardNum) {
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

// event listener for back to home button
document.querySelector('#twoStep-back').addEventListener('click', function() {
    window.location.href = 'index.html';
});