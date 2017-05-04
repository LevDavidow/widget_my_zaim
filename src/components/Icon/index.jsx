import React, {PropTypes} from 'react';
import './icon.css';

const Icon = ({icon: iconCode, active}) => {
  const icon = String.fromCharCode(parseInt(iconCode, 16));
  return (
    <i className={active ? 'icon icon_active' : 'icon'}>{icon}</i>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default Icon;
