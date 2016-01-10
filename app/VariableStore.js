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

    checkIfGeometry: function(val) {
        if(val && val.constructor != undefined)
        switch (val.constructor.name) {
            case 'circle':
            case 'line':
                return val;
                break;
            default:
                return null;
        }

        return null;
    },

    updateCode: function(code) {
        this.data.code = code;
        var self = this;

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
                case 'line':
                    geomObjects.push(val);
                    break;
                case 'Array':
                    var flatArray = _.flatten(val);
                    flatArray.forEach(function(item){
                        var geomItem = self.checkIfGeometry(item);
                        if(geomItem)
                            geomObjects.push(geomItem);
                    });
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
