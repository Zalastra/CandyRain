

(function(){

// Constants

var KEYCODE_SPACE = 32;
var KEYCODE_LEFTARROW = 37;
var KEYCODE_UPARROW = 38;
var KEYCODE_RIGHTARROW = 39;
var KEYCODE_DOWNARROW = 40;
var KEYCODE_X = 88;
var KEYCODE_Z = 90;

// Variables
var stage;
var board;
var nextBlock;

// Initialization
$(document).ready(function() {
	stage = new createjs.Stage("CandyRainCanvas");
	board = new cr.Board();

	
	//block = new cr.IBlock();
	setNextBlock();
	board.setFallingBlock(nextBlock);
	board.fallingBlock.setPos(90, 90);
	setNextBlock();
	
	stage.addChild(board);
	
    createjs.Ticker.addEventListener("tick", update);
	createjs.Ticker.setFPS(25);
	
	$(document).keydown(handleInput);
});

// Handle input
var handleInput = function(event) {
	switch(event.which) {
		case KEYCODE_LEFTARROW:
			moveLeft();
			break;
		case KEYCODE_RIGHTARROW:
			moveRight();
			break;
		case KEYCODE_DOWNARROW:
			moveDown();
			break;
		case KEYCODE_SPACE:
			// TODO: Hard drop
			board.placeFallingBlock(); // testing purposes
			break;
		case KEYCODE_UPARROW:
		case KEYCODE_X:
			rotate(true);
			break;
		case KEYCODE_Z:
			rotate(false);
			break;
	}
};

// Update function
var update = function(event) {
	stage.update();
};

// Randomize next block;
var setNextBlock = function() {
	var blockType = Math.round(Math.random() * 7);
	console.log(blockType);
	switch(blockType){
		case 0:
			nextBlock = new cr.IBlock();
			break;
		case 1:
			nextBlock = new cr.JBlock(); 
			break;
		case 2:	
			nextBlock = new cr.SBlock(); 
			break;
		case 3:	
			nextBlock = new cr.ZBlock(); 
			break;
		case 4:	
			nextBlock = new cr.OBlock(); 
			break;			
		case 5:	
			nextBlock = new cr.LBlock(); 
			break;
		case 6:	
			nextBlock = new cr.TBlock(); 
			break;	
		}	
}

// Move the falling block down
var moveDown = function() {
	// Check for the bottom
	if (board.fallingBlock.bounds.y + board.fallingBlock.bounds.height < cr.Board.cellSize * 20) {
		board.fallingBlock.move(0, cr.Board.cellSize);
		
		// if no collision exit function
		if (!board.checkCollisions()) {
			return
		}
		
		// if collided move back
		board.fallingBlock.move(0, -cr.Board.cellSize);
	}
	
	// hit ground or other blocks so place the falling block and set the next one to fall
	board.placeFallingBlock();
	board.setFallingBlock(nextBlock);
	setNextBlock();
};

// Move the falling block to the left
var moveLeft = function() {
	// If not on the edge
	if (board.fallingBlock.bounds.x > 0) {
		board.fallingBlock.move(-cr.Board.cellSize, 0);
		
		// if colliding after move undo
		if (board.checkCollisions()) {
			board.fallingBlock.move(cr.Board.cellSize, 0);
		}
	}
};

// Move the falling block to the right
var moveRight = function() {
	// If not on the edge
	if (board.fallingBlock.bounds.x + board.fallingBlock.bounds.width < cr.Board.cellSize * 10) {
		board.fallingBlock.move(cr.Board.cellSize, 0);
		
		// if colliding after move undo
		if (board.checkCollisions()) {
			board.fallingBlock.move(-cr.Board.cellSize, 0);
		}
	}
};

// Rotate the falling block
var rotate = function(clockwise) {
	board.fallingBlock.rotate(clockwise);
	if (board.checkCollisions()) {
		board.fallingBlock.rotate(!clockwise);
	}
}
}());