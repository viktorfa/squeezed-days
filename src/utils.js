import moment from 'moment';
import 'moment/locale/nb';
import _ from 'underscore';
// ------------------------------------
// Help functions
// ------------------------------------

moment.locale('nb-no');

const easters = {
  '2016': moment({'year': 2016, 'month': 2, 'day': 27}),
  '2017': moment({'year': 2017, 'month': 3, 'day': 16}),
  '2018': moment({'year': 2018, 'month': 3, 'day': 1}),
  '2019': moment({'year': 2019, 'month': 3, 'day': 21}),
  '2020': moment({'year': 2020, 'month': 3, 'day': 12}),
  '2021': moment({'year': 2021, 'month': 3, 'day': 4}),
  '2022': moment({'year': 2022, 'month': 3, 'day': 17}),
  '2023': moment({'year': 2023, 'month': 3, 'day': 9}),
  '2024': moment({'year': 2024, 'month': 2, 'day': 31}),
  '2025': moment({'year': 2025, 'month': 3, 'day': 20}),
  '2026': moment({'year': 2026, 'month': 3, 'day': 5}),
};

const getNorwegianHolidays = (year) => {
  const easter = easters[year];
  return {
    '1. nyttårsdag': moment({'year': year, 'month': 0, 'day': 1}),
    'arbeidernes dag': moment({'year': year, 'month': 4, 'day': 1}),
    'grunnlovsdag': moment({'year': year, 'month': 4, 'day': 17}),
    '1. juledag': moment({'year': year, 'month': 11, 'day': 25}),
    '2. juledag': moment({'year': year, 'month': 11, 'day': 26}),
    'palmesøndag': moment(easter).subtract(7, 'days'),
    'skjærtorsdag': moment(easter).subtract(3, 'days'),
    'langfredag': moment(easter).subtract(2, 'days'),
    '2. påskedag': moment(easter).add(1, 'day'),
    'kristi himmelfartsdag': moment(easter).add(39, 'days'),
    '1. pinsedag': moment(easter).add(49, 'days'),
    '2. pinsedag': moment(easter).add(50, 'days')
  }
};

const getHolidaysOfYear = (year) => {
  return _.reduce(getNorwegianHolidays(year), (acc, day, index) => {
    acc[day.dayOfYear()] = {'date': day, 'name': index};
    return acc;
  }, {})
};

const getAllDaysOfYear = (year, holidays = getHolidaysOfYear(year), squeezeNumber = 3) => {
  const day = moment({'year': year, 'month': 0, 'day': 1});
  const result = {};
  while (day.get('year') === year) {
    let dayObject = {'date': moment(day)};
    dayObject.formattedDate = dayObject.date.format('dddd D MMM gggg');
    if (_.contains(Object.keys(holidays), day.dayOfYear().toString())) {
      dayObject['type'] = 'holiday';
      dayObject['name'] = holidays[day.dayOfYear().toString()].name;
    }
    else if (day.isoWeekday() === 6 || day.isoWeekday() === 7) {
      dayObject['type'] = 'weekend';
    }
    else {
      dayObject['type'] = 'workday';
    }
    result[day.dayOfYear()] = dayObject;
    day.add(1, 'day');
  }
  _.chain(result)
    .filter(day => day.type === 'workday')
    .each((day) => {
      let dayOfYear = day.date.dayOfYear();
      try {
        result[dayOfYear]['daysFromLast'] = (result[dayOfYear - 1].daysFromLast + 1 || 0);
      } catch (e) {
        result[dayOfYear]['daysFromLast'] = 1;
      }
    })
    .reverse()
    .each((day) => {
      let dayOfYear = day.date.dayOfYear();
      try {
        result[dayOfYear]['daysToNext'] = (result[dayOfYear + 1].daysToNext + 1 || 0);
      } catch (e) {
        result[dayOfYear]['daysToNext'] = 1;
      }
    }).each((day) => {
    let dayOfYear = day.date.dayOfYear();
    if (day.daysToNext + day.daysFromLast < squeezeNumber) {
      result[dayOfYear].type = 'inneklemt';
    }
  });
  return result;
};

export default getAllDaysOfYear
