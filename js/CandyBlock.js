this.cr = this.cr || {};

(function() {

var CandyBlock = function(positions) {
	this.initialize(positions);
};
var p = CandyBlock.prototype = Object.create(createjs.Container.prototype);

// public properties
p.bounds;

p.blockOffsetX = 0;

p.blockOffsetY = 0;

// Constructor
p.Container_initialize = p.initialize;
p.initialize = function(positions) {
	this.Container_initialize();
	
	// Create the block-parts at the specified positions
	for (var i = 0; i < positions.length; i++) {
		// TODO: change to image
		var block = positions[i].image;
		block.setBounds(0, 0, cr.Board.cellSize, cr.Board.cellSize);
		block.x = positions[i].x * cr.Board.cellSize;
		block.y = positions[i].y * cr.Board.cellSize;
		this.addChild(block);
		
		// Set point of origin at the center of the first block-part
		if (i == 0) {
			this.x = this.regX = block.x + cr.Board.cellSize / 2;
			this.y = this.regY = block.y + cr.Board.cellSize / 2;
		}
	}
	
	this.bounds = this.getTransformedBounds().clone();
};

// public methods

// Set the position of the candyblock
p.setPos = function(x, y) {
	this.x = x + this.regX;
	this.y = y + this.regY;
	this.bounds.x = x;
	this.bounds.y = y;
};

// Move the candyblock
p.move = function(dx, dy) {
	this.x += dx;
	this.y += dy;
	this.bounds.x += dx;
	this.bounds.y += dy;
};

// Rotate the candyblock
p.rotate = function(clockwise) {
	var rotation = this.rotation;
	var bounds = this.bounds;
	
	this.rotation = Math.abs((clockwise ? this.rotation + 90 : this.rotation - 90) % 360);
	
	// get rid of the mess caused by rotation + floating point numbers
	this.bounds = this.getTransformedBounds().clone();
	this.bounds.x = Math.round(this.bounds.x);
	this.bounds.y = Math.round(this.bounds.y);
	this.bounds.width = Math.round(this.bounds.width);
	this.bounds.height = Math.round(this.bounds.height);
	
	// set per squareblock offset values for x and y based on the rotation
	switch (this.rotation) {
		case 0:
			this.blockOffsetX = 0;
			this.blockOffsetY = 0;
			break;
		case 90:
			this.blockOffsetX = -cr.Board.cellSize;
			this.blockOffsetY = 0;
			break;
		case 180:
			this.blockOffsetX = -cr.Board.cellSize;
			this.blockOffsetY = -cr.Board.cellSize;
			break;
		case 270:
			this.blockOffsetX = 0;
			this.blockOffsetY = -cr.Board.cellSize;
			break;
	}
	
	// If rotating made the block go outside the borders undo the rotating
	if (this.bounds.x < 0 || this.bounds.x + this.bounds.width > 10 * cr.Board.cellSize ||
		this.bounds.y + this.bounds.height > 20 * cr.Board.cellSize) {
		this.rotation = rotation;
		this.bounds = bounds;
	}
};

cr.CandyBlock = CandyBlock;
}());