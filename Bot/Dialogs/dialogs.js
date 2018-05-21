let dialogs = {
    firstRun: 'firstRun',
    rootDialog: 'rootDialog',
    faqDialog: 'faqDialog',
};

let faqs = {
    tellAboutUdacity: 'tellAboutUdacity',
    whatIsCost: 'whatIsCost'
}


let _export =  {
    init: (bot) => {
        for(let dialog of Object.keys(dialogs)) {
            require(`./${dialog}.js`)(bot);
            Object.defineProperty(dialogs, dialog, {
                writable: false,
                value: dialogs[dialog]
            })
        }
        for(let faq of Object.keys(faqs)) {
            Object.defineProperty(faqs, faq, {
                writable: false,
                value: faqs[faq]
            })
        }
    },

    keys: dialogs,
    faqs: faqs
}

Object.defineProperty(_export, 'keys', {
    value: dialogs,
    writable: false
} );


module.exports = _export;