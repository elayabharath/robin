for(var i = 5; i < 100; i=i+10)
  for(var j = 5; j < 100; j=j+10) {
  var myPoint = Point.Create(i*10, j*10);
  var myCircle = Circle.Create(myPoint, Math.random()*20);
}
