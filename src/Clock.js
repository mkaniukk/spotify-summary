import React from 'react';

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
    // initialize timer when rendered
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
    // timer set to 0 when refreshed
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
    
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
            <h2>Time: {this.state.date.toLocaleTimeString()}.</h2>
            <button onClick={() => this.setState({date: new Date()})}>Click me</button>
        </div>
      );
    }
  }

  export default Clock