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

	var calendar = angular.module('calendar', ['ngAnimate']);

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
	var v1="<calendar data=\"$ctrl.data.daysData\" select=\"$ctrl.selectDay(index)\" selected=\"$ctrl.data.selectedDay\"></calendar> <div class=\"selected\" ng-if=\"$ctrl.data.selectedDay\"> <selected-day data=\"$ctrl.data.selectedDay\" unselect=\"$ctrl.unselectDay()\" add=\"$ctrl.addEvent(event, day)\" remove=\"$ctrl.removeEvent(event, day)\"></selected-day> </div> <modal-window></modal-window>";
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
	        select: '&',
	        selected: '<'
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
	var v1="<div class=\"calendar\" ng-if=\"!$ctrl.selected\"> <header> <div class=\"title\"> <span class=\"month\">{{ $ctrl.date.getMonth() | monthFilter }}</span>\n<span class=\"year\">{{ $ctrl.date.getFullYear() }}</span> </div> <div> <div class=\"day-name\" ng-repeat=\"name in $ctrl.dayNames\">{{name}}</div> </div> </header> <section> <div class=\"day\" ng-class=\"{'not-this-month': day.month !== $ctrl.date.getMonth(), 'weekend': day.day > 5}\" ng-click=\"$ctrl.select({index: $index})\" ng-repeat=\"day in $ctrl.data\"> <div class=\"date\"> <span ng-class=\"{'today': day.today}\">{{day.date}}</span> </div> <div class=\"events\" ng-if=\"day.events.length\"> {{ $ctrl.getEventText(day) }} </div> </div> </section> </div>";
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
	            if (edit) {
	                if (edit.time.events[edit.index].custom) {
	                    return;
	                }
	                formDataService.setData(edit.time.events[edit.index]);
	            }
	            modal.open({ title: 'Введите данные', message: '' }, 'add-event').then(function (data) {
	                if (edit) {
	                    _this2.remove({ event: edit.time.events[edit.index], day: edit.day });
	                    var timeIndex = _this2.times.indexOf(edit.time);
	                    _this2.times[timeIndex].events.splice(edit.index, 1);
	                }
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

	        this.editEvent = function (data) {
	            this.addEvent(data);
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
	var v1="<header class=\"group selected-day\"> <div class=\"title\"> <span class=\"month\">{{ $ctrl.data.month | monthFilter }} {{ $ctrl.data.date }},</span>\n<span class=\"year\">{{ $ctrl.data.year }}</span> <div class=\"day\">{{ $ctrl.data.day | dayFilter}}</div> </div> <div class=\"menu\"> <div class=\"back\" ng-click=\"$ctrl.unselect()\">Назад</div> <div class=\"add-event\" ng-click=\"$ctrl.addEvent()\">Добавить событие</div> </div> </header> <section> <div class=\"times\" ng-repeat=\"time in $ctrl.times\"> <div class=\"hour\">{{ time.hours }}</div> <div class=\"events\" ng-class=\"{'activeTime': time.events.length}\"> <div ng-repeat=\"event in time.events\" class=\"event\"> <div ng-click=\"$ctrl.editEvent({index: $index, time: time, day: $ctrl.data})\" class=\"event-data\"> <div class=\"event-time\">{{ event.time }}</div> <div class=\"event-title\">{{ event.title }}</div> <div class=\"event-content\">{{ event.content }}</div> </div> <div class=\"event-remove\" ng-click=\"$ctrl.removeEvent($index, time, $ctrl.data)\">X</div> </div> </div> </div> </section>";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGQ2MjAwODUzMTg1NWRjM2MxZGQxIiwid2VicGFjazovLy9qcy9jYWxlbmRhci1hcHAuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL2RhdGEtZ2VuZXJhdG9yLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL21vZGFsLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy92YWxpZGF0aW9uLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy9hZGQtZm9ybS1kYXRhLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWwiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3NlbGVjdGVkLWRheS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21vZGFsLXdpbmRvdy1jb21wb25lbnQvbW9kYWwtd2luZG93LWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbW9kYWwtd2luZG93LWNvbXBvbmVudC90ZW1wbGF0ZS9tb2RhbC10ZW1wbGF0ZS5odG1sIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvbW9udGgtZmlsdGVyLmpzIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvZGF5LWZpbHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ2MjAwODUzMTg1NWRjM2MxZGQxXG4gKiovIiwicmVxdWlyZSgnLi9hcHAnKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jYWxlbmRhci1hcHAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBjYWxlbmRhciA9IGFuZ3VsYXIubW9kdWxlKCdjYWxlbmRhcicsIFsnbmdBbmltYXRlJ10pO1xyXG5cclxuY2FsZW5kYXJcclxuICAgIC5mYWN0b3J5KCdkYXRhR2VuZXJhdG9yJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9kYXRhLWdlbmVyYXRvci1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgnY3JlYXRlVGltZUdyaWQnLCByZXF1aXJlKCcuL3NlcnZpY2VzL3RpbWUtZ3JpZC1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgnbW9kYWwnLCByZXF1aXJlKCcuL3NlcnZpY2VzL21vZGFsLXNlcnZpY2UnKSlcclxuICAgIC5mYWN0b3J5KCd2YWxpZGF0aW9uU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvdmFsaWRhdGlvbi1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgnZm9ybURhdGFTZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9hZGQtZm9ybS1kYXRhLXNlcnZpY2UnKSk7XHJcblxyXG5jYWxlbmRhclxyXG4gICAgLmNvbXBvbmVudCgnbWFpblZpZXcnLCByZXF1aXJlKCcuL21haW4tdmlldy1jb21wb25lbnQvbWFpbi12aWV3JykpXHJcbiAgICAuY29tcG9uZW50KCdjYWxlbmRhcicsIHJlcXVpcmUoJy4vY2FsZW5kYXItY29tcG9uZW50L2NhbGVuZGFyJykpXHJcbiAgICAuY29tcG9uZW50KCdzZWxlY3RlZERheScsIHJlcXVpcmUoJy4vc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC9zZWxlY3RlZC1kYXknKSlcclxuICAgIC5jb21wb25lbnQoJ21vZGFsV2luZG93JywgcmVxdWlyZSgnLi9tb2RhbC13aW5kb3ctY29tcG9uZW50L21vZGFsLXdpbmRvdy1jb21wb25lbnQnKSk7XHJcblxyXG5jYWxlbmRhclxyXG4gICAgLmZpbHRlcignbW9udGhGaWx0ZXInLCByZXF1aXJlKCcuL3NlcnZpY2VzL21vbnRoLWZpbHRlcicpKVxyXG4gICAgLmZpbHRlcignZGF5RmlsdGVyJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9kYXktZmlsdGVyJykpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBkYXRhQXJyYXkgPSBbXSxcbiAgICAgICAgICAgIGRhdGVOb3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDRh9C40YHQu9CwINC/0YDQtdC00YvQtNGD0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBmaXJzdERheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpLCAxKSxcbiAgICAgICAgICAgIHByZXZpb3VzTW9udGhMYXN0RGF5ID0gbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXREYXRlKCksXG4gICAgICAgICAgICBudW1iZXJPZlBhc3REYXlzID0gKGZpcnN0RGF5LmdldERheSgpIHx8IDcpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUGFzdERheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgZGF0ZTogcHJldmlvdXNNb250aExhc3REYXkgLSBpLFxuICAgICAgICAgICAgICAgIGRheTogbnVtYmVyT2ZQYXN0RGF5cyAtIGksXG4gICAgICAgICAgICAgICAgeWVhcjogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtb250aDogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgY3VzdG9tRXZlbnRzOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGF0YUFycmF5LnVuc2hpZnQoZGF5RGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0YfQuNGB0LvQsCDQvNC10YHRj9GG0LBcbiAgICAgICAgbGV0IG51bWJlck9mRGF5cyA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZEYXlzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBkYXkgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSwgaSArIDEpLFxuICAgICAgICAgICAgICAgIGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGRheTogZGF5LmdldERheSgpIHx8IDcsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5OiBkYXkuZ2V0RGF0ZSgpID09PSBkYXRlTm93LmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRheS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaSA9PT0gMTUpIHtcbiAgICAgICAgICAgICAgICBkYXlEYXRhLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGltZTogJzEwOjIwJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdNeSBuZXcgZXZlbnQnLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAnSGVsbG8/IGRkc2Rhc2RrbDtrO2xhcyBhc2RrO3cgZHNkYXNka2w7aztsYXMgIGRzZGFzZGtsO2s7bGFzICBkc2Rhc2RrbDtrO2xhcyAnLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b206IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGF5RGF0YS5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpbWU6ICcxMDoyMCcsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTXkgbmV3IGV2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ0hlbGxvPyBkZHNkYXNka2w7aztsYXMgYXNkazt3IGRzZGFzZGtsO2s7bGFzICBkc2Rhc2RrbDtrO2xhcyAgZHNkYXNka2w7aztsYXMgJyxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKGRheURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/QtNC+0LHQsNCy0LjRgtGMINC00L3QuCDRgdC70LXQtNGD0Y7RidC10LPQviDQvNC10YHRj9GG0LBcbiAgICAgICAgbGV0IG51bWJlck9mRnV0dXJlRGF5cyA9IDcgLSBkYXRhQXJyYXkubGVuZ3RoICUgNztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mRnV0dXJlRGF5czsgaSArPSAxKSB7XG4gICAgICAgICAgICBsZXQgZGF5ID0gbmV3IERhdGUoZGF0ZU5vdy5nZXRGdWxsWWVhcigpLCBkYXRlTm93LmdldE1vbnRoKCkgKyAxLCBpICsgMSksXG4gICAgICAgICAgICAgICAgZGF5RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZTogZGF5LmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgZGF5OiBkYXkuZ2V0RGF5KCkgfHwgNyxcbiAgICAgICAgICAgICAgICAgICAgdG9kYXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBtb250aDogZGF5LmdldE1vbnRoKCksXG4gICAgICAgICAgICAgICAgICAgIHllYXI6IGRheS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgICAgICBldmVudHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21FdmVudHM6IFtdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGF0YUFycmF5LnB1c2goZGF5RGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YUFycmF5O1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL2RhdGEtZ2VuZXJhdG9yLXNlcnZpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxldCBhcnJheSA9IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI0OyBpICs9IDEpIHtcclxuICAgICAgICAgICAgbGV0IGhvdXJzID0gKCcwJyArIGkpLnNsaWNlKC0yKSArICc6MDAnO1xyXG5cclxuICAgICAgICAgICAgYXJyYXkucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBob3VyczogaG91cnMsXHJcbiAgICAgICAgICAgICAgICBldmVudHM6IFtdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCRxKSB7XHJcbiAgICBsZXQgc3RhdGUgPSAnY2xvc2UnLFxyXG4gICAgICAgIHR5cGUgPSBudWxsLFxyXG4gICAgICAgIGRlZmVyO1xyXG5cclxuICAgIGxldCBtb2RhbFZpZXdEYXRhID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFR5cGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlbihkYXRhLCBtb2RhbF90eXBlKSB7XHJcbiAgICAgICAgbW9kYWxWaWV3RGF0YS5kYXRhID0gZGF0YTtcclxuICAgICAgICB0eXBlID0gbW9kYWxfdHlwZTtcclxuICAgICAgICBzdGF0ZSA9ICdvcGVuJztcclxuICAgICAgICBpZiAobW9kYWxfdHlwZSA9PT0gJ2NvbmZpcm0nIHx8IG1vZGFsX3R5cGUgPT09ICdhZGQtZXZlbnQnKSB7XHJcbiAgICAgICAgICAgIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlKGJvb2wsIGRhdGEpIHtcclxuICAgICAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkgZGVmZXIucmVzb2x2ZSh7ZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSl9KTtcclxuICAgICAgICAgICAgZWxzZSBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29uZmlybScgJiYgdHlwZSA9PT0gJ2FkZC1ldmVudCcpIHtcclxuICAgICAgICAgICAgZGVmZXIucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRlID0gJ2Nsb3NlJztcclxuICAgICAgICB0eXBlID0gbnVsbDtcclxuICAgICAgICBkZWxldGUgbW9kYWxWaWV3RGF0YS5kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbW9kYWxWaWV3RGF0YTogbW9kYWxWaWV3RGF0YSxcclxuICAgICAgICBnZXRTdGF0ZTogZ2V0U3RhdGUsXHJcbiAgICAgICAgZ2V0VHlwZTogZ2V0VHlwZSxcclxuICAgICAgICBvcGVuOiBvcGVuLFxyXG4gICAgICAgIGNsb3NlOiBjbG9zZVxyXG4gICAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9tb2RhbC1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWxpZGF0aW9uT2JqID0ge1xuICAgICAgICBzdGF0dXM6IHRydWUsXG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICB9LFxuICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKGRhdGEpIHtcbiAgICAgICAgaWYgKCFkYXRhLmhvdXJzIHx8ICFkYXRhLm1pbnV0ZXMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmouc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5tZXNzYWdlID0gJ9CS0LLQtdC00LjRgtC1INGH0LDRgdGLINC4INC80LjQvdGD0YLRiyc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNOYU4oK2RhdGEuaG91cnMpIHx8IGlzTmFOKCtkYXRhLm1pbnV0ZXMpKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUubWVzc2FnZSA9ICfQp9Cw0YHRiyDQuCDQvNC40L3Rg9GC0Ysg0LTQvtC70LbQvdGLINCx0YvRgtGMINGH0LjRgdC70LDQvNC4JztcbiAgICAgICAgfSBlbHNlIGlmICgrZGF0YS5ob3VycyA8IDAgfHwgK2RhdGEuaG91cnMgPiAyMyB8fCArZGF0YS5taW51dGVzIDwgMCB8fCArZGF0YS5taW51dGVzID4gNTkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmouc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5tZXNzYWdlID0gJ9CS0LLQtdC00LjRgtC1INC60L7RgNGA0LXQutGC0L3QvtC1INCy0YDQtdC80Y8nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFkYXRhLnRpdGxlKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aXRsZS5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aXRsZS5tZXNzYWdlID0gJ9CS0LLQtdC00LjRgtC1INC30LDQs9C+0LvQvtCy0L7Quic7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YS5jb250ZW50ICYmIGRhdGEuY29udGVudC5zcGxpdCgnICcpLmxlbmd0aCA8IDUpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmouc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLmNvbnRlbnQuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmouY29udGVudC5tZXNzYWdlID0gJ9CU0L7Qu9C20L3QviDQsdGL0YLRjCAwINC70LjQsdC+IDUg0YHQu9C+0LInO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25PYmouc3RhdHVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IHRydWU7XG4gICAgICAgIHZhbGlkYXRpb25PYmouY29udGVudC5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICB2YWxpZGF0aW9uT2JqLnRpdGxlLnN0YXR1cyA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdmFsaWRhdGlvbk9iajogdmFsaWRhdGlvbk9iaixcbiAgICAgICAgdmFsaWRhdGU6IHZhbGlkYXRlLFxuICAgICAgICByZXNldDogcmVzZXRcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy92YWxpZGF0aW9uLXNlcnZpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgICAgaG91cnM6ICcnLFxyXG4gICAgICAgIG1pbnV0ZXM6ICcnLFxyXG4gICAgICAgIHRpdGxlOiAnJyxcclxuICAgICAgICBjb250ZW50OiAnJ1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhckRhdGEoKSB7XHJcbiAgICAgICAgZGF0YS5ob3VycyA9ICcnO1xyXG4gICAgICAgIGRhdGEubWludXRlcyA9ICcnO1xyXG4gICAgICAgIGRhdGEudGl0bGUgPSAnJztcclxuICAgICAgICBkYXRhLmNvbnRlbnQgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXREYXRhKGZvcm1EYXRhKSB7XHJcbiAgICAgICAgZGF0YS5ob3VycyA9IGZvcm1EYXRhLnRpbWUuc2xpY2UoMCwgMik7XHJcbiAgICAgICAgZGF0YS5taW51dGVzID0gZm9ybURhdGEudGltZS5zbGljZSgtMik7XHJcbiAgICAgICAgZGF0YS50aXRsZSA9IGZvcm1EYXRhLnRpdGxlO1xyXG4gICAgICAgIGRhdGEuY29udGVudCA9IGZvcm1EYXRhLmNvbnRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgIGNsZWFyRGF0YTogY2xlYXJEYXRhLFxyXG4gICAgICAgIHNldERhdGE6IHNldERhdGFcclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvYWRkLWZvcm0tZGF0YS1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgbWFpblZpZXdUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvbWFpbi12aWV3LXRlbXBsYXRlLmh0bWwnKTtcclxuXHJcbmNvbnN0IG1haW5WaWV3ID0ge1xyXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oZGF0YUdlbmVyYXRvcikge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICAgICAgZGF5c0RhdGE6IGRhdGFHZW5lcmF0b3IoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0RGF5ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkRGF5ID0gdGhpcy5kYXRhLmRheXNEYXRhW2luZGV4XVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMudW5zZWxlY3REYXkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5zZWxlY3RlZERheTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIGRheSkge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGEuZGF5c0RhdGEuaW5kZXhPZihkYXkpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuZGF5c0RhdGFbaW5kZXhdLmV2ZW50cy5wdXNoKGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIGRheSkge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGEuZGF5c0RhdGEuaW5kZXhPZihkYXkpLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRJbmRleCA9IHRoaXMuZGF0YS5kYXlzRGF0YVtpbmRleF0uZXZlbnRzLmluZGV4T2YoZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuZGF5c0RhdGFbaW5kZXhdLmV2ZW50cy5zcGxpY2UoZXZlbnRJbmRleCwgMSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6IG1haW5WaWV3VGVtcGxhdGVcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWFpblZpZXc7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21haW4tdmlldy1jb21wb25lbnQvbWFpbi12aWV3LmpzXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8Y2FsZW5kYXIgZGF0YT1cXFwiJGN0cmwuZGF0YS5kYXlzRGF0YVxcXCIgc2VsZWN0PVxcXCIkY3RybC5zZWxlY3REYXkoaW5kZXgpXFxcIiBzZWxlY3RlZD1cXFwiJGN0cmwuZGF0YS5zZWxlY3RlZERheVxcXCI+PC9jYWxlbmRhcj4gPGRpdiBjbGFzcz1cXFwic2VsZWN0ZWRcXFwiIG5nLWlmPVxcXCIkY3RybC5kYXRhLnNlbGVjdGVkRGF5XFxcIj4gPHNlbGVjdGVkLWRheSBkYXRhPVxcXCIkY3RybC5kYXRhLnNlbGVjdGVkRGF5XFxcIiB1bnNlbGVjdD1cXFwiJGN0cmwudW5zZWxlY3REYXkoKVxcXCIgYWRkPVxcXCIkY3RybC5hZGRFdmVudChldmVudCwgZGF5KVxcXCIgcmVtb3ZlPVxcXCIkY3RybC5yZW1vdmVFdmVudChldmVudCwgZGF5KVxcXCI+PC9zZWxlY3RlZC1kYXk+IDwvZGl2PiA8bW9kYWwtd2luZG93PjwvbW9kYWwtd2luZG93PlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJtYWluLXZpZXctdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY2FsZW5kYXJUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vLi4vY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWwnKTtcblxuY29uc3QgY2FsZW5kYXIgPSB7XG4gICAgYmluZGluZ3M6IHtcbiAgICAgICAgZGF0YTogJzwnLFxuICAgICAgICBzZWxlY3Q6ICcmJyxcbiAgICAgICAgc2VsZWN0ZWQ6ICc8J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlO1xuICAgICAgICB0aGlzLmRheU5hbWVzID0gWyfQv9C9JywgJ9Cy0YInLCAn0YHRgCcsICfRh9GCJywgJ9C/0YInLCAn0YHQsScsICfQstGBJ11cblxuICAgICAgICB0aGlzLmdldEV2ZW50VGV4dCA9IGZ1bmN0aW9uKGRheSkge1xuICAgICAgICAgICAgbGV0IG51bWJlck9mRXZlbnRzID0gZGF5LmV2ZW50cy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobnVtYmVyT2ZFdmVudHMgPiAxKSByZXR1cm4gJ9Ca0L7Qu9C40YfQtdGB0YLQstC+INGB0L7QsdGL0YLQuNC5OiAnICsgbnVtYmVyT2ZFdmVudHM7XG4gICAgICAgICAgICBpZiAoZGF5LmV2ZW50c1swXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXkuZXZlbnRzWzBdLnRpdGxlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogY2FsZW5kYXJUZW1wbGF0ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYWxlbmRhcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L2NhbGVuZGFyLmpzXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2IGNsYXNzPVxcXCJjYWxlbmRhclxcXCIgbmctaWY9XFxcIiEkY3RybC5zZWxlY3RlZFxcXCI+IDxoZWFkZXI+IDxkaXYgY2xhc3M9XFxcInRpdGxlXFxcIj4gPHNwYW4gY2xhc3M9XFxcIm1vbnRoXFxcIj57eyAkY3RybC5kYXRlLmdldE1vbnRoKCkgfCBtb250aEZpbHRlciB9fTwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwieWVhclxcXCI+e3sgJGN0cmwuZGF0ZS5nZXRGdWxsWWVhcigpIH19PC9zcGFuPiA8L2Rpdj4gPGRpdj4gPGRpdiBjbGFzcz1cXFwiZGF5LW5hbWVcXFwiIG5nLXJlcGVhdD1cXFwibmFtZSBpbiAkY3RybC5kYXlOYW1lc1xcXCI+e3tuYW1lfX08L2Rpdj4gPC9kaXY+IDwvaGVhZGVyPiA8c2VjdGlvbj4gPGRpdiBjbGFzcz1cXFwiZGF5XFxcIiBuZy1jbGFzcz1cXFwieydub3QtdGhpcy1tb250aCc6IGRheS5tb250aCAhPT0gJGN0cmwuZGF0ZS5nZXRNb250aCgpLCAnd2Vla2VuZCc6IGRheS5kYXkgPiA1fVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLnNlbGVjdCh7aW5kZXg6ICRpbmRleH0pXFxcIiBuZy1yZXBlYXQ9XFxcImRheSBpbiAkY3RybC5kYXRhXFxcIj4gPGRpdiBjbGFzcz1cXFwiZGF0ZVxcXCI+IDxzcGFuIG5nLWNsYXNzPVxcXCJ7J3RvZGF5JzogZGF5LnRvZGF5fVxcXCI+e3tkYXkuZGF0ZX19PC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnRzXFxcIiBuZy1pZj1cXFwiZGF5LmV2ZW50cy5sZW5ndGhcXFwiPiB7eyAkY3RybC5nZXRFdmVudFRleHQoZGF5KSB9fSA8L2Rpdj4gPC9kaXY+IDwvc2VjdGlvbj4gPC9kaXY+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcImNhbGVuZGFyLXRlbXBsYXRlLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL2NhbGVuZGFyLWNvbXBvbmVudC90ZW1wbGF0ZS9jYWxlbmRhci10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgc2VsZWN0ZWREYXlUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvc2VsZWN0ZWQtZGF5LXRlbXBsYXRlLmh0bWwnKTtcblxuY29uc3Qgc2VsZWN0ZWREYXkgPSB7XG4gICAgYmluZGluZ3M6IHtcbiAgICAgICAgZGF0YTogJzwnLFxuICAgICAgICB1bnNlbGVjdDogJyYnLFxuICAgICAgICBhZGQ6ICcmJyxcbiAgICAgICAgcmVtb3ZlOiAnJidcbiAgICB9LFxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKG1vZGFsLCBjcmVhdGVUaW1lR3JpZCwgZm9ybURhdGFTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudGltZXMgPSBjcmVhdGVUaW1lR3JpZCgpO1xuXG4gICAgICAgIHRoaXMuZGF0YS5ldmVudHMuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGV2ZW50LnRpbWUuc2xpY2UoMCwgMikgLyAxO1xuICAgICAgICAgICAgdGhpcy50aW1lc1tpbmRleF0uZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXRoaXMuZGF0YS5ldmVudHMubGVuZ3RoKSBtb2RhbC5vcGVuKHt0aXRsZTogJ9Ch0L7QvtCx0YnQtdC90LjQtScsIG1lc3NhZ2U6ICfQndCwINC00LDQvdC90YvQuSDQtNC10L3RjCDQvdC10YIg0LfQsNC/0LvQsNC90LjRgNC+0LLQsNC90L3Ri9GFINGB0L7QsdGL0YLQuNC5J30sICdhbGVydCcpO1xuXG4gICAgICAgIHRoaXMuYWRkRXZlbnQgPSBmdW5jdGlvbihlZGl0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnllYXIgPCBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgfHwgdGhpcy5kYXRhLm1vbnRoIDwgbmV3IERhdGUoKS5nZXRNb250aCgpIHx8IHRoaXMuZGF0YS5kYXRlIDwgbmV3IERhdGUoKS5nZXREYXRlKCkpIHtcbiAgICAgICAgICAgICAgICBtb2RhbC5vcGVuKHt0aXRsZTogJ9Ce0YjQuNCx0LrQsCcsIG1lc3NhZ2U6ICfQndC10LvRjNC30Y8g0LTQvtCx0LDQstC40YLRjCDRgdC+0LHRi9GC0LjRjyDQvdCwINC/0YDQvtGI0LXQtNGI0LjQtSDQtNC90LgnfSwgJ2FsZXJ0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVkaXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdC50aW1lLmV2ZW50c1tlZGl0LmluZGV4XS5jdXN0b20pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3JtRGF0YVNlcnZpY2Uuc2V0RGF0YShlZGl0LnRpbWUuZXZlbnRzW2VkaXQuaW5kZXhdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kYWwub3Blbih7dGl0bGU6ICfQktCy0LXQtNC40YLQtSDQtNCw0L3QvdGL0LUnLCBtZXNzYWdlOiAnJ30sICdhZGQtZXZlbnQnKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVkaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHtldmVudDogZWRpdC50aW1lLmV2ZW50c1tlZGl0LmluZGV4XSwgZGF5OiBlZGl0LmRheX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVJbmRleCA9IHRoaXMudGltZXMuaW5kZXhPZihlZGl0LnRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lc1t0aW1lSW5kZXhdLmV2ZW50cy5zcGxpY2UoZWRpdC5pbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2ZW50RGF0YSA9IEpTT04ucGFyc2UoZGF0YS5kYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICgnMCcgKyBldmVudERhdGEuaG91cnMpLnNsaWNlKC0yKSArICc6JyArICgnMCcgKyBldmVudERhdGEubWludXRlcykuc2xpY2UoLTIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGV2ZW50RGF0YS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGV2ZW50RGF0YS5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKHtldmVudDogb2JqLCBkYXk6IHRoaXMuZGF0YX0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gb2JqLnRpbWUuc2xpY2UoMCwgMikgLyAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVzW2luZGV4XS5ldmVudHMucHVzaCh0aGlzLmRhdGEuZXZlbnRzW3RoaXMuZGF0YS5ldmVudHMubGVuZ3RoIC0gMV0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGluZGV4LCB0aW1lLCBkYXkpIHtcbiAgICAgICAgICAgIGlmICh0aW1lLmV2ZW50c1tpbmRleF0uY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgbW9kYWwub3Blbih7dGl0bGU6ICfQntGI0LjQsdC60LAnLCBtZXNzYWdlOiAn0J3QtdC70YzQt9GPINGD0LTQsNC70LjRgtGMINGB0L7QsdGL0YLQuNC1J30sICdhbGVydCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oe3RpdGxlOiAn0J/QvtC00YLQstC10YDQtNC40YLQtScsIG1lc3NhZ2U6ICfQo9C00LDQu9C40YLRjCDQtNCw0L3QvdC+0LUg0YHQvtCx0YvRgtC40LU/J30sICdjb25maXJtJylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHtldmVudDogdGltZS5ldmVudHNbaW5kZXhdLCBkYXk6IGRheX0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lSW5kZXggPSB0aGlzLnRpbWVzLmluZGV4T2YodGltZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXNbdGltZUluZGV4XS5ldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmVkaXRFdmVudCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnQoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRlbXBsYXRlOiBzZWxlY3RlZERheVRlbXBsYXRlXG59O1xubW9kdWxlLmV4cG9ydHMgPSBzZWxlY3RlZERheTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC9zZWxlY3RlZC1kYXkuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxoZWFkZXIgY2xhc3M9XFxcImdyb3VwIHNlbGVjdGVkLWRheVxcXCI+IDxkaXYgY2xhc3M9XFxcInRpdGxlXFxcIj4gPHNwYW4gY2xhc3M9XFxcIm1vbnRoXFxcIj57eyAkY3RybC5kYXRhLm1vbnRoIHwgbW9udGhGaWx0ZXIgfX0ge3sgJGN0cmwuZGF0YS5kYXRlIH19LDwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwieWVhclxcXCI+e3sgJGN0cmwuZGF0YS55ZWFyIH19PC9zcGFuPiA8ZGl2IGNsYXNzPVxcXCJkYXlcXFwiPnt7ICRjdHJsLmRhdGEuZGF5IHwgZGF5RmlsdGVyfX08L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcIm1lbnVcXFwiPiA8ZGl2IGNsYXNzPVxcXCJiYWNrXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwudW5zZWxlY3QoKVxcXCI+0J3QsNC30LDQtDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJhZGQtZXZlbnRcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5hZGRFdmVudCgpXFxcIj7QlNC+0LHQsNCy0LjRgtGMINGB0L7QsdGL0YLQuNC1PC9kaXY+IDwvZGl2PiA8L2hlYWRlcj4gPHNlY3Rpb24+IDxkaXYgY2xhc3M9XFxcInRpbWVzXFxcIiBuZy1yZXBlYXQ9XFxcInRpbWUgaW4gJGN0cmwudGltZXNcXFwiPiA8ZGl2IGNsYXNzPVxcXCJob3VyXFxcIj57eyB0aW1lLmhvdXJzIH19PC9kaXY+IDxkaXYgY2xhc3M9XFxcImV2ZW50c1xcXCIgbmctY2xhc3M9XFxcInsnYWN0aXZlVGltZSc6IHRpbWUuZXZlbnRzLmxlbmd0aH1cXFwiPiA8ZGl2IG5nLXJlcGVhdD1cXFwiZXZlbnQgaW4gdGltZS5ldmVudHNcXFwiIGNsYXNzPVxcXCJldmVudFxcXCI+IDxkaXYgbmctY2xpY2s9XFxcIiRjdHJsLmVkaXRFdmVudCh7aW5kZXg6ICRpbmRleCwgdGltZTogdGltZSwgZGF5OiAkY3RybC5kYXRhfSlcXFwiIGNsYXNzPVxcXCJldmVudC1kYXRhXFxcIj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtdGltZVxcXCI+e3sgZXZlbnQudGltZSB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudC10aXRsZVxcXCI+e3sgZXZlbnQudGl0bGUgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtY29udGVudFxcXCI+e3sgZXZlbnQuY29udGVudCB9fTwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtcmVtb3ZlXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwucmVtb3ZlRXZlbnQoJGluZGV4LCB0aW1lLCAkY3RybC5kYXRhKVxcXCI+WDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L3NlY3Rpb24+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcInNlbGVjdGVkLWRheS10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3RlbXBsYXRlL3NlbGVjdGVkLWRheS10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IG1vZGFsVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL21vZGFsLXRlbXBsYXRlLmh0bWwnKTtcclxuXHJcbmNvbnN0IG1vZGFsID0ge1xyXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24obW9kYWwsIHZhbGlkYXRpb25TZXJ2aWNlLCBmb3JtRGF0YVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLm1vZGFsVmlld0RhdGEgPSBtb2RhbC5tb2RhbFZpZXdEYXRhO1xyXG4gICAgICAgIHRoaXMuY2hlY2tPcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RhbC5nZXRTdGF0ZSgpID09PSAnb3Blbic7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNoZWNrVHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGFsLmdldFR5cGUoKSA9PT0gdHlwZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IG1vZGFsLmdldFR5cGU7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbk9iaiA9IHZhbGlkYXRpb25TZXJ2aWNlLnZhbGlkYXRpb25PYmo7XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZm9ybURhdGFTZXJ2aWNlLmRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2UgPSBmdW5jdGlvbihib29sLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YSAmJiAhYm9vbCAmJiBtb2RhbC5nZXRUeXBlKCkgPT09ICdhZGQtZXZlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uU2VydmljZS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGFTZXJ2aWNlLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZGF0YSB8fCAhYm9vbCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWwuY2xvc2UoYm9vbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsaWRhdGlvblNlcnZpY2UucmVzZXQoKTtcclxuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IHZhbGlkYXRpb25TZXJ2aWNlLnZhbGlkYXRlKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC5jbG9zZShib29sLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhU2VydmljZS5jbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogbW9kYWxUZW1wbGF0ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtb2RhbDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbW9kYWwtd2luZG93LWNvbXBvbmVudC9tb2RhbC13aW5kb3ctY29tcG9uZW50LmpzXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2IGNsYXNzPVxcXCJtb2RhbC1iYWNrZ3JvdW5kXFxcIiBuZy1pZj1cXFwiJGN0cmwuY2hlY2tPcGVuKClcXFwiPiA8ZGl2IGNsYXNzPVxcXCJ3aW5kb3cgYW5cXFwiIG5nLWlmPVxcXCIkY3RybC5jaGVja09wZW4oKVxcXCI+IDxkaXYgY2xhc3M9XFxcInRpdGxlXFxcIj57eyAkY3RybC5tb2RhbFZpZXdEYXRhLmRhdGEudGl0bGUgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwibWVzc2FnZVxcXCIgbmctaWY9XFxcIiEkY3RybC5jaGVja1R5cGUoJ2FkZC1ldmVudCcpXFxcIj57eyAkY3RybC5tb2RhbFZpZXdEYXRhLmRhdGEubWVzc2FnZSB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJhZGQtZm9ybVxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnYWRkLWV2ZW50JylcXFwiPiA8dGFibGU+IDx0ciBjbGFzcz1cXFwiYWRkLWZvcm0tdGltZVxcXCI+IDx0ZD7QktGA0LXQvNGPOjwvdGQ+IDx0ZD48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIiRjdHJsLmRhdGEuaG91cnNcXFwiPjo8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIiRjdHJsLmRhdGEubWludXRlc1xcXCI+PC90ZD4gPHRkIG5nLWlmPVxcXCIkY3RybC52YWxpZGF0aW9uT2JqLnRpbWUuc3RhdHVzXFxcIiBjbGFzcz1cXFwid2FybmluZ1xcXCI+e3sgJGN0cmwudmFsaWRhdGlvbk9iai50aW1lLm1lc3NhZ2UgfX08L3RkPiA8L3RyPiA8dHIgY2xhc3M9XFxcImFkZC1mb3JtLXRpdGxlXFxcIj4gPHRkPtCX0LDQs9C+0LvQvtCy0L7Qujo8L3RkPiA8dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCIkY3RybC5kYXRhLnRpdGxlXFxcIj48L3RkPiA8dGQgbmctaWY9XFxcIiRjdHJsLnZhbGlkYXRpb25PYmoudGl0bGUuc3RhdHVzXFxcIiBjbGFzcz1cXFwid2FybmluZ1xcXCI+e3sgJGN0cmwudmFsaWRhdGlvbk9iai50aXRsZS5tZXNzYWdlIH19PC90ZD4gPC90cj4gPHRyIGNsYXNzPVxcXCJhZGQtZm9ybS1jb250ZW50XFxcIj4gPHRkPtCe0L/QuNGB0LDQvdC40LU6PC90ZD4gPHRkPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwiJGN0cmwuZGF0YS5jb250ZW50XFxcIj48L3RkPiA8dGQgbmctaWY9XFxcIiRjdHJsLnZhbGlkYXRpb25PYmouY29udGVudC5zdGF0dXNcXFwiIGNsYXNzPVxcXCJ3YXJuaW5nXFxcIj57eyAkY3RybC52YWxpZGF0aW9uT2JqLmNvbnRlbnQubWVzc2FnZSB9fTwvdGQ+IDwvdHI+IDwvdGFibGU+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJidXR0b25zIGdyb3VwXFxcIj4gPGRpdiBjbGFzcz1cXFwiY29uZmlybVxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnY29uZmlybScpXFxcIj4gPGRpdiBjbGFzcz1cXFwicmVqZWN0XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UoKVxcXCI+0J7RgtC80LXQvdCwPC9kaXY+IDxkaXYgY2xhc3M9XFxcIm9rXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UodHJ1ZSlcXFwiPk9LPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJhbGVydFxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnYWxlcnQnKVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNsb3NlKClcXFwiPtCX0LDQutGA0YvRgtGMPC9kaXY+IDxkaXYgY2xhc3M9XFxcImFkZC1ldmVudFxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnYWRkLWV2ZW50JylcXFwiPiA8ZGl2IGNsYXNzPVxcXCJyZWplY3RcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSgpXFxcIj7QntGC0LzQtdC90LA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwib2tcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSh0cnVlLCAkY3RybC5kYXRhKVxcXCI+0KHQvtGF0YDQsNC90LjRgtGMPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiY2xvc2VcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSgpXFxcIj54PC9kaXY+IDwvZGl2PiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwibW9kYWwtdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbW9kYWwtd2luZG93LWNvbXBvbmVudC90ZW1wbGF0ZS9tb2RhbC10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24obW9udGgpIHtcbiAgICAgICAgbW9udGggPSBtb250aCArIDE7XG4gICAgICAgIHN3aXRjaCAobW9udGgpIHtcbiAgICAgICAgICAgIGNhc2UgMTogbW9udGggPSAn0K/QvdCy0LDRgNGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjogbW9udGggPSAn0KTQtdCy0YDQsNC70YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOiBtb250aCA9ICfQnNCw0YDRgic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6IG1vbnRoID0gJ9CQ0L/RgNC10LvRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6IG1vbnRoID0gJ9Cc0LDQuSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6IG1vbnRoID0gJ9CY0Y7QvdGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNzogbW9udGggPSAn0JjRjtC70YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OiBtb250aCA9ICfQkNCy0LPRg9GB0YInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OiBtb250aCA9ICfQodC10L3RgtGP0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTAgOiBtb250aCA9ICfQntC60YLRj9Cx0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDExOiBtb250aCA9ICfQndC+0Y/QsdGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjogbW9udGggPSAn0JTQtdC60LDQsdGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9udGg7XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvbW9udGgtZmlsdGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihkYXkpIHtcbiAgICAgICAgc3dpdGNoIChkYXkpIHtcbiAgICAgICAgICAgIGNhc2UgMTogZGF5ID0gJ9Cf0L7QvdC10LTQtdC70YzQvdC40LonO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOiBkYXkgPSAn0JLRgtC+0YDQvdC40LonO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOiBkYXkgPSAn0KHRgNC10LTQsCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6IGRheSA9ICfQp9C10YLQstC10YDQsyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6IGRheSA9ICfQn9GP0YLQvdC40YbQsCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6IGRheSA9ICfQodGD0LHQsdC+0YLQsCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6IGRheSA9ICfQktC+0YHQutGA0LXRgdC10L3QuNC1JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXk7XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvZGF5LWZpbHRlci5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUtBOzs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7QUFYQTtBQUNBOztBQVZBO0FBQ0E7QUF5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVBBO0FBQ0E7QUFjQTtBQXpCQTtBQUNBOztBQTNCQTtBQUNBO0FBd0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBO0FBWkE7QUFDQTtBQWNBO0FBeEVBO0FBREE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFDQTtBQVFBO0FBWkE7QUFEQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQUNBO0FBU0E7QUFDQTtBQUNBO0FBREE7QUFJQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBckNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBVkE7QUFDQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBM0JBO0FBQ0E7QUE2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBdkRBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBdEJBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWxCQTtBQXdCQTtBQXpCQTtBQUNBO0FBMkJBOzs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFIQTtBQUhBO0FBSkE7QUFjQTtBQXBCQTtBQUNBO0FBc0JBOzs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFKQTtBQU1BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQWxCQTtBQVpBO0FBQ0E7QUFrQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTkE7QUFDQTtBQWFBO0FBQ0E7QUFEQTtBQTNEQTtBQStEQTtBQXRFQTtBQXdFQTs7Ozs7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQVhBO0FBbEJBO0FBcUNBO0FBdENBO0FBQ0E7QUF3Q0E7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQVJBO0FBU0E7QUFDQTtBQVZBO0FBV0E7QUFDQTtBQVpBO0FBYUE7QUFDQTtBQWRBO0FBZUE7QUFDQTtBQWhCQTtBQWlCQTtBQUNBO0FBbEJBO0FBbUJBO0FBQ0E7QUFwQkE7QUFxQkE7QUFDQTtBQXRCQTtBQXVCQTtBQUNBO0FBeEJBO0FBQ0E7QUEwQkE7QUE3QkE7QUFEQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQVJBO0FBU0E7QUFDQTtBQVZBO0FBV0E7QUFDQTtBQVpBO0FBYUE7QUFDQTtBQWRBO0FBQ0E7QUFnQkE7QUFsQkE7QUFEQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==