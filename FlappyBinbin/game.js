//Gravity
var g = 0.049;

var globalv = 5;

var bin;

var beerz = [];

var beer_img;

var fb = [];

var input = false;

var plose = false;
var score = 0;

var death;
var flap;

var dqplayed = false;

//想象长宽，用于适配手机机型
var iwidth = 1920;
var iheight = 1080;

//得分界面
var gp;
var mg;
var ms;
var mb;

var waitforinput = 0;


//彬彬
class BB {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.size = 128;
		this.yvel = 0;
		this.yacc = 0;
		this.curframe = 0;
		this.inc = 1;
	}
	
	update(){
		this.curframe += this.inc;
		
		//Ping Pong Animation
		if(this.curframe >= 9){
			this.curframe = 9;
			this.inc = -1;
		}
		else if(this.curframe <= 0){
			this.curframe = 0;
			this.inc = 1;
		}
		
		this.yvel += this.yacc + g;
		this.y += this.yvel;
		g = 0.049;
		this.yacc += g;

		
		//collision detection
		
		for(var i = 0; i < 4; i++){
			if(this.x > beerz[i].x && this.x < beerz[i].x + beerz[i].width){
				//Test for collision
				if(this.y > beerz[i].holey - beerz[i].holesize/2 && this.y < beerz[i].holey + beerz[i].holesize/2){
					//Safe.
					if(beerz[i].ispassed){
						
					}
					else{
						score += 1;
						beerz[i].ispassed = true;
						console.log(score);
					}

				}
				else{
					plose = true;
				}
			}
		}
	}
	
	draw(){
		//彬彬.gif
		//image("https://Alligrater.github.io/binbin.gif", this.x, this.y);
		imageMode(CENTER);
		
		image(fb[this.curframe], this.x, this.y, this.size, this.size);
	}

}

class Beer {
	//原作水管
	constructor(x){
		this.x = x;
		this.holey = 320 + Math.random()* (document.body.clientHeight-640);
		//水管高度, 宽度用硬代码写进去
		//缝隙宽度256px
		this.holesize = 192;
		this.width = 64;
		this.height = iheight;
		this.ispassed = false;
	}
	
	//水管匀速向左
	update(){
		this.x -= globalv;
		if(this.x < 0 - this.width){
			this.respawn();
		}
		
	}
	
	respawn(){
		this.holey = 320 + Math.random()* (document.body.clientHeight-640);
		this.x += iwidth+ this.width;
		this.ispassed = false;
	}
	
	draw(){
		//imageMode(CORNER);
		//Beer.png
		//同时画出上半部分和下半部分。
		imageMode(CORNER);
		//Bottom one:
		image(beer_img, this.x, this.holey + this.holesize/2,this.width, this.height);
		//top one:
		image(beer_img, this.x, this.holey - this.holesize/2 - this.height, this.width, this.height);
	}
}

function preload() {
	beer_img = loadImage('https://Alligrater.github.io/Beer.png');
	gp = loadImage('https://Alligrater.github.io/GG.png');
	mg = loadImage('https://Alligrater.github.io/MEDAL_GOLD.png');
	ms = loadImage('https://Alligrater.github.io/Medal_SILVER.png');
	mb = loadImage('https://Alligrater.github.io/Medal_BRONZE.png');
	soundFormats('mp3', 'ogg');
	flap = loadSound('https://Alligrater.github.io/flap.mp3');
	death = loadSound('https://Alligrater.github.io/death_alt.mp3');
	for(var i = 0; i < 10; i++){
		var fbi = loadImage("https://Alligrater.github.io/FBGIF/FB_"+ (i + 1) +  ".png");
		fb.push(fbi);
	}
}

function regenerate(){
	plose = false;
	dqplayed = false;
	score = 0;
	waitforinput = 0;
	bin.x = 250;
	bin.y = 450;
	bin.yvel = 0;
	bin.yacc = 0;
	beerz = [];
	for(var i = 0; i < 4; i++){
		var dist = (iwidth+64) / 4;
		var beer = new Beer(dist*(i+1) + 64);
		beerz.push(beer);
	}
	
	background(40,128,200,255);
}

function setup(){
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	bin = new BB(250, 450);
	
	for(var i = 0; i < 4; i++){
		var dist = (iwidth+64) / 4;
		var beer = new Beer(dist*(i+1) + 64);
		beerz.push(beer);
	}
	
}

function draw(){
	//每一帧更新一次
	background(40,128,200,255);
	bin.draw();
	
	for(var i = 0; i < 4; i++){
		beerz[i].draw();
	}
	
	if(!input || plose){
		if(!dqplayed && plose){
			//play death audio cue and death screen.
			dqplayed = true;
			death.play();
		}
		if(plose){
			drawEndScreen();
			waitforinput += 1;
		}
		return;
	}
	
	bin.update();

	
	for(var i = 0; i < 4; i++){
		beerz[i].update();
	}
	
	//分数绘制
	textSize(32);
	fill(255,255,255);
	text(score, document.body.clientWidth*0.5, document.body.clientHeight*0.05)
}

function mouseClicked() {

	if(!plose){
		input = true;
		bin.yacc = -0.5;
		g = 0;
		flap.play();
	}
	else if(plose && waitforinput >= 60){
		if(mouseX > document.body.clientWidth*0.5 - 256
		&& mouseX < document.body.clientWidth*0.5 + 256
		&& mouseY > document.body.clientHeight*0.5 - 128
		&& mouseY < document.body.clientHeight*0.5 + 128){
			regenerate();
		}
	}

}

function drawEndScreen(){
	imageMode(CENTER);
	image(gp, document.body.clientWidth*0.5, document.body.clientHeight*0.5, 512, 256);
	var medal;
	if(score < 10){
		medal = mb;
	}
	else if(score < 30){
		medal = ms;
	}
	else{
		medal = mg;
	}
	image(medal, document.body.clientWidth*0.5 - 150, document.body.clientHeight*0.5 + 35, 128, 128);
	textSize(38);
	fill(71,71,71);
	//textFont('Segoe UI Bold');
	text(score, document.body.clientWidth*0.5 + 15, document.body.clientHeight*0.5, 128, 128)
}
