'use strict';

module.exports = function() {
    return function() {

        //массив для временной сетки
        let array = [];

        //заполнить массив
        for (let i = 0; i < 24; i += 1) {
            let hours = ('0' + i).slice(-2) + ':00';

            array.push({
                hours: hours,
                events: []
            });
        }

        return array;
    }
};