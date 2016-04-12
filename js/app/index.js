'use strict';

const calendar = angular.module('calendar', []);

calendar
    .factory('dataGenerator', require('./services/data-generator-service'));


calendar
    .component('mainView', require('./main-view-component/main-view'));