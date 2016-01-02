var React = require('react');
var Router = require('react-router');
var eventListener = require('eventlistener');
var SVGComponent = require('./SVGComponent');

var isDown = false; // whether mouse is pressed
var startCoords = []; // 'grab' coordinates when pressing mouse
var last = [0, 0]; // previous coordinates of mouse release

var SVGViewer = React.createClass({

	getInitialState: function() {
		return {
			zoomLevel: 1,
			dragging: false,
			locX: 0,
			locY: 0
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
		this.refs.container.getDOMNode().addEventListener('wheel', this.handleScroll);
    },

	handleScroll: function(e) {
		var rect = this.refs.container.getDOMNode().getClientRects()[0];
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		var zLevel = this.state.zoomLevel+delta*0.05;

		var rectCenX = rect.left + rect.width / 2;
		var rectCenY = rect.top + rect.height / 2;

		var mousePosX = e.clientX;
		var mousePosY = e.clientY;

		var panX = (rectCenX - mousePosX) * 0.01 * delta;
		var panY = (rectCenY - mousePosY) * 0.01 * delta;

		if(zLevel > 0.1) {
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
		return (
			<SVGComponent
				height="100%"
				width="100%"
				ref="container"
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
				onMouseMove={this.handleMouseMove}>
				<g transform={"matrix("+this.state.zoomLevel+" 0 0 "+this.state.zoomLevel+" "+this.state.locX+" "+this.state.locY+")"}>
					<circle x="0" y="0" r="50"/>
				</g>
			</SVGComponent>);
	}

});

module.exports = SVGViewer;
