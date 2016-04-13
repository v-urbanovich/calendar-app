'use strict';

module.exports = function() {
    let data = {
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
    }
};