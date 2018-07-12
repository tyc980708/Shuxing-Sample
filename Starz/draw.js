
var starpool = [];

var starcount = 180;

var mousexp = 0;
var mouseyp = 0;
var img; 


class raindrop {
	constructor(x,y,z, rshift,bshift){
		this.x = x;
		this.y = y;
		this.z = z;
		this.size = 2 + rnd(0,2);
		this.rshift = rshift;
		this.bshift = bshift;
	}
	
	
	//draw a raindrop on the background.
	draw(){
		var opac = 0.95*(Math.pow(this.z,3) + 0.1)
		
		var r = 189+this.rshift;
		var b = 189+this.bshift
		noStroke();
		fill("rgba(" + r + ",189," + b + "," + opac + ")");
		var xmod = 0.2*mousexp/(1.1-Math.pow(this.z,3))/5 + this.x;
		if(xmod > document.body.clientWidth){
			xmod -= document.body.clientWidth;
		}
		
		var ymod = 0.2*mouseyp/(1.1-Math.pow(this.z,3))/5 + this.y;
		if(ymod > document.body.clientHeight*1.1){
			ymod -= document.body.clientHeight*1.2;
		}
		
		ellipse(xmod , ymod, this.size*(Math.pow(this.z, 2)+0.5), this.size*(Math.pow(this.z, 2)+0.5));
		
	}
}

function setup() {
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	for(var i = 0; i < starcount; i++){
		var x = noise(i) * document.body.clientWidth;
		var y = noise(x) * document.body.clientHeight;
		
		var z = Math.random();
		var rshift = rnd(-30, 30);
		var bshift = rnd(-30, 30);
		var conn = -1;
		var rd = new raindrop(x,y,z,rshift,bshift);	
		
		starpool.push(rd);
		
		console.log(rd);
	}
	img = createImage(document.body.clientWidth, document.body.clientHeight);
	img.loadPixels();
	for(var x = 0; x < img.width; x++) {
		for(var y = 0; y < img.height; y++) {
			var offset = rnd(-4, 4);
			img.set(x, y, [26 + offset, 33 + offset, 37 + offset, 50]); 
		}
	}
	img.updatePixels();
	
	glow = createImage(document.body.clientWidth, document.body.clientHeight*0.3);
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
	image(glow, 0,document.body.clientHeight*0.7);
	
	mousexp = mouseX;
	mouseyp = mouseY;
	for(var i = 0; i < starpool.length; i++){
		starpool[i].draw();
	}
}

function rnd(lowerValue,upperValue)
{
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}