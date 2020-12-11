//============================================
// Sketch File 
//============================================

let goldFish;
let clientWidth, clientHeight;
let speedSlider, accelerationSlider; 


function windowResized() {
	console.log("resized");
	clientHeight = document.getElementById('window').clientHeight;
	clientWidth = document.getElementById('window').clientWidth;
	resizeCanvas(clientWidth, clientHeight);
}


function setup() {
	
	// Window Detection
	clientHeight = document.getElementById('window').clientHeight;
	clientWidth = document.getElementById('window').clientWidth;
	
	// Creating Canvas
	canvas = createCanvas (clientWidth, clientHeight);
	canvas.position(0,0);
	canvas.style('z-index', '-10');
	
	// Creating Sliders
	speedSlider = createSlider(0,10,4,.5);
	speedSlider.position(20,40);
	accelerationSlider = createSlider(0,4,.5,.1);
	accelerationSlider.position(20,85);
	// Background Color
	background(0);

	// Creating an instance of the Fish object
	goldFish = new Fish();
}


  
function draw() {
	//Redraw Background Color (Necessary?)
	background(0);

	//Text for Sliders


	goldFish.update();
	goldFish.checkEdges();
	goldFish.display();

	fill(255);
	textSize(16);
	text('Top Speed', 20, 30);
	fill(255);

	textSize(16);
	text('Acceleration Magnitude', 20, 75);
	fill(255);
}

class Fish {
	
	constructor(){
		this.location = new createVector(random(clientWidth), random(clientHeight));
		this.velocity = new createVector(0,0);
		this.acceleration = new createVector(0,0);

		this.topspeed = 1;

		this.xoff = 0; 
		this.yoff = 1000;
	}

	update(){
		let mouse = new createVector(mouseX, mouseY);
		

    // If the mouse isn't on the screen 
    if (((mouse.x == 0) || (mouse.y == 0)) || ((mouse.x == width -1) || (mouse.y == height-1))) {
			this.topspeed = 1;

			this.acceleration.x = map(noise(this.xoff),0,1,-3,3);
      this.acceleration.y = map(noise(this.yoff),0,1,-3,3);
      // Take the next step through our perlin field
      this.xoff += 0.01;
			this.yoff += 0.01;
			
    }
    else {
    
      this.topspeed = speedSlider.value();
      // else, just meander
      // Calculate the vector between location and mouse
      let direction = p5.Vector.sub(mouse,this.location);
      // Normalize vector so that you can scale
      direction.normalize();
			// Scale 
			let scaleFactor = accelerationSlider.value();
      direction.mult(scaleFactor);
      // Assign to my acceleration
			this.acceleration = direction;
			
    }

		this.velocity = this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
		this.location = this.location.add(this.velocity);
		

	}

	display(){
		noStroke();
		fill(255,100,25);
		ellipse(this.location.x,this.location.y,16,16);
	}

	checkEdges(){
		if (this.location.x > clientWidth) {
      this.location.x = 0;
    }
    else if (this.location.x < 0) {
      this.location.x = clientWidth;
    }
    
    
    if (this.location.y > clientHeight) {
      this.location.y = 0;
    }
    else if (this.location.y < 0) {
      this.location.y = clientHeight;
    }

	}

}

