var React = require('react');
var Homepage = require('./Homepage.js');

var routerModule = require('react-router');
var Router = routerModule.Router;  // component

var Route = routerModule.Route;

var App = React.createClass({

  render: function() {
    return null;
  }
});

React.render((
  <Router>
    <Route path="/" component={Homepage} />
  </Router>
), document.body);
