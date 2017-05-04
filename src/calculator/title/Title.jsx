import React from 'react';
import './title.css';

const Title = ({title, cls, value}) => {
  return (
    <p className={`title ${cls}`}>
      <span className="title__value">{title}</span>
      <span className="title__ext text-color_orange">{value}</span>
    </p>
  );
};

Title.propTypes = {
  title: React.PropTypes.string,
  value: React.PropTypes.string,
  cls: React.PropTypes.string
};

Title.defaultProps = {
  title: '',
  value: '',
  cls: ''
};

export default Title;
