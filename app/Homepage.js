var React = require('react');
var validUrl = require('valid-url');
var Router = require('react-router');
var Link = require('react-router').Link;
var Navigation = require('./Navigation');
var SVGComponent = require('./SVGComponent');
var Codeeditor = require('./Codeeditor');
var SVGViewer = require('./SVGViewer');

var Homepage = React.createClass({

	getInitialState: function() {
		return {error: null};
	},

	render: function() {
		return (
			<div className="main-container">
				<Navigation></Navigation>
				<div className="grid-block">
					<div id="editor" className="medium-4 grid-block">
						<textarea placeholder="Write some js code here"></textarea>
					</div>
					<div id="viewer" className="medium-8 grid-block">
						<SVGViewer></SVGViewer>
					</div>
				</div>
	        </div>
        );
	}

});

module.exports = Homepage;
