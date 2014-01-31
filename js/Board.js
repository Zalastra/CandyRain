this.cr = this.cr || {};

(function() {

var Board = function() {
	this.initialize();
};
var p = Board.prototype = Object.create(createjs.Container.prototype);

// static properties
Board.cellSize = 30; // Must be an even number

// public properties
p.fallingBlock = null;

// private properties
p._lines = [];

// constructor
p.Container_initialize = p.initialize;

p.initialize = function() {
	this.Container_initialize();
	
	for (var i = 0; i < 20; i++) {
		var line = new cr.Line();
		line.y = i * Board.cellSize;
		this.addChild(line);
		this._lines[i] = line;
	}
};

// public methods

p.setFallingBlock = function(nextBlock) {
	this.fallingBlock = nextBlock;
	this.addChild(nextBlock);
	nextBlock.setPos(120, 0);
}

// Put the blocks on the board.
p.placeFallingBlock = function() {
	var offsetX = 0;
	var offsetY = 0;
	
	switch (Math.abs(this.fallingBlock.rotation%360)) {
		case 90:
			offsetX = -Board.cellSize;
			break;
		case 180:
			offsetX = -Board.cellSize;
			offsetY = -Board.cellSize;
			break;
		case 270:
			offsetY = -Board.cellSize;
			break;
	}
	
	var blocks = this.fallingBlock.children;
	while (blocks.length > 0) {
		var block = blocks.pop();
		var point = block.localToGlobal(this.x, this.y);
		var x = (point.x + offsetX) / Board.cellSize;
		var y = (point.y + offsetY) / Board.cellSize;
		this._lines[y].addBlockAt(block, x);
		block.y = 0;
	}
	
	this.removeChild(this.fallingBlock);
	this.fallingBlock = null;
}

cr.Board = Board;
}());