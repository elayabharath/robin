var React = require('react');
var ReactDOM = require('react-dom');
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
			zoomLevel: 1,
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
		rect = ReactDOM.findDOMNode(this.refs.container).getClientRects()[0];
		rectCenX = rect.left + rect.width / 2;
		rectCenY = rect.top + rect.height / 2;
		last = [rect.width / 2, rect.height /2];
		this.setState({locX: last[0], locY: last[1]});
		ReactDOM.findDOMNode(this.refs.container).addEventListener('wheel', this.handleScroll);
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

		if(zLevel > 0.1 && zLevel < 100) {
			this.setState({
				zoomLevel: zLevel,
				locX: this.state.locX + panX,
				locY: this.state.locY + panY
			});
		}
	},

	componentWillUnmount: function() {
		ReactDOM.findDOMNode(this.refs.container).removeEventListener('wheel', this.handleScroll);
	},

	render: function() {

		objects = this.state.data.renderObjects.map(function(item, index){
			switch (item.constructor.name) {
				case "circle":
					return <circle
						cx={item.x}
						cy={item.y}
						r={item.r}
						fill={item.fill}
						stroke={item.stroke}
						opacity={item.opacity}
						key={index}/>
					break;
				case "line":
					return <line
						x1={item.x1}
						y1={item.y1}
						x2={item.x2}
						y2={item.y2}
						stroke={item.stroke}
						strokeWidth={item.strokeWidth}
						opacity={item.opacity}
						key={index}/>
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
				onMouseMove={this.handleMouseMove}
				zoomLevel={this.state.zoomLevel}
				locX={this.state.locX}
				locY={this.state.locY}>
				{objects}
			</SVGComponent>);

		return null;
	}

});

module.exports = SVGViewer;
