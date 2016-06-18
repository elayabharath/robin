var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var Navigation = require('./Navigation');
var SVGComponent = require('./SVGComponent');
var SVGViewer = require('./SVGViewer');
var VariableStore = require('./VariableStore');
var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
var Inspector = require('react-inspector');
var ObjectInspector = Inspector.ObjectInspector;
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var ResultPanel = React.createClass({

	mixins: [Reflux.connectFilter(VariableStore, "variables", function(data){
		return data.variables;
	})],

	getInitialState: function() {
		return {};
	},

	processVariable: function(name, value) {
		var isGeom = value.isGeometry==true ? true : false;
		console.log(value.constructor.name);
		return <div className="grid-block" key={name}>
			<div className="medium-1">hi</div>
			<div className="medium-3" style={{textOverflow: 'ellipsis', overflow: 'hidden'}} title={name}>{name}</div>
			<div className="medium-8">{value}</div>
		</div>;
	},

	render: function() {

		var self = this;

		var display = Object.keys(this.props.data).map(function (key, index) {
			return self.processVariable(key, self.props.data[key]);
		});

		if(display.length == 0) {
			return <div>No variables to show. Write some code?</div>;
		}

		return <div>
			{display}
		</div>;
	}

});

module.exports = ResultPanel;
