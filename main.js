

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
    boxProjects();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const defaultLang = urlParams.get('lang')
    if(defaultLang === 'en' || defaultLang === 'zh') {
        fetchDynatext(defaultLang);
    }
    else{
        fetchDynatext('en');
    }

    buttonListenMouseHover();
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

function visitShowreel(){
    switch(activeLanguage){
        case "en":
            window.location.href = "https://vimeo.com/685028828";
            break;
        case "zh":
            window.location.href = "https://www.bilibili.com/video/BV11Z4y1R7fd";
            break;
        default:
            window.location.href = "https://vimeo.com/685028828";
            break;
    }
}


function boxProjects(){
    let projectContainers = document.getElementsByClassName("projects-content")
    console.log(projectContainers)
    for(let i = 0; i < projectContainers.length; i++){
        let container = projectContainers.item(i)
        let animatedImages = container.getElementsByClassName("animate")
        for(let j = 0; j < animatedImages.length; j++){
            let image = animatedImages.item(j)
            image.classList.add("hidden")
            //image.classList.remove("hidden")
        }
        let staticImages = container.getElementsByClassName("static")

        container.addEventListener("mouseenter", ()=>{
            for(let j = 0; j < animatedImages.length; j++){
                let image = animatedImages.item(j)
                if(image.classList.contains("hidden")){
                    image.classList.remove("hidden")
                    //image.src = image.src
                }

                //image.classList.remove("hidden")
            }
            for(let j = 0; j < staticImages.length; j++){
                let image = staticImages.item(j)
                image.classList.add("hidden")
                //image.classList.remove("hidden")
            }
        })

        container.addEventListener("mouseleave", ()=>{
            for(let j = 0; j < animatedImages.length; j++){
                let image = animatedImages.item(j)
                image.classList.add("hidden")
                //image.classList.remove("hidden")
            }
            for(let j = 0; j < staticImages.length; j++){
                let image = staticImages.item(j)
                image.classList.remove("hidden")
                //image.classList.remove("hidden")
            }
        })
    }
}

function visitOldPortfolio(){
    window.location.href = "https://alligrater.github.io/archive/index.html?lang=" + activeLanguage;
}

function update() {

  requestAnimationFrame(update);
}