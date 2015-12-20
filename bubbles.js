/* Javascript for Kai's Web Site */

function Testing() {
	alert("Testing");	
}
	
const minBubble = 14;
const maxBubble = 74;
const minSpeed = 1;
const maxSpeed = 10;
var cnvs;
var ctx;
var animationID;
var Colors = ["#ff0000", "#00ff00", "#0000ff", "#00ffff", "#ffff00"];

function Bubble() {
	var X = maxBubble;
	var Y = maxBubble;
	var rad = minBubble;
	var dir = 0;
	var spd = minSpeed;
	var Color = "#ffffff";
}

var Bubbles = [];

function random() {
	var d = new Date();
	var val = (d.getMilliseconds() * Math.random()) / 1000;
	//console.log("random value: " + val + ", milli-sec = " + d.getMilliseconds());
	return val;	
}

function drawBubble(bbl) {
	// console.log("Bubble color = " + bbl.Color);	
	ctx.strokeStyle = bbl.Color;
	ctx.beginPath();
	ctx.arc(bbl.X, bbl.Y, bbl.rad, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.closePath();
}

function addBubble(idx) {
	var bubl = new Bubble();
	bubl.X = minBubble + Math.floor(random() * (400 - 2 * minBubble));
	bubl.Y = minBubble + Math.floor(random() * (400 - 2 * minBubble));
	bubl.rad = minBubble + Math.floor(random() * (maxBubble - minBubble));
	bubl.dir = Math.floor(random() * 360);
	bubl.spd = minSpeed + Math.floor(random() * (maxSpeed - minSpeed));
	bubl.Color = Colors[idx];
	
	Bubbles.push(bubl);	
}

function moveBubble(bbl) {
	var X = X + Math.floor(Math.cos(bbl.dir) * bbl.spd);
	var Y = Y + Math.floor(Math.sin(bbl.dir) * bbl.spd);

	if((X < bbl.rad) || (X > cnvs.width + bbl.rad)) {
		return(false);
	} 
	if((Y < bbl.rad) || (Y > cnvs.height + bbl.rad)) {
		return(false);
	} 
	
	bbl.X = X;
	bbl.Y = Y;

	ctx.strokeStyle = bbl.Color;
	ctx.beginPath();
	ctx.arc(bbl.X, bbl.Y, bbl.rad, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.closePath();
}

function moveObjects() {
	var value = true;
	console.log("moveObjects called.");
	
	//Bubbles
	var temp = [];
	for(var i=0;i<Bubbles.length;i++) {
		if(moveBubble(Bubbles[i])) {
			temp.push(Bubbles[i]);
		}
	}
	Bubbles = temp;
	
	if(Bubbles.length <= 0) {
		window.clearInterval(animationID);
	} else {
		animationID = window.setTimeout(moveObjects, 100);
	}
}

function startAnimation() {
	// Create objects
	for(var i=0;i<Bubbles.length;i++) {
		// console.log("Bubble[" + i + "].rad = " + Bubbles[i].rad );
		drawBubble(Bubbles[i]);
	}

	animationID = window.setTimeout(moveObjects, 100);
}

function startDrawing() {
	cnvs = document.getElementById("fractals");
	cnvs.height = 400;
	cnvs.width = 400;
	ctx = cnvs.getContext("2d");
	ctx.lineHeight = 2;
	

	if(Bubbles.length == 0) {
		for(var i = 0;i<5;i++) {
			addBubble(i);
		}
	}
	
	startAnimation();
}
