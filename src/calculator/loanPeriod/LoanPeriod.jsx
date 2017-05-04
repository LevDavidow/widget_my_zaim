import React from 'react';
import Item from './Item';
import './loanPeriod.css';

class LoanPeriod extends React.Component {
  render() {
    const periodes = this.props.periodes.map((period, i) => {
      return <Item 
        id={`date-input-${i}`} 
        name={'date-list'} 
        text={period.text} 
        isChecked={period.isChecked} 
        isDisabled={period.isDisabled} 
        value={i} 
        key={i} />;
    });

    return (
      <div className="date-list">{periodes}</div>
    );
  }
}

LoanPeriod.defaultProps = {
};

export default LoanPeriod;
