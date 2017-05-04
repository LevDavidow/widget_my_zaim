import React from 'react';
import ResultItem from './ResultItem.jsx';
import Title from '../title/Title.jsx';
import './results.css';

const Results = ({comission, finalSum, loan, currency}) => (
  <ul className="results-list">
    <ResultItem title="Размер займа" value={loan} ext={currency} />
    <ResultItem title="Комиссия" value={comission} ext={currency} />
    <ResultItem title="К погашению" value={finalSum} ext={currency} />
  </ul>
);


Results.propTypes = {};

Results.defaultProps = {
};

export default Results;
