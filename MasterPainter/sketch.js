var ox = -1;
var oy = -1;

var nx = -1;
var ny = -1;

var strsize = 1;

var colors;
function setup() { 
  var cnv = createCanvas(document.body.clientWidth/1.5, document.body.clientHeight/1.5);
  background(250);
  document.getElementById("pensize").value=strsize;
  

} 

function draw() { 
  if (mouseIsPressed){
	  //initialize ox if neither is set.
	  //prevents drawing a line from 0,0 to mouse.
	  
	  var tx = nx;
	  var ty = ny;
	  
	  nx = mouseX;
	  ny = mouseY;
	  
	  ox = tx;
	  oy = ty;

  }
  else{
	  // do nothing
	  if(!keyIsDown(SHIFT)){
		nx = -1;
		ny = -1;
	  }
	  else{
		  //do nothing
	  }

  }
  
  if(ox == -1 || oy == -1 || nx == -1 || ny == -1){
	  //do nothing
  }
  else{
	  var opaci = parseInt(document.getElementById("opacity").value).toString(16).toUpperCase();
	  stroke(document.getElementById("yourcolor").value + opaci);
	  strokeWeight(document.getElementById("pensize").value);
	  smooth();
	  line(ox, oy, nx, ny);
  }

}

function mouseWheel(event){
	if(!keyIsDown(SHIFT)){
		strsize -= event.delta/100;
	}
	else{
		strsize -= event.delta/10;
	}
	if(strsize <= 0){
		strsize = 1;
	}
	document.getElementById("pensize").value=strsize;
}

function clearBoard(){
	//create a new board for use.
	var r=confirm("你确定要清屏吗？");
	if(r){
		createCanvas(document.body.clientWidth/1.5, document.body.clientHeight/1.5);
		background(250);
	}
	else{
		
	}
}
