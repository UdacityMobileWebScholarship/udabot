let dialogs = {
    firstRun: 'firstRun',
    rootDialog: 'rootDialog',
    tellAboutUdacity: 'tellAboutUdacity',
};


let _export =  {
    init: (bot) => {
        for(let dialog of Object.keys(dialogs)) {
            require(`./${dialog}.js`)(bot);
            Object.defineProperty(dialogs, dialog, {
                writable: false,
                value: dialogs[dialog]
            })
        }
    },

    keys: dialogs
}

Object.defineProperty(_export, 'keys', {
    value: dialogs,
    writable: false
} );


module.exports = _export;