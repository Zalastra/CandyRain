this.cr = this.cr || {};

(function() {

var Board = function() {
	this.initialize();
};
var p = Board.prototype = Object.create(createjs.Container.prototype);

// static properties
Board.cellSize = 30; // Must be an even number
Board.blockImages = new Image();
Board.blockImages.src = 'images/candy_blocks.png';

// public properties
p.fallingBlock = null;

// private properties
p._lines;

// constructor
p.Container_initialize = p.initialize;

p.initialize = function() {
	this.Container_initialize();
	
	this._lines = [];
	
	var background = new createjs.Shape();
	background.graphics.beginLinearGradientFill(["#4DEAFF", "#82A4A8"], [0, 1], 0, 300, 0, 120).drawRect(0, 0, 300, 600);
	this.addChild(background);
	
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
	nextBlock.setPos(4 * Board.cellSize, 0);
	return !this.checkCollisions();
}

// Put the blocks on the board.
p.placeFallingBlock = function() {
	var blocks = this.fallingBlock.children;
	while (blocks.length > 0) {
		var block = blocks.pop();
		var point = block.localToGlobal(this.x, this.y);
		var x = Math.round(point.x + this.fallingBlock.blockOffsetX) / Board.cellSize;
		var y = Math.round(point.y + this.fallingBlock.blockOffsetY) / Board.cellSize;
		if (x < 0 || y < 0) {
			return false;
		}
		this._lines[y].addBlockAt(block, x);
		block.y = cr.Board.cellSize / 2;
		block.rotation = this.fallingBlock.rotation;
		block.regX = cr.Board.cellSize / 2;
		block.regY = cr.Board.cellSize / 2;
	}
	
	this.removeChild(this.fallingBlock);
	this.fallingBlock = null;
	return true;
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
			var offsetX = 0;
			var offsetY = 0;
			switch (this._lines[i].children[j].rotation) {
				case 90:
					offsetX = -cr.Board.cellSize;
					break;
				case 180:
					offsetX = -cr.Board.cellSize;
					offsetY = -cr.Board.cellSize;
					break;
				case 270:
					offsetY = -cr.Board.cellSize;
					break;
			}
			childPoint.x = Math.round(childPoint.x + offsetX);
			childPoint.y = Math.round(childPoint.y + offsetY);
			for (var k = 0; k < points.length; k++) {
				if (childPoint.x === points[k].x && childPoint.y === points[k].y) {
					return true;
				}
			}
		}
	}
	
	return false;
}

// Check if lines are filled with blocks, return number of lines completed
p.checkLines = function() {
	var deletedLines = [];
	var isDeleted = function(index) {
		for (var i = 0; i < deletedLines.length; i++) {
			if (deletedLines[i] === index) {
				return true;
			}
		}
		return false;
	};
	
	for (var i = 0; i < this._lines.length; i++) {
		if (this._lines[i].isFilled()) {
			this.removeChild(this._lines[i]);
			deletedLines.push(i);
		}
	}
	
	var linesToMove = deletedLines.length;
	if (linesToMove > 0) {
		var tempLines = [];
		for (var i = 0; i < linesToMove; i++) {
			var line = new cr.Line();
			line.y = i * Board.cellSize;
			this.addChild(line);
			tempLines.push(line);
		}
		for (var i = 0; i < this._lines.length; i++) {
			if ($.inArray(i, deletedLines) === -1) {
				this._lines[i].y += linesToMove * Board.cellSize;
				tempLines[i+linesToMove] = this._lines[i];
			} else {
				linesToMove--;
			}
		}
		this._lines = tempLines;
	}
	
	return deletedLines.length;
}

cr.Board = Board;
}());