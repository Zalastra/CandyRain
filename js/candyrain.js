

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
var blockStage; 
var pointStage;
var blockSpeed;
var score = 0;
var level;
var points;
var levelText;
var eventWhich=0;

// Initialization
$(document).ready(function() {
	stage = new createjs.Stage("CandyRainCanvas");
	
	board = new cr.Board();
	
	createBlockStage();
	createPointStage();
	
	blockSpeed = 24;
	level = 1;
	setNextBlock();
	board.setFallingBlock(nextBlock);
	setNextBlock();

	stage.addChild(board);
	createjs.Ticker.init();
    createjs.Ticker.addEventListener("tick", update);
	createjs.Ticker.setFPS(25);
	
	$(document).keydown(handleInput);
});
// create blockStage
// nextBlock is found in setNextBlock and directly placed in the container.
var createBlockStage = function(){
	blockStage = new createjs.Container();
	blockStage.x = 300;
	blockStage.y = 200;
	var background = new createjs.Shape();
	background.graphics.beginFill("#FFDE4D").drawRect(0, 0, 150, 140);
	blockStage.addChild(background);
	
	var text = new createjs.Text("Next Candy", "20px Arial", "#ff7700");
	blockStage.addChild(text);
	stage.addChild(blockStage);
};
// create pointStage
var createPointStage = function() {
	pointStage = new createjs.Container();
	pointStage.x = 300;
	pointStage.y = 400;
	var background = new createjs.Shape();
	background.graphics.beginFill("#FFDE4D").drawRect(0, 0, 150, 140);
	pointStage.addChild(background);
	var text = new createjs.Text("Points", "20px Times New Roman", "#ff7700");
	points = new createjs.Text("0", "20px Times New Roman", "#ff7700");
	points.y = 30;
	pointStage.addChild(points);
	pointStage.addChild(text);
	
	//level:
	var ltext = new createjs.Text("Level", "20px Times New Roman", "#ff7700");
	ltext.y = 60;
	levelText = new createjs.Text("1", "20px Times New Roman", "#ff7700");
	levelText.y = 90;
	pointStage.addChild(levelText);
	pointStage.addChild(ltext);
	
	stage.addChild(pointStage);
}


// Handle input
var handleInput = function(event) {
	eventWhich = event.which;
};

// Update function
var update = function(event) {
	if(createjs.Ticker.getTicks() % blockSpeed == 0){
		moveDown();
	}
	switch(eventWhich) {
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
	eventWhich = 0;
	stage.update();
};

// Randomize next block;
var setNextBlock = function() {
	var blockType = Math.floor(Math.random() * 7);
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
			nextBlock.setPos(10,20);
			blockStage.addChild(nextBlock);


}

// Move the falling block down
var moveDown = function() {
	// Check for the bottom
	if (board.fallingBlock.bounds.y + board.fallingBlock.bounds.height < cr.Board.cellSize * 20) {
		board.fallingBlock.move(0, cr.Board.cellSize);
		
		// if no collision exit function
		if (!board.checkCollisions()) {
			return;
		}
		
		// if collided move back
		board.fallingBlock.move(0, -cr.Board.cellSize);
		
	}	
		
	// hit ground or other blocks so place the falling block and set the next one to fall
	board.placeFallingBlock();
	//score += board.checkLines();
	switch(board.checkLines()){
		case 1:
			score += 40;
			break;
		case 2:
			score += 100;
			break;
		case 3:
			score += 300;
			break;
		case 4: 
			score += 1200;
			break;
	}
	if(score > (5000 * level)) {
		level++;
		levelText.text = level;
		blockSpeed = Math.floor(Math.max((blockSpeed - (blockSpeed/12)), 8));
		console.log(blockSpeed);
	}
	
	board.setFallingBlock(nextBlock);
	setNextBlock();
	points.text = "" + score;

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