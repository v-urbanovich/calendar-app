'use strict';

const selectedDayTemplate = require('./template/selected-day-template.html');

const selectedDay = {
    bindings: {
        data: '<',
        unselect: '&',
        add: '&',
        remove: '&'
    },
    controller: function(modal, createTimeGrid, formDataService, validateDate) {
        this.times = createTimeGrid();

        //добавить события в сетку
        this.data.events.forEach((event) => {
            let index = event.time.slice(0, 2) / 1;
            this.times[index].events.push(event);
        });

        //вывести сообщение об отсутствии сообщений
        if (!this.data.events.length) modal.open({title: 'Сообщение', message: 'На данный день нет запланированных событий'}, 'alert');

        //добавить событие
        this.addEvent = function(edit) {
            //проверить дату
            if (validateDate(this.data)) {
                if (edit) modal.open({title: 'Ошибка', message: 'Нельзя редактировать прошедшие события'}, 'alert');
                else modal.open({title: 'Ошибка', message: 'Нельзя добавить события на прошедшие дни'}, 'alert');
                return;
            }

            //при редактировании события
            if (edit) {
                if (edit.time.events[edit.index].custom) {
                    modal.open({title: 'Ошибка', message: 'Нельзя редактировать основные события'}, 'alert');
                    return;
                }
                formDataService.setData(edit.time.events[edit.index])
            }

            //открыть окно
            modal.open({title: 'Введите данные', message: ''}, 'add-event')
                .then((data) => {
                    //удалить редактируемое
                    if(edit) {
                        this.remove({event: edit.time.events[edit.index], day: edit.day});
                        let timeIndex = this.times.indexOf(edit.time);
                        this.times[timeIndex].events.splice(edit.index, 1);
                    }

                    //создать объект с данными
                    let eventData = JSON.parse(data.data),
                        obj = {
                        time: ('0' + eventData.hours).slice(-2) + ':' + ('0' + eventData.minutes).slice(-2),
                        title: eventData.title,
                        content: eventData.content,
                        custom: false
                    };

                    //добавить в базу
                    this.add({event: obj, day: this.data});

                    //добавить в сетку
                    let index = obj.time.slice(0, 2) / 1;
                    this.times[index].events.push(this.data.events[this.data.events.length - 1]);

                });
        };

        //удалить событие
        this.removeEvent = function(index, time, day) {

            //проверить события по умолчанию
            if (time.events[index].custom) {
                modal.open({title: 'Ошибка', message: 'Нельзя удалить событие'}, 'alert');
                return;
            }

            //запросить подтверждение, удалить
            modal.open({title: 'Подтвердите', message: 'Удалить данное событие?'}, 'confirm')
                .then(() => {
                    this.remove({event: time.events[index], day: day});

                    let timeIndex = this.times.indexOf(time);
                    this.times[timeIndex].events.splice(index, 1);
                });
        };

        //редактировать событие
        this.editEvent = function(data) {
            this.addEvent(data);
        }
    },
    template: selectedDayTemplate
};
module.exports = selectedDay;