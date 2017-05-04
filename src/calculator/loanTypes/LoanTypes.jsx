import React from 'react';
import Item from './Item';
import Title from '../title/Title';
import './loanTypes.css';

const LoanTypes = ({types, onTypeClick}) => {
  const typesList = types.map(({text, id, icon, isDisabled, isChecked}, i) => {
    return <Item key={i} name={text} id={id} onClick={onTypeClick} isDisabled={isDisabled} icon={icon} isChecked={isChecked} />;
  });

  return (
	<div className="loan-types-list">{typesList}</div>
  );
}

LoanTypes.defaultProps = {
};

export default LoanTypes;
