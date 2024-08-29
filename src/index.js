/* eslint-disable prefer-arrow-callback */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable n/no-unsupported-features/node-builtins */
// #region required-template
import './reset.css';
import './style.css';
// [x]TODO: fetch API
// [x]TODO: process json
// [ ]TODO: input form (location)
// [ ]TODO: error handling

// [ ]TODO: "loading time" + test on DevTools for low end devices

// eslint-disable-next-line no-unused-vars
const testElement = document.createElement('div');
// #endregion

// DOM elements
const domInputs = document.querySelectorAll('input');
/** @type {Array.<HTMLInputElement>} */
const [passwordOriginal = document.querySelector('input#password')] = [];

// API functions
const apiString =
  'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York?unitGroup=us&key=DZE4DLL8Y94HFL5G8DRAWPKgg&contentType=json';

async function getWeather() {
  const response = await fetch(apiString, { mode: 'cors' });
  const responseJSON = await response.json();
  return responseJSON;
}

function handleError(unsafeFunction) {
  return function () {
    return unsafeFunction().catch(function (error) {
      console.log(error);
      // throw error;
    });
  };
}

const getWeatherSafe = handleError(getWeather);
const weatherData = await getWeatherSafe();

function extractWeatherData({ alerts, address, description, currentConditions, days }) {
  return {
    alerts,
    address,
    description,
    currentConditions,
    days,
  };
}
const weatherDataFiltered = extractWeatherData(weatherData);
const targetWeatherFields = [
  'conditions',
  'temp',
  'feelslike',
  'humidity',
  'precip',
  'precipprob',
  'preciptype',
  'snow',
  'snowdepth',
  'uvindex',
  'icon'
]
console.log(weatherDataFiltered.currentConditions);

function filterByDesiredFields(targetObject, selectedFields) {
  return Object.entries(targetObject).filter(([key, value]) => selectedFields.includes(key));
}
const weatherTodayFiltered = filterByDesiredFields(
  weatherDataFiltered.currentConditions,
  targetWeatherFields
);
const weather15DaysFiltered = weatherDataFiltered.days.map((day) =>
  filterByDesiredFields(day, targetWeatherFields)
);

