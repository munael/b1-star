let _radio = $({});

var radio =  {
    sub: function(event_id: any, ...handler: any) {
        _radio.on.apply(_radio, arguments);
    },

    pub: function(event_id: any, ...args: any) {
        _radio.trigger.apply(_radio, arguments);
    },

    unsub: function(event_id: any) {
        _radio.off.apply(_radio, arguments);
    },
}