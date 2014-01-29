(function(){

// Constants
var GRIDCELLSIZE = 30; // must be an even number

var KEYCODE_SPACE = 32;
var KEYCODE_LEFTARROW = 37;
var KEYCODE_UPARROW = 38;
var KEYCODE_RIGHTARROW = 39;
var KEYCODE_DOWNARROW = 40;
var KEYCODE_X = 88;
var KEYCODE_Z = 90;

// Board Class
var Board = function() {
	this.initialize();
};
Board.prototype = Object.create(createjs.Container.prototype);

// End Board Class

// Line Class
var Line = function() {
	this.initialize();
};
Line.prototype = Object.create(createjs.Container.prototype);

// End Line Class


// CandyBlock Class
var CandyBlock = function(positions) {
	this.initialize(positions);
};
CandyBlock.prototype = Object.create(createjs.Container.prototype);

// Override init function
CandyBlock.prototype.Container_initialize = CandyBlock.prototype.initialize;
CandyBlock.prototype.initialize = function(positions) {
	this.Container_initialize();
	
	// Create the block-parts at the specified positions
	for (var i = 0; i < positions.length; i+=2) {
		var block = new createjs.Shape();
		block.graphics.beginFill("#AA0000").drawRect(0, 0, GRIDCELLSIZE, GRIDCELLSIZE); // Placeholder
		block.setBounds(0, 0, GRIDCELLSIZE, GRIDCELLSIZE);
		block.x = positions[i] * GRIDCELLSIZE;
		block.y = positions[i+1] * GRIDCELLSIZE;
		this.addChild(block);
		
		// Set point of origin at the center of the first block-part
		if (i == 0) {
			this.x = this.regX = block.x + GRIDCELLSIZE / 2;
			this.y = this.regY = block.y + GRIDCELLSIZE / 2;
		}
	}
	
	this.bounds = this.getTransformedBounds().clone();
};



// Set the position of the candyblock
CandyBlock.prototype.setPos = function(x, y) {
	this.x = x + this.regX;
	this.y = y + this.regY;
	this.bounds.x = x;
	this.bounds.y = y;
};

// Move the candyblock
CandyBlock.prototype.move = function(dx, dy) {
	this.x += dx;
	this.y += dy;
	this.bounds.x += dx;
	this.bounds.y += dy;
};

// Rotate the candyblock
CandyBlock.prototype.rotate = function(clockwise) {
	var rotation = this.rotation;
	var bounds = this.bounds;
	
	this.rotation = (clockwise) ? this.rotation + 90 : this.rotation - 90;
	this.bounds = this.getTransformedBounds().clone();
	this.bounds.x = Math.round(this.bounds.x);
	this.bounds.y = Math.round(this.bounds.y);
	this.bounds.width = Math.round(this.bounds.width);
	this.bounds.height = Math.round(this.bounds.height);
	
	// If rotating made the block go outside the borders undo the rotating
	// TODO: check for collision and prevent rotating in those cases
	if (this.bounds.x < 0 || this.bounds.x + this.bounds.width > 10 * GRIDCELLSIZE ||
		this.bounds.y + this.bounds.height > 20 * GRIDCELLSIZE) {
		this.rotation = rotation;
		this.bounds = bounds;
	}
	
};
// End CandyBlock Class

// IBlock Class
var IBlock = function() {
	this.initialize([0, 1, 0, 0, 0, 2, 0, 3]);
};
IBlock.prototype = Object.create(CandyBlock.prototype);
// End IBlock Class

// JBlock Class
var JBlock = function() {
	this.initialize([1, 1, 1, 0, 0, 2, 1, 2]);
};
JBlock.prototype = Object.create(CandyBlock.prototype);
// End JBlock Class

// LBlock Class
var LBlock = function() {
	this.initialize([0, 1, 0, 0, 0, 2, 1, 2]);
};
LBlock.prototype = Object.create(CandyBlock.prototype);
// End LBlock Class

// OBlock Class
var OBlock = function() {
	this.initialize([0, 0, 0, 1, 1, 0, 1, 1]);
};
OBlock.prototype = Object.create(CandyBlock.prototype);

// Overwrite initialize to set different point of origin
OBlock.prototype.CandyBlock_initialize = OBlock.prototype.initialize;
OBlock.prototype.initialize = function(positions) {
	this.CandyBlock_initialize(positions);
	
	this.x = this.regX = GRIDCELLSIZE;
	this.y = this.regY = GRIDCELLSIZE;
};
// End OBlock Class

// SBlock Class
var SBlock = function() {
	this.initialize([1, 0, 0, 0, 1, 1, 2, 1]);
};
SBlock.prototype = Object.create(CandyBlock.prototype);
// End SBlock Class

// TBlock Class
var TBlock = function() {
	this.initialize([1, 0, 0, 1, 1, 1, 2, 1]);
};
TBlock.prototype = Object.create(CandyBlock.prototype);
// End TBlock Class

// ZBlock Class
var ZBlock = function() {
	this.initialize([1, 0, 2, 0, 0, 1, 1, 1]);
};
ZBlock.prototype = Object.create(CandyBlock.prototype);
// End ZBlock Class

// Variables
var stage;
var activeBlock;

// Initialization
$(document).ready(function() {
	stage = new createjs.Stage("CandyRainCanvas");
	
	// TODO: random block generation
	activeBlock = new IBlock();
	activeBlock.setPos(90, 90);
	
	console.log(activeBlock); // test purposes
	
	stage.addChild(activeBlock);
	
    createjs.Ticker.addEventListener("tick", update);
	createjs.Ticker.setFPS(25);
	
	$(document).keydown(handleInput);
});

// Handle input
var handleInput = function(event) {
	switch(event.which) {
		case KEYCODE_LEFTARROW:
			if (activeBlock.bounds.x > 0) {
				activeBlock.move(-GRIDCELLSIZE, 0);
			}
			break;
		case KEYCODE_RIGHTARROW:
			if (activeBlock.bounds.x + activeBlock.bounds.width < GRIDCELLSIZE * 10) {
				activeBlock.move(GRIDCELLSIZE, 0);
			}
			break;
		case KEYCODE_DOWNARROW:
			moveDown();
			break;
		case KEYCODE_SPACE:
			// TODO: Hard drop
			break;
		case KEYCODE_UPARROW:
		case KEYCODE_X:
			activeBlock.rotate(true);
			break;
		case KEYCODE_Z:
			activeBlock.rotate(false);
			break;
	}
};

// Update function
var update = function(event) {
	stage.update();
};

// Move the active block down
var moveDown = function() {
	// Check for the bottom
	if (activeBlock.bounds.y + activeBlock.bounds.height < GRIDCELLSIZE * 20) {
		activeBlock.move(0, GRIDCELLSIZE);
		
		// TODO: collision check
	} else {
		// TODO: process the block
	}
};

}());