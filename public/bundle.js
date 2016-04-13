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
	                    time: '00:00',
	                    title: 'Новый год',
	                    content: '',
	                    custom: true
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
	                    modal.open({ title: 'Ошибка', message: 'Нельзя редактировать основные события' }, 'alert');
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
	var v1="<header class=\"group selected-day\"> <div class=\"title\"> <span class=\"month\">{{ $ctrl.data.month | monthFilter }} {{ $ctrl.data.date }},</span>\n<span class=\"year\">{{ $ctrl.data.year }}</span> <div class=\"day\">{{ $ctrl.data.day | dayFilter}}</div> </div> <div class=\"menu\"> <div class=\"back\" ng-click=\"$ctrl.unselect()\">Назад</div> <div class=\"add-event\" ng-click=\"$ctrl.addEvent()\">Добавить событие</div> </div> </header> <section> <div class=\"times group\" ng-repeat=\"time in $ctrl.times\"> <div class=\"hour\">{{ time.hours }}</div> <div class=\"events\" ng-class=\"{'activeTime': time.events.length}\"> <div ng-repeat=\"event in time.events\" class=\"event\"> <div ng-click=\"$ctrl.editEvent({index: $index, time: time, day: $ctrl.data})\" class=\"event-data\"> <div class=\"event-time\">{{ event.time }}</div> <div class=\"event-title\">{{ event.title }}</div> <div class=\"event-content\">{{ event.content }}</div> </div> <div class=\"event-remove\" ng-click=\"$ctrl.removeEvent($index, time, $ctrl.data)\">X</div> </div> </div> </div> </section>";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGZjZGY2YmZhMGZhNjMwOGYyODE1Iiwid2VicGFjazovLy9qcy9jYWxlbmRhci1hcHAuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL2RhdGEtZ2VuZXJhdG9yLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL21vZGFsLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy92YWxpZGF0aW9uLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy9hZGQtZm9ybS1kYXRhLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWwiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3NlbGVjdGVkLWRheS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21vZGFsLXdpbmRvdy1jb21wb25lbnQvbW9kYWwtd2luZG93LWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbW9kYWwtd2luZG93LWNvbXBvbmVudC90ZW1wbGF0ZS9tb2RhbC10ZW1wbGF0ZS5odG1sIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvbW9udGgtZmlsdGVyLmpzIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvZGF5LWZpbHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGZjZGY2YmZhMGZhNjMwOGYyODE1XG4gKiovIiwicmVxdWlyZSgnLi9hcHAnKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jYWxlbmRhci1hcHAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBjYWxlbmRhciA9IGFuZ3VsYXIubW9kdWxlKCdjYWxlbmRhcicsIFsnbmdBbmltYXRlJ10pO1xyXG5cclxuY2FsZW5kYXJcclxuICAgIC5mYWN0b3J5KCdkYXRhR2VuZXJhdG9yJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9kYXRhLWdlbmVyYXRvci1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgnY3JlYXRlVGltZUdyaWQnLCByZXF1aXJlKCcuL3NlcnZpY2VzL3RpbWUtZ3JpZC1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgnbW9kYWwnLCByZXF1aXJlKCcuL3NlcnZpY2VzL21vZGFsLXNlcnZpY2UnKSlcclxuICAgIC5mYWN0b3J5KCd2YWxpZGF0aW9uU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvdmFsaWRhdGlvbi1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgnZm9ybURhdGFTZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9hZGQtZm9ybS1kYXRhLXNlcnZpY2UnKSk7XHJcblxyXG5jYWxlbmRhclxyXG4gICAgLmNvbXBvbmVudCgnbWFpblZpZXcnLCByZXF1aXJlKCcuL21haW4tdmlldy1jb21wb25lbnQvbWFpbi12aWV3JykpXHJcbiAgICAuY29tcG9uZW50KCdjYWxlbmRhcicsIHJlcXVpcmUoJy4vY2FsZW5kYXItY29tcG9uZW50L2NhbGVuZGFyJykpXHJcbiAgICAuY29tcG9uZW50KCdzZWxlY3RlZERheScsIHJlcXVpcmUoJy4vc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC9zZWxlY3RlZC1kYXknKSlcclxuICAgIC5jb21wb25lbnQoJ21vZGFsV2luZG93JywgcmVxdWlyZSgnLi9tb2RhbC13aW5kb3ctY29tcG9uZW50L21vZGFsLXdpbmRvdy1jb21wb25lbnQnKSk7XHJcblxyXG5jYWxlbmRhclxyXG4gICAgLmZpbHRlcignbW9udGhGaWx0ZXInLCByZXF1aXJlKCcuL3NlcnZpY2VzL21vbnRoLWZpbHRlcicpKVxyXG4gICAgLmZpbHRlcignZGF5RmlsdGVyJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9kYXktZmlsdGVyJykpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBkYXRhQXJyYXkgPSBbXSxcbiAgICAgICAgICAgIGRhdGVOb3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDRh9C40YHQu9CwINC/0YDQtdC00YvQtNGD0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBmaXJzdERheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpLCAxKSxcbiAgICAgICAgICAgIHByZXZpb3VzTW9udGhMYXN0RGF5ID0gbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXREYXRlKCksXG4gICAgICAgICAgICBudW1iZXJPZlBhc3REYXlzID0gKGZpcnN0RGF5LmdldERheSgpIHx8IDcpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUGFzdERheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgZGF0ZTogcHJldmlvdXNNb250aExhc3REYXkgLSBpLFxuICAgICAgICAgICAgICAgIGRheTogbnVtYmVyT2ZQYXN0RGF5cyAtIGksXG4gICAgICAgICAgICAgICAgeWVhcjogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtb250aDogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgY3VzdG9tRXZlbnRzOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGF0YUFycmF5LnVuc2hpZnQoZGF5RGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0YfQuNGB0LvQsCDQvNC10YHRj9GG0LBcbiAgICAgICAgbGV0IG51bWJlck9mRGF5cyA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZEYXlzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBkYXkgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSwgaSArIDEpLFxuICAgICAgICAgICAgICAgIGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGRheTogZGF5LmdldERheSgpIHx8IDcsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5OiBkYXkuZ2V0RGF0ZSgpID09PSBkYXRlTm93LmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRheS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaSA9PT0gMTUpIHtcbiAgICAgICAgICAgICAgICBkYXlEYXRhLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGltZTogJzAwOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQndC+0LLRi9C5INCz0L7QtCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b206IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YUFycmF5LnB1c2goZGF5RGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0LTQvdC4INGB0LvQtdC00YPRjtGJ0LXQs9C+INC80LXRgdGP0YbQsFxuICAgICAgICBsZXQgbnVtYmVyT2ZGdXR1cmVEYXlzID0gNyAtIGRhdGFBcnJheS5sZW5ndGggJSA3O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZGdXR1cmVEYXlzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBkYXkgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSArIDEsIGkgKyAxKSxcbiAgICAgICAgICAgICAgICBkYXlEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICBkYXRlOiBkYXkuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBkYXk6IGRheS5nZXREYXkoKSB8fCA3LFxuICAgICAgICAgICAgICAgICAgICB0b2RheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG1vbnRoOiBkYXkuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICAgICAgeWVhcjogZGF5LmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbUV2ZW50czogW11cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkYXRhQXJyYXkucHVzaChkYXlEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhQXJyYXk7XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvZGF0YS1nZW5lcmF0b3Itc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGV0IGFycmF5ID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBsZXQgaG91cnMgPSAoJzAnICsgaSkuc2xpY2UoLTIpICsgJzowMCc7XHJcblxyXG4gICAgICAgICAgICBhcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGhvdXJzOiBob3VycyxcclxuICAgICAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL3RpbWUtZ3JpZC1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHEpIHtcclxuICAgIGxldCBzdGF0ZSA9ICdjbG9zZScsXHJcbiAgICAgICAgdHlwZSA9IG51bGwsXHJcbiAgICAgICAgZGVmZXI7XHJcblxyXG4gICAgbGV0IG1vZGFsVmlld0RhdGEgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuKGRhdGEsIG1vZGFsX3R5cGUpIHtcclxuICAgICAgICBtb2RhbFZpZXdEYXRhLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHR5cGUgPSBtb2RhbF90eXBlO1xyXG4gICAgICAgIHN0YXRlID0gJ29wZW4nO1xyXG4gICAgICAgIGlmIChtb2RhbF90eXBlID09PSAnY29uZmlybScgfHwgbW9kYWxfdHlwZSA9PT0gJ2FkZC1ldmVudCcpIHtcclxuICAgICAgICAgICAgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2UoYm9vbCwgZGF0YSkge1xyXG4gICAgICAgIGlmIChib29sKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSBkZWZlci5yZXNvbHZlKHtkYXRhOiBKU09OLnN0cmluZ2lmeShkYXRhKX0pO1xyXG4gICAgICAgICAgICBlbHNlIGRlZmVyLnJlc29sdmUoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjb25maXJtJyAmJiB0eXBlID09PSAnYWRkLWV2ZW50Jykge1xyXG4gICAgICAgICAgICBkZWZlci5yZWplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGUgPSAnY2xvc2UnO1xyXG4gICAgICAgIHR5cGUgPSBudWxsO1xyXG4gICAgICAgIGRlbGV0ZSBtb2RhbFZpZXdEYXRhLmRhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBtb2RhbFZpZXdEYXRhOiBtb2RhbFZpZXdEYXRhLFxyXG4gICAgICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcclxuICAgICAgICBnZXRUeXBlOiBnZXRUeXBlLFxyXG4gICAgICAgIG9wZW46IG9wZW4sXHJcbiAgICAgICAgY2xvc2U6IGNsb3NlXHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL21vZGFsLXNlcnZpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbGlkYXRpb25PYmogPSB7XG4gICAgICAgIHN0YXR1czogdHJ1ZSxcbiAgICAgICAgdGltZToge1xuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgc3RhdHVzOiBmYWxzZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6ICcnXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUoZGF0YSkge1xuICAgICAgICBpZiAoIWRhdGEuaG91cnMgfHwgIWRhdGEubWludXRlcykge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLm1lc3NhZ2UgPSAn0JLQstC10LTQuNGC0LUg0YfQsNGB0Ysg0Lgg0LzQuNC90YPRgtGLJztcbiAgICAgICAgfSBlbHNlIGlmIChpc05hTigrZGF0YS5ob3VycykgfHwgaXNOYU4oK2RhdGEubWludXRlcykpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmouc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5tZXNzYWdlID0gJ9Cn0LDRgdGLINC4INC80LjQvdGD0YLRiyDQtNC+0LvQttC90Ysg0LHRi9GC0Ywg0YfQuNGB0LvQsNC80LgnO1xuICAgICAgICB9IGVsc2UgaWYgKCtkYXRhLmhvdXJzIDwgMCB8fCArZGF0YS5ob3VycyA+IDIzIHx8ICtkYXRhLm1pbnV0ZXMgPCAwIHx8ICtkYXRhLm1pbnV0ZXMgPiA1OSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLm1lc3NhZ2UgPSAn0JLQstC10LTQuNGC0LUg0LrQvtGA0YDQtdC60YLQvdC+0LUg0LLRgNC10LzRjyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWRhdGEudGl0bGUpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmouc3RhdHVzID0gZmFsc2U7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpdGxlLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpdGxlLm1lc3NhZ2UgPSAn0JLQstC10LTQuNGC0LUg0LfQsNCz0L7Qu9C+0LLQvtC6JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhLmNvbnRlbnQgJiYgZGF0YS5jb250ZW50LnNwbGl0KCcgJykubGVuZ3RoIDwgNSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmouY29udGVudC5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5jb250ZW50Lm1lc3NhZ2UgPSAn0JTQvtC70LbQvdC+INCx0YvRgtGMIDAg0LvQuNCx0L4gNSDRgdC70L7Qsic7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsaWRhdGlvbk9iai5zdGF0dXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIHZhbGlkYXRpb25PYmouc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgdmFsaWRhdGlvbk9iai5jb250ZW50LnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgIHZhbGlkYXRpb25PYmoudGl0bGUuc3RhdHVzID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICB2YWxpZGF0aW9uT2JqOiB2YWxpZGF0aW9uT2JqLFxuICAgICAgICB2YWxpZGF0ZTogdmFsaWRhdGUsXG4gICAgICAgIHJlc2V0OiByZXNldFxuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL3ZhbGlkYXRpb24tc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBob3VyczogJycsXHJcbiAgICAgICAgbWludXRlczogJycsXHJcbiAgICAgICAgdGl0bGU6ICcnLFxyXG4gICAgICAgIGNvbnRlbnQ6ICcnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyRGF0YSgpIHtcclxuICAgICAgICBkYXRhLmhvdXJzID0gJyc7XHJcbiAgICAgICAgZGF0YS5taW51dGVzID0gJyc7XHJcbiAgICAgICAgZGF0YS50aXRsZSA9ICcnO1xyXG4gICAgICAgIGRhdGEuY29udGVudCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldERhdGEoZm9ybURhdGEpIHtcclxuICAgICAgICBkYXRhLmhvdXJzID0gZm9ybURhdGEudGltZS5zbGljZSgwLCAyKTtcclxuICAgICAgICBkYXRhLm1pbnV0ZXMgPSBmb3JtRGF0YS50aW1lLnNsaWNlKC0yKTtcclxuICAgICAgICBkYXRhLnRpdGxlID0gZm9ybURhdGEudGl0bGU7XHJcbiAgICAgICAgZGF0YS5jb250ZW50ID0gZm9ybURhdGEuY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgY2xlYXJEYXRhOiBjbGVhckRhdGEsXHJcbiAgICAgICAgc2V0RGF0YTogc2V0RGF0YVxyXG4gICAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9hZGQtZm9ybS1kYXRhLXNlcnZpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBtYWluVmlld1RlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbCcpO1xyXG5cclxuY29uc3QgbWFpblZpZXcgPSB7XHJcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbihkYXRhR2VuZXJhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0ge1xyXG4gICAgICAgICAgICBkYXlzRGF0YTogZGF0YUdlbmVyYXRvcigpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3REYXkgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWREYXkgPSB0aGlzLmRhdGEuZGF5c0RhdGFbaW5kZXhdXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy51bnNlbGVjdERheSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5kYXRhLnNlbGVjdGVkRGF5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkRXZlbnQgPSBmdW5jdGlvbihldmVudCwgZGF5KSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZGF0YS5kYXlzRGF0YS5pbmRleE9mKGRheSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kYXlzRGF0YVtpbmRleF0uZXZlbnRzLnB1c2goZXZlbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihldmVudCwgZGF5KSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZGF0YS5kYXlzRGF0YS5pbmRleE9mKGRheSksXHJcbiAgICAgICAgICAgICAgICBldmVudEluZGV4ID0gdGhpcy5kYXRhLmRheXNEYXRhW2luZGV4XS5ldmVudHMuaW5kZXhPZihldmVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kYXlzRGF0YVtpbmRleF0uZXZlbnRzLnNwbGljZShldmVudEluZGV4LCAxKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogbWFpblZpZXdUZW1wbGF0ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYWluVmlldztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC9tYWluLXZpZXcuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxjYWxlbmRhciBkYXRhPVxcXCIkY3RybC5kYXRhLmRheXNEYXRhXFxcIiBzZWxlY3Q9XFxcIiRjdHJsLnNlbGVjdERheShpbmRleClcXFwiIHNlbGVjdGVkPVxcXCIkY3RybC5kYXRhLnNlbGVjdGVkRGF5XFxcIj48L2NhbGVuZGFyPiA8ZGl2IGNsYXNzPVxcXCJzZWxlY3RlZFxcXCIgbmctaWY9XFxcIiRjdHJsLmRhdGEuc2VsZWN0ZWREYXlcXFwiPiA8c2VsZWN0ZWQtZGF5IGRhdGE9XFxcIiRjdHJsLmRhdGEuc2VsZWN0ZWREYXlcXFwiIHVuc2VsZWN0PVxcXCIkY3RybC51bnNlbGVjdERheSgpXFxcIiBhZGQ9XFxcIiRjdHJsLmFkZEV2ZW50KGV2ZW50LCBkYXkpXFxcIiByZW1vdmU9XFxcIiRjdHJsLnJlbW92ZUV2ZW50KGV2ZW50LCBkYXkpXFxcIj48L3NlbGVjdGVkLWRheT4gPC9kaXY+IDxtb2RhbC13aW5kb3c+PC9tb2RhbC13aW5kb3c+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm1haW4tdmlldy10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L3RlbXBsYXRlL21haW4tdmlldy10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjYWxlbmRhclRlbXBsYXRlID0gcmVxdWlyZSgnLi8uLi9jYWxlbmRhci1jb21wb25lbnQvdGVtcGxhdGUvY2FsZW5kYXItdGVtcGxhdGUuaHRtbCcpO1xuXG5jb25zdCBjYWxlbmRhciA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCcsXG4gICAgICAgIHNlbGVjdDogJyYnLFxuICAgICAgICBzZWxlY3RlZDogJzwnXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGU7XG4gICAgICAgIHRoaXMuZGF5TmFtZXMgPSBbJ9C/0L0nLCAn0LLRgicsICfRgdGAJywgJ9GH0YInLCAn0L/RgicsICfRgdCxJywgJ9Cy0YEnXVxuXG4gICAgICAgIHRoaXMuZ2V0RXZlbnRUZXh0ID0gZnVuY3Rpb24oZGF5KSB7XG4gICAgICAgICAgICBsZXQgbnVtYmVyT2ZFdmVudHMgPSBkYXkuZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChudW1iZXJPZkV2ZW50cyA+IDEpIHJldHVybiAn0JrQvtC70LjRh9C10YHRgtCy0L4g0YHQvtCx0YvRgtC40Lk6ICcgKyBudW1iZXJPZkV2ZW50cztcbiAgICAgICAgICAgIGlmIChkYXkuZXZlbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheS5ldmVudHNbMF0udGl0bGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHRlbXBsYXRlOiBjYWxlbmRhclRlbXBsYXRlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbGVuZGFyO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9jYWxlbmRhci1jb21wb25lbnQvY2FsZW5kYXIuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXYgY2xhc3M9XFxcImNhbGVuZGFyXFxcIiBuZy1pZj1cXFwiISRjdHJsLnNlbGVjdGVkXFxcIj4gPGhlYWRlcj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPiA8c3BhbiBjbGFzcz1cXFwibW9udGhcXFwiPnt7ICRjdHJsLmRhdGUuZ2V0TW9udGgoKSB8IG1vbnRoRmlsdGVyIH19PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ5ZWFyXFxcIj57eyAkY3RybC5kYXRlLmdldEZ1bGxZZWFyKCkgfX08L3NwYW4+IDwvZGl2PiA8ZGl2PiA8ZGl2IGNsYXNzPVxcXCJkYXktbmFtZVxcXCIgbmctcmVwZWF0PVxcXCJuYW1lIGluICRjdHJsLmRheU5hbWVzXFxcIj57e25hbWV9fTwvZGl2PiA8L2Rpdj4gPC9oZWFkZXI+IDxzZWN0aW9uPiA8ZGl2IGNsYXNzPVxcXCJkYXlcXFwiIG5nLWNsYXNzPVxcXCJ7J25vdC10aGlzLW1vbnRoJzogZGF5Lm1vbnRoICE9PSAkY3RybC5kYXRlLmdldE1vbnRoKCksICd3ZWVrZW5kJzogZGF5LmRheSA+IDV9XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuc2VsZWN0KHtpbmRleDogJGluZGV4fSlcXFwiIG5nLXJlcGVhdD1cXFwiZGF5IGluICRjdHJsLmRhdGFcXFwiPiA8ZGl2IGNsYXNzPVxcXCJkYXRlXFxcIj4gPHNwYW4gbmctY2xhc3M9XFxcInsndG9kYXknOiBkYXkudG9kYXl9XFxcIj57e2RheS5kYXRlfX08L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudHNcXFwiIG5nLWlmPVxcXCJkYXkuZXZlbnRzLmxlbmd0aFxcXCI+IHt7ICRjdHJsLmdldEV2ZW50VGV4dChkYXkpIH19IDwvZGl2PiA8L2Rpdj4gPC9zZWN0aW9uPiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwiY2FsZW5kYXItdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzZWxlY3RlZERheVRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbCcpO1xuXG5jb25zdCBzZWxlY3RlZERheSA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCcsXG4gICAgICAgIHVuc2VsZWN0OiAnJicsXG4gICAgICAgIGFkZDogJyYnLFxuICAgICAgICByZW1vdmU6ICcmJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24obW9kYWwsIGNyZWF0ZVRpbWVHcmlkLCBmb3JtRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50aW1lcyA9IGNyZWF0ZVRpbWVHcmlkKCk7XG5cbiAgICAgICAgdGhpcy5kYXRhLmV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gZXZlbnQudGltZS5zbGljZSgwLCAyKSAvIDE7XG4gICAgICAgICAgICB0aGlzLnRpbWVzW2luZGV4XS5ldmVudHMucHVzaChldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRhLmV2ZW50cy5sZW5ndGgpIG1vZGFsLm9wZW4oe3RpdGxlOiAn0KHQvtC+0LHRidC10L3QuNC1JywgbWVzc2FnZTogJ9Cd0LAg0LTQsNC90L3Ri9C5INC00LXQvdGMINC90LXRgiDQt9Cw0L/Qu9Cw0L3QuNGA0L7QstCw0L3QvdGL0YUg0YHQvtCx0YvRgtC40LknfSwgJ2FsZXJ0Jyk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudCA9IGZ1bmN0aW9uKGVkaXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEueWVhciA8IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSB8fCB0aGlzLmRhdGEubW9udGggPCBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgfHwgdGhpcy5kYXRhLmRhdGUgPCBuZXcgRGF0ZSgpLmdldERhdGUoKSkge1xuICAgICAgICAgICAgICAgIG1vZGFsLm9wZW4oe3RpdGxlOiAn0J7RiNC40LHQutCwJywgbWVzc2FnZTogJ9Cd0LXQu9GM0LfRjyDQtNC+0LHQsNCy0LjRgtGMINGB0L7QsdGL0YLQuNGPINC90LAg0L/RgNC+0YjQtdC00YjQuNC1INC00L3QuCd9LCAnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWRpdCkge1xuICAgICAgICAgICAgICAgIGlmIChlZGl0LnRpbWUuZXZlbnRzW2VkaXQuaW5kZXhdLmN1c3RvbSkge1xuICAgICAgICAgICAgICAgICAgICBtb2RhbC5vcGVuKHt0aXRsZTogJ9Ce0YjQuNCx0LrQsCcsIG1lc3NhZ2U6ICfQndC10LvRjNC30Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNGC0Ywg0L7RgdC90L7QstC90YvQtSDRgdC+0LHRi9GC0LjRjyd9LCAnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3JtRGF0YVNlcnZpY2Uuc2V0RGF0YShlZGl0LnRpbWUuZXZlbnRzW2VkaXQuaW5kZXhdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kYWwub3Blbih7dGl0bGU6ICfQktCy0LXQtNC40YLQtSDQtNCw0L3QvdGL0LUnLCBtZXNzYWdlOiAnJ30sICdhZGQtZXZlbnQnKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGVkaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHtldmVudDogZWRpdC50aW1lLmV2ZW50c1tlZGl0LmluZGV4XSwgZGF5OiBlZGl0LmRheX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVJbmRleCA9IHRoaXMudGltZXMuaW5kZXhPZihlZGl0LnRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lc1t0aW1lSW5kZXhdLmV2ZW50cy5zcGxpY2UoZWRpdC5pbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2ZW50RGF0YSA9IEpTT04ucGFyc2UoZGF0YS5kYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6ICgnMCcgKyBldmVudERhdGEuaG91cnMpLnNsaWNlKC0yKSArICc6JyArICgnMCcgKyBldmVudERhdGEubWludXRlcykuc2xpY2UoLTIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGV2ZW50RGF0YS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGV2ZW50RGF0YS5jb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKHtldmVudDogb2JqLCBkYXk6IHRoaXMuZGF0YX0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gb2JqLnRpbWUuc2xpY2UoMCwgMikgLyAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVzW2luZGV4XS5ldmVudHMucHVzaCh0aGlzLmRhdGEuZXZlbnRzW3RoaXMuZGF0YS5ldmVudHMubGVuZ3RoIC0gMV0pO1xuXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGluZGV4LCB0aW1lLCBkYXkpIHtcbiAgICAgICAgICAgIGlmICh0aW1lLmV2ZW50c1tpbmRleF0uY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgbW9kYWwub3Blbih7dGl0bGU6ICfQntGI0LjQsdC60LAnLCBtZXNzYWdlOiAn0J3QtdC70YzQt9GPINGD0LTQsNC70LjRgtGMINGB0L7QsdGL0YLQuNC1J30sICdhbGVydCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oe3RpdGxlOiAn0J/QvtC00YLQstC10YDQtNC40YLQtScsIG1lc3NhZ2U6ICfQo9C00LDQu9C40YLRjCDQtNCw0L3QvdC+0LUg0YHQvtCx0YvRgtC40LU/J30sICdjb25maXJtJylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHtldmVudDogdGltZS5ldmVudHNbaW5kZXhdLCBkYXk6IGRheX0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lSW5kZXggPSB0aGlzLnRpbWVzLmluZGV4T2YodGltZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXNbdGltZUluZGV4XS5ldmVudHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmVkaXRFdmVudCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnQoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRlbXBsYXRlOiBzZWxlY3RlZERheVRlbXBsYXRlXG59O1xubW9kdWxlLmV4cG9ydHMgPSBzZWxlY3RlZERheTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC9zZWxlY3RlZC1kYXkuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxoZWFkZXIgY2xhc3M9XFxcImdyb3VwIHNlbGVjdGVkLWRheVxcXCI+IDxkaXYgY2xhc3M9XFxcInRpdGxlXFxcIj4gPHNwYW4gY2xhc3M9XFxcIm1vbnRoXFxcIj57eyAkY3RybC5kYXRhLm1vbnRoIHwgbW9udGhGaWx0ZXIgfX0ge3sgJGN0cmwuZGF0YS5kYXRlIH19LDwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwieWVhclxcXCI+e3sgJGN0cmwuZGF0YS55ZWFyIH19PC9zcGFuPiA8ZGl2IGNsYXNzPVxcXCJkYXlcXFwiPnt7ICRjdHJsLmRhdGEuZGF5IHwgZGF5RmlsdGVyfX08L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcIm1lbnVcXFwiPiA8ZGl2IGNsYXNzPVxcXCJiYWNrXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwudW5zZWxlY3QoKVxcXCI+0J3QsNC30LDQtDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJhZGQtZXZlbnRcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5hZGRFdmVudCgpXFxcIj7QlNC+0LHQsNCy0LjRgtGMINGB0L7QsdGL0YLQuNC1PC9kaXY+IDwvZGl2PiA8L2hlYWRlcj4gPHNlY3Rpb24+IDxkaXYgY2xhc3M9XFxcInRpbWVzIGdyb3VwXFxcIiBuZy1yZXBlYXQ9XFxcInRpbWUgaW4gJGN0cmwudGltZXNcXFwiPiA8ZGl2IGNsYXNzPVxcXCJob3VyXFxcIj57eyB0aW1lLmhvdXJzIH19PC9kaXY+IDxkaXYgY2xhc3M9XFxcImV2ZW50c1xcXCIgbmctY2xhc3M9XFxcInsnYWN0aXZlVGltZSc6IHRpbWUuZXZlbnRzLmxlbmd0aH1cXFwiPiA8ZGl2IG5nLXJlcGVhdD1cXFwiZXZlbnQgaW4gdGltZS5ldmVudHNcXFwiIGNsYXNzPVxcXCJldmVudFxcXCI+IDxkaXYgbmctY2xpY2s9XFxcIiRjdHJsLmVkaXRFdmVudCh7aW5kZXg6ICRpbmRleCwgdGltZTogdGltZSwgZGF5OiAkY3RybC5kYXRhfSlcXFwiIGNsYXNzPVxcXCJldmVudC1kYXRhXFxcIj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtdGltZVxcXCI+e3sgZXZlbnQudGltZSB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudC10aXRsZVxcXCI+e3sgZXZlbnQudGl0bGUgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtY29udGVudFxcXCI+e3sgZXZlbnQuY29udGVudCB9fTwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtcmVtb3ZlXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwucmVtb3ZlRXZlbnQoJGluZGV4LCB0aW1lLCAkY3RybC5kYXRhKVxcXCI+WDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L3NlY3Rpb24+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcInNlbGVjdGVkLWRheS10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3RlbXBsYXRlL3NlbGVjdGVkLWRheS10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IG1vZGFsVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL21vZGFsLXRlbXBsYXRlLmh0bWwnKTtcclxuXHJcbmNvbnN0IG1vZGFsID0ge1xyXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24obW9kYWwsIHZhbGlkYXRpb25TZXJ2aWNlLCBmb3JtRGF0YVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLm1vZGFsVmlld0RhdGEgPSBtb2RhbC5tb2RhbFZpZXdEYXRhO1xyXG4gICAgICAgIHRoaXMuY2hlY2tPcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RhbC5nZXRTdGF0ZSgpID09PSAnb3Blbic7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNoZWNrVHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGFsLmdldFR5cGUoKSA9PT0gdHlwZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudHlwZSA9IG1vZGFsLmdldFR5cGU7XHJcblxyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbk9iaiA9IHZhbGlkYXRpb25TZXJ2aWNlLnZhbGlkYXRpb25PYmo7XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZm9ybURhdGFTZXJ2aWNlLmRhdGE7XHJcblxyXG4gICAgICAgIHRoaXMuY2xvc2UgPSBmdW5jdGlvbihib29sLCBkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmICghZGF0YSAmJiAhYm9vbCAmJiBtb2RhbC5nZXRUeXBlKCkgPT09ICdhZGQtZXZlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uU2VydmljZS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGFTZXJ2aWNlLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghZGF0YSB8fCAhYm9vbCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWwuY2xvc2UoYm9vbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsaWRhdGlvblNlcnZpY2UucmVzZXQoKTtcclxuICAgICAgICAgICAgbGV0IHN0YXR1cyA9IHZhbGlkYXRpb25TZXJ2aWNlLnZhbGlkYXRlKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC5jbG9zZShib29sLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhU2VydmljZS5jbGVhckRhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogbW9kYWxUZW1wbGF0ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtb2RhbDtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbW9kYWwtd2luZG93LWNvbXBvbmVudC9tb2RhbC13aW5kb3ctY29tcG9uZW50LmpzXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2IGNsYXNzPVxcXCJtb2RhbC1iYWNrZ3JvdW5kXFxcIiBuZy1pZj1cXFwiJGN0cmwuY2hlY2tPcGVuKClcXFwiPiA8ZGl2IGNsYXNzPVxcXCJ3aW5kb3cgYW5cXFwiIG5nLWlmPVxcXCIkY3RybC5jaGVja09wZW4oKVxcXCI+IDxkaXYgY2xhc3M9XFxcInRpdGxlXFxcIj57eyAkY3RybC5tb2RhbFZpZXdEYXRhLmRhdGEudGl0bGUgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwibWVzc2FnZVxcXCIgbmctaWY9XFxcIiEkY3RybC5jaGVja1R5cGUoJ2FkZC1ldmVudCcpXFxcIj57eyAkY3RybC5tb2RhbFZpZXdEYXRhLmRhdGEubWVzc2FnZSB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJhZGQtZm9ybVxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnYWRkLWV2ZW50JylcXFwiPiA8dGFibGU+IDx0ciBjbGFzcz1cXFwiYWRkLWZvcm0tdGltZVxcXCI+IDx0ZD7QktGA0LXQvNGPOjwvdGQ+IDx0ZD48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIiRjdHJsLmRhdGEuaG91cnNcXFwiPjo8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIiRjdHJsLmRhdGEubWludXRlc1xcXCI+PC90ZD4gPHRkIG5nLWlmPVxcXCIkY3RybC52YWxpZGF0aW9uT2JqLnRpbWUuc3RhdHVzXFxcIiBjbGFzcz1cXFwid2FybmluZ1xcXCI+e3sgJGN0cmwudmFsaWRhdGlvbk9iai50aW1lLm1lc3NhZ2UgfX08L3RkPiA8L3RyPiA8dHIgY2xhc3M9XFxcImFkZC1mb3JtLXRpdGxlXFxcIj4gPHRkPtCX0LDQs9C+0LvQvtCy0L7Qujo8L3RkPiA8dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCIkY3RybC5kYXRhLnRpdGxlXFxcIj48L3RkPiA8dGQgbmctaWY9XFxcIiRjdHJsLnZhbGlkYXRpb25PYmoudGl0bGUuc3RhdHVzXFxcIiBjbGFzcz1cXFwid2FybmluZ1xcXCI+e3sgJGN0cmwudmFsaWRhdGlvbk9iai50aXRsZS5tZXNzYWdlIH19PC90ZD4gPC90cj4gPHRyIGNsYXNzPVxcXCJhZGQtZm9ybS1jb250ZW50XFxcIj4gPHRkPtCe0L/QuNGB0LDQvdC40LU6PC90ZD4gPHRkPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwiJGN0cmwuZGF0YS5jb250ZW50XFxcIj48L3RkPiA8dGQgbmctaWY9XFxcIiRjdHJsLnZhbGlkYXRpb25PYmouY29udGVudC5zdGF0dXNcXFwiIGNsYXNzPVxcXCJ3YXJuaW5nXFxcIj57eyAkY3RybC52YWxpZGF0aW9uT2JqLmNvbnRlbnQubWVzc2FnZSB9fTwvdGQ+IDwvdHI+IDwvdGFibGU+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJidXR0b25zIGdyb3VwXFxcIj4gPGRpdiBjbGFzcz1cXFwiY29uZmlybVxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnY29uZmlybScpXFxcIj4gPGRpdiBjbGFzcz1cXFwicmVqZWN0XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UoKVxcXCI+0J7RgtC80LXQvdCwPC9kaXY+IDxkaXYgY2xhc3M9XFxcIm9rXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UodHJ1ZSlcXFwiPk9LPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJhbGVydFxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnYWxlcnQnKVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNsb3NlKClcXFwiPtCX0LDQutGA0YvRgtGMPC9kaXY+IDxkaXYgY2xhc3M9XFxcImFkZC1ldmVudFxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnYWRkLWV2ZW50JylcXFwiPiA8ZGl2IGNsYXNzPVxcXCJyZWplY3RcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSgpXFxcIj7QntGC0LzQtdC90LA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwib2tcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSh0cnVlLCAkY3RybC5kYXRhKVxcXCI+0KHQvtGF0YDQsNC90LjRgtGMPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiY2xvc2VcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSgpXFxcIj54PC9kaXY+IDwvZGl2PiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwibW9kYWwtdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbW9kYWwtd2luZG93LWNvbXBvbmVudC90ZW1wbGF0ZS9tb2RhbC10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24obW9udGgpIHtcbiAgICAgICAgbW9udGggPSBtb250aCArIDE7XG4gICAgICAgIHN3aXRjaCAobW9udGgpIHtcbiAgICAgICAgICAgIGNhc2UgMTogbW9udGggPSAn0K/QvdCy0LDRgNGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjogbW9udGggPSAn0KTQtdCy0YDQsNC70YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOiBtb250aCA9ICfQnNCw0YDRgic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6IG1vbnRoID0gJ9CQ0L/RgNC10LvRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6IG1vbnRoID0gJ9Cc0LDQuSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6IG1vbnRoID0gJ9CY0Y7QvdGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNzogbW9udGggPSAn0JjRjtC70YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OiBtb250aCA9ICfQkNCy0LPRg9GB0YInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5OiBtb250aCA9ICfQodC10L3RgtGP0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTAgOiBtb250aCA9ICfQntC60YLRj9Cx0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDExOiBtb250aCA9ICfQndC+0Y/QsdGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMjogbW9udGggPSAn0JTQtdC60LDQsdGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9udGg7XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvbW9udGgtZmlsdGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihkYXkpIHtcbiAgICAgICAgc3dpdGNoIChkYXkpIHtcbiAgICAgICAgICAgIGNhc2UgMTogZGF5ID0gJ9Cf0L7QvdC10LTQtdC70YzQvdC40LonO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOiBkYXkgPSAn0JLRgtC+0YDQvdC40LonO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOiBkYXkgPSAn0KHRgNC10LTQsCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6IGRheSA9ICfQp9C10YLQstC10YDQsyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6IGRheSA9ICfQn9GP0YLQvdC40YbQsCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6IGRheSA9ICfQodGD0LHQsdC+0YLQsCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6IGRheSA9ICfQktC+0YHQutGA0LXRgdC10L3QuNC1JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXk7XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvZGF5LWZpbHRlci5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3RDQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUtBOzs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSEE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFQQTtBQUNBO0FBU0E7QUFYQTtBQUNBOztBQVZBO0FBQ0E7QUF5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBQ0E7QUFRQTtBQW5CQTtBQUNBOztBQTNCQTtBQUNBO0FBa0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBO0FBWkE7QUFDQTtBQWNBO0FBbEVBO0FBREE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFDQTtBQVFBO0FBWkE7QUFEQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQUNBO0FBU0E7QUFDQTtBQUNBO0FBREE7QUFJQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBckNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBVkE7QUFDQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBM0JBO0FBQ0E7QUE2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBdkRBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBdEJBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWxCQTtBQXdCQTtBQXpCQTtBQUNBO0FBMkJBOzs7Ozs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFIQTtBQUhBO0FBSkE7QUFjQTtBQXBCQTtBQUNBO0FBc0JBOzs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUxBO0FBT0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFFQTtBQUNBO0FBbEJBO0FBYkE7QUFDQTtBQW1DQTs7O0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFOQTtBQUNBO0FBYUE7QUFDQTtBQURBO0FBNURBO0FBZ0VBO0FBdkVBO0FBeUVBOzs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBWEE7QUFsQkE7QUFxQ0E7QUF0Q0E7QUFDQTtBQXdDQTs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFLQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBUkE7QUFTQTtBQUNBO0FBVkE7QUFXQTtBQUNBO0FBWkE7QUFhQTtBQUNBO0FBZEE7QUFlQTtBQUNBO0FBaEJBO0FBaUJBO0FBQ0E7QUFsQkE7QUFtQkE7QUFDQTtBQXBCQTtBQXFCQTtBQUNBO0FBdEJBO0FBdUJBO0FBQ0E7QUF4QkE7QUFDQTtBQTBCQTtBQTdCQTtBQURBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFHQTtBQUNBO0FBSkE7QUFLQTtBQUNBO0FBTkE7QUFPQTtBQUNBO0FBUkE7QUFTQTtBQUNBO0FBVkE7QUFXQTtBQUNBO0FBWkE7QUFhQTtBQUNBO0FBZEE7QUFDQTtBQWdCQTtBQWxCQTtBQURBOzs7Iiwic291cmNlUm9vdCI6IiJ9