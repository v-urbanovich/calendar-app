'use strict';

module.exports = function() {
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
    }
};