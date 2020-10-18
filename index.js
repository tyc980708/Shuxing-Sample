
const MOVE_AMOUNT = -20; //Maximum of 10 pixels of drifting.
let driftables = [];

function init(){
    //Populate driftables:
    driftables = document.getElementsByClassName("driftables");
    document.addEventListener("mousemove", e=>{

        //Calculate out the normalized mouse position:
        let normalizedMovement = e.pageX / window.innerWidth - 0.5;

        //drift the elements...
        for(let d of driftables){
            d.style["transform"] = "translateX(" + normalizedMovement * MOVE_AMOUNT + "px)";
        }
    })
}