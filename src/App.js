import React, { Component } from 'react';
import Calculator from './calculator'
import Animate from 'preact-css-transition-group';

const Button = ({onClick}) => (
  <div className="widget-button__wrapper">
    <div onClick={onClick} class="widget-button">

    </div>
  </div>
)

class App extends Component {
  constructor() {
    super();
    this.state = {
      isWidgetVisible: false
    }
    this.toggleWidget = this.toggleWidget.bind(this);
  }
  toggleWidget() {
    
    this.setState({
      isWidgetVisible: !this.state.isWidgetVisible
    });

  }
  render() {
    return (
      <div>
        <Animate 
            transitionName="screen"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            component="div">
          {this.state.isWidgetVisible ? <Calculator onClick={this.toggleWidget} key="1" /> : <Button onClick={this.toggleWidget} key="2" />}
        </Animate>
      </div>
     )
  }
}


export default App;
