var React = require('react');
var Router = require('react-router');
var eventListener = require('eventlistener');
var SVGComponent = require('./SVGComponent');

var locationX = 0, locationY = 0;

var SVGViewer = React.createClass({

	getInitialState: function() {
        return {
            dragging: false,
			locX: 0,
			locY: 0,
			startX: 0,
			startY: 0
        };
    },

	onDragStart: function(e) {
		e.preventDefault();

		console.log("drag start");

		var startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX,
            startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

		var state = {
            dragging: true,

			locX: startX,
			locY: startY,

			startX: startX,
            startY: startY
        };

        this.setState(state);

		eventListener.add(window, 'mousemove', this.onDragMove);
        eventListener.add(window, 'touchmove', this.onDragMove);
        eventListener.add(window, 'mouseup', this.onDragStop);
        eventListener.add(window, 'touchend', this.onDragStop);
	},

	onDragMove: function(e){
		if (!this.state.dragging) {
            return;
        }

        var x = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX,
            y = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

		locationX = x;
		locationY = y;

		this.setState({locX: this.state.startX - x, locY: this.state.startY - y});

	},

	onDragStop: function(e){
		this.setState({ dragging: false });

        eventListener.remove(window, 'mousemove', this.onDragMove);
        eventListener.remove(window, 'touchmove', this.onDragMove);
        eventListener.remove(window, 'mouseup', this.onDragStop);
        eventListener.remove(window, 'touchend', this.onDragStop);
	},

	componentDidMount: function() {
        // Cached for faster lookup
        this.el = this.refs.container;

        // Old versions of React doesn't return the raw DOM node
        if (!(this.el instanceof window.Node)) {
            this.el = this.el.getDOMNode();
        }
    },

	render: function() {
		// console.log(this.state.locX, this.state.locY);
		return (
			<SVGComponent
			ref="container"
			height="100%"
			width="100%"
			onMouseDown={this.onDragStart}
			viewBox={this.state.locX+" "+this.state.locY+" 600 800"}>
				<circle x="0" y="0" r="50"/>
			</SVGComponent>);
	}

});

module.exports = SVGViewer;
