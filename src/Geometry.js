sin = function (angle) {
    return Math.sin(angle * (Math.PI / 180));
}

cos = function (angle) {
    return Math.cos(angle * (Math.PI / 180));
}

function circle(x, y, r) {
    this.x = x || 0;
	this.y = y || 0;
	this.r = r || 100;
	this.color = "none";
	this.stroke = "black";
	this.opacity = 1;
	this.type = 'circle';

    this.scale = function(xTimes) {
		xTimes = xTimes || 1;
		this.r = this.r * xTimes;
	}
}

function line(x1, y1, x2, y2) {
	this.x1 = x1 || 0;
	this.y1 = y1 || 0;
	this.x2 = x2 || 10;
	this.y2 = y2 || 10;

	this.stroke = "black";
	this.strokeWidth= "1";
	this.opacity = 1;
	this.type = 'line';
}
