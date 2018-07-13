
//I think i can do it with or without p5game.js.
// -- Alligrater

var imgsrc = "https://Alligrater.github.io/1.png";

var sprites = [];

var imageer;

class Sprite{
	
	constructor(x,y,sizex,sizey,src){
		//Keep track of X, Y and some other things i think.
		//Extended classes can be different.
		this.x = x;
		this.y = y;
		//Keep track of size of x and y.
		//Also, we need to center these sprites.
		this.sizex = sizex;
		this.sizey = sizey;
		this.src = src;
	}
	
	/*collides(spr){
		//
		if(this.x <= (spr.x+spr.sizex) && this.x => (spr.x-spr.sizex) && this.y => (spr.y-spr.sizey) && this.y <= (spr.y+spr.sizey)){
			//Collides.
			//return something....?
			return true;
		}
		return false;
	}*/
	
	show(){
		var img = loadImage(this.src);
		imageMode(CENTER);
		image(img, this.x, this.y);
	}
	
}

function setup(){
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	var spr = new Sprite(600,800,128,128,imgsrc)
	sprites.push(spr);
	imageer = loadImage("https://Alligrater.github.io/1.png"); 
}

function draw(){
	background("rgba(0,0,0,255)");
	for(var i = 0; i < sprites.length; i++){
		sprites[i].show();
	}
	//p5.Image(imageer, mouseX. mouseY);
}