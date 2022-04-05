
import {GLTFLoader} from "../modules/GLTFLoader.js";
//import {OrbitControls} from "./modules/OrbitControlsMod.js";
import * as THREE from "../modules/three.module.js"

//Just too lazy to store it elsewhere
const PATH_TO_MODEL = "models/";
const MODEL_EXTENSION = ".glb";
const PATH_TO_TEXTURE = "models/";
const TEXTURE_EXTENSION = ".png";
const PATH_TO_DESC = "desc/";
const DESC_EXTENSION = ".json";
const DRINKLIST_PATH = "drinklist.json";
const COOKIE_STRING = "drinkName";


let scene;
let camera;
let renderer;
let gltfLoader, textureLoader;
let drinkModel;
let drinkMaterial;
let isModelLoaded = false;
let isMaterialLoaded = false;
let drinkNameDOM, drinkDescDOM;

let LIST_OF_DRINKS = [
    "Nile", "Vitality", "Breeze"
];

function SeededRng(){
    //Use something with the date as the rng.
    let date = new Date();
    let dayString = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    //These three info should make it unique to all devices. Hopefully.
    let sysString = navigator.appName.toString() +
        navigator.appVersion.toString() +
        navigator.language.toString() +
        navigator.platform.toString();
    console.log(sysString);

    let seededRNG = new Math.seedrandom(dayString + sysString);
    return seededRNG();
}

function init(){
    //Assign the DOM Elements
    document.getElementById("bar-ambient").play();
    drinkNameDOM = document.getElementById("drink-name");
    drinkDescDOM = document.getElementById("drink-desc");
    //Fetch the drinklist:
    fetchDrinkList();
}

function fetchDrinkList(){
    fetch(DRINKLIST_PATH).then(response => {
        if (!response.ok) {
            console.error(response.status);
            //On failed, try again:
            console.log("retrying...")
            setInterval(fetchDrinkList, 500);
        }
        response.json().then(function (json) {
            LIST_OF_DRINKS = json.drinks;
            //On success, setup drink scene.
            setupDrinkScene();
        });
    });
}

/*
function setDrinkCookie(drinkName){
    //Store two things! 1. When the cookie expires (tomorrow, of course.) 2. What drink appeared for today.
    if(navigator.cookieEnabled){
        let cookieToStore = COOKIE_STRING + "=" + drinkName + ";"; //This is the first part. Second part: expire date.
        //First we need to again, get the current date.
        let today = new Date();
        let tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); //This is only one step
        tomorrow.setHours(0);
        tomorrow.setMinutes(0);
        tomorrow.setSeconds(0);
        cookieToStore += "expires=" + tomorrow.toUTCString();
        //console.log(cookieToStore);
        document.cookie = cookieToStore;
    }
}

//Canary Cherry Rush. Nice drink name. I'll make it a drink one day.
//Too lazy. Just copy and pasted from stackoverflow. Should work.
function getCookie(name) {
    if(navigator.cookieEnabled){
        let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }
}*/

function forceLoadDrink(drinkName){
    //Clear everything in the scene first:
    scene = new THREE.Scene();
    loadDrinkMaterial(drinkName, function(){
        loadDrinkModel(drinkName, function(){
            updateDrinkDesc(drinkName);
            update();
        })
    });
}

function setupDrinkScene(){
    //init the scene... basically the manual from threejs.org
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        40, 16/9, //just make everything 16:9 then
        0.1, 5000
    );
    camera.position.z = 0.8;
    camera.position.x = -0.05;
    //So the background is clear
    renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
    renderer.setSize(window.innerWidth, window.innerWidth * 9 /16)
    document.body.appendChild(renderer.domElement);
    //let controls = new OrbitControls( camera, renderer.domElement );

    //Register for window resize events:
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);

    //Try fetch the cookie:
    let drinkIndex = Math.floor(SeededRng() * LIST_OF_DRINKS.length);
    let drinkName = LIST_OF_DRINKS[drinkIndex];


    //Wonder if multiple callbacks is a idea
    loadDrinkMaterial(drinkName, function(){
        loadDrinkModel(drinkName, function(){
            updateDrinkDesc(drinkName);
            update();
        })
    });
}


function loadDrinkMaterial(drinkName, callback){
    //Create loaders
    gltfLoader = new GLTFLoader();
    textureLoader = new THREE.TextureLoader();
    //Make unlit texture:
    textureLoader.load(PATH_TO_TEXTURE + drinkName + TEXTURE_EXTENSION, function(texture) {
        texture.magFilter = THREE.NearestFilter
        drinkMaterial = new THREE.MeshBasicMaterial( {
            map: texture
        });
        callback();
    }, undefined, function(error){
        console.error(error);
		notifyError(drinkName);
    });


}

function loadDrinkModel(drinkName, callback){
    //Load, then call back maybe
    gltfLoader.load(PATH_TO_MODEL + drinkName + MODEL_EXTENSION, function(gltf){
        gltf.scene.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.geometry.center(); // center here
                if(child.material != null){
                    child.material = drinkMaterial;
                }
            }
        });
        drinkModel = gltf.scene;
        scene.add(gltf.scene);
        isModelLoaded = true;
        callback();
    }, undefined, function (error) {
        console.error(error);
        notifyError(drinkName);
    });
}

function updateDrinkDesc(drinkName){
    let filePath = PATH_TO_DESC + drinkName + DESC_EXTENSION;
    fetch(filePath).then(response => {
        if (!response.ok) {
            console.error(response.status);
        }
        response.json().then(function (json) {
            drinkNameDOM.innerHTML = json.formalName;
            drinkDescDOM.innerHTML = "\"" + json.description + "\"";
        });
    });
}

function update(){
    if(!isModelLoaded) return;
    renderer.render(scene, camera);
    drinkModel.rotation.y -= 0.005;
    requestAnimationFrame(update);
}

function notifyError(drinkName){
	drinkNameDOM.innerHTML = "MISSINGNO.";
	drinkDescDOM.innerHTML = "Hey, I had a drink for you, but now the drink somehow lost in the void. Don't panic. I'll bring it back in a few seconds."
	setInterval(function(){
		location.reload();
	}, 5000);
}

function onWindowResize(){
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerWidth * 9 / 16 );
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
