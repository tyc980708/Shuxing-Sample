/* The ultimate rain stop magic.
 * Rains fall down from the center of the screen.
 * Hold down LMB to fully stop them.
 * The shape also changes.
 */
 
 
 // Pool of rain. Keeps track of location and velocity.
var rainpool = [];

//Wind. Will implement later.
var wind;

//Time the mouse is pressed.
var deltatime = 1;

//Literally gravity.
var g = 0;

//1 second is 60 frames.	
//some might be different.
//in other words, falling 1 frame is 1/60 seconds.
var onesec = 60;

var speedmult = 1;

var raincount = 250;

var mousexp = 0;
var mouseyp = 0;
var img; 
// Rain class. Keep track of x, y and imaginative z.
/* x: the x location on screen
 * y: the y location on screen
 
 * z: how far it is away from the camera. Changes opacity and size based on this. also impacts x and y.
   z ranges from 1 to 0. 1 meaning closest to the camera and 0 furthest.
*/

class raindrop {
	constructor(x,y,z, rshift,bshift ){
		this.x = x;
		this.y = y;
		this.z = z;
		this.yvel = 0;
		this.savedyvel = 0;
		this.size = 2 + rnd(0,2);
		this.rshift = rshift;
		this.bshift = bshift;
	}
	
	//Since there is no wind that blows vertically.
	fall(){
		this.yvel += (g/onesec)*(Math.pow(this.z,2)/2+0.3)*speedmult;
		//this.savedyvel = this.yvel;
		//If the mouse is down: we increment y velocity by speedmult% instead of 100%
		//Otherwise, we increment by 100%
		this.y += this.yvel;

		
		if(this.y > document.body.clientHeight){
			this.y -= document.body.clientHeight*1.1;
			this.yvel = 0;
		}
	}
	
	//draw a raindrop on the background.
	draw(){
		var opac = 0.95*(Math.pow(this.z,3) + 0.1)
		
		var r = 189+this.rshift;
		var b = 189+this.bshift
		noStroke();
		fill("rgba(" + r + ",189," + b + "," + opac + ")");
		var xmod = 0.5*mousexp/(1.1-Math.pow(this.z,3))/5 + this.x;
		if(xmod > document.body.clientWidth){
			xmod -= document.body.clientWidth;
		}
		var ymod = 0.5*mouseyp/(1.1-Math.pow(this.z,3))/5 + this.y;
		if(ymod > document.body.clientHeight*1.1){
			ymod -= document.body.clientHeight*1.2;
		}
		
		var ysize = this.size*this.yvel*1.5;
		if(ysize < this.size){
			ysize = this.size;
		}
		ellipse(xmod , ymod, this.size*(Math.pow(this.z, 2)+0.5), ysize*(Math.pow(this.z, 2)+0.5));
		
	}
}

function setup() {
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	for(var i = 0; i < raincount; i++){
		var x = rnd(0, document.body.clientWidth);
		var y = rnd(0, document.body.clientHeight);
		var z = Math.random();
		var rshift = rnd(-60, 60);
		var bshift = rnd(-60, 60);
		var rd = new raindrop(x,y,z,rshift,bshift);
		rainpool.push(rd);		
	}
	img = createImage(1920, 1080);
	img.loadPixels();
	for(var x = 0; x < img.width; x++) {
		for(var y = 0; y < img.height; y++) {
			//var a = map(y, 0, img.height, 0, 40);  
			//img.set(x, y, [64, 159, 220, a]); 
			var offset = rnd(-4, 4);
			img.set(x, y, [26 + offset, 33 + offset, 37 + offset, 50]); 
		}
	}
	img.updatePixels();
	
	glow = createImage(1920, 300);
	glow.loadPixels();
	for(var x = 0; x < glow.width; x++) {
		for(var y = 0; y < glow.height; y++) {
			var a = map(y, 0, glow.height, 0, 40);  
			glow.set(x, y, [64, 159, 220, a]); 
		}
	}
	glow.updatePixels();
}

function draw() {
	background('rgb(26,33,37)');
	image(img, 0,0);
	image(glow, 0,780);

	if (mouseIsPressed) {
		deltatime += 10;
		if(deltatime > 1000){
			deltatime = 1000;
		}

	} else {
		deltatime -= 50;
		if(deltatime < 1){
			deltatime = 1;
		}
	}
	speedmult = 1/deltatime;
	
	
	mousexp = mouseX;
	mouseyp = mouseY;
	for(var i = 0; i < rainpool.length; i++){
		rainpool[i].fall();
		rainpool[i].draw();
	}
}

function rnd(lowerValue,upperValue)
{
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}