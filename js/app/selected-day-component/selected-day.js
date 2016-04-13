'use strict';

const selectedDayTemplate = require('./template/selected-day-template.html');

const selectedDay = {
    bindings: {
        data: '<',
        unselect: '&',
        add: '&',
        remove: '&'
    },
    controller: function(modal, createTimeGrid, formDataService) {
        this.times = createTimeGrid();

        this.data.events.forEach((event) => {
            let index = event.time.slice(0, 2) / 1;
            this.times[index].events.push(event);
        });

        if (!this.data.events.length) modal.open({title: 'Сообщение', message: 'На данный день нет запланированных событий'}, 'alert');

        this.addEvent = function(edit) {
            if (this.data.year < new Date().getFullYear() || this.data.month < new Date().getMonth() || this.data.date < new Date().getDate()) {
                modal.open({title: 'Ошибка', message: 'Нельзя добавить события на прошедшие дни'}, 'alert');
                return;
            }

            modal.open({title: 'Введите данные', message: ''}, 'add-event')
                .then((data) => {

                    let eventData = JSON.parse(data.data),
                        obj = {
                        time: ('0' + eventData.hours).slice(-2) + ':' + ('0' + eventData.minutes).slice(-2),
                        title: eventData.title,
                        content: eventData.content,
                        custom: false
                    };

                    this.add({event: obj, day: this.data});


                    let index = obj.time.slice(0, 2) / 1;
                    this.times[index].events.push(this.data.events[this.data.events.length - 1]);

                });
        };

        this.removeEvent = function(index, time, day) {
            if (time.events[index].custom) {
                modal.open({title: 'Ошибка', message: 'Нельзя удалить событие'}, 'alert');
                return;
            }
            modal.open({title: 'Подтвердите', message: 'Удалить данное событие?'}, 'confirm')
                .then(() => {
                    this.remove({event: time.events[index], day: day});

                    let timeIndex = this.times.indexOf(time);
                    this.times[timeIndex].events.splice(index, 1);
                });
        };


    },
    template: selectedDayTemplate
};
module.exports = selectedDay;