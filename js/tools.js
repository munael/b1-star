let _radio = $({});
var radio = {
    sub: function (event_id, ...handler) {
        _radio.on.apply(_radio, arguments);
    },
    pub: function (event_id, ...args) {
        _radio.trigger.apply(_radio, arguments);
    },
    unsub: function (event_id) {
        _radio.off.apply(_radio, arguments);
    },
};
//# sourceMappingURL=tools.js.map