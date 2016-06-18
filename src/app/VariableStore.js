'use strict';

var Reflux = require('reflux');
var vm = require('vm');
var request = require('superagent');
var _ = require('underscore');
var geom = require('./../geometry/index.js');

var VariableStore = Reflux.createStore({

    init: function() {
        this.data = {
            code: "",
            renderObjects: [],
            variables: {},
            error: ""
        };
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

    simplifyCode: function() {
        return `var circle = geom.circle`;
    },

    updateCode: function(code) {
        this.data.code = code;
        var self = this;

        var context = vm.createContext({"geom": geom});
        try {
            vm.runInContext(this.simplifyCode(), context);
            vm.runInContext(code, context);
        } catch (e) {
            this.data.error = e;
            this.trigger(this.data);
            return false;
        }

		var variableKeys = Object.keys(context);

		var allVariables = {};
		variableKeys.forEach(function(variableKey){
			if(typeof context[variableKey] != 'function' && variableKey != 'geom')
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
