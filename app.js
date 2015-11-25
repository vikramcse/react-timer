var Timer = React.createClass({
	getInitialState: function() {
		return {
			elapsed: 0
		};
	},
	tick: function() {
		this.setState({elapsed: new Date() - this.props.start})
	},
	componentDidMount: function() {
		this.interval = setInterval(this.tick, 50);
	},
	componentWillUnmount: function() {
    	clearInterval(this.interval);
  	},
	render: function() {
		var elapsed = Math.round(this.state.elapsed / 100);
		var seconds = (elapsed / 10).toFixed(1);

		return(
			<div>
				<p>This example was started <b>{seconds} seconds</b> ago.</p>
				{this.props.start}
			</div>
		);
	}
});

ReactDOM.render(<Timer start={Date.now()}/>, document.getElementById('content'));