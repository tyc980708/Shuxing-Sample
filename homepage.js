

const randomLoadText = [
    "Loading...",
    "Trapping Souls...",
    "Reticulating Spines...",
    "Consuming Humans...",
    "Grating Flesh...",
    "Dialing Up...",
    "Commencing Ritual...",
]

const loadedText = "SHUXING LI"

let timeElapsed = 0;

function init() {
    //set the text randomly
    //every 0.5 seconds
    //for a total of 2 seconds.
    fetchDynatext("en")
    buttonListenMouseHover();
    updateLoadingText();
}

function buttonListenMouseHover(){
    //for each of the dom element with class "button"
    //add a mouseover event listener
    //that appends a ">" at the start
    document.querySelectorAll(".future-button").forEach(button => {
        button.addEventListener("mouseover", onMouseHoverButton);
        button.addEventListener("mouseout", onMouseUnhoverButton);
    });
}

function onMouseHoverButton(){
    let lang = this.getAttribute("langdesc");
    let localeString = fetchString(lang);
    this.innerHTML = "> " + localeString;
}

function onMouseUnhoverButton(){
    let lang = this.getAttribute("langdesc");
    let localeString = fetchString(lang);
    this.innerHTML = localeString;
}

function updateLoadingText(){
    setInterval(function() {
        let randomIndex = Math.floor(Math.random() * randomLoadText.length);
        timeElapsed += 0.15;
        document.getElementById("loadtext").innerHTML = randomLoadText[randomIndex].toUpperCase();
        if(timeElapsed >= 1.0) {
            document.getElementById("loadtext").innerHTML = loadedText;
            clearInterval(this);
        }
    }, 100);
}

function update() {

  requestAnimationFrame(update);
}