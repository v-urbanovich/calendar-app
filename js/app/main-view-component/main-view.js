'use strict';

const mainViewTemplate = require('./template/main-view-template.html');

const mainView = {
    controller: function(dataGenerator, $window) {
        //данные
        this.data = {
            daysData: $window.localStorage.data ? JSON.parse($window.localStorage.data) : dataGenerator()
        };

        //выбрать день
        this.selectDay = function(index) {
            this.data.selectedDay = this.data.daysData[index]
        };

        //вернуться к колендарю
        this.unselectDay = function() {
            delete this.data.selectedDay;
        };

        //добавить событие
        this.addEvent = function(event, day) {
            let index = this.data.daysData.indexOf(day);
            this.data.daysData[index].events.push(event);

            //сохранить состояние
            $window.localStorage.data = JSON.stringify(this.data.daysData);
        };

        //удалить событие
        this.removeEvent = function(event, day) {
            let index = this.data.daysData.indexOf(day),
                eventIndex = this.data.daysData[index].events.indexOf(event);

            this.data.daysData[index].events.splice(eventIndex, 1);

            //сохранить состояние
            $window.localStorage.data = JSON.stringify(this.data.daysData)
        }
    },
    template: mainViewTemplate
};

module.exports = mainView;