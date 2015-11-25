function getFormattedSeconds(sec) {
	var seconds = ('0' + sec % 60).slice(-2);
	var minuites = Math.floor(sec / 60);
	return minuites + ':' + seconds;
}

var Timer = React.createClass({
	getInitialState: function() {
		return {elapsed: 0, laps: []};
	},
	getSeconds: function() {
		return ('0' + this.state.elapsed % 60 ).slice(-2);
	},
	getMinuits: function() {
		return Math.floor(this.state.elapsed / 60);
	},
	tick: function() {
		this.setState({elapsed: this.state.elapsed + 1});
	},
	handleStartClick: function() {
		this.interval = setInterval(this.tick, 1000);
	},
	handleStopClick: function() {
		clearInterval(this.interval);
		this.setState({lastClearedInterval: this.interval});
	},
	handleReset: function() {
		this.setState({elapsed: 0, laps: []});
	},
	handleLaps: function() {
		this.setState({laps: this.state.laps.concat([this.state.elapsed])});
	},
	render: function() {
		return(
			<div className="stopwatch">
				<h1 className="stopwatch-timer">{getFormattedSeconds(this.state.elapsed)}</h1>

				{(this.state.elapsed === 0 || this.interval === this.state.lastClearedInterval)
					? <button className="btn start-btn" onClick={this.handleStartClick}>start</button>
					: <button className="btn stop-btn" onClick={this.handleStopClick}>stop</button>
				}

				{(this.state.elapsed !== 0 && this.interval !== this.state.lastClearedInterval)
					? <button className="btn"  onClick={this.handleLaps}>lap</button>
					: null
				}

				{(this.state.elapsed !== 0 && this.interval === this.state.lastClearedInterval)
					? <button className="btn"  onClick={this.handleReset}>reset</button>
					: null
				}

				<ul className="stopwatch-laps">{this.state.laps.map(function (lap, i) {
					return <li className="stopwatch-lap"><strong>{i + 1}</strong> / {getFormattedSeconds(lap)}</li>
				})}</ul>
			</div>
		);
	}
});

ReactDOM.render(<Timer/>, document.getElementById('content'));