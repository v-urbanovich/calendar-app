'use strict';

const calendarTemplate = require('./../calendar-component/template/calendar-template.html');

const calendar = {
    bindings: {
        data: '<',
        select: '&'
    },
    controller: function() {
        this.date = new Date;
        this.dayNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

        this.getEventText = function(day) {
            let numberOfEvents = day.events.length;
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