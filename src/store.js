import {createStore} from 'redux';
import moment from 'moment';
import getAllDaysOfYear from './utils';

const currentYear = moment().year();

const getInitialCalendar = () => {
  return getAllDaysOfYear(currentYear, undefined, 2);
};
const initialState = {year: currentYear, squeezeNumber: 2, calendar: getInitialCalendar()};

const store = createStore((state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_YEAR':
      return {
        ...state,
        year: action.year,
        calendar: getAllDaysOfYear(action.year, undefined, state.squeezeNumber)
      };
    case 'SWITCH_SQUEEZE_NUMBER':
      return {
        ...state,
        squeezeNumber: action.squeezeNumber,
        calendar: getAllDaysOfYear(state.year, undefined, action.squeezeNumber)
      };
    default:
      return state;
  }
});

export default store;
