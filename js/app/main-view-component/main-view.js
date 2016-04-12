'use strict';

const mainViewTemplate = require('./template/main-view-template.html');

const mainView = {
    controller: function(dataGenerator) {
        this.data = {
            daysData: dataGenerator()
        };


    },
    template: mainViewTemplate
};

module.exports = mainView;