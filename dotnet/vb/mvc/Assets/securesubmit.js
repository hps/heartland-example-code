var Heartland = (function () {
'use strict';

/**
 * @namespace Heartland.DOM
 */
var DOM = (function () {
    function DOM() {
    }
    /**
     * Heartland.DOM.configureField
     *
     * Configures an input field in a single field iFrame.
     *
     * @param {Heartland.HPS} hps
     */
    DOM.configureField = function (hps) {
        document.getElementById('heartland-field').setAttribute('name', hps.field);
    };
    /**
     * Heartland.DOM.makeFrame
     *
     * Creates a single iFrame element with the appropriate defaults.
     *
     * @param {string} name
     * @returns {HTMLIframeElement}
     */
    DOM.makeFrame = function (name) {
        var frame = document.createElement('iframe');
        frame.id = 'heartland-frame-' + name;
        frame.name = name;
        frame.style.border = '0';
        frame.frameBorder = '0';
        frame.scrolling = 'no';
        return frame;
    };
    /**
     * Heartland.DOM.addField
     *
     * Adds a DOM `input` node to `formParent` with type `fieldType`, name
     * `fieldName`, and value `fieldValue`.
     *
     * @param {string} formParent
     * @param {string} fieldType
     * @param {string} fieldName
     * @param {string} fieldValue
     */
    DOM.addField = function (formParent, fieldType, fieldName, fieldValue) {
        var input = document.createElement('input');
        input.setAttribute('type', fieldType);
        input.setAttribute('name', fieldName);
        input.setAttribute('value', fieldValue);
        document.getElementById(formParent).appendChild(input);
    };
    /**
     * Heartland.DOM.setStyle
     *
     * Sets an element's style attribute within a child iframe window.
     *
     * @param {string} elementid
     * @param {string} htmlstyle
     */
    DOM.setStyle = function (elementid, htmlstyle) {
        var el = document.getElementById(elementid);
        if (el) {
            el.setAttribute('style', DOM.encodeEntities(htmlstyle));
        }
    };
    /**
     * Heartland.DOM.appendStyle
     *
     * Appends an element's style attribute within a child iframe window.
     *
     * @param {string} elementid
     * @param {String} htmlstyle
     */
    DOM.appendStyle = function (elementid, htmlstyle) {
        var el = document.getElementById(elementid);
        if (el) {
            var currstyle = el.getAttribute('style');
            var newstyle = (currstyle ? currstyle : '') + htmlstyle;
            el.setAttribute('style', DOM.encodeEntities(newstyle));
        }
    };
    /**
     * Heartland.DOM.setText
     *
     * Sets an element's inner text within a child iframe window.
     *
     * @param {string} elementid
     * @param {string} text
     */
    DOM.setText = function (elementid, text) {
        var el = document.getElementById(elementid);
        if (el) {
            el.textContent = DOM.encodeEntities(text);
        }
    };
    /**
     * Heartland.DOM.setPlaceholder
     *
     * Sets an element's placeholder attribute within a child iframe window.
     *
     * @param {string} elementid
     * @param {string} text
     */
    DOM.setPlaceholder = function (elementid, text) {
        var el = document.getElementById(elementid);
        if (el) {
            if (text === '•••• •••• •••• ••••' || text === '••••' || text === '•••'
                || text === '···· ···· ···· ····') {
                el.setAttribute('placeholder', text);
            }
            else {
                el.setAttribute('placeholder', DOM.encodeEntities(text));
            }
        }
    };
    /**
     * Heartland.DOM.resizeFrame
     *
     * Alerts a parent window to resize the iframe.
     *
     * @param {Heartland.HPS} hps
     */
    DOM.resizeFrame = function (hps) {
        var docHeight = document.body.offsetHeight + 1; // off by one error
        hps.Messages.post({ action: 'resize', height: docHeight }, 'parent');
    };
    /**
     * Heartland.DOM.setFieldData
     *
     * Receives a field value from another frame prior to the tokenization process.
     *
     * @param {string} elementid
     * @param {string} value
     */
    DOM.setFieldData = function (elementid, value) {
        var el = document.getElementById(elementid);
        if (!el && document.getElementById('heartland-field')) {
            el = document.createElement('input');
            el.setAttribute('id', DOM.encodeEntities(elementid));
            el.setAttribute('type', 'hidden');
            document.getElementById('heartland-field-wrapper').appendChild(el);
        }
        if (el) {
            el.setAttribute('value', DOM.encodeEntities(value));
        }
    };
    /**
     * Heartland.DOM.getFieldData
     *
     * Retrieves a field value for another frame prior to the tokenization process.
     *
     * @param {Heartland.HPS} hps
     * @param {string} elementid
     */
    DOM.getFieldData = function (hps, elementid) {
        var el = document.getElementById(elementid);
        if (el) {
            hps.Messages.post({ action: 'passData', value: el.value }, 'parent');
        }
    };
    /**
     * Heartland.DOM.addStylesheet
     *
     * Creates a `style` node in the DOM with the given `css`.
     *
     * @param {Heartland.HPS} hps
     * @param {string} elementid
     */
    DOM.addStylesheet = function (css) {
        var el = document.createElement('style');
        var elements = document.getElementsByTagName('head');
        el.type = 'text/css';
        el.appendChild(document.createTextNode(css));
        if (elements && elements[0]) {
            elements[0].appendChild(el);
        }
    };
    /**
     * Heartland.DOM.json2css
     *
     * Converts a JSON node to text representing CSS.
     *
     * @param {string} json
     * @returns {string}
     */
    DOM.json2css = function (json) {
        var css = '';
        var attributes;
        var children;
        var i, j;
        var key, value;
        if (attributes = DOM.jsonAttributes(json)) {
            var attributesLength = attributes.length;
            for (i = 0; i < attributesLength; i++) {
                key = attributes[i];
                value = json[key];
                if (DOM.isArray(value)) {
                    var arrLength = value.length;
                    for (j = 0; j < arrLength; j++) {
                        css += key + ':' + value[j] + ';';
                    }
                }
                else {
                    css += key + ':' + value + ';';
                }
            }
        }
        if (children = DOM.jsonChildren(json)) {
            var childrenLength = children.length;
            for (i = 0; i < childrenLength; i++) {
                key = children[i];
                value = json[key];
                css += key + '{' + DOM.json2css(value) + '}';
            }
        }
        return css;
    };
    /**
     * Heartland.DOM.setFocus
     *
     * Sets the focus on an iframe's field.
     *
     * @param {Heartland.HPS} hps
     * @param {string} elementid
     */
    DOM.setFocus = function () {
        var el = document.getElementById('heartland-field');
        if (el) {
            el.focus();
        }
    };
    /***********
     * Helpers *
     ***********/
    /**
     * Escapes all potentially dangerous characters, so that the
     * resulting string can be safely inserted into attribute or
     * element text.
     *
     * @param value
     * @returns {string} escaped text
     */
    DOM.encodeEntities = function (value) {
        return value.
            replace(/&/g, '&amp;').
            replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (v) {
            var hi = v.charCodeAt(0);
            var low = v.charCodeAt(1);
            return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
        }).
            replace(/([^\#-~| |!])/g, function (v) {
            return '&#' + v.charCodeAt(0) + ';';
        }).
            replace(/</g, '&lt;').
            replace(/>/g, '&gt;');
    };
    DOM.isArray = function (obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };
    DOM.jsonAttributes = function (json) {
        var set = [];
        for (var i in json) {
            if (json.hasOwnProperty(i)
                && (typeof json[i] === 'string' || DOM.isArray(json[i]))) {
                set.push(i);
            }
        }
        return set;
    };
    DOM.jsonChildren = function (json) {
        var set = [];
        for (var i in json) {
            if (json.hasOwnProperty(i)
                && (Object.prototype.toString.call(json[i]) === '[object Object]')) {
                set.push(i);
            }
        }
        return set;
    };
    return DOM;
}());

var cardTypes = [
    {
        code: 'visa',
        format: /(\d{1,4})/g,
        length: 16,
        regex: /^4/
    },
    {
        code: 'mastercard',
        format: /(\d{1,4})/g,
        length: 16,
        regex: /^(5[1-5]|2[2-7])/
    },
    {
        code: 'amex',
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        length: 15,
        regex: /^3[47]/
    },
    {
        code: 'diners',
        format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
        length: 14,
        regex: /^3[0689]/
    },
    {
        code: 'discover',
        format: /(\d{1,4})/g,
        length: 16,
        regex: /^6([045]|22)/
    },
    {
        code: 'jcb',
        format: /(\d{1,4})/g,
        length: 16,
        regex: /^35/
    }
];

var CardNumber = (function () {
    function CardNumber() {
    }
    CardNumber.prototype.format = function (number) {
        number = number.replace(/\D/g, '');
        var type = Card.typeByNumber(number);
        if (!type) {
            return number;
        }
        var matches = number.match(type.format);
        if (!matches) {
            return number;
        }
        if (!type.format.global) {
            matches.shift();
        }
        return matches.join(' ').replace(/^\s+|\s+$/gm, '');
    };
    return CardNumber;
}());

var Expiration = (function () {
    function Expiration() {
    }
    Expiration.prototype.format = function (exp, final) {
        if (final === void 0) { final = false; }
        var pat = /^\D*(\d{1,2})(\D+)?(\d{1,4})?/;
        var groups = exp.match(pat);
        var month;
        var del;
        var year;
        if (!groups) {
            return '';
        }
        month = groups[1] || '';
        del = groups[2] || '';
        year = groups[3] || '';
        if (year.length > 0) {
            del = ' / ';
        }
        else if (month.length === 2 || del.length > 0) {
            del = ' / ';
        }
        else if (month.length === 1 && (month !== '0' && month !== '1')) {
            del = ' / ';
        }
        if (month.length === 1 && del !== '') {
            month = '0' + month;
        }
        if (final && year.length === 2) {
            year = (new Date).getFullYear().toString().slice(0, 2) + year;
        }
        return month + del + year;
    };
    return Expiration;
}());

var CardNumber$1 = (function () {
    function CardNumber() {
    }
    CardNumber.prototype.validate = function (number) {
        if (!number) {
            return false;
        }
        number = number.replace(/[-\s]/g, '');
        var type = Card.typeByNumber(number);
        if (!type) {
            return false;
        }
        return Card.luhnCheck(number)
            && number.length === type.length;
    };
    return CardNumber;
}());

var Cvv = (function () {
    function Cvv() {
    }
    Cvv.prototype.validate = function (cvv) {
        if (!cvv) {
            return false;
        }
        cvv = cvv.replace(/^\s+|\s+$/g, '');
        if (!/^\d+$/.test(cvv)) {
            return false;
        }
        return 3 <= cvv.length && cvv.length <= 4;
    };
    return Cvv;
}());

var Expiration$1 = (function () {
    function Expiration() {
    }
    Expiration.prototype.validate = function (exp) {
        var m, y;
        if (!exp) {
            return false;
        }
        var split = exp.split('/');
        m = split[0], y = split[1];
        if (!m || !y) {
            return false;
        }
        m = m.replace(/^\s+|\s+$/g, '');
        y = y.replace(/^\s+|\s+$/g, '');
        if (!/^\d+$/.test(m)) {
            return false;
        }
        if (!/^\d+$/.test(y)) {
            return false;
        }
        if (y.length === 2) {
            y = (new Date).getFullYear().toString().slice(0, 2) + y;
        }
        var month = parseInt(m, 10);
        var year = parseInt(y, 10);
        if (!(1 <= month && month <= 12)) {
            return false;
        }
        // creates date as 1 day past end of
        // expiration month since JS months
        // are 0 indexed
        return (new Date(year, month, 1)) > (new Date);
    };
    return Expiration;
}());

var Expiration$2 = (function () {
    function Expiration() {
    }
    Expiration.prototype.format = function (exp, final) {
        if (final === void 0) { final = false; }
        var pat = /^\D*(\d{1,2})(\D+)?(\d{1,4})?/;
        var groups = exp.match(pat);
        var month;
        var del;
        var year;
        if (!groups) {
            return '';
        }
        month = groups[1] || '';
        del = groups[2] || '';
        year = groups[3] || '';
        if (year.length > 0) {
            del = ' / ';
        }
        else if (month.length === 2 || del.length > 0) {
            del = ' / ';
        }
        else if (month.length === 1 && (month !== '0' && month !== '1')) {
            del = ' / ';
        }
        if (month.length === 1 && del !== '') {
            month = '0' + month;
        }
        if (final && year.length === 2) {
            year = (new Date).getFullYear().toString().slice(0, 2) + year;
        }
        return month + del + year;
    };
    return Expiration;
}());

var Ev = (function () {
    function Ev() {
    }
    Ev.listen = function (node, eventName, callback) {
        if (document.addEventListener) {
            node.addEventListener(eventName, callback, false);
        }
        else {
            if (node === document) {
                document.documentElement.attachEvent('onpropertychange', function (e) {
                    if (e.propertyName === eventName) {
                        callback(e);
                    }
                });
            }
            else {
                node.attachEvent('on' + eventName, callback);
            }
        }
    };
    Ev.trigger = function (node, eventName) {
        if (document.createEvent) {
            var event = document.createEvent('Event');
            event.initEvent(eventName, true, true);
            node.dispatchEvent(event);
        }
        else {
            document.documentElement[eventName]++;
        }
    };
    Ev.ignore = function (eventName, callback) {
        if (document.removeEventListener) {
            document.removeEventListener(eventName, callback, false);
        }
        else {
            document.documentElement.detachEvent('onpropertychange', function (e) {
                if (e.propertyName === eventName) {
                    callback(e);
                }
            });
        }
    };
    return Ev;
}());
/**
 * @namespace Heartland.Events
 */
var Events = (function () {
    function Events() {
    }
    /**
     * Heartland.Events.addHandler
     *
     * Adds an `event` handler for a given `target` element.
     *
     * @param {string | EventTarget} target
     * @param {string} event
     * @param {EventListener} callback
     */
    Events.addHandler = function (target, event, callback) {
        var node;
        if (typeof target === 'string') {
            node = document.getElementById(target);
        }
        else {
            node = target;
        }
        if (document.addEventListener) {
            node.addEventListener(event, callback, false);
        }
        else {
            Ev.listen(node, event, callback);
        }
    };
    /**
     * Heartland.Events.removeHandler
     *
     * Removes an `event` handler for a given `target` element.
     *
     * @param {string | EventTarget} target
     * @param {string} event
     * @param {EventListener} callback
     */
    Events.removeHandler = function (target, event, callback) {
        var node;
        if (typeof target === 'string') {
            node = document.getElementById(target);
        }
        else {
            node = target;
        }
        if (document.removeEventListener) {
            node.removeEventListener(event, callback, false);
        }
        else {
            Ev.ignore(event, callback);
        }
    };
    /**
     * Heartland.Events.trigger
     *
     * Fires off an `event` for a given `target` element.
     *
     * @param {string} name
     * @param {any} target
     * @param {any} data [optional]
     */
    Events.trigger = function (name, target, data, bubble) {
        if (bubble === void 0) { bubble = false; }
        if (document.createEvent) {
            var event = document.createEvent('Event');
            event.initEvent(name, true, true);
            target.dispatchEvent(event);
        }
        else {
            Ev.trigger(target, name);
        }
    };
    /**
     * Heartland.Events.frameHandleWith
     *
     * Wraps `hps` state in a closure to provide a `Heartland.Messages.receive`
     * callback handler for iFrame children.
     *
     * @param {Heartland.HPS} hps
     */
    Events.frameHandleWith = function (hps) {
        return function (data) {
            switch (data.action) {
                case 'tokenize':
                    if (data.accumulateData) {
                        hps.Messages.post({
                            action: 'accumulateData'
                        }, 'parent');
                        var el = document.createElement('input');
                        el.id = 'publicKey';
                        el.type = 'hidden';
                        el.value = data.message;
                        document
                            .getElementById('heartland-field-wrapper')
                            .appendChild(el);
                    }
                    else {
                        Events.tokenizeIframe(hps, data.message);
                    }
                    break;
                case 'setStyle':
                    DOM.setStyle(data.id, data.style);
                    DOM.resizeFrame(hps);
                    break;
                case 'appendStyle':
                    DOM.appendStyle(data.id, data.style);
                    DOM.resizeFrame(hps);
                    break;
                case 'setText':
                    DOM.setText(data.id, data.text);
                    DOM.resizeFrame(hps);
                    break;
                case 'setPlaceholder':
                    DOM.setPlaceholder(data.id, data.text);
                    break;
                case 'setFieldData':
                    DOM.setFieldData(data.id, data.value);
                    if (document.getElementById('heartland-field') &&
                        document.getElementById('cardCvv') &&
                        document.getElementById('cardExpiration')) {
                        var pkey = document.getElementById('publicKey');
                        Events.tokenizeIframe(hps, (pkey ? pkey.getAttribute('value') : ''));
                    }
                    break;
                case 'getFieldData':
                    DOM.getFieldData(hps, data.id);
                    break;
                case 'addStylesheet':
                    DOM.addStylesheet(data.data);
                    DOM.resizeFrame(hps);
                    break;
                case 'setFocus':
                    DOM.setFocus();
                    break;
            }
        };
    };
    /**
     * tokenizeIframe
     *
     * Tokenizes card data. Used in iframe integrations to tokenize on Heartland's
     * servers.
     *
     * @param {Heartland.HPS} hps
     * @param {string} publicKey
     */
    Events.tokenizeIframe = function (hps, publicKey) {
        var card = {};
        var numberElement = (document.getElementById('heartland-field')
            || document.getElementById('heartland-card-number'));
        var cvvElement = (document.getElementById('cardCvv')
            || document.getElementById('heartland-cvv'));
        var expElement = document.getElementById('cardExpiration');
        var tokenResponse = function (action) {
            return function (response) {
                hps.Messages.post({ action: action, response: response }, 'parent');
                if (cvvElement) {
                    if (cvvElement.parentNode) {
                        cvvElement.parentNode.removeChild(cvvElement);
                    }
                    else {
                        cvvElement.remove();
                    }
                }
                if (expElement) {
                    if (expElement.parentNode) {
                        expElement.parentNode.removeChild(expElement);
                    }
                    else {
                        expElement.remove();
                    }
                }
            };
        };
        card.number = numberElement ? numberElement.value : '';
        card.cvv = cvvElement ? cvvElement.value : '';
        card.exp = expElement;
        if (card.exp) {
            var formatter = new Expiration$2();
            var cardExpSplit = formatter.format(card.exp.value, true).split('/');
            card.expMonth = cardExpSplit[0];
            card.expYear = cardExpSplit[1];
            card.exp = undefined;
        }
        else {
            card.expMonth = document.getElementById('heartland-expiration-month').value;
            card.expYear = document.getElementById('heartland-expiration-year').value;
        }
        hps.tokenize({
            cardCvv: card.cvv ? card.cvv : '',
            cardExpMonth: card.expMonth ? card.expMonth : '',
            cardExpYear: card.expYear ? card.expYear : '',
            cardNumber: card.number ? card.number : '',
            error: tokenResponse('onTokenError'),
            publicKey: publicKey ? publicKey : '',
            success: tokenResponse('onTokenSuccess'),
            type: 'pan'
        });
    };
    return Events;
}());

/**
 * @namespace Heartland.Card
 */
var Card = (function () {
    function Card() {
    }
    /**
     * Heartland.Card.typeByNumber
     *
     * Helper function to grab the CardType for a given card number.
     *
     * @param {string} number - The card number
     * @returns {Heartland.CardType}
     */
    Card.typeByNumber = function (number) {
        var cardType;
        var i;
        if (!number) {
            return null;
        }
        if (number.replace(/^\s+|\s+$/gm, '').length < 4) {
            return null;
        }
        for (i in cardTypes) {
            cardType = cardTypes[i];
            if (cardType && cardType.regex && cardType.regex.test(number)) {
                break;
            }
        }
        return cardType;
    };
    /**
     * Heartland.Card.typeByTrack
     *
     * @param {string} data - track data
     * @param {boolean} isEncrypted - (default: false)
     * @param {string} trackNumber
     *
     * @returns CardType
     */
    Card.typeByTrack = function (data, isEncrypted, trackNumber) {
        if (isEncrypted === void 0) { isEncrypted = false; }
        var number;
        if (isEncrypted && trackNumber && trackNumber === '02') {
            number = data.split('=')[0];
        }
        else {
            var temp = data.split('%');
            if (temp[1]) {
                temp = temp[1].split('^');
                if (temp[0]) {
                    number = temp[0].toString().substr(1);
                }
            }
        }
        return Card.typeByNumber(number);
    };
    /**
     * Heartland.Card.luhnCheck
     *
     * Runs a mod 10 check on a given card number.
     *
     * @param {string} number - The card number
     * @returns {boolean}
     */
    Card.luhnCheck = function (number) {
        var odd = true;
        var i = 0;
        var sum = 0;
        var digit;
        if (!number) {
            return false;
        }
        var digits = number.split('').reverse();
        var length = digits.length;
        for (i; i < length; i++) {
            digit = parseInt(digits[i], 10);
            if (odd = !odd) {
                digit *= 2;
            }
            if (digit > 9) {
                digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    };
    /**
     * Heartland.Card.addType
     *
     * Adds a class to the target element with the card type
     * inferred from the target's current value.
     *
     * @param {Event} e
     */
    Card.addType = function (e) {
        var target = (e.currentTarget ? e.currentTarget : e.srcElement);
        var type = Card.typeByNumber(target.value);
        var classList = target.className.split(' ');
        var length = classList.length;
        var i = 0;
        var c = '';
        for (i; i < length; i++) {
            c = classList[i];
            if (c && c.indexOf('card-type-') !== -1) {
                delete classList[i];
            }
        }
        if (type) {
            classList.push('card-type-' + type.code);
        }
        target.className = classList.join(' ').replace(/^\s+|\s+$/gm, '');
    };
    /**
     * Heartland.Card.formatNumber
     *
     * Formats a target element's value based on the
     * inferred card type's formatting regex.
     *
     * @param {Event} e
     */
    Card.formatNumber = function (e) {
        var target = (e.currentTarget ? e.currentTarget : e.srcElement);
        var value = target.value;
        if (value.length === 0) {
            return;
        }
        var formatted = (new CardNumber).format(value);
        target.value = formatted;
        if (!target.setSelectionRange) {
            return;
        }
        var cursor = target.selectionStart;
        // copy and paste, space inserted on formatter
        if (value.length < formatted.length) {
            cursor += formatted.length - value.length;
        }
        // check if before new inserted digit is a space
        if (value.charAt(cursor) === ' ' &&
            formatted.charAt(cursor - 1) === ' ') {
            cursor += 1;
        }
        target.setSelectionRange(cursor, cursor);
    };
    /**
     * Heartland.Card.formatExpiration
     *
     * Formats a target element's value.
     *
     * @param {KeyboardEvent} e
     */
    Card.formatExpiration = function (e) {
        var target = (e.currentTarget ? e.currentTarget : e.srcElement);
        var value = target.value;
        // allow: delete, backspace
        if ([46, 8].indexOf(e.keyCode) !== -1 ||
            // allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        target.value = (new Expiration)
            .format(value, e.type === 'blur');
    };
    /**
     * Heartland.Card.restrictLength
     *
     * Restricts input in a target element to a
     * certain length data.
     *
     * @param {number} length
     *
     * @returns {(e: KeyboardEvent) => ()}
     */
    Card.restrictLength = function (length) {
        return function (e) {
            var target = (e.currentTarget ? e.currentTarget : e.srcElement);
            var value = target.value;
            // allow: backspace, delete, tab, escape and enter
            if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
                // allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
                // allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            if (value.length >= length) {
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            }
        };
    };
    /**
     * Heartland.Card.restrictNumeric
     *
     * Restricts input in a target element to only
     * numeric data.
     *
     * @param {KeyboardEvent} e
     */
    Card.restrictNumeric = function (e) {
        // allow: backspace, delete, tab, escape and enter
        if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
            // allow: Ctrl+A
            (e.keyCode === 65 && e.ctrlKey === true) ||
            // allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        }
    };
    /**
     * Heartland.Card.deleteProperly
     *
     * Places cursor on the correct position to
     * let the browser delete the digit instead
     * of the space.
     *
     * @param {KeyboardEvent} e
     */
    Card.deleteProperly = function (e) {
        var target = (e.currentTarget ? e.currentTarget : e.srcElement);
        var value = target.value;
        if (!target.setSelectionRange) {
            return;
        }
        var cursor = target.selectionStart;
        // allow: delete, backspace
        if ([46, 8].indexOf(e.keyCode) !== -1 &&
            // if space to be deleted
            (value.charAt(cursor - 1) === ' ')) {
            // placing cursor before space to delete digit instead
            target.setSelectionRange(cursor - 1, cursor - 1);
        }
    };
    /**
     * Heartland.Card.validateNumber
     *
     * Validates a target element's value based on the
     * inferred card type's validation regex. Adds a
     * class to the target element to note `valid` or
     * `invalid`.
     *
     * @param {Event} e
     */
    Card.validateNumber = function (e) {
        var target = (e.currentTarget ? e.currentTarget : e.srcElement);
        var value = target.value;
        var classList = target.className.split(' ');
        var length = classList.length;
        var c = '';
        for (var i = 0; i < length; i++) {
            c = classList[i];
            if (c.indexOf('valid') !== -1) {
                delete classList[i];
            }
        }
        if ((new CardNumber$1).validate(value)) {
            classList.push('valid');
        }
        else {
            classList.push('invalid');
        }
        target.className = classList.join(' ').replace(/^\s+|\s+$/gm, '');
    };
    /**
     * Heartland.Card.validateCvv
     *
     * Validates a target element's value based on the
     * possible CVV lengths. Adds a class to the target
     * element to note `valid` or `invalid`.
     *
     * @param {Event} e
     */
    Card.validateCvv = function (e) {
        var target = (e.currentTarget ? e.currentTarget : e.srcElement);
        var value = target.value;
        var classList = target.className.split(' ');
        var length = classList.length;
        var c = '';
        for (var i = 0; i < length; i++) {
            c = classList[i];
            if (c.indexOf('valid') !== -1) {
                delete classList[i];
            }
        }
        if ((new Cvv).validate(value)) {
            classList.push('valid');
        }
        else {
            classList.push('invalid');
        }
        target.className = classList.join(' ').replace(/^\s+|\s+$/gm, '');
    };
    /**
     * Heartland.Card.validateExpiration
     *
     * Validates a target element's value based on the
     * current date. Adds a class to the target element
     * to note `valid` or `invalid`.
     *
     * @param {Event} e
     */
    Card.validateExpiration = function (e) {
        var target = (e.currentTarget ? e.currentTarget : e.srcElement);
        var value = target.value;
        var classList = target.className.split(' ');
        var length = classList.length;
        var c = '';
        for (var i = 0; i < length; i++) {
            c = classList[i];
            if (c.indexOf('valid') !== -1) {
                delete classList[i];
            }
        }
        if ((new Expiration$1).validate(value)) {
            classList.push('valid');
        }
        else {
            classList.push('invalid');
        }
        target.className = classList.join(' ').replace(/^\s+|\s+$/gm, '');
    };
    /**
     * Heartland.Card.attachNumberEvents
     *
     * @param {string} selector
     */
    Card.attachNumberEvents = function (selector) {
        Events.addHandler(document.querySelector(selector), 'keydown', Card.restrictNumeric);
        Events.addHandler(document.querySelector(selector), 'keydown', Card.restrictLength(19));
        Events.addHandler(document.querySelector(selector), 'keydown', Card.deleteProperly);
        Events.addHandler(document.querySelector(selector), 'input', Card.formatNumber);
        Events.addHandler(document.querySelector(selector), 'input', Card.validateNumber);
        Events.addHandler(document.querySelector(selector), 'input', Card.addType);
    };
    /**
     * Heartland.Card.attachExpirationEvents
     *
     * @param {string} selector
     */
    Card.attachExpirationEvents = function (selector) {
        Events.addHandler(document.querySelector(selector), 'keydown', Card.restrictNumeric);
        Events.addHandler(document.querySelector(selector), 'keydown', Card.restrictLength(9));
        Events.addHandler(document.querySelector(selector), 'keyup', Card.formatExpiration);
        Events.addHandler(document.querySelector(selector), 'blur', Card.formatExpiration);
        Events.addHandler(document.querySelector(selector), 'input', Card.validateExpiration);
        Events.addHandler(document.querySelector(selector), 'blur', Card.validateExpiration);
    };
    /**
     * Heartland.Card.attachCvvEvents
     *
     * @param {string} selector
     */
    Card.attachCvvEvents = function (selector) {
        Events.addHandler(document.querySelector(selector), 'keydown', Card.restrictNumeric);
        Events.addHandler(document.querySelector(selector), 'keydown', Card.restrictLength(4));
        Events.addHandler(document.querySelector(selector), 'input', Card.validateCvv);
    };
    return Card;
}());
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        return -1;
    };
}

var urls = {
    CERT: 'https://cert.api2.heartlandportico.com/Hps.Exchange.PosGateway.Hpf.v1/api/token',
    PROD: 'https://api.heartlandportico.com/SecureSubmit.v1/api/token',
    iframeCERT: 'https://hps.github.io/token/2.1/',
    iframePROD: 'https://api.heartlandportico.com/SecureSubmit.v1/token/2.1/'
};

/**
 * @namespace Heartland.Util
 */
var Util = (function () {
    function Util() {
    }
    /**
     * Heartland.Util.getCardType
     *
     * Parses a credit card number to obtain the card type/brand.
     *
     * @param {string} tokenizationType
     * @param {Heartland.Options} options
     */
    Util.getCardType = function (tokenizationType, options) {
        var cardType;
        var data = '';
        var type = 'unknown';
        switch (tokenizationType) {
            case 'swipe':
                data = options.track;
                cardType = Card.typeByTrack(data);
                break;
            case 'encrypted':
                data = options.track;
                cardType = Card.typeByTrack(data, true, options.trackNumber);
                break;
            default:
                data = options.cardNumber;
                cardType = Card.typeByNumber(data);
                break;
        }
        if (cardType) {
            type = cardType.code;
        }
        return type;
    };
    /**
     * Heartland.Util.applyOptions
     *
     * Creates a single object by merging a `source` (default) and `properties`
     * obtained elsewhere, e.g. a function argument in `HPS`. Any properties in
     * `properties` will overwrite matching properties in `source`.
     *
     * @param {Heartland.Options} source
     * @param {Heartland.Options} properties
     * @returns {Heartland.Options}
     */
    Util.applyOptions = function (source, properties) {
        var destination = {};
        if (!source) {
            source = {};
        }
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                destination[property] = source[property];
            }
        }
        for (var property in properties) {
            if (properties.hasOwnProperty(property)) {
                destination[property] = properties[property];
            }
        }
        return destination;
    };
    /**
     * Heartland.Util.throwError
     *
     * Allows a merchant-defined error handler to be used in cases where the
     * tokenization process fails. If not provided, we throw the message as a
     * JS runtime error.
     *
     * @param {Heartland.Options} options
     * @param {string | Heartland.TokenizationResponse} errorMessage
     */
    Util.throwError = function (options, errorMessage) {
        if (typeof (options.error) === 'function') {
            options.error(errorMessage);
        }
        else {
            throw errorMessage;
        }
    };
    /**
     * Heartland.Util.getItemByPropertyValue
     *
     * Enumerates over a `collection` to retreive an item whose `property` is
     * a given `value`.
     *
     * @param {any} collection
     * @param {string} property
     * @param {any} value
     * @returns {any}
     */
    Util.getItemByPropertyValue = function (collection, property, value) {
        var length = collection.length;
        var i = 0;
        for (i; i < length; i++) {
            if (collection[i][property] === value) {
                return collection[i];
            }
        }
    };
    /**
     * Heartland.Util.getParams
     *
     * Builds param list for a particular `type` from expected properties in
     * `data`.
     *
     * @param {string} type - The tokenization type
     * @param {Heartland.Options} data
     * @returns {string}
     */
    Util.getParams = function (type, data) {
        var params = [];
        switch (type) {
            case 'pan':
                params.push('token_type=supt', 'object=token', '_method=post', 'api_key=' + data.publicKey.replace(/^\s+|\s+$/g, ''), 'card%5Bnumber%5D=' + data.cardNumber.replace(/\s/g, ''), 'card%5Bexp_month%5D=' + data.cardExpMonth.replace(/^\s+|\s+$/g, ''), 'card%5Bexp_year%5D=' + data.cardExpYear.replace(/^\s+|\s+$/g, ''), 'card%5Bcvc%5D=' + data.cardCvv.replace(/^\s+|\s+$/g, ''));
                break;
            case 'swipe':
                params.push('token_type=supt', 'object=token', '_method=post', 'api_key=' + data.publicKey.replace(/^\s+|\s+$/g, ''), 'card%5Btrack_method%5D=swipe', 'card%5Btrack%5D=' + encodeURIComponent(data.track.replace(/^\s+|\s+$/g, '')));
                break;
            case 'encrypted':
                params.push('token_type=supt', 'object=token', '_method=post', 'api_key=' + data.publicKey.replace(/^\s+|\s+$/g, ''), 'encryptedcard%5Btrack_method%5D=swipe', 'encryptedcard%5Btrack%5D=' + encodeURIComponent(data.track.replace(/^\s+|\s+$/g, '')), 'encryptedcard%5Btrack_number%5D=' + encodeURIComponent(data.trackNumber.replace(/^\s+|\s+$/g, '')), 'encryptedcard%5Bktb%5D=' + encodeURIComponent(data.ktb.replace(/^\s+|\s+$/g, '')), 'encryptedcard%5Bpin_block%5D=' + encodeURIComponent(data.pinBlock.replace(/^\s+|\s+$/g, '')));
                break;
            default:
                Util.throwError(data, 'unknown params type');
                break;
        }
        return params.join('&');
    };
    /**
     * Heartland.Util.getUrlByEnv
     *
     * Selects the appropriate tokenization service URL for the
     * active `publicKey`.
     *
     * @param {Heartland.Options} options
     * @returns {string}
     */
    Util.getUrlByEnv = function (options) {
        options.env = options.publicKey.split('_')[1];
        if (options.env === 'cert') {
            options.gatewayUrl = urls.CERT;
        }
        else {
            options.gatewayUrl = urls.PROD;
        }
        return options;
    };
    /**
     * Heartland.Util.addFormHandler
     *
     * Creates and adds an event handler function for the submission for a given
     * form (`options.form_id`).
     *
     * @param {Heartland.Options} options
     * @listens submit
     */
    Util.addFormHandler = function (options) {
        var payment_form = document.getElementById(options.formId);
        var code = function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }
            else if (window.event) {
                window.event.returnValue = false;
            }
            var fields = Util.getFields(options.formId);
            var cardType = Util.getCardType(fields.number, 'pan');
            options.cardNumber = fields.number;
            options.cardExpMonth = fields.expMonth;
            options.cardExpYear = fields.expYear;
            options.cardCvv = fields.cvv;
            options.cardType = cardType;
            Ajax.call('pan', options);
        };
        Events.addHandler(payment_form, 'submit', code);
        DOM.addField(options.formId, 'hidden', 'publicKey', options.publicKey);
    };
    /**
     * Heartland.Util.getFields
     *
     * Extracts card information from the fields with names `card_number`,
     * `card_expiration_month`, `card_expiration_year`, and `card_cvc` and
     * expects them to be present as children of `formParent`.
     *
     * @param {string} formParent
     * @returns {Heartland.CardData}
     */
    Util.getFields = function (formParent) {
        var form = document.getElementById(formParent);
        var fields = {};
        var i;
        var length = form.childElementCount;
        for (i = 0; i < length; i++) {
            var element = form.children[i];
            if (element.id === 'card_number') {
                fields.number = element.value;
            }
            else if (element.id === 'card_expiration_month') {
                fields.expMonth = element.value;
            }
            else if (element.id === 'card_expiration_year') {
                fields.expYear = element.value;
            }
            else if (element.id === 'card_cvc') {
                fields.cvv = element.value;
            }
        }
        return fields;
    };
    return Util;
}());

/**
 * @namespace Heartland.Ajax
 */
var Ajax = (function () {
    function Ajax() {
    }
    /**
     * Heartland.Ajax.call
     *
     * Sets up a request to be passed to `Heartland.Ajax.jsonp`. On successful tokenization,
     * `options.success` will be called with the tokenization data as the only
     * argument passed.
     *
     * @param {string} type
     * @param {Heartland.Options} options
     */
    Ajax.call = function (type, options) {
        var cardType = Util.getCardType(type, options);
        var params = Util.getParams(type, options);
        var request = {
            payload: params,
            url: options.gatewayUrl
        };
        Ajax.jsonp(request, function (data) {
            if (data.error) {
                Util.throwError(options, data);
            }
            else {
                var card = data.card || data.encryptedcard;
                var lastfour = card.number.slice(-4);
                data.last_four = lastfour;
                data.card_type = cardType;
                data.exp_month = options.cardExpMonth;
                data.exp_year = options.cardExpYear;
                if (options.formId && options.formId.length > 0) {
                    DOM.addField(options.formId, 'hidden', 'token_value', data.token_value);
                    DOM.addField(options.formId, 'hidden', 'last_four', lastfour);
                    DOM.addField(options.formId, 'hidden', 'card_exp_year', options.cardExpYear);
                    DOM.addField(options.formId, 'hidden', 'card_exp_month', options.cardExpMonth);
                    DOM.addField(options.formId, 'hidden', 'card_type', cardType);
                }
                options.success(data);
            }
        });
    };
    /**
     * Heartland.Ajax.jsonp
     *
     * Creates a new DOM node containing a created JSONP callback handler for an
     * impending Ajax JSONP request. Removes need for `XMLHttpRequest`.
     *
     * @param {string} url
     * @param {function} callback
     */
    Ajax.jsonp = function (request, callback) {
        var script = document.createElement('script');
        var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[callbackName] = function (data) {
            window[callbackName] = undefined;
            document.body.removeChild(script);
            callback(data);
        };
        script.src = request.url + (request.url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName
            + '&' + request.payload;
        document.body.appendChild(script);
    };
    /**
     * Heartland.Ajax.cors
     *
     * Creates a new XMLHttpRequest object for a POST request to the given `url`.
     *
     * @param {string} url
     * @param {function} callback
     */
    Ajax.cors = function (request, payload, callback) {
        var xhr;
        var method = 'POST';
        var timeout;
        if ((new XMLHttpRequest()).withCredentials === undefined) {
            xhr = new window.XDomainRequest();
            method = 'GET';
            request.url = request.url.split('?')[0];
            request.url = request.url + '?' + request.payload;
            payload = null;
            xhr.open(method, request.url);
        }
        else {
            xhr = new XMLHttpRequest();
            xhr.open(method, request.url);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        var cb = function (e) {
            clearTimeout(timeout);
            if (e.type === 'error') {
                callback({ error: { message: 'communication error' } });
                return;
            }
            if (xhr.readyState === 4 || (xhr.readyState !== 4 && xhr.responseText !== '')) {
                var data = JSON.parse(xhr.responseText);
                callback(data);
            }
            else {
                callback({ error: { message: 'no data' } });
            }
        };
        xhr.onload = cb;
        xhr.onerror = cb;
        xhr.send(payload);
        timeout = setTimeout(function () {
            xhr.abort();
            callback({ error: { message: 'timeout' } });
        }, 5000);
    };
    return Ajax;
}());

var Formatter = {
    CardNumber: CardNumber,
    Expiration: Expiration
};

var defaults = {
    _method: 'post',
    buttonTarget: '',
    cardCvv: '',
    cardExpMonth: '',
    cardExpYear: '',
    cardNumber: '',
    cardType: '',
    env: 'prod',
    error: null,
    fields: {},
    formId: '',
    gatewayUrl: '',
    iframeTarget: '',
    ktb: '',
    object: 'token',
    onEvent: null,
    onTokenError: null,
    onTokenSuccess: null,
    pinBlock: '',
    publicKey: '',
    success: null,
    targetType: '',
    tokenType: 'supt',
    track: '',
    trackNumber: '',
    type: 'pan',
    useDefaultStyles: true
};

var fields = [
    'cardNumber',
    'cardCvv',
    'cardExpiration',
    'submit'
];

/**
 * Heartland.Messages
 *
 * Initializes a new object for wrapping `window.postMessage` and a fallback
 * method for legacy browsers.
 */
var Messages = (function () {
    /**
     * Heartland.Messages (constructor)
     *
     * @constructor
     * @param {Heartland.HPS} hps
     * @returns {Heartland.Messages}
     */
    function Messages(hps) {
        this.hps = hps;
        this.intervalId = null;
        this.lastHash = '';
        this.pushIntervalStarted = false;
    }
    /**
     * Heartland.Messages.pushMessages
     *
     * For legacy browsers, a mailbox (buffer) must be used to ensure all messages
     * are sent between parent and child windows. When ready, this function builds
     * the final message, encodes it, sends it, and resets the mailbox to `[]`.
     *
     * @param {Heartland.HPS} hps
     * @returns {function}
     */
    Messages.prototype.pushMessages = function (hps) {
        return function () {
            var data = [];
            var messageArr = [];
            var i = 0;
            var targetUrl = '';
            var current;
            var targetNode;
            var re = /^#?\d+&/;
            var length = hps.mailbox.length;
            if (!length) {
                return;
            }
            for (i = 0; i < length; i++) {
                current = hps.mailbox.shift();
                if (!targetUrl) {
                    targetUrl = current.targetUrl;
                    targetNode = current.targetNode;
                }
                messageArr.push(current.message);
            }
            current = null;
            if (re.test(window.location.hash)) {
                current = JSON.parse(decodeURIComponent(window.location.hash.replace(re, '')));
                data.concat(current);
            }
            if (messageArr !== []) {
                hps.cacheBust = hps.cacheBust || 1;
                data.push({ data: messageArr, source: { name: hps.field || 'parent' } });
                var message = JSON.stringify(data);
                var url = targetUrl.replace(/#.*$/, '') + '#' +
                    (+new Date()) + (hps.cacheBust++) + '&' +
                    encodeURIComponent(message);
                if (targetNode.location) {
                    targetNode.location.href = url;
                }
                else {
                    targetNode.src = url;
                }
            }
            messageArr.length = 0;
            hps.mailbox.length = 0;
        };
    };
    /**
     * Heartland.Messages.post
     *
     * When present, wraps the built-in `window.postMessage`. When not present,
     * pushes the message onto the mailbox for eventual sending, and on first use,
     * starts the interval for `Messages.pushMessages`.
     *
     * @param {Object | string} message
     * @param {string} target
     */
    Messages.prototype.post = function (message, target) {
        var targetNode;
        message.source = message.source || {};
        message.source.name = window.name;
        if (!this.hps.frames) {
            return;
        }
        var frame = this.hps.frames[target] || this.hps[target];
        if (!frame) {
            return;
        }
        var targetUrl = this.hps.frames[target].url;
        try {
            if (typeof frame.targetNode !== 'undefined') {
                targetNode = frame.targetNode;
            }
            else if (typeof frame.frame !== 'undefined') {
                targetNode = frame.frame;
            }
        }
        catch (e) {
            targetNode = frame;
        }
        if (window.postMessage) {
            targetNode.postMessage(JSON.stringify(message), targetUrl);
        }
        else {
            this.hps.mailbox = this.hps.mailbox || [];
            this.hps.mailbox.push({
                message: message,
                targetNode: targetNode,
                targetUrl: targetUrl
            });
            if (!this.pushIntervalStarted) {
                setInterval(this.pushMessages(this.hps), 10);
            }
        }
    };
    /**
     * Heartland.Messages.receive
     *
     * When present, wraps the built-in `window.postMesage`'s `message` or
     * `onmessage` window events. When not present, uses a single interval to
     * check for changes to `window.location.hash` when the other window sends a
     * message and will decode the JSON and URI encoded hash.
     *
     * @param {Function} callback
     * @param {string} sourceOrigin
     */
    Messages.prototype.receive = function (callback, sourceOrigin) {
        if (window.postMessage) {
            this.callback = function (m) {
                callback(JSON.parse(m.data));
            };
            if (window.addEventListener) {
                window.addEventListener('message', this.callback, !1);
            }
            else {
                window.attachEvent('onmessage', this.callback);
            }
        }
        else {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.intervalId = null;
            if (callback) {
                this.intervalId = setInterval(function () {
                    var hash = document.location.hash, re = /^#?\d+&/;
                    if (hash !== this.lastHash && re.test(hash)) {
                        var data = JSON.parse(decodeURIComponent(hash.replace(re, '')));
                        this.lastHash = hash;
                        for (var i in data) {
                            var m = data[i];
                            if (Object.prototype.toString.call(m.data) !== '[object Array]') {
                                callback(m);
                                continue;
                            }
                            for (var j in m.data) {
                                callback({ data: m.data[j], source: m.source });
                            }
                        }
                    }
                }, 100);
            }
        }
        Events.trigger('receiveMessageHandlerAdded', document);
    };
    /**
     * Heartland.Messages.removeReceiver
     *
     * Removes active `message` event handler function.
     */
    Messages.prototype.removeReceiver = function () {
        if (window.addEventListener) {
            window.removeEventListener('message', this.callback, !1);
        }
        else {
            window.detachEvent('onmessage', this.callback);
        }
    };
    /**
     * Heartland.Messages.dispose
     *
     * Removes active `message` event handler function and any
     * active intervals.
     */
    Messages.prototype.dispose = function () {
        this.removeReceiver();
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    };
    return Messages;
}());

/**
 * @namespace Heartland.Styles
 */
var Styles;
(function (Styles) {
    /**
     * Heartland.Styles.Defaults
     *
     * Collection of helper functions for applying default styles to a child
     * window's fields. Serves as an example of these methods' use in merchant
     * modifications. Each function expects a `Heartland.HPS` object to be passed
     * as an argument.
     */
    Styles.Defaults = {
        body: function (hps) {
            hps.setStyle('heartland-body', 'margin: 0;' +
                'font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif;' +
                'color: #666;');
        },
        cvv: function (hps) {
            hps.appendStyle('heartland-cvv', 'width: 110px;');
        },
        cvvContainer: function (hps) {
            hps.setStyle('heartland-cvv-container', 'width: 110px;' +
                'display: inline-block;' +
                'float: left;');
        },
        fieldset: function (hps) {
            hps.setStyle('heartland-expiration-date-container', 'border: 0;' +
                'margin: 0 25px 0px 1px;' +
                'padding: 0;' +
                'width: 173px;' +
                'display: inline-block;' +
                'float:  left;');
        },
        inputsAndSelects: function (hps) {
            var ids = [
                'heartland-card-number',
                'heartland-expiration-month',
                'heartland-expiration-year',
                'heartland-cvv'
            ];
            var length = ids.length;
            var i = 0;
            for (i; i < length; i++) {
                hps.setStyle(ids[i], 'width: 309px;' +
                    'padding: 5px;' +
                    'font-size: 14px;' +
                    'margin: 3px 0px 15px 0px;' +
                    'border: 1px #ccc solid;' +
                    /* IE10 Consumer Preview */
                    'background-image: -ms-linear-gradient(bottom, #F7F7F7 0%, #EFEFEF 100%);' +
                    /* Mozilla Firefox */
                    'background-image: -moz-linear-gradient(bottom, #F7F7F7 0%, #EFEFEF 100%);' +
                    /* Opera */
                    'background-image: -o-linear-gradient(bottom, #F7F7F7 0%, #EFEFEF 100%);' +
                    /* Webkit (Safari/Chrome 10) */
                    'background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0, #F7F7F7), color-stop(1, #EFEFEF));' +
                    /* Webkit (Chrome 11+) */
                    'background-image: -webkit-linear-gradient(bottom, #F7F7F7 0%, #EFEFEF 100%);' +
                    /* W3C Markup, IE10 Release Preview */
                    'background-image: linear-gradient(to top, #F7F7F7 0%, #EFEFEF 100%);');
            }
        },
        labelsAndLegend: function (hps) {
            var ids = [
                'heartland-card-number-label',
                'heartland-expiration-date-legend',
                'heartland-expiration-month-label',
                'heartland-expiration-year-label',
                'heartland-cvv-label'
            ];
            var length = ids.length;
            var i = 0;
            for (i; i < length; i++) {
                hps.setStyle(ids[i], 'font-size: 13px;' +
                    'text-transform: uppercase;' +
                    'font-weight: bold;' +
                    'display: block;' +
                    'width: 100%;' +
                    'clear: both;');
            }
        },
        selectLabels: function (hps) {
            var ids = ['heartland-expiration-month-label', 'heartland-expiration-year-label'];
            var length = ids.length;
            var i = 0;
            for (i; i < length; i++) {
                hps.setStyle(ids[i], 'position:absolute;' +
                    'width:1px;' +
                    'height:1px;' +
                    'padding:0;' +
                    'margin:-1px;' +
                    'overflow:hidden;' +
                    'clip:rect(0,0,0,0);' +
                    'border:0;');
            }
        },
        selects: function (hps) {
            var ids = ['heartland-expiration-month', 'heartland-expiration-year'];
            var length = ids.length;
            var i = 0;
            for (i; i < length; i++) {
                hps.appendStyle(ids[i], 'border: 0;' +
                    'outline: 1px solid #ccc;' +
                    'height: 28px;' +
                    'width: 80px;' +
                    '-webkit-appearance: none;' +
                    '-moz-appearance: none;' +
                    '-webkit-border-radius: 0px;' +
                    /* tslint:disable:max-line-length */
                    'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzA5MTZFN0RFMDY2MTFFNEIyODZFMURFRTA3REUxMjciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzA5MTZFN0VFMDY2MTFFNEIyODZFMURFRTA3REUxMjciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMDkxNkU3QkUwNjYxMUU0QjI4NkUxREVFMDdERTEyNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMDkxNkU3Q0UwNjYxMUU0QjI4NkUxREVFMDdERTEyNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvMrdUAAAABiSURBVHjaYkxLS3vNwMAgwoAfvGUCEjkMhEE285kzZ65u2bLlJ5DjgkNRxUwgYPz//z+Yl56ePhNIpaEpAqnJADGYkASzgHgnEn8HyEoYB24i1FReILUPynUEmvYFJgcQYACYah+uDhpKGAAAAABJRU5ErkJggg==);' +
                    /* tslint:enable:max-line-length */
                    'background-position: 65px 12px;' +
                    'background-repeat: no-repeat;' +
                    'background-color:  #F7F7F7;' +
                    'float: left;' +
                    'margin-right: 6px');
            }
        }
    };
})(Styles || (Styles = {}));

/**
 * @namespace Heartland.Frames
 */
var Frames = (function () {
    function Frames() {
    }
    /**
     * Heartland.Frames.configureIframe
     *
     * Prepares the pages iFrames for communication with the parent window.
     *
     * @param {Heartland.HPS} hps
     * @listens click
     * @listens message
     */
    Frames.configureIframe = function (hps) {
        var frame;
        var options = hps.options;
        var target;
        var useDefaultStyles = true;
        hps.Messages = hps.Messages || new Messages(hps);
        if (options.env === 'cert') {
            hps.iframe_url = urls.iframeCERT;
        }
        else {
            hps.iframe_url = urls.iframePROD;
        }
        if (options.fields !== defaults.fields) {
            Frames.makeFieldsAndLink(hps);
        }
        if (options.fields === defaults.fields && options.iframeTarget) {
            target = document.getElementById(options.iframeTarget);
            if (options.targetType === 'myframe') {
                frame = target;
                hps.iframe_url = frame.src;
            }
            else {
                frame = DOM.makeFrame('heartland-frame-securesubmit');
                target.appendChild(frame);
            }
            hps.iframe_url = hps.iframe_url + '#' + encodeURIComponent(document.location.href.split('#')[0]);
            frame.src = hps.iframe_url;
            hps.frames.child = {
                frame: window.postMessage ? frame.contentWindow : frame,
                name: 'child',
                url: hps.iframe_url
            };
        }
        if (options.useDefaultStyles === false) {
            useDefaultStyles = false;
        }
        if (options.buttonTarget) {
            hps.clickHandler = function (e) {
                e.preventDefault();
                hps.Messages.post({
                    accumulateData: !!hps.frames.cardNumber,
                    action: 'tokenize',
                    message: options.publicKey
                }, hps.frames.cardNumber ? 'cardNumber' : 'child');
                return false;
            };
            Events.addHandler(options.buttonTarget, 'click', hps.clickHandler);
        }
        hps.Messages.receive(function (data) {
            var fieldFrame;
            try {
                fieldFrame = hps.frames[data.source.name === 'heartland-frame-securesubmit' ? 'parent' : data.source.name];
            }
            catch (e) {
                return;
            }
            switch (data.action) {
                case 'requestTokenize':
                    hps.Messages.post({
                        accumulateData: !!hps.frames.cardNumber,
                        action: 'tokenize',
                        message: options.publicKey
                    }, hps.frames.cardNumber ? 'cardNumber' : 'child');
                    break;
                case 'onTokenSuccess':
                    options.onTokenSuccess(data.response);
                    break;
                case 'onTokenError':
                    options.onTokenError(data.response);
                    break;
                case 'resize':
                    if (fieldFrame) {
                        hps.resizeIFrame(fieldFrame.frame, data.height);
                    }
                    else {
                        hps.resizeIFrame(frame, data.height);
                    }
                    break;
                case 'receiveMessageHandlerAdded':
                    if (!options.fields && useDefaultStyles) {
                        Styles.Defaults.body(hps);
                        Styles.Defaults.labelsAndLegend(hps);
                        Styles.Defaults.inputsAndSelects(hps);
                        Styles.Defaults.fieldset(hps);
                        Styles.Defaults.selects(hps);
                        Styles.Defaults.selectLabels(hps);
                        Styles.Defaults.cvvContainer(hps);
                        Styles.Defaults.cvv(hps);
                    }
                    if (fieldFrame && fieldFrame.options.placeholder) {
                        hps.Messages.post({
                            action: 'setPlaceholder',
                            id: 'heartland-field',
                            text: fieldFrame.options.placeholder
                        }, fieldFrame.name);
                    }
                    if (options.style) {
                        var css = options.styleString
                            || (options.styleString = DOM.json2css(options.style));
                        hps.Messages.post({
                            action: 'addStylesheet',
                            data: css
                        }, fieldFrame.name);
                    }
                    Events.trigger('securesubmitIframeReady', document);
                    break;
                case 'accumulateData':
                    for (var i in hps.frames) {
                        if ('submit' === i || 'cardNumber' === i) {
                            continue;
                        }
                        var field = hps.frames[i];
                        hps.Messages.post({
                            action: 'getFieldData',
                            id: 'heartland-field'
                        }, field.name);
                    }
                    break;
                case 'passData':
                    var cardNumberFieldFrame = hps.frames.cardNumber;
                    if (!cardNumberFieldFrame) {
                        break;
                    }
                    hps.Messages.post({
                        action: 'setFieldData',
                        id: fieldFrame.name,
                        value: data.value
                    }, cardNumberFieldFrame.name);
                    break;
                case 'fieldEvent':
                    if (!options.onEvent) {
                        break;
                    }
                    options.onEvent(data.event);
                    break;
                case 'error':
                    if (!options.onError) {
                        break;
                    }
                    options.onError(data);
                    break;
            }
        }, '*');
        // monitorFieldEvents(hps, )
    };
    /**
     * Heartland.Frames.makeFieldsAndLink
     *
     * Creates a set of single field iFrames and stores a reference to
     * them in the parent window's state.
     *
     * @param {Heartland.HPS} hps
     */
    Frames.makeFieldsAndLink = function (hps) {
        var options = hps.options;
        var fieldsLength = fields.length;
        var baseUrl = hps.iframe_url.replace('index.html', '');
        for (var i = 0; i < fieldsLength; i++) {
            var field = fields[i];
            var fieldOptions = options.fields[field];
            if (!fieldOptions) {
                return;
            }
            var frame = DOM.makeFrame(field);
            var url = baseUrl;
            if (field === 'submit') {
                url = url + 'button.html';
            }
            else {
                url = url + 'field.html';
            }
            url = url + '#' + field + ':' + encodeURIComponent(document.location.href.split('#')[0]);
            frame.src = url;
            document
                .getElementById(fieldOptions.target)
                .appendChild(frame);
            hps.frames[field] = {
                frame: frame,
                name: field,
                options: fieldOptions,
                target: fieldOptions.target,
                targetNode: window.postMessage ? frame.contentWindow : frame,
                url: url
            };
        }
    };
    /**
     * Heartland.Frames.monitorFieldEvents
     *
     * @param {Heartland.HPS} hps
     * @param {string | EventTarget} target
     */
    Frames.monitorFieldEvents = function (hps, target) {
        var events = ['click', 'blur', 'focus', 'change', 'keypress', 'keydown', 'keyup'];
        var i = 0, length = events.length;
        for (i; i < length; i++) {
            var event = events[i];
            Events.addHandler(target, event, function (e) {
                var field = document.getElementById('heartland-field');
                var classes = [];
                var data = {};
                if (field.className !== '') {
                    classes = field.className.split(' ');
                }
                if (e.keyCode) {
                    data.keyCode = e.keyCode;
                }
                hps.Messages.post({
                    action: 'fieldEvent',
                    event: {
                        classes: classes,
                        data: data,
                        source: window.name,
                        type: e.type
                    }
                }, 'parent');
            });
        }
    };
    return Frames;
}());

/**
 * Heartland.HPS
 *
 * Initializes options and adds the default form handler if a `formId` is
 * passed as an option. This expects the default fields (see `getFields`) to
 * be present as children of `formId`.
 */
var HPS = (function () {
    /**
     * Heartland.HPS (constructor)
     *
     * @constructor
     * @param {Heartland.Options} options [optional]
     * @returns {Heartland.HPS}
     */
    function HPS(options) {
        if (!options && window.parent) {
            return;
        }
        this.options = Util.applyOptions(defaults, options);
        this.options = Util.getUrlByEnv(this.options);
        if (this.options.formId.length > 0) {
            Util.addFormHandler(this.options);
        }
        this.frames = {};
        if (this.options.type === 'iframe') {
            this.iframe_url = '';
            this.Messages = new Messages(this);
            this.mailbox = [];
            this.cacheBust = 1;
            Frames.configureIframe(this);
        }
        return this;
    }
    /**
     * Heartland.HPS.tokenize
     *
     * Tokenizes card data. Used in manual integrations where the merchant's
     * credit card fields cannot/do not match the names expected in the default
     * form handler (see `getFields`).
     *
     * @param {Heartland.Options} options [optional]
     */
    HPS.prototype.tokenize = function (options) {
        options = options || {};
        if (options) {
            this.options = Util.applyOptions(this.options, options);
            this.options = Util.getUrlByEnv(this.options);
        }
        if (this.options.type === 'iframe') {
            this.Messages.post({
                action: 'tokenize',
                message: this.options.publicKey
            }, 'child');
            return;
        }
        Ajax.call(this.options.type, this.options);
    };
    ;
    /**
     * Heartland.HPS.configureInternalIframe
     *
     * Sets up a child iframe window to prepare it for communication with the
     * parent and for tokenization.
     *
     * @param {Heartland.Options} options
     */
    HPS.prototype.configureInternalIframe = function (options) {
        this.Messages = new Messages(this);
        this.parent = window.parent;
        this.frames = this.frames || {};
        this.frames.parent = {
            frame: window.parent,
            name: 'parent',
            url: decodeURIComponent(document.location.hash.replace(/^#/, ''))
        };
        this.loadHandler = (function (hps) {
            return function () {
                DOM.resizeFrame(hps);
            };
        }(this));
        this.receiveMessageHandlerAddedHandler = (function (hps) {
            return function () {
                hps.Messages.post({ action: 'receiveMessageHandlerAdded' }, 'parent');
            };
        }(this));
        Events.addHandler(window, 'load', this.loadHandler);
        Events.addHandler(document, 'receiveMessageHandlerAdded', this.receiveMessageHandlerAddedHandler);
        this.Messages.receive(Events.frameHandleWith(this), '*');
    };
    ;
    /**
     * Heartland.HPS.configureButtonFieldIframe
     *
     * Same as `Heartland.HPS.configureFieldIframe` excet the added click event
     * handler for the button.
     *
     * @param {Heartland.Options} options
     */
    HPS.prototype.configureButtonFieldIframe = function (options) {
        this.configureFieldIframe(options);
        Events.addHandler('heartland-field', 'click', (function (hps) {
            return function (e) {
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                hps.Messages.post({ action: 'requestTokenize' }, 'parent');
            };
        }(this)));
    };
    /**
     * Heartland.HPS.configureFieldIframe
     *
     * Sets up a child iframe window to prepare it for communication with the
     * parent and for tokenization.
     *
     * @param {Heartland.Options} options
     */
    HPS.prototype.configureFieldIframe = function (options) {
        var hash = document.location.hash.replace(/^#/, '');
        var split = hash.split(':');
        this.Messages = new Messages(this);
        this.field = split.shift();
        this.parent = window.parent;
        this.frames = this.frames || {};
        this.frames.parent = {
            frame: window.parent,
            name: 'parent',
            url: decodeURIComponent(split.join(':').replace(/^:/, ''))
        };
        window.onerror = (function (hps) {
            return function (errorMsg, url, lineNumber, column, errorObj) {
                hps.Messages.post({
                    action: 'error',
                    data: {
                        column: column,
                        errorMsg: errorMsg,
                        lineNumber: lineNumber,
                        url: url
                    }
                }, 'parent');
                return true;
            };
        }(this));
        this.loadHandler = (function (hps) {
            return function () {
                DOM.resizeFrame(hps);
                DOM.configureField(hps);
                var method = 'attach' + window.name.replace('card', '') + 'Events';
                if (Card[method]) {
                    Card[method]('#heartland-field');
                }
            };
        }(this));
        this.receiveMessageHandlerAddedHandler = (function (hps) {
            return function () {
                hps.Messages.post({ action: 'receiveMessageHandlerAdded' }, 'parent');
            };
        }(this));
        Events.addHandler(window, 'load', this.loadHandler);
        Events.addHandler(document, 'receiveMessageHandlerAdded', this.receiveMessageHandlerAddedHandler);
        Frames.monitorFieldEvents(this, 'heartland-field');
        this.Messages.receive(Events.frameHandleWith(this), '*');
    };
    ;
    /**
     * Heartland.HPS.resizeIFrame
     *
     * Called automatically when the child iframe window alerts the parent to
     * resize.
     *
     * @param {HTMLIFrameElement} frame
     * @param {string} height
     */
    HPS.prototype.resizeIFrame = function (frame, height) {
        if (!frame) {
            return;
        }
        frame.style.height = (parseInt(height, 10)) + 'px';
    };
    ;
    /**
     * Heartland.HPS.setText
     *
     * Public API for setting an element's inner text.
     *
     * @param {string} elementid
     * @param {string} elementtext
     */
    HPS.prototype.setText = function (elementid, elementtext) {
        this.Messages.post({ action: 'setText', id: elementid, text: elementtext }, 'child');
    };
    ;
    /**
     * Heartland.HPS.setStyle
     *
     * Public API for setting an element's style.
     *
     * @param {string} elementid
     * @param {string} elementstyle
     */
    HPS.prototype.setStyle = function (elementid, elementstyle) {
        this.Messages.post({ action: 'setStyle', id: elementid, style: elementstyle }, 'child');
    };
    ;
    /**
     * Heartland.HPS.appendStyle
     *
     * Public API for appending to an element's style.
     *
     * @param {string} elementid
     * @param {string} elementstyle
     */
    HPS.prototype.appendStyle = function (elementid, elementstyle) {
        this.Messages.post({ action: 'appendStyle', id: elementid, style: elementstyle }, 'child');
    };
    ;
    /**
     * Heartland.HPS.setFocus
     *
     * Public API for appending to an element's style.
     *
     * @param {string} elementid
     */
    HPS.prototype.setFocus = function (elementid) {
        this.Messages.post({ action: 'setFocus' }, elementid);
    };
    ;
    /**
     * Heartland.HPS.dispose
     *
     * Removes all iframes and event listeners from the DOM.
     */
    HPS.prototype.dispose = function () {
        this.Messages.dispose();
        this.Messages = null;
        if (this.frames.cardNumber && this.frames.cardNumber.targetNode) {
            this.frames.cardNumber.frame.remove();
        }
        if (this.frames.cardExpiration && this.frames.cardExpiration.frame) {
            this.frames.cardExpiration.frame.remove();
        }
        if (this.frames.cardCvv && this.frames.cardCvv.frame) {
            this.frames.cardCvv.frame.remove();
        }
        if (this.frames.child && this.frames.child.frame) {
            this.frames.child.frame.remove();
        }
        if (this.clickHandler) {
            Events.removeHandler(this.options.buttonTarget, 'click', this.clickHandler);
        }
        if (this.loadHandler) {
            Events.removeHandler(window, 'load', this.loadHandler);
        }
        if (this.receiveMessageHandlerAddedHandler) {
            Events.removeHandler(document, 'receiveMessageHandlerAdded', this.receiveMessageHandlerAddedHandler);
        }
    };
    ;
    return HPS;
}());

var Validator = {
    CardNumber: CardNumber$1,
    Cvv: Cvv,
    Expiration: Expiration$1
};

var index = {
    Ajax: Ajax,
    Card: Card,
    DOM: DOM,
    Events: Events,
    Formatter: Formatter,
    Frames: Frames,
    HPS: HPS,
    Messages: Messages,
    Styles: Styles,
    Util: Util,
    Validator: Validator
};

return index;

}());
//# sourceMappingURL=securesubmit.js.map
