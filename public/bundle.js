var bundle =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

		__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var calendar = angular.module('calendar', []);

	calendar.factory('dataGenerator', __webpack_require__(2));

	calendar.component('mainView', __webpack_require__(3)).component('calendar', __webpack_require__(5));

		calendar.filter('monthFilter', __webpack_require__(7));

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    return function () {
	        var dataArray = [],
	            dateNow = new Date();

	        //добавить числа предыдущего месяца
	        var firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1),
	            previousMonthLastDay = new Date(firstDay - 1).getDate(),
	            numberOfPastDays = (firstDay.getDay() || 7) - 1;

	        for (var i = 0; i < numberOfPastDays; i += 1) {
	            var dayData = {
	                date: previousMonthLastDay - i,
	                day: numberOfPastDays - i,
	                year: new Date(firstDay - 1).getFullYear(),
	                today: false,
	                month: new Date(firstDay - 1).getMonth(),
	                events: []
	            };

	            dataArray.unshift(dayData);
	        }

	        //добавить числа месяца
	        var numberOfDays = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).getDate();

	        for (var _i = 0; _i < numberOfDays; _i += 1) {
	            var day = new Date(dateNow.getFullYear(), dateNow.getMonth(), _i + 1),
	                _dayData = {
	                date: day.getDate(),
	                day: day.getDay() || 7,
	                today: day.getDate() === dateNow.getDate(),
	                month: day.getMonth(),
	                year: day.getFullYear(),
	                events: []
	            };

	            dataArray.push(_dayData);
	        }

	        //добавить дни следующего месяца
	        var numberOfFutureDays = 7 - dataArray.length % 7;

	        for (var _i2 = 0; _i2 < numberOfFutureDays; _i2 += 1) {
	            var _day = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, _i2 + 1),
	                _dayData2 = {
	                date: _day.getDate(),
	                day: _day.getDay() || 7,
	                today: false,
	                month: _day.getMonth(),
	                year: _day.getFullYear(),
	                events: []
	            };

	            dataArray.push(_dayData2);
	        }

	        return dataArray;
	    };
		};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mainViewTemplate = __webpack_require__(4);

	var mainView = {
	    controller: function controller(dataGenerator) {
	        this.data = {
	            daysData: dataGenerator()
	        };
	    },
	    template: mainViewTemplate
	};

		module.exports = mainView;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<calendar data=\"$ctrl.data.daysData\"></calendar>";
	ngModule.run(["$templateCache",function(c){c.put("main-view-template.html",v1)}]);
	module.exports=v1;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var calendarTemplate = __webpack_require__(6);

	var calendar = {
	    bindings: {
	        data: '<'
	    },
	    controller: function controller() {
	        this.date = new Date();
	        this.dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

	        this.getEventText = function (day) {
	            var numberOfEvents = day.events.length;
	            if (numberOfEvents > 1) return 'Количество событий: ' + numberOfEvents;
	            if (day.events[0]) {
	                return day.events[0].title;
	            } else {
	                return '';
	            }
	        };
	    },
	    template: calendarTemplate
	};

		module.exports = calendar;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<header> <div class=\"title\"> <span class=\"month\">{{ $ctrl.date.getMonth() | monthFilter }}</span>\n<span class=\"year\">{{ $ctrl.date.getFullYear() }}</span> </div> <div> <div class=\"day-name\" ng-repeat=\"name in $ctrl.dayNames\">{{name}}</div> </div> </header> <section> <div class=\"day\" ng-class=\"{'not-this-month': day.month !== $ctrl.date.getMonth(), 'weekend': day.day > 5}\" ng-repeat=\"day in $ctrl.data\"> <div class=\"date\"> <span ng-class=\"{'today': day.today}\">{{day.date}}</span> </div> <div class=\"events\" ng-if=\"day.events.length\"> {{ $ctrl.getEventText(day) }} </div> </div> </section>";
	ngModule.run(["$templateCache",function(c){c.put("calendar-template.html",v1)}]);
	module.exports=v1;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    return function (month) {
	        month = month + 1;
	        switch (month) {
	            case 1:
	                month = 'Январь';
	                break;
	            case 2:
	                month = 'Февраль';
	                break;
	            case 3:
	                month = 'Март';
	                break;
	            case 4:
	                month = 'Апрель';
	                break;
	            case 5:
	                month = 'Май';
	                break;
	            case 6:
	                month = 'Июнь';
	                break;
	            case 7:
	                month = 'Июль';
	                break;
	            case 8:
	                month = 'Август';
	                break;
	            case 9:
	                month = 'Сентябрь';
	                break;
	            case 10:
	                month = 'Октябрь';
	                break;
	            case 11:
	                month = 'Ноябрь';
	                break;
	            case 12:
	                month = 'Декабрь';
	                break;
	        }

	        return month;
	    };
		};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDBhOTI4NjRkODI5YjE1YzExMDU4Iiwid2VicGFjazovLy9qcy9jYWxlbmRhci1hcHAuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL2RhdGEtZ2VuZXJhdG9yLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWwiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy9tb250aC1maWx0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwYTkyODY0ZDgyOWIxNWMxMTA1OFxuICoqLyIsInJlcXVpcmUoJy4vYXBwJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY2FsZW5kYXItYXBwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgY2FsZW5kYXIgPSBhbmd1bGFyLm1vZHVsZSgnY2FsZW5kYXInLCBbXSk7XHJcblxyXG5jYWxlbmRhclxyXG4gICAgLmZhY3RvcnkoJ2RhdGFHZW5lcmF0b3InLCByZXF1aXJlKCcuL3NlcnZpY2VzL2RhdGEtZ2VuZXJhdG9yLXNlcnZpY2UnKSk7XHJcblxyXG5cclxuY2FsZW5kYXJcclxuICAgIC5jb21wb25lbnQoJ21haW5WaWV3JywgcmVxdWlyZSgnLi9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldycpKVxyXG4gICAgLmNvbXBvbmVudCgnY2FsZW5kYXInLCByZXF1aXJlKCcuL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhcicpKTtcclxuXHJcbmNhbGVuZGFyXHJcbiAgICAuZmlsdGVyKCdtb250aEZpbHRlcicsIHJlcXVpcmUoJy4vc2VydmljZXMvbW9udGgtZmlsdGVyJykpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBkYXRhQXJyYXkgPSBbXSxcbiAgICAgICAgICAgIGRhdGVOb3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDRh9C40YHQu9CwINC/0YDQtdC00YvQtNGD0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBmaXJzdERheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpLCAxKSxcbiAgICAgICAgICAgIHByZXZpb3VzTW9udGhMYXN0RGF5ID0gbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXREYXRlKCksXG4gICAgICAgICAgICBudW1iZXJPZlBhc3REYXlzID0gKGZpcnN0RGF5LmdldERheSgpIHx8IDcpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUGFzdERheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgZGF0ZTogcHJldmlvdXNNb250aExhc3REYXkgLSBpLFxuICAgICAgICAgICAgICAgIGRheTogbnVtYmVyT2ZQYXN0RGF5cyAtIGksXG4gICAgICAgICAgICAgICAgeWVhcjogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtb250aDogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGV2ZW50czogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRhdGFBcnJheS51bnNoaWZ0KGRheURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/QtNC+0LHQsNCy0LjRgtGMINGH0LjRgdC70LAg0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBudW1iZXJPZkRheXMgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mRGF5czsgaSArPSAxKSB7XG4gICAgICAgICAgICBsZXQgZGF5ID0gbmV3IERhdGUoZGF0ZU5vdy5nZXRGdWxsWWVhcigpLCBkYXRlTm93LmdldE1vbnRoKCksIGkgKyAxKSxcbiAgICAgICAgICAgICAgICBkYXlEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBkYXkuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBkYXk6IGRheS5nZXREYXkoKSB8fCA3LFxuICAgICAgICAgICAgICAgICAgICB0b2RheTogZGF5LmdldERhdGUoKSA9PT0gZGF0ZU5vdy5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBkYXkuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogZGF5LmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50czogW11cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkYXRhQXJyYXkucHVzaChkYXlEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDQtNC90Lgg0YHQu9C10LTRg9GO0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBudW1iZXJPZkZ1dHVyZURheXMgPSA3IC0gZGF0YUFycmF5Lmxlbmd0aCAlIDc7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkZ1dHVyZURheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpICsgMSwgaSArIDEpLFxuICAgICAgICAgICAgICAgIGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGRheTogZGF5LmdldERheSgpIHx8IDcsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRheS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKGRheURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGFBcnJheTtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9kYXRhLWdlbmVyYXRvci1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgbWFpblZpZXdUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvbWFpbi12aWV3LXRlbXBsYXRlLmh0bWwnKTtcclxuXHJcbmNvbnN0IG1haW5WaWV3ID0ge1xyXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oZGF0YUdlbmVyYXRvcikge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICAgICAgZGF5c0RhdGE6IGRhdGFHZW5lcmF0b3IoKVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogbWFpblZpZXdUZW1wbGF0ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYWluVmlldztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC9tYWluLXZpZXcuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxjYWxlbmRhciBkYXRhPVxcXCIkY3RybC5kYXRhLmRheXNEYXRhXFxcIj48L2NhbGVuZGFyPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJtYWluLXZpZXctdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY2FsZW5kYXJUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvY2FsZW5kYXItdGVtcGxhdGUuaHRtbCcpO1xuXG5jb25zdCBjYWxlbmRhciA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCdcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZTtcbiAgICAgICAgdGhpcy5kYXlOYW1lcyA9IFsn0L/QvScsICfQstGCJywgJ9GB0YAnLCAn0YfRgicsICfQv9GCJywgJ9GB0LEnLCAn0LLRgSddO1xuXG4gICAgICAgIHRoaXMuZ2V0RXZlbnRUZXh0ID0gZnVuY3Rpb24oZGF5KSB7XG4gICAgICAgICAgICBsZXQgbnVtYmVyT2ZFdmVudHMgPSBkYXkuZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChudW1iZXJPZkV2ZW50cyA+IDEpIHJldHVybiAn0JrQvtC70LjRh9C10YHRgtCy0L4g0YHQvtCx0YvRgtC40Lk6ICcgKyBudW1iZXJPZkV2ZW50cztcbiAgICAgICAgICAgIGlmIChkYXkuZXZlbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheS5ldmVudHNbMF0udGl0bGU7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGNhbGVuZGFyVGVtcGxhdGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2FsZW5kYXI7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhci5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGhlYWRlcj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPiA8c3BhbiBjbGFzcz1cXFwibW9udGhcXFwiPnt7ICRjdHJsLmRhdGUuZ2V0TW9udGgoKSB8IG1vbnRoRmlsdGVyIH19PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ5ZWFyXFxcIj57eyAkY3RybC5kYXRlLmdldEZ1bGxZZWFyKCkgfX08L3NwYW4+IDwvZGl2PiA8ZGl2PiA8ZGl2IGNsYXNzPVxcXCJkYXktbmFtZVxcXCIgbmctcmVwZWF0PVxcXCJuYW1lIGluICRjdHJsLmRheU5hbWVzXFxcIj57e25hbWV9fTwvZGl2PiA8L2Rpdj4gPC9oZWFkZXI+IDxzZWN0aW9uPiA8ZGl2IGNsYXNzPVxcXCJkYXlcXFwiIG5nLWNsYXNzPVxcXCJ7J25vdC10aGlzLW1vbnRoJzogZGF5Lm1vbnRoICE9PSAkY3RybC5kYXRlLmdldE1vbnRoKCksICd3ZWVrZW5kJzogZGF5LmRheSA+IDV9XFxcIiBuZy1yZXBlYXQ9XFxcImRheSBpbiAkY3RybC5kYXRhXFxcIj4gPGRpdiBjbGFzcz1cXFwiZGF0ZVxcXCI+IDxzcGFuIG5nLWNsYXNzPVxcXCJ7J3RvZGF5JzogZGF5LnRvZGF5fVxcXCI+e3tkYXkuZGF0ZX19PC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnRzXFxcIiBuZy1pZj1cXFwiZGF5LmV2ZW50cy5sZW5ndGhcXFwiPiB7eyAkY3RybC5nZXRFdmVudFRleHQoZGF5KSB9fSA8L2Rpdj4gPC9kaXY+IDwvc2VjdGlvbj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwiY2FsZW5kYXItdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG1vbnRoKSB7XG4gICAgICAgIG1vbnRoID0gbW9udGggKyAxO1xuICAgICAgICBzd2l0Y2ggKG1vbnRoKSB7XG4gICAgICAgICAgICBjYXNlIDE6IG1vbnRoID0gJ9Cv0L3QstCw0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6IG1vbnRoID0gJ9Ck0LXQstGA0LDQu9GMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzogbW9udGggPSAn0JzQsNGA0YInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OiBtb250aCA9ICfQkNC/0YDQtdC70YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OiBtb250aCA9ICfQnNCw0LknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OiBtb250aCA9ICfQmNGO0L3RjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6IG1vbnRoID0gJ9CY0Y7Qu9GMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODogbW9udGggPSAn0JDQstCz0YPRgdGCJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTogbW9udGggPSAn0KHQtdC90YLRj9Cx0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwIDogbW9udGggPSAn0J7QutGC0Y/QsdGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMTogbW9udGggPSAn0J3QvtGP0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6IG1vbnRoID0gJ9CU0LXQutCw0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vbnRoO1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL21vbnRoLWZpbHRlci5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUdBOzs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7QUFWQTtBQUNBOztBQVZBO0FBQ0E7QUF3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFDQTtBQVFBO0FBWEE7QUFDQTs7QUExQkE7QUFDQTtBQXlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7QUFYQTtBQUNBO0FBYUE7QUF4REE7QUFEQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBREE7QUFPQTtBQVJBO0FBQ0E7QUFVQTs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUhBO0FBSEE7QUFKQTtBQWNBO0FBbEJBO0FBQ0E7QUFvQkE7Ozs7OztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQVJBO0FBU0E7QUFDQTtBQVZBO0FBV0E7QUFDQTtBQVpBO0FBYUE7QUFDQTtBQWRBO0FBZUE7QUFDQTtBQWhCQTtBQWlCQTtBQUNBO0FBbEJBO0FBbUJBO0FBQ0E7QUFwQkE7QUFxQkE7QUFDQTtBQXRCQTtBQXVCQTtBQUNBO0FBeEJBO0FBQ0E7QUEwQkE7QUE3QkE7QUFEQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==