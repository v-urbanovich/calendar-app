'use strict';

const modalTemplate = require('./template/modal-template.html');

const modal = {
    controller: function(modal, validationService, formDataService) {
        this.modalViewData = modal.modalViewData;
        this.checkOpen = function() {
            return modal.getState() === 'open';
        };
        this.checkType = function(type) {
            return modal.getType() === type;
        };
        this.type = modal.getType;

        this.validationObj = validationService.validationObj;

        this.stopPropagation = function(event) {
            event.stopImmediatePropagation();
        };

        this.data = formDataService.data;

        this.close = function(bool, data) {
            if (!data && !bool && modal.getType() === 'add-event') {
                validationService.reset();
                formDataService.clearData();
            }
            if (!data || !bool) {
                modal.close(bool);
                return;
            }
            validationService.reset();
            let status = validationService.validate(data);
            if (status) {
                modal.close(bool, data);
                formDataService.clearData();
            }

        };

    },
    template: modalTemplate
};

module.exports = modal;