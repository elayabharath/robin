var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var VariableStore = require('./VariableStore');
var eventListener = require('eventlistener');
var SVGComponent = require('./SVGComponent');

var isDown = false; // whether mouse is pressed
var startCoords = []; // 'grab' coordinates when pressing mouse
var last = [0, 0]; // previous coordinates of mouse release
var rect=null, rectCenX=null, rectCenY=null;
var objects = {};

var SVGViewer = React.createClass({

	mixins: [Reflux.connect(VariableStore,"data")],

	getInitialState: function() {
		return {
			zoomLevel: 2,
			locX: 0,
			locY: 0,
			rectW: 0,
			rectH: 0
		}
	},

	handleMouseDown: function(e) {
		e.preventDefault();
		isDown = true;

	    startCoords = [
	        e.clientX,
	        e.clientY
		];
	},

	handleMouseMove: function(e){
		e.preventDefault();
		if(!isDown) return; // don't pan if mouse is not pressed

		var x = e.clientX;
	    var y = e.clientY;

		var mouseMovedDistX = x - startCoords[0];
		var mouseMovedDistY = y - startCoords[1];

		this.setState({locX: last[0] + mouseMovedDistX, locY: last[1] + mouseMovedDistY});
	},

	handleMouseUp: function(e){
		e.preventDefault();
		isDown = false;

		last = [
			this.state.locX, this.state.locY
	    ];
	},

	componentDidMount: function() {
        this.el = this.refs.container;
		rect = this.refs.container.getDOMNode().getClientRects()[0];
		rectCenX = rect.left + rect.width / 2;
		rectCenY = rect.top + rect.height / 2;
		last = [rect.width / 2, rect.height /2];
		this.setState({locX: last[0], locY: last[1]});
		this.refs.container.getDOMNode().addEventListener('wheel', this.handleScroll);
    },

	handleScroll: function(e) {
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		var zLevel = this.state.zoomLevel < 1 ?
			this.state.zoomLevel + delta * 0.01
			: this.state.zoomLevel + delta * 0.05;

		var mousePosX = e.clientX;
		var mousePosY = e.clientY;

		var panX = (rectCenX - mousePosX) * 0.01 * delta;
		var panY = (rectCenY - mousePosY) * 0.01 * delta;

		if(zLevel > 0.1 && zLevel < 8) {
			this.setState({
				zoomLevel: zLevel,
				locX: this.state.locX + panX,
				locY: this.state.locY + panY
			});
		}
	},

	componentWillUnmount: function() {
    	this.refs.container.getDOMNode().removeEventListener('wheel', this.handleScroll);
	},

	render: function() {

		objects = this.state.data.renderObjects.map(function(item, index){
			switch (item.type) {
				case "circle":
					return <circle cx={item.x} cy={item.y} r={item.r} fill={item.fill} stroke={item.stroke} m={10} key={index}/>
					break;
				default:
					break;
			}
		});

		return (
			<SVGComponent
				height="100%"
				width="100%"
				ref="container"
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onMouseMove={this.handleMouseMove}>
				<g transform={"matrix("+this.state.zoomLevel+" 0 0 "+this.state.zoomLevel+" "+this.state.locX+" "+this.state.locY+")"}>
					<rect fill="url(#smallGrid)" x="-1000" y="-1000" width="2001" height="2001"/>
		  		  	<rect fill="url(#grid)" x="-1000" y="-1000" width="2001" height="2001"/>
					<g>
						{objects}
					</g>
				</g>
			</SVGComponent>);

		return null;
	}

});

module.exports = SVGViewer;
