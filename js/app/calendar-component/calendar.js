'use strict';

const calendarTemplate = require('./template/calendar-template.html');

const calendar = {
    bindings: {
        data: '<'
    },
    controller: function() {
        this.date = new Date;
        this.dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

        this.getEventText = function(day) {
            let numberOfEvents = day.events.length;
            if (numberOfEvents > 1) return 'Количество событий: ' + numberOfEvents;
            if (day.events[0]) {
                return day.events[0].title;
            }else {
                return '';
            }
        };
    },
    template: calendarTemplate
};

module.exports = calendar;