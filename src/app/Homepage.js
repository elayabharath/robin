var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var Navigation = require('./Navigation');
var SVGComponent = require('./SVGComponent');
var SVGViewer = require('./SVGViewer');
var VariableStore = require('./VariableStore');

var Homepage = React.createClass({

	getInitialState: function() {
		return {};
	},

	updateCodeStore: function() {
		var code = this.refs.code.value;
		VariableStore.updateCode(code);
	},

	render: function() {
		return (
			<div className="main-container">
				<Navigation></Navigation>
				<div className="grid-block">
					<div id="editor" className="medium-4 grid-block">
						<textarea
							placeholder="Write some js code here"
							onChange={this.updateCodeStore}
							ref="code">
						</textarea>
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
