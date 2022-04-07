

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
  console.log('homepage.js loaded');
  //set the text randomly
  //every 0.5 seconds
  //for a total of 2 seconds.
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