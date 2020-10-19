
import {GLTFLoader} from "./modules/GLTFLoader.js";
//import {OrbitControls} from "./modules/OrbitControlsMod.js";
import * as THREE from "./modules/three.module.js"

//Just too lazy to store it elsewhere
const LIST_OF_DRINKS = [
    "Nile", "Vitality"
];

const PATH_TO_MODEL = "models/";
const MODEL_EXTENSION = ".glb";
const PATH_TO_TEXTURE = "models/";
const TEXTURE_EXTENSION = ".png";
const PATH_TO_DESC = "desc/"
const DESC_EXTENSION = ".ddsc"


let scene;
let camera;
let renderer;
let gltfLoader, textureLoader;
let drinkModel;
let drinkMaterial;
let isModelLoaded = false;

let drinkNameDOM, drinkDescDOM;



function init(){
    //Assign the DOM Elements
    drinkNameDOM = document.getElementById("drink-name");
    drinkDescDOM = document.getElementById("drink-desc");

    //init the scene... basically the manual from threejs.org
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        60, window.innerWidth / window.innerHeight,
        0.1, 5000
    );
    //So the background is clear
    renderer = new THREE.WebGLRenderer({ alpha:true });
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement);
    //let controls = new OrbitControls( camera, renderer.domElement );

    //Register for window resize events:
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);

    //Pick a random drink from the list:
    let drinkIndex = Math.floor(Math.random() * LIST_OF_DRINKS.length);
    let drinkName = LIST_OF_DRINKS[drinkIndex];

    //Create loaders
    gltfLoader = new GLTFLoader();
    textureLoader = new THREE.TextureLoader();

    //Make unlit texture:
    textureLoader.load(PATH_TO_TEXTURE + drinkName + TEXTURE_EXTENSION, function(texture) {
        texture.magFilter = THREE.NearestFilter
        drinkMaterial = new THREE.MeshBasicMaterial( {
            map: texture
        });
    }, undefined, function(error){
        console.error(error);
    });

    //Load, then call back maybe
    gltfLoader.load(PATH_TO_MODEL + drinkName + MODEL_EXTENSION, function(gltf){
        gltf.scene.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.geometry.center(); // center here
                child.material = drinkMaterial;
            }
        });
        drinkModel = gltf.scene;
        scene.add(gltf.scene);
        camera.position.z = 0.5;
        isModelLoaded = true;
        update();
        updateDrinkElements(drinkName);
        //let drinkDesc = readDrinkDesc(drinkName);
    }, undefined, function (error) {
        console.error(error);
    });
}


function updateDrinkElements(drinkName){
    let drinkDesc = readDrinkDesc(drinkName);
}

function updateDOMElements(drinkName, drinkDesc){
    drinkNameDOM.innerHTML = drinkName;
    drinkDescDOM.innerHTML = drinkDesc;
}

function readDrinkDesc(drinkName){
    let filePath = PATH_TO_DESC + drinkName + DESC_EXTENSION;
    return fetch(filePath).then(response => {
        if (!response.ok) {
            console.error(response.status);
        }
        //updateDOMElements(drinkName, response.text())
        response.text().then(function (text) {
            updateDOMElements(drinkName, text)
        });
       // console.log(response);
    });
}

function update(){
    if(!isModelLoaded) return;
    renderer.render(scene, camera);
    drinkModel.rotation.y -= 0.005;
    requestAnimationFrame(update);
}

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove(event){
    if(!isModelLoaded) return;
    //Calculate out the normalized position of the mouse:
    //console.log(event.movementX);
    //
    //Rotate the model based on mouse vector X only:
    //drinkModel.rotation.y += event.movementX * 2 / window.innerWidth;
    //drinkModel.rotation.x += event.movementY / 2 / window.innerHeight;
}

function onMouseClick(event){

}

init();