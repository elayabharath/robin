var React = require('react');
var validUrl = require('valid-url');
var Router = require('react-router');
var Link = require('react-router').Link;

var SVGStore = require('./SVGStore');

var SVGComponent = React.createClass({

	render: function() {

		// if(this.refs.mainsvg)
		// 	SVGStore.updateSVG(this.refs.mainsvg.getDOMNode());

		return <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1" ref="mainsvg" {...this.props}>
		  <defs>
			<pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
			  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="lightgray" strokeWidth="0.5"/>
			</pattern>
			<pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
			  <rect width="100" height="100" fill="url(#smallGrid)"/>
			  <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#bbb" strokeWidth="1"/>
			</pattern>
		  </defs>
		  {this.props.children}
		</svg>;
	}

});

module.exports = SVGComponent;
