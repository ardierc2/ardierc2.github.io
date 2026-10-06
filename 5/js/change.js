

document.querySelector("#changeThemeBtn").addEventListener("click", function() {
    fetch("js/boardingData.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        changeHTML(data);
        changeCSS(data);
    })
    .catch(function(err) {
        console.error(err);
    });
});


function changeHTML(data) {
    document.querySelector("head title").textContent = data["title"];
    document.querySelector("#styleName").textContent = data["header"];
    document.querySelector("#heroTitle").textContent = data["hero"]["headline"];
    document.querySelector("#heroDesc").textContent = data["hero"]["description"];

    
    let sectionIndex = 0;
    let cardIndex = 0;
    for(let i in data["sections"]) {
        let section = data["sections"][i];
        document.querySelectorAll(".section-title")[sectionIndex].textContent = section["title"];
        document.querySelectorAll(".section-subtitle")[sectionIndex].textContent = section["subtitle"];
        
        for(let j in section["cards"]) {
            let card = section["cards"][j];
            document.querySelectorAll(".card h3")[cardIndex].textContent = card["title"];
            document.querySelectorAll(".card p")[cardIndex].textContent = card["description"];
            cardIndex++;
        }
        sectionIndex++;    
    }
}

function changeCSS(data) {
    document.querySelector("#heroSection").style.setProperty("--hero-img", `url(${data['hero']['image']})`);   
}
