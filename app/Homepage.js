var React = require('react');
var validUrl = require('valid-url');
var Router = require('react-router');
var Link = require('react-router').Link;
var Navigation = require('./Navigation');
var SVGComponent = require('./SVGComponent');

var Homepage = React.createClass({

	getInitialState: function() {
		return {error: null};
	},

	render: function() {

		return (
			<div className="main-container">
				<Navigation></Navigation>
				<div className="grid-block">
					<div id="editor" className="medium-4 grid-block">editor</div>
					<div id="viewer" className="medium-8 grid-block">
						<SVGComponent height="500" width="500" viewBox="-50 -50 100 100">
							<circle x="0" y="0" r="50"/>
					    </SVGComponent>
					</div>
				</div>
	        </div>
        );
	}

});

module.exports = Homepage;
