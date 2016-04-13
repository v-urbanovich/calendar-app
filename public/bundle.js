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
	            if (_i === 5) {
	                _dayData.events.push({
	                    time: '07:25',
	                    title: 'Моё обычное событие',
	                    content: 'Тест Тест Тест Тест Тест ТестТест Тест ',
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
	    controller: function controller(dataGenerator, $window) {
	        this.data = {
	            daysData: $window.localStorage.data ? JSON.parse($window.localStorage.data) : dataGenerator()
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

	            $window.localStorage.data = JSON.stringify(this.data.daysData);
	        };

	        this.removeEvent = function (event, day) {
	            var index = this.data.daysData.indexOf(day),
	                eventIndex = this.data.daysData[index].events.indexOf(event);

	            this.data.daysData[index].events.splice(eventIndex, 1);

	            $window.localStorage.data = JSON.stringify(this.data.daysData);
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
	var v1="<div class=\"calendar\" ng-if=\"!$ctrl.selected\"> <header> <div class=\"title\"> <span class=\"month\">{{ $ctrl.date.getMonth() | monthFilter }}</span>\n<span class=\"year\">{{ $ctrl.date.getFullYear() }}</span> </div> <div> <div class=\"day-name\" ng-repeat=\"name in $ctrl.dayNames\">{{name}}</div> </div> </header> <section> <div class=\"day\" ng-class=\"{'not-this-month': day.month !== $ctrl.date.getMonth(), 'weekend': day.day > 5}\" ng-click=\"$ctrl.select({index: $index})\" ng-repeat=\"day in $ctrl.data\"> <div class=\"date\"> <span ng-class=\"{'today': day.today}\">{{day.date}}</span> </div> <div class=\"weekday\"> {{ day.day | dayFilter}} </div> <div class=\"events\" ng-if=\"day.events.length\"> {{ $ctrl.getEventText(day) }} </div> </div> </section> </div>";
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
	                if (edit) modal.open({ title: 'Ошибка', message: 'Нельзя редактировать прошедшие события' }, 'alert');else modal.open({ title: 'Ошибка', message: 'Нельзя добавить события на прошедшие дни' }, 'alert');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDJhN2IyZTQ5Njg4NjRiMDQxNDNjIiwid2VicGFjazovLy9qcy9jYWxlbmRhci1hcHAuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL2RhdGEtZ2VuZXJhdG9yLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL21vZGFsLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy92YWxpZGF0aW9uLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy9hZGQtZm9ybS1kYXRhLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWwiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3NlbGVjdGVkLWRheS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21vZGFsLXdpbmRvdy1jb21wb25lbnQvbW9kYWwtd2luZG93LWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbW9kYWwtd2luZG93LWNvbXBvbmVudC90ZW1wbGF0ZS9tb2RhbC10ZW1wbGF0ZS5odG1sIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvbW9udGgtZmlsdGVyLmpzIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvZGF5LWZpbHRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDJhN2IyZTQ5Njg4NjRiMDQxNDNjXG4gKiovIiwicmVxdWlyZSgnLi9hcHAnKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9jYWxlbmRhci1hcHAuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBjYWxlbmRhciA9IGFuZ3VsYXIubW9kdWxlKCdjYWxlbmRhcicsIFsnbmdBbmltYXRlJ10pO1xyXG5cclxuY2FsZW5kYXJcclxuICAgIC5mYWN0b3J5KCdkYXRhR2VuZXJhdG9yJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9kYXRhLWdlbmVyYXRvci1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgnY3JlYXRlVGltZUdyaWQnLCByZXF1aXJlKCcuL3NlcnZpY2VzL3RpbWUtZ3JpZC1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgnbW9kYWwnLCByZXF1aXJlKCcuL3NlcnZpY2VzL21vZGFsLXNlcnZpY2UnKSlcclxuICAgIC5mYWN0b3J5KCd2YWxpZGF0aW9uU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvdmFsaWRhdGlvbi1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgnZm9ybURhdGFTZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9hZGQtZm9ybS1kYXRhLXNlcnZpY2UnKSk7XHJcblxyXG5jYWxlbmRhclxyXG4gICAgLmNvbXBvbmVudCgnbWFpblZpZXcnLCByZXF1aXJlKCcuL21haW4tdmlldy1jb21wb25lbnQvbWFpbi12aWV3JykpXHJcbiAgICAuY29tcG9uZW50KCdjYWxlbmRhcicsIHJlcXVpcmUoJy4vY2FsZW5kYXItY29tcG9uZW50L2NhbGVuZGFyJykpXHJcbiAgICAuY29tcG9uZW50KCdzZWxlY3RlZERheScsIHJlcXVpcmUoJy4vc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC9zZWxlY3RlZC1kYXknKSlcclxuICAgIC5jb21wb25lbnQoJ21vZGFsV2luZG93JywgcmVxdWlyZSgnLi9tb2RhbC13aW5kb3ctY29tcG9uZW50L21vZGFsLXdpbmRvdy1jb21wb25lbnQnKSk7XHJcblxyXG5jYWxlbmRhclxyXG4gICAgLmZpbHRlcignbW9udGhGaWx0ZXInLCByZXF1aXJlKCcuL3NlcnZpY2VzL21vbnRoLWZpbHRlcicpKVxyXG4gICAgLmZpbHRlcignZGF5RmlsdGVyJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9kYXktZmlsdGVyJykpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGxldCBkYXRhQXJyYXkgPSBbXSxcbiAgICAgICAgICAgIGRhdGVOb3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDRh9C40YHQu9CwINC/0YDQtdC00YvQtNGD0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBmaXJzdERheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpLCAxKSxcbiAgICAgICAgICAgIHByZXZpb3VzTW9udGhMYXN0RGF5ID0gbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXREYXRlKCksXG4gICAgICAgICAgICBudW1iZXJPZlBhc3REYXlzID0gKGZpcnN0RGF5LmdldERheSgpIHx8IDcpIC0gMTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mUGFzdERheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgZGF0ZTogcHJldmlvdXNNb250aExhc3REYXkgLSBpLFxuICAgICAgICAgICAgICAgIGRheTogbnVtYmVyT2ZQYXN0RGF5cyAtIGksXG4gICAgICAgICAgICAgICAgeWVhcjogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBtb250aDogbmV3IERhdGUoZmlyc3REYXkgLSAxKS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgIGV2ZW50czogW10sXG4gICAgICAgICAgICAgICAgY3VzdG9tRXZlbnRzOiBbXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGF0YUFycmF5LnVuc2hpZnQoZGF5RGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0YfQuNGB0LvQsCDQvNC10YHRj9GG0LBcbiAgICAgICAgbGV0IG51bWJlck9mRGF5cyA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZEYXlzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBkYXkgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSwgaSArIDEpLFxuICAgICAgICAgICAgICAgIGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGRheTogZGF5LmdldERheSgpIHx8IDcsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5OiBkYXkuZ2V0RGF0ZSgpID09PSBkYXRlTm93LmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRheS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaSA9PT0gMTUpIHtcbiAgICAgICAgICAgICAgICBkYXlEYXRhLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGltZTogJzAwOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQndC+0LLRi9C5INCz0L7QtCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b206IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSA1KSB7XG4gICAgICAgICAgICAgICAgZGF5RGF0YS5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpbWU6ICcwNzoyNScsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn0JzQvtGRINC+0LHRi9GH0L3QvtC1INGB0L7QsdGL0YLQuNC1JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ9Ci0LXRgdGCINCi0LXRgdGCINCi0LXRgdGCINCi0LXRgdGCINCi0LXRgdGCINCi0LXRgdGC0KLQtdGB0YIg0KLQtdGB0YIgJyxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhQXJyYXkucHVzaChkYXlEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDQtNC90Lgg0YHQu9C10LTRg9GO0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBudW1iZXJPZkZ1dHVyZURheXMgPSA3IC0gZGF0YUFycmF5Lmxlbmd0aCAlIDc7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkZ1dHVyZURheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpICsgMSwgaSArIDEpLFxuICAgICAgICAgICAgICAgIGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGRheTogZGF5LmdldERheSgpIHx8IDcsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRheS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tRXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKGRheURhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGFBcnJheTtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9kYXRhLWdlbmVyYXRvci1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICBsZXQgYXJyYXkgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNDsgaSArPSAxKSB7XHJcbiAgICAgICAgICAgIGxldCBob3VycyA9ICgnMCcgKyBpKS5zbGljZSgtMikgKyAnOjAwJztcclxuXHJcbiAgICAgICAgICAgIGFycmF5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaG91cnM6IGhvdXJzLFxyXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvdGltZS1ncmlkLXNlcnZpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgkcSkge1xyXG4gICAgbGV0IHN0YXRlID0gJ2Nsb3NlJyxcclxuICAgICAgICB0eXBlID0gbnVsbCxcclxuICAgICAgICBkZWZlcjtcclxuXHJcbiAgICBsZXQgbW9kYWxWaWV3RGF0YSA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRUeXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW4oZGF0YSwgbW9kYWxfdHlwZSkge1xyXG4gICAgICAgIG1vZGFsVmlld0RhdGEuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdHlwZSA9IG1vZGFsX3R5cGU7XHJcbiAgICAgICAgc3RhdGUgPSAnb3Blbic7XHJcbiAgICAgICAgaWYgKG1vZGFsX3R5cGUgPT09ICdjb25maXJtJyB8fCBtb2RhbF90eXBlID09PSAnYWRkLWV2ZW50Jykge1xyXG4gICAgICAgICAgICBkZWZlciA9ICRxLmRlZmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZShib29sLCBkYXRhKSB7XHJcbiAgICAgICAgaWYgKGJvb2wpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEpIGRlZmVyLnJlc29sdmUoe2RhdGE6IEpTT04uc3RyaW5naWZ5KGRhdGEpfSk7XHJcbiAgICAgICAgICAgIGVsc2UgZGVmZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NvbmZpcm0nICYmIHR5cGUgPT09ICdhZGQtZXZlbnQnKSB7XHJcbiAgICAgICAgICAgIGRlZmVyLnJlamVjdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0ZSA9ICdjbG9zZSc7XHJcbiAgICAgICAgdHlwZSA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIG1vZGFsVmlld0RhdGEuZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vZGFsVmlld0RhdGE6IG1vZGFsVmlld0RhdGEsXHJcbiAgICAgICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxyXG4gICAgICAgIGdldFR5cGU6IGdldFR5cGUsXHJcbiAgICAgICAgb3Blbjogb3BlbixcclxuICAgICAgICBjbG9zZTogY2xvc2VcclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvbW9kYWwtc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsaWRhdGlvbk9iaiA9IHtcbiAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YS5ob3VycyB8fCAhZGF0YS5taW51dGVzKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUubWVzc2FnZSA9ICfQktCy0LXQtNC40YLQtSDRh9Cw0YHRiyDQuCDQvNC40L3Rg9GC0YsnO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKCtkYXRhLmhvdXJzKSB8fCBpc05hTigrZGF0YS5taW51dGVzKSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLm1lc3NhZ2UgPSAn0KfQsNGB0Ysg0Lgg0LzQuNC90YPRgtGLINC00L7Qu9C20L3RiyDQsdGL0YLRjCDRh9C40YHQu9Cw0LzQuCc7XG4gICAgICAgIH0gZWxzZSBpZiAoK2RhdGEuaG91cnMgPCAwIHx8ICtkYXRhLmhvdXJzID4gMjMgfHwgK2RhdGEubWludXRlcyA8IDAgfHwgK2RhdGEubWludXRlcyA+IDU5KSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUubWVzc2FnZSA9ICfQktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90L7QtSDQstGA0LXQvNGPJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YS50aXRsZSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGl0bGUuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGl0bGUubWVzc2FnZSA9ICfQktCy0LXQtNC40YLQtSDQt9Cw0LPQvtC70L7QstC+0LonO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEuY29udGVudCAmJiBkYXRhLmNvbnRlbnQuc3BsaXQoJyAnKS5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5jb250ZW50LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLmNvbnRlbnQubWVzc2FnZSA9ICfQlNC+0LvQttC90L4g0LHRi9GC0YwgMCDQu9C40LHQviA1INGB0LvQvtCyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uT2JqLnN0YXR1cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSB0cnVlO1xuICAgICAgICB2YWxpZGF0aW9uT2JqLmNvbnRlbnQuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgdmFsaWRhdGlvbk9iai50aXRsZS5zdGF0dXMgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHZhbGlkYXRpb25PYmo6IHZhbGlkYXRpb25PYmosXG4gICAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcbiAgICAgICAgcmVzZXQ6IHJlc2V0XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvdmFsaWRhdGlvbi1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIGhvdXJzOiAnJyxcclxuICAgICAgICBtaW51dGVzOiAnJyxcclxuICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgY29udGVudDogJydcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJEYXRhKCkge1xyXG4gICAgICAgIGRhdGEuaG91cnMgPSAnJztcclxuICAgICAgICBkYXRhLm1pbnV0ZXMgPSAnJztcclxuICAgICAgICBkYXRhLnRpdGxlID0gJyc7XHJcbiAgICAgICAgZGF0YS5jb250ZW50ID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0RGF0YShmb3JtRGF0YSkge1xyXG4gICAgICAgIGRhdGEuaG91cnMgPSBmb3JtRGF0YS50aW1lLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgIGRhdGEubWludXRlcyA9IGZvcm1EYXRhLnRpbWUuc2xpY2UoLTIpO1xyXG4gICAgICAgIGRhdGEudGl0bGUgPSBmb3JtRGF0YS50aXRsZTtcclxuICAgICAgICBkYXRhLmNvbnRlbnQgPSBmb3JtRGF0YS5jb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBjbGVhckRhdGE6IGNsZWFyRGF0YSxcclxuICAgICAgICBzZXREYXRhOiBzZXREYXRhXHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL2FkZC1mb3JtLWRhdGEtc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IG1haW5WaWV3VGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL21haW4tdmlldy10ZW1wbGF0ZS5odG1sJyk7XHJcblxyXG5jb25zdCBtYWluVmlldyA9IHtcclxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGRhdGFHZW5lcmF0b3IsICR3aW5kb3cpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSB7XHJcbiAgICAgICAgICAgIGRheXNEYXRhOiAkd2luZG93LmxvY2FsU3RvcmFnZS5kYXRhID8gSlNPTi5wYXJzZSgkd2luZG93LmxvY2FsU3RvcmFnZS5kYXRhKSA6IGRhdGFHZW5lcmF0b3IoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0RGF5ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkRGF5ID0gdGhpcy5kYXRhLmRheXNEYXRhW2luZGV4XVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMudW5zZWxlY3REYXkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5zZWxlY3RlZERheTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIGRheSkge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGEuZGF5c0RhdGEuaW5kZXhPZihkYXkpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuZGF5c0RhdGFbaW5kZXhdLmV2ZW50cy5wdXNoKGV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgICR3aW5kb3cubG9jYWxTdG9yYWdlLmRhdGEgPSBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEuZGF5c0RhdGEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbihldmVudCwgZGF5KSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZGF0YS5kYXlzRGF0YS5pbmRleE9mKGRheSksXHJcbiAgICAgICAgICAgICAgICBldmVudEluZGV4ID0gdGhpcy5kYXRhLmRheXNEYXRhW2luZGV4XS5ldmVudHMuaW5kZXhPZihldmVudCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRhdGEuZGF5c0RhdGFbaW5kZXhdLmV2ZW50cy5zcGxpY2UoZXZlbnRJbmRleCwgMSk7XHJcblxyXG4gICAgICAgICAgICAkd2luZG93LmxvY2FsU3RvcmFnZS5kYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhLmRheXNEYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogbWFpblZpZXdUZW1wbGF0ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYWluVmlldztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC9tYWluLXZpZXcuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxjYWxlbmRhciBkYXRhPVxcXCIkY3RybC5kYXRhLmRheXNEYXRhXFxcIiBzZWxlY3Q9XFxcIiRjdHJsLnNlbGVjdERheShpbmRleClcXFwiIHNlbGVjdGVkPVxcXCIkY3RybC5kYXRhLnNlbGVjdGVkRGF5XFxcIj48L2NhbGVuZGFyPiA8ZGl2IGNsYXNzPVxcXCJzZWxlY3RlZFxcXCIgbmctaWY9XFxcIiRjdHJsLmRhdGEuc2VsZWN0ZWREYXlcXFwiPiA8c2VsZWN0ZWQtZGF5IGRhdGE9XFxcIiRjdHJsLmRhdGEuc2VsZWN0ZWREYXlcXFwiIHVuc2VsZWN0PVxcXCIkY3RybC51bnNlbGVjdERheSgpXFxcIiBhZGQ9XFxcIiRjdHJsLmFkZEV2ZW50KGV2ZW50LCBkYXkpXFxcIiByZW1vdmU9XFxcIiRjdHJsLnJlbW92ZUV2ZW50KGV2ZW50LCBkYXkpXFxcIj48L3NlbGVjdGVkLWRheT4gPC9kaXY+IDxtb2RhbC13aW5kb3c+PC9tb2RhbC13aW5kb3c+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm1haW4tdmlldy10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L3RlbXBsYXRlL21haW4tdmlldy10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjYWxlbmRhclRlbXBsYXRlID0gcmVxdWlyZSgnLi8uLi9jYWxlbmRhci1jb21wb25lbnQvdGVtcGxhdGUvY2FsZW5kYXItdGVtcGxhdGUuaHRtbCcpO1xuXG5jb25zdCBjYWxlbmRhciA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCcsXG4gICAgICAgIHNlbGVjdDogJyYnLFxuICAgICAgICBzZWxlY3RlZDogJzwnXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGU7XG4gICAgICAgIHRoaXMuZGF5TmFtZXMgPSBbJ9C/0L0nLCAn0LLRgicsICfRgdGAJywgJ9GH0YInLCAn0L/RgicsICfRgdCxJywgJ9Cy0YEnXVxuXG4gICAgICAgIHRoaXMuZ2V0RXZlbnRUZXh0ID0gZnVuY3Rpb24oZGF5KSB7XG4gICAgICAgICAgICBsZXQgbnVtYmVyT2ZFdmVudHMgPSBkYXkuZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChudW1iZXJPZkV2ZW50cyA+IDEpIHJldHVybiAn0JrQvtC70LjRh9C10YHRgtCy0L4g0YHQvtCx0YvRgtC40Lk6ICcgKyBudW1iZXJPZkV2ZW50cztcbiAgICAgICAgICAgIGlmIChkYXkuZXZlbnRzWzBdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheS5ldmVudHNbMF0udGl0bGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHRlbXBsYXRlOiBjYWxlbmRhclRlbXBsYXRlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbGVuZGFyO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9jYWxlbmRhci1jb21wb25lbnQvY2FsZW5kYXIuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXYgY2xhc3M9XFxcImNhbGVuZGFyXFxcIiBuZy1pZj1cXFwiISRjdHJsLnNlbGVjdGVkXFxcIj4gPGhlYWRlcj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPiA8c3BhbiBjbGFzcz1cXFwibW9udGhcXFwiPnt7ICRjdHJsLmRhdGUuZ2V0TW9udGgoKSB8IG1vbnRoRmlsdGVyIH19PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ5ZWFyXFxcIj57eyAkY3RybC5kYXRlLmdldEZ1bGxZZWFyKCkgfX08L3NwYW4+IDwvZGl2PiA8ZGl2PiA8ZGl2IGNsYXNzPVxcXCJkYXktbmFtZVxcXCIgbmctcmVwZWF0PVxcXCJuYW1lIGluICRjdHJsLmRheU5hbWVzXFxcIj57e25hbWV9fTwvZGl2PiA8L2Rpdj4gPC9oZWFkZXI+IDxzZWN0aW9uPiA8ZGl2IGNsYXNzPVxcXCJkYXlcXFwiIG5nLWNsYXNzPVxcXCJ7J25vdC10aGlzLW1vbnRoJzogZGF5Lm1vbnRoICE9PSAkY3RybC5kYXRlLmdldE1vbnRoKCksICd3ZWVrZW5kJzogZGF5LmRheSA+IDV9XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuc2VsZWN0KHtpbmRleDogJGluZGV4fSlcXFwiIG5nLXJlcGVhdD1cXFwiZGF5IGluICRjdHJsLmRhdGFcXFwiPiA8ZGl2IGNsYXNzPVxcXCJkYXRlXFxcIj4gPHNwYW4gbmctY2xhc3M9XFxcInsndG9kYXknOiBkYXkudG9kYXl9XFxcIj57e2RheS5kYXRlfX08L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJ3ZWVrZGF5XFxcIj4ge3sgZGF5LmRheSB8IGRheUZpbHRlcn19IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudHNcXFwiIG5nLWlmPVxcXCJkYXkuZXZlbnRzLmxlbmd0aFxcXCI+IHt7ICRjdHJsLmdldEV2ZW50VGV4dChkYXkpIH19IDwvZGl2PiA8L2Rpdj4gPC9zZWN0aW9uPiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwiY2FsZW5kYXItdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzZWxlY3RlZERheVRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbCcpO1xuXG5jb25zdCBzZWxlY3RlZERheSA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCcsXG4gICAgICAgIHVuc2VsZWN0OiAnJicsXG4gICAgICAgIGFkZDogJyYnLFxuICAgICAgICByZW1vdmU6ICcmJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24obW9kYWwsIGNyZWF0ZVRpbWVHcmlkLCBmb3JtRGF0YVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50aW1lcyA9IGNyZWF0ZVRpbWVHcmlkKCk7XG5cbiAgICAgICAgdGhpcy5kYXRhLmV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gZXZlbnQudGltZS5zbGljZSgwLCAyKSAvIDE7XG4gICAgICAgICAgICB0aGlzLnRpbWVzW2luZGV4XS5ldmVudHMucHVzaChldmVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghdGhpcy5kYXRhLmV2ZW50cy5sZW5ndGgpIG1vZGFsLm9wZW4oe3RpdGxlOiAn0KHQvtC+0LHRidC10L3QuNC1JywgbWVzc2FnZTogJ9Cd0LAg0LTQsNC90L3Ri9C5INC00LXQvdGMINC90LXRgiDQt9Cw0L/Qu9Cw0L3QuNGA0L7QstCw0L3QvdGL0YUg0YHQvtCx0YvRgtC40LknfSwgJ2FsZXJ0Jyk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudCA9IGZ1bmN0aW9uKGVkaXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEueWVhciA8IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSB8fCB0aGlzLmRhdGEubW9udGggPCBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgfHwgdGhpcy5kYXRhLmRhdGUgPCBuZXcgRGF0ZSgpLmdldERhdGUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChlZGl0KSBtb2RhbC5vcGVuKHt0aXRsZTogJ9Ce0YjQuNCx0LrQsCcsIG1lc3NhZ2U6ICfQndC10LvRjNC30Y8g0YDQtdC00LDQutGC0LjRgNC+0LLQsNGC0Ywg0L/RgNC+0YjQtdC00YjQuNC1INGB0L7QsdGL0YLQuNGPJ30sICdhbGVydCcpO1xuICAgICAgICAgICAgICAgIGVsc2UgbW9kYWwub3Blbih7dGl0bGU6ICfQntGI0LjQsdC60LAnLCBtZXNzYWdlOiAn0J3QtdC70YzQt9GPINC00L7QsdCw0LLQuNGC0Ywg0YHQvtCx0YvRgtC40Y8g0L3QsCDQv9GA0L7RiNC10LTRiNC40LUg0LTQvdC4J30sICdhbGVydCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlZGl0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXQudGltZS5ldmVudHNbZWRpdC5pbmRleF0uY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLm9wZW4oe3RpdGxlOiAn0J7RiNC40LHQutCwJywgbWVzc2FnZTogJ9Cd0LXQu9GM0LfRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCDQvtGB0L3QvtCy0L3Ri9C1INGB0L7QsdGL0YLQuNGPJ30sICdhbGVydCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcm1EYXRhU2VydmljZS5zZXREYXRhKGVkaXQudGltZS5ldmVudHNbZWRpdC5pbmRleF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb2RhbC5vcGVuKHt0aXRsZTogJ9CS0LLQtdC00LjRgtC1INC00LDQvdC90YvQtScsIG1lc3NhZ2U6ICcnfSwgJ2FkZC1ldmVudCcpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZWRpdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoe2V2ZW50OiBlZGl0LnRpbWUuZXZlbnRzW2VkaXQuaW5kZXhdLCBkYXk6IGVkaXQuZGF5fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGltZUluZGV4ID0gdGhpcy50aW1lcy5pbmRleE9mKGVkaXQudGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVzW3RpbWVJbmRleF0uZXZlbnRzLnNwbGljZShlZGl0LmluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgZXZlbnREYXRhID0gSlNPTi5wYXJzZShkYXRhLmRhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogKCcwJyArIGV2ZW50RGF0YS5ob3Vycykuc2xpY2UoLTIpICsgJzonICsgKCcwJyArIGV2ZW50RGF0YS5taW51dGVzKS5zbGljZSgtMiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZXZlbnREYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZXZlbnREYXRhLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b206IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGQoe2V2ZW50OiBvYmosIGRheTogdGhpcy5kYXRhfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBvYmoudGltZS5zbGljZSgwLCAyKSAvIDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZXNbaW5kZXhdLmV2ZW50cy5wdXNoKHRoaXMuZGF0YS5ldmVudHNbdGhpcy5kYXRhLmV2ZW50cy5sZW5ndGggLSAxXSk7XG5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24oaW5kZXgsIHRpbWUsIGRheSkge1xuICAgICAgICAgICAgaWYgKHRpbWUuZXZlbnRzW2luZGV4XS5jdXN0b20pIHtcbiAgICAgICAgICAgICAgICBtb2RhbC5vcGVuKHt0aXRsZTogJ9Ce0YjQuNCx0LrQsCcsIG1lc3NhZ2U6ICfQndC10LvRjNC30Y8g0YPQtNCw0LvQuNGC0Ywg0YHQvtCx0YvRgtC40LUnfSwgJ2FsZXJ0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kYWwub3Blbih7dGl0bGU6ICfQn9C+0LTRgtCy0LXRgNC00LjRgtC1JywgbWVzc2FnZTogJ9Cj0LTQsNC70LjRgtGMINC00LDQvdC90L7QtSDRgdC+0LHRi9GC0LjQtT8nfSwgJ2NvbmZpcm0nKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoe2V2ZW50OiB0aW1lLmV2ZW50c1tpbmRleF0sIGRheTogZGF5fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVJbmRleCA9IHRoaXMudGltZXMuaW5kZXhPZih0aW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lc1t0aW1lSW5kZXhdLmV2ZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZWRpdEV2ZW50ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5hZGRFdmVudChkYXRhKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdGVtcGxhdGU6IHNlbGVjdGVkRGF5VGVtcGxhdGVcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHNlbGVjdGVkRGF5O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3NlbGVjdGVkLWRheS5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGhlYWRlciBjbGFzcz1cXFwiZ3JvdXAgc2VsZWN0ZWQtZGF5XFxcIj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPiA8c3BhbiBjbGFzcz1cXFwibW9udGhcXFwiPnt7ICRjdHJsLmRhdGEubW9udGggfCBtb250aEZpbHRlciB9fSB7eyAkY3RybC5kYXRhLmRhdGUgfX0sPC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ5ZWFyXFxcIj57eyAkY3RybC5kYXRhLnllYXIgfX08L3NwYW4+IDxkaXYgY2xhc3M9XFxcImRheVxcXCI+e3sgJGN0cmwuZGF0YS5kYXkgfCBkYXlGaWx0ZXJ9fTwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwibWVudVxcXCI+IDxkaXYgY2xhc3M9XFxcImJhY2tcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC51bnNlbGVjdCgpXFxcIj7QndCw0LfQsNC0PC9kaXY+IDxkaXYgY2xhc3M9XFxcImFkZC1ldmVudFxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmFkZEV2ZW50KClcXFwiPtCU0L7QsdCw0LLQuNGC0Ywg0YHQvtCx0YvRgtC40LU8L2Rpdj4gPC9kaXY+IDwvaGVhZGVyPiA8c2VjdGlvbj4gPGRpdiBjbGFzcz1cXFwidGltZXMgZ3JvdXBcXFwiIG5nLXJlcGVhdD1cXFwidGltZSBpbiAkY3RybC50aW1lc1xcXCI+IDxkaXYgY2xhc3M9XFxcImhvdXJcXFwiPnt7IHRpbWUuaG91cnMgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnRzXFxcIiBuZy1jbGFzcz1cXFwieydhY3RpdmVUaW1lJzogdGltZS5ldmVudHMubGVuZ3RofVxcXCI+IDxkaXYgbmctcmVwZWF0PVxcXCJldmVudCBpbiB0aW1lLmV2ZW50c1xcXCIgY2xhc3M9XFxcImV2ZW50XFxcIj4gPGRpdiBuZy1jbGljaz1cXFwiJGN0cmwuZWRpdEV2ZW50KHtpbmRleDogJGluZGV4LCB0aW1lOiB0aW1lLCBkYXk6ICRjdHJsLmRhdGF9KVxcXCIgY2xhc3M9XFxcImV2ZW50LWRhdGFcXFwiPiA8ZGl2IGNsYXNzPVxcXCJldmVudC10aW1lXFxcIj57eyBldmVudC50aW1lIH19PC9kaXY+IDxkaXYgY2xhc3M9XFxcImV2ZW50LXRpdGxlXFxcIj57eyBldmVudC50aXRsZSB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudC1jb250ZW50XFxcIj57eyBldmVudC5jb250ZW50IH19PC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudC1yZW1vdmVcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5yZW1vdmVFdmVudCgkaW5kZXgsIHRpbWUsICRjdHJsLmRhdGEpXFxcIj5YPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvc2VjdGlvbj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwic2VsZWN0ZWQtZGF5LXRlbXBsYXRlLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL3NlbGVjdGVkLWRheS1jb21wb25lbnQvdGVtcGxhdGUvc2VsZWN0ZWQtZGF5LXRlbXBsYXRlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgbW9kYWxUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvbW9kYWwtdGVtcGxhdGUuaHRtbCcpO1xyXG5cclxuY29uc3QgbW9kYWwgPSB7XHJcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbihtb2RhbCwgdmFsaWRhdGlvblNlcnZpY2UsIGZvcm1EYXRhU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMubW9kYWxWaWV3RGF0YSA9IG1vZGFsLm1vZGFsVmlld0RhdGE7XHJcbiAgICAgICAgdGhpcy5jaGVja09wZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vZGFsLmdldFN0YXRlKCkgPT09ICdvcGVuJztcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2hlY2tUeXBlID0gZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kYWwuZ2V0VHlwZSgpID09PSB0eXBlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50eXBlID0gbW9kYWwuZ2V0VHlwZTtcclxuXHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uT2JqID0gdmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGlvbk9iajtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEgPSBmb3JtRGF0YVNlcnZpY2UuZGF0YTtcclxuXHJcbiAgICAgICAgdGhpcy5jbG9zZSA9IGZ1bmN0aW9uKGJvb2wsIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRhICYmICFib29sICYmIG1vZGFsLmdldFR5cGUoKSA9PT0gJ2FkZC1ldmVudCcpIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25TZXJ2aWNlLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YVNlcnZpY2UuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8ICFib29sKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC5jbG9zZShib29sKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uU2VydmljZS5yZXNldCgpO1xyXG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gdmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGUoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsLmNsb3NlKGJvb2wsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGFTZXJ2aWNlLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiBtb2RhbFRlbXBsYXRlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9tb2RhbC13aW5kb3ctY29tcG9uZW50L21vZGFsLXdpbmRvdy1jb21wb25lbnQuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJhY2tncm91bmRcXFwiIG5nLWlmPVxcXCIkY3RybC5jaGVja09wZW4oKVxcXCI+IDxkaXYgY2xhc3M9XFxcIndpbmRvdyBhblxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrT3BlbigpXFxcIj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPnt7ICRjdHJsLm1vZGFsVmlld0RhdGEuZGF0YS50aXRsZSB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJtZXNzYWdlXFxcIiBuZy1pZj1cXFwiISRjdHJsLmNoZWNrVHlwZSgnYWRkLWV2ZW50JylcXFwiPnt7ICRjdHJsLm1vZGFsVmlld0RhdGEuZGF0YS5tZXNzYWdlIH19PC9kaXY+IDxkaXYgY2xhc3M9XFxcImFkZC1mb3JtXFxcIiBuZy1pZj1cXFwiJGN0cmwuY2hlY2tUeXBlKCdhZGQtZXZlbnQnKVxcXCI+IDx0YWJsZT4gPHRyIGNsYXNzPVxcXCJhZGQtZm9ybS10aW1lXFxcIj4gPHRkPtCS0YDQtdC80Y86PC90ZD4gPHRkPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwiJGN0cmwuZGF0YS5ob3Vyc1xcXCI+OjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwiJGN0cmwuZGF0YS5taW51dGVzXFxcIj48L3RkPiA8dGQgbmctaWY9XFxcIiRjdHJsLnZhbGlkYXRpb25PYmoudGltZS5zdGF0dXNcXFwiIGNsYXNzPVxcXCJ3YXJuaW5nXFxcIj57eyAkY3RybC52YWxpZGF0aW9uT2JqLnRpbWUubWVzc2FnZSB9fTwvdGQ+IDwvdHI+IDx0ciBjbGFzcz1cXFwiYWRkLWZvcm0tdGl0bGVcXFwiPiA8dGQ+0JfQsNCz0L7Qu9C+0LLQvtC6OjwvdGQ+IDx0ZD48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIiRjdHJsLmRhdGEudGl0bGVcXFwiPjwvdGQ+IDx0ZCBuZy1pZj1cXFwiJGN0cmwudmFsaWRhdGlvbk9iai50aXRsZS5zdGF0dXNcXFwiIGNsYXNzPVxcXCJ3YXJuaW5nXFxcIj57eyAkY3RybC52YWxpZGF0aW9uT2JqLnRpdGxlLm1lc3NhZ2UgfX08L3RkPiA8L3RyPiA8dHIgY2xhc3M9XFxcImFkZC1mb3JtLWNvbnRlbnRcXFwiPiA8dGQ+0J7Qv9C40YHQsNC90LjQtTo8L3RkPiA8dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCIkY3RybC5kYXRhLmNvbnRlbnRcXFwiPjwvdGQ+IDx0ZCBuZy1pZj1cXFwiJGN0cmwudmFsaWRhdGlvbk9iai5jb250ZW50LnN0YXR1c1xcXCIgY2xhc3M9XFxcIndhcm5pbmdcXFwiPnt7ICRjdHJsLnZhbGlkYXRpb25PYmouY29udGVudC5tZXNzYWdlIH19PC90ZD4gPC90cj4gPC90YWJsZT4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImJ1dHRvbnMgZ3JvdXBcXFwiPiA8ZGl2IGNsYXNzPVxcXCJjb25maXJtXFxcIiBuZy1pZj1cXFwiJGN0cmwuY2hlY2tUeXBlKCdjb25maXJtJylcXFwiPiA8ZGl2IGNsYXNzPVxcXCJyZWplY3RcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSgpXFxcIj7QntGC0LzQtdC90LA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwib2tcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSh0cnVlKVxcXCI+T0s8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcImFsZXJ0XFxcIiBuZy1pZj1cXFwiJGN0cmwuY2hlY2tUeXBlKCdhbGVydCcpXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UoKVxcXCI+0JfQsNC60YDRi9GC0Yw8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiYWRkLWV2ZW50XFxcIiBuZy1pZj1cXFwiJGN0cmwuY2hlY2tUeXBlKCdhZGQtZXZlbnQnKVxcXCI+IDxkaXYgY2xhc3M9XFxcInJlamVjdFxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNsb3NlKClcXFwiPtCe0YLQvNC10L3QsDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJva1xcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNsb3NlKHRydWUsICRjdHJsLmRhdGEpXFxcIj7QodC+0YXRgNCw0L3QuNGC0Yw8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJjbG9zZVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNsb3NlKClcXFwiPng8L2Rpdj4gPC9kaXY+IDwvZGl2PlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJtb2RhbC10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tb2RhbC13aW5kb3ctY29tcG9uZW50L3RlbXBsYXRlL21vZGFsLXRlbXBsYXRlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmdW5jdGlvbihtb250aCkge1xuICAgICAgICBtb250aCA9IG1vbnRoICsgMTtcbiAgICAgICAgc3dpdGNoIChtb250aCkge1xuICAgICAgICAgICAgY2FzZSAxOiBtb250aCA9ICfQr9C90LLQsNGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOiBtb250aCA9ICfQpNC10LLRgNCw0LvRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6IG1vbnRoID0gJ9Cc0LDRgNGCJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDogbW9udGggPSAn0JDQv9GA0LXQu9GMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTogbW9udGggPSAn0JzQsNC5JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjogbW9udGggPSAn0JjRjtC90YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3OiBtb250aCA9ICfQmNGO0LvRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6IG1vbnRoID0gJ9CQ0LLQs9GD0YHRgic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDk6IG1vbnRoID0gJ9Ch0LXQvdGC0Y/QsdGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMCA6IG1vbnRoID0gJ9Ce0LrRgtGP0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTE6IG1vbnRoID0gJ9Cd0L7Rj9Cx0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEyOiBtb250aCA9ICfQlNC10LrQsNCx0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb250aDtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9tb250aC1maWx0ZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRheSkge1xuICAgICAgICBzd2l0Y2ggKGRheSkge1xuICAgICAgICAgICAgY2FzZSAxOiBkYXkgPSAn0J/QvtC90LXQtNC10LvRjNC90LjQuic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6IGRheSA9ICfQktGC0L7RgNC90LjQuic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6IGRheSA9ICfQodGA0LXQtNCwJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDogZGF5ID0gJ9Cn0LXRgtCy0LXRgNCzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTogZGF5ID0gJ9Cf0Y/RgtC90LjRhtCwJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjogZGF5ID0gJ9Ch0YPQsdCx0L7RgtCwJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNzogZGF5ID0gJ9CS0L7RgdC60YDQtdGB0LXQvdC40LUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRheTtcbiAgICB9XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9kYXktZmlsdGVyLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDdENBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBS0E7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTtBQVhBO0FBQ0E7O0FBVkE7QUFDQTtBQXlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBQ0E7QUFRQTtBQTNCQTtBQUNBOztBQTNCQTtBQUNBO0FBMERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFDQTtBQVNBO0FBWkE7QUFDQTtBQWNBO0FBMUVBO0FBREE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSEE7QUFDQTtBQVFBO0FBWkE7QUFEQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQUNBO0FBU0E7QUFDQTtBQUNBO0FBREE7QUFJQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBckNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBVkE7QUFDQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBM0JBO0FBQ0E7QUE2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBdkRBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBdEJBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFwQkE7QUE2QkE7QUE5QkE7QUFDQTtBQWdDQTs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBSEE7QUFIQTtBQUpBO0FBY0E7QUFwQkE7QUFDQTtBQXNCQTs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU1BOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUVBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFMQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBRUE7QUFDQTtBQWxCQTtBQWRBO0FBQ0E7QUFvQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTkE7QUFDQTtBQWFBO0FBQ0E7QUFEQTtBQTdEQTtBQWlFQTtBQXhFQTtBQTBFQTs7Ozs7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQVhBO0FBbEJBO0FBcUNBO0FBdENBO0FBQ0E7QUF3Q0E7Ozs7OztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQVJBO0FBU0E7QUFDQTtBQVZBO0FBV0E7QUFDQTtBQVpBO0FBYUE7QUFDQTtBQWRBO0FBZUE7QUFDQTtBQWhCQTtBQWlCQTtBQUNBO0FBbEJBO0FBbUJBO0FBQ0E7QUFwQkE7QUFxQkE7QUFDQTtBQXRCQTtBQXVCQTtBQUNBO0FBeEJBO0FBQ0E7QUEwQkE7QUE3QkE7QUFEQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQVJBO0FBU0E7QUFDQTtBQVZBO0FBV0E7QUFDQTtBQVpBO0FBYUE7QUFDQTtBQWRBO0FBQ0E7QUFnQkE7QUFsQkE7QUFEQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==