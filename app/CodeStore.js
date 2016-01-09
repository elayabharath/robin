'use strict';

var Reflux = require('reflux');

var Codestore = Reflux.createStore({

    init: function() {
        this.data = {
            code: ""
        };
    },

    getInitialState: function() {
        return this.data;
    },

    updateCode: function(code) {
        this.data = {
            code: code
        };

        this.trigger(this.data);
    }

});

module.exports = Codestore;
