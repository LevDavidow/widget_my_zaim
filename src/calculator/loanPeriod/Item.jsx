import React, {PropTypes} from 'react';
import './loanPeriod.css';

class Item extends React.Component {
  render() {
    const {value, text, name, isDisabled, isChecked} = this.props;
    const disabledClass = isDisabled ? 'date__item_disabled' : '';
    const activeClass = isChecked ? 'date__item_active single-gradient_show' : '';

    return (
      <div onClick={()=> {}} className={`date__item ${disabledClass} ${activeClass}`}>
        <div className="date__label single-gradient">{text}</div>
      </div>
    );
  }
}

Item.defaultProps = {
};

export default Item;
