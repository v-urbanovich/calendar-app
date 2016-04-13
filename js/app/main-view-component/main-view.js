'use strict';

const mainViewTemplate = require('./template/main-view-template.html');

const mainView = {
    controller: function(dataGenerator) {
        this.data = {
            daysData: dataGenerator()
        };

        this.selectDay = function(index) {
            this.data.selectedDay = this.data.daysData[index]
        };

        this.unselectDay = function() {
            delete this.data.selectedDay;
        };

        this.addEvent = function(event, day) {
            let index = this.data.daysData.indexOf(day);
            this.data.daysData[index].events.push(event);
        };

        this.removeEvent = function(event, day) {
            let index = this.data.daysData.indexOf(day),
                eventIndex = this.data.daysData[index].events.indexOf(event);
            this.data.daysData[index].events.splice(eventIndex, 1)
        }
    },
    template: mainViewTemplate
};

module.exports = mainView;