let monitor
async function preload() {
	// let mySound;
	try {
		monitor = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
		console.log('monitor:', monitor)
	} catch(err) {
		console.error(err)
		// mySound = err;
	}
	// set the global sound formats
  soundFormats('mp3', 'ogg');

  // load either beatbox.mp3, or .ogg, depending on browser
  // mySound = loadSound('assets/180219.mp3');
  mySound = loadSound(monitor);
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

	analyzer = new p5.Amplitude();
	analyzer.setInput(monitor);

 	playBtn = createButton('play');
	playBtn.position(19, 19);
	
 	stopBtn = createButton('stop');
	stopBtn.position(100, 19);
	stopBtn.mousePressed(() => mySound.stop());
}

function draw() {
	var vol = analyzer.getLevel();
	// console.log('vol:', vol)

	background(0);
	// stroke(255);
	noStroke();
	// noFill();
	fill(vol*1000);
	rotateY(frameCount * vol/100);
	box(400);

	playBtn.html(mySound.isPlaying() ? 'pause' : 'play');
	playBtn.mousePressed(mySound.isPlaying() ? (() => mySound.pause()) : (() => mySound.play()));
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
