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

	calendar.factory('dataGenerator', __webpack_require__(2)).factory('createTimeGrid', __webpack_require__(3)).factory('modal', __webpack_require__(4)).factory('validationService', __webpack_require__(5)).factory('formDataService', __webpack_require__(6));

	calendar.component('mainView', __webpack_require__(7)).component('calendar', __webpack_require__(9)).component('selectedDay', __webpack_require__(11)).component('modalWindow', __webpack_require__(13));

		calendar.filter('monthFilter', __webpack_require__(15)).filter('dayFilter', __webpack_require__(16));

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
	                events: [],
	                customEvents: []
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
	            if (_i === 15) {
	                _dayData.events.push({
	                    time: '10:20',
	                    title: 'My new event',
	                    content: 'Hello? ddsdasdkl;k;las asdk;w dsdasdkl;k;las  dsdasdkl;k;las  dsdasdkl;k;las ',
	                    custom: false
	                });
	                _dayData.events.push({
	                    time: '10:20',
	                    title: 'My new event',
	                    content: 'Hello? ddsdasdkl;k;las asdk;w dsdasdkl;k;las  dsdasdkl;k;las  dsdasdkl;k;las ',
	                    custom: false
	                });
	            }

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
	                events: [],
	                customEvents: []
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
/***/ function(module, exports) {

	'use strict';

	module.exports = function ($q) {
	    var state = 'close',
	        type = null,
	        defer = void 0;

	    var modalViewData = {};

	    function getState() {
	        return state;
	    }

	    function getType() {
	        return type;
	    }

	    function open(data, modal_type) {
	        modalViewData.data = data;
	        type = modal_type;
	        state = 'open';
	        if (modal_type === 'confirm' || modal_type === 'add-event') {
	            defer = $q.defer();
	            return defer.promise;
	        }
	    }

	    function close(bool, data) {
	        if (bool) {
	            if (data) defer.resolve({ data: JSON.stringify(data) });else defer.resolve();
	        } else if (type === 'confirm' && type === 'add-event') {
	            defer.reject();
	        }
	        state = 'close';
	        type = null;
	        delete modalViewData.data;
	    }

	    return {
	        modalViewData: modalViewData,
	        getState: getState,
	        getType: getType,
	        open: open,
	        close: close
	    };
		};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    var validationObj = {
	        status: true,
	        time: {
	            status: false,
	            message: ''
	        },
	        title: {
	            status: false,
	            message: ''
	        },
	        content: {
	            status: false,
	            message: ''
	        }
	    };

	    function validate(data) {
	        if (!data.hours || !data.minutes) {
	            validationObj.status = false;
	            validationObj.time.status = true;
	            validationObj.time.message = 'Введите часы и минуты';
	        } else if (isNaN(+data.hours) || isNaN(+data.minutes)) {
	            validationObj.status = false;
	            validationObj.time.status = true;
	            validationObj.time.message = 'Часы и минуты должны быть числами';
	        } else if (+data.hours < 0 || +data.hours > 23 || +data.minutes < 0 || +data.minutes > 59) {
	            validationObj.status = false;
	            validationObj.time.status = true;
	            validationObj.time.message = 'Введите корректное время';
	        }

	        if (!data.title) {
	            validationObj.status = false;
	            validationObj.title.status = true;
	            validationObj.title.message = 'Введите заголовок';
	        }

	        if (data.content && data.content.split(' ').length < 5) {
	            validationObj.status = false;
	            validationObj.content.status = true;
	            validationObj.content.message = 'Должно быть 0 либо 5 слов';
	        }

	        return validationObj.status;
	    }

	    function reset() {
	        validationObj.status = true;
	        validationObj.content.status = false;
	        validationObj.time.status = false;
	        validationObj.title.status = false;
	    }

	    return {
	        validationObj: validationObj,
	        validate: validate,
	        reset: reset
	    };
		};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    var data = {
	        hours: '',
	        minutes: '',
	        title: '',
	        content: ''
	    };

	    function clearData() {
	        data.hours = '';
	        data.minutes = '';
	        data.title = '';
	        data.content = '';
	    }

	    function setData(formData) {
	        data.hours = formData.time.slice(0, 2);
	        data.minutes = formData.time.slice(-2);
	        data.title = formData.title;
	        data.content = formData.content;
	    }

	    return {
	        data: data,
	        clearData: clearData,
	        setData: setData
	    };
		};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mainViewTemplate = __webpack_require__(8);

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

	        this.addEvent = function (event, day) {
	            var index = this.data.daysData.indexOf(day);
	            this.data.daysData[index].events.push(event);
	        };

	        this.removeEvent = function (event, day) {
	            var index = this.data.daysData.indexOf(day),
	                eventIndex = this.data.daysData[index].events.indexOf(event);
	            this.data.daysData[index].events.splice(eventIndex, 1);
	        };
	    },
	    template: mainViewTemplate
	};

		module.exports = mainView;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<calendar data=\"$ctrl.data.daysData\" select=\"$ctrl.selectDay(index)\" ng-if=\"!$ctrl.data.selectedDay\"></calendar> <selected-day data=\"$ctrl.data.selectedDay\" ng-if=\"$ctrl.data.selectedDay\" unselect=\"$ctrl.unselectDay()\" add=\"$ctrl.addEvent(event, day)\" remove=\"$ctrl.removeEvent(event, day)\"></selected-day> <modal-window></modal-window>";
	ngModule.run(["$templateCache",function(c){c.put("main-view-template.html",v1)}]);
	module.exports=v1;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var calendarTemplate = __webpack_require__(10);

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
/* 10 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<header> <div class=\"title\"> <span class=\"month\">{{ $ctrl.date.getMonth() | monthFilter }}</span>\n<span class=\"year\">{{ $ctrl.date.getFullYear() }}</span> </div> <div> <div class=\"day-name\" ng-repeat=\"name in $ctrl.dayNames\">{{name}}</div> </div> </header> <section> <div class=\"day\" ng-class=\"{'not-this-month': day.month !== $ctrl.date.getMonth(), 'weekend': day.day > 5}\" ng-click=\"$ctrl.select({index: $index})\" ng-repeat=\"day in $ctrl.data\"> <div class=\"date\"> <span ng-class=\"{'today': day.today}\">{{day.date}}</span> </div> <div class=\"events\" ng-if=\"day.events.length\"> {{ $ctrl.getEventText(day) }} </div> </div> </section>";
	ngModule.run(["$templateCache",function(c){c.put("calendar-template.html",v1)}]);
	module.exports=v1;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var selectedDayTemplate = __webpack_require__(12);

	var selectedDay = {
	    bindings: {
	        data: '<',
	        unselect: '&',
	        add: '&',
	        remove: '&'
	    },
	    controller: function controller(modal, createTimeGrid, formDataService) {
	        var _this = this;

	        this.times = createTimeGrid();

	        this.data.events.forEach(function (event) {
	            var index = event.time.slice(0, 2) / 1;
	            _this.times[index].events.push(event);
	        });

	        if (!this.data.events.length) modal.open({ title: 'Сообщение', message: 'На данный день нет запланированных событий' }, 'alert');

	        this.addEvent = function (edit) {
	            var _this2 = this;

	            if (this.data.year < new Date().getFullYear() || this.data.month < new Date().getMonth() || this.data.date < new Date().getDate()) {
	                modal.open({ title: 'Ошибка', message: 'Нельзя добавить события на прошедшие дни' }, 'alert');
	                return;
	            }

	            modal.open({ title: 'Введите данные', message: '' }, 'add-event').then(function (data) {

	                var eventData = JSON.parse(data.data),
	                    obj = {
	                    time: ('0' + eventData.hours).slice(-2) + ':' + ('0' + eventData.minutes).slice(-2),
	                    title: eventData.title,
	                    content: eventData.content,
	                    custom: false
	                };

	                _this2.add({ event: obj, day: _this2.data });

	                var index = obj.time.slice(0, 2) / 1;
	                _this2.times[index].events.push(_this2.data.events[_this2.data.events.length - 1]);
	            });
	        };

	        this.removeEvent = function (index, time, day) {
	            var _this3 = this;

	            if (time.events[index].custom) {
	                modal.open({ title: 'Ошибка', message: 'Нельзя удалить событие' }, 'alert');
	                return;
	            }
	            modal.open({ title: 'Подтвердите', message: 'Удалить данное событие?' }, 'confirm').then(function () {
	                _this3.remove({ event: time.events[index], day: day });

	                var timeIndex = _this3.times.indexOf(time);
	                _this3.times[timeIndex].events.splice(index, 1);
	            });
	        };
	    },
	    template: selectedDayTemplate
	};
		module.exports = selectedDay;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<header class=\"group selected-day\"> <div class=\"title\"> <span class=\"month\">{{ $ctrl.data.month | monthFilter }} {{ $ctrl.data.date }},</span>\n<span class=\"year\">{{ $ctrl.data.year }}</span> <div class=\"day\">{{ $ctrl.data.day | dayFilter}}</div> </div> <div class=\"menu\"> <div class=\"back\" ng-click=\"$ctrl.unselect()\">Назад</div> <div class=\"add-event\" ng-click=\"$ctrl.addEvent()\">Добавить событие</div> </div> </header> <section> <div class=\"times\" ng-repeat=\"time in $ctrl.times\"> <div class=\"hour\">{{ time.hours }}</div> <div class=\"events\" ng-class=\"{'activeTime': time.events.length}\"> <div ng-repeat=\"event in time.events\" class=\"event\"> <div class=\"event-data\"> <div class=\"event-time\">{{ event.time }}</div> <div class=\"event-title\">{{ event.title }}</div> <div class=\"event-content\">{{ event.content }}</div> </div> <div class=\"event-remove\" ng-click=\"$ctrl.removeEvent($index, time, $ctrl.data)\">X</div> </div> </div> </div> </section>";
	ngModule.run(["$templateCache",function(c){c.put("selected-day-template.html",v1)}]);
	module.exports=v1;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var modalTemplate = __webpack_require__(14);

	var modal = {
	    controller: function controller(modal, validationService, formDataService) {
	        this.modalViewData = modal.modalViewData;
	        this.checkOpen = function () {
	            return modal.getState() === 'open';
	        };
	        this.checkType = function (type) {
	            return modal.getType() === type;
	        };
	        this.type = modal.getType;

	        this.validationObj = validationService.validationObj;

	        this.stopPropagation = function (event) {
	            event.stopImmediatePropagation();
	        };

	        this.data = formDataService.data;

	        this.close = function (bool, data) {
	            if (!data && !bool && modal.getType() === 'add-event') {
	                validationService.reset();
	                formDataService.clearData();
	            }
	            if (!data || !bool) {
	                modal.close(bool);
	                return;
	            }
	            validationService.reset();
	            var status = validationService.validate(data);
	            if (status) {
	                modal.close(bool, data);
	                formDataService.clearData();
	            }
	        };
	    },
	    template: modalTemplate
	};

		module.exports = modal;

/***/ },
/* 14 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"modal-background\" ng-if=\"$ctrl.checkOpen()\"> <div class=\"window an\" ng-if=\"$ctrl.checkOpen()\"> <div class=\"title\">{{ $ctrl.modalViewData.data.title }}</div> <div class=\"message\" ng-if=\"!$ctrl.checkType('add-event')\">{{ $ctrl.modalViewData.data.message }}</div> <div class=\"add-form\" ng-if=\"$ctrl.checkType('add-event')\"> <table> <tr class=\"add-form-time\"> <td>Время:</td> <td><input type=\"text\" ng-model=\"$ctrl.data.hours\">:<input type=\"text\" ng-model=\"$ctrl.data.minutes\"></td> <td ng-if=\"$ctrl.validationObj.time.status\" class=\"warning\">{{ $ctrl.validationObj.time.message }}</td> </tr> <tr class=\"add-form-title\"> <td>Заголовок:</td> <td><input type=\"text\" ng-model=\"$ctrl.data.title\"></td> <td ng-if=\"$ctrl.validationObj.title.status\" class=\"warning\">{{ $ctrl.validationObj.title.message }}</td> </tr> <tr class=\"add-form-content\"> <td>Описание:</td> <td><input type=\"text\" ng-model=\"$ctrl.data.content\"></td> <td ng-if=\"$ctrl.validationObj.content.status\" class=\"warning\">{{ $ctrl.validationObj.content.message }}</td> </tr> </table> </div> <div class=\"buttons group\"> <div class=\"confirm\" ng-if=\"$ctrl.checkType('confirm')\"> <div class=\"reject\" ng-click=\"$ctrl.close()\">Отмена</div> <div class=\"ok\" ng-click=\"$ctrl.close(true)\">OK</div> </div> <div class=\"alert\" ng-if=\"$ctrl.checkType('alert')\" ng-click=\"$ctrl.close()\">Закрыть</div> <div class=\"add-event\" ng-if=\"$ctrl.checkType('add-event')\"> <div class=\"reject\" ng-click=\"$ctrl.close()\">Отмена</div> <div class=\"ok\" ng-click=\"$ctrl.close(true, $ctrl.data)\">Сохранить</div> </div> </div> <div class=\"close\" ng-click=\"$ctrl.close()\">x</div> </div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("modal-template.html",v1)}]);
	module.exports=v1;

/***/ },
/* 15 */
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
/* 16 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDVhOTYyY2Q4ZDUyN2VjOGM2N2FkIiwid2VicGFjazovLy9qcy9jYWxlbmRhci1hcHAuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL2RhdGEtZ2VuZXJhdG9yLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL21vZGFsLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy92YWxpZGF0aW9uLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy9hZGQtZm9ybS1kYXRhLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWwiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3NlbGVjdGVkLWRheS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21vZGFsLXdpbmRvdy1jb21wb25lbnQvbW9kYWwtd2luZG93LWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbW9kYWwtd2luZG93LWNvbXBvbmVudC90ZW1wbGF0ZS9tb2RhbC10ZW1wbGF0ZS5odG1sIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvbW9udGgtZmlsdGVyLmpzIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvZGF5LWZpbHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDVhOTYyY2Q4ZDUyN2VjOGM2N2FkXG4gKiovIiwicmVxdWlyZSgnLi9hcHAnKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jYWxlbmRhci1hcHAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBjYWxlbmRhciA9IGFuZ3VsYXIubW9kdWxlKCdjYWxlbmRhcicsIFtdKTtcclxuXHJcbmNhbGVuZGFyXHJcbiAgICAuZmFjdG9yeSgnZGF0YUdlbmVyYXRvcicsIHJlcXVpcmUoJy4vc2VydmljZXMvZGF0YS1nZW5lcmF0b3Itc2VydmljZScpKVxyXG4gICAgLmZhY3RvcnkoJ2NyZWF0ZVRpbWVHcmlkJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZScpKVxyXG4gICAgLmZhY3RvcnkoJ21vZGFsJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9tb2RhbC1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgndmFsaWRhdGlvblNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL3ZhbGlkYXRpb24tc2VydmljZScpKVxyXG4gICAgLmZhY3RvcnkoJ2Zvcm1EYXRhU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvYWRkLWZvcm0tZGF0YS1zZXJ2aWNlJykpO1xyXG5cclxuY2FsZW5kYXJcclxuICAgIC5jb21wb25lbnQoJ21haW5WaWV3JywgcmVxdWlyZSgnLi9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldycpKVxyXG4gICAgLmNvbXBvbmVudCgnY2FsZW5kYXInLCByZXF1aXJlKCcuL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhcicpKVxyXG4gICAgLmNvbXBvbmVudCgnc2VsZWN0ZWREYXknLCByZXF1aXJlKCcuL3NlbGVjdGVkLWRheS1jb21wb25lbnQvc2VsZWN0ZWQtZGF5JykpXHJcbiAgICAuY29tcG9uZW50KCdtb2RhbFdpbmRvdycsIHJlcXVpcmUoJy4vbW9kYWwtd2luZG93LWNvbXBvbmVudC9tb2RhbC13aW5kb3ctY29tcG9uZW50JykpO1xyXG5cclxuY2FsZW5kYXJcclxuICAgIC5maWx0ZXIoJ21vbnRoRmlsdGVyJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9tb250aC1maWx0ZXInKSlcclxuICAgIC5maWx0ZXIoJ2RheUZpbHRlcicsIHJlcXVpcmUoJy4vc2VydmljZXMvZGF5LWZpbHRlcicpKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZGF0YUFycmF5ID0gW10sXG4gICAgICAgICAgICBkYXRlTm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0YfQuNGB0LvQsCDQv9GA0LXQtNGL0LTRg9GJ0LXQs9C+INC80LXRgdGP0YbQsFxuICAgICAgICBsZXQgZmlyc3REYXkgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSwgMSksXG4gICAgICAgICAgICBwcmV2aW91c01vbnRoTGFzdERheSA9IG5ldyBEYXRlKGZpcnN0RGF5IC0gMSkuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgbnVtYmVyT2ZQYXN0RGF5cyA9IChmaXJzdERheS5nZXREYXkoKSB8fCA3KSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlBhc3REYXlzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBkYXlEYXRhID0ge1xuICAgICAgICAgICAgICAgIGRhdGU6IHByZXZpb3VzTW9udGhMYXN0RGF5IC0gaSxcbiAgICAgICAgICAgICAgICBkYXk6IG51bWJlck9mUGFzdERheXMgLSBpLFxuICAgICAgICAgICAgICAgIHllYXI6IG5ldyBEYXRlKGZpcnN0RGF5IC0gMSkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICB0b2RheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgbW9udGg6IG5ldyBEYXRlKGZpcnN0RGF5IC0gMSkuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBldmVudHM6IFtdLFxuICAgICAgICAgICAgICAgIGN1c3RvbUV2ZW50czogW11cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRhdGFBcnJheS51bnNoaWZ0KGRheURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/QtNC+0LHQsNCy0LjRgtGMINGH0LjRgdC70LAg0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBudW1iZXJPZkRheXMgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mRGF5czsgaSArPSAxKSB7XG4gICAgICAgICAgICBsZXQgZGF5ID0gbmV3IERhdGUoZGF0ZU5vdy5nZXRGdWxsWWVhcigpLCBkYXRlTm93LmdldE1vbnRoKCksIGkgKyAxKSxcbiAgICAgICAgICAgICAgICBkYXlEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBkYXkuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBkYXk6IGRheS5nZXREYXkoKSB8fCA3LFxuICAgICAgICAgICAgICAgICAgICB0b2RheTogZGF5LmdldERhdGUoKSA9PT0gZGF0ZU5vdy5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBkYXkuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogZGF5LmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50czogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGkgPT09IDE1KSB7XG4gICAgICAgICAgICAgICAgZGF5RGF0YS5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxMDoyMCcsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTXkgbmV3IGV2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ0hlbGxvPyBkZHNkYXNka2w7aztsYXMgYXNkazt3IGRzZGFzZGtsO2s7bGFzICBkc2Rhc2RrbDtrO2xhcyAgZHNkYXNka2w7aztsYXMgJyxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRheURhdGEuZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aW1lOiAnMTA6MjAnLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ015IG5ldyBldmVudCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdIZWxsbz8gZGRzZGFzZGtsO2s7bGFzIGFzZGs7dyBkc2Rhc2RrbDtrO2xhcyAgZHNkYXNka2w7aztsYXMgIGRzZGFzZGtsO2s7bGFzICcsXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhQXJyYXkucHVzaChkYXlEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDQtNC90Lgg0YHQu9C10LTRg9GO0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBudW1iZXJPZkZ1dHVyZURheXMgPSA3IC0gZGF0YUFycmF5Lmxlbmd0aCAlIDc7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkZ1dHVyZURheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpICsgMSwgaSArIDEpLFxuICAgICAgICAgICAgICAgIGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGRheTogZGF5LmdldERheSgpIHx8IDcsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRheS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tRXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKGRheURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGFBcnJheTtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9kYXRhLWdlbmVyYXRvci1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBob3VycyA9ICgnMCcgKyBpKS5zbGljZSgtMikgKyAnOjAwJztcclxuXHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaG91cnM6IGhvdXJzLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvdGltZS1ncmlkLXNlcnZpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkcSkge1xyXG4gICAgbGV0IHN0YXRlID0gJ2Nsb3NlJyxcclxuICAgICAgICB0eXBlID0gbnVsbCxcclxuICAgICAgICBkZWZlcjtcclxuXHJcbiAgICBsZXQgbW9kYWxWaWV3RGF0YSA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUeXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW4oZGF0YSwgbW9kYWxfdHlwZSkge1xyXG4gICAgICAgIG1vZGFsVmlld0RhdGEuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdHlwZSA9IG1vZGFsX3R5cGU7XHJcbiAgICAgICAgc3RhdGUgPSAnb3Blbic7XHJcbiAgICAgICAgaWYgKG1vZGFsX3R5cGUgPT09ICdjb25maXJtJyB8fCBtb2RhbF90eXBlID09PSAnYWRkLWV2ZW50Jykge1xyXG4gICAgICAgICAgICBkZWZlciA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZShib29sLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKGJvb2wpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIGRlZmVyLnJlc29sdmUoe2RhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpfSk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NvbmZpcm0nICYmIHR5cGUgPT09ICdhZGQtZXZlbnQnKSB7XHJcbiAgICAgICAgICAgIGRlZmVyLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0ZSA9ICdjbG9zZSc7XHJcbiAgICAgICAgdHlwZSA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIG1vZGFsVmlld0RhdGEuZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vZGFsVmlld0RhdGE6IG1vZGFsVmlld0RhdGEsXHJcbiAgICAgICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxyXG4gICAgICAgIGdldFR5cGU6IGdldFR5cGUsXHJcbiAgICAgICAgb3Blbjogb3BlbixcclxuICAgICAgICBjbG9zZTogY2xvc2VcclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvbW9kYWwtc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsaWRhdGlvbk9iaiA9IHtcbiAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YS5ob3VycyB8fCAhZGF0YS5taW51dGVzKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUubWVzc2FnZSA9ICfQktCy0LXQtNC40YLQtSDRh9Cw0YHRiyDQuCDQvNC40L3Rg9GC0YsnO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKCtkYXRhLmhvdXJzKSB8fCBpc05hTigrZGF0YS5taW51dGVzKSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLm1lc3NhZ2UgPSAn0KfQsNGB0Ysg0Lgg0LzQuNC90YPRgtGLINC00L7Qu9C20L3RiyDQsdGL0YLRjCDRh9C40YHQu9Cw0LzQuCc7XG4gICAgICAgIH0gZWxzZSBpZiAoK2RhdGEuaG91cnMgPCAwIHx8ICtkYXRhLmhvdXJzID4gMjMgfHwgK2RhdGEubWludXRlcyA8IDAgfHwgK2RhdGEubWludXRlcyA+IDU5KSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUubWVzc2FnZSA9ICfQktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90L7QtSDQstGA0LXQvNGPJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YS50aXRsZSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGl0bGUuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGl0bGUubWVzc2FnZSA9ICfQktCy0LXQtNC40YLQtSDQt9Cw0LPQvtC70L7QstC+0LonO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEuY29udGVudCAmJiBkYXRhLmNvbnRlbnQuc3BsaXQoJyAnKS5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5jb250ZW50LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLmNvbnRlbnQubWVzc2FnZSA9ICfQlNC+0LvQttC90L4g0LHRi9GC0YwgMCDQu9C40LHQviA1INGB0LvQvtCyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uT2JqLnN0YXR1cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSB0cnVlO1xuICAgICAgICB2YWxpZGF0aW9uT2JqLmNvbnRlbnQuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgdmFsaWRhdGlvbk9iai50aXRsZS5zdGF0dXMgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHZhbGlkYXRpb25PYmo6IHZhbGlkYXRpb25PYmosXG4gICAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcbiAgICAgICAgcmVzZXQ6IHJlc2V0XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvdmFsaWRhdGlvbi1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIGhvdXJzOiAnJyxcclxuICAgICAgICBtaW51dGVzOiAnJyxcclxuICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgY29udGVudDogJydcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJEYXRhKCkge1xyXG4gICAgICAgIGRhdGEuaG91cnMgPSAnJztcclxuICAgICAgICBkYXRhLm1pbnV0ZXMgPSAnJztcclxuICAgICAgICBkYXRhLnRpdGxlID0gJyc7XHJcbiAgICAgICAgZGF0YS5jb250ZW50ID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0RGF0YShmb3JtRGF0YSkge1xyXG4gICAgICAgIGRhdGEuaG91cnMgPSBmb3JtRGF0YS50aW1lLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgIGRhdGEubWludXRlcyA9IGZvcm1EYXRhLnRpbWUuc2xpY2UoLTIpO1xyXG4gICAgICAgIGRhdGEudGl0bGUgPSBmb3JtRGF0YS50aXRsZTtcclxuICAgICAgICBkYXRhLmNvbnRlbnQgPSBmb3JtRGF0YS5jb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBjbGVhckRhdGE6IGNsZWFyRGF0YSxcclxuICAgICAgICBzZXREYXRhOiBzZXREYXRhXHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL2FkZC1mb3JtLWRhdGEtc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IG1haW5WaWV3VGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL21haW4tdmlldy10ZW1wbGF0ZS5odG1sJyk7XHJcblxyXG5jb25zdCBtYWluVmlldyA9IHtcclxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGRhdGFHZW5lcmF0b3IpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgIGRheXNEYXRhOiBkYXRhR2VuZXJhdG9yKClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdERheSA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZERheSA9IHRoaXMuZGF0YS5kYXlzRGF0YVtpbmRleF1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnVuc2VsZWN0RGF5ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRhdGEuc2VsZWN0ZWREYXk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRFdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBkYXkpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5kYXRhLmRheXNEYXRhLmluZGV4T2YoZGF5KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmRheXNEYXRhW2luZGV4XS5ldmVudHMucHVzaChldmVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBkYXkpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5kYXRhLmRheXNEYXRhLmluZGV4T2YoZGF5KSxcclxuICAgICAgICAgICAgICAgIGV2ZW50SW5kZXggPSB0aGlzLmRhdGEuZGF5c0RhdGFbaW5kZXhdLmV2ZW50cy5pbmRleE9mKGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmRheXNEYXRhW2luZGV4XS5ldmVudHMuc3BsaWNlKGV2ZW50SW5kZXgsIDEpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiBtYWluVmlld1RlbXBsYXRlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1haW5WaWV3O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldy5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGNhbGVuZGFyIGRhdGE9XFxcIiRjdHJsLmRhdGEuZGF5c0RhdGFcXFwiIHNlbGVjdD1cXFwiJGN0cmwuc2VsZWN0RGF5KGluZGV4KVxcXCIgbmctaWY9XFxcIiEkY3RybC5kYXRhLnNlbGVjdGVkRGF5XFxcIj48L2NhbGVuZGFyPiA8c2VsZWN0ZWQtZGF5IGRhdGE9XFxcIiRjdHJsLmRhdGEuc2VsZWN0ZWREYXlcXFwiIG5nLWlmPVxcXCIkY3RybC5kYXRhLnNlbGVjdGVkRGF5XFxcIiB1bnNlbGVjdD1cXFwiJGN0cmwudW5zZWxlY3REYXkoKVxcXCIgYWRkPVxcXCIkY3RybC5hZGRFdmVudChldmVudCwgZGF5KVxcXCIgcmVtb3ZlPVxcXCIkY3RybC5yZW1vdmVFdmVudChldmVudCwgZGF5KVxcXCI+PC9zZWxlY3RlZC1kYXk+IDxtb2RhbC13aW5kb3c+PC9tb2RhbC13aW5kb3c+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm1haW4tdmlldy10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L3RlbXBsYXRlL21haW4tdmlldy10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjYWxlbmRhclRlbXBsYXRlID0gcmVxdWlyZSgnLi8uLi9jYWxlbmRhci1jb21wb25lbnQvdGVtcGxhdGUvY2FsZW5kYXItdGVtcGxhdGUuaHRtbCcpO1xuXG5jb25zdCBjYWxlbmRhciA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCcsXG4gICAgICAgIHNlbGVjdDogJyYnXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGU7XG4gICAgICAgIHRoaXMuZGF5TmFtZXMgPSBbJ9C/0L0nLCAn0LLRgicsICfRgdGAJywgJ9GH0YInLCAn0L/RgicsICfRgdCxJywgJ9Cy0YEnXVxuXG4gICAgICAgIHRoaXMuZ2V0RXZlbnRUZXh0ID0gZnVuY3Rpb24oZGF5KSB7XG4gICAgICAgICAgICBsZXQgbnVtYmVyT2ZFdmVudHMgPSBkYXkuZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChudW1iZXJPZkV2ZW50cyA+IDEpIHJldHVybiAn0JrQvtC70LjRh9C10YHRgtCy0L4g0YHQvtCx0YvRgtC40Lk6ICcgKyBudW1iZXJPZkV2ZW50cztcbiAgICAgICAgICAgIGlmIChkYXkuZXZlbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheS5ldmVudHNbMF0udGl0bGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHRlbXBsYXRlOiBjYWxlbmRhclRlbXBsYXRlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbGVuZGFyO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9jYWxlbmRhci1jb21wb25lbnQvY2FsZW5kYXIuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxoZWFkZXI+IDxkaXYgY2xhc3M9XFxcInRpdGxlXFxcIj4gPHNwYW4gY2xhc3M9XFxcIm1vbnRoXFxcIj57eyAkY3RybC5kYXRlLmdldE1vbnRoKCkgfCBtb250aEZpbHRlciB9fTwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwieWVhclxcXCI+e3sgJGN0cmwuZGF0ZS5nZXRGdWxsWWVhcigpIH19PC9zcGFuPiA8L2Rpdj4gPGRpdj4gPGRpdiBjbGFzcz1cXFwiZGF5LW5hbWVcXFwiIG5nLXJlcGVhdD1cXFwibmFtZSBpbiAkY3RybC5kYXlOYW1lc1xcXCI+e3tuYW1lfX08L2Rpdj4gPC9kaXY+IDwvaGVhZGVyPiA8c2VjdGlvbj4gPGRpdiBjbGFzcz1cXFwiZGF5XFxcIiBuZy1jbGFzcz1cXFwieydub3QtdGhpcy1tb250aCc6IGRheS5tb250aCAhPT0gJGN0cmwuZGF0ZS5nZXRNb250aCgpLCAnd2Vla2VuZCc6IGRheS5kYXkgPiA1fVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLnNlbGVjdCh7aW5kZXg6ICRpbmRleH0pXFxcIiBuZy1yZXBlYXQ9XFxcImRheSBpbiAkY3RybC5kYXRhXFxcIj4gPGRpdiBjbGFzcz1cXFwiZGF0ZVxcXCI+IDxzcGFuIG5nLWNsYXNzPVxcXCJ7J3RvZGF5JzogZGF5LnRvZGF5fVxcXCI+e3tkYXkuZGF0ZX19PC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnRzXFxcIiBuZy1pZj1cXFwiZGF5LmV2ZW50cy5sZW5ndGhcXFwiPiB7eyAkY3RybC5nZXRFdmVudFRleHQoZGF5KSB9fSA8L2Rpdj4gPC9kaXY+IDwvc2VjdGlvbj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwiY2FsZW5kYXItdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzZWxlY3RlZERheVRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbCcpO1xuXG5jb25zdCBzZWxlY3RlZERheSA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCcsXG4gICAgICAgIHVuc2VsZWN0OiAnJicsXG4gICAgICAgIGFkZDogJyYnLFxuICAgICAgICByZW1vdmU6ICcmJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24obW9kYWwsIGNyZWF0ZVRpbWVHcmlkLCBmb3JtRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50aW1lcyA9IGNyZWF0ZVRpbWVHcmlkKCk7XG5cbiAgICAgICAgdGhpcy5kYXRhLmV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gZXZlbnQudGltZS5zbGljZSgwLCAyKSAvIDE7XG4gICAgICAgICAgICB0aGlzLnRpbWVzW2luZGV4XS5ldmVudHMucHVzaChldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRhLmV2ZW50cy5sZW5ndGgpIG1vZGFsLm9wZW4oe3RpdGxlOiAn0KHQvtC+0LHRidC10L3QuNC1JywgbWVzc2FnZTogJ9Cd0LAg0LTQsNC90L3Ri9C5INC00LXQvdGMINC90LXRgiDQt9Cw0L/Qu9Cw0L3QuNGA0L7QstCw0L3QvdGL0YUg0YHQvtCx0YvRgtC40LknfSwgJ2FsZXJ0Jyk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudCA9IGZ1bmN0aW9uKGVkaXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEueWVhciA8IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSB8fCB0aGlzLmRhdGEubW9udGggPCBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgfHwgdGhpcy5kYXRhLmRhdGUgPCBuZXcgRGF0ZSgpLmdldERhdGUoKSkge1xuICAgICAgICAgICAgICAgIG1vZGFsLm9wZW4oe3RpdGxlOiAn0J7RiNC40LHQutCwJywgbWVzc2FnZTogJ9Cd0LXQu9GM0LfRjyDQtNC+0LHQsNCy0LjRgtGMINGB0L7QsdGL0YLQuNGPINC90LAg0L/RgNC+0YjQtdC00YjQuNC1INC00L3QuCd9LCAnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oe3RpdGxlOiAn0JLQstC10LTQuNGC0LUg0LTQsNC90L3Ri9C1JywgbWVzc2FnZTogJyd9LCAnYWRkLWV2ZW50JylcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBldmVudERhdGEgPSBKU09OLnBhcnNlKGRhdGEuZGF0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiAoJzAnICsgZXZlbnREYXRhLmhvdXJzKS5zbGljZSgtMikgKyAnOicgKyAoJzAnICsgZXZlbnREYXRhLm1pbnV0ZXMpLnNsaWNlKC0yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBldmVudERhdGEudGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBldmVudERhdGEuY29udGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbTogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZCh7ZXZlbnQ6IG9iaiwgZGF5OiB0aGlzLmRhdGF9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG9iai50aW1lLnNsaWNlKDAsIDIpIC8gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lc1tpbmRleF0uZXZlbnRzLnB1c2godGhpcy5kYXRhLmV2ZW50c1t0aGlzLmRhdGEuZXZlbnRzLmxlbmd0aCAtIDFdKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihpbmRleCwgdGltZSwgZGF5KSB7XG4gICAgICAgICAgICBpZiAodGltZS5ldmVudHNbaW5kZXhdLmN1c3RvbSkge1xuICAgICAgICAgICAgICAgIG1vZGFsLm9wZW4oe3RpdGxlOiAn0J7RiNC40LHQutCwJywgbWVzc2FnZTogJ9Cd0LXQu9GM0LfRjyDRg9C00LDQu9C40YLRjCDRgdC+0LHRi9GC0LjQtSd9LCAnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb2RhbC5vcGVuKHt0aXRsZTogJ9Cf0L7QtNGC0LLQtdGA0LTQuNGC0LUnLCBtZXNzYWdlOiAn0KPQtNCw0LvQuNGC0Ywg0LTQsNC90L3QvtC1INGB0L7QsdGL0YLQuNC1Pyd9LCAnY29uZmlybScpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh7ZXZlbnQ6IHRpbWUuZXZlbnRzW2luZGV4XSwgZGF5OiBkYXl9KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZUluZGV4ID0gdGhpcy50aW1lcy5pbmRleE9mKHRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVzW3RpbWVJbmRleF0uZXZlbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cblxuICAgIH0sXG4gICAgdGVtcGxhdGU6IHNlbGVjdGVkRGF5VGVtcGxhdGVcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHNlbGVjdGVkRGF5O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3NlbGVjdGVkLWRheS5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGhlYWRlciBjbGFzcz1cXFwiZ3JvdXAgc2VsZWN0ZWQtZGF5XFxcIj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPiA8c3BhbiBjbGFzcz1cXFwibW9udGhcXFwiPnt7ICRjdHJsLmRhdGEubW9udGggfCBtb250aEZpbHRlciB9fSB7eyAkY3RybC5kYXRhLmRhdGUgfX0sPC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ5ZWFyXFxcIj57eyAkY3RybC5kYXRhLnllYXIgfX08L3NwYW4+IDxkaXYgY2xhc3M9XFxcImRheVxcXCI+e3sgJGN0cmwuZGF0YS5kYXkgfCBkYXlGaWx0ZXJ9fTwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwibWVudVxcXCI+IDxkaXYgY2xhc3M9XFxcImJhY2tcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC51bnNlbGVjdCgpXFxcIj7QndCw0LfQsNC0PC9kaXY+IDxkaXYgY2xhc3M9XFxcImFkZC1ldmVudFxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmFkZEV2ZW50KClcXFwiPtCU0L7QsdCw0LLQuNGC0Ywg0YHQvtCx0YvRgtC40LU8L2Rpdj4gPC9kaXY+IDwvaGVhZGVyPiA8c2VjdGlvbj4gPGRpdiBjbGFzcz1cXFwidGltZXNcXFwiIG5nLXJlcGVhdD1cXFwidGltZSBpbiAkY3RybC50aW1lc1xcXCI+IDxkaXYgY2xhc3M9XFxcImhvdXJcXFwiPnt7IHRpbWUuaG91cnMgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnRzXFxcIiBuZy1jbGFzcz1cXFwieydhY3RpdmVUaW1lJzogdGltZS5ldmVudHMubGVuZ3RofVxcXCI+IDxkaXYgbmctcmVwZWF0PVxcXCJldmVudCBpbiB0aW1lLmV2ZW50c1xcXCIgY2xhc3M9XFxcImV2ZW50XFxcIj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtZGF0YVxcXCI+IDxkaXYgY2xhc3M9XFxcImV2ZW50LXRpbWVcXFwiPnt7IGV2ZW50LnRpbWUgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtdGl0bGVcXFwiPnt7IGV2ZW50LnRpdGxlIH19PC9kaXY+IDxkaXYgY2xhc3M9XFxcImV2ZW50LWNvbnRlbnRcXFwiPnt7IGV2ZW50LmNvbnRlbnQgfX08L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImV2ZW50LXJlbW92ZVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLnJlbW92ZUV2ZW50KCRpbmRleCwgdGltZSwgJGN0cmwuZGF0YSlcXFwiPlg8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9zZWN0aW9uPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJzZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBtb2RhbFRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9tb2RhbC10ZW1wbGF0ZS5odG1sJyk7XHJcblxyXG5jb25zdCBtb2RhbCA9IHtcclxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKG1vZGFsLCB2YWxpZGF0aW9uU2VydmljZSwgZm9ybURhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5tb2RhbFZpZXdEYXRhID0gbW9kYWwubW9kYWxWaWV3RGF0YTtcclxuICAgICAgICB0aGlzLmNoZWNrT3BlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kYWwuZ2V0U3RhdGUoKSA9PT0gJ29wZW4nO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jaGVja1R5cGUgPSBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RhbC5nZXRUeXBlKCkgPT09IHR5cGU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnR5cGUgPSBtb2RhbC5nZXRUeXBlO1xyXG5cclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25PYmogPSB2YWxpZGF0aW9uU2VydmljZS52YWxpZGF0aW9uT2JqO1xyXG5cclxuICAgICAgICB0aGlzLnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGZvcm1EYXRhU2VydmljZS5kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLmNsb3NlID0gZnVuY3Rpb24oYm9vbCwgZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEgJiYgIWJvb2wgJiYgbW9kYWwuZ2V0VHlwZSgpID09PSAnYWRkLWV2ZW50Jykge1xyXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblNlcnZpY2UucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhU2VydmljZS5jbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWRhdGEgfHwgIWJvb2wpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsLmNsb3NlKGJvb2wpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhbGlkYXRpb25TZXJ2aWNlLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGxldCBzdGF0dXMgPSB2YWxpZGF0aW9uU2VydmljZS52YWxpZGF0ZShkYXRhKTtcclxuICAgICAgICAgICAgaWYgKHN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgbW9kYWwuY2xvc2UoYm9vbCwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YVNlcnZpY2UuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6IG1vZGFsVGVtcGxhdGVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbW9kYWw7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21vZGFsLXdpbmRvdy1jb21wb25lbnQvbW9kYWwtd2luZG93LWNvbXBvbmVudC5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGRpdiBjbGFzcz1cXFwibW9kYWwtYmFja2dyb3VuZFxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrT3BlbigpXFxcIj4gPGRpdiBjbGFzcz1cXFwid2luZG93IGFuXFxcIiBuZy1pZj1cXFwiJGN0cmwuY2hlY2tPcGVuKClcXFwiPiA8ZGl2IGNsYXNzPVxcXCJ0aXRsZVxcXCI+e3sgJGN0cmwubW9kYWxWaWV3RGF0YS5kYXRhLnRpdGxlIH19PC9kaXY+IDxkaXYgY2xhc3M9XFxcIm1lc3NhZ2VcXFwiIG5nLWlmPVxcXCIhJGN0cmwuY2hlY2tUeXBlKCdhZGQtZXZlbnQnKVxcXCI+e3sgJGN0cmwubW9kYWxWaWV3RGF0YS5kYXRhLm1lc3NhZ2UgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwiYWRkLWZvcm1cXFwiIG5nLWlmPVxcXCIkY3RybC5jaGVja1R5cGUoJ2FkZC1ldmVudCcpXFxcIj4gPHRhYmxlPiA8dHIgY2xhc3M9XFxcImFkZC1mb3JtLXRpbWVcXFwiPiA8dGQ+0JLRgNC10LzRjzo8L3RkPiA8dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCIkY3RybC5kYXRhLmhvdXJzXFxcIj46PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCIkY3RybC5kYXRhLm1pbnV0ZXNcXFwiPjwvdGQ+IDx0ZCBuZy1pZj1cXFwiJGN0cmwudmFsaWRhdGlvbk9iai50aW1lLnN0YXR1c1xcXCIgY2xhc3M9XFxcIndhcm5pbmdcXFwiPnt7ICRjdHJsLnZhbGlkYXRpb25PYmoudGltZS5tZXNzYWdlIH19PC90ZD4gPC90cj4gPHRyIGNsYXNzPVxcXCJhZGQtZm9ybS10aXRsZVxcXCI+IDx0ZD7Ql9Cw0LPQvtC70L7QstC+0Lo6PC90ZD4gPHRkPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwiJGN0cmwuZGF0YS50aXRsZVxcXCI+PC90ZD4gPHRkIG5nLWlmPVxcXCIkY3RybC52YWxpZGF0aW9uT2JqLnRpdGxlLnN0YXR1c1xcXCIgY2xhc3M9XFxcIndhcm5pbmdcXFwiPnt7ICRjdHJsLnZhbGlkYXRpb25PYmoudGl0bGUubWVzc2FnZSB9fTwvdGQ+IDwvdHI+IDx0ciBjbGFzcz1cXFwiYWRkLWZvcm0tY29udGVudFxcXCI+IDx0ZD7QntC/0LjRgdCw0L3QuNC1OjwvdGQ+IDx0ZD48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIiRjdHJsLmRhdGEuY29udGVudFxcXCI+PC90ZD4gPHRkIG5nLWlmPVxcXCIkY3RybC52YWxpZGF0aW9uT2JqLmNvbnRlbnQuc3RhdHVzXFxcIiBjbGFzcz1cXFwid2FybmluZ1xcXCI+e3sgJGN0cmwudmFsaWRhdGlvbk9iai5jb250ZW50Lm1lc3NhZ2UgfX08L3RkPiA8L3RyPiA8L3RhYmxlPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiYnV0dG9ucyBncm91cFxcXCI+IDxkaXYgY2xhc3M9XFxcImNvbmZpcm1cXFwiIG5nLWlmPVxcXCIkY3RybC5jaGVja1R5cGUoJ2NvbmZpcm0nKVxcXCI+IDxkaXYgY2xhc3M9XFxcInJlamVjdFxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNsb3NlKClcXFwiPtCe0YLQvNC10L3QsDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJva1xcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNsb3NlKHRydWUpXFxcIj5PSzwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiYWxlcnRcXFwiIG5nLWlmPVxcXCIkY3RybC5jaGVja1R5cGUoJ2FsZXJ0JylcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSgpXFxcIj7Ql9Cw0LrRgNGL0YLRjDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJhZGQtZXZlbnRcXFwiIG5nLWlmPVxcXCIkY3RybC5jaGVja1R5cGUoJ2FkZC1ldmVudCcpXFxcIj4gPGRpdiBjbGFzcz1cXFwicmVqZWN0XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UoKVxcXCI+0J7RgtC80LXQvdCwPC9kaXY+IDxkaXYgY2xhc3M9XFxcIm9rXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UodHJ1ZSwgJGN0cmwuZGF0YSlcXFwiPtCh0L7RhdGA0LDQvdC40YLRjDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImNsb3NlXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UoKVxcXCI+eDwvZGl2PiA8L2Rpdj4gPC9kaXY+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm1vZGFsLXRlbXBsYXRlLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21vZGFsLXdpbmRvdy1jb21wb25lbnQvdGVtcGxhdGUvbW9kYWwtdGVtcGxhdGUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG1vbnRoKSB7XG4gICAgICAgIG1vbnRoID0gbW9udGggKyAxO1xuICAgICAgICBzd2l0Y2ggKG1vbnRoKSB7XG4gICAgICAgICAgICBjYXNlIDE6IG1vbnRoID0gJ9Cv0L3QstCw0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6IG1vbnRoID0gJ9Ck0LXQstGA0LDQu9GMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzogbW9udGggPSAn0JzQsNGA0YInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OiBtb250aCA9ICfQkNC/0YDQtdC70YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OiBtb250aCA9ICfQnNCw0LknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OiBtb250aCA9ICfQmNGO0L3RjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6IG1vbnRoID0gJ9CY0Y7Qu9GMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODogbW9udGggPSAn0JDQstCz0YPRgdGCJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTogbW9udGggPSAn0KHQtdC90YLRj9Cx0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwIDogbW9udGggPSAn0J7QutGC0Y/QsdGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMTogbW9udGggPSAn0J3QvtGP0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6IG1vbnRoID0gJ9CU0LXQutCw0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vbnRoO1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL21vbnRoLWZpbHRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZGF5KSB7XG4gICAgICAgIHN3aXRjaCAoZGF5KSB7XG4gICAgICAgICAgICBjYXNlIDE6IGRheSA9ICfQn9C+0L3QtdC00LXQu9GM0L3QuNC6JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjogZGF5ID0gJ9CS0YLQvtGA0L3QuNC6JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzogZGF5ID0gJ9Ch0YDQtdC00LAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OiBkYXkgPSAn0KfQtdGC0LLQtdGA0LMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OiBkYXkgPSAn0J/Rj9GC0L3QuNGG0LAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OiBkYXkgPSAn0KHRg9Cx0LHQvtGC0LAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3OiBkYXkgPSAn0JLQvtGB0LrRgNC10YHQtdC90LjQtSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF5O1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL2RheS1maWx0ZXIuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBQ0E7QUFLQTs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBO0FBWEE7QUFDQTs7QUFWQTtBQUNBO0FBeUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFQQTtBQUNBO0FBY0E7QUF6QkE7QUFDQTs7QUEzQkE7QUFDQTtBQXdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTtBQVpBO0FBQ0E7QUFjQTtBQXhFQTtBQURBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBQ0E7QUFRQTtBQVpBO0FBREE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSkE7QUFDQTtBQVNBO0FBQ0E7QUFDQTtBQURBO0FBSUE7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQXJDQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQVZBO0FBQ0E7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQTNCQTtBQUNBO0FBNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQXZEQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQXRCQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFsQkE7QUF3QkE7QUF6QkE7QUFDQTtBQTJCQTs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUhBO0FBSEE7QUFKQTtBQWNBO0FBbkJBO0FBQ0E7QUFxQkE7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFFQTtBQUNBO0FBZEE7QUFQQTtBQUNBO0FBeUJBOzs7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU5BO0FBcENBO0FBb0RBO0FBM0RBO0FBNkRBOzs7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBWEE7QUFsQkE7QUFxQ0E7QUF0Q0E7QUFDQTtBQXdDQTs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFLQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBUkE7QUFTQTtBQUNBO0FBVkE7QUFXQTtBQUNBO0FBWkE7QUFhQTtBQUNBO0FBZEE7QUFlQTtBQUNBO0FBaEJBO0FBaUJBO0FBQ0E7QUFsQkE7QUFtQkE7QUFDQTtBQXBCQTtBQXFCQTtBQUNBO0FBdEJBO0FBdUJBO0FBQ0E7QUF4QkE7QUFDQTtBQTBCQTtBQTdCQTtBQURBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFLQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBUkE7QUFTQTtBQUNBO0FBVkE7QUFXQTtBQUNBO0FBWkE7QUFhQTtBQUNBO0FBZEE7QUFDQTtBQWdCQTtBQWxCQTtBQURBOzs7Iiwic291cmNlUm9vdCI6IiJ9