'use strict';

module.exports = function ($q) {
    let state = 'close',
        type = null,
        defer;

    let modalViewData = {};

    function getState() {
        return state;
    }

    function getType() {
        return type;
    }

    function open(data, modal_type) {
        modalViewData.data = data;
        type = modal_type;
        state = 'open';
        if (modal_type === 'confirm' || modal_type === 'add-event') {
            defer = $q.defer();
            return defer.promise;
        }
    }

    function close(bool, data) {
        if (bool) {
            if (data) defer.resolve({data: JSON.stringify(data)});
            else defer.resolve();
        } else if (type === 'confirm' && type === 'add-event') {
            defer.reject();
        }
        state = 'close';
        type = null;
        delete modalViewData.data;
    }

    return {
        modalViewData: modalViewData,
        getState: getState,
        getType: getType,
        open: open,
        close: close
    }
};