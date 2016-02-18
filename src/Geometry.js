tan = function (angle) {
    return Math.tan(angle * (Math.PI / 180));
}

sin = function (angle) {
    return Math.sin(angle * (Math.PI / 180));
}

cos = function (angle) {
    return Math.cos(angle * (Math.PI / 180));
}

function point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
    this.type = 'point';
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

    if (arguments.length == 0) {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 100;
        this.y2 = 100;
    }

    else if(arguments.length == 2) {
        if (arguments[0].type == 'point' && arguments[1].type == 'point') {
            this.x1 = arguments[0].x;
            this.x2 = arguments[0].y;

            this.x2 = arguments[1].x;
            this.y2 = arguments[1].y;
        } else {
            // show error
            return null;
        }
    }

    else if (arguments.length == 4) {
        if (typeof arguments[0] == 'number'
            && typeof arguments[1] == 'number'
            && typeof arguments[2] == 'number'
            && typeof arguments[3] == 'number') {
            console.log("working");
            this.x1 = arguments[0];
        	this.y1 = arguments[1];
        	this.x2 = arguments[2];
        	this.y2 = arguments[3];
        } else {
            // show error
            return null;
        }
    }

    else {
        // show error
        return null;
    }

	this.stroke = "black";
	this.strokeWidth= 1;
	this.type = 'line';
}
