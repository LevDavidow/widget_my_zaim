import React, { Component } from 'react';
import './App.css';
import Calculator from './calculator/Calculator';
import './styles';
import { applyResults, applyToggleCalculatorLoanType, config, slideEventHandler, TOGGLE_CALCULATOR_LOAT_TYPE, SET_CALCULATOR_SLIDER_VALUE} from './calculator.logic.js';

class App extends Component {
  constructor() {
    super();
    this.state = config
    this.apply = this.apply.bind(this);
    this.slideEvent = this.slideEvent.bind(this);
    this.toggleCalculatorLoanType = this.toggleCalculatorLoanType.bind(this);
  }
  apply(action) {
    this.setState(App.reduceCalculatorState(this.state, action)) 
  }
  static reduceCalculatorState(state, action) {
    switch (action.type) {
      case TOGGLE_CALCULATOR_LOAT_TYPE: {
        return applyResults(applyToggleCalculatorLoanType(state, action));
      }
      case SET_CALCULATOR_SLIDER_VALUE: {
        return applyResults(slideEventHandler(state, action));
      }
      default: {
        return state;
      }
    }
  }
  static mapStateToProps(config) {
    // eslint-disable-line no-unused-vars
    /* Populated by react-webpack-redux:reducer */
    const {
      slider,
      results,
      typesById,
      typesOrder,
      periodesById,
      periodesOrder,
      checkedPeriod,
      currency} = config;

    const props = {
      currency,
      slider,
      results,
      periodTitle: periodesById[checkedPeriod] ? periodesById[checkedPeriod].text : '',
      periodes: periodesOrder.map((id) => {
        const period = {...periodesById[id], id};

        period.isChecked = (id === checkedPeriod);

        return period;
      }),
      types: typesOrder.map(id => {
        return {...typesById[id], id};
      })
    };

    return props;
  }
  toggleCalculatorLoanType(id) {
    this.apply({
      type: TOGGLE_CALCULATOR_LOAT_TYPE,
      id
    })
  }

  slideEvent(value) {
    this.apply({
      type: SET_CALCULATOR_SLIDER_VALUE,
      value
    });
  }
  getActions() {
    return {
      slideEvent: this.slideEvent,
      toggleCalculatorLoanType: this.toggleCalculatorLoanType
    }
  }
  render() {
    const props = App.mapStateToProps(this.state);
    props.actions = this.getActions();
    return (
      <div className="widget-outer">
         <div className="index">
        <section className="widget no-touch" id="widget">
          <header className="widget__header">
            <h1 className="widget-title"><svg height="25px">
                <defs>
                  <linearGradient id="MyGradient" x1={0} x2="100%" y1={0} y2={0}>
                    <stop className="gradient-from" offset="0%" stopColor="crimson" />
                    <stop className="gradient-to" offset="100%" stopColor="purple" />
                  </linearGradient>
                </defs>
                <text fill="url(#MyGradient)" x={0} y="100%">
                  Выберите свой займ!
                </text></svg></h1>
            <div className="header-controls">
              <ul className="controls-list">
                <li className="control-list-item">
                	<button onClick={this.props.onClick} className="control-item" type="button"><i className="icon">x</i></button>
                </li>
              </ul>
            </div>
          </header>
          <div className="widget__body">
            <div className="screens-list">
              <div className="screen" style={{paddingBottom: '20px'}}>
                <div>
                  <div className="chat-item">
                    <div className="avatar-wrapper chat-item__component">
                      <div className="avatar"><img alt="avatar-img" src="static/img/bot-avatar.png" srcSet="static/img/bot-avatar.png 1x, static/img/bot-avatar@2x.png 2x" width={52} /></div>
                    </div>
                    <div className="message-wrapper chat-item__component">
                      <div className="message message_bot">
                        <div className="message__item">
                          Выберите условия займа
                        </div>
                      </div>
                    </div>
                  </div>
                  <Calculator {...props}/>
                  <div className="field-controls">
                    <div>
                      <p className="custom-button-wrapper">
                      	<button onClick={this.props.onClick} className="custom-button custom-button_gradient" type="button">
                      	<span className="custom-button__content">ГОТОВО</span>
                      	</button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
     
    );
  }
}


export default App;
