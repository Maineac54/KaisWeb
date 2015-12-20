/* A place to test javascript */
/* Global variables */
var ctx = null;

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
		while(ctx.measureText(ln) > cWid) {
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
