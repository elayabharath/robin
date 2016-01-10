var React = require('react');
var validUrl = require('valid-url');
var Router = require('react-router');
var Actions = require('./Actions');
var Link = require('react-router').Link;

var Navigation = React.createClass({

	getInitialState: function() {
		return {error: null};
	},

	render: function() {

		return (
			<div className="navigation-container">
				<div className="navigation-content">
					<span>Robin</span>
					{/*<button onClick={Actions.downloadAsked} value="Download">Download</button>*/}
				</div>
	        </div>
        );
	}

});

module.exports = Navigation;
