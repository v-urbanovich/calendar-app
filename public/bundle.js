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

	calendar.factory('dataGenerator', __webpack_require__(2)).factory('createTimeGrid', __webpack_require__(3)).factory('modal', __webpack_require__(4)).factory('validationService', __webpack_require__(5)).factory('formDataService', __webpack_require__(6)).factory('validateDate', __webpack_require__(30));

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
	                events: []
	            };

	            if (i === 2) {
	                dayData.events.push({
	                    time: '00:00',
	                    title: 'День защиты прав',
	                    content: '',
	                    custom: true
	                });
	            }

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

	            if (_i2 === 0) {
	                _dayData2.events.push({
	                    time: '00:00',
	                    title: 'День космонавтики',
	                    content: '',
	                    custom: true
	                });
	            }

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

	        //������ ��� ��������� �����
	        var array = [];

	        //��������� ������
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
	        modalViewData = {},
	        defer = void 0;

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
	        //данные
	        this.data = {
	            daysData: $window.localStorage.data ? JSON.parse($window.localStorage.data) : dataGenerator()
	        };

	        //выбрать день
	        this.selectDay = function (index) {
	            this.data.selectedDay = this.data.daysData[index];
	        };

	        //вернуться к колендарю
	        this.unselectDay = function () {
	            delete this.data.selectedDay;
	        };

	        //добавить событие
	        this.addEvent = function (event, day) {
	            var index = this.data.daysData.indexOf(day);
	            this.data.daysData[index].events.push(event);

	            //сохранить состояние
	            $window.localStorage.data = JSON.stringify(this.data.daysData);
	        };

	        //удалить событие
	        this.removeEvent = function (event, day) {
	            var index = this.data.daysData.indexOf(day),
	                eventIndex = this.data.daysData[index].events.indexOf(event);

	            this.data.daysData[index].events.splice(eventIndex, 1);

	            //сохранить состояние
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
	var v1="<div class=\"calendar\" ng-if=\"!$ctrl.selected\"> <header> <div class=\"title\"> <span class=\"month\">{{ $ctrl.date.getMonth() | monthFilter }}</span>\n<span class=\"year\">{{ $ctrl.date.getFullYear() }}</span> </div> <div> <div class=\"day-name\" ng-repeat=\"name in $ctrl.dayNames\">{{name}}</div> </div> </header> <section> <div class=\"day\" ng-class=\"{'not-this-month': day.month !== $ctrl.date.getMonth(), 'weekend': day.day > 5}\" ng-click=\"$ctrl.select({index: $index})\" ng-repeat=\"day in $ctrl.data\"> <div class=\"date\"> <span ng-class=\"{'today': day.today}\">{{day.date}}</span> </div> <div class=\"weekday\">{{ day.day | dayFilter}}</div> <div class=\"events\" ng-if=\"day.events.length\">{{ $ctrl.getEventText(day) }}</div> </div> </section> </div>";
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
	    controller: function controller(modal, createTimeGrid, formDataService, validateDate) {
	        var _this = this;

	        this.times = createTimeGrid();

	        //добавить события в сетку
	        this.data.events.forEach(function (event) {
	            var index = event.time.slice(0, 2) / 1;
	            _this.times[index].events.push(event);
	        });

	        //вывести сообщение об отсутствии сообщений
	        if (!this.data.events.length) modal.open({ title: 'Сообщение', message: 'На данный день нет запланированных событий' }, 'alert');

	        //добавить событие
	        this.addEvent = function (edit) {
	            var _this2 = this;

	            //проверить дату
	            if (validateDate(this.data)) {
	                if (edit) modal.open({ title: 'Ошибка', message: 'Нельзя редактировать прошедшие события' }, 'alert');else modal.open({ title: 'Ошибка', message: 'Нельзя добавить события на прошедшие дни' }, 'alert');
	                return;
	            }

	            //при редактировании события
	            if (edit) {
	                if (edit.time.events[edit.index].custom) {
	                    modal.open({ title: 'Ошибка', message: 'Нельзя редактировать основные события' }, 'alert');
	                    return;
	                }
	                formDataService.setData(edit.time.events[edit.index]);
	            }

	            //открыть окно
	            modal.open({ title: 'Введите данные', message: '' }, 'add-event').then(function (data) {
	                //удалить редактируемое
	                if (edit) {
	                    _this2.remove({ event: edit.time.events[edit.index], day: edit.day });
	                    var timeIndex = _this2.times.indexOf(edit.time);
	                    _this2.times[timeIndex].events.splice(edit.index, 1);
	                }

	                //создать объект с данными
	                var eventData = JSON.parse(data.data),
	                    obj = {
	                    time: ('0' + eventData.hours).slice(-2) + ':' + ('0' + eventData.minutes).slice(-2),
	                    title: eventData.title,
	                    content: eventData.content,
	                    custom: false
	                };

	                //добавить в базу
	                _this2.add({ event: obj, day: _this2.data });

	                //добавить в сетку
	                var index = obj.time.slice(0, 2) / 1;
	                _this2.times[index].events.push(_this2.data.events[_this2.data.events.length - 1]);
	            });
	        };

	        //удалить событие
	        this.removeEvent = function (index, time, day) {
	            var _this3 = this;

	            //проверить события по умолчанию
	            if (time.events[index].custom) {
	                modal.open({ title: 'Ошибка', message: 'Нельзя удалить событие' }, 'alert');
	                return;
	            }

	            //запросить подтверждение, удалить
	            modal.open({ title: 'Подтвердите', message: 'Удалить данное событие?' }, 'confirm').then(function () {
	                _this3.remove({ event: time.events[index], day: day });

	                var timeIndex = _this3.times.indexOf(time);
	                _this3.times[timeIndex].events.splice(index, 1);
	            });
	        };

	        //редактировать событие
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

	        //проверить состояние
	        this.checkOpen = function () {
	            return modal.getState() === 'open';
	        };

	        //проверить тип окна
	        this.checkType = function (type) {
	            return modal.getType() === type;
	        };

	        this.type = modal.getType;

	        //данные валидации
	        this.validationObj = validationService.validationObj;

	        this.stopPropagation = function (event) {
	            event.stopImmediatePropagation();
	        };

	        //данные ввода
	        this.data = formDataService.data;

	        //закрыть окно
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
	var v1="<div class=\"modal-background\" ng-if=\"$ctrl.checkOpen()\"> <div class=\"window an\" ng-if=\"$ctrl.checkOpen()\">  <div class=\"title\">{{ $ctrl.modalViewData.data.title }}</div>  <div class=\"message\" ng-if=\"!$ctrl.checkType('add-event')\">{{ $ctrl.modalViewData.data.message }}</div>  <div class=\"add-form\" ng-if=\"$ctrl.checkType('add-event')\"> <table> <tr class=\"add-form-time\"> <td>Время:</td> <td><input type=\"text\" ng-model=\"$ctrl.data.hours\">:<input type=\"text\" ng-model=\"$ctrl.data.minutes\"></td> <td ng-if=\"$ctrl.validationObj.time.status\" class=\"warning\">{{ $ctrl.validationObj.time.message }}</td> </tr> <tr class=\"add-form-title\"> <td>Заголовок:</td> <td><input type=\"text\" ng-model=\"$ctrl.data.title\"></td> <td ng-if=\"$ctrl.validationObj.title.status\" class=\"warning\">{{ $ctrl.validationObj.title.message }}</td> </tr> <tr class=\"add-form-content\"> <td>Описание:</td> <td><input type=\"text\" ng-model=\"$ctrl.data.content\"></td> <td ng-if=\"$ctrl.validationObj.content.status\" class=\"warning\">{{ $ctrl.validationObj.content.message }}</td> </tr> </table> </div>  <div class=\"buttons group\"> <div class=\"confirm\" ng-if=\"$ctrl.checkType('confirm')\"> <div class=\"reject\" ng-click=\"$ctrl.close()\">Отмена</div> <div class=\"ok\" ng-click=\"$ctrl.close(true)\">OK</div> </div> <div class=\"alert\" ng-if=\"$ctrl.checkType('alert')\" ng-click=\"$ctrl.close()\">Закрыть</div> <div class=\"add-event\" ng-if=\"$ctrl.checkType('add-event')\"> <div class=\"reject\" ng-click=\"$ctrl.close()\">Отмена</div> <div class=\"ok\" ng-click=\"$ctrl.close(true, $ctrl.data)\">Сохранить</div> </div> </div>  <div class=\"close\" ng-click=\"$ctrl.close()\">x</div> </div> </div>";
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

/***/ },
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	    return function (data) {
	        var dateOfDay = new Date(data.year, data.month, data.date),
	            dateNow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

	        if (dateOfDay.getTime() < dateNow.getTime()) return true;
	    };
		};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDMwMWZkOTU5NTQzZGJkZjAwNDNiIiwid2VicGFjazovLy9qcy9jYWxlbmRhci1hcHAuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL2RhdGEtZ2VuZXJhdG9yLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL21vZGFsLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy92YWxpZGF0aW9uLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy9hZGQtZm9ybS1kYXRhLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC90ZW1wbGF0ZS9tYWluLXZpZXctdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWwiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3NlbGVjdGVkLWRheS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21vZGFsLXdpbmRvdy1jb21wb25lbnQvbW9kYWwtd2luZG93LWNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbW9kYWwtd2luZG93LWNvbXBvbmVudC90ZW1wbGF0ZS9tb2RhbC10ZW1wbGF0ZS5odG1sIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvbW9udGgtZmlsdGVyLmpzIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvZGF5LWZpbHRlci5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL3ZhbGlkYXRlLWRhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzMDFmZDk1OTU0M2RiZGYwMDQzYlxuICoqLyIsInJlcXVpcmUoJy4vYXBwJyk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvY2FsZW5kYXItYXBwLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuY29uc3QgY2FsZW5kYXIgPSBhbmd1bGFyLm1vZHVsZSgnY2FsZW5kYXInLCBbJ25nQW5pbWF0ZSddKTtcclxuXHJcbmNhbGVuZGFyXHJcbiAgICAuZmFjdG9yeSgnZGF0YUdlbmVyYXRvcicsIHJlcXVpcmUoJy4vc2VydmljZXMvZGF0YS1nZW5lcmF0b3Itc2VydmljZScpKVxyXG4gICAgLmZhY3RvcnkoJ2NyZWF0ZVRpbWVHcmlkJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy90aW1lLWdyaWQtc2VydmljZScpKVxyXG4gICAgLmZhY3RvcnkoJ21vZGFsJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9tb2RhbC1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgndmFsaWRhdGlvblNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL3ZhbGlkYXRpb24tc2VydmljZScpKVxyXG4gICAgLmZhY3RvcnkoJ2Zvcm1EYXRhU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvYWRkLWZvcm0tZGF0YS1zZXJ2aWNlJykpXHJcbiAgICAuZmFjdG9yeSgndmFsaWRhdGVEYXRlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy92YWxpZGF0ZS1kYXRlJykpO1xyXG5cclxuY2FsZW5kYXJcclxuICAgIC5jb21wb25lbnQoJ21haW5WaWV3JywgcmVxdWlyZSgnLi9tYWluLXZpZXctY29tcG9uZW50L21haW4tdmlldycpKVxyXG4gICAgLmNvbXBvbmVudCgnY2FsZW5kYXInLCByZXF1aXJlKCcuL2NhbGVuZGFyLWNvbXBvbmVudC9jYWxlbmRhcicpKVxyXG4gICAgLmNvbXBvbmVudCgnc2VsZWN0ZWREYXknLCByZXF1aXJlKCcuL3NlbGVjdGVkLWRheS1jb21wb25lbnQvc2VsZWN0ZWQtZGF5JykpXHJcbiAgICAuY29tcG9uZW50KCdtb2RhbFdpbmRvdycsIHJlcXVpcmUoJy4vbW9kYWwtd2luZG93LWNvbXBvbmVudC9tb2RhbC13aW5kb3ctY29tcG9uZW50JykpO1xyXG5cclxuY2FsZW5kYXJcclxuICAgIC5maWx0ZXIoJ21vbnRoRmlsdGVyJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9tb250aC1maWx0ZXInKSlcclxuICAgIC5maWx0ZXIoJ2RheUZpbHRlcicsIHJlcXVpcmUoJy4vc2VydmljZXMvZGF5LWZpbHRlcicpKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZGF0YUFycmF5ID0gW10sXG4gICAgICAgICAgICBkYXRlTm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0YfQuNGB0LvQsCDQv9GA0LXQtNGL0LTRg9GJ0LXQs9C+INC80LXRgdGP0YbQsFxuICAgICAgICBsZXQgZmlyc3REYXkgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSwgMSksXG4gICAgICAgICAgICBwcmV2aW91c01vbnRoTGFzdERheSA9IG5ldyBEYXRlKGZpcnN0RGF5IC0gMSkuZ2V0RGF0ZSgpLFxuICAgICAgICAgICAgbnVtYmVyT2ZQYXN0RGF5cyA9IChmaXJzdERheS5nZXREYXkoKSB8fCA3KSAtIDE7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlBhc3REYXlzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBkYXlEYXRhID0ge1xuICAgICAgICAgICAgICAgIGRhdGU6IHByZXZpb3VzTW9udGhMYXN0RGF5IC0gaSxcbiAgICAgICAgICAgICAgICBkYXk6IG51bWJlck9mUGFzdERheXMgLSBpLFxuICAgICAgICAgICAgICAgIHllYXI6IG5ldyBEYXRlKGZpcnN0RGF5IC0gMSkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICB0b2RheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgbW9udGg6IG5ldyBEYXRlKGZpcnN0RGF5IC0gMSkuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgICAgICBldmVudHM6IFtdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICAgICAgICAgIGRheURhdGEuZXZlbnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0aW1lOiAnMDA6MDAnLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ9CU0LXQvdGMINC30LDRidC40YLRiyDQv9GA0LDQsicsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b206IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGF0YUFycmF5LnVuc2hpZnQoZGF5RGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0YfQuNGB0LvQsCDQvNC10YHRj9GG0LBcbiAgICAgICAgbGV0IG51bWJlck9mRGF5cyA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZEYXlzOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGxldCBkYXkgPSBuZXcgRGF0ZShkYXRlTm93LmdldEZ1bGxZZWFyKCksIGRhdGVOb3cuZ2V0TW9udGgoKSwgaSArIDEpLFxuICAgICAgICAgICAgICAgIGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGRheTogZGF5LmdldERheSgpIHx8IDcsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5OiBkYXkuZ2V0RGF0ZSgpID09PSBkYXRlTm93LmdldERhdGUoKSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRheS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaSA9PT0gMTUpIHtcbiAgICAgICAgICAgICAgICBkYXlEYXRhLmV2ZW50cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdGltZTogJzAwOjAwJyxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfQndC+0LLRi9C5INCz0L7QtCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b206IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID09PSA1KSB7XG4gICAgICAgICAgICAgICAgZGF5RGF0YS5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpbWU6ICcwNzoyNScsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn0JzQvtGRINC+0LHRi9GH0L3QvtC1INGB0L7QsdGL0YLQuNC1JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ9Ci0LXRgdGCINCi0LXRgdGCINCi0LXRgdGCINCi0LXRgdGCINCi0LXRgdGCINCi0LXRgdGC0KLQtdGB0YIg0KLQtdGB0YIgJyxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhQXJyYXkucHVzaChkYXlEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDQtNC90Lgg0YHQu9C10LTRg9GO0YnQtdCz0L4g0LzQtdGB0Y/RhtCwXG4gICAgICAgIGxldCBudW1iZXJPZkZ1dHVyZURheXMgPSA3IC0gZGF0YUFycmF5Lmxlbmd0aCAlIDc7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkZ1dHVyZURheXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgbGV0IGRheSA9IG5ldyBEYXRlKGRhdGVOb3cuZ2V0RnVsbFllYXIoKSwgZGF0ZU5vdy5nZXRNb250aCgpICsgMSwgaSArIDEpLFxuICAgICAgICAgICAgICAgIGRheURhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGU6IGRheS5nZXREYXRlKCksXG4gICAgICAgICAgICAgICAgICAgIGRheTogZGF5LmdldERheSgpIHx8IDcsXG4gICAgICAgICAgICAgICAgICAgIHRvZGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbW9udGg6IGRheS5nZXRNb250aCgpLFxuICAgICAgICAgICAgICAgICAgICB5ZWFyOiBkYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tRXZlbnRzOiBbXVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF5RGF0YS5ldmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHRpbWU6ICcwMDowMCcsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn0JTQtdC90Ywg0LrQvtGB0LzQvtC90LDQstGC0LjQutC4JyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJycsXG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhQXJyYXkucHVzaChkYXlEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhQXJyYXk7XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvZGF0YS1nZW5lcmF0b3Itc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8v77+977+977+977+977+977+9IO+/ve+/ve+/vSDvv73vv73vv73vv73vv73vv73vv73vv73vv70g77+977+977+977+977+9XHJcbiAgICAgICAgbGV0IGFycmF5ID0gW107XHJcblxyXG4gICAgICAgIC8v77+977+977+977+977+977+977+977+977+9IO+/ve+/ve+/ve+/ve+/ve+/vVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQ7IGkgKz0gMSkge1xyXG4gICAgICAgICAgICBsZXQgaG91cnMgPSAoJzAnICsgaSkuc2xpY2UoLTIpICsgJzowMCc7XHJcblxyXG4gICAgICAgICAgICBhcnJheS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGhvdXJzOiBob3VycyxcclxuICAgICAgICAgICAgICAgIGV2ZW50czogW11cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL3RpbWUtZ3JpZC1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoJHEpIHtcclxuICAgIGxldCBzdGF0ZSA9ICdjbG9zZScsXHJcbiAgICAgICAgdHlwZSA9IG51bGwsXHJcbiAgICAgICAgbW9kYWxWaWV3RGF0YSA9IHt9LFxyXG4gICAgICAgIGRlZmVyO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VHlwZSgpIHtcclxuICAgICAgICByZXR1cm4gdHlwZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuKGRhdGEsIG1vZGFsX3R5cGUpIHtcclxuICAgICAgICBtb2RhbFZpZXdEYXRhLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHR5cGUgPSBtb2RhbF90eXBlO1xyXG4gICAgICAgIHN0YXRlID0gJ29wZW4nO1xyXG5cclxuICAgICAgICBpZiAobW9kYWxfdHlwZSA9PT0gJ2NvbmZpcm0nIHx8IG1vZGFsX3R5cGUgPT09ICdhZGQtZXZlbnQnKSB7XHJcbiAgICAgICAgICAgIGRlZmVyID0gJHEuZGVmZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlKGJvb2wsIGRhdGEpIHtcclxuICAgICAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YSkgZGVmZXIucmVzb2x2ZSh7ZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSl9KTtcclxuICAgICAgICAgICAgZWxzZSBkZWZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnY29uZmlybScgJiYgdHlwZSA9PT0gJ2FkZC1ldmVudCcpIHtcclxuICAgICAgICAgICAgZGVmZXIucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0ZSA9ICdjbG9zZSc7XHJcbiAgICAgICAgdHlwZSA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIG1vZGFsVmlld0RhdGEuZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vZGFsVmlld0RhdGE6IG1vZGFsVmlld0RhdGEsXHJcbiAgICAgICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxyXG4gICAgICAgIGdldFR5cGU6IGdldFR5cGUsXHJcbiAgICAgICAgb3Blbjogb3BlbixcclxuICAgICAgICBjbG9zZTogY2xvc2VcclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvbW9kYWwtc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsaWRhdGlvbk9iaiA9IHtcbiAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICB0aW1lOiB7XG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgfSxcbiAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgIHN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlOiAnJ1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgbWVzc2FnZTogJydcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YS5ob3VycyB8fCAhZGF0YS5taW51dGVzKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUubWVzc2FnZSA9ICfQktCy0LXQtNC40YLQtSDRh9Cw0YHRiyDQuCDQvNC40L3Rg9GC0YsnO1xuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKCtkYXRhLmhvdXJzKSB8fCBpc05hTigrZGF0YS5taW51dGVzKSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5zdGF0dXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLm1lc3NhZ2UgPSAn0KfQsNGB0Ysg0Lgg0LzQuNC90YPRgtGLINC00L7Qu9C20L3RiyDQsdGL0YLRjCDRh9C40YHQu9Cw0LzQuCc7XG4gICAgICAgIH0gZWxzZSBpZiAoK2RhdGEuaG91cnMgPCAwIHx8ICtkYXRhLmhvdXJzID4gMjMgfHwgK2RhdGEubWludXRlcyA8IDAgfHwgK2RhdGEubWludXRlcyA+IDU5KSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai50aW1lLnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnRpbWUubWVzc2FnZSA9ICfQktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90L7QtSDQstGA0LXQvNGPJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGF0YS50aXRsZSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGl0bGUuc3RhdHVzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhbGlkYXRpb25PYmoudGl0bGUubWVzc2FnZSA9ICfQktCy0LXQtNC40YLQtSDQt9Cw0LPQvtC70L7QstC+0LonO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEuY29udGVudCAmJiBkYXRhLmNvbnRlbnQuc3BsaXQoJyAnKS5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLnN0YXR1cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFsaWRhdGlvbk9iai5jb250ZW50LnN0YXR1cyA9IHRydWU7XG4gICAgICAgICAgICB2YWxpZGF0aW9uT2JqLmNvbnRlbnQubWVzc2FnZSA9ICfQlNC+0LvQttC90L4g0LHRi9GC0YwgMCDQu9C40LHQviA1INGB0LvQvtCyJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uT2JqLnN0YXR1cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgdmFsaWRhdGlvbk9iai5zdGF0dXMgPSB0cnVlO1xuICAgICAgICB2YWxpZGF0aW9uT2JqLmNvbnRlbnQuc3RhdHVzID0gZmFsc2U7XG4gICAgICAgIHZhbGlkYXRpb25PYmoudGltZS5zdGF0dXMgPSBmYWxzZTtcbiAgICAgICAgdmFsaWRhdGlvbk9iai50aXRsZS5zdGF0dXMgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHZhbGlkYXRpb25PYmo6IHZhbGlkYXRpb25PYmosXG4gICAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZSxcbiAgICAgICAgcmVzZXQ6IHJlc2V0XG4gICAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvdmFsaWRhdGlvbi1zZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIGhvdXJzOiAnJyxcclxuICAgICAgICBtaW51dGVzOiAnJyxcclxuICAgICAgICB0aXRsZTogJycsXHJcbiAgICAgICAgY29udGVudDogJydcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJEYXRhKCkge1xyXG4gICAgICAgIGRhdGEuaG91cnMgPSAnJztcclxuICAgICAgICBkYXRhLm1pbnV0ZXMgPSAnJztcclxuICAgICAgICBkYXRhLnRpdGxlID0gJyc7XHJcbiAgICAgICAgZGF0YS5jb250ZW50ID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0RGF0YShmb3JtRGF0YSkge1xyXG4gICAgICAgIGRhdGEuaG91cnMgPSBmb3JtRGF0YS50aW1lLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgIGRhdGEubWludXRlcyA9IGZvcm1EYXRhLnRpbWUuc2xpY2UoLTIpO1xyXG4gICAgICAgIGRhdGEudGl0bGUgPSBmb3JtRGF0YS50aXRsZTtcclxuICAgICAgICBkYXRhLmNvbnRlbnQgPSBmb3JtRGF0YS5jb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBjbGVhckRhdGE6IGNsZWFyRGF0YSxcclxuICAgICAgICBzZXREYXRhOiBzZXREYXRhXHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL2FkZC1mb3JtLWRhdGEtc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IG1haW5WaWV3VGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL21haW4tdmlldy10ZW1wbGF0ZS5odG1sJyk7XHJcblxyXG5jb25zdCBtYWluVmlldyA9IHtcclxuICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGRhdGFHZW5lcmF0b3IsICR3aW5kb3cpIHtcclxuICAgICAgICAvL9C00LDQvdC90YvQtVxyXG4gICAgICAgIHRoaXMuZGF0YSA9IHtcclxuICAgICAgICAgICAgZGF5c0RhdGE6ICR3aW5kb3cubG9jYWxTdG9yYWdlLmRhdGEgPyBKU09OLnBhcnNlKCR3aW5kb3cubG9jYWxTdG9yYWdlLmRhdGEpIDogZGF0YUdlbmVyYXRvcigpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QstGL0LHRgNCw0YLRjCDQtNC10L3RjFxyXG4gICAgICAgIHRoaXMuc2VsZWN0RGF5ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkRGF5ID0gdGhpcy5kYXRhLmRheXNEYXRhW2luZGV4XVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0LLQtdGA0L3Rg9GC0YzRgdGPINC6INC60L7Qu9C10L3QtNCw0YDRjlxyXG4gICAgICAgIHRoaXMudW5zZWxlY3REYXkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZGF0YS5zZWxlY3RlZERheTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0YHQvtCx0YvRgtC40LVcclxuICAgICAgICB0aGlzLmFkZEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQsIGRheSkge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmRhdGEuZGF5c0RhdGEuaW5kZXhPZihkYXkpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuZGF5c0RhdGFbaW5kZXhdLmV2ZW50cy5wdXNoKGV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgIC8v0YHQvtGF0YDQsNC90LjRgtGMINGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICAkd2luZG93LmxvY2FsU3RvcmFnZS5kYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhLmRheXNEYXRhKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL9GD0LTQsNC70LjRgtGMINGB0L7QsdGL0YLQuNC1XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGV2ZW50LCBkYXkpIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5kYXRhLmRheXNEYXRhLmluZGV4T2YoZGF5KSxcclxuICAgICAgICAgICAgICAgIGV2ZW50SW5kZXggPSB0aGlzLmRhdGEuZGF5c0RhdGFbaW5kZXhdLmV2ZW50cy5pbmRleE9mKGV2ZW50KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5kYXlzRGF0YVtpbmRleF0uZXZlbnRzLnNwbGljZShldmVudEluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIC8v0YHQvtGF0YDQsNC90LjRgtGMINGB0L7RgdGC0L7Rj9C90LjQtVxyXG4gICAgICAgICAgICAkd2luZG93LmxvY2FsU3RvcmFnZS5kYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhLmRheXNEYXRhKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB0ZW1wbGF0ZTogbWFpblZpZXdUZW1wbGF0ZVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYWluVmlldztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbWFpbi12aWV3LWNvbXBvbmVudC9tYWluLXZpZXcuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxjYWxlbmRhciBkYXRhPVxcXCIkY3RybC5kYXRhLmRheXNEYXRhXFxcIiBzZWxlY3Q9XFxcIiRjdHJsLnNlbGVjdERheShpbmRleClcXFwiIHNlbGVjdGVkPVxcXCIkY3RybC5kYXRhLnNlbGVjdGVkRGF5XFxcIj48L2NhbGVuZGFyPiA8ZGl2IGNsYXNzPVxcXCJzZWxlY3RlZFxcXCIgbmctaWY9XFxcIiRjdHJsLmRhdGEuc2VsZWN0ZWREYXlcXFwiPiA8c2VsZWN0ZWQtZGF5IGRhdGE9XFxcIiRjdHJsLmRhdGEuc2VsZWN0ZWREYXlcXFwiIHVuc2VsZWN0PVxcXCIkY3RybC51bnNlbGVjdERheSgpXFxcIiBhZGQ9XFxcIiRjdHJsLmFkZEV2ZW50KGV2ZW50LCBkYXkpXFxcIiByZW1vdmU9XFxcIiRjdHJsLnJlbW92ZUV2ZW50KGV2ZW50LCBkYXkpXFxcIj48L3NlbGVjdGVkLWRheT4gPC9kaXY+IDxtb2RhbC13aW5kb3c+PC9tb2RhbC13aW5kb3c+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm1haW4tdmlldy10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctY29tcG9uZW50L3RlbXBsYXRlL21haW4tdmlldy10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjYWxlbmRhclRlbXBsYXRlID0gcmVxdWlyZSgnLi8uLi9jYWxlbmRhci1jb21wb25lbnQvdGVtcGxhdGUvY2FsZW5kYXItdGVtcGxhdGUuaHRtbCcpO1xuXG5jb25zdCBjYWxlbmRhciA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCcsXG4gICAgICAgIHNlbGVjdDogJyYnLFxuICAgICAgICBzZWxlY3RlZDogJzwnXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IERhdGU7XG4gICAgICAgIHRoaXMuZGF5TmFtZXMgPSBbJ9C/0L0nLCAn0LLRgicsICfRgdGAJywgJ9GH0YInLCAn0L/RgicsICfRgdCxJywgJ9Cy0YEnXTtcblxuICAgICAgICB0aGlzLmdldEV2ZW50VGV4dCA9IGZ1bmN0aW9uKGRheSkge1xuICAgICAgICAgICAgbGV0IG51bWJlck9mRXZlbnRzID0gZGF5LmV2ZW50cy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobnVtYmVyT2ZFdmVudHMgPiAxKSByZXR1cm4gJ9Ca0L7Qu9C40YfQtdGB0YLQstC+INGB0L7QsdGL0YLQuNC5OiAnICsgbnVtYmVyT2ZFdmVudHM7XG4gICAgICAgICAgICBpZiAoZGF5LmV2ZW50c1swXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXkuZXZlbnRzWzBdLnRpdGxlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogY2FsZW5kYXJUZW1wbGF0ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjYWxlbmRhcjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L2NhbGVuZGFyLmpzXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2IGNsYXNzPVxcXCJjYWxlbmRhclxcXCIgbmctaWY9XFxcIiEkY3RybC5zZWxlY3RlZFxcXCI+IDxoZWFkZXI+IDxkaXYgY2xhc3M9XFxcInRpdGxlXFxcIj4gPHNwYW4gY2xhc3M9XFxcIm1vbnRoXFxcIj57eyAkY3RybC5kYXRlLmdldE1vbnRoKCkgfCBtb250aEZpbHRlciB9fTwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwieWVhclxcXCI+e3sgJGN0cmwuZGF0ZS5nZXRGdWxsWWVhcigpIH19PC9zcGFuPiA8L2Rpdj4gPGRpdj4gPGRpdiBjbGFzcz1cXFwiZGF5LW5hbWVcXFwiIG5nLXJlcGVhdD1cXFwibmFtZSBpbiAkY3RybC5kYXlOYW1lc1xcXCI+e3tuYW1lfX08L2Rpdj4gPC9kaXY+IDwvaGVhZGVyPiA8c2VjdGlvbj4gPGRpdiBjbGFzcz1cXFwiZGF5XFxcIiBuZy1jbGFzcz1cXFwieydub3QtdGhpcy1tb250aCc6IGRheS5tb250aCAhPT0gJGN0cmwuZGF0ZS5nZXRNb250aCgpLCAnd2Vla2VuZCc6IGRheS5kYXkgPiA1fVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLnNlbGVjdCh7aW5kZXg6ICRpbmRleH0pXFxcIiBuZy1yZXBlYXQ9XFxcImRheSBpbiAkY3RybC5kYXRhXFxcIj4gPGRpdiBjbGFzcz1cXFwiZGF0ZVxcXCI+IDxzcGFuIG5nLWNsYXNzPVxcXCJ7J3RvZGF5JzogZGF5LnRvZGF5fVxcXCI+e3tkYXkuZGF0ZX19PC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwid2Vla2RheVxcXCI+e3sgZGF5LmRheSB8IGRheUZpbHRlcn19PC9kaXY+IDxkaXYgY2xhc3M9XFxcImV2ZW50c1xcXCIgbmctaWY9XFxcImRheS5ldmVudHMubGVuZ3RoXFxcIj57eyAkY3RybC5nZXRFdmVudFRleHQoZGF5KSB9fTwvZGl2PiA8L2Rpdj4gPC9zZWN0aW9uPiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwiY2FsZW5kYXItdGVtcGxhdGUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvY2FsZW5kYXItY29tcG9uZW50L3RlbXBsYXRlL2NhbGVuZGFyLXRlbXBsYXRlLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBzZWxlY3RlZERheVRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9zZWxlY3RlZC1kYXktdGVtcGxhdGUuaHRtbCcpO1xuXG5jb25zdCBzZWxlY3RlZERheSA9IHtcbiAgICBiaW5kaW5nczoge1xuICAgICAgICBkYXRhOiAnPCcsXG4gICAgICAgIHVuc2VsZWN0OiAnJicsXG4gICAgICAgIGFkZDogJyYnLFxuICAgICAgICByZW1vdmU6ICcmJ1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24obW9kYWwsIGNyZWF0ZVRpbWVHcmlkLCBmb3JtRGF0YVNlcnZpY2UsIHZhbGlkYXRlRGF0ZSkge1xuICAgICAgICB0aGlzLnRpbWVzID0gY3JlYXRlVGltZUdyaWQoKTtcblxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0YHQvtCx0YvRgtC40Y8g0LIg0YHQtdGC0LrRg1xuICAgICAgICB0aGlzLmRhdGEuZXZlbnRzLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBldmVudC50aW1lLnNsaWNlKDAsIDIpIC8gMTtcbiAgICAgICAgICAgIHRoaXMudGltZXNbaW5kZXhdLmV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy/QstGL0LLQtdGB0YLQuCDRgdC+0L7QsdGJ0LXQvdC40LUg0L7QsSDQvtGC0YHRg9GC0YHRgtCy0LjQuCDRgdC+0L7QsdGJ0LXQvdC40LlcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEuZXZlbnRzLmxlbmd0aCkgbW9kYWwub3Blbih7dGl0bGU6ICfQodC+0L7QsdGJ0LXQvdC40LUnLCBtZXNzYWdlOiAn0J3QsCDQtNCw0L3QvdGL0Lkg0LTQtdC90Ywg0L3QtdGCINC30LDQv9C70LDQvdC40YDQvtCy0LDQvdC90YvRhSDRgdC+0LHRi9GC0LjQuSd9LCAnYWxlcnQnKTtcblxuICAgICAgICAvL9C00L7QsdCw0LLQuNGC0Ywg0YHQvtCx0YvRgtC40LVcbiAgICAgICAgdGhpcy5hZGRFdmVudCA9IGZ1bmN0aW9uKGVkaXQpIHtcbiAgICAgICAgICAgIC8v0L/RgNC+0LLQtdGA0LjRgtGMINC00LDRgtGDXG4gICAgICAgICAgICBpZiAodmFsaWRhdGVEYXRlKHRoaXMuZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdCkgbW9kYWwub3Blbih7dGl0bGU6ICfQntGI0LjQsdC60LAnLCBtZXNzYWdlOiAn0J3QtdC70YzQt9GPINGA0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMINC/0YDQvtGI0LXQtNGI0LjQtSDRgdC+0LHRi9GC0LjRjyd9LCAnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICBlbHNlIG1vZGFsLm9wZW4oe3RpdGxlOiAn0J7RiNC40LHQutCwJywgbWVzc2FnZTogJ9Cd0LXQu9GM0LfRjyDQtNC+0LHQsNCy0LjRgtGMINGB0L7QsdGL0YLQuNGPINC90LAg0L/RgNC+0YjQtdC00YjQuNC1INC00L3QuCd9LCAnYWxlcnQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v0L/RgNC4INGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Lgg0YHQvtCx0YvRgtC40Y9cbiAgICAgICAgICAgIGlmIChlZGl0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXQudGltZS5ldmVudHNbZWRpdC5pbmRleF0uY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLm9wZW4oe3RpdGxlOiAn0J7RiNC40LHQutCwJywgbWVzc2FnZTogJ9Cd0LXQu9GM0LfRjyDRgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCDQvtGB0L3QvtCy0L3Ri9C1INGB0L7QsdGL0YLQuNGPJ30sICdhbGVydCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcm1EYXRhU2VydmljZS5zZXREYXRhKGVkaXQudGltZS5ldmVudHNbZWRpdC5pbmRleF0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v0L7RgtC60YDRi9GC0Ywg0L7QutC90L5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oe3RpdGxlOiAn0JLQstC10LTQuNGC0LUg0LTQsNC90L3Ri9C1JywgbWVzc2FnZTogJyd9LCAnYWRkLWV2ZW50JylcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL9GD0LTQsNC70LjRgtGMINGA0LXQtNCw0LrRgtC40YDRg9C10LzQvtC1XG4gICAgICAgICAgICAgICAgICAgIGlmKGVkaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHtldmVudDogZWRpdC50aW1lLmV2ZW50c1tlZGl0LmluZGV4XSwgZGF5OiBlZGl0LmRheX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVJbmRleCA9IHRoaXMudGltZXMuaW5kZXhPZihlZGl0LnRpbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lc1t0aW1lSW5kZXhdLmV2ZW50cy5zcGxpY2UoZWRpdC5pbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvL9GB0L7Qt9C00LDRgtGMINC+0LHRitC10LrRgiDRgSDQtNCw0L3QvdGL0LzQuFxuICAgICAgICAgICAgICAgICAgICBsZXQgZXZlbnREYXRhID0gSlNPTi5wYXJzZShkYXRhLmRhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogKCcwJyArIGV2ZW50RGF0YS5ob3Vycykuc2xpY2UoLTIpICsgJzonICsgKCcwJyArIGV2ZW50RGF0YS5taW51dGVzKS5zbGljZSgtMiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogZXZlbnREYXRhLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZXZlbnREYXRhLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b206IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgLy/QtNC+0LHQsNCy0LjRgtGMINCyINCx0LDQt9GDXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkKHtldmVudDogb2JqLCBkYXk6IHRoaXMuZGF0YX0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8v0LTQvtCx0LDQstC40YLRjCDQsiDRgdC10YLQutGDXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG9iai50aW1lLnNsaWNlKDAsIDIpIC8gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lc1tpbmRleF0uZXZlbnRzLnB1c2godGhpcy5kYXRhLmV2ZW50c1t0aGlzLmRhdGEuZXZlbnRzLmxlbmd0aCAtIDFdKTtcblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8v0YPQtNCw0LvQuNGC0Ywg0YHQvtCx0YvRgtC40LVcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uKGluZGV4LCB0aW1lLCBkYXkpIHtcblxuICAgICAgICAgICAgLy/Qv9GA0L7QstC10YDQuNGC0Ywg0YHQvtCx0YvRgtC40Y8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cbiAgICAgICAgICAgIGlmICh0aW1lLmV2ZW50c1tpbmRleF0uY3VzdG9tKSB7XG4gICAgICAgICAgICAgICAgbW9kYWwub3Blbih7dGl0bGU6ICfQntGI0LjQsdC60LAnLCBtZXNzYWdlOiAn0J3QtdC70YzQt9GPINGD0LTQsNC70LjRgtGMINGB0L7QsdGL0YLQuNC1J30sICdhbGVydCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/Qt9Cw0L/RgNC+0YHQuNGC0Ywg0L/QvtC00YLQstC10YDQttC00LXQvdC40LUsINGD0LTQsNC70LjRgtGMXG4gICAgICAgICAgICBtb2RhbC5vcGVuKHt0aXRsZTogJ9Cf0L7QtNGC0LLQtdGA0LTQuNGC0LUnLCBtZXNzYWdlOiAn0KPQtNCw0LvQuNGC0Ywg0LTQsNC90L3QvtC1INGB0L7QsdGL0YLQuNC1Pyd9LCAnY29uZmlybScpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh7ZXZlbnQ6IHRpbWUuZXZlbnRzW2luZGV4XSwgZGF5OiBkYXl9KTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZUluZGV4ID0gdGhpcy50aW1lcy5pbmRleE9mKHRpbWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWVzW3RpbWVJbmRleF0uZXZlbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy/RgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCDRgdC+0LHRi9GC0LjQtVxuICAgICAgICB0aGlzLmVkaXRFdmVudCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnQoZGF0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRlbXBsYXRlOiBzZWxlY3RlZERheVRlbXBsYXRlXG59O1xubW9kdWxlLmV4cG9ydHMgPSBzZWxlY3RlZERheTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VsZWN0ZWQtZGF5LWNvbXBvbmVudC9zZWxlY3RlZC1kYXkuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxoZWFkZXIgY2xhc3M9XFxcImdyb3VwIHNlbGVjdGVkLWRheVxcXCI+IDxkaXYgY2xhc3M9XFxcInRpdGxlXFxcIj4gPHNwYW4gY2xhc3M9XFxcIm1vbnRoXFxcIj57eyAkY3RybC5kYXRhLm1vbnRoIHwgbW9udGhGaWx0ZXIgfX0ge3sgJGN0cmwuZGF0YS5kYXRlIH19LDwvc3Bhbj5cXG48c3BhbiBjbGFzcz1cXFwieWVhclxcXCI+e3sgJGN0cmwuZGF0YS55ZWFyIH19PC9zcGFuPiA8ZGl2IGNsYXNzPVxcXCJkYXlcXFwiPnt7ICRjdHJsLmRhdGEuZGF5IHwgZGF5RmlsdGVyfX08L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcIm1lbnVcXFwiPiA8ZGl2IGNsYXNzPVxcXCJiYWNrXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwudW5zZWxlY3QoKVxcXCI+0J3QsNC30LDQtDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJhZGQtZXZlbnRcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5hZGRFdmVudCgpXFxcIj7QlNC+0LHQsNCy0LjRgtGMINGB0L7QsdGL0YLQuNC1PC9kaXY+IDwvZGl2PiA8L2hlYWRlcj4gPHNlY3Rpb24+IDxkaXYgY2xhc3M9XFxcInRpbWVzIGdyb3VwXFxcIiBuZy1yZXBlYXQ9XFxcInRpbWUgaW4gJGN0cmwudGltZXNcXFwiPiA8ZGl2IGNsYXNzPVxcXCJob3VyXFxcIj57eyB0aW1lLmhvdXJzIH19PC9kaXY+IDxkaXYgY2xhc3M9XFxcImV2ZW50c1xcXCIgbmctY2xhc3M9XFxcInsnYWN0aXZlVGltZSc6IHRpbWUuZXZlbnRzLmxlbmd0aH1cXFwiPiA8ZGl2IG5nLXJlcGVhdD1cXFwiZXZlbnQgaW4gdGltZS5ldmVudHNcXFwiIGNsYXNzPVxcXCJldmVudFxcXCI+IDxkaXYgbmctY2xpY2s9XFxcIiRjdHJsLmVkaXRFdmVudCh7aW5kZXg6ICRpbmRleCwgdGltZTogdGltZSwgZGF5OiAkY3RybC5kYXRhfSlcXFwiIGNsYXNzPVxcXCJldmVudC1kYXRhXFxcIj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtdGltZVxcXCI+e3sgZXZlbnQudGltZSB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJldmVudC10aXRsZVxcXCI+e3sgZXZlbnQudGl0bGUgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtY29udGVudFxcXCI+e3sgZXZlbnQuY29udGVudCB9fTwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiZXZlbnQtcmVtb3ZlXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwucmVtb3ZlRXZlbnQoJGluZGV4LCB0aW1lLCAkY3RybC5kYXRhKVxcXCI+WDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L3NlY3Rpb24+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcInNlbGVjdGVkLWRheS10ZW1wbGF0ZS5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9zZWxlY3RlZC1kYXktY29tcG9uZW50L3RlbXBsYXRlL3NlbGVjdGVkLWRheS10ZW1wbGF0ZS5odG1sXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IG1vZGFsVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL21vZGFsLXRlbXBsYXRlLmh0bWwnKTtcclxuXHJcbmNvbnN0IG1vZGFsID0ge1xyXG4gICAgY29udHJvbGxlcjogZnVuY3Rpb24obW9kYWwsIHZhbGlkYXRpb25TZXJ2aWNlLCBmb3JtRGF0YVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLm1vZGFsVmlld0RhdGEgPSBtb2RhbC5tb2RhbFZpZXdEYXRhO1xyXG5cclxuICAgICAgICAvL9C/0YDQvtCy0LXRgNC40YLRjCDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgICAgICB0aGlzLmNoZWNrT3BlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kYWwuZ2V0U3RhdGUoKSA9PT0gJ29wZW4nO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v0L/RgNC+0LLQtdGA0LjRgtGMINGC0LjQvyDQvtC60L3QsFxyXG4gICAgICAgIHRoaXMuY2hlY2tUeXBlID0gZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9kYWwuZ2V0VHlwZSgpID09PSB0eXBlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMudHlwZSA9IG1vZGFsLmdldFR5cGU7XHJcblxyXG4gICAgICAgIC8v0LTQsNC90L3Ri9C1INCy0LDQu9C40LTQsNGG0LjQuFxyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbk9iaiA9IHZhbGlkYXRpb25TZXJ2aWNlLnZhbGlkYXRpb25PYmo7XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/QtNCw0L3QvdGL0LUg0LLQstC+0LTQsFxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGZvcm1EYXRhU2VydmljZS5kYXRhO1xyXG5cclxuICAgICAgICAvL9C30LDQutGA0YvRgtGMINC+0LrQvdC+XHJcbiAgICAgICAgdGhpcy5jbG9zZSA9IGZ1bmN0aW9uKGJvb2wsIGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRhICYmICFib29sICYmIG1vZGFsLmdldFR5cGUoKSA9PT0gJ2FkZC1ldmVudCcpIHtcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25TZXJ2aWNlLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YVNlcnZpY2UuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFkYXRhIHx8ICFib29sKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC5jbG9zZShib29sKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWxpZGF0aW9uU2VydmljZS5yZXNldCgpO1xyXG4gICAgICAgICAgICBsZXQgc3RhdHVzID0gdmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGUoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsLmNsb3NlKGJvb2wsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGFTZXJ2aWNlLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIHRlbXBsYXRlOiBtb2RhbFRlbXBsYXRlXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGFsO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9tb2RhbC13aW5kb3ctY29tcG9uZW50L21vZGFsLXdpbmRvdy1jb21wb25lbnQuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXYgY2xhc3M9XFxcIm1vZGFsLWJhY2tncm91bmRcXFwiIG5nLWlmPVxcXCIkY3RybC5jaGVja09wZW4oKVxcXCI+IDxkaXYgY2xhc3M9XFxcIndpbmRvdyBhblxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrT3BlbigpXFxcIj4gIDxkaXYgY2xhc3M9XFxcInRpdGxlXFxcIj57eyAkY3RybC5tb2RhbFZpZXdEYXRhLmRhdGEudGl0bGUgfX08L2Rpdj4gIDxkaXYgY2xhc3M9XFxcIm1lc3NhZ2VcXFwiIG5nLWlmPVxcXCIhJGN0cmwuY2hlY2tUeXBlKCdhZGQtZXZlbnQnKVxcXCI+e3sgJGN0cmwubW9kYWxWaWV3RGF0YS5kYXRhLm1lc3NhZ2UgfX08L2Rpdj4gIDxkaXYgY2xhc3M9XFxcImFkZC1mb3JtXFxcIiBuZy1pZj1cXFwiJGN0cmwuY2hlY2tUeXBlKCdhZGQtZXZlbnQnKVxcXCI+IDx0YWJsZT4gPHRyIGNsYXNzPVxcXCJhZGQtZm9ybS10aW1lXFxcIj4gPHRkPtCS0YDQtdC80Y86PC90ZD4gPHRkPjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwiJGN0cmwuZGF0YS5ob3Vyc1xcXCI+OjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwiJGN0cmwuZGF0YS5taW51dGVzXFxcIj48L3RkPiA8dGQgbmctaWY9XFxcIiRjdHJsLnZhbGlkYXRpb25PYmoudGltZS5zdGF0dXNcXFwiIGNsYXNzPVxcXCJ3YXJuaW5nXFxcIj57eyAkY3RybC52YWxpZGF0aW9uT2JqLnRpbWUubWVzc2FnZSB9fTwvdGQ+IDwvdHI+IDx0ciBjbGFzcz1cXFwiYWRkLWZvcm0tdGl0bGVcXFwiPiA8dGQ+0JfQsNCz0L7Qu9C+0LLQvtC6OjwvdGQ+IDx0ZD48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIiRjdHJsLmRhdGEudGl0bGVcXFwiPjwvdGQ+IDx0ZCBuZy1pZj1cXFwiJGN0cmwudmFsaWRhdGlvbk9iai50aXRsZS5zdGF0dXNcXFwiIGNsYXNzPVxcXCJ3YXJuaW5nXFxcIj57eyAkY3RybC52YWxpZGF0aW9uT2JqLnRpdGxlLm1lc3NhZ2UgfX08L3RkPiA8L3RyPiA8dHIgY2xhc3M9XFxcImFkZC1mb3JtLWNvbnRlbnRcXFwiPiA8dGQ+0J7Qv9C40YHQsNC90LjQtTo8L3RkPiA8dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCIkY3RybC5kYXRhLmNvbnRlbnRcXFwiPjwvdGQ+IDx0ZCBuZy1pZj1cXFwiJGN0cmwudmFsaWRhdGlvbk9iai5jb250ZW50LnN0YXR1c1xcXCIgY2xhc3M9XFxcIndhcm5pbmdcXFwiPnt7ICRjdHJsLnZhbGlkYXRpb25PYmouY29udGVudC5tZXNzYWdlIH19PC90ZD4gPC90cj4gPC90YWJsZT4gPC9kaXY+ICA8ZGl2IGNsYXNzPVxcXCJidXR0b25zIGdyb3VwXFxcIj4gPGRpdiBjbGFzcz1cXFwiY29uZmlybVxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnY29uZmlybScpXFxcIj4gPGRpdiBjbGFzcz1cXFwicmVqZWN0XFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UoKVxcXCI+0J7RgtC80LXQvdCwPC9kaXY+IDxkaXYgY2xhc3M9XFxcIm9rXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UodHJ1ZSlcXFwiPk9LPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJhbGVydFxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnYWxlcnQnKVxcXCIgbmctY2xpY2s9XFxcIiRjdHJsLmNsb3NlKClcXFwiPtCX0LDQutGA0YvRgtGMPC9kaXY+IDxkaXYgY2xhc3M9XFxcImFkZC1ldmVudFxcXCIgbmctaWY9XFxcIiRjdHJsLmNoZWNrVHlwZSgnYWRkLWV2ZW50JylcXFwiPiA8ZGl2IGNsYXNzPVxcXCJyZWplY3RcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSgpXFxcIj7QntGC0LzQtdC90LA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwib2tcXFwiIG5nLWNsaWNrPVxcXCIkY3RybC5jbG9zZSh0cnVlLCAkY3RybC5kYXRhKVxcXCI+0KHQvtGF0YDQsNC90LjRgtGMPC9kaXY+IDwvZGl2PiA8L2Rpdj4gIDxkaXYgY2xhc3M9XFxcImNsb3NlXFxcIiBuZy1jbGljaz1cXFwiJGN0cmwuY2xvc2UoKVxcXCI+eDwvZGl2PiA8L2Rpdj4gPC9kaXY+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm1vZGFsLXRlbXBsYXRlLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21vZGFsLXdpbmRvdy1jb21wb25lbnQvdGVtcGxhdGUvbW9kYWwtdGVtcGxhdGUuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG1vbnRoKSB7XG4gICAgICAgIG1vbnRoID0gbW9udGggKyAxO1xuICAgICAgICBzd2l0Y2ggKG1vbnRoKSB7XG4gICAgICAgICAgICBjYXNlIDE6IG1vbnRoID0gJ9Cv0L3QstCw0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6IG1vbnRoID0gJ9Ck0LXQstGA0LDQu9GMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzogbW9udGggPSAn0JzQsNGA0YInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OiBtb250aCA9ICfQkNC/0YDQtdC70YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OiBtb250aCA9ICfQnNCw0LknO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OiBtb250aCA9ICfQmNGO0L3RjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6IG1vbnRoID0gJ9CY0Y7Qu9GMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODogbW9udGggPSAn0JDQstCz0YPRgdGCJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgOTogbW9udGggPSAn0KHQtdC90YLRj9Cx0YDRjCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDEwIDogbW9udGggPSAn0J7QutGC0Y/QsdGA0YwnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMTogbW9udGggPSAn0J3QvtGP0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTI6IG1vbnRoID0gJ9CU0LXQutCw0LHRgNGMJztcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vbnRoO1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL21vbnRoLWZpbHRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oZGF5KSB7XG4gICAgICAgIHN3aXRjaCAoZGF5KSB7XG4gICAgICAgICAgICBjYXNlIDE6IGRheSA9ICfQn9C+0L3QtdC00LXQu9GM0L3QuNC6JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjogZGF5ID0gJ9CS0YLQvtGA0L3QuNC6JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzogZGF5ID0gJ9Ch0YDQtdC00LAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OiBkYXkgPSAn0KfQtdGC0LLQtdGA0LMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OiBkYXkgPSAn0J/Rj9GC0L3QuNGG0LAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OiBkYXkgPSAn0KHRg9Cx0LHQvtGC0LAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3OiBkYXkgPSAn0JLQvtGB0LrRgNC10YHQtdC90LjQtSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF5O1xuICAgIH1cbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL2RheS1maWx0ZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBsZXQgZGF0ZU9mRGF5ID0gbmV3IERhdGUoZGF0YS55ZWFyLCBkYXRhLm1vbnRoLCBkYXRhLmRhdGUpLFxyXG4gICAgICAgICAgICBkYXRlTm93ID0gbmV3IERhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBuZXcgRGF0ZSgpLmdldE1vbnRoKCksIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGVPZkRheS5nZXRUaW1lKCkgPCBkYXRlTm93LmdldFRpbWUoKSkgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL3ZhbGlkYXRlLWRhdGUuanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFLQTs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBQ0E7QUFRQTtBQW5CQTtBQUNBOztBQVZBO0FBQ0E7QUFpQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFEQTtBQUNBO0FBUUE7QUEzQkE7QUFDQTs7QUFuQ0E7QUFDQTtBQWtFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBO0FBQ0E7QUFRQTtBQXJCQTtBQUNBO0FBdUJBO0FBM0ZBO0FBREE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUhBO0FBQ0E7QUFRQTtBQWZBO0FBREE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBTEE7QUFDQTtBQVVBO0FBQ0E7QUFDQTtBQURBO0FBSUE7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBVkE7QUFDQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBdkNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBVkE7QUFDQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBM0JBO0FBQ0E7QUE2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBdkRBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBdEJBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQURBO0FBQ0E7O0FBSEE7QUFRQTtBQURBO0FBQ0E7O0FBUkE7QUFhQTtBQURBO0FBQ0E7O0FBYkE7QUFrQkE7QUFDQTtBQUNBOztBQUhBO0FBQUE7QUFDQTs7QUFsQkE7QUEyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFMQTtBQUFBO0FBMUJBO0FBb0NBO0FBckNBO0FBQ0E7QUF1Q0E7Ozs7OztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUhBO0FBSEE7QUFKQTtBQWNBO0FBcEJBO0FBQ0E7QUFzQkE7Ozs7OztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTs7O0FBQ0E7QUFDQTs7QUFGQTtBQUtBO0FBQ0E7QUFGQTtBQUNBOztBQUxBO0FBQ0E7O0FBREE7Ozs7QUFlQTtBQUNBO0FBRUE7QUFIQTtBQUNBOztBQUhBO0FBVUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUxBO0FBQ0E7O0FBVkE7O0FBcUJBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTs7QUFIQTtBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBOztBQVhBO0FBQ0E7O0FBREE7QUFzQkE7QUF0QkE7QUFuQkE7QUFDQTs7QUFkQTs7OztBQStEQTtBQUNBO0FBQ0E7QUFGQTtBQUNBOztBQUpBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVZBO0FBQ0E7O0FBN0RBO0FBZ0ZBO0FBREE7QUEvRUE7QUFtRkE7QUExRkE7QUE0RkE7Ozs7OztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRkE7QUFLQTtBQURBO0FBQ0E7O0FBTEE7QUFVQTtBQURBO0FBQ0E7QUFHQTtBQUNBOztBQWRBO0FBQ0E7QUFpQkE7QUFDQTtBQURBO0FBQ0E7O0FBbkJBO0FBQ0E7O0FBREE7QUEyQkE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQVhBO0FBMUJBO0FBNkNBO0FBOUNBO0FBQ0E7QUFnREE7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQVJBO0FBU0E7QUFDQTtBQVZBO0FBV0E7QUFDQTtBQVpBO0FBYUE7QUFDQTtBQWRBO0FBZUE7QUFDQTtBQWhCQTtBQWlCQTtBQUNBO0FBbEJBO0FBbUJBO0FBQ0E7QUFwQkE7QUFxQkE7QUFDQTtBQXRCQTtBQXVCQTtBQUNBO0FBeEJBO0FBQ0E7QUEwQkE7QUE3QkE7QUFEQTs7Ozs7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTtBQUpBO0FBS0E7QUFDQTtBQU5BO0FBT0E7QUFDQTtBQVJBO0FBU0E7QUFDQTtBQVZBO0FBV0E7QUFDQTtBQVpBO0FBYUE7QUFDQTtBQWRBO0FBQ0E7QUFnQkE7QUFsQkE7QUFEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQURBOzs7Iiwic291cmNlUm9vdCI6IiJ9