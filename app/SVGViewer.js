var React = require('react');
var Router = require('react-router');
var eventListener = require('eventlistener');
var SVGComponent = require('./SVGComponent');

var locationX = 0, locationY = 0;

var SVGViewer = React.createClass({

	getInitialState: function() {
		return {
			zoomLevel: 1,
			dragging: false,
			locX: 0,
			locY: 0,
			startX: 0,
			startY: 0
		}
	},

	onDragStart: function(e) {
		e.preventDefault();

		console.log("drag start");

		var startX = typeof e.clientX === 'undefined' ? e.changedTouches[0].clientX : e.clientX,
            startY = typeof e.clientY === 'undefined' ? e.changedTouches[0].clientY : e.clientY;

		var state = {
            dragging: true,
			startX: - this.state.locX + startX,
            startY: - this.state.locY + startY
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

		this.setState({locX: x, locY: y});

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

		this.refs.container.getDOMNode().addEventListener('wheel', this.handleScroll);
    },

	handleScroll: function(e) {
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		var zLevel = this.state.zoomLevel+delta*0.05;

		this.setState({zoomLevel: zLevel < 0.1 ? 0.1 : zLevel});
	},

	componentWillUnmount: function() {
    	this.refs.container.getDOMNode().removeEventListener('wheel', this.handleScroll);
	},

	render: function() {
		return (
			<SVGComponent height="100%" width="100%" ref="container" onMouseDown={this.onDragStart}>
				<g transform={"matrix("+this.state.zoomLevel+" 0 0 "+this.state.zoomLevel+" "+this.state.locX+" "+this.state.locY+")"}>
					<circle x="0" y="0" r="50"/>
				</g>
			</SVGComponent>);
	}

});

module.exports = SVGViewer;
