'use strict';

var Reflux = require('reflux');

var Store = Reflux.createStore({

    init: function() {
        this.data = {
            objects: [
                {
                    type: "circle",
                    cx: 0,
                    cy: 0,
                    radius: 50,
                    fillOpacity: 0.7,
                    fill: "#F44336"
                },
                {
                    type: "circle",
                    cx: 50,
                    cy: 0,
                    radius: 50,
                    fillOpacity: 0.7,
                    fill: "#4CAF50"
                },
                {
                    type: "circle",
                    cx: 25,
                    cy: -50,
                    radius: 50,
                    fillOpacity: 0.7,
                    fill: "#2196F3"
                }
            ]
        };
    },

    getInitialState: function() {
        return this.data;
    },

    changeData: function() {
        console.log("changing");
        this.data = {
            objects: [
                {
                    type: "circle",
                    cx: 0,
                    cy: 0,
                    radius: 50,
                    opacity: 0.1,
                    fill: "#00BCD4",
                    stroke: "#0097A7"
                },
                {
                    type: "circle",
                    cx: 75,
                    cy: 75,
                    radius: 50,
                    fillOpacity: 1,
                    fill: "#EC407A"
                }
            ]
        };

        this.trigger(this.data);
    }

});

module.exports = Store;
