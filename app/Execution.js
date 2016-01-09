var React = require('react');
var Reflux = require('reflux');
var util = require('util');
var vm = require('vm');
var request = require('superagent');
var VariableStore = require('./VariableStore');
var _ = require('underscore');

var Execution = React.createClass({

	mixins: [
		Reflux.connect(VariableStore,"data")
	],

	getInitialState: function() {
		return {
			libCode: ""
		}
	},

	componentWillMount: function() {
        var self = this;
        var url = "Geometry.txt";

        request
            .get(url)
            .set('Content-Type', 'application/txt')
            .end(function(err, res) {
                if (err) throw err;
                self.setState({libCode: res.text});
            });
    },

	render: function() {
		var context = vm.createContext();
		vm.runInContext(this.state.libCode, context);
		vm.runInContext(this.state.data.code, context);
		var variableKeys = Object.keys(context);

		var variables = [];
		variableKeys.forEach(function(variableKey){
			if(typeof context[variableKey] != 'function')
				variables[variableKey] = context[variableKey];
		});
		console.log("calculating variable");
		console.log(variables);
		var geomObjects = [];
        var keys = _.allKeys(variables);
        keys.forEach(function(key){
            var val = variables[key];
            switch (val.constructor.name) {
                case 'circle':
                    geomObjects.push({"x": val.x, "y": val.y, "r": val.r, "fill": "black", "type": "circle"});
                    break;
                default:

            }
        });
		VariableStore.updateVariables(variables, geomObjects);
		return null;
	}

});

module.exports = Execution;
