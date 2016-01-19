## Robin

Robin is a tool for designers to easily create svg images programmatically. It has a simple, easy to use api and an edit to view and export the image.

### Usage
* This should contain the api of functions that can be used to draw in Robin

### Changes

**0.1.0**
	- Structure, basic shapes


### ROADMAP

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




### Development
* Clone the repo
* Run `npm install`
* Read more about how it works at: [React JS workflow, part 2](http://christianalfoni.github.io/javascript/2014/10/30/react-js-workflow-part2.html)
* Run `NODE_ENV=development gulp`
* Go to `localhost:8889` to display the app
* Go to `localhost:8889/testrunner.html` to see your tests
* Any changes to `app` or `styles` folder will automatically rebuild to `build` folder
* Both tests and application changes will refresh automatically in the browser
* Run `gulp test` to run all tests with phantomJS and produce XML reports

### Minify the code, ready for production
* Run `NODE_ENV=production gulp deploy`

### Directory
* **build/**: Where your automatically builds to. This is where you launch your app in development
* **dist/**: Where the deployed code exists, ready for production
* **styles/**: Where you put your css files
* **specs/**: Where you put your test files
* **gulpfile**: Gulp configuration
