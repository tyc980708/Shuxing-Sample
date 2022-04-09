
const MOVE_AMOUNT = -20; //Maximum of 10 pixels of drifting.
let driftables = [];

function init(){
    //Populate driftables:
	/*
    driftables = document.getElementsByClassName("driftables");
    document.addEventListener("mousemove", e=>{

        //Calculate out the normalized mouse position:
        let normalizedMovement = e.pageX / window.innerWidth - 0.5;

        //drift the elements...
        for(let d of driftables){
            d.style["transform"] = "translateX(" + normalizedMovement * MOVE_AMOUNT + "px)";
        }
    })*/
	
	
	//Attach listeners to each of the divs:

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

function fetchDynatext(language){
    let dynatextDescFile = "lang-" + language + ".json"
    //fetch file...
    fetch(dynatextDescFile).then(function(response){
        updateDynatext(response.json().then(data => updateDynatext(data)))
    }).catch(error => console.log("failed to fetch language json."))

}

function updateDynatext(dynatextDescriptor){
    console.log(dynatextDescriptor)
    let dynatextContainers = document.getElementsByClassName("dynatext")
    for(let i = 0; i < dynatextContainers.length; i++){
        let item = dynatextContainers.item(i)
        let attr = item.getAttribute("langdesc")
        if(attr){
            let dynatextContent = dynatextDescriptor[attr]
            if(dynatextContent){
                item.innerHTML = dynatextContent
                //console.log("updated text to" + dynatextContent)
            }
        }

    }
}
