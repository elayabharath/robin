var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var Link = require('react-router').Link;
var Navigation = require('./Navigation');
var SVGComponent = require('./SVGComponent');
var SVGViewer = require('./SVGViewer');
var VariableStore = require('./VariableStore');
var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
var Inspector = require('react-inspector');
var ResultPanel = require('./ResultPanel');
var ObjectInspector = Inspector.ObjectInspector;
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var Homepage = React.createClass({

	mixins: [Reflux.connectFilter(VariableStore, "variables", function(data){
		return data;
	})],

	getInitialState: function() {
		return {
			code: "// Code",
			selectTab: 0
		};
	},

	updateCodeStore: function() {
		var code = this.state.code;
		VariableStore.updateCode(code);
	},

	updateCode: function(newCode) {
		var self = this;
        this.setState({
            code: newCode
        }, function(){
			self.updateCodeStore();
		});
    },

	handleSelect: function (index, last) {
    	this.setState({selectTab: index});
  	},

	render: function() {
		var options = {
            lineNumbers: true,
			readOnly: false,
			lineWrapping: true,
			autofocus: true,
			mode: "javascript"
        };

		var hasError = this.state.variables.error != undefined && this.state.variables.error != '' ? true : false;

		return (
			<div className="main-container">
				<Navigation></Navigation>
				<div className="grid-block">
					<div id="editor" className="medium-4 grid-block vertical">
						<Codemirror value={this.state.code} onChange={this.updateCode} options={options} />

						<Tabs selectedIndex={this.state.selectTab} onSelect={this.handleSelect}>
							<TabList>
								<Tab>Result</Tab>
		 						<Tab>Errors { hasError ? <span style={{color: 'red'}}>●</span> : null}</Tab>
							</TabList>
							<TabPanel>
								<div className="inspector">
									<ObjectInspector data={ this.state.variables.variables } />
									{/*<ResultPanel data={this.state.variables.variables} />*/}
								</div>
        					</TabPanel>
							<TabPanel>
								<div className="inspector">
									{ hasError ? this.state.variables.error.message : "No errors, all good! 🎉"}
								</div>
        					</TabPanel>
						</Tabs>
					</div>
					<div id="viewer" className="medium-8 grid-block vertical">
						<SVGViewer></SVGViewer>
					</div>
				</div>
	        </div>
        );
	}

});

module.exports = Homepage;
