'use strict';

module.exports = function() {
    return function() {
        let dataArray = [],
            dateNow = new Date();

        //добавить числа предыдущего месяца
        let firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1),
            previousMonthLastDay = new Date(firstDay - 1).getDate(),
            numberOfPastDays = (firstDay.getDay() || 7) - 1;

        for (let i = 0; i < numberOfPastDays; i += 1) {
            let dayData = {
                date: previousMonthLastDay - i,
                day: numberOfPastDays - i,
                year: new Date(firstDay - 1).getFullYear(),
                today: false,
                month: new Date(firstDay - 1).getMonth(),
                events: [],
                customEvents: []
            };

            dataArray.unshift(dayData);
        }

        //добавить числа месяца
        let numberOfDays = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).getDate();

        for (let i = 0; i < numberOfDays; i += 1) {
            let day = new Date(dateNow.getFullYear(), dateNow.getMonth(), i + 1),
                dayData = {
                    date: day.getDate(),
                    day: day.getDay() || 7,
                    today: day.getDate() === dateNow.getDate(),
                    month: day.getMonth(),
                    year: day.getFullYear(),
                    events: []
                };
            if (i === 15) {
                dayData.events.push({
                    time: '00:00',
                    title: 'Новый год',
                    content: '',
                    custom: true
                });
            }

            dataArray.push(dayData);
        }

        //добавить дни следующего месяца
        let numberOfFutureDays = 7 - dataArray.length % 7;

        for (let i = 0; i < numberOfFutureDays; i += 1) {
            let day = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, i + 1),
                dayData = {
                    date: day.getDate(),
                    day: day.getDay() || 7,
                    today: false,
                    month: day.getMonth(),
                    year: day.getFullYear(),
                    events: [],
                    customEvents: []
                };

            dataArray.push(dayData);
        }

        return dataArray;
    }
};