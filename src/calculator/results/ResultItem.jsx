import React from 'react';
import './results.css';

const Results = ({title, value, ext}) => (
  <li className="results-list__item">
    <p className="results-list__tittle results-list-content">
      <span className="results-list-content__item">{title}</span>
    </p>

    <p className="results-list__value results-list-content">
      <span className="results-list-content__item text-color_orange">{value.toLocaleString()} {ext}</span>
    </p>
  </li>
);


Results.defaultProps = {
};

export default Results;
