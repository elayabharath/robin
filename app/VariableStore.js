'use strict';

var Reflux = require('reflux');
var vm = require('vm');
var request = require('superagent');
var _ = require('underscore');

var libCode = "";

var VariableStore = Reflux.createStore({

    init: function() {
        this.data = {
            code: "",
            renderObjects: [],
            variables: {}
        };

        var self = this;
        var url = "Geometry.txt";

        request
            .get(url)
            .set('Content-Type', 'application/txt')
            .end(function(err, res) {
                if (err) throw err;
                libCode = res.text;
            });
    },

    getInitialState: function() {
        return this.data;
    },

    updateCode: function(code) {
        this.data.code = code;

        var context = vm.createContext();
		vm.runInContext(libCode, context);
		vm.runInContext(code, context);
		var variableKeys = Object.keys(context);

		var allVariables = {};
		variableKeys.forEach(function(variableKey){
			if(typeof context[variableKey] != 'function')
				allVariables[variableKey] = context[variableKey];
		});

		var geomObjects = [];
        var keys = _.allKeys(allVariables);
        keys.forEach(function(key){
            var val = allVariables[key];
            switch (val.constructor.name) {
                case 'circle':
                    geomObjects.push(val);
                    break;
                default:

            }
        });


        this.data = {
            code: code,
            variables: allVariables,
            renderObjects: geomObjects
        };

        this.trigger(this.data);
    }

});

module.exports = VariableStore;
