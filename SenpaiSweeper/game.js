

var xsize = 13;
var ysize = 13;

var bcount = 20;
var fcount = bcount;

var gridsize = 50;

var tilegrid = [];

var painterx = 30;
var paintery = 30;

var lastclick = 0;

var pwin = false;
var plose = false;
var bakudan;

var aaaaaaaa;

var pacemaker = 0;

class tile{
	constructor(x,y,ismine){
		this.x = x;
		this.y = y;
		this.isflagged = false;
		this.ismine = ismine;
		this.isshown = false;
		this.wasflagged = false;
		this.nearby = 0;
	}
	
	updatemcount(){
		for(var x = -1; x <= 1; x++){
			for(var y = -1; y <= 1; y++){
				if(this.x + x >= 0 && this.x + x < xsize && this.y + y >= 0 && this.y + y < ysize){
					//Check if the grid is valid.
					if(tilegrid[getIndex(this.x + x, this.y+y)].ismine == true){
						this.nearby += 1;
					}
				}
			}
		}
		
		this.nearby -= this.ismine?1:0;

	}
	
	setmine(mine){
		this.ismine = mine;
	}
	
	flip(){
		this.isshown = true;
		this.isflagged = false;
		if(this.nearby == 0){
			for(var x = -1; x <= 1; x++){
				for(var y = -1; y <= 1; y++){
					if(this.x + x >= 0 && this.x + x < xsize && this.y + y >= 0 && this.y + y < ysize){
						//set the grid as shown.
						if(tilegrid[getIndex(this.x + x, this.y+y)].isshown != true){
							tilegrid[getIndex(this.x + x, this.y+y)].flip();
						}

					}
				}
			}
		}
		
		if(this.ismine){
			gameOver();
		}
	}
}

function preload() {
	soundFormats('mp3', 'ogg');
	aaaaaaaa = loadSound('https://Alligrater.github.io/YajuPoof.mp3');
}


function setup(){
	//Generate Mine Field.
	createCanvas(document.body.clientWidth, document.body.clientHeight);
	
	var mcount = bcount;
	for(var x = 0; x < xsize; x++){
		for(var y = 0; y < ysize; y++){
			var mine = new tile(x, y, false);
			tilegrid.push(mine);
		}
	}
	
	while(mcount > 0){
		var x = rnd(0, xsize-1);
		var y = rnd(0, ysize-1);
		
		var index = x*xsize + y;
		if(tilegrid[index].ismine != true){
			tilegrid[index].ismine = true;
			mcount -= 1;
		}

	}
	
	for(var i = 0; i < tilegrid.length; i++){
		tilegrid[i].updatemcount();
		//console.log(tilegrid[i]);
	}
	
	bakudan = loadGif("https://Alligrater.github.io/YajuBakudan.gif");
	

}

function draw(){

	if(pwin == true){

		return;
	}

	background(0,0,0,255);
	

	
	
	if (mouseIsPressed) {
		if (mouseButton === LEFT) {
			var curx = 0;
			var cury = 0;
			for(var i = 0; i < tilegrid.length; i++){
				
				if(mouseX > painterx + curx*gridsize && mouseX < painterx + curx*gridsize + gridsize && mouseY > paintery + cury*gridsize && mouseY < paintery + cury*gridsize + gridsize){
					tilegrid[i].flip();
				}
					
				curx += 1;
				if(curx >= xsize){
					curx = 0;
					cury += 1;
				}
		
			}
		}
		else if (mouseButton === CENTER && lastclick <= -20) {
			lastclick = 1;
			var curx = 0;
			var cury = 0;
			for(var i = 0; i < tilegrid.length; i++){
				
				if(mouseX > painterx + curx*gridsize && mouseX < painterx + curx*gridsize + gridsize && mouseY > paintery + cury*gridsize && mouseY < paintery + cury*gridsize + gridsize){
					if(!tilegrid[i].isshown){
						tilegrid[i].isflagged = tilegrid[i].isflagged?false:true;
						tilegrid[i].wasflagged = tilegrid[i].isflagged;
						fcount += tilegrid[i].isflagged?-1:1;
						if(tilegrid[i].ismine){
							bcount += tilegrid[i].isflagged?-1:1;
							console.log(fcount + ":" + bcount);
							if(fcount == 0 && bcount == fcount){
								win();
							}
						}
					}

				}
					
				curx += 1;
				if(curx >= xsize){
					curx = 0;
					cury += 1;
				}
		
			}
		}
	}
	
	lastclick -= 1
	
	var curx = 0;
	var cury = 0;
	
	for(var i = 0; i < tilegrid.length; i++){

		noStroke();
		if(tilegrid[i].isshown == true){
			if(i%2 == 0){
				fill("rgb(220,220,220)");
			}
			else{
				fill("rgb(240,240,240)");					
			}
			
			if(tilegrid[i].ismine){
				if(tilegrid[i].wasflagged){
					if(i%2 == 0){
						fill("rgb(80,215,40)");
					}
					else{
						fill("rgb(120,255,80)");				
					}
				}
				else{
					if(i%2 == 0){
						fill("rgb(215,0,120)");
					}
					else{
						fill("rgb(255,40,160)");				
					}
				}

			}


		}
		else{
			if(i%2 == 0){
				fill("rgb(100,100,100)");
			}
			else{
				fill("rgb(120,120,120)");
			}
			
			if(tilegrid[i].isflagged){
				if(i%2 == 0){
					fill("rgb(215,112,0)");
				}
				else{
					fill("rgb(255,152,40)");				
				}
			}
		}

		
		rect(painterx + curx*gridsize, paintery + cury*gridsize, gridsize, gridsize);

	
		if(tilegrid[i].nearby > 0 && tilegrid[i].isshown && !tilegrid[i].ismine){
			noStroke();
			var r = map(tilegrid[i].nearby, 0, 8, 1, 5);
			var b = Math.round(map(tilegrid[i].nearby, 0, 8, 0, 100));
			fill(r*51,0,b);
			textAlign(LEFT);
			textSize(30);
			text(tilegrid[i].nearby, painterx + curx*gridsize, paintery + cury*gridsize + 45);
		}
		

		
		curx += 1;
		if(curx >= xsize){
			curx = 0;
			cury += 1;
		}
	}
	
	curx = 0;
	cury = 0;
	
	if(plose == true){
		for(var i = pacemaker; i < tilegrid.length; i++){
			if(tilegrid[i].ismine){
				image(bakudan, painterx + curx*gridsize-37, paintery + cury*gridsize-35);
			}
			curx += 1;
			if(curx >= xsize){
				curx = 0;
				cury += 1;
			}
		}
		

	}


	//paint the grid down!
}

function getIndex(x,y){
	return x*xsize + y;
}

function rnd(lowerValue,upperValue)
{
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

function win(){
	alert("You win!");
	for(var i = 0; i < tilegrid.length; i++){
		tilegrid[i].isshown = true;
	}
	pwin = true;
}

function gameOver(){
	for(var i = 0; i < tilegrid.length; i++){
		tilegrid[i].isshown = true;
	}
	plose = true;
	aaaaaaaa.play();
}