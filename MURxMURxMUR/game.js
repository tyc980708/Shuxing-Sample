
//I think i can do it with or without p5game.js.
// -- Alligrater


var yjs;
var sdy;
var kmrz = [];

var imageer;
var tdkr;
var kmkmr;
var soudayo;

var difficulty = 1.0; //Difficulty Multiplier

var senpai;

var mx = 0;
var my = 0;

var freeride = 3;

var spawnchance = 0.3;

var display = 15;


var time = 2000;
var score = 0;

var darktime = 0;
var waitforinput = true;

var bjoe;

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
	
	collides(spr){
		if(this.x < (spr.x+spr.sizex) && this.x > (spr.x-spr.sizex) && this.y > (spr.y-spr.sizey) && this.y < (spr.y+spr.sizey)){
			//Collides.	
			//return something....?
			return true;
		}
		return false;
	}
	
	show(){
		//imageMode(CENTER);
		image(this.src, 600,800, this.sizex, this.sizey);
		//console.log(this.x)
	}
	
	update(){
		//do Nothing.
	}
}

//There's only 1 MUR.
class MUR extends Sprite{
	constructor(x,y,sizex,sizey,src){
		super(x,y,sizex,sizey,src);
	}
	
	update(){
			if (keyIsDown(87)) {
				this.y -= 5;
			}
			if (keyIsDown(65)) {
				this.x -= 5;
			}
			if (keyIsDown(83)) {
				this.y += 5;
			}
			if (keyIsDown(68)) {
				this.x += 5;
			}

		
		if(this.x > document.body.clientWidth){
			this.x -= document.body.clientWidth;
		}
		
		if(this.x < 0){
			this.x += document.body.clientWidth;
		}
		
		if(this.y > document.body.clientHeight){
			this.y -= document.body.clientHeight;
		}

		if(this.y < 0){
			this.y += document.body.clientHeight;
		}
	}
	
	show(){
		imageMode(CENTER);
		var dir = 1;
		if (keyIsDown(65)) {
			dir = -1;
		}
		
		image(this.src, this.x, this.y, this.sizex, this.sizey);
	}
}

class KMR extends Sprite{
	constructor(x,y,sizex,sizey,yvel,xvel,src){
		super(x,y,sizex,sizey,src);
		this.xvel = xvel;
		this.yvel = yvel;
		this.timeout = 0;
	}
	update(){
		this.x += this.xvel*difficulty;
		this.y += this.yvel*difficulty;
		
		
		if(this.x > document.body.clientWidth){
			this.x -= document.body.clientWidth;
		}
		
		if(this.x < 0){
			this.x += document.body.clientWidth;
		}
		
		if(this.y > document.body.clientHeight){
			this.y -= document.body.clientHeight;
		}

		if(this.y < 0){
			this.y += document.body.clientHeight;
		}
		
		if(this.timeout > 0){
			timeout -= 1;
		}
	}
	
	show(){
		imageMode(CENTER);
		image(this.src, this.x, this.y, this.sizex, this.sizey);
	}
	
	timeout(){
		this.timeout = 200; //10 seconds time out.
		
	}
	
}
 
class YJSNPI extends Sprite{
	constructor(x,y,sizex,sizey,src){
		super(x,y,sizex,sizey,src);
		this.xvel = 0;
		this.yvel = 0;
		this.timeout = 0;
	}
	
	update(){
		this.x += this.xvel;
		this.y += this.yvel;
		
		if(this.x > document.body.clientWidth){
			this.x -= document.body.clientWidth;
		}
		
		if(this.x < 0){
			this.x += document.body.clientWidth;
		}
		
		if(this.y > document.body.clientHeight){
			this.y -= document.body.clientHeight;
		}

		if(this.y < 0){
			this.y += document.body.clientHeight;
		}
		
		
	}
	
	findpath(){
		//KMR always charges at the player. with top speed (5px/sec)
		//shooting them puts them into a cooldown.
		//When cooldown is over, they respawn and move again.
		//first, we find the player's location.
		
		//if kmr is on senpai's right, xdiff >0.
		//on bottom, y diff < 0.
		var xdiff = this.x - senpai.x;
		var ydiff = this.y - senpai.y;
		
		if(!keyIsDown(87) && !keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68)){
			this.xvel = 0;
			this.yvel = 0;
		}
		else{
			if(xdiff == 0){
				this.xvel = 0;
				this.yvel = ydiff>0?-4:4;
			}
			else if(ydiff == 0){
				this.yvel = 0;
				this.xvel = xdiff>0?-4:4;
			}
			else{
				//if no matches
				//we calculate out xvel and yvel.
				//Simple path finding algorithim that features no obstacles.
				if(Math.abs(xdiff) > Math.abs(ydiff)){
					var percentage = Math.abs(ydiff)/Math.abs(xdiff);
					this.xvel = xdiff>0?-4:4;
					this.yvel = ydiff>0?-4*percentage:4*percentage;
				}
				else{
					var percentage = Math.abs(xdiff)/Math.abs(ydiff);
					this.yvel = ydiff>0?-4:4;
					this.xvel = xdiff>0?-4*percentage:4*percentage;				
				}
			}
		}

		
	}
	
	show(){
		imageMode(CENTER);
		image(this.src, this.x, this.y, this.sizex, this.sizey);
	}
}

class popout extends Sprite{
	constructor(x,y,sizex,sizey,src){
		super(x,y,sizex,sizey,src);
	}

	ready(){
		display = 40;
		bjoe.play();
	}
	
	show(){
		if(display > 0){
			display -= 1;
			imageMode(CENTER);
			var jiggle = Math.random()*8-4
			image(this.src, this.x + jiggle, this.y + jiggle, this.sizex, this.sizey);
		}
		else{
			//do not show.
			display = 0;
		}
	}
	
}

function preload() {
  soundFormats('mp3', 'ogg');
  bjoe = loadSound('https://Alligrater.github.io/soudayo.wav');
}

function setup(){
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	//Turns out that you have to load every image on setup phase.
	//Learned!
	
	imageer = loadImage("https://Alligrater.github.io/MUR.png");
	tdkr = loadImage("https://Alligrater.github.io/SUZUKI.png");
	kmkmr = loadImage("https://Alligrater.github.io/KMR.png");
	soudayo = loadImage("https://Alligrater.github.io/SDY.png");
	for(var i = 0; i < 3; i++){
		var x = Math.random()*document.body.clientWidth;
		var y = Math.random()*document.body.clientHeight;
		var size = 64;
		var xv = Math.random()*10 - 5;
		var yv = Math.random()*10 - 5;
		var km = new KMR(x,y,size,size,yv,xv,kmkmr);
		kmrz.push(km);
	}
	var x = 0.5*document.body.clientWidth;
	var y = 0.5*document.body.clientHeight;
	var size = 64;
	yjs = new YJSNPI(x,y,size,size,tdkr);
	
	x = -100;
	y = -100;
	size=128;
	sdy = new popout(x,y,size,size,soudayo);
	
	senpai = new MUR(document.body.clientWidth/2,document.body.clientHeight/2,64,64,imageer)
}

function draw(){
	background("rgba(0,0,0,1)");
	textAlign(LEFT);
	textSize(32);
	fill(255, 255, 255);
	text('SCORE: ' + score, 10, 30);
	
	text('TIME: ' + time, 10, 80);

	
	if(waitforinput){
		textSize(32);
		fill(255, 255, 255);
		textAlign(CENTER);
		text('PRESS ANY KEY TO CONTINUE', document.body.clientWidth/2, document.body.clientHeight/2);
	}
	if (keyIsPressed === true) {
		waitforinput = false;
	}

	if(time < 0 || waitforinput){
		if(time < 0){
			darktime += 1;
			if(darktime >= 50){
				textAlign(CENTER);
				text('PRESS ANY KEY TO RESTART', document.body.clientWidth/2, document.body.clientHeight/2);
				if(keyIsPressed === true){
					window.location.reload()
				}
			}

		}
	}
	else{
		

		time -= 1;

		yjs.findpath();
		yjs.update();
			

		for(var i = 0; i < kmrz.length; i++){
			kmrz[i].update();
			kmrz[i].show();
			if(yjs.collides(kmrz[i])){
				
				//give it a vfx first
				sdy.ready();
				
				sdy.x = kmrz[i].x;
				sdy.y = kmrz[i].y;
				
				kmrz[i].xvel = Math.random()*10 - 5;
				kmrz[i].yvel = Math.random()*10 - 5;
				kmrz[i].x = Math.random()*document.body.clientWidth;
				kmrz[i].y = Math.random()*document.body.clientHeight;
				//Summon a new KMR.
				if(kmrz.length > 20){
					spawnchance = 0;
				}
				
				if(Math.random() < spawnchance){
					var x = Math.random()*document.body.clientWidth;
					var y = Math.random()*document.body.clientHeight;
					var size = 64;
					var xv = Math.random()*10 - 5;
					var yv = Math.random()*10 - 5;
					var km = new KMR(x,y,size,size,yv,xv,kmkmr);
					kmrz.push(km);
					spawnchance -= 0.05;
				}
				else{
					spawnchance += 0.05;
				}
				if(spawnchance > 1){
					spawnchance = 0.3;
				}
				else if(spawnchance < 0){
					spawnchance = 0.0;
				}
				
				difficulty+=0.05;
				score += 1;
	
			}
		}

		

		
		senpai.update();

	}
	yjs.show();
	sdy.show();
	senpai.show();
}