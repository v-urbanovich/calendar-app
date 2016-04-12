'use strict';

const calendar = angular.module('calendar', []);

calendar
    .factory('dataGenerator', require('./services/data-generator-service'))
    .factory('createTimeGrid', require('./services/time-grid-service'));


calendar
    .component('mainView', require('./main-view-component/main-view'))
    .component('calendar', require('./calendar-component/calendar'))
    .component('selectedDay', require('./selected-day-component/selected-day'));

calendar
    .filter('monthFilter', require('./services/month-filter'))
    .filter('dayFilter', require('./services/day-filter'));