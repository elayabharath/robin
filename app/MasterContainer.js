var React = require('react');
var Reflux = require('reflux');
var Store = require('./store.js');

var request = require('superagent');

var MasterContainer = React.createClass({

    mixins: [Reflux.connect(Store,"storeData")],

    render: function() {
        return <div>
                <div>Hello</div>
            </div>
        ;
    }

});

module.exports = MasterContainer;
