this.cr = this.cr || {};

(function() {

// IBlock Class
var IBlock = function() {

	var image1 = new createjs.Bitmap();
	image1.image = cr.Board.blockImages;
	image1.sourceRect =new createjs.Rectangle(120,60,30,30);

	
	var image2 = new createjs.Bitmap();
	image2.image = cr.Board.blockImages;
	image2.sourceRect = new createjs.Rectangle(150,60,30,30);

	
	var image3 = new createjs.Bitmap();
	image3.image = cr.Board.blockImages;
	image3.sourceRect = new createjs.Rectangle(180,60,30,30);
	
	var image4 = new createjs.Bitmap();
	image4.image = cr.Board.blockImages;
	image4.sourceRect = new createjs.Rectangle(210,60,30,30);

	
	var arg1 = {
		x: 0,
		y: 0,
		image: image1
		}
	var arg2 = {
		x: 1,
		y: 0,
		image: image2
		}
	var arg3 = {
		x: 2,
		y: 0,
		image: image3
		}
	var arg4 = {
		x: 3,
		y: 0,
		image: image4
		}
	this.initialize([arg2, arg1, arg3, arg4]);
};
IBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.IBlock = IBlock;
// End IBlock Class

// JBlock Class
var JBlock = function() {
	var image1 = new createjs.Bitmap();
	image1.image = cr.Board.blockImages;
	image1.sourceRect =new createjs.Rectangle(60,60,30,30);

	
	var image2 = new createjs.Bitmap();
	image2.image = cr.Board.blockImages;
	image2.sourceRect = new createjs.Rectangle(90,60,30,30);

	
	var image3 = new createjs.Bitmap();
	image3.image = cr.Board.blockImages;
	image3.sourceRect = new createjs.Rectangle(90,90,30,30);
	
	var image5 = new createjs.Bitmap();
	image5.image = cr.Board.blockImages;
	image5.sourceRect = new createjs.Rectangle(90,150,30,30);
	
	var arg1 = {
		x: 0,
		y: 0,
		image: image1
		}
	var arg2 = {
		x: 1,
		y: 0,
		image: image2
		}
	var arg3 = {
		x: 1,
		y: 1,
		image: image3
		}
	var arg4 = {
		x: 1,
		y: 2,
		image: image5
		}




	this.initialize([arg3, arg2, arg1, arg4]);
};
JBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.JBlock = JBlock;
// End JBlock Class

// LBlock Class
var LBlock = function() {
	var image1 = new createjs.Bitmap();
	image1.image = cr.Board.blockImages;
	image1.sourceRect =new createjs.Rectangle(0,60,30,30);

	
	var image2 = new createjs.Bitmap();
	image2.image = cr.Board.blockImages;
	image2.sourceRect = new createjs.Rectangle(30,60,30,30);

	
	var image3 = new createjs.Bitmap();
	image3.image = cr.Board.blockImages;
	image3.sourceRect = new createjs.Rectangle(0,90,30,30);
	
	var image5 = new createjs.Bitmap();
	image5.image = cr.Board.blockImages;
	image5.sourceRect = new createjs.Rectangle(0,150,30,30);


	
	var arg1 = {
		x: 0,
		y: 0,
		image: image1
		}
	var arg2 = {
		x: 1,
		y: 0,
		image: image2
		}
	var arg3 = {
		x: 0,
		y: 1,
		image: image3
		}
	var arg4 = {
		x: 0,
		y: 2,
		image: image5
		}

	
	
	this.initialize([arg3, arg2, arg1, arg4]);
};
LBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.LBlock = LBlock;
// End LBlock Class

// OBlock Class
var OBlock = function() {
		var image1 = new createjs.Bitmap();
	image1.image = cr.Board.blockImages;
	image1.sourceRect =new createjs.Rectangle(0,0,30,30);

	
	var image2 = new createjs.Bitmap();
	image2.image = cr.Board.blockImages;
	image2.sourceRect = new createjs.Rectangle(0,30,30,30);

	
	var image3 = new createjs.Bitmap();
	image3.image = cr.Board.blockImages;
	image3.sourceRect = new createjs.Rectangle(30,0,30,30);
	
	var image4 = new createjs.Bitmap();
	image4.image = cr.Board.blockImages;
	image4.sourceRect = new createjs.Rectangle(30,30,30,30);

	
	var arg1 = {
		x: 0,
		y: 0,
		image: image1
		}
	var arg2 = {
		x: 0,
		y: 1,
		image: image2
		}
	var arg3 = {
		x: 1,
		y: 0,
		image: image3
		}
	var arg4 = {
		x: 1,
		y: 1,
		image: image4
		}
	this.initialize([arg2, arg1, arg3, arg4]);
};
OBlock.prototype = Object.create(cr.CandyBlock.prototype);

// Overwrite initialize to set different point of origin
OBlock.prototype.CandyBlock_initialize = OBlock.prototype.initialize;
OBlock.prototype.initialize = function(positions) {
	this.CandyBlock_initialize(positions);
	
	this.x = this.regX = cr.Board.cellSize;
	this.y = this.regY = cr.Board.cellSize;
};

cr.OBlock = OBlock;
// End OBlock Class

// SBlock Class
var SBlock = function() {
	var image1 = new createjs.Bitmap();
	image1.image = cr.Board.blockImages;
	image1.sourceRect =new createjs.Rectangle(60,0,30,30);

	
	var image2 = new createjs.Bitmap();
	image2.image = cr.Board.blockImages;
	image2.sourceRect = new createjs.Rectangle(90,0,30,30);

	
	var image3 = new createjs.Bitmap();
	image3.image = cr.Board.blockImages;
	image3.sourceRect = new createjs.Rectangle(90,30,30,30);
	
	var image4 = new createjs.Bitmap();
	image4.image = cr.Board.blockImages;
	image4.sourceRect = new createjs.Rectangle(120,30,30,30);

	
	var arg1 = {
		x: 0,
		y: 0,
		image: image1
		}
	var arg2 = {
		x: 2,
		y: 1,
		image: image2
		}
	var arg3 = {
		x: 1,
		y: 0,
		image: image4
		}
	var arg4 = {
		x: 1,
		y: 1,
		image: image3
		}
	
	
	this.initialize([arg3, arg2, arg1, arg4]);

};
SBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.SBlock = SBlock;
// End SBlock Class

// TBlock Class
var TBlock = function() {
	var image1 = new createjs.Bitmap();
	image1.image = cr.Board.blockImages;
	image1.sourceRect =new createjs.Rectangle(280,0,30,30);

	
	var image2 = new createjs.Bitmap();
	image2.image = cr.Board.blockImages;
	image2.sourceRect = new createjs.Rectangle(250,30,30,30);

	
	var image3 = new createjs.Bitmap();
	image3.image = cr.Board.blockImages;
	image3.sourceRect = new createjs.Rectangle(280,30,30,30);
	
	var image4 = new createjs.Bitmap();
	image4.image = cr.Board.blockImages;
	image4.sourceRect = new createjs.Rectangle(310,30,30,30);

	
	var arg1 = {
		x: 1,
		y: 0,
		image: image1
		}
	var arg2 = {
		x: 0,
		y: 1,
		image: image2
		}
	var arg3 = {
		x: 1,
		y: 1,
		image: image3
		}
	var arg4 = {
		x: 2,
		y: 1,
		image: image4
		}
	
	
	this.initialize([arg3, arg2, arg1, arg4]);
};
TBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.TBlock = TBlock;
// End TBlock Class

// ZBlock Class
var ZBlock = function() {
	var image1 = new createjs.Bitmap();
	image1.image = cr.Board.blockImages;
	image1.sourceRect =new createjs.Rectangle(150,30,30,30);

	
	var image2 = new createjs.Bitmap();
	image2.image = cr.Board.blockImages;
	image2.sourceRect = new createjs.Rectangle(210,0,30,30);

	
	var image3 = new createjs.Bitmap();
	image3.image = cr.Board.blockImages;
	image3.sourceRect = new createjs.Rectangle(180,0,30,30);
	
	var image4 = new createjs.Bitmap();
	image4.image = cr.Board.blockImages;
	image4.sourceRect = new createjs.Rectangle(180,30,30,30);

	
	var arg1 = {
		x: 0,
		y: 1,
		image: image1
		}
	var arg2 = {
		x: 2,
		y: 0,
		image: image2
		}
	var arg3 = {
		x: 1,
		y: 0,
		image: image4
		}
	var arg4 = {
		x: 1,
		y: 1,
		image: image3
		}
	
	
	this.initialize([arg3, arg2, arg1, arg4]);
};
ZBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.ZBlock = ZBlock;
// End ZBlock Class

}());