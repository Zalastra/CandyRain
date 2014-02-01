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
		
		// TEST CODE REMOVE LATER
		if (i == 0 || i == 18 || i == 19) {
			var block = new createjs.Shape();
			block.graphics.beginFill("#AA0000").drawRect(0, 0, cr.Board.cellSize, cr.Board.cellSize);
			block.setBounds(0, 0, cr.Board.cellSize, cr.Board.cellSize);
			block.y = 0;
			this._lines[i].addBlockAt(block, 2);
		}
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
	var blocks = this.fallingBlock.children;
	while (blocks.length > 0) {
		var block = blocks.pop();
		var point = block.localToGlobal(this.x, this.y);
		var x = (point.x + this.fallingBlock.blockOffsetX) / Board.cellSize;
		var y = (point.y + this.fallingBlock.blockOffsetY) / Board.cellSize;
		this._lines[y].addBlockAt(block, x);
		block.y = 0;
	}
	
	this.removeChild(this.fallingBlock);
	this.fallingBlock = null;
}

// Check for collisions
p.checkCollisions = function() {
	// get a point from all objects
	var points = [];
	var blocks = this.fallingBlock.children;
	for (var i = 0; i < blocks.length; i++) {
		var point = blocks[i].localToGlobal(this.x, this.y);
		point.x = Math.round(point.x + this.fallingBlock.blockOffsetX);
		point.y = Math.round(point.y + this.fallingBlock.blockOffsetY);
		points.push(point);
	}
	
	// test the points against all placed blocks
	for (var i = 0; i < this._lines.length; i++) {
		for (var j = 0; j < this._lines[i].children.length; j++) {
			var childPoint = this._lines[i].children[j].localToGlobal(this.x, this.y);
			for (var k = 0; k < points.length; k++) {
				if (childPoint.x === points[k].x && childPoint.y === points[k].y) {
					return true;
				}
			}
		}
	}
	
	return false;
}

cr.Board = Board;
}());