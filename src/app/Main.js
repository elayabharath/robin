var React = require('react');
var Homepage = require('./Homepage.js');
var ReactDOM = require('react-dom');
var routerModule = require('react-router');
var browserHistory = routerModule.browserHistory;
var Router = routerModule.Router;  // component
var Route = routerModule.Route;

var App = React.createClass({

  render: function() {
    return null;
  }
});

ReactDOM.render((

    <Router history={browserHistory}>
        <Route path="/" component={Homepage} />
    </Router>


), document.getElementById("robinapp"));
