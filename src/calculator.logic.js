let config = {
  currency: 'руб.',
  slider: {
    min: 1000,
    max: 80000,
    value: 5000
  },
  periodesById: {
    '1-14days': {
      text: '1-14 дней',
      isChecked: false,
      isDisabled: false
    },
    '15-30days': {
      text: '15-30 дней',
      isChecked: false,
      isDisabled: false
    },
    '1-6month': {
      text: '1-6 мес.',
      isChecked: false,
      isDisabled: false
    },
    '7-12month': {
      text: '7-12 мес.',
      isChecked: false,
      isDisabled: false
    },
  },
  periodesOrder: ['1-14days', '15-30days', '1-6month', '7-12month'],
  checkedPeriod: '',
  checkedType: [],
  typesById: {
    card: {
      text: 'На карту',
      icon: '0xe817',
      isDisabled: false,
      isChecked: false
    },
    cash: {
      text: 'Наличными',
      icon: '0xe811',
      isDisabled: false,
      isChecked: true
    },
    account: {
      text: 'На счет',
      icon: '0x0434',
      isDisabled: false,
      isChecked: false
    },
    wallet: {
      text: 'На кошелёк',
      icon: '0xe805',
      isDisabled: false,
      isChecked: false
    },
    transition: {
      text: 'Переводом',
      icon: '0xe80d',
      isDisabled: false,
      isChecked: false
    }
  },
  typesOrder: ['card', 'cash', 'account', 'wallet', 'transition'],
  results: {
    finalSum: 0,
    loan: 0,
    comission: 0,
    chance: 0
  },
};

function calculateLoanTypeResults(value) {
  const filterStates = {
    card: {
      isChecked: false,
      isDisabled: false
    },
    cash: {
      isChecked: false,
      isDisabled: false
    },
    account: {
      isChecked: false,
      isDisabled: false
    },
    wallet: {
      isChecked: false,
      isDisabled: false
    },
    transition: {
      isChecked: false,
      isDisabled: false
    },
  };

  if (value < 20000) {
    filterStates.card.isDisabled = false;
    filterStates.cash.isDisabled = false;
    filterStates.account.isDisabled = false;
    filterStates.wallet.isDisabled = false;
    filterStates.transition.isDisabled = false;
  }

  if (value > 31000) {
    filterStates.card.isDisabled = false;
    filterStates.cash.isDisabled = false;
    filterStates.account.isDisabled = false;
    filterStates.wallet.isDisabled = true;
    filterStates.transition.isDisabled = false;
  }

  if (value > 52000) {
    filterStates.card.isDisabled = true;
    filterStates.cash.isDisabled = false;
    filterStates.account.isDisabled = false;
    filterStates.wallet.isDisabled = true;
    filterStates.transition.isDisabled = false;
  }

  if (value > 71000) {
    filterStates.card.isDisabled = true;
    filterStates.cash.isDisabled = false;
    filterStates.account.isDisabled = true;
    filterStates.wallet.isDisabled = true;
    filterStates.transition.isDisabled = true;
  }

  return filterStates;
}

function calculateResults(value) {
  let period = '';
  let periodInterval = '';
  let periodId = '';
  let comissionCoef = '';
  let finalSumCoef = '';
  let chance = '';
  let condition = '';

  if (value < 10000) {
    period = '1-14';
    periodInterval = 'дней';
    periodId = '1-14days';
  } else if (value >= 10000 && value <= 30000) {
    period = '15-30';
    periodInterval = 'дней';
    periodId = '15-30days';
  } else if (value > 30000 && value < 50000) {
    period = '1-6';
    periodId = '1-6month';
    periodInterval = 'месяцев';
  } else {
    period = '7-12';
    periodInterval = 'месяцев';
    periodId = '7-12month';
  }

  if (value < 9000) {
    condition = 'Автоматическое одобрение';
  } else if (value < 16000) {
    condition = 'Может потребоваться паспорт';
  } else if (value < 30000) {
    condition = 'Нужен только паспорт';
  } else if (value < 35000) {
    condition = 'Может понадобиться подтверждение места работы';
  } else if (value < 55000) {
    condition = 'Может понадобиться справка о доходах';
  } else if (value <= 80000) {
    condition = 'Необходима справка о доходах';
  }

  if (value < 10000) {
    comissionCoef = 0.14;
    finalSumCoef = 0.14;
  } else if (value > 9000 && value < 30000) {
    comissionCoef = 0.33;
    finalSumCoef = 0.33;
  } else if (value > 29000 && value < 50000) {
    comissionCoef = 0.09;
    finalSumCoef = 0.09;
  } else if (value > 49000) {
    comissionCoef = 0.27;
    finalSumCoef = 0.27;
  }

  if (value >= 0 && value <= 8000) {
    chance = '95';
  } else if (value >= 9000 && value <= 15000) {
    chance = '93';
  } else if (value >= 16000 && value <= 30000) {
    chance = '83';
  } else if (value >= 31000 && value <= 35000) {
    chance = '71';
  } else if (value >= 36000 && value <= 55000) {
    chance = '63';
  } else if (value >= 56000 && value <= 80000) {
    chance = '51';
  }

  return {
    finalSum: Math.round((value * comissionCoef) + value),
    loan: value,
    comission: Math.round(value * comissionCoef),
    periodId,
    chance
  };
}

/**
 * @param {Object} types
 * @param {Object} typesConfig
 * @param {Array} typesOrder
 * @param {Number} value
 * @returns {Object}
 */
function updateTypesState(types, typesConfig, typesOrder = []) {
  const modifiesTypes = {...types};

  typesOrder.forEach((type) => {
    modifiesTypes[type].isDisabled = typesConfig[type].isDisabled;
    modifiesTypes[type].isChecked = typesConfig[type].isDisabled
      ? false
      : modifiesTypes[type].isChecked;
  });

  return modifiesTypes;
}

/**
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
function applyToggleCalculatorLoanType(state, action) {
  return {
    ...state,
    typesById: {
      ...state.typesById,
      [action.id]: {
        ...state.typesById[action.id],
        isChecked: !state.typesById[action.id].isDisabled && !state.typesById[action.id].isChecked
      }
    }
  };
}

/**
 * @param {Object} state - previous state
 * @param {Object} action - action config
 */
function slideEventHandler(state, action) {
  return {
    ...state,
    slider: {
      ...state.slider,
      value: action.value
    }
  };
}

/**
 * @param {Object} types
 * @param {Array} order
 * @returns {Array}
 */
function getSelectedTypes(types, order = []) {
  return order.map((type) => {
    return types[type].isChecked && type;
  }).filter((typeName) => { return typeName; });
}

/**
 * @param {Object} state
 * @returns {Object}
 */
function applyResults(state) {
  const {finalSum, loan, comission, chance, periodId} = calculateResults(state.slider.value);
  const typesConfig = calculateLoanTypeResults(state.slider.value);
  const updatedTypes = updateTypesState({...state.typesById}, typesConfig, state.typesOrder);

  return {
    ...state,
    checkedType: getSelectedTypes(updatedTypes, state.typesOrder),
    checkedPeriod: periodId,
    typesById: updatedTypes,
    results: {finalSum, loan, comission, chance}
  };
}

config = applyResults(config);

const TOGGLE_CALCULATOR_LOAT_TYPE = 'TOGGLE_CALCULATOR_LOAT_TYPE';
const SET_CALCULATOR_SLIDER_VALUE = 'SET_CALCULATOR_SLIDER_VALUE';

export {calculateLoanTypeResults, config, TOGGLE_CALCULATOR_LOAT_TYPE, SET_CALCULATOR_SLIDER_VALUE, calculateResults, applyResults, getSelectedTypes, updateTypesState, applyToggleCalculatorLoanType, slideEventHandler};
