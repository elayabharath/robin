var React = require('react');
var MasterContainer = require('./MasterContainer.js');
var Homepage = require('./Homepage.js');

var routerModule = require('react-router');
var Router = routerModule.Router;  // component

var Route = routerModule.Route;

var App = React.createClass({

  render: function() {
    return (
      <MasterContainer></MasterContainer> 
    );
  }
});

React.render((
  <Router>
    <Route path="/" component={Homepage} />
    <Route name="read" path="/read/" component={MasterContainer} />
  </Router>
), document.body);
