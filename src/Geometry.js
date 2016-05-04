function Geometry() {
    this.fill = "none";
    this.fillOpacity = 1;
    this.stroke = "#37474F";
    this.strokeWidth = 1;
    this.strokeOpacity = 1;
    this.opacity = 1;
    this.visible = true;
}

function point(x, y) {
    this.x = x || 0;
	this.y = y || 0;
}

function circle(x, y, r) {
    this.x = x || 0;
	this.y = y || 0;
	this.r = r || 100;
    Geometry.call(this);
}
