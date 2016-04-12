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

    },
    template: mainViewTemplate
};

module.exports = mainView;