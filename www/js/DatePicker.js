/*jshint indent:4, laxbreak:true, smarttabs:true */
/**
 * Cordova DatePicker plugin.js
 *
 * @author Cristobal Dabed
 */
cordova.define("cordova/plugin/datepicker", function(require, exports, module) {
    var exec = require('cordova/exec');


    var pad       = function (value) { return (String(value).length == 1 ? "0" : "") + String(value); };
    var parseDate = function (value) { return new Date(parseFloat(value) * 1000); };

    /**
     * Datepicker
     */
    function DatePicker() {
        var self = this;

        this.options   = null;
        this.callbacks =  {
            onSuccess: function (options) {
                switch (options.state) {
                    case 'change': {
                        self.onChange(options.value);
                    break;
                    }
                    case 'dismiss': {
                        self.onDismiss(options.value);
                    break;
                    }
                    case 'prev': {
                        self.onPrev();
                    break;
                    }
                    case 'next': {
                        self.onNext();
                    break;
                    }
                }
            },
            onError: function () {
                self.onError();
            }
        };
    }

    /**
     * Show
     *
     * @param options
     */
    DatePicker.prototype.show = function (options) {
        var date = options.date ? options.date : '';
        if (date) {
            options.date = [
                date.getFullYear(), '-', pad(date.getMonth() + 1), '-', pad(date.getDate()),
                "T", pad(date.getHours()), ":", pad(date.getMinutes()), ":00Z"
            ].join("");
        }

        var defaults = {
            mode: 'datetime',
            date: '',
            allowOldDates:    true,
            allowFutureDates: true,
            visibility: "auto"
        };

        for (var key in defaults) {
            if (key in options) {
                defaults[key] = options[key];
            }
        }

        defaults.delegateChange = ("onChange" in options);
        defaults.delegatePrev   = ("onPrev" in options);
        defaults.delegateNext   = ("onNext" in options);

        this.options = options;
        exec(this.callbacks.onSuccess, this.callbacks.onError, "DatePicker", "show", [defaults]);
    };

    /**
     * Hide
     */
    DatePicker.prototype.hide = function () {
        exec(null, null, "DatePicker", "hide", []);
    };

    /**
     * Dismiss
     *
     * @param val
     */
    DatePicker.prototype.onDismiss = function (value) {
        if (this.options.onDismiss) {
            this.options.onDismiss(parseDate(value));
        }
    };

    /**
     * On change
     *
     * @param val
     */
    DatePicker.prototype.onChange = function (value) {
        if (this.options.onChange) {
            this.options.onChange(parseDate(value));
        }
    };

    /**
     * On prev
     */
    DatePicker.prototype.onPrev = function () {
        if (this.options.onPrev) {
            this.options.onPrev();
        }
    };

    /**
     * On next
     */
    DatePicker.prototype.onNext = function () {
        if (this.options.onNext) {
            this.options.onNext();
        }
    };


    /**
     * On error
     *
     * @param value
     */
    DatePicker.prototype.onError = function (value) {
        if (this.options.onError) {
            this.options.onError(value);
        }
    };


    var datePicker = new DatePicker();
    module.exports = datePicker;
});