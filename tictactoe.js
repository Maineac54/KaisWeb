/* Javascript for Kai's Tic Tac Toe game */

/* Global Namespace */
var ttt_app = ttt_app || {};

ttt_app.Testing = function() {
	alert("Just Testing");	
}

/* classes for the project  */

var Point = function(x, y, z) {
	var X = x;
	var Y = y;
	var Z = z;	
	
	
}

/* Cell Class part of every tictactoe board */
var Cell = function(row, col, dep) {
	var row = row;
	var col = col;
	var dep = dep;
	
	var width = 40;
	var loc = new Point(1, 1, 1);
}

Cell.prototype.draw = function() {
	
	
}





ttt_app.playTicTacToe = function() {
  var canvas = document.getElementById("theCanvas");
  if(!canvas) {
  	 alert("Unable to find the canvas.");
  }
  
  if(!canvas.getContext) {
  		alert("Unable to get the canvas by ID or canvas not supported.");
  }
  	
  try {
    var ctx = canvas.getContext("2d");
    if(ctx == null) {
    	alert("Unable to get 2D Context.");
    	return;
    }
    
    ctx.font = "32px serif";  
    ctx.fillStyle = "blue";
    ctx.fillText("Using the 2D context.", 100, 25);

    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect (10, 10, 55, 50);

    ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    ctx.fillRect (30, 30, 55, 50);
  		
  } catch(err) {
  	 alert(err);
  }
}
