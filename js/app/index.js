'use strict';

const calendar = angular.module('calendar', ['ngAnimate']);

calendar
    .factory('dataGenerator', require('./services/data-generator-service'))
    .factory('createTimeGrid', require('./services/time-grid-service'))
    .factory('modal', require('./services/modal-service'))
    .factory('validationService', require('./services/validation-service'))
    .factory('formDataService', require('./services/add-form-data-service'));

calendar
    .component('mainView', require('./main-view-component/main-view'))
    .component('calendar', require('./calendar-component/calendar'))
    .component('selectedDay', require('./selected-day-component/selected-day'))
    .component('modalWindow', require('./modal-window-component/modal-window-component'));

calendar
    .filter('monthFilter', require('./services/month-filter'))
    .filter('dayFilter', require('./services/day-filter'));