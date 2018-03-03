import {connect} from 'react-redux';
import CalendarComponent from './CalendarComponent'

const switchYear = (year) => {
  return {
    type: 'SWITCH_YEAR',
    year
  }
};
const switchSqueezeNumber = (squeezeNumber) => {
  return {
    type: 'SWITCH_SQUEEZE_NUMBER',
    squeezeNumber
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchYear: (year) => {
      dispatch(switchYear(year))
    },
    switchSqueezeNumber: (squeezeNumber) => {
      dispatch(switchSqueezeNumber(squeezeNumber))
    }
  }
};

const mapStateToProps = (state) => ({
  year: state.year,
  squeezeNumber: state.squeezeNumber,
  calendar: state.calendar,
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarComponent)
