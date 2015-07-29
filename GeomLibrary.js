var Point = {
  X: 0,
  Y: 0,
  Create: function(X, Y) {
    this.X = X;
    this.Y = Y;
    this.Draw();
    return this;
  },
  Draw: function() {
    canvas.beginPath();
    canvas.arc(this.X, this.Y, 1, 0, 2 * Math.PI);
    canvas.strokeStyle = "#000000";
    canvas.stroke();
  }
};

var Circle = {
  Center : Point.Create(0, 0),
  Radius : 0,
  Create : function(center, radius) {
    this.Center = center;
    this.Radius = radius;
    this.Draw();
    return this;
  },

  Draw : function() {
    canvas.beginPath();
    canvas.arc(this.Center.X,this.Center.Y,this.Radius,0,2 * Math.PI);
    canvas.fillStyle = "#FF0000";
    canvas.fill();
  }
};
