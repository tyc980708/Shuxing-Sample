//P5.js + minigame.js = good

var currentGame; //Selected Game
var gameList = []; //List of Games
var userChoice = 0;

/* MENU CLASS
 * Choose -> 移动到当前选择的游戏
 * swapGames -> 移动光标
 */

class menu{
	constructor(){
		//什么也不用写
	}
	choose(){
		currentGame = gameList[userChoice];
	}
	swapGames(x){
		userChoice += x;
		userChoice = userChoice % gameList.length;
	}
}

class games{
	constructor(name){
		this.name = name;
	}
	
	update(){
		fb_update();
	}
	regenerate(){
		//Regenerate the game
	}
	//Switch to this game
}

//Load everything here
function preload(){
	
}

function setupGame(){
	//Non traditional way to setup ay
	createCanvas(120, 70);
}

function draw(){
	if(currentGame != null){
		//currentGame.update();
	}

}

function menu_update(){
	
}






//Game 1
function fb_update(){
	
}