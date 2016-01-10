'use strict';

var Reflux = require('reflux');
var Actions = require('./Actions');

var SVGStore = Reflux.createStore({

    init: function() {
        this.listenTo(Actions.downloadAsked,this.downloadAsked);
        this.data = {
            svg: {}
        };
    },

    getInitialState: function() {
        return this.data;
    },

    downloadAsked: function() {
        var s = new XMLSerializer();
        var d = this.data.svg;
        var str = s.serializeToString(d);
        window.open("data:image/svg;charset=utf-8;filename=robin.svg," + encodeURI(str), "robin.svg");
    },

    updateSVG: function(svg) {
        this.data = {
            svg: svg
        };

        // this.trigger(this.data);
    }

});

module.exports = SVGStore;
