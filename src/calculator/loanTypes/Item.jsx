import React, {PropTypes} from 'react';
import Icon from '../../components/Icon';

const Type = ({
  icon, name, isChecked, isDisabled, id, onClick
}) => {
  const activeClass = isChecked ? 'loan-type_active single-gradient_show' : '';
  const disabledClass = isDisabled ? 'loan-type_disabled' : '';
  const descriptionMarkup = name && (<p className="loan-type__description">{name}</p>);

  return (
    <div
      className={`type__item loan-type ${activeClass} ${disabledClass}`}
      role="button"
      onClick={() => onClick(id)}>
      <div className="loan-type__label single-gradient">
				<Icon icon={icon}/>
      </div>
      {descriptionMarkup}
    </div>
  );
};

Type.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
  isChecked: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired
};

export default Type;
