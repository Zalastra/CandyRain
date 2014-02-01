this.cr = this.cr || {};

(function() {

var Line = function() {
	this.initialize();
};
var p = Line.prototype = Object.create(createjs.Container.prototype);

p.Container_initialize = p.initialize;

p.initialize = function() {
	this.Container_initialize();
	
	this.cells = new Array(10);
};

p.addBlockAt = function(block, index) {
	this.cells[index] = block;
	this.addChild(block);
	block.x = index * cr.Board.cellSize + cr.Board.cellSize/2;
};

p.isFilled = function() {
	for (var i = 0; i < 10; i++) {
		if (!this.cells[i]) return false;
	}
	return true;
};

cr.Line = Line;
}());