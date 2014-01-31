this.cr = this.cr || {};

(function() {

// IBlock Class
var IBlock = function() {
	this.initialize([0, 1, 0, 0, 0, 2, 0, 3]);
};
IBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.IBlock = IBlock;
// End IBlock Class

// JBlock Class
var JBlock = function() {
	this.initialize([1, 1, 1, 0, 0, 2, 1, 2]);
};
JBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.JBlock = JBlock;
// End JBlock Class

// LBlock Class
var LBlock = function() {
	this.initialize([0, 1, 0, 0, 0, 2, 1, 2]);
};
LBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.LBlock = LBlock;
// End LBlock Class

// OBlock Class
var OBlock = function() {
	this.initialize([0, 0, 0, 1, 1, 0, 1, 1]);
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
	this.initialize([1, 0, 0, 0, 1, 1, 2, 1]);
};
SBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.SBlock = SBlock;
// End SBlock Class

// TBlock Class
var TBlock = function() {
	this.initialize([1, 0, 0, 1, 1, 1, 2, 1]);
};
TBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.TBlock = TBlock;
// End TBlock Class

// ZBlock Class
var ZBlock = function() {
	this.initialize([1, 0, 2, 0, 0, 1, 1, 1]);
};
ZBlock.prototype = Object.create(cr.CandyBlock.prototype);

cr.ZBlock = ZBlock;
// End ZBlock Class

}());