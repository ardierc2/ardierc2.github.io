// const dataPromise = fetch('js/environments.json')
//     .then(function(response) {
//         return response.json();
//     })
//     .catch(function(error) {
//         console.error('Error fetching Environment content:', error);
//     });



// for(let i = 1; i <= 4; i++) {  
//     fetch('js/environments.json')
//     .then(function(response) {
//         return response.json();
//     })
//     .catch(function(error) {
//         console.error('Error fetching Environment content:', error);
//     });
// }





// // add event listeners if is an environment or is an animal.
// isEnvironment = false;
// for (let i = 1; i <= 4; i++) {
//     if(isEnvironment) {
//         document.querySelector(`#card${i}`).addEventListener('click', environmentClick());
//     } else {
//         document.querySelector(`#card${i}`).addEventListener('click', animalClick());
//     }
// }



// function environmentClick() {
//     // change the back button to simple reload the page instead of going to home page
//     document.querySelector('#twoStep-back').addEventListener('click', function() {
//         location.reload();
//     });
//     document.querySelector('#twoStep-back').textContent = "Back to Environments";
    
//     // for each card we are going to change to the respective environments to animals when clicked.
//     for(let j = 1; j <= 4; j++) {
//         const animal = environment.animals[j - 1];
//         replaceCards(animal, j);
//     }

//     // switch to animalClick
//     isEnvironment = false;
// }


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