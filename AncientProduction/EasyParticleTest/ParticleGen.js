var particles = [];

var maxParticles;

//Probably somebody want to learn how this work, so i'll keep the comments as it is.
//I am not a js programmer and not a pro either, so don't blame me for my bad habits in coding.

class ecoord {
	//Coordinate X, Coordinate Y and size.
	//Probably also max speed.
    constructor(cx, cy, size,xvel,yvel) {
        this.cx = cx;
		this.cy = cy;
		this.size = size;
		this.xvel = xvel;
		this.yvel = yvel;
    }
	//We only need it to store things.
};


function setup(){
	//Set up phase:
	// - Bring in a canvas
	// - Create tons of ecoord blobs
	//   - put blobs into the array
	//   - store it for later usage
	 createCanvas(document.body.clientWidth, document.body.clientHeight);
	 
	 //the max particles should be around 175 in 1920*1080 situations, which looks decent.
	maxParticles = parseInt(Math.round((document.body.clientWidth*document.body.clientHeight)/12000));
	
	//We need a list of particles.
	for(var i = 0; i < maxParticles; i++){
		var cx = randomFrom(0, document.body.clientWidth);
		var cy = randomFrom(0, document.body.clientHeight);
		var size = randomFrom(5, 10);
		var xvel = randomFrom(0, 2) - 1;
		var yvel = randomFrom(0, 2) - 1;
		var part = new ecoord(cx, cy, size, xvel, yvel);
		particles.push(part);
	}
}

function draw(){
	
	//somewhat blue-ish tone to the background.
    background(30,30,37,255);
	
	//Jiggling. Who doesn't like it?!
	for(var i = 0; i < maxParticles; i++){
		//let's update the locations first!
		//too much jiggle
		var xc = Math.random()*2 - 1;
		var yc = Math.random()*2 - 1;
		
		
		particles[i].cx = particles[i].cx + xc + particles[i].xvel;
		particles[i].cy = particles[i].cy + yc + particles[i].yvel;
		
		//Easy warp mechanism
		if(particles[i].cx < 0){
			particles[i].cx += width;
		}
		
		if(particles[i].cx > width){
			particles[i].cx -= width;
		}
		
		if(particles[i].cy < 0){
			particles[i].cy += height;
		}
		
		if(particles[i].cy > height){
			particles[i].cy -= height;
		}
		
		//calculate out the distance squared. No need to do sqrts because of efficiency.
		var dist2 = Math.pow(particles[i].cx - mouseX, 2) + Math.pow(particles[i].cy - mouseY, 2)
		if(dist2 < 20000){
			stroke("#EEEEEE");
			strokeWeight((24000-dist2)/12000);
			line(mouseX, mouseY, particles[i].cx, particles[i].cy);
			stroke("#EEEEEE");

			fill("#EEEEEE")
		    ellipse(particles[i].cx, particles[i].cy, particles[i].size, particles[i].size);
		}
		else{
			if(dist2 < 50000){
				fill("rgba(238,238,238," + Math.sqrt(2500-dist2/20)*5/255 + ")");
				noStroke();
				ellipse(particles[i].cx, particles[i].cy, particles[i].size, particles[i].size);
			}
			else{

			}

			
			
		}

		
	}
	
	//Connect the dots:
	
}
//Easy random number generator found online.
function randomFrom(lowerValue,upperValue)
{
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

