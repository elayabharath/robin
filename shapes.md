#### Common functions for all shapes

* scale ()
* scaleabout ()
* move ()
* rotate ()
* rotateabout ()
* shear ()
* reflect .. about x, y, or any line ()
* Get points on curve at equal distance ()

#### Common properties

* color
* stroke
* stroke width
* opacity
* stroke opacity
* fill opacity
* stroke dash array
* visibility ?

#### Shapes

##### Rectangle

* Properties
   - len, wid, top left, top right, bottom left, bottom right, centroid, rotation wrt x axis / y axis, corner rad, area, perimeter
  
* creators:
	- (x1, y1, x2, y2, [corner-rad])
	- start pt, end pt, rad
	- pt, len, wid, rad
	
* methods:
	- round() // round corners
	
##### Circle
* Properties
   - rad, center, x, y, area, perimeter
   
* creators: 
	- (x, y, r)
	
* methods:


##### Ellipse
* Properties
    - x, y, rx, ry, area, perimeter, loci, rotation wrt x axis / y axis
   
* creators: 
	- (cx, cy, rx, ry)
	
* methods:

	

##### Line
* Properties
    - start pt, end pt, start x, start y, end x, end y, length, angle wrt to x axis / y axis,
   
* creators: 
	- (x1, y1, x2, y2)
	- (start pt, end pt)
	- (start pt, length, angle)
	
* methods:
     
	
##### Polyline
* Properties
    - points, length, number of segments, regression line, start point, end point, angles wrt x-axis / y-axis
   
* creators: 
	* 	(points)
	* 	([x1, y1, x2, y2, ...])
	
* methods:

   	 
##### Polygon
* Properties
	* points, number of sides, area, self intersecting?
   
* creators: 
	* 	(points)
	* 	(number of sides, radius)
	
* methods:


	
##### Square, star, hexagon, octagon, triangle, pentagon

[To be filled ]

* Properties
    
* creators: 
	
* methods:



##### Point
* Properties
    *    x, y, distance from origin, angle wrt to x axis / y axis
   
* creators: 
	* 	(x, y)

* methods:



##### Bezier curve
* Properties
    - points, length, number of segments, regression line, start point, end point, angles wrt x-axis / y-axis
   
* creators: 
	* 	(points)
	* 	([x1, y1, x2, y2, ...])
	
* methods:
