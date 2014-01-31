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

// Initialization
$(document).ready(function() {
	stage = new createjs.Stage("CandyRainCanvas");
	board = new cr.Board();
	
	block = new cr.TBlock();
	block.setPos(90, 90);
	board.setFallingBlock(block);
	
	stage.addChild(board);
	
    createjs.Ticker.addEventListener("tick", update);
	createjs.Ticker.setFPS(25);
	
	$(document).keydown(handleInput);
});

// Handle input
var handleInput = function(event) {
	switch(event.which) {
		case KEYCODE_LEFTARROW:
			if (board.fallingBlock.bounds.x > 0) {
				board.fallingBlock.move(-cr.Board.cellSize, 0);
			}
			break;
		case KEYCODE_RIGHTARROW:
			if (board.fallingBlock.bounds.x + board.fallingBlock.bounds.width < cr.Board.cellSize * 10) {
				board.fallingBlock.move(cr.Board.cellSize, 0);
			}
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
			board.fallingBlock.rotate(true);
			break;
		case KEYCODE_Z:
			board.fallingBlock.rotate(false);
			break;
	}
};

// Update function
var update = function(event) {
	stage.update();
};

// Randomize next block;
var setNextBlock = function() {
	nextBlock = new cr.TBlock(); // TODO: randomize
}

// Move the active block down
var moveDown = function() {
	// Check for the bottom
	if (board.fallingBlock.bounds.y + board.fallingBlock.bounds.height < cr.Board.cellSize * 20) {
		board.fallingBlock.move(0, cr.Board.cellSize);
		
		// TODO: collision check
	} else {
		board.placeFallingBlock();
		board.setFallingBlock(nextBlock);
		setNextBlock();
	}
};

}());