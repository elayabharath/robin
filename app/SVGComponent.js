var React = require('react');
var validUrl = require('valid-url');
var Router = require('react-router');
var Link = require('react-router').Link;

var SVGComponent = React.createClass({

	render: function() {
		return <svg {...this.props}>
			{this.props.children}
		</svg>;
    }

});

module.exports = SVGComponent;
