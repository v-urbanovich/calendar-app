'use strict';

module.exports = function() {
    return function(data) {
        let dateOfDay = new Date(data.year, data.month, data.date),
            dateNow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

        if (dateOfDay.getTime() < dateNow.getTime()) return true;
    }
};