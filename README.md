## Get started

### Development
Pull code
run 'npm install'
run 'NODE_ENV=development gulp'
localhost:8889

### Deploy
run 'NODE_ENV=production gulp deloy'

## V0 shapes

### Common functions for all shapes
scale ()
scaleabout ()
move ()
rotate ()
rotateabout ()
shear ()
reflect .. about x, y, or any line ()
Get points on curve at equal distance ()

Common properties

color
stroke
stroke width
opacity
stroke opacity
fill opacity
stroke dash array
visibility ?

### Shapes
#### rectangle
    props: len, wid, top left, top right, bottom left, bottom right, centroid, rotation wrt x axis / y axis, corner rad, area, perimeter
  
   creators:
	(x1, y1, x2, y2, [corner-rad])
	start pt, end pt, rad
	pt, len, wid, rad
	
	methods:
	round() // round corners
	
#### circle
    rad, center, x, y, area, perimeter
	(x, y, r)

#### ellipse
    x, y, rx, ry, area, perimeter, loci, rotation wrt x axis / y axis
	(cx, cy, rx, ry)

#### Line
    start pt, end pt, start x, start y, end x, end y, length, angle wrt to x axis / y axis, 
	(x1, y1, x2, y2)
	(start pt, end pt)
	(start pt, length, angle)
	
#### polyline
    points, length, number of segments, regression line, start point, end point, angles wrt x-axis / y-axis
	(points)
	([x1, y1, x2, y2, ...])
	 
#### polygon
    points, number of sides, area, self intersecting?
	(points)
	(number of sides, radius)
	
#### square, star, hexagon, octagon, triangle, pentagon
   to be filled

#### point
    x, y, distance from origin, angle wrt to x axis / y axis
	(x, y)

#### Bezier curve
  to be filled
