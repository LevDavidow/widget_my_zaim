import React from 'react';
import Title from './title/Title';
import LoanTypes from './loanTypes/LoanTypes';
import LoanPeriod from './loanPeriod/LoanPeriod';
import Slider from './slider/Slider';
import Results from './results/Results';
import './calculator.css';

const Calculator = ({
    slider,
    currency,
    periodes,
    periodTitle,
    types,
    results,
    actions
  }) => {
  return (
    <div className="calculator">
      <div className="calculator__section loan-slider-wrapper">
        <Title title="Сумма - " value={`${slider.value.toLocaleString()} ${currency}`} />
        <Slider
          onSlide={actions.slideEvent}
          current={slider.value}
          min={slider.min}
          max={slider.max} />
      </div>

      <div className="calculator__section loan-period-wrapper">
        <Title title="Срок - " value={periodTitle} />
        <LoanPeriod periodes={periodes} periodTitle={periodTitle}/>
      </div>

      <div className="calculator__section loan-types-wrapper">
        <Title
          title="Тип займа - "
          value={types
                      .map(type => type.isChecked && type.text)
                      .filter(text => !!text)
                      .join(', ')} />
        <LoanTypes types={types} onTypeClick={actions.toggleCalculatorLoanType} />
      </div>

      <div className="calculator__section results">
        <Title title="Вероятность одобрения - " value={`${results.chance}%`} cls="title_big" />
        <Results {...results} currency={currency}/>
      </div>
    </div>
  );
};

Calculator.defaultProps = {
};

export default Calculator;
