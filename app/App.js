/** @jsx React.DOM */
var React = require('react');
var MasterContainer = require('./MasterContainer.js');
var request = require('superagent');
var jsonp = require('superagent-jsonp');

var App = React.createClass({

	render: function() {
		return (
			<MasterContainer />
		);
	}

});

module.exports = App;
