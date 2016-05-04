var React = require('react');
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
			<pattern id="axis" width="1000" height="1000" patternUnits="userSpaceOnUse">
  			  	<path d="M 1000 0 L 0 0 0 1000" fill="none" stroke="#777" strokeWidth="1"/>
  			</pattern>
		  </defs>
		  <g transform={"matrix("+this.props.zoomLevel+" 0 0 "+this.props.zoomLevel+" "+this.props.locX+" "+this.props.locY+")"}>
			  <g>
					<rect fill="url(#smallGrid)" x="-1000" y="-1000" width="2001" height="2001"/>
					<rect fill="url(#grid)" x="-1000" y="-1000" width="2001" height="2001"/>
					<rect fill="url(#axis)" x="-1000" y="-1000" width="2001" height="2001"/>
			  </g>
			  <g>
					{this.props.children}
			  </g>
		  </g>
		</svg>;
	}

});

module.exports = SVGComponent;
