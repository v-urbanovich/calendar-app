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

	calendar.factory('dataGenerator', __webpack_require__(2)).factory('createTimeGrid', __webpack_require__(3));

	calendar.component('mainView', __webpack_require__(4)).component('calendar', __webpack_require__(6)).component('selectedDay', __webpack_require__(8));

		calendar.filter('monthFilter', __webpack_require__(10)).filter('dayFilter', __webpack_require__(11));

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
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    return function () {
	        var array = [];

	        for (var i = 0; i < 24; i += 1) {
	            var hours = ('0' + i).slice(-2) + ':00';

	            array.push({
	                hours: hours,
	                events: []
	            });
	        }

	        return array;
	    };
		};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mainViewTemplate = __webpack_require__(5);

	var mainView = {
	    controller: function controller(dataGenerator) {
	        this.data = {
	            daysData: dataGenerator()
	        };

	        this.selectDay = function (index) {
	            this.data.selectedDay = this.data.daysData[index];
	        };

	        this.unselectDay = function () {
	            delete this.data.selectedDay;
	        };
	    },
	    template: mainViewTemplate
	};

		module.exports = mainView;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<calendar data=\"$ctrl.data.daysData\" select=\"$ctrl.selectDay(index)\" ng-if=\"!$ctrl.data.selectedDay\"></calendar> <selected-day data=\"$ctrl.data.selectedDay\" ng-if=\"$ctrl.data.selectedDay\" unselect=\"$ctrl.unselectDay()\"></selected-day>";
	ngModule.run(["$templateCache",function(c){c.put("main-view-template.html",v1)}]);
	module.exports=v1;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var calendarTemplate = __webpack_require__(7);

	var calendar = {
	    bindings: {
	        data: '<',
	        select: '&'
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
/* 7 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<header> <div class=\"title\"> <span class=\"month\">{{ $ctrl.date.getMonth() | monthFilter }}</span>\n<span class=\"year\">{{ $ctrl.date.getFullYear() }}</span> </div> <div> <div class=\"day-name\" ng-repeat=\"name in $ctrl.dayNames\">{{name}}</div> </div> </header> <section> <div class=\"day\" ng-class=\"{'not-this-month': day.month !== $ctrl.date.getMonth(), 'weekend': day.day > 5}\" ng-click=\"$ctrl.select({index: $index})\" ng-repeat=\"day in $ctrl.data\"> <div class=\"date\"> <span ng-class=\"{'today': day.today}\">{{day.date}}</span> </div> <div class=\"events\" ng-if=\"day.events.length\"> {{ $ctrl.getEventText(day) }} </div> </div> </section>";
	ngModule.run(["$templateCache",function(c){c.put("calendar-template.html",v1)}]);
	module.exports=v1;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var selectedDayTemplate = __webpack_require__(9);

	var selectedDay = {
	    bindings: {
	        data: '<',
	        unselect: '&'
	    },
	    controller: function controller(createTimeGrid) {
	        var self = this;
	        this.times = createTimeGrid();

	        this.data.events.forEach(function (event) {
	            var index = event.time.slice(0, 2) / 1;
	            self.times[index].events.push(event);
	        });
	    },
	    template: selectedDayTemplate
	};
		module.exports = selectedDay;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<header class=\"group selected-day\"> <div class=\"title\"> <span class=\"month\">{{ $ctrl.data.month | monthFilter }} {{ $ctrl.data.date }},</span>\n<span class=\"year\">{{ $ctrl.data.year }}</span> <div class=\"day\">{{ $ctrl.data.day | dayFilter}}</div> </div> <div class=\"menu\"> <div class=\"back\" ng-click=\"$ctrl.unselect()\">Назад</div> <div class=\"add-event\">Добавить событие</div> </div> </header> <section> <div class=\"times\" ng-repeat=\"time in $ctrl.times\"> <div class=\"hour\">{{ time.hours }}</div> <div class=\"events\" ng-class=\"{'activeTime': time.events.length}\"> <div ng-repeat=\"event in time.events\" class=\"event\"> <div class=\"event-time\">{{ event.time }}</div> <div class=\"event-title\">{{ event.title }}</div> <div class=\"event-content\">{{ event.content }}</div> </div> </div> </div> </section>";
	ngModule.run(["$templateCache",function(c){c.put("selected-day-template.html",v1)}]);
	module.exports=v1;

/***/ },
/* 10 */
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

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    return function (day) {
	        switch (day) {
	            case 1:
	                day = 'Понедельник';
	                break;
	            case 2:
	                day = 'Вторник';
	                break;
	            case 3:
	                day = 'Среда';
	                break;
	            case 4:
	                day = 'Четверг';
	                break;
	            case 5:
	                day = 'Пятница';
	                break;
	            case 6:
	                day = 'Суббота';
	                break;
	            case 7:
	                day = 'Воскресение';
	                break;
	        }

	        return day;
	    };
		};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDEzYzU5NGZlYmJhODc1ZjA0NzJhIiwid2VicGFjazovLy9qcy9jYWxlbmRhci1hcHAuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL2RhdGEtZ2VuZXJhdG9yLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL21haW4tdmlldy1jb21wb25lbnQvbWFpbi12aWV3LmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L3RlbXBsYXRlL21haW4tdmlldy10ZW1wbGF0ZS5odG1sIiwid2VicGFjazovLy9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L2NhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9jYWxlbmRhci1jb21wb25lbnQvdGVtcGxhdGUvY2FsZW5kYXItdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL3NlbGVjdGVkLWRheS1jb21wb25lbnQvc2VsZWN0ZWQtZGF5LmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3RlbXBsYXRlL3NlbGVjdGVkLWRheS10ZW1wbGF0ZS5odG1sIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvbW9udGgtZmlsdGVyLmpzIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvZGF5LWZpbHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDEzYzU5NGZlYmJhODc1ZjA0NzJhXG4gKiovIiwicmVxdWlyZSgnLi9hcHAnKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jYWxlbmRhci1hcHAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBjYWxlbmRhciA9IGFuZ3VsYXIubW9kdWxlKCdjYWxlbmRhcicsIFtdKTtcclxuXHJcbmNhbGVuZGFyXHJcbiAgICAuZmFjdG9yeSgnZGF0YUdlbmVyYXRvcicsIHJlcXVpcmUoJy4vc2VydmljZXMvZGF0YS1nZW5lcmF0b3Itc2VydmljZScpKVxyXG4gICAgLmZhY3RvcnkoJ2NyZWF0ZVRpbWVHcmlkJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZScpKTtcclxuXHJcblxyXG5jYWxlbmRhclxyXG4gICAgLmNvbXBvbmVudCgnbWFpblZpZXcnLCByZXF1aXJlKCcuL21haW4tdmlldy1jb21wb25lbnQvbWFpbi12aWV3JykpXHJcbiAgICAuY29tcG9uZW50KCdjYWxlbmRhcicsIHJlcXVpcmUoJy4vY2FsZW5kYXItY29tcG9uZW50L2NhbGVuZGFyJykpXHJcbiAgICAuY29tcG9uZW50KCdzZWxlY3RlZERheScsIHJlcXVpcmUoJy4vc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC9zZWxlY3RlZC1kYXknKSk7XHJcblxyXG5jYWxlbmRhclxyXG4gICAgLmZpbHRlcignbW9udGhGaWx0ZXInLCByZXF1aXJlKCcuL3NlcnZpY2VzL21vbnRoLWZpbHRlcicpKVxyXG4gICAgLmZpbHRlcignZGF5RmlsdGVyJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9kYXktZmlsdGVyJykpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBkYXRhQXJyYXkgPSBbXSxcbiAgICAgICAgICAgIGRhdGVOb3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDRh9C40YHQu9CwINC/0YDQtdC00YvQtNGD0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBmaXJzdERheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpLCAxKSxcbiAgICAgICAgICAgIHByZXZpb3VzTW9udGhMYXN0RGF5ID0gbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXREYXRlKCksXG4gICAgICAgICAgICBudW1iZXJPZlBhc3REYXlzID0gKGZpcnN0RGF5LmdldERheSgpIHx8IDcpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUGFzdERheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgZGF0ZTogcHJldmlvdXNNb250aExhc3REYXkgLSBpLFxuICAgICAgICAgICAgICAgIGRheTogbnVtYmVyT2ZQYXN0RGF5cyAtIGksXG4gICAgICAgICAgICAgICAgeWVhcjogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtb250aDogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGV2ZW50czogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRhdGFBcnJheS51bnNoaWZ0KGRheURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/QtNC+0LHQsNCy0LjRgtGMINGH0LjRgdC70LAg0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBudW1iZXJPZkRheXMgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mRGF5czsgaSArPSAxKSB7XG4gICAgICAgICAgICBsZXQgZGF5ID0gbmV3IERhdGUoZGF0ZU5vdy5nZXRGdWxsWWVhcigpLCBkYXRlTm93LmdldE1vbnRoKCksIGkgKyAxKSxcbiAgICAgICAgICAgICAgICBkYXlEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBkYXkuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBkYXk6IGRheS5nZXREYXkoKSB8fCA3LFxuICAgICAgICAgICAgICAgICAgICB0b2RheTogZGF5LmdldERhdGUoKSA9PT0gZGF0ZU5vdy5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBkYXkuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogZGF5LmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50czogW11cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkYXRhQXJyYXkucHVzaChkYXlEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDQtNC90Lgg0YHQu9C10LTRg9GO0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBudW1iZXJPZkZ1dHVyZURheXMgPSA3IC0gZGF0YUFycmF5Lmxlbmd0aCAlIDc7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkZ1dHVyZURheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpICsgMSwgaSArIDEpLFxuICAgICAgICAgICAgICAgIGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGRheTogZGF5LmdldERheSgpIHx8IDcsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRheS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKGRheURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGFBcnJheTtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9kYXRhLWdlbmVyYXRvci1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBob3VycyA9ICgnMCcgKyBpKS5zbGljZSgtMikgKyAnOjAwJztcclxuXHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaG91cnM6IGhvdXJzLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvdGltZS1ncmlkLXNlcnZpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBtYWluVmlld1RlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbCcpO1xyXG5cclxuY29uc3QgbWFpblZpZXcgPSB7XHJcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbihkYXRhR2VuZXJhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0ge1xyXG4gICAgICAgICAgICBkYXlzRGF0YTogZGF0YUdlbmVyYXRvcigpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3REYXkgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWREYXkgPSB0aGlzLmRhdGEuZGF5c0RhdGFbaW5kZXhdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy51bnNlbGVjdERheSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLnNlbGVjdGVkRGF5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiBtYWluVmlld1RlbXBsYXRlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1haW5WaWV3O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldy5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGNhbGVuZGFyIGRhdGE9XFxcIiRjdHJsLmRhdGEuZGF5c0RhdGFcXFwiIHNlbGVjdD1cXFwiJGN0cmwuc2VsZWN0RGF5KGluZGV4KVxcXCIgbmctaWY9XFxcIiEkY3RybC5kYXRhLnNlbGVjdGVkRGF5XFxcIj48L2NhbGVuZGFyPiA8c2VsZWN0ZWQtZGF5IGRhdGE9XFxcIiRjdHJsLmRhdGEuc2VsZWN0ZWREYXlcXFwiIG5nLWlmPVxcXCIkY3RybC5kYXRhLnNlbGVjdGVkRGF5XFxcIiB1bnNlbGVjdD1cXFwiJGN0cmwudW5zZWxlY3REYXkoKVxcXCI+PC9zZWxlY3RlZC1kYXk+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm1haW4tdmlldy10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L3RlbXBsYXRlL21haW4tdmlldy10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjYWxlbmRhclRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9jYWxlbmRhci10ZW1wbGF0ZS5odG1sJyk7XG5cbmNvbnN0IGNhbGVuZGFyID0ge1xuICAgIGJpbmRpbmdzOiB7XG4gICAgICAgIGRhdGE6ICc8JyxcbiAgICAgICAgc2VsZWN0OiAnJidcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRGF0ZTtcbiAgICAgICAgdGhpcy5kYXlOYW1lcyA9IFsn0L/QvScsICfQstGCJywgJ9GB0YAnLCAn0YfRgicsICfQv9GCJywgJ9GB0LEnLCAn0LLRgSddO1xuXG4gICAgICAgIHRoaXMuZ2V0RXZlbnRUZXh0ID0gZnVuY3Rpb24oZGF5KSB7XG4gICAgICAgICAgICBsZXQgbnVtYmVyT2ZFdmVudHMgPSBkYXkuZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChudW1iZXJPZkV2ZW50cyA+IDEpIHJldHVybiAn0JrQvtC70LjRh9C10YHRgtCy0L4g0YHQvtCx0YvRgtC40Lk6ICcgKyBudW1iZXJPZkV2ZW50cztcbiAgICAgICAgICAgIGlmIChkYXkuZXZlbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheS5ldmVudHNbMF0udGl0bGU7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGNhbGVuZGFyVGVtcGxhdGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2FsZW5kYXI7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhci5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGhlYWRlcj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPiA8c3BhbiBjbGFzcz1cXFwibW9udGhcXFwiPnt7ICRjdHJsLmRhdGUuZ2V0TW9udGgoKSB8IG1vbnRoRmlsdGVyIH19PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ5ZWFyXFxcIj57eyAkY3RybC5kYXRlLmdldEZ1bGxZZWFyKCkgfX08L3NwYW4+IDwvZGl2PiA8ZGl2PiA8ZGl2IGNsYXNzPVxcXCJkYXktbmFtZVxcXCIgbmctcmVwZWF0PVxcXCJuYW1lIGluICRjdHJsLmRheU5hbWVzXFxcIj57e25hbWV9fTwvZGl2PiA8L2Rpdj4gPC9oZWFkZXI+IDxzZWN0aW9uPiA8ZGl2IGNsYXNzPVxcXCJkYXlcXFwiIG5nLWNsYXNzPVxcXCJ7J25vdC10aGlzLW1vbnRoJzogZGF5Lm1vbnRoICE9PSAkY3RybC5kYXRlLmdldE1vbnRoKCksICd3ZWVrZW5kJzogZGF5LmRheSA+IDV9XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuc2VsZWN0KHtpbmRleDogJGluZGV4fSlcXFwiIG5nLXJlcGVhdD1cXFwiZGF5IGluICRjdHJsLmRhdGFcXFwiPiA8ZGl2IGNsYXNzPVxcXCJkYXRlXFxcIj4gPHNwYW4gbmctY2xhc3M9XFxcInsndG9kYXknOiBkYXkudG9kYXl9XFxcIj57e2RheS5kYXRlfX08L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudHNcXFwiIG5nLWlmPVxcXCJkYXkuZXZlbnRzLmxlbmd0aFxcXCI+IHt7ICRjdHJsLmdldEV2ZW50VGV4dChkYXkpIH19IDwvZGl2PiA8L2Rpdj4gPC9zZWN0aW9uPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJjYWxlbmRhci10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9jYWxlbmRhci1jb21wb25lbnQvdGVtcGxhdGUvY2FsZW5kYXItdGVtcGxhdGUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IHNlbGVjdGVkRGF5VGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL3NlbGVjdGVkLWRheS10ZW1wbGF0ZS5odG1sJyk7XHJcblxyXG5jb25zdCBzZWxlY3RlZERheSA9IHtcclxuICAgIGJpbmRpbmdzOiB7XHJcbiAgICAgICAgZGF0YTogJzwnLFxyXG4gICAgICAgIHVuc2VsZWN0OiAnJidcclxuICAgIH0sXHJcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbihjcmVhdGVUaW1lR3JpZCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnRpbWVzID0gY3JlYXRlVGltZUdyaWQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhLmV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBldmVudC50aW1lLnNsaWNlKDAsIDIpIC8gMTtcclxuICAgICAgICAgICAgc2VsZi50aW1lc1tpbmRleF0uZXZlbnRzLnB1c2goZXZlbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogc2VsZWN0ZWREYXlUZW1wbGF0ZVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHNlbGVjdGVkRGF5O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3NlbGVjdGVkLWRheS5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGhlYWRlciBjbGFzcz1cXFwiZ3JvdXAgc2VsZWN0ZWQtZGF5XFxcIj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPiA8c3BhbiBjbGFzcz1cXFwibW9udGhcXFwiPnt7ICRjdHJsLmRhdGEubW9udGggfCBtb250aEZpbHRlciB9fSB7eyAkY3RybC5kYXRhLmRhdGUgfX0sPC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ5ZWFyXFxcIj57eyAkY3RybC5kYXRhLnllYXIgfX08L3NwYW4+IDxkaXYgY2xhc3M9XFxcImRheVxcXCI+e3sgJGN0cmwuZGF0YS5kYXkgfCBkYXlGaWx0ZXJ9fTwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwibWVudVxcXCI+IDxkaXYgY2xhc3M9XFxcImJhY2tcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC51bnNlbGVjdCgpXFxcIj7QndCw0LfQsNC0PC9kaXY+IDxkaXYgY2xhc3M9XFxcImFkZC1ldmVudFxcXCI+0JTQvtCx0LDQstC40YLRjCDRgdC+0LHRi9GC0LjQtTwvZGl2PiA8L2Rpdj4gPC9oZWFkZXI+IDxzZWN0aW9uPiA8ZGl2IGNsYXNzPVxcXCJ0aW1lc1xcXCIgbmctcmVwZWF0PVxcXCJ0aW1lIGluICRjdHJsLnRpbWVzXFxcIj4gPGRpdiBjbGFzcz1cXFwiaG91clxcXCI+e3sgdGltZS5ob3VycyB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudHNcXFwiIG5nLWNsYXNzPVxcXCJ7J2FjdGl2ZVRpbWUnOiB0aW1lLmV2ZW50cy5sZW5ndGh9XFxcIj4gPGRpdiBuZy1yZXBlYXQ9XFxcImV2ZW50IGluIHRpbWUuZXZlbnRzXFxcIiBjbGFzcz1cXFwiZXZlbnRcXFwiPiA8ZGl2IGNsYXNzPVxcXCJldmVudC10aW1lXFxcIj57eyBldmVudC50aW1lIH19PC9kaXY+IDxkaXYgY2xhc3M9XFxcImV2ZW50LXRpdGxlXFxcIj57eyBldmVudC50aXRsZSB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudC1jb250ZW50XFxcIj57eyBldmVudC5jb250ZW50IH19PC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvc2VjdGlvbj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwic2VsZWN0ZWQtZGF5LXRlbXBsYXRlLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL3NlbGVjdGVkLWRheS1jb21wb25lbnQvdGVtcGxhdGUvc2VsZWN0ZWQtZGF5LXRlbXBsYXRlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG1vbnRoKSB7XG4gICAgICAgIG1vbnRoID0gbW9udGggKyAxO1xuICAgICAgICBzd2l0Y2ggKG1vbnRoKSB7XG4gICAgICAgICAgICBjYXNlIDE6IG1vbnRoID0gJ9Cv0L3QstCw0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6IG1vbnRoID0gJ9Ck0LXQstGA0LDQu9GMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzogbW9udGggPSAn0JzQsNGA0YInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OiBtb250aCA9ICfQkNC/0YDQtdC70YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OiBtb250aCA9ICfQnNCw0LknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OiBtb250aCA9ICfQmNGO0L3RjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6IG1vbnRoID0gJ9CY0Y7Qu9GMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODogbW9udGggPSAn0JDQstCz0YPRgdGCJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTogbW9udGggPSAn0KHQtdC90YLRj9Cx0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwIDogbW9udGggPSAn0J7QutGC0Y/QsdGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMTogbW9udGggPSAn0J3QvtGP0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6IG1vbnRoID0gJ9CU0LXQutCw0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vbnRoO1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL21vbnRoLWZpbHRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZGF5KSB7XG4gICAgICAgIHN3aXRjaCAoZGF5KSB7XG4gICAgICAgICAgICBjYXNlIDE6IGRheSA9ICfQn9C+0L3QtdC00LXQu9GM0L3QuNC6JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjogZGF5ID0gJ9CS0YLQvtGA0L3QuNC6JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzogZGF5ID0gJ9Ch0YDQtdC00LAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OiBkYXkgPSAn0KfQtdGC0LLQtdGA0LMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OiBkYXkgPSAn0J/Rj9GC0L3QuNGG0LAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OiBkYXkgPSAn0KHRg9Cx0LHQvtGC0LAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3OiBkYXkgPSAn0JLQvtGB0LrRgNC10YHQtdC90LjQtSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF5O1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL2RheS1maWx0ZXIuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFJQTs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFDQTtBQVFBO0FBVkE7QUFDQTs7QUFWQTtBQUNBO0FBd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTtBQVhBO0FBQ0E7O0FBMUJBO0FBQ0E7QUF5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFDQTtBQVFBO0FBWEE7QUFDQTtBQWFBO0FBeERBO0FBREE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFDQTtBQVFBO0FBWkE7QUFEQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQVRBO0FBY0E7QUFmQTtBQUNBO0FBaUJBOzs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBSEE7QUFIQTtBQUpBO0FBY0E7QUFuQkE7QUFDQTtBQXFCQTs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUpBO0FBVUE7QUFmQTtBQWlCQTs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFLQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBUkE7QUFTQTtBQUNBO0FBVkE7QUFXQTtBQUNBO0FBWkE7QUFhQTtBQUNBO0FBZEE7QUFlQTtBQUNBO0FBaEJBO0FBaUJBO0FBQ0E7QUFsQkE7QUFtQkE7QUFDQTtBQXBCQTtBQXFCQTtBQUNBO0FBdEJBO0FBdUJBO0FBQ0E7QUF4QkE7QUFDQTtBQTBCQTtBQTdCQTtBQURBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFLQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBUkE7QUFTQTtBQUNBO0FBVkE7QUFXQTtBQUNBO0FBWkE7QUFhQTtBQUNBO0FBZEE7QUFDQTtBQWdCQTtBQWxCQTtBQURBOzs7Iiwic291cmNlUm9vdCI6IiJ9