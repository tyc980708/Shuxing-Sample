
import {GLTFLoader} from "./modules/GLTFLoader.js";
import {OrbitControls} from "./modules/OrbitControlsMod.js";
import * as THREE from "./modules/three.module.js"


let scene;
let camera;
let renderer;
let gltfLoader, textureLoader;
let drinkModel;
let drinkMaterial;

function init(){
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
    let controls = new OrbitControls( camera, renderer.domElement );

    //Register for window resize events:
    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);


    //Create loaders
    gltfLoader = new GLTFLoader();
    textureLoader = new THREE.TextureLoader();

    //Make unlit texture:
    textureLoader.load('models/Nile.png', function(texture) {
        texture.magFilter = THREE.NearestFilter
        drinkMaterial = new THREE.MeshBasicMaterial( {
            map: texture
        });
    }, undefined, function(error){
        console.error(error);
    });

    //Load, then call back maybe
    gltfLoader.load('models/Nile.glb', function(gltf){
        gltf.scene.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.geometry.center(); // center here
                child.material = drinkMaterial;
            }
        });
        drinkModel = gltf.scene;
        scene.add(gltf.scene);
        camera.position.z = 0.5;
        update();
    }, undefined, function (error) {
        console.error(error);
    });

}




function update(){
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
    //Calculate out the normalized position of the mouse:
    //console.log(event.movementX);
    //
}

function onMouseClick(event){

}

init();