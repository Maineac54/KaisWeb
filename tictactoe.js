/* Javascript for Kai's Tic Tac Toe game */

/* Gloabal variables */
var ctx = null;
var theGame = null;

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
function fillComboIdx() {
	var idx = createArray(49, 3);
	
	idx[0][0] = 0;
	idx[0][1] = 1;
	idx[0][2] = 2;
	idx[1][0] = 0;
	idx[1][1] = 3;
	idx[1][2] = 6;
	idx[2][0] = 0;
	idx[2][1] = 4;
	idx[2][2] = 8;
	idx[3][0] = 0;
	idx[3][1] = 9;
	idx[3][2] = 18;
	idx[4][0] = 0;
	idx[4][1] = 10;
	idx[4][2] = 20;
	idx[5][0] = 0;
	idx[5][1] = 12;
	idx[5][2] = 24;
	idx[6][0] = 0;
	idx[6][1] = 13;
	idx[6][2] = 26;
	idx[7][0] = 1;
	idx[7][1] = 4;
	idx[7][2] = 7;
	idx[8][0] = 1;
	idx[8][1] = 10;
	idx[8][2] = 19;
	idx[9][0] = 1;
	idx[9][1] = 13;
	idx[9][2] = 25;
	idx[10][0] = 2;
	idx[10][1] = 5;
	idx[10][2] = 8;
	idx[11][0] = 2;
	idx[11][1] = 4;
	idx[11][2] = 6;
	idx[12][0] = 2;
	idx[12][1] = 11;
	idx[12][2] = 20;
	idx[13][0] = 2;
	idx[13][1] = 10;
	idx[13][2] = 18;
	idx[14][0] = 2;
	idx[14][1] = 13;
	idx[14][2] = 24;
	idx[15][0] = 2;
	idx[15][1] = 14;
	idx[15][2] = 26;
	idx[16][0] = 3;
	idx[16][1] = 4;
	idx[16][2] = 5;
	idx[17][0] = 3;
	idx[17][1] = 12;
	idx[17][2] = 21;
	idx[18][0] = 3;
	idx[18][1] = 13;
	idx[18][2] = 23;
	idx[19][0] = 4;
	idx[19][1] = 13;
	idx[19][2] = 22;
	idx[20][0] = 5;
	idx[20][1] = 14;
	idx[20][2] = 23;
	idx[21][0] = 5;
	idx[21][1] = 13;
	idx[21][2] = 21;
	idx[22][0] = 6;
	idx[22][1] = 7;
	idx[22][2] = 8;
	idx[23][0] = 6;
	idx[23][1] = 15;
	idx[23][2] = 24;
	idx[24][0] = 6;
	idx[24][1] = 16;
	idx[24][2] = 26;
	idx[25][0] = 6;
	idx[25][1] = 13;
	idx[25][2] = 20;
	idx[26][0] = 6;
	idx[26][1] = 12;
	idx[26][2] = 18;
	idx[27][0] = 7;
	idx[27][1] = 16;
	idx[27][2] = 25;
	idx[28][0] = 7;
	idx[28][1] = 13;
	idx[28][2] = 19;
	idx[29][0] = 8;
	idx[29][1] = 17;
	idx[29][2] = 26;
	idx[30][0] = 8;
	idx[30][1] = 14;
	idx[30][2] = 20;
	idx[31][0] = 8;
	idx[31][1] = 16;
	idx[31][2] = 24;
	idx[32][0] = 8;
	idx[32][1] = 13;
	idx[32][2] = 18;
	idx[33][0] = 9;
	idx[33][1] = 10;
	idx[33][2] = 11;
	idx[34][0] = 9;
	idx[34][1] = 12;
	idx[34][2] = 15;
	idx[35][0] = 9;
	idx[35][1] = 13;
	idx[35][2] = 17;
	idx[36][0] = 10;
	idx[36][1] = 13;
	idx[36][2] = 16;
	idx[37][0] = 11;
	idx[37][1] = 14;
	idx[37][2] = 17;
	idx[38][0] = 11;
	idx[38][1] = 13;
	idx[38][2] = 15;
	idx[39][0] = 12;
	idx[39][1] = 13;
	idx[39][2] = 14;
	idx[40][0] = 15;
	idx[40][1] = 16;
	idx[40][2] = 17;
	idx[41][0] = 18;
	idx[41][1] = 19;
	idx[41][2] = 20;
	idx[42][0] = 18;
	idx[42][1] = 22;
	idx[42][2] = 26;
	idx[43][0] = 18;
	idx[43][1] = 21;
	idx[43][2] = 24;
	idx[44][0] = 19;
	idx[44][1] = 22;
	idx[44][2] = 25;
	idx[45][0] = 20;
	idx[45][1] = 23;
	idx[45][2] = 26;
	idx[46][0] = 20;
	idx[46][1] = 22;
	idx[46][2] = 24;
	idx[47][0] = 21;
	idx[47][1] = 22;
	idx[47][2] = 23;
	idx[48][0] = 24;
	idx[48][1] = 25;
	idx[48][2] = 26;
	
	return(idx);
}
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	var pt = new Point(0, 0, 0);
		
	pt.X = evt.clientX - rect.left,
	pt.Y = evt.clientY - rect.top
	
	return(pt);
}
function userSelect(e) {
	if (!e) var e = window.event
	// handle event
	var pt = getMousePos(ctx.canvas, e);
	
	theGame.CheckUserClick(pt);
	
	e.cancelBubble = true;
	if (e.stopPropagation) e.stopPropagation();
}
function getContext() {
	if(ctx == null) {  
		var canvas = document.getElementById('theCanvas');

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
function writeMsg(messg, Xpos, Ypos, ftSize, ftColor) {
   var X = 25
   var Y = 25;
   var _size = 12;
   var _color = "blue";
   
   if(Xpos != null) X = Xpos;
   if(Ypos != null) Y = Ypos;
	if(ftSize != null) _size = ftSize;
	if(ftColor != null) _color = ftColor;
	
	getContext();
	
	var cWid = ctx.canvas.width;
	
	ctx.font = _size + "px serif";  
   ctx.fillStyle = _color;
   
	var wid = ctx.measureText(messg).width;   
   var lns = Math.floor(wid / cWid) + 1;
   var sMsg = new String(messg);
   var arTokens = sMsg.split(" ");
   var wpl = Math.floor(arTokens.length / lns);
   var st = 0;
   var en = wpl;
   
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
   	
   	ctx.fillText(ln, X, Y);
   	Y += 30;
   }
}

/* classes for the project  */
var Point = function(x, y, z) {
	this.X = x;
	this.Y = y;
	this.Z = z;	
	
	var range = 0.0;
	var bearing = 0.0;
	
	this.calcLoc = function() {
		range = Math.sqrt(this.X * this.X + this.Y * this.Y);
		bearing = Math.asin(X / range);
	}
	
	this.getRange = function() {
		return(range);
	}
	this.getBearing = function() {
		return(bearing);
	}
}
var Cell = function(row, col, dep) {
	this.row = row;
	this.col = col;
	this.dep = dep;
	var _id = "R" + row +"C" + col + "D" + dep;
	
	var width = 40;
	this.getWidth = function() { return(width); }
	this.loc2D = new Point(1, 1, 1);
	this.loc3D = null;
	this.ID = function() { return(_id);}
	this.userID = 0;

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
			
			/* draw the user symbol */
			if(this.userID != 0) {
				if(this.userID == 1) ctx.fillStyle = '#00ee00';
				if(this.userID == 2) ctx.fillStyle = '#ee0000';
            ctx.beginPath();
            ctx.arc(this.loc2D.X + width / 2, this.loc2D.Y + width / 2, 8, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
			} 
		}
	}
}
var gameBoard = function(loc, cWidth, depth) {
	this.cells = [];
	
	for(row=0;row<3;row++) {
		for(col=0;col<3;col++) {
			var tmp = new Cell(row, col, depth);
			tmp.setSize(cWidth, loc);
			this.cells.push(tmp);
			
		}
	}
	
	this.drawBoard = function() {
		for(i=0;i<this.cells.length;i++) {
			this.cells[i].draw2DCell();
			
		}
	}
	
}
var game = function() {
	this.curUser = 0;
	var gameCells = [];
	var comboIndex = fillComboIdx();

	var pt = new Point(40, 410, 0);
	var boardBot = new gameBoard(pt, 50, 0);
	gameCells = boardBot.cells;
		
	pt.X += 180;
	var boardMid = new gameBoard(pt, 50, 1);
	gameCells = gameCells.concat(boardMid.cells);
		
	pt.X += 180;
	var boardTop = new gameBoard(pt, 50, 2);
	gameCells = gameCells.concat(boardTop.cells);
		
	boardBot.drawBoard();
	boardMid.drawBoard();
	boardTop.drawBoard();
	
	function checkScore() {
		var p1 = 0, p2 = 0;
		
		for(var i=0;i<comboIndex.length;i++) {
			cell1 = gameCells[comboIndex[i][0]];
			cell2 = gameCells[comboIndex[i][1]];
			cell3 = gameCells[comboIndex[i][2]];
			
			if((cell1.userID == 1) && (cell2.userID == 1) && (cell3.userID == 1)) {
				p1++;
			}
			if((cell1.userID == 2) && (cell2.userID == 2) && (cell3.userID == 2)) {
				p2++;
			}
		}

		/* Clear Score */		
		ctx.clearRect(85, 70, 50, 50);
		
  		/* write scores */
  		writeMsg(p1, 100, 90, 18, 'black');
  		writeMsg(p2, 100, 115, 18, 'black');
  		
	}
	getSelectedCell = function(pt) {
		var _cell = null;
	
		for(var i=0;i<gameCells.length;i++) {
			_cell = gameCells[i];
		
			if((pt.X >= _cell.loc2D.X) && (pt.X <= (_cell.loc2D.X + _cell.getWidth()))) {
				if((pt.Y >= _cell.loc2D.Y) && (pt.Y <= (_cell.loc2D.Y + _cell.getWidth()))) {
					return(_cell);
				}
			}
		}
	
		return(null);
	}
	this.CheckUserClick = function(pt)	{
		var selCell = getSelectedCell(pt);
	
		if(selCell != null) {
			if(selCell.userID == 0) {
				if(this.curUser == 1) {
					this.curUser = 2;
				} else {
					this.curUser = 1;
				}
		
				selCell.userID = this.curUser;
				selCell.draw2DCell();
				checkScore();
			}
		}
	}
}

function playTicTacToe() {
  	
	try {
		getContext();
		    
		writeMsg("3D Tic Tac Toe", 200, 35, 36, "blue");
		
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(0, 50);
		ctx.lineTo(600, 50);
		ctx.moveTo(150, 50);
		ctx.lineTo(150, 370);
		ctx.moveTo(0, 370);
		ctx.lineTo(600, 370);
		ctx.stroke();
  		
  		/* Player One */
		ctx.fillStyle = '#00ee00';
		ctx.beginPath();
		ctx.arc(10, 85, 8, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
  		writeMsg("Player1:", 22, 90, 18, 'black');
  		
  		/* Player Two */
		ctx.fillStyle = '#ee0000';
		ctx.beginPath();
		ctx.arc(10, 110, 8, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();
  		writeMsg("Player2:", 22, 115, 18, 'black');
  		
		theGame = new game();
	} catch(err) {
		alert(err);
	}
}
