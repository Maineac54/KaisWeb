/* A place to test javascript */
/* Global variables */
var ctx = null;
var gameBoard2D = [];

function getContext() {
	if(ctx == null) {  
		var canvas = document.getElementById('canvas');

		if (!canvas) {
			alert('Error: Cannot find the canvas element!');
			return;
		}

		if (!canvas.getContext) {
			alert('Error: Canvas context does not exist!');
			return;
		}
		ctx = canvas.getContext('2d');
	}
}

function setBackground() {
	getContext();
  
	if(ctx == null) {
		alert("Unable to get canvas context.");
	}
	ctx.fillStyle = "#3d3";
	ctx.fillRect(5, 5, 390, 190);
}

function writeMsg(messg) {
	getContext();
	
	var cWid = ctx.canvas.width;
	
	ctx.font = "18px serif";  
   ctx.fillStyle = "red";
   
	var wid = ctx.measureText(messg).width;   
   var lns = Math.floor(wid / cWid) + 1;
   var sMsg = new String(messg);
   var arTokens = sMsg.split(" ");
   var wpl = Math.floor(arTokens.length / lns);
   var st = 0;
   var en = wpl;
   var Y = 25;
   
   while(st < arTokens.length) {
   	var ln = "";
   	for(i=st;i<en;i++) {
   		ln = ln + arTokens[i] + " ";
   	}
   	
   	st = en - 1;
		while(ctx.measureText(ln).width > cWid) {
   		ln = ln.splice(-1 * (arTokens[st--].length + 1));
   	}
   	
   	st++;
   	en = st + wpl;
   	if(en > arTokens.length) {
   		en = arTokens.length;
   	}
   	
   	ctx.fillText(ln, 25, Y);
   	Y += 30;
   }
}

/*  Working with Javascript variables */

var Point = function(x, y, z) {
	this.X = x;
	this.Y = y;
	this.Z = z;	
	
	var range = 0.0;
	var bearing = 0.0;
	
	this.calcLoc = function() {
		range = Math.sqrt(this.X * this.X + this.Y * this.Y);
		bearing = Math.asin(this.X / range);
	}
	
	this.calcLoc();
	
	this.getRange = function() {
		return(range);
	}
	this.getBearing = function() {
		return(bearing);
	}
}
 
/*	Things to do for cells
 *	function to set the size (width) of a cell and it's location relative to it's row/col/depth
 * function to draw the cell in '2D' mode
 * function to draw the cell in '3D' (isometric) mode
 * event to detect user input
 * variable to store users ID
 * 
 */

var Cell = function(row, col, dep) {
	var row = row;
	var col = col;
	var dep = dep;
	
	var width = 40;
	this.loc2D = new Point(1, 1, 1);
	this.loc3D = null;
	
	this.setSize = function(sideLen, boardBasePt) {
		width = sideLen;
		
		var _x = row * width + boardBasePt.X;
		var _y = col * width + boardBasePt.Y;
		var _z = dep * width + boardBasePt.Z;
		
		this.loc2D = new Point(_x, _y, _z);
		/* add loc3D definition here */
		
	}
	
	this.draw2DCell = function() {
		getContext();
		
		if(ctx != null) {
			ctx.beginPath();
			ctx.rect(this.loc2D.X, this.loc2D.Y, width, width);
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'black';
			ctx.stroke();
			
		}
		
	}
}

function BuildBoard2D() {
	for(row=0;row<3;row++) {
		for(col=0;col<3;col++) {
			var bdPt = new Point(50, 50, 0);
			var temp = new Cell(row, col, 0);
			temp.setSize(40, bdPt);
			gameBoard2D.push(temp);
		}
		
	}
}

function drawCell(element, index, array) {
	element.draw2DCell();
	
}

function doTest() {
	BuildBoard2D();
	
	/* Draw board */
	gameBoard2D.foreach(drawCell)




}


