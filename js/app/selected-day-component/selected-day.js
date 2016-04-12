'use strict';

const selectedDayTemplate = require('./template/selected-day-template.html');

const selectedDay = {
    bindings: {
        data: '<',
        unselect: '&'
    },
    controller: function(createTimeGrid) {
        var self = this;
        this.times = createTimeGrid();

        this.data.events.forEach((event) => {
            let index = event.time.slice(0, 2) / 1;
            self.times[index].events.push(event);
        });

    },
    template: selectedDayTemplate
};
module.exports = selectedDay;