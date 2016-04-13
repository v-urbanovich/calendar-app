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
