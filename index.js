
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
                    image.src = image.src
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
        /*
        for(let j = 0; j < animatedImages.length; j++){
            let image = animatedImages.item(j)
            image.addEventListener("mouseover", ()=>{
                image.src = image.getAttribute("on-hover")
            })
            image.addEventListener("mouseout", ()=>{
                image.src = image.getAttribute("on-unhover")
            })
        }*/

    }
	
}