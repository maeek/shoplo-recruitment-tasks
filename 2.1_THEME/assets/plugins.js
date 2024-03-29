// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function() {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/* Event bus */
(function(root, factory) {
    if (typeof exports === "object" && typeof module === "object")
        module.exports = factory();
    else if (typeof define === "function" && define.amd)
        define("EventBus", [], factory);
    else if (typeof exports === "object")
        exports["EventBus"] = factory();
    else
        root["EventBus"] = factory()
})(this, function() {
    var EventBusClass = {};
    EventBusClass = function() {
        this.listeners = {}
    };
    EventBusClass.prototype = {
        addEventListener: function(type, callback, scope) {
            var args = [];
            var numOfArgs = arguments.length;
            for (var i = 0; i < numOfArgs; i++) {
                args.push(arguments[i])
            }
            args = args.length > 3 ? args.splice(3, args.length - 1) : [];
            if (typeof this.listeners[type] != "undefined") {
                this.listeners[type].push({
                    scope: scope,
                    callback: callback,
                    args: args
                })
            } else {
                this.listeners[type] = [{
                    scope: scope,
                    callback: callback,
                    args: args
                }]
            }
        },
        removeEventListener: function(type, callback, scope) {
            if (typeof this.listeners[type] != "undefined") {
                var numOfCallbacks = this.listeners[type].length;
                var newArray = [];
                for (var i = 0; i < numOfCallbacks; i++) {
                    var listener = this.listeners[type][i];
                    if (listener.scope == scope && listener.callback == callback) {} else {
                        newArray.push(listener)
                    }
                }
                this.listeners[type] = newArray
            }
        },
        hasEventListener: function(type, callback, scope) {
            if (typeof this.listeners[type] != "undefined") {
                var numOfCallbacks = this.listeners[type].length;
                if (callback === undefined && scope === undefined) {
                    return numOfCallbacks > 0
                }
                for (var i = 0; i < numOfCallbacks; i++) {
                    var listener = this.listeners[type][i];
                    if ((scope ? listener.scope == scope : true) && listener.callback == callback) {
                        return true
                    }
                }
            }
            return false
        },
        dispatch: function(type, target) {
            var event = {
                type: type,
                target: target
            };
            var args = [];
            var numOfArgs = arguments.length;
            for (var i = 0; i < numOfArgs; i++) {
                args.push(arguments[i])
            }
            args = args.length > 2 ? args.splice(2, args.length - 1) : [];
            args = [event].concat(args);
            if (typeof this.listeners[type] != "undefined") {
                var listeners = this.listeners[type].slice();
                var numOfCallbacks = listeners.length;
                for (var i = 0; i < numOfCallbacks; i++) {
                    var listener = listeners[i];
                    if (listener && listener.callback) {
                        var concatArgs = args.concat(listener.args);
                        listener.callback.apply(listener.scope, concatArgs)
                    }
                }
            }
        },
        getEvents: function() {
            var str = "";
            for (var type in this.listeners) {
                var numOfCallbacks = this.listeners[type].length;
                for (var i = 0; i < numOfCallbacks; i++) {
                    var listener = this.listeners[type][i];
                    str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
                    str += " listen for '" + type + "'\n"
                }
            }
            return str
        }
    };
    var EventBus = new EventBusClass;
    return EventBus
});
/*!
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

! function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}(this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
            if (t && e) {
                var i = this._events = this._events || {},
                    n = i[t] = i[t] || [];
                return -1 == n.indexOf(e) && n.push(e),
                    this
            }
        },
        e.once = function(t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {},
                    n = i[t] = i[t] || [];
                return n[e] = !0,
                    this
            }
        },
        e.off = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1),
                    this
            }
        },
        e.emitEvent = function(t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = 0,
                    o = i[n];
                e = e || [];
                for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                    var s = r && r[o];
                    s && (this.off(t, o),
                            delete r[o]),
                        o.apply(this, e),
                        n += s ? 0 : 1,
                        o = i[n]
                }
                return this
            }
        },
        t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}(window, function(t, e) {
    function i(t, e) {
        for (var i in e)
            t[i] = e[i];
        return t
    }

    function n(t) {
        var e = [];
        if (Array.isArray(t))
            e = t;
        else if ("number" == typeof t.length)
            for (var i = 0; i < t.length; i++)
                e.push(t[i]);
        else
            e.push(t);
        return e
    }

    function o(t, e, r) {
        return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)),
            this.elements = n(t),
            this.options = i({}, this.options),
            "function" == typeof e ? r = e : i(this.options, e),
            r && this.on("always", r),
            this.getImages(),
            h && (this.jqDeferred = new h.Deferred),
            void setTimeout(function() {
                    this.check()
                }
                .bind(this))) : new o(t, e, r)
    }

    function r(t) {
        this.img = t
    }

    function s(t, e) {
        this.url = t,
            this.element = e,
            this.img = new Image
    }
    var h = t.jQuery,
        a = t.console;
    o.prototype = Object.create(e.prototype),
        o.prototype.options = {},
        o.prototype.getImages = function() {
            this.images = [],
                this.elements.forEach(this.addElementImages, this)
        },
        o.prototype.addElementImages = function(t) {
            "IMG" == t.nodeName && this.addImage(t),
                this.options.background === !0 && this.addElementBackgroundImages(t);
            var e = t.nodeType;
            if (e && d[e]) {
                for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var o = i[n];
                    this.addImage(o)
                }
                if ("string" == typeof this.options.background) {
                    var r = t.querySelectorAll(this.options.background);
                    for (n = 0; n < r.length; n++) {
                        var s = r[n];
                        this.addElementBackgroundImages(s)
                    }
                }
            }
        };
    var d = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(t) {
            var e = getComputedStyle(t);
            if (e)
                for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                    var o = n && n[2];
                    o && this.addBackground(o, t),
                        n = i.exec(e.backgroundImage)
                }
        },
        o.prototype.addImage = function(t) {
            var e = new r(t);
            this.images.push(e)
        },
        o.prototype.addBackground = function(t, e) {
            var i = new s(t, e);
            this.images.push(i)
        },
        o.prototype.check = function() {
            function t(t, i, n) {
                setTimeout(function() {
                    e.progress(t, i, n)
                })
            }
            var e = this;
            return this.progressedCount = 0,
                this.hasAnyBroken = !1,
                this.images.length ? void this.images.forEach(function(e) {
                    e.once("progress", t),
                        e.check()
                }) : void this.complete()
        },
        o.prototype.progress = function(t, e, i) {
            this.progressedCount++,
                this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded,
                this.emitEvent("progress", [this, t, e]),
                this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
                this.progressedCount == this.images.length && this.complete(),
                this.options.debug && a && a.log("progress: " + i, t, e)
        },
        o.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0,
                this.emitEvent(t, [this]),
                this.emitEvent("always", [this]),
                this.jqDeferred) {
                var e = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[e](this)
            }
        },
        r.prototype = Object.create(e.prototype),
        r.prototype.check = function() {
            var t = this.getIsImageComplete();
            return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image,
                this.proxyImage.addEventListener("load", this),
                this.proxyImage.addEventListener("error", this),
                this.img.addEventListener("load", this),
                this.img.addEventListener("error", this),
                void(this.proxyImage.src = this.img.src))
        },
        r.prototype.getIsImageComplete = function() {
            return this.img.complete && void 0 !== this.img.naturalWidth
        },
        r.prototype.confirm = function(t, e) {
            this.isLoaded = t,
                this.emitEvent("progress", [this, this.img, e])
        },
        r.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        },
        r.prototype.onload = function() {
            this.confirm(!0, "onload"),
                this.unbindEvents()
        },
        r.prototype.onerror = function() {
            this.confirm(!1, "onerror"),
                this.unbindEvents()
        },
        r.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this),
                this.proxyImage.removeEventListener("error", this),
                this.img.removeEventListener("load", this),
                this.img.removeEventListener("error", this)
        },
        s.prototype = Object.create(r.prototype),
        s.prototype.check = function() {
            this.img.addEventListener("load", this),
                this.img.addEventListener("error", this),
                this.img.src = this.url;
            var t = this.getIsImageComplete();
            t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
                this.unbindEvents())
        },
        s.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this),
                this.img.removeEventListener("error", this)
        },
        s.prototype.confirm = function(t, e) {
            this.isLoaded = t,
                this.emitEvent("progress", [this, this.element, e])
        },
        o.makeJQueryPlugin = function(e) {
            e = e || t.jQuery,
                e && (h = e,
                    h.fn.imagesLoaded = function(t, e) {
                        var i = new o(this, t, e);
                        return i.jqDeferred.promise(h(this))
                    }
                )
        },
        o.makeJQueryPlugin(),
        o
});

! function(a) {
    "use strict";
    var d, b = a.Base64,
        c = "2.1.9";
    if ("undefined" != typeof module && module.exports)
        try {
            d = require("buffer").Buffer
        } catch (a) {}
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        f = function(a) {
            for (var b = {}, c = 0, d = a.length; c < d; c++)
                b[a.charAt(c)] = c;
            return b
        }(e),
        g = String.fromCharCode,
        h = function(a) {
            if (a.length < 2) {
                var b = a.charCodeAt(0);
                return b < 128 ? a : b < 2048 ? g(192 | b >>> 6) + g(128 | 63 & b) : g(224 | b >>> 12 & 15) + g(128 | b >>> 6 & 63) + g(128 | 63 & b)
            }
            var b = 65536 + 1024 * (a.charCodeAt(0) - 55296) + (a.charCodeAt(1) - 56320);
            return g(240 | b >>> 18 & 7) + g(128 | b >>> 12 & 63) + g(128 | b >>> 6 & 63) + g(128 | 63 & b)
        },
        i = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
        j = function(a) {
            return a.replace(i, h)
        },
        k = function(a) {
            var b = [0, 2, 1][a.length % 3],
                c = a.charCodeAt(0) << 16 | (a.length > 1 ? a.charCodeAt(1) : 0) << 8 | (a.length > 2 ? a.charCodeAt(2) : 0),
                d = [e.charAt(c >>> 18), e.charAt(c >>> 12 & 63), b >= 2 ? "=" : e.charAt(c >>> 6 & 63), b >= 1 ? "=" : e.charAt(63 & c)];
            return d.join("")
        },
        l = a.btoa ? function(b) {
            return a.btoa(b)
        } :
        function(a) {
            return a.replace(/[\s\S]{1,3}/g, k)
        },
        m = d ? function(a) {
            return (a.constructor === d.constructor ? a : new d(a)).toString("base64")
        } :
        function(a) {
            return l(j(a))
        },
        n = function(a, b) {
            return b ? m(String(a)).replace(/[+\/]/g, function(a) {
                return "+" == a ? "-" : "_"
            }).replace(/=/g, "") : m(String(a))
        },
        o = function(a) {
            return n(a, !0)
        },
        p = new RegExp(["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"), "g"),
        q = function(a) {
            switch (a.length) {
                case 4:
                    var b = (7 & a.charCodeAt(0)) << 18 | (63 & a.charCodeAt(1)) << 12 | (63 & a.charCodeAt(2)) << 6 | 63 & a.charCodeAt(3),
                        c = b - 65536;
                    return g((c >>> 10) + 55296) + g((1023 & c) + 56320);
                case 3:
                    return g((15 & a.charCodeAt(0)) << 12 | (63 & a.charCodeAt(1)) << 6 | 63 & a.charCodeAt(2));
                default:
                    return g((31 & a.charCodeAt(0)) << 6 | 63 & a.charCodeAt(1))
            }
        },
        r = function(a) {
            return a.replace(p, q)
        },
        s = function(a) {
            var b = a.length,
                c = b % 4,
                d = (b > 0 ? f[a.charAt(0)] << 18 : 0) | (b > 1 ? f[a.charAt(1)] << 12 : 0) | (b > 2 ? f[a.charAt(2)] << 6 : 0) | (b > 3 ? f[a.charAt(3)] : 0),
                e = [g(d >>> 16), g(d >>> 8 & 255), g(255 & d)];
            return e.length -= [0, 0, 2, 1][c],
                e.join("")
        },
        t = a.atob ? function(b) {
            return a.atob(b)
        } :
        function(a) {
            return a.replace(/[\s\S]{1,4}/g, s)
        },
        u = d ? function(a) {
            return (a.constructor === d.constructor ? a : new d(a, "base64")).toString()
        } :
        function(a) {
            return r(t(a))
        },
        v = function(a) {
            return u(String(a).replace(/[-_]/g, function(a) {
                return "-" == a ? "+" : "/"
            }).replace(/[^A-Za-z0-9\+\/]/g, ""))
        },
        w = function() {
            var c = a.Base64;
            return a.Base64 = b,
                c
        };
    if (a.Base64 = {
            VERSION: c,
            atob: t,
            btoa: l,
            fromBase64: v,
            toBase64: n,
            utob: j,
            encode: n,
            encodeURI: o,
            btou: r,
            decode: v,
            noConflict: w
        },
        "function" == typeof Object.defineProperty) {
        var x = function(a) {
            return {
                value: a,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        };
        a.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", x(function() {
                    return v(this)
                })),
                Object.defineProperty(String.prototype, "toBase64", x(function(a) {
                    return n(this, a)
                })),
                Object.defineProperty(String.prototype, "toBase64URI", x(function() {
                    return n(this, !0)
                }))
        }
    }
    a.Meteor && (Base64 = a.Base64)
}(this),
$(function() {
    if ("undefined" != typeof Shop)
        var a = Shop.url;
    else
        var a = "";
    var b = location.hostname,
        c = "https://www.shoplo.com/s/t?p=",
        d = "u=" + a + "&h=" + b,
        e = (new Date).getHours();
    d = encodeURI(d),
        d = Base64.encode(d),
        e >= 0 && e < 6 && $("body").append('<img src="' + c + d + '" style="display: none; visibility: hidden;" />')
});

/*
   _ _      _       _
___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                 |__/
Version: 1.9.0
Author: Ken Wheeler
Website: http://kenwheeler.github.io
  Docs: http://kenwheeler.github.io/slick
  Repo: http://github.com/kenwheeler/slick
Issues: http://github.com/kenwheeler/slick/issues
*/
(function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
})(function(i) {
    "use strict";
    var e = window.Slick || {};
    e = function() {
            function e(e, o) {
                var s, n = this;
                n.defaults = {
                        accessibility: !0,
                        adaptiveHeight: !1,
                        appendArrows: i(e),
                        appendDots: i(e),
                        arrows: !0,
                        asNavFor: null,
                        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(e, t) {
                            return i('<button type="button" />').text(t + 1)
                        },
                        dots: !1,
                        dotsClass: "slick-dots",
                        draggable: !0,
                        easing: "linear",
                        edgeFriction: .35,
                        fade: !1,
                        focusOnSelect: !1,
                        focusOnChange: !1,
                        infinite: !0,
                        initialSlide: 0,
                        lazyLoad: "ondemand",
                        mobileFirst: !1,
                        pauseOnHover: !0,
                        pauseOnFocus: !0,
                        pauseOnDotsHover: !1,
                        respondTo: "window",
                        responsive: null,
                        rows: 1,
                        rtl: !1,
                        slide: "",
                        slidesPerRow: 1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: !0,
                        swipeToSlide: !1,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        useTransform: !0,
                        variableWidth: !1,
                        vertical: !1,
                        verticalSwiping: !1,
                        waitForAnimate: !0,
                        zIndex: 1e3
                    },
                    n.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        scrolling: !1,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        swiping: !1,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1
                    },
                    i.extend(n, n.initials),
                    n.activeBreakpoint = null,
                    n.animType = null,
                    n.animProp = null,
                    n.breakpoints = [],
                    n.breakpointSettings = [],
                    n.cssTransitions = !1,
                    n.focussed = !1,
                    n.interrupted = !1,
                    n.hidden = "hidden",
                    n.paused = !0,
                    n.positionProp = null,
                    n.respondTo = null,
                    n.rowCount = 1,
                    n.shouldClick = !0,
                    n.$slider = i(e),
                    n.$slidesCache = null,
                    n.transformType = null,
                    n.transitionType = null,
                    n.visibilityChange = "visibilitychange",
                    n.windowWidth = 0,
                    n.windowTimer = null,
                    s = i(e).data("slick") || {},
                    n.options = i.extend({}, n.defaults, o, s),
                    n.currentSlide = n.options.initialSlide,
                    n.originalSettings = n.options,
                    "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden",
                        n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden",
                        n.visibilityChange = "webkitvisibilitychange"),
                    n.autoPlay = i.proxy(n.autoPlay, n),
                    n.autoPlayClear = i.proxy(n.autoPlayClear, n),
                    n.autoPlayIterator = i.proxy(n.autoPlayIterator, n),
                    n.changeSlide = i.proxy(n.changeSlide, n),
                    n.clickHandler = i.proxy(n.clickHandler, n),
                    n.selectHandler = i.proxy(n.selectHandler, n),
                    n.setPosition = i.proxy(n.setPosition, n),
                    n.swipeHandler = i.proxy(n.swipeHandler, n),
                    n.dragHandler = i.proxy(n.dragHandler, n),
                    n.keyHandler = i.proxy(n.keyHandler, n),
                    n.instanceUid = t++,
                    n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
                    n.registerBreakpoints(),
                    n.init(!0)
            }
            var t = 0;
            return e
        }(),
        e.prototype.activateADA = function() {
            var i = this;
            i.$slideTrack.find(".slick-active").attr({
                "aria-hidden": "false"
            }).find("a, input, button, select").attr({
                tabindex: "0"
            })
        },
        e.prototype.addSlide = e.prototype.slickAdd = function(e, t, o) {
            var s = this;
            if ("boolean" == typeof t)
                o = t,
                t = null;
            else if (t < 0 || t >= s.slideCount)
                return !1;
            s.unload(),
                "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : o === !0 ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack),
                s.$slides = s.$slideTrack.children(this.options.slide),
                s.$slideTrack.children(this.options.slide).detach(),
                s.$slideTrack.append(s.$slides),
                s.$slides.each(function(e, t) {
                    i(t).attr("data-slick-index", e)
                }),
                s.$slidesCache = s.$slides,
                s.reinit()
        },
        e.prototype.animateHeight = function() {
            var i = this;
            if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.animate({
                    height: e
                }, i.options.speed)
            }
        },
        e.prototype.animateSlide = function(e, t) {
            var o = {},
                s = this;
            s.animateHeight(),
                s.options.rtl === !0 && s.options.vertical === !1 && (e = -e),
                s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({
                    left: e
                }, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({
                    top: e
                }, s.options.speed, s.options.easing, t) : s.cssTransitions === !1 ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft),
                    i({
                        animStart: s.currentLeft
                    }).animate({
                        animStart: e
                    }, {
                        duration: s.options.speed,
                        easing: s.options.easing,
                        step: function(i) {
                            i = Math.ceil(i),
                                s.options.vertical === !1 ? (o[s.animType] = "translate(" + i + "px, 0px)",
                                    s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)",
                                    s.$slideTrack.css(o))
                        },
                        complete: function() {
                            t && t.call()
                        }
                    })) : (s.applyTransition(),
                    e = Math.ceil(e),
                    s.options.vertical === !1 ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)",
                    s.$slideTrack.css(o),
                    t && setTimeout(function() {
                        s.disableTransition(),
                            t.call()
                    }, s.options.speed))
        },
        e.prototype.getNavTarget = function() {
            var e = this,
                t = e.options.asNavFor;
            return t && null !== t && (t = i(t).not(e.$slider)),
                t
        },
        e.prototype.asNavFor = function(e) {
            var t = this,
                o = t.getNavTarget();
            null !== o && "object" == typeof o && o.each(function() {
                var t = i(this).slick("getSlick");
                t.unslicked || t.slideHandler(e, !0)
            })
        },
        e.prototype.applyTransition = function(i) {
            var e = this,
                t = {};
            e.options.fade === !1 ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
                e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
        },
        e.prototype.autoPlay = function() {
            var i = this;
            i.autoPlayClear(),
                i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
        },
        e.prototype.autoPlayClear = function() {
            var i = this;
            i.autoPlayTimer && clearInterval(i.autoPlayTimer)
        },
        e.prototype.autoPlayIterator = function() {
            var i = this,
                e = i.currentSlide + i.options.slidesToScroll;
            i.paused || i.interrupted || i.focussed || (i.options.infinite === !1 && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll,
                    i.currentSlide - 1 === 0 && (i.direction = 1))),
                i.slideHandler(e))
        },
        e.prototype.buildArrows = function() {
            var e = this;
            e.options.arrows === !0 && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"),
                e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"),
                e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                    e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                    e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows),
                    e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows),
                    e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                    "aria-disabled": "true",
                    tabindex: "-1"
                }))
        },
        e.prototype.buildDots = function() {
            var e, t, o = this;
            if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
                for (o.$slider.addClass("slick-dotted"),
                    t = i("<ul />").addClass(o.options.dotsClass),
                    e = 0; e <= o.getDotCount(); e += 1)
                    t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
                o.$dots = t.appendTo(o.options.appendDots),
                    o.$dots.find("li").first().addClass("slick-active")
            }
        },
        e.prototype.buildOut = function() {
            var e = this;
            e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
                e.slideCount = e.$slides.length,
                e.$slides.each(function(e, t) {
                    i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
                }),
                e.$slider.addClass("slick-slider"),
                e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(),
                e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(),
                e.$slideTrack.css("opacity", 0),
                e.options.centerMode !== !0 && e.options.swipeToSlide !== !0 || (e.options.slidesToScroll = 1),
                i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
                e.setupInfinite(),
                e.buildArrows(),
                e.buildDots(),
                e.updateDots(),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                e.options.draggable === !0 && e.$list.addClass("draggable")
        },
        e.prototype.buildRows = function() {
            var i, e, t, o, s, n, r, l = this;
            if (o = document.createDocumentFragment(),
                n = l.$slider.children(),
                l.options.rows > 0) {
                for (r = l.options.slidesPerRow * l.options.rows,
                    s = Math.ceil(n.length / r),
                    i = 0; i < s; i++) {
                    var d = document.createElement("div");
                    for (e = 0; e < l.options.rows; e++) {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.slidesPerRow; t++) {
                            var c = i * r + (e * l.options.slidesPerRow + t);
                            n.get(c) && a.appendChild(n.get(c))
                        }
                        d.appendChild(a)
                    }
                    o.appendChild(d)
                }
                l.$slider.empty().append(o),
                    l.$slider.children().children().children().css({
                        width: 100 / l.options.slidesPerRow + "%",
                        display: "inline-block"
                    })
            }
        },
        e.prototype.checkResponsive = function(e, t) {
            var o, s, n, r = this,
                l = !1,
                d = r.$slider.width(),
                a = window.innerWidth || i(window).width();
            if ("window" === r.respondTo ? n = a : "slider" === r.respondTo ? n = d : "min" === r.respondTo && (n = Math.min(a, d)),
                r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
                s = null;
                for (o in r.breakpoints)
                    r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
                null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s,
                        "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
                            e === !0 && (r.currentSlide = r.options.initialSlide),
                            r.refresh(e)),
                        l = s) : (r.activeBreakpoint = s,
                        "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]),
                            e === !0 && (r.currentSlide = r.options.initialSlide),
                            r.refresh(e)),
                        l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null,
                        r.options = r.originalSettings,
                        e === !0 && (r.currentSlide = r.options.initialSlide),
                        r.refresh(e),
                        l = s),
                    e || l === !1 || r.$slider.trigger("breakpoint", [r, l])
            }
        },
        e.prototype.changeSlide = function(e, t) {
            var o, s, n, r = this,
                l = i(e.currentTarget);
            switch (l.is("a") && e.preventDefault(),
                l.is("li") || (l = l.closest("li")),
                n = r.slideCount % r.options.slidesToScroll !== 0,
                o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll,
                e.data.message) {
                case "previous":
                    s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o,
                        r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                    break;
                case "next":
                    s = 0 === o ? r.options.slidesToScroll : o,
                        r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                    break;
                case "index":
                    var d = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                    r.slideHandler(r.checkNavigable(d), !1, t),
                        l.children().trigger("focus");
                    break;
                default:
                    return
            }
        },
        e.prototype.checkNavigable = function(i) {
            var e, t, o = this;
            if (e = o.getNavigableIndexes(),
                t = 0,
                i > e[e.length - 1])
                i = e[e.length - 1];
            else
                for (var s in e) {
                    if (i < e[s]) {
                        i = t;
                        break
                    }
                    t = e[s]
                }
            return i
        },
        e.prototype.cleanUpEvents = function() {
            var e = this;
            e.options.dots && null !== e.$dots && (i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
                    e.options.accessibility === !0 && e.$dots.off("keydown.slick", e.keyHandler)),
                e.$slider.off("focus.slick blur.slick"),
                e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
                    e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
                    e.options.accessibility === !0 && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
                        e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
                e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
                e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
                e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
                e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
                e.$list.off("click.slick", e.clickHandler),
                i(document).off(e.visibilityChange, e.visibility),
                e.cleanUpSlideEvents(),
                e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler),
                e.options.focusOnSelect === !0 && i(e.$slideTrack).children().off("click.slick", e.selectHandler),
                i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange),
                i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
                i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault),
                i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
        },
        e.prototype.cleanUpSlideEvents = function() {
            var e = this;
            e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
                e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
        },
        e.prototype.cleanUpRows = function() {
            var i, e = this;
            e.options.rows > 0 && (i = e.$slides.children().children(),
                i.removeAttr("style"),
                e.$slider.empty().append(i))
        },
        e.prototype.clickHandler = function(i) {
            var e = this;
            e.shouldClick === !1 && (i.stopImmediatePropagation(),
                i.stopPropagation(),
                i.preventDefault())
        },
        e.prototype.destroy = function(e) {
            var t = this;
            t.autoPlayClear(),
                t.touchObject = {},
                t.cleanUpEvents(),
                i(".slick-cloned", t.$slider).detach(),
                t.$dots && t.$dots.remove(),
                t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
                    t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
                t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""),
                    t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
                t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
                        i(this).attr("style", i(this).data("originalStyling"))
                    }),
                    t.$slideTrack.children(this.options.slide).detach(),
                    t.$slideTrack.detach(),
                    t.$list.detach(),
                    t.$slider.append(t.$slides)),
                t.cleanUpRows(),
                t.$slider.removeClass("slick-slider"),
                t.$slider.removeClass("slick-initialized"),
                t.$slider.removeClass("slick-dotted"),
                t.unslicked = !0,
                e || t.$slider.trigger("destroy", [t])
        },
        e.prototype.disableTransition = function(i) {
            var e = this,
                t = {};
            t[e.transitionType] = "",
                e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
        },
        e.prototype.fadeSlide = function(i, e) {
            var t = this;
            t.cssTransitions === !1 ? (t.$slides.eq(i).css({
                    zIndex: t.options.zIndex
                }),
                t.$slides.eq(i).animate({
                    opacity: 1
                }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i),
                t.$slides.eq(i).css({
                    opacity: 1,
                    zIndex: t.options.zIndex
                }),
                e && setTimeout(function() {
                    t.disableTransition(i),
                        e.call()
                }, t.options.speed))
        },
        e.prototype.fadeSlideOut = function(i) {
            var e = this;
            e.cssTransitions === !1 ? e.$slides.eq(i).animate({
                opacity: 0,
                zIndex: e.options.zIndex - 2
            }, e.options.speed, e.options.easing) : (e.applyTransition(i),
                e.$slides.eq(i).css({
                    opacity: 0,
                    zIndex: e.options.zIndex - 2
                }))
        },
        e.prototype.filterSlides = e.prototype.slickFilter = function(i) {
            var e = this;
            null !== i && (e.$slidesCache = e.$slides,
                e.unload(),
                e.$slideTrack.children(this.options.slide).detach(),
                e.$slidesCache.filter(i).appendTo(e.$slideTrack),
                e.reinit())
        },
        e.prototype.focusHandler = function() {
            var e = this;
            e.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(t) {
                var o = i(this);
                setTimeout(function() {
                    e.options.pauseOnFocus && o.is(":focus") && (e.focussed = !0,
                        e.autoPlay())
                }, 0)
            }).on("blur.slick", "*", function(t) {
                i(this);
                e.options.pauseOnFocus && (e.focussed = !1,
                    e.autoPlay())
            })
        },
        e.prototype.getCurrent = e.prototype.slickCurrentSlide = function() {
            var i = this;
            return i.currentSlide
        },
        e.prototype.getDotCount = function() {
            var i = this,
                e = 0,
                t = 0,
                o = 0;
            if (i.options.infinite === !0)
                if (i.slideCount <= i.options.slidesToShow)
                    ++o;
                else
                    for (; e < i.slideCount;)
                        ++o,
                        e = t + i.options.slidesToScroll,
                        t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            else if (i.options.centerMode === !0)
                o = i.slideCount;
            else if (i.options.asNavFor)
                for (; e < i.slideCount;)
                    ++o,
                    e = t + i.options.slidesToScroll,
                    t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
            else
                o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
            return o - 1
        },
        e.prototype.getLeft = function(i) {
            var e, t, o, s, n = this,
                r = 0;
            return n.slideOffset = 0,
                t = n.$slides.first().outerHeight(!0),
                n.options.infinite === !0 ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1,
                        s = -1,
                        n.options.vertical === !0 && n.options.centerMode === !0 && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)),
                        r = t * n.options.slidesToShow * s),
                    n.slideCount % n.options.slidesToScroll !== 0 && i + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (i > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (i - n.slideCount)) * n.slideWidth * -1,
                        r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1,
                        r = n.slideCount % n.options.slidesToScroll * t * -1))) : i + n.options.slidesToShow > n.slideCount && (n.slideOffset = (i + n.options.slidesToShow - n.slideCount) * n.slideWidth,
                    r = (i + n.options.slidesToShow - n.slideCount) * t),
                n.slideCount <= n.options.slidesToShow && (n.slideOffset = 0,
                    r = 0),
                n.options.centerMode === !0 && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : n.options.centerMode === !0 && n.options.infinite === !0 ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : n.options.centerMode === !0 && (n.slideOffset = 0,
                    n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
                e = n.options.vertical === !1 ? i * n.slideWidth * -1 + n.slideOffset : i * t * -1 + r,
                n.options.variableWidth === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow),
                    e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0,
                    n.options.centerMode === !0 && (o = n.slideCount <= n.options.slidesToShow || n.options.infinite === !1 ? n.$slideTrack.children(".slick-slide").eq(i) : n.$slideTrack.children(".slick-slide").eq(i + n.options.slidesToShow + 1),
                        e = n.options.rtl === !0 ? o[0] ? (n.$slideTrack.width() - o[0].offsetLeft - o.width()) * -1 : 0 : o[0] ? o[0].offsetLeft * -1 : 0,
                        e += (n.$list.width() - o.outerWidth()) / 2)),
                e
        },
        e.prototype.getOption = e.prototype.slickGetOption = function(i) {
            var e = this;
            return e.options[i]
        },
        e.prototype.getNavigableIndexes = function() {
            var i, e = this,
                t = 0,
                o = 0,
                s = [];
            for (e.options.infinite === !1 ? i = e.slideCount : (t = e.options.slidesToScroll * -1,
                    o = e.options.slidesToScroll * -1,
                    i = 2 * e.slideCount); t < i;)
                s.push(t),
                t = o + e.options.slidesToScroll,
                o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
            return s
        },
        e.prototype.getSlick = function() {
            return this
        },
        e.prototype.getSlideCount = function() {
            var e, t, o, s, n = this;
            return s = n.options.centerMode === !0 ? Math.floor(n.$list.width() / 2) : 0,
                o = n.swipeLeft * -1 + s,
                n.options.swipeToSlide === !0 ? (n.$slideTrack.find(".slick-slide").each(function(e, s) {
                        var r, l, d;
                        if (r = i(s).outerWidth(),
                            l = s.offsetLeft,
                            n.options.centerMode !== !0 && (l += r / 2),
                            d = l + r,
                            o < d)
                            return t = s, !1
                    }),
                    e = Math.abs(i(t).attr("data-slick-index") - n.currentSlide) || 1) : n.options.slidesToScroll
        },
        e.prototype.goTo = e.prototype.slickGoTo = function(i, e) {
            var t = this;
            t.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(i)
                }
            }, e)
        },
        e.prototype.init = function(e) {
            var t = this;
            i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"),
                    t.buildRows(),
                    t.buildOut(),
                    t.setProps(),
                    t.startLoad(),
                    t.loadSlider(),
                    t.initializeEvents(),
                    t.updateArrows(),
                    t.updateDots(),
                    t.checkResponsive(!0),
                    t.focusHandler()),
                e && t.$slider.trigger("init", [t]),
                t.options.accessibility === !0 && t.initADA(),
                t.options.autoplay && (t.paused = !1,
                    t.autoPlay())
        },
        e.prototype.initADA = function() {
            var e = this,
                t = Math.ceil(e.slideCount / e.options.slidesToShow),
                o = e.getNavigableIndexes().filter(function(i) {
                    return i >= 0 && i < e.slideCount
                });
            e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
                    "aria-hidden": "true",
                    tabindex: "-1"
                }).find("a, input, button, select").attr({
                    tabindex: "-1"
                }),
                null !== e.$dots && (e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t) {
                        var s = o.indexOf(t);
                        if (i(this).attr({
                                role: "tabpanel",
                                id: "slick-slide" + e.instanceUid + t,
                                tabindex: -1
                            }),
                            s !== -1) {
                            var n = "slick-slide-control" + e.instanceUid + s;
                            i("#" + n).length && i(this).attr({
                                "aria-describedby": n
                            })
                        }
                    }),
                    e.$dots.attr("role", "tablist").find("li").each(function(s) {
                        var n = o[s];
                        i(this).attr({
                                role: "presentation"
                            }),
                            i(this).find("button").first().attr({
                                role: "tab",
                                id: "slick-slide-control" + e.instanceUid + s,
                                "aria-controls": "slick-slide" + e.instanceUid + n,
                                "aria-label": s + 1 + " of " + t,
                                "aria-selected": null,
                                tabindex: "-1"
                            })
                    }).eq(e.currentSlide).find("button").attr({
                        "aria-selected": "true",
                        tabindex: "0"
                    }).end());
            for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
                e.options.focusOnChange ? e.$slides.eq(s).attr({
                    tabindex: "0"
                }) : e.$slides.eq(s).removeAttr("tabindex");
            e.activateADA()
        },
        e.prototype.initArrowEvents = function() {
            var i = this;
            i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
                    message: "previous"
                }, i.changeSlide),
                i.$nextArrow.off("click.slick").on("click.slick", {
                    message: "next"
                }, i.changeSlide),
                i.options.accessibility === !0 && (i.$prevArrow.on("keydown.slick", i.keyHandler),
                    i.$nextArrow.on("keydown.slick", i.keyHandler)))
        },
        e.prototype.initDotEvents = function() {
            var e = this;
            e.options.dots === !0 && e.slideCount > e.options.slidesToShow && (i("li", e.$dots).on("click.slick", {
                        message: "index"
                    }, e.changeSlide),
                    e.options.accessibility === !0 && e.$dots.on("keydown.slick", e.keyHandler)),
                e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
        },
        e.prototype.initSlideEvents = function() {
            var e = this;
            e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
                e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
        },
        e.prototype.initializeEvents = function() {
            var e = this;
            e.initArrowEvents(),
                e.initDotEvents(),
                e.initSlideEvents(),
                e.$list.on("touchstart.slick mousedown.slick", {
                    action: "start"
                }, e.swipeHandler),
                e.$list.on("touchmove.slick mousemove.slick", {
                    action: "move"
                }, e.swipeHandler),
                e.$list.on("touchend.slick mouseup.slick", {
                    action: "end"
                }, e.swipeHandler),
                e.$list.on("touchcancel.slick mouseleave.slick", {
                    action: "end"
                }, e.swipeHandler),
                e.$list.on("click.slick", e.clickHandler),
                i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
                e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler),
                e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)),
                i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)),
                i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
                i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
                i(e.setPosition)
        },
        e.prototype.initUI = function() {
            var i = this;
            i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(),
                    i.$nextArrow.show()),
                i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.show()
        },
        e.prototype.keyHandler = function(i) {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && e.options.accessibility === !0 ? e.changeSlide({
                data: {
                    message: e.options.rtl === !0 ? "next" : "previous"
                }
            }) : 39 === i.keyCode && e.options.accessibility === !0 && e.changeSlide({
                data: {
                    message: e.options.rtl === !0 ? "previous" : "next"
                }
            }))
        },
        e.prototype.lazyLoad = function() {
            function e(e) {
                i("img[data-lazy]", e).each(function() {
                    var e = i(this),
                        t = i(this).attr("data-lazy"),
                        o = i(this).attr("data-srcset"),
                        s = i(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                        n = document.createElement("img");
                    n.onload = function() {
                            e.animate({
                                opacity: 0
                            }, 100, function() {
                                o && (e.attr("srcset", o),
                                        s && e.attr("sizes", s)),
                                    e.attr("src", t).animate({
                                        opacity: 1
                                    }, 200, function() {
                                        e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                                    }),
                                    r.$slider.trigger("lazyLoaded", [r, e, t])
                            })
                        },
                        n.onerror = function() {
                            e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                                r.$slider.trigger("lazyLoadError", [r, e, t])
                        },
                        n.src = t
                })
            }
            var t, o, s, n, r = this;
            if (r.options.centerMode === !0 ? r.options.infinite === !0 ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1),
                    n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)),
                    n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide,
                    n = Math.ceil(s + r.options.slidesToShow),
                    r.options.fade === !0 && (s > 0 && s--,
                        n <= r.slideCount && n++)),
                t = r.$slider.find(".slick-slide").slice(s, n),
                "anticipated" === r.options.lazyLoad)
                for (var l = s - 1, d = n, a = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++)
                    l < 0 && (l = r.slideCount - 1),
                    t = t.add(a.eq(l)),
                    t = t.add(a.eq(d)),
                    l--,
                    d++;
            e(t),
                r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"),
                    e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow),
                    e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(r.options.slidesToShow * -1),
                    e(o))
        },
        e.prototype.loadSlider = function() {
            var i = this;
            i.setPosition(),
                i.$slideTrack.css({
                    opacity: 1
                }),
                i.$slider.removeClass("slick-loading"),
                i.initUI(),
                "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
        },
        e.prototype.next = e.prototype.slickNext = function() {
            var i = this;
            i.changeSlide({
                data: {
                    message: "next"
                }
            })
        },
        e.prototype.orientationChange = function() {
            var i = this;
            i.checkResponsive(),
                i.setPosition()
        },
        e.prototype.pause = e.prototype.slickPause = function() {
            var i = this;
            i.autoPlayClear(),
                i.paused = !0
        },
        e.prototype.play = e.prototype.slickPlay = function() {
            var i = this;
            i.autoPlay(),
                i.options.autoplay = !0,
                i.paused = !1,
                i.focussed = !1,
                i.interrupted = !1
        },
        e.prototype.postSlide = function(e) {
            var t = this;
            if (!t.unslicked && (t.$slider.trigger("afterChange", [t, e]),
                    t.animating = !1,
                    t.slideCount > t.options.slidesToShow && t.setPosition(),
                    t.swipeLeft = null,
                    t.options.autoplay && t.autoPlay(),
                    t.options.accessibility === !0 && (t.initADA(),
                        t.options.focusOnChange))) {
                var o = i(t.$slides.get(t.currentSlide));
                o.attr("tabindex", 0).focus()
            }
            setTimeout(() => {
                var slide = t.$slides.get(t.currentSlide);
                slide.querySelector("h2").style.opacity = 1;
            }, 1000);
        },
        e.prototype.prev = e.prototype.slickPrev = function() {
            var i = this;
            i.changeSlide({
                data: {
                    message: "previous"
                }
            })
        },
        e.prototype.preventDefault = function(i) {
            i.preventDefault()
        },
        e.prototype.progressiveLazyLoad = function(e) {
            e = e || 1;
            var t, o, s, n, r, l = this,
                d = i("img[data-lazy]", l.$slider);
            d.length ? (t = d.first(),
                o = t.attr("data-lazy"),
                s = t.attr("data-srcset"),
                n = t.attr("data-sizes") || l.$slider.attr("data-sizes"),
                r = document.createElement("img"),
                r.onload = function() {
                    s && (t.attr("srcset", s),
                            n && t.attr("sizes", n)),
                        t.attr("src", o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                        l.options.adaptiveHeight === !0 && l.setPosition(),
                        l.$slider.trigger("lazyLoaded", [l, t, o]),
                        l.progressiveLazyLoad()
                },
                r.onerror = function() {
                    e < 3 ? setTimeout(function() {
                        l.progressiveLazyLoad(e + 1)
                    }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                        l.$slider.trigger("lazyLoadError", [l, t, o]),
                        l.progressiveLazyLoad())
                },
                r.src = o) : l.$slider.trigger("allImagesLoaded", [l])
        },
        e.prototype.refresh = function(e) {
            var t, o, s = this;
            o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
                s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
                t = s.currentSlide,
                s.destroy(!0),
                i.extend(s, s.initials, {
                    currentSlide: t
                }),
                s.init(),
                e || s.changeSlide({
                    data: {
                        message: "index",
                        index: t
                    }
                }, !1)
        },
        e.prototype.registerBreakpoints = function() {
            var e, t, o, s = this,
                n = s.options.responsive || null;
            if ("array" === i.type(n) && n.length) {
                s.respondTo = s.options.respondTo || "window";
                for (e in n)
                    if (o = s.breakpoints.length - 1,
                        n.hasOwnProperty(e)) {
                        for (t = n[e].breakpoint; o >= 0;)
                            s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1),
                            o--;
                        s.breakpoints.push(t),
                            s.breakpointSettings[t] = n[e].settings
                    }
                s.breakpoints.sort(function(i, e) {
                    return s.options.mobileFirst ? i - e : e - i
                })
            }
        },
        e.prototype.reinit = function() {
            var e = this;
            e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"),
                e.slideCount = e.$slides.length,
                e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                e.registerBreakpoints(),
                e.setProps(),
                e.setupInfinite(),
                e.buildArrows(),
                e.updateArrows(),
                e.initArrowEvents(),
                e.buildDots(),
                e.updateDots(),
                e.initDotEvents(),
                e.cleanUpSlideEvents(),
                e.initSlideEvents(),
                e.checkResponsive(!1, !0),
                e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler),
                e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0),
                e.setPosition(),
                e.focusHandler(),
                e.paused = !e.options.autoplay,
                e.autoPlay(),
                e.$slider.trigger("reInit", [e])
        },
        e.prototype.resize = function() {
            var e = this;
            i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay),
                e.windowDelay = window.setTimeout(function() {
                    e.windowWidth = i(window).width(),
                        e.checkResponsive(),
                        e.unslicked || e.setPosition()
                }, 50))
        },
        e.prototype.removeSlide = e.prototype.slickRemove = function(i, e, t) {
            var o = this;
            return "boolean" == typeof i ? (e = i,
                i = e === !0 ? 0 : o.slideCount - 1) : i = e === !0 ? --i : i, !(o.slideCount < 1 || i < 0 || i > o.slideCount - 1) && (o.unload(),
                t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(),
                o.$slides = o.$slideTrack.children(this.options.slide),
                o.$slideTrack.children(this.options.slide).detach(),
                o.$slideTrack.append(o.$slides),
                o.$slidesCache = o.$slides,
                void o.reinit())
        },
        e.prototype.setCSS = function(i) {
            var e, t, o = this,
                s = {};
            o.options.rtl === !0 && (i = -i),
                e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px",
                t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px",
                s[o.positionProp] = i,
                o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {},
                    o.cssTransitions === !1 ? (s[o.animType] = "translate(" + e + ", " + t + ")",
                        o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)",
                        o.$slideTrack.css(s)))
        },
        e.prototype.setDimensions = function() {
            var i = this;
            i.options.vertical === !1 ? i.options.centerMode === !0 && i.$list.css({
                    padding: "0px " + i.options.centerPadding
                }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow),
                    i.options.centerMode === !0 && i.$list.css({
                        padding: i.options.centerPadding + " 0px"
                    })),
                i.listWidth = i.$list.width(),
                i.listHeight = i.$list.height(),
                i.options.vertical === !1 && i.options.variableWidth === !1 ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow),
                    i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : i.options.variableWidth === !0 ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth),
                    i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
            var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            i.options.variableWidth === !1 && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
        },
        e.prototype.setFade = function() {
            var e, t = this;
            t.$slides.each(function(o, s) {
                    e = t.slideWidth * o * -1,
                        t.options.rtl === !0 ? i(s).css({
                            position: "relative",
                            right: e,
                            top: 0,
                            zIndex: t.options.zIndex - 2,
                            opacity: 0
                        }) : i(s).css({
                            position: "relative",
                            left: e,
                            top: 0,
                            zIndex: t.options.zIndex - 2,
                            opacity: 0
                        })
                }),
                t.$slides.eq(t.currentSlide).css({
                    zIndex: t.options.zIndex - 1,
                    opacity: 1
                })
        },
        e.prototype.setHeight = function() {
            var i = this;
            if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
                var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
                i.$list.css("height", e)
            }
        },
        e.prototype.setOption = e.prototype.slickSetOption = function() {
            var e, t, o, s, n, r = this,
                l = !1;
            if ("object" === i.type(arguments[0]) ? (o = arguments[0],
                    l = arguments[1],
                    n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0],
                    s = arguments[1],
                    l = arguments[2],
                    "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")),
                "single" === n)
                r.options[o] = s;
            else if ("multiple" === n)
                i.each(o, function(i, e) {
                    r.options[i] = e
                });
            else if ("responsive" === n)
                for (t in s)
                    if ("array" !== i.type(r.options.responsive))
                        r.options.responsive = [s[t]];
                    else {
                        for (e = r.options.responsive.length - 1; e >= 0;)
                            r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1),
                            e--;
                        r.options.responsive.push(s[t])
                    }
            l && (r.unload(),
                r.reinit())
        },
        e.prototype.setPosition = function() {
            var i = this;
            i.setDimensions(),
                i.setHeight(),
                i.options.fade === !1 ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(),
                i.$slider.trigger("setPosition", [i])
        },
        e.prototype.setProps = function() {
            var i = this,
                e = document.body.style;
            i.positionProp = i.options.vertical === !0 ? "top" : "left",
                "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"),
                void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || i.options.useCSS === !0 && (i.cssTransitions = !0),
                i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex),
                void 0 !== e.OTransform && (i.animType = "OTransform",
                    i.transformType = "-o-transform",
                    i.transitionType = "OTransition",
                    void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.MozTransform && (i.animType = "MozTransform",
                    i.transformType = "-moz-transform",
                    i.transitionType = "MozTransition",
                    void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)),
                void 0 !== e.webkitTransform && (i.animType = "webkitTransform",
                    i.transformType = "-webkit-transform",
                    i.transitionType = "webkitTransition",
                    void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)),
                void 0 !== e.msTransform && (i.animType = "msTransform",
                    i.transformType = "-ms-transform",
                    i.transitionType = "msTransition",
                    void 0 === e.msTransform && (i.animType = !1)),
                void 0 !== e.transform && i.animType !== !1 && (i.animType = "transform",
                    i.transformType = "transform",
                    i.transitionType = "transition"),
                i.transformsEnabled = i.options.useTransform && null !== i.animType && i.animType !== !1
        },
        e.prototype.setSlideClasses = function(i) {
            var e, t, o, s, n = this;
            if (t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"),
                n.$slides.eq(i).addClass("slick-current"),
                n.options.centerMode === !0) {
                var r = n.options.slidesToShow % 2 === 0 ? 1 : 0;
                e = Math.floor(n.options.slidesToShow / 2),
                    n.options.infinite === !0 && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e + r, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i,
                            t.slice(o - e + 1 + r, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")),
                        0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")),
                    n.$slides.eq(i).addClass("slick-center")
            } else
                i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow,
                    o = n.options.infinite === !0 ? n.options.slidesToShow + i : i,
                    n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
            "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
        },
        e.prototype.setupInfinite = function() {
            var e, t, o, s = this;
            if (s.options.fade === !0 && (s.options.centerMode = !1),
                s.options.infinite === !0 && s.options.fade === !1 && (t = null,
                    s.slideCount > s.options.slidesToShow)) {
                for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow,
                    e = s.slideCount; e > s.slideCount - o; e -= 1)
                    t = e - 1,
                    i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
                for (e = 0; e < o + s.slideCount; e += 1)
                    t = e,
                    i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
                s.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    i(this).attr("id", "")
                })
            }
        },
        e.prototype.interrupt = function(i) {
            var e = this;
            i || e.autoPlay(),
                e.interrupted = i
        },
        e.prototype.selectHandler = function(e) {
            var t = this,
                o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"),
                s = parseInt(o.attr("data-slick-index"));
            return s || (s = 0),
                t.slideCount <= t.options.slidesToShow ? void t.slideHandler(s, !1, !0) : void t.slideHandler(s)
        },
        e.prototype.slideHandler = function(i, e, t) {
            var o, s, n, r, l, d = null,
                a = this;
            if (e = e || !1, !(a.animating === !0 && a.options.waitForAnimate === !0 || a.options.fade === !0 && a.currentSlide === i)) {

                return e === !1 && a.asNavFor(i),
                    o = i,
                    d = a.getLeft(o),
                    r = a.getLeft(a.currentSlide),
                    a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft,
                    a.options.infinite === !1 && a.options.centerMode === !1 && (i < 0 || i > a.getDotCount() * a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide,
                        t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
                            a.postSlide(o)
                        }) : a.postSlide(o))) : a.options.infinite === !1 && a.options.centerMode === !0 && (i < 0 || i > a.slideCount - a.options.slidesToScroll) ? void(a.options.fade === !1 && (o = a.currentSlide,
                        t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(r, function() {
                            a.postSlide(o)
                        }) : a.postSlide(o))) : (a.options.autoplay && clearInterval(a.autoPlayTimer),
                        s = o < 0 ? a.slideCount % a.options.slidesToScroll !== 0 ? a.slideCount - a.slideCount % a.options.slidesToScroll : a.slideCount + o : o >= a.slideCount ? a.slideCount % a.options.slidesToScroll !== 0 ? 0 : o - a.slideCount : o,
                        a.animating = !0,
                        a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
                        n = a.currentSlide,
                        a.currentSlide = s,
                        a.setSlideClasses(a.currentSlide),
                        a.options.asNavFor && (l = a.getNavTarget(),
                            l = l.slick("getSlick"),
                            l.slideCount <= l.options.slidesToShow && l.setSlideClasses(a.currentSlide)),
                        a.updateDots(),
                        a.updateArrows(),
                        a.options.fade === !0 ? (t !== !0 ? (a.fadeSlideOut(n),
                                a.fadeSlide(s, function() {
                                    a.postSlide(s)
                                })) : a.postSlide(s),
                            void a.animateHeight()) : void(t !== !0 && a.slideCount > a.options.slidesToShow ? a.animateSlide(d, function() {
                            a.postSlide(s)
                        }) : a.postSlide(s)))
            }
        },
        e.prototype.startLoad = function() {
            var i = this;
            i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(),
                    i.$nextArrow.hide()),
                i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.hide(),
                i.$slider.addClass("slick-loading")
        },
        e.prototype.swipeDirection = function() {
            var i, e, t, o, s = this;
            return i = s.touchObject.startX - s.touchObject.curX,
                e = s.touchObject.startY - s.touchObject.curY,
                t = Math.atan2(e, i),
                o = Math.round(180 * t / Math.PI),
                o < 0 && (o = 360 - Math.abs(o)),
                o <= 45 && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : o <= 360 && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && o <= 225 ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && o <= 135 ? "down" : "up" : "vertical"
        },
        e.prototype.swipeEnd = function(i) {
            var e, t, o = this;
            if (o.dragging = !1,
                o.swiping = !1,
                o.scrolling)
                return o.scrolling = !1, !1;
            if (o.interrupted = !1,
                o.shouldClick = !(o.touchObject.swipeLength > 10),
                void 0 === o.touchObject.curX)
                return !1;
            if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]),
                o.touchObject.swipeLength >= o.touchObject.minSwipe) {
                switch (t = o.swipeDirection()) {
                    case "left":
                    case "down":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                            o.currentDirection = 0;
                        break;
                    case "right":
                    case "up":
                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                            o.currentDirection = 1
                }
                "vertical" != t && (o.slideHandler(e),
                    o.touchObject = {},
                    o.$slider.trigger("swipe", [o, t]))
            } else
                o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide),
                    o.touchObject = {})
        },
        e.prototype.swipeHandler = function(i) {
            var e = this;
            if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && i.type.indexOf("mouse") !== -1))
                switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1,
                    e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold,
                    e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
                    i.data.action) {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i)
                }
        },
        e.prototype.swipeMove = function(i) {
            var e, t, o, s, n, r, l = this;
            return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !(!l.dragging || l.scrolling || n && 1 !== n.length) && (e = l.getLeft(l.currentSlide),
                l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX,
                l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY,
                l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))),
                r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))), !l.options.verticalSwiping && !l.swiping && r > 4 ? (l.scrolling = !0, !1) : (l.options.verticalSwiping === !0 && (l.touchObject.swipeLength = r),
                    t = l.swipeDirection(),
                    void 0 !== i.originalEvent && l.touchObject.swipeLength > 4 && (l.swiping = !0,
                        i.preventDefault()),
                    s = (l.options.rtl === !1 ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1),
                    l.options.verticalSwiping === !0 && (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                    o = l.touchObject.swipeLength,
                    l.touchObject.edgeHit = !1,
                    l.options.infinite === !1 && (0 === l.currentSlide && "right" === t || l.currentSlide >= l.getDotCount() && "left" === t) && (o = l.touchObject.swipeLength * l.options.edgeFriction,
                        l.touchObject.edgeHit = !0),
                    l.options.vertical === !1 ? l.swipeLeft = e + o * s : l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s,
                    l.options.verticalSwiping === !0 && (l.swipeLeft = e + o * s),
                    l.options.fade !== !0 && l.options.touchMove !== !1 && (l.animating === !0 ? (l.swipeLeft = null, !1) : void l.setCSS(l.swipeLeft))))
        },
        e.prototype.swipeStart = function(i) {
            var e, t = this;
            return t.interrupted = !0,
                1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]),
                    t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX,
                    t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY,
                    void(t.dragging = !0))
        },
        e.prototype.unfilterSlides = e.prototype.slickUnfilter = function() {
            var i = this;
            null !== i.$slidesCache && (i.unload(),
                i.$slideTrack.children(this.options.slide).detach(),
                i.$slidesCache.appendTo(i.$slideTrack),
                i.reinit())
        },
        e.prototype.unload = function() {
            var e = this;
            i(".slick-cloned", e.$slider).remove(),
                e.$dots && e.$dots.remove(),
                e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(),
                e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(),
                e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
        },
        e.prototype.unslick = function(i) {
            var e = this;
            e.$slider.trigger("unslick", [e, i]),
                e.destroy()
        },
        e.prototype.updateArrows = function() {
            var i, e = this;
            i = Math.floor(e.options.slidesToShow / 2),
                e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                    0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"),
                        e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
        },
        e.prototype.updateDots = function() {
            var i = this;
            null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(),
                i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
        },
        e.prototype.visibility = function() {
            var i = this;
            i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
        },
        i.fn.slick = function() {
            var i, t, o = this,
                s = arguments[0],
                n = Array.prototype.slice.call(arguments, 1),
                r = o.length;
            for (i = 0; i < r; i++)
                if ("object" == typeof s || "undefined" == typeof s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n),
                    "undefined" != typeof t)
                    return t;
            return o
        }
});
/*! Selectric ϟ v1.13.0 (2017-08-22) - git.io/tjl9sQ - Copyright (c) 2017 Leonardo Santos - MIT License */
! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = function(t, s) {
            return void 0 === s && (s = "undefined" != typeof window ? require("jquery") : require("jquery")(t)),
                e(s),
                s
        } :
        e(jQuery)
}(function(e) {
    "use strict";
    var t = e(document),
        s = e(window),
        l = ["a", "e", "i", "o", "u", "n", "c", "y"],
        i = [/[\xE0-\xE5]/g, /[\xE8-\xEB]/g, /[\xEC-\xEF]/g, /[\xF2-\xF6]/g, /[\xF9-\xFC]/g, /[\xF1]/g, /[\xE7]/g, /[\xFD-\xFF]/g],
        n = function(t, s) {
            var l = this;
            l.element = t,
                l.$element = e(t),
                l.state = {
                    multiple: !!l.$element.attr("multiple"),
                    enabled: !1,
                    opened: !1,
                    currValue: -1,
                    selectedIdx: -1,
                    highlightedIdx: -1
                },
                l.eventTriggers = {
                    open: l.open,
                    close: l.close,
                    destroy: l.destroy,
                    refresh: l.refresh,
                    init: l.init
                },
                l.init(s)
        };
    n.prototype = {
            utils: {
                isMobile: function() {
                    return /android|ip(hone|od|ad)/i.test(navigator.userAgent)
                },
                escapeRegExp: function(e) {
                    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                },
                replaceDiacritics: function(e) {
                    for (var t = i.length; t--;)
                        e = e.toLowerCase().replace(i[t], l[t]);
                    return e
                },
                format: function(e) {
                    var t = arguments;
                    return ("" + e).replace(/\{(?:(\d+)|(\w+))\}/g, function(e, s, l) {
                        return l && t[1] ? t[1][l] : t[s]
                    })
                },
                nextEnabledItem: function(e, t) {
                    for (; e[t = (t + 1) % e.length].disabled;)
                    ;
                    return t
                },
                previousEnabledItem: function(e, t) {
                    for (; e[t = (t > 0 ? t : e.length) - 1].disabled;)
                    ;
                    return t
                },
                toDash: function(e) {
                    return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
                },
                triggerCallback: function(t, s) {
                    var l = s.element,
                        i = s.options["on" + t],
                        n = [l].concat([].slice.call(arguments).slice(1));
                    e.isFunction(i) && i.apply(l, n),
                        e(l).trigger("selectric-" + this.toDash(t), n)
                },
                arrayToClassname: function(t) {
                    var s = e.grep(t, function(e) {
                        return !!e
                    });
                    return e.trim(s.join(" "))
                }
            },
            init: function(t) {
                var s = this;
                if (s.options = e.extend(!0, {}, e.fn.selectric.defaults, s.options, t),
                    s.utils.triggerCallback("BeforeInit", s),
                    s.destroy(!0),
                    s.options.disableOnMobile && s.utils.isMobile())
                    return void(s.disableOnMobile = !0);
                s.classes = s.getClassNames();
                var l = e("<input/>", {
                        class: s.classes.input,
                        readonly: s.utils.isMobile()
                    }),
                    i = e("<div/>", {
                        class: s.classes.items,
                        tabindex: -1
                    }),
                    n = e("<div/>", {
                        class: s.classes.scroll
                    }),
                    a = e("<div/>", {
                        class: s.classes.prefix,
                        html: s.options.arrowButtonMarkup
                    }),
                    o = e("<span/>", {
                        class: "label"
                    }),
                    r = s.$element.wrap("<div/>").parent().append(a.prepend(o), i, l),
                    u = e("<div/>", {
                        class: s.classes.hideselect
                    });
                s.elements = {
                        input: l,
                        items: i,
                        itemsScroll: n,
                        wrapper: a,
                        label: o,
                        outerWrapper: r
                    },
                    s.options.nativeOnMobile && s.utils.isMobile() && (s.elements.input = void 0,
                        u.addClass(s.classes.prefix + "-is-native"),
                        s.$element.on("change", function() {
                            s.refresh()
                        })),
                    s.$element.on(s.eventTriggers).wrap(u),
                    s.originalTabindex = s.$element.prop("tabindex"),
                    s.$element.prop("tabindex", -1),
                    s.populate(),
                    s.activate(),
                    s.utils.triggerCallback("Init", s)
            },
            activate: function() {
                var e = this,
                    t = e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),
                    s = e.$element.width();
                t.removeClass(e.classes.tempshow),
                    e.utils.triggerCallback("BeforeActivate", e),
                    e.elements.outerWrapper.prop("class", e.utils.arrayToClassname([e.classes.wrapper, e.$element.prop("class").replace(/\S+/g, e.classes.prefix + "-$&"), e.options.responsive ? e.classes.responsive : ""])),
                    e.options.inheritOriginalWidth && s > 0 && e.elements.outerWrapper.width(s),
                    e.unbindEvents(),
                    e.$element.prop("disabled") ? (e.elements.outerWrapper.addClass(e.classes.disabled),
                        e.elements.input && e.elements.input.prop("disabled", !0)) : (e.state.enabled = !0,
                        e.elements.outerWrapper.removeClass(e.classes.disabled),
                        e.$li = e.elements.items.removeAttr("style").find("li"),
                        e.bindEvents()),
                    e.utils.triggerCallback("Activate", e)
            },
            getClassNames: function() {
                var t = this,
                    s = t.options.customClass,
                    l = {};
                return e.each("Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Below Scroll Group GroupLabel".split(" "), function(e, i) {
                        var n = s.prefix + i;
                        l[i.toLowerCase()] = s.camelCase ? n : t.utils.toDash(n)
                    }),
                    l.prefix = s.prefix,
                    l
            },
            setLabel: function() {
                var t = this,
                    s = t.options.labelBuilder;
                if (t.state.multiple) {
                    var l = e.isArray(t.state.currValue) ? t.state.currValue : [t.state.currValue];
                    l = 0 === l.length ? [0] : l;
                    var i = e.map(l, function(s) {
                        return e.grep(t.lookupItems, function(e) {
                            return e.index === s
                        })[0]
                    });
                    i = e.grep(i, function(t) {
                            return i.length > 1 || 0 === i.length ? "" !== e.trim(t.value) : t
                        }),
                        i = e.map(i, function(l) {
                            return e.isFunction(s) ? s(l) : t.utils.format(s, l)
                        }),
                        t.options.multiple.maxLabelEntries && (i.length >= t.options.multiple.maxLabelEntries + 1 ? (i = i.slice(0, t.options.multiple.maxLabelEntries),
                            i.push(e.isFunction(s) ? s({
                                text: "..."
                            }) : t.utils.format(s, {
                                text: "..."
                            }))) : i.slice(i.length - 1)),
                        t.elements.label.html(i.join(t.options.multiple.separator))
                } else {
                    var n = t.lookupItems[t.state.currValue];
                    t.elements.label.html(e.isFunction(s) ? s(n) : t.utils.format(s, n))
                }
            },
            populate: function() {
                var t = this,
                    s = t.$element.children(),
                    l = t.$element.find("option"),
                    i = l.filter(":selected"),
                    n = l.index(i),
                    a = 0,
                    o = t.state.multiple ? [] : 0;
                i.length > 1 && t.state.multiple && (n = [],
                        i.each(function() {
                            n.push(e(this).index())
                        })),
                    t.state.currValue = ~n ? n : o,
                    t.state.selectedIdx = t.state.currValue,
                    t.state.highlightedIdx = t.state.currValue,
                    t.items = [],
                    t.lookupItems = [],
                    s.length && (s.each(function(s) {
                            var l = e(this);
                            if (l.is("optgroup")) {
                                var i = {
                                    element: l,
                                    label: l.prop("label"),
                                    groupDisabled: l.prop("disabled"),
                                    items: []
                                };
                                l.children().each(function(s) {
                                        var l = e(this);
                                        i.items[s] = t.getItemData(a, l, i.groupDisabled || l.prop("disabled")),
                                            t.lookupItems[a] = i.items[s],
                                            a++
                                    }),
                                    t.items[s] = i
                            } else
                                t.items[s] = t.getItemData(a, l, l.prop("disabled")),
                                t.lookupItems[a] = t.items[s],
                                a++
                        }),
                        t.setLabel(),
                        t.elements.items.append(t.elements.itemsScroll.html(t.getItemsMarkup(t.items))))
            },
            getItemData: function(t, s, l) {
                var i = this;
                return {
                    index: t,
                    element: s,
                    value: s.val(),
                    className: s.prop("class"),
                    text: s.html(),
                    slug: e.trim(i.utils.replaceDiacritics(s.html())),
                    alt: s.attr("data-alt"),
                    selected: s.prop("selected"),
                    disabled: l
                }
            },
            getItemsMarkup: function(t) {
                var s = this,
                    l = "<ul>";
                return e.isFunction(s.options.listBuilder) && s.options.listBuilder && (t = s.options.listBuilder(t)),
                    e.each(t, function(t, i) {
                        void 0 !== i.label ? (l += s.utils.format('<ul class="{1}"><li class="{2}">{3}</li>', s.utils.arrayToClassname([s.classes.group, i.groupDisabled ? "disabled" : "", i.element.prop("class")]), s.classes.grouplabel, i.element.prop("label")),
                            e.each(i.items, function(e, t) {
                                l += s.getItemMarkup(t.index, t)
                            }),
                            l += "</ul>") : l += s.getItemMarkup(i.index, i)
                    }),
                    l + "</ul>"
            },
            getItemMarkup: function(t, s) {
                var l = this,
                    i = l.options.optionsItemBuilder,
                    n = {
                        value: s.value,
                        text: s.text,
                        slug: s.slug,
                        index: s.index
                    };
                return l.utils.format('<li data-index="{1}" class="{2}">{3}</li>', t, l.utils.arrayToClassname([s.className, t === l.items.length - 1 ? "last" : "", s.disabled ? "disabled" : "", s.selected ? "selected" : ""]), e.isFunction(i) ? l.utils.format(i(s, this.$element, t), s) : l.utils.format(i, n))
            },
            unbindEvents: function() {
                var e = this;
                e.elements.wrapper.add(e.$element).add(e.elements.outerWrapper).add(e.elements.input).off(".sl")
            },
            bindEvents: function() {
                var t = this;
                t.elements.outerWrapper.on("mouseenter.sl mouseleave.sl", function(s) {
                        e(this).toggleClass(t.classes.hover, "mouseenter" === s.type),
                            t.options.openOnHover && (clearTimeout(t.closeTimer),
                                "mouseleave" === s.type ? t.closeTimer = setTimeout(e.proxy(t.close, t), t.options.hoverIntentTimeout) : t.open())
                    }),
                    t.elements.wrapper.on("click.sl", function(e) {
                        t.state.opened ? t.close() : t.open(e)
                    }),
                    t.options.nativeOnMobile && t.utils.isMobile() || (t.$element.on("focus.sl", function() {
                            t.elements.input.focus()
                        }),
                        t.elements.input.prop({
                            tabindex: t.originalTabindex,
                            disabled: !1
                        }).on("keydown.sl", e.proxy(t.handleKeys, t)).on("focusin.sl", function(e) {
                            t.elements.outerWrapper.addClass(t.classes.focus),
                                t.elements.input.one("blur", function() {
                                    t.elements.input.blur()
                                }),
                                t.options.openOnFocus && !t.state.opened && t.open(e)
                        }).on("focusout.sl", function() {
                            t.elements.outerWrapper.removeClass(t.classes.focus)
                        }).on("input propertychange", function() {
                            var s = t.elements.input.val(),
                                l = new RegExp("^" + t.utils.escapeRegExp(s), "i");
                            clearTimeout(t.resetStr),
                                t.resetStr = setTimeout(function() {
                                    t.elements.input.val("")
                                }, t.options.keySearchTimeout),
                                s.length && e.each(t.items, function(e, s) {
                                    if (!s.disabled) {
                                        if (l.test(s.text) || l.test(s.slug))
                                            return void t.highlight(e);
                                        if (s.alt)
                                            for (var i = s.alt.split("|"), n = 0; n < i.length && i[n]; n++)
                                                if (l.test(i[n].trim()))
                                                    return void t.highlight(e)
                                    }
                                })
                        })),
                    t.$li.on({
                        mousedown: function(e) {
                            e.preventDefault(),
                                e.stopPropagation()
                        },
                        click: function() {
                            return t.select(e(this).data("index")), !1
                        }
                    })
            },
            handleKeys: function(t) {
                var s = this,
                    l = t.which,
                    i = s.options.keys,
                    n = e.inArray(l, i.previous) > -1,
                    a = e.inArray(l, i.next) > -1,
                    o = e.inArray(l, i.select) > -1,
                    r = e.inArray(l, i.open) > -1,
                    u = s.state.highlightedIdx,
                    p = n && 0 === u || a && u + 1 === s.items.length,
                    c = 0;
                if (13 !== l && 32 !== l || t.preventDefault(),
                    n || a) {
                    if (!s.options.allowWrap && p)
                        return;
                    n && (c = s.utils.previousEnabledItem(s.lookupItems, u)),
                        a && (c = s.utils.nextEnabledItem(s.lookupItems, u)),
                        s.highlight(c)
                }
                if (o && s.state.opened)
                    return s.select(u),
                        void(s.state.multiple && s.options.multiple.keepMenuOpen || s.close());
                r && !s.state.opened && s.open()
            },
            refresh: function() {
                var e = this;
                e.populate(),
                    e.activate(),
                    e.utils.triggerCallback("Refresh", e)
            },
            setOptionsDimensions: function() {
                var e = this,
                    t = e.elements.items.closest(":visible").children(":hidden").addClass(e.classes.tempshow),
                    s = e.options.maxHeight,
                    l = e.elements.items.outerWidth(),
                    i = e.elements.wrapper.outerWidth() - (l - e.elements.items.width());
                !e.options.expandToItemText || i > l ? e.finalWidth = i : (e.elements.items.css("overflow", "scroll"),
                        e.elements.outerWrapper.width(9e4),
                        e.finalWidth = e.elements.items.width(),
                        e.elements.items.css("overflow", ""),
                        e.elements.outerWrapper.width("")),
                    e.elements.items.width(e.finalWidth).height() > s && e.elements.items.height(s),
                    t.removeClass(e.classes.tempshow)
            },
            isInViewport: function() {
                var e = this;
                if (!0 === e.options.forceRenderAbove)
                    e.elements.outerWrapper.addClass(e.classes.above);
                else if (!0 === e.options.forceRenderBelow)
                    e.elements.outerWrapper.addClass(e.classes.below);
                else {
                    var t = s.scrollTop(),
                        l = s.height(),
                        i = e.elements.outerWrapper.offset().top,
                        n = e.elements.outerWrapper.outerHeight(),
                        a = i + n + e.itemsHeight <= t + l,
                        o = i - e.itemsHeight > t,
                        r = !a && o,
                        u = !r;
                    e.elements.outerWrapper.toggleClass(e.classes.above, r),
                        e.elements.outerWrapper.toggleClass(e.classes.below, u)
                }
            },
            detectItemVisibility: function(t) {
                var s = this,
                    l = s.$li.filter("[data-index]");
                s.state.multiple && (t = e.isArray(t) && 0 === t.length ? 0 : t,
                    t = e.isArray(t) ? Math.min.apply(Math, t) : t);
                var i = l.eq(t).outerHeight(),
                    n = l[t].offsetTop,
                    a = s.elements.itemsScroll.scrollTop(),
                    o = n + 2 * i;
                s.elements.itemsScroll.scrollTop(o > a + s.itemsHeight ? o - s.itemsHeight : n - i < a ? n - i : a)
            },
            open: function(s) {
                var l = this;
                if (l.options.nativeOnMobile && l.utils.isMobile())
                    return !1;
                l.utils.triggerCallback("BeforeOpen", l),
                    s && (s.preventDefault(),
                        l.options.stopPropagation && s.stopPropagation()),
                    l.state.enabled && (l.setOptionsDimensions(),
                        e("." + l.classes.hideselect, "." + l.classes.open).children().selectric("close"),
                        l.state.opened = !0,
                        l.itemsHeight = l.elements.items.outerHeight(),
                        l.itemsInnerHeight = l.elements.items.height(),
                        l.elements.outerWrapper.addClass(l.classes.open),
                        l.elements.input.val(""),
                        s && "focusin" !== s.type && l.elements.input.focus(),
                        setTimeout(function() {
                            t.on("click.sl", e.proxy(l.close, l)).on("scroll.sl", e.proxy(l.isInViewport, l))
                        }, 1),
                        l.isInViewport(),
                        l.options.preventWindowScroll && t.on("mousewheel.sl DOMMouseScroll.sl", "." + l.classes.scroll, function(t) {
                            var s = t.originalEvent,
                                i = e(this).scrollTop(),
                                n = 0;
                            "detail" in s && (n = -1 * s.detail),
                                "wheelDelta" in s && (n = s.wheelDelta),
                                "wheelDeltaY" in s && (n = s.wheelDeltaY),
                                "deltaY" in s && (n = -1 * s.deltaY),
                                (i === this.scrollHeight - l.itemsInnerHeight && n < 0 || 0 === i && n > 0) && t.preventDefault()
                        }),
                        l.detectItemVisibility(l.state.selectedIdx),
                        l.highlight(l.state.multiple ? -1 : l.state.selectedIdx),
                        l.utils.triggerCallback("Open", l))
            },
            close: function() {
                var e = this;
                e.utils.triggerCallback("BeforeClose", e),
                    t.off(".sl"),
                    e.elements.outerWrapper.removeClass(e.classes.open),
                    e.state.opened = !1,
                    e.utils.triggerCallback("Close", e)
            },
            change: function() {
                var t = this;
                t.utils.triggerCallback("BeforeChange", t),
                    t.state.multiple ? (e.each(t.lookupItems, function(e) {
                            t.lookupItems[e].selected = !1,
                                t.$element.find("option").prop("selected", !1)
                        }),
                        e.each(t.state.selectedIdx, function(e, s) {
                            t.lookupItems[s].selected = !0,
                                t.$element.find("option").eq(s).prop("selected", !0)
                        }),
                        t.state.currValue = t.state.selectedIdx,
                        t.setLabel(),
                        t.utils.triggerCallback("Change", t)) : t.state.currValue !== t.state.selectedIdx && (t.$element.prop("selectedIndex", t.state.currValue = t.state.selectedIdx).data("value", t.lookupItems[t.state.selectedIdx].text),
                        t.setLabel(),
                        t.utils.triggerCallback("Change", t))
            },
            highlight: function(e) {
                var t = this,
                    s = t.$li.filter("[data-index]").removeClass("highlighted");
                t.utils.triggerCallback("BeforeHighlight", t),
                    void 0 === e || -1 === e || t.lookupItems[e].disabled || (s.eq(t.state.highlightedIdx = e).addClass("highlighted"),
                        t.detectItemVisibility(e),
                        t.utils.triggerCallback("Highlight", t))
            },
            select: function(t) {
                var s = this,
                    l = s.$li.filter("[data-index]");
                if (s.utils.triggerCallback("BeforeSelect", s, t),
                    void 0 !== t && -1 !== t && !s.lookupItems[t].disabled) {
                    if (s.state.multiple) {
                        s.state.selectedIdx = e.isArray(s.state.selectedIdx) ? s.state.selectedIdx : [s.state.selectedIdx];
                        var i = e.inArray(t, s.state.selectedIdx); -
                        1 !== i ? s.state.selectedIdx.splice(i, 1) : s.state.selectedIdx.push(t),
                            l.removeClass("selected").filter(function(t) {
                                return -1 !== e.inArray(t, s.state.selectedIdx)
                            }).addClass("selected")
                    } else
                        l.removeClass("selected").eq(s.state.selectedIdx = t).addClass("selected");
                    s.state.multiple && s.options.multiple.keepMenuOpen || s.close(),
                        s.change(),
                        s.utils.triggerCallback("Select", s, t)
                }
            },
            destroy: function(e) {
                var t = this;
                t.state && t.state.enabled && (t.elements.items.add(t.elements.wrapper).add(t.elements.input).remove(),
                    e || t.$element.removeData("selectric").removeData("value"),
                    t.$element.prop("tabindex", t.originalTabindex).off(".sl").off(t.eventTriggers).unwrap().unwrap(),
                    t.state.enabled = !1)
            }
        },
        e.fn.selectric = function(t) {
            return this.each(function() {
                var s = e.data(this, "selectric");
                s && !s.disableOnMobile ? "string" == typeof t && s[t] ? s[t]() : s.init(t) : e.data(this, "selectric", new n(this, t))
            })
        },
        e.fn.selectric.defaults = {
            onChange: function(t) {
                e(t).change()
            },
            maxHeight: 300,
            keySearchTimeout: 500,
            arrowButtonMarkup: '<b class="button">&#x25be;</b>',
            disableOnMobile: !1,
            nativeOnMobile: !0,
            openOnFocus: !0,
            openOnHover: !1,
            hoverIntentTimeout: 500,
            expandToItemText: !1,
            responsive: !1,
            preventWindowScroll: !0,
            inheritOriginalWidth: !1,
            allowWrap: !0,
            forceRenderAbove: !1,
            forceRenderBelow: !1,
            stopPropagation: !0,
            optionsItemBuilder: "{text}",
            labelBuilder: "{text}",
            listBuilder: !1,
            keys: {
                previous: [37, 38],
                next: [39, 40],
                select: [9, 13, 27],
                open: [13, 32, 37, 38, 39, 40],
                close: [9, 27]
            },
            customClass: {
                prefix: "selectric",
                camelCase: !1
            },
            multiple: {
                separator: ", ",
                keepMenuOpen: !0,
                maxLabelEntries: !1
            }
        }
});
/*! PhotoSwipe - v4.1.2 - 2017-04-05
 * http://photoswipe.com
 * Copyright (c) 2017 Dmitry Semenov; */
! function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipe = b()
}(this, function() {
    "use strict";
    var a = function(a, b, c, d) {
        var e = {
            features: null,
            bind: function(a, b, c, d) {
                var e = (d ? "remove" : "add") + "EventListener";
                b = b.split(" ");
                for (var f = 0; f < b.length; f++)
                    b[f] && a[e](b[f], c, !1)
            },
            isArray: function(a) {
                return a instanceof Array
            },
            createEl: function(a, b) {
                var c = document.createElement(b || "div");
                return a && (c.className = a),
                    c
            },
            getScrollY: function() {
                var a = window.pageYOffset;
                return void 0 !== a ? a : document.documentElement.scrollTop
            },
            unbind: function(a, b, c) {
                e.bind(a, b, c, !0)
            },
            removeClass: function(a, b) {
                var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
                a.className = a.className.replace(c, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(a, b) {
                e.hasClass(a, b) || (a.className += (a.className ? " " : "") + b)
            },
            hasClass: function(a, b) {
                return a.className && new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
            },
            getChildByClass: function(a, b) {
                for (var c = a.firstChild; c;) {
                    if (e.hasClass(c, b))
                        return c;
                    c = c.nextSibling
                }
            },
            arraySearch: function(a, b, c) {
                for (var d = a.length; d--;)
                    if (a[d][c] === b)
                        return d;
                return -1
            },
            extend: function(a, b, c) {
                for (var d in b)
                    if (b.hasOwnProperty(d)) {
                        if (c && a.hasOwnProperty(d))
                            continue;
                        a[d] = b[d]
                    }
            },
            easing: {
                sine: {
                    out: function(a) {
                        return Math.sin(a * (Math.PI / 2))
                    },
                    inOut: function(a) {
                        return -(Math.cos(Math.PI * a) - 1) / 2
                    }
                },
                cubic: {
                    out: function(a) {
                        return --a * a * a + 1
                    }
                }
            },
            detectFeatures: function() {
                if (e.features)
                    return e.features;
                var a = e.createEl(),
                    b = a.style,
                    c = "",
                    d = {};
                if (d.oldIE = document.all && !document.addEventListener,
                    d.touch = "ontouchstart" in window,
                    window.requestAnimationFrame && (d.raf = window.requestAnimationFrame,
                        d.caf = window.cancelAnimationFrame),
                    d.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !d.pointerEvent) {
                    var f = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var g = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        g && g.length > 0 && (g = parseInt(g[1], 10),
                            g >= 1 && g < 8 && (d.isOldIOSPhone = !0))
                    }
                    var h = f.match(/Android\s([0-9\.]*)/),
                        i = h ? h[1] : 0;
                    i = parseFloat(i),
                        i >= 1 && (i < 4.4 && (d.isOldAndroid = !0),
                            d.androidVersion = i),
                        d.isMobileOpera = /opera mini|opera mobi/i.test(f)
                }
                for (var j, k, l = ["transform", "perspective", "animationName"], m = ["", "webkit", "Moz", "ms", "O"], n = 0; n < 4; n++) {
                    c = m[n];
                    for (var o = 0; o < 3; o++)
                        j = l[o],
                        k = c + (c ? j.charAt(0).toUpperCase() + j.slice(1) : j), !d[j] && k in b && (d[j] = k);
                    c && !d.raf && (c = c.toLowerCase(),
                        d.raf = window[c + "RequestAnimationFrame"],
                        d.raf && (d.caf = window[c + "CancelAnimationFrame"] || window[c + "CancelRequestAnimationFrame"]))
                }
                if (!d.raf) {
                    var p = 0;
                    d.raf = function(a) {
                            var b = (new Date).getTime(),
                                c = Math.max(0, 16 - (b - p)),
                                d = window.setTimeout(function() {
                                    a(b + c)
                                }, c);
                            return p = b + c,
                                d
                        },
                        d.caf = function(a) {
                            clearTimeout(a)
                        }
                }
                return d.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
                    e.features = d,
                    d
            }
        };
        e.detectFeatures(),
            e.features.oldIE && (e.bind = function(a, b, c, d) {
                b = b.split(" ");
                for (var e, f = (d ? "detach" : "attach") + "Event", g = function() {
                        c.handleEvent.call(c)
                    }, h = 0; h < b.length; h++)
                    if (e = b[h])
                        if ("object" == typeof c && c.handleEvent) {
                            if (d) {
                                if (!c["oldIE" + e])
                                    return !1
                            } else
                                c["oldIE" + e] = g;
                            a[f]("on" + e, c["oldIE" + e])
                        } else
                            a[f]("on" + e, c)
            });
        var f = this,
            g = 25,
            h = 3,
            i = {
                allowPanToNext: !0,
                spacing: .12,
                bgOpacity: 1,
                mouseUsed: !1,
                loop: !0,
                pinchToClose: !0,
                closeOnScroll: !0,
                closeOnVerticalDrag: !0,
                verticalDragRange: .75,
                hideAnimationDuration: 333,
                showAnimationDuration: 333,
                showHideOpacity: !1,
                focus: !0,
                escKey: !0,
                arrowKeys: !0,
                mainScrollEndFriction: .35,
                panEndFriction: .35,
                isClickableElement: function(a) {
                    return "A" === a.tagName
                },
                getDoubleTapZoom: function(a, b) {
                    return a ? 1 : b.initialZoomLevel < .7 ? 1 : 1.33
                },
                maxSpreadZoom: 1.33,
                modal: !0,
                scaleMode: "fit"
            };
        e.extend(i, d);
        var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma = function() {
                return {
                    x: 0,
                    y: 0
                }
            },
            na = ma(),
            oa = ma(),
            pa = ma(),
            qa = {},
            ra = 0,
            sa = {},
            ta = ma(),
            ua = 0,
            va = !0,
            wa = [],
            xa = {},
            ya = !1,
            za = function(a, b) {
                e.extend(f, b.publicMethods),
                    wa.push(a)
            },
            Aa = function(a) {
                var b = ac();
                return a > b - 1 ? a - b : a < 0 ? b + a : a
            },
            Ba = {},
            Ca = function(a, b) {
                return Ba[a] || (Ba[a] = []),
                    Ba[a].push(b)
            },
            Da = function(a) {
                var b = Ba[a];
                if (b) {
                    var c = Array.prototype.slice.call(arguments);
                    c.shift();
                    for (var d = 0; d < b.length; d++)
                        b[d].apply(f, c)
                }
            },
            Ea = function() {
                return (new Date).getTime()
            },
            Fa = function(a) {
                ja = a,
                    f.bg.style.opacity = a * i.bgOpacity
            },
            Ga = function(a, b, c, d, e) {
                (!ya || e && e !== f.currItem) && (d /= e ? e.fitRatio : f.currItem.fitRatio),
                a[E] = u + b + "px, " + c + "px" + v + " scale(" + d + ")"
            },
            Ha = function(a) {
                ea && (a && (s > f.currItem.fitRatio ? ya || (mc(f.currItem, !1, !0),
                        ya = !0) : ya && (mc(f.currItem),
                        ya = !1)),
                    Ga(ea, pa.x, pa.y, s))
            },
            Ia = function(a) {
                a.container && Ga(a.container.style, a.initialPosition.x, a.initialPosition.y, a.initialZoomLevel, a)
            },
            Ja = function(a, b) {
                b[E] = u + a + "px, 0px" + v
            },
            Ka = function(a, b) {
                if (!i.loop && b) {
                    var c = m + (ta.x * ra - a) / ta.x,
                        d = Math.round(a - tb.x);
                    (c < 0 && d > 0 || c >= ac() - 1 && d < 0) && (a = tb.x + d * i.mainScrollEndFriction)
                }
                tb.x = a,
                    Ja(a, n)
            },
            La = function(a, b) {
                var c = ub[a] - sa[a];
                return oa[a] + na[a] + c - c * (b / t)
            },
            Ma = function(a, b) {
                a.x = b.x,
                    a.y = b.y,
                    b.id && (a.id = b.id)
            },
            Na = function(a) {
                a.x = Math.round(a.x),
                    a.y = Math.round(a.y)
            },
            Oa = null,
            Pa = function() {
                Oa && (e.unbind(document, "mousemove", Pa),
                        e.addClass(a, "pswp--has_mouse"),
                        i.mouseUsed = !0,
                        Da("mouseUsed")),
                    Oa = setTimeout(function() {
                        Oa = null
                    }, 100)
            },
            Qa = function() {
                e.bind(document, "keydown", f),
                    N.transform && e.bind(f.scrollWrap, "click", f),
                    i.mouseUsed || e.bind(document, "mousemove", Pa),
                    e.bind(window, "resize scroll orientationchange", f),
                    Da("bindEvents")
            },
            Ra = function() {
                e.unbind(window, "resize scroll orientationchange", f),
                    e.unbind(window, "scroll", r.scroll),
                    e.unbind(document, "keydown", f),
                    e.unbind(document, "mousemove", Pa),
                    N.transform && e.unbind(f.scrollWrap, "click", f),
                    V && e.unbind(window, p, f),
                    clearTimeout(O),
                    Da("unbindEvents")
            },
            Sa = function(a, b) {
                var c = ic(f.currItem, qa, a);
                return b && (da = c),
                    c
            },
            Ta = function(a) {
                return a || (a = f.currItem),
                    a.initialZoomLevel
            },
            Ua = function(a) {
                return a || (a = f.currItem),
                    a.w > 0 ? i.maxSpreadZoom : 1
            },
            Va = function(a, b, c, d) {
                return d === f.currItem.initialZoomLevel ? (c[a] = f.currItem.initialPosition[a], !0) : (c[a] = La(a, d),
                    c[a] > b.min[a] ? (c[a] = b.min[a], !0) : c[a] < b.max[a] && (c[a] = b.max[a], !0))
            },
            Wa = function() {
                if (E) {
                    var b = N.perspective && !G;
                    return u = "translate" + (b ? "3d(" : "("),
                        void(v = N.perspective ? ", 0px)" : ")")
                }
                E = "left",
                    e.addClass(a, "pswp--ie"),
                    Ja = function(a, b) {
                        b.left = a + "px"
                    },
                    Ia = function(a) {
                        var b = a.fitRatio > 1 ? 1 : a.fitRatio,
                            c = a.container.style,
                            d = b * a.w,
                            e = b * a.h;
                        c.width = d + "px",
                            c.height = e + "px",
                            c.left = a.initialPosition.x + "px",
                            c.top = a.initialPosition.y + "px"
                    },
                    Ha = function() {
                        if (ea) {
                            var a = ea,
                                b = f.currItem,
                                c = b.fitRatio > 1 ? 1 : b.fitRatio,
                                d = c * b.w,
                                e = c * b.h;
                            a.width = d + "px",
                                a.height = e + "px",
                                a.left = pa.x + "px",
                                a.top = pa.y + "px"
                        }
                    }
            },
            Xa = function(a) {
                var b = "";
                i.escKey && 27 === a.keyCode ? b = "close" : i.arrowKeys && (37 === a.keyCode ? b = "prev" : 39 === a.keyCode && (b = "next")),
                    b && (a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || (a.preventDefault ? a.preventDefault() : a.returnValue = !1,
                        f[b]()))
            },
            Ya = function(a) {
                a && (Y || X || fa || T) && (a.preventDefault(),
                    a.stopPropagation())
            },
            Za = function() {
                f.setScrollOffset(0, e.getScrollY())
            },
            $a = {},
            _a = 0,
            ab = function(a) {
                $a[a] && ($a[a].raf && I($a[a].raf),
                    _a--,
                    delete $a[a])
            },
            bb = function(a) {
                $a[a] && ab(a),
                    $a[a] || (_a++,
                        $a[a] = {})
            },
            cb = function() {
                for (var a in $a)
                    $a.hasOwnProperty(a) && ab(a)
            },
            db = function(a, b, c, d, e, f, g) {
                var h, i = Ea();
                bb(a);
                var j = function() {
                    if ($a[a]) {
                        if (h = Ea() - i,
                            h >= d)
                            return ab(a),
                                f(c),
                                void(g && g());
                        f((c - b) * e(h / d) + b),
                            $a[a].raf = H(j)
                    }
                };
                j()
            },
            eb = {
                shout: Da,
                listen: Ca,
                viewportSize: qa,
                options: i,
                isMainScrollAnimating: function() {
                    return fa
                },
                getZoomLevel: function() {
                    return s
                },
                getCurrentIndex: function() {
                    return m
                },
                isDragging: function() {
                    return V
                },
                isZooming: function() {
                    return aa
                },
                setScrollOffset: function(a, b) {
                    sa.x = a,
                        M = sa.y = b,
                        Da("updateScrollOffset", sa)
                },
                applyZoomPan: function(a, b, c, d) {
                    pa.x = b,
                        pa.y = c,
                        s = a,
                        Ha(d)
                },
                init: function() {
                    if (!j && !k) {
                        var c;
                        f.framework = e,
                            f.template = a,
                            f.bg = e.getChildByClass(a, "pswp__bg"),
                            J = a.className,
                            j = !0,
                            N = e.detectFeatures(),
                            H = N.raf,
                            I = N.caf,
                            E = N.transform,
                            L = N.oldIE,
                            f.scrollWrap = e.getChildByClass(a, "pswp__scroll-wrap"),
                            f.container = e.getChildByClass(f.scrollWrap, "pswp__container"),
                            n = f.container.style,
                            f.itemHolders = y = [{
                                el: f.container.children[0],
                                wrap: 0,
                                index: -1
                            }, {
                                el: f.container.children[1],
                                wrap: 0,
                                index: -1
                            }, {
                                el: f.container.children[2],
                                wrap: 0,
                                index: -1
                            }],
                            y[0].el.style.display = y[2].el.style.display = "none",
                            Wa(),
                            r = {
                                resize: f.updateSize,
                                orientationchange: function() {
                                    clearTimeout(O),
                                        O = setTimeout(function() {
                                            qa.x !== f.scrollWrap.clientWidth && f.updateSize()
                                        }, 500)
                                },
                                scroll: Za,
                                keydown: Xa,
                                click: Ya
                            };
                        var d = N.isOldIOSPhone || N.isOldAndroid || N.isMobileOpera;
                        for (N.animationName && N.transform && !d || (i.showAnimationDuration = i.hideAnimationDuration = 0),
                            c = 0; c < wa.length; c++)
                            f["init" + wa[c]]();
                        if (b) {
                            var g = f.ui = new b(f, e);
                            g.init()
                        }
                        Da("firstUpdate"),
                            m = m || i.index || 0,
                            (isNaN(m) || m < 0 || m >= ac()) && (m = 0),
                            f.currItem = _b(m),
                            (N.isOldIOSPhone || N.isOldAndroid) && (va = !1),
                            a.setAttribute("aria-hidden", "false"),
                            i.modal && (va ? a.style.position = "fixed" : (a.style.position = "absolute",
                                a.style.top = e.getScrollY() + "px")),
                            void 0 === M && (Da("initialLayout"),
                                M = K = e.getScrollY());
                        var l = "pswp--open ";
                        for (i.mainClass && (l += i.mainClass + " "),
                            i.showHideOpacity && (l += "pswp--animate_opacity "),
                            l += G ? "pswp--touch" : "pswp--notouch",
                            l += N.animationName ? " pswp--css_animation" : "",
                            l += N.svg ? " pswp--svg" : "",
                            e.addClass(a, l),
                            f.updateSize(),
                            o = -1,
                            ua = null,
                            c = 0; c < h; c++)
                            Ja((c + o) * ta.x, y[c].el.style);
                        L || e.bind(f.scrollWrap, q, f),
                            Ca("initialZoomInEnd", function() {
                                f.setContent(y[0], m - 1),
                                    f.setContent(y[2], m + 1),
                                    y[0].el.style.display = y[2].el.style.display = "block",
                                    i.focus && a.focus(),
                                    Qa()
                            }),
                            f.setContent(y[1], m),
                            f.updateCurrItem(),
                            Da("afterInit"),
                            va || (w = setInterval(function() {
                                _a || V || aa || s !== f.currItem.initialZoomLevel || f.updateSize()
                            }, 1e3)),
                            e.addClass(a, "pswp--visible")
                    }
                },
                close: function() {
                    j && (j = !1,
                        k = !0,
                        Da("close"),
                        Ra(),
                        cc(f.currItem, null, !0, f.destroy))
                },
                destroy: function() {
                    Da("destroy"),
                        Xb && clearTimeout(Xb),
                        a.setAttribute("aria-hidden", "true"),
                        a.className = J,
                        w && clearInterval(w),
                        e.unbind(f.scrollWrap, q, f),
                        e.unbind(window, "scroll", f),
                        zb(),
                        cb(),
                        Ba = null
                },
                panTo: function(a, b, c) {
                    c || (a > da.min.x ? a = da.min.x : a < da.max.x && (a = da.max.x),
                            b > da.min.y ? b = da.min.y : b < da.max.y && (b = da.max.y)),
                        pa.x = a,
                        pa.y = b,
                        Ha()
                },
                handleEvent: function(a) {
                    a = a || window.event,
                        r[a.type] && r[a.type](a)
                },
                goTo: function(a) {
                    a = Aa(a);
                    var b = a - m;
                    ua = b,
                        m = a,
                        f.currItem = _b(m),
                        ra -= b,
                        Ka(ta.x * ra),
                        cb(),
                        fa = !1,
                        f.updateCurrItem()
                },
                next: function() {
                    f.goTo(m + 1)
                },
                prev: function() {
                    f.goTo(m - 1)
                },
                updateCurrZoomItem: function(a) {
                    if (a && Da("beforeChange", 0),
                        y[1].el.children.length) {
                        var b = y[1].el.children[0];
                        ea = e.hasClass(b, "pswp__zoom-wrap") ? b.style : null
                    } else
                        ea = null;
                    da = f.currItem.bounds,
                        t = s = f.currItem.initialZoomLevel,
                        pa.x = da.center.x,
                        pa.y = da.center.y,
                        a && Da("afterChange")
                },
                invalidateCurrItems: function() {
                    x = !0;
                    for (var a = 0; a < h; a++)
                        y[a].item && (y[a].item.needsUpdate = !0)
                },
                updateCurrItem: function(a) {
                    if (0 !== ua) {
                        var b, c = Math.abs(ua);
                        if (!(a && c < 2)) {
                            f.currItem = _b(m),
                                ya = !1,
                                Da("beforeChange", ua),
                                c >= h && (o += ua + (ua > 0 ? -h : h),
                                    c = h);
                            for (var d = 0; d < c; d++)
                                ua > 0 ? (b = y.shift(),
                                    y[h - 1] = b,
                                    o++,
                                    Ja((o + 2) * ta.x, b.el.style),
                                    f.setContent(b, m - c + d + 1 + 1)) : (b = y.pop(),
                                    y.unshift(b),
                                    o--,
                                    Ja(o * ta.x, b.el.style),
                                    f.setContent(b, m + c - d - 1 - 1));
                            if (ea && 1 === Math.abs(ua)) {
                                var e = _b(z);
                                e.initialZoomLevel !== s && (ic(e, qa),
                                    mc(e),
                                    Ia(e))
                            }
                            ua = 0,
                                f.updateCurrZoomItem(),
                                z = m,
                                Da("afterChange")
                        }
                    }
                },
                updateSize: function(b) {
                    if (!va && i.modal) {
                        var c = e.getScrollY();
                        if (M !== c && (a.style.top = c + "px",
                                M = c), !b && xa.x === window.innerWidth && xa.y === window.innerHeight)
                            return;
                        xa.x = window.innerWidth,
                            xa.y = window.innerHeight,
                            a.style.height = xa.y + "px"
                    }
                    if (qa.x = f.scrollWrap.clientWidth,
                        qa.y = f.scrollWrap.clientHeight,
                        Za(),
                        ta.x = qa.x + Math.round(qa.x * i.spacing),
                        ta.y = qa.y,
                        Ka(ta.x * ra),
                        Da("beforeResize"),
                        void 0 !== o) {
                        for (var d, g, j, k = 0; k < h; k++)
                            d = y[k],
                            Ja((k + o) * ta.x, d.el.style),
                            j = m + k - 1,
                            i.loop && ac() > 2 && (j = Aa(j)),
                            g = _b(j),
                            g && (x || g.needsUpdate || !g.bounds) ? (f.cleanSlide(g),
                                f.setContent(d, j),
                                1 === k && (f.currItem = g,
                                    f.updateCurrZoomItem(!0)),
                                g.needsUpdate = !1) : d.index === -1 && j >= 0 && f.setContent(d, j),
                            g && g.container && (ic(g, qa),
                                mc(g),
                                Ia(g));
                        x = !1
                    }
                    t = s = f.currItem.initialZoomLevel,
                        da = f.currItem.bounds,
                        da && (pa.x = da.center.x,
                            pa.y = da.center.y,
                            Ha(!0)),
                        Da("resize")
                },
                zoomTo: function(a, b, c, d, f) {
                    b && (t = s,
                        ub.x = Math.abs(b.x) - pa.x,
                        ub.y = Math.abs(b.y) - pa.y,
                        Ma(oa, pa));
                    var g = Sa(a, !1),
                        h = {};
                    Va("x", g, h, a),
                        Va("y", g, h, a);
                    var i = s,
                        j = {
                            x: pa.x,
                            y: pa.y
                        };
                    Na(h);
                    var k = function(b) {
                        1 === b ? (s = a,
                                pa.x = h.x,
                                pa.y = h.y) : (s = (a - i) * b + i,
                                pa.x = (h.x - j.x) * b + j.x,
                                pa.y = (h.y - j.y) * b + j.y),
                            f && f(b),
                            Ha(1 === b)
                    };
                    c ? db("customZoomTo", 0, 1, c, d || e.easing.sine.inOut, k) : k(1)
                }
            },
            fb = 30,
            gb = 10,
            hb = {},
            ib = {},
            jb = {},
            kb = {},
            lb = {},
            mb = [],
            nb = {},
            ob = [],
            pb = {},
            qb = 0,
            rb = ma(),
            sb = 0,
            tb = ma(),
            ub = ma(),
            vb = ma(),
            wb = function(a, b) {
                return a.x === b.x && a.y === b.y
            },
            xb = function(a, b) {
                return Math.abs(a.x - b.x) < g && Math.abs(a.y - b.y) < g
            },
            yb = function(a, b) {
                return pb.x = Math.abs(a.x - b.x),
                    pb.y = Math.abs(a.y - b.y),
                    Math.sqrt(pb.x * pb.x + pb.y * pb.y)
            },
            zb = function() {
                Z && (I(Z),
                    Z = null)
            },
            Ab = function() {
                V && (Z = H(Ab),
                    Qb())
            },
            Bb = function() {
                return !("fit" === i.scaleMode && s === f.currItem.initialZoomLevel)
            },
            Cb = function(a, b) {
                return !(!a || a === document) && (!(a.getAttribute("class") && a.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (b(a) ? a : Cb(a.parentNode, b)))
            },
            Db = {},
            Eb = function(a, b) {
                return Db.prevent = !Cb(a.target, i.isClickableElement),
                    Da("preventDragEvent", a, b, Db),
                    Db.prevent
            },
            Fb = function(a, b) {
                return b.x = a.pageX,
                    b.y = a.pageY,
                    b.id = a.identifier,
                    b
            },
            Gb = function(a, b, c) {
                c.x = .5 * (a.x + b.x),
                    c.y = .5 * (a.y + b.y)
            },
            Hb = function(a, b, c) {
                if (a - Q > 50) {
                    var d = ob.length > 2 ? ob.shift() : {};
                    d.x = b,
                        d.y = c,
                        ob.push(d),
                        Q = a
                }
            },
            Ib = function() {
                var a = pa.y - f.currItem.initialPosition.y;
                return 1 - Math.abs(a / (qa.y / 2))
            },
            Jb = {},
            Kb = {},
            Lb = [],
            Mb = function(a) {
                for (; Lb.length > 0;)
                    Lb.pop();
                return F ? (la = 0,
                        mb.forEach(function(a) {
                            0 === la ? Lb[0] = a : 1 === la && (Lb[1] = a),
                                la++
                        })) : a.type.indexOf("touch") > -1 ? a.touches && a.touches.length > 0 && (Lb[0] = Fb(a.touches[0], Jb),
                        a.touches.length > 1 && (Lb[1] = Fb(a.touches[1], Kb))) : (Jb.x = a.pageX,
                        Jb.y = a.pageY,
                        Jb.id = "",
                        Lb[0] = Jb),
                    Lb
            },
            Nb = function(a, b) {
                var c, d, e, g, h = 0,
                    j = pa[a] + b[a],
                    k = b[a] > 0,
                    l = tb.x + b.x,
                    m = tb.x - nb.x;
                return c = j > da.min[a] || j < da.max[a] ? i.panEndFriction : 1,
                    j = pa[a] + b[a] * c, !i.allowPanToNext && s !== f.currItem.initialZoomLevel || (ea ? "h" !== ga || "x" !== a || X || (k ? (j > da.min[a] && (c = i.panEndFriction,
                                h = da.min[a] - j,
                                d = da.min[a] - oa[a]),
                            (d <= 0 || m < 0) && ac() > 1 ? (g = l,
                                m < 0 && l > nb.x && (g = nb.x)) : da.min.x !== da.max.x && (e = j)) : (j < da.max[a] && (c = i.panEndFriction,
                                h = j - da.max[a],
                                d = oa[a] - da.max[a]),
                            (d <= 0 || m > 0) && ac() > 1 ? (g = l,
                                m > 0 && l < nb.x && (g = nb.x)) : da.min.x !== da.max.x && (e = j))) : g = l,
                        "x" !== a) ? void(fa || $ || s > f.currItem.fitRatio && (pa[a] += b[a] * c)) : (void 0 !== g && (Ka(g, !0),
                            $ = g !== nb.x),
                        da.min.x !== da.max.x && (void 0 !== e ? pa.x = e : $ || (pa.x += b.x * c)),
                        void 0 !== g)
            },
            Ob = function(a) {
                if (!("mousedown" === a.type && a.button > 0)) {
                    if ($b)
                        return void a.preventDefault();
                    if (!U || "mousedown" !== a.type) {
                        if (Eb(a, !0) && a.preventDefault(),
                            Da("pointerDown"),
                            F) {
                            var b = e.arraySearch(mb, a.pointerId, "id");
                            b < 0 && (b = mb.length),
                                mb[b] = {
                                    x: a.pageX,
                                    y: a.pageY,
                                    id: a.pointerId
                                }
                        }
                        var c = Mb(a),
                            d = c.length;
                        _ = null,
                            cb(),
                            V && 1 !== d || (V = ha = !0,
                                e.bind(window, p, f),
                                S = ka = ia = T = $ = Y = W = X = !1,
                                ga = null,
                                Da("firstTouchStart", c),
                                Ma(oa, pa),
                                na.x = na.y = 0,
                                Ma(kb, c[0]),
                                Ma(lb, kb),
                                nb.x = ta.x * ra,
                                ob = [{
                                    x: kb.x,
                                    y: kb.y
                                }],
                                Q = P = Ea(),
                                Sa(s, !0),
                                zb(),
                                Ab()), !aa && d > 1 && !fa && !$ && (t = s,
                                X = !1,
                                aa = W = !0,
                                na.y = na.x = 0,
                                Ma(oa, pa),
                                Ma(hb, c[0]),
                                Ma(ib, c[1]),
                                Gb(hb, ib, vb),
                                ub.x = Math.abs(vb.x) - pa.x,
                                ub.y = Math.abs(vb.y) - pa.y,
                                ba = ca = yb(hb, ib))
                    }
                }
            },
            Pb = function(a) {
                if (a.preventDefault(),
                    F) {
                    var b = e.arraySearch(mb, a.pointerId, "id");
                    if (b > -1) {
                        var c = mb[b];
                        c.x = a.pageX,
                            c.y = a.pageY
                    }
                }
                if (V) {
                    var d = Mb(a);
                    if (ga || Y || aa)
                        _ = d;
                    else if (tb.x !== ta.x * ra)
                        ga = "h";
                    else {
                        var f = Math.abs(d[0].x - kb.x) - Math.abs(d[0].y - kb.y);
                        Math.abs(f) >= gb && (ga = f > 0 ? "h" : "v",
                            _ = d)
                    }
                }
            },
            Qb = function() {
                if (_) {
                    var a = _.length;
                    if (0 !== a)
                        if (Ma(hb, _[0]),
                            jb.x = hb.x - kb.x,
                            jb.y = hb.y - kb.y,
                            aa && a > 1) {
                            if (kb.x = hb.x,
                                kb.y = hb.y, !jb.x && !jb.y && wb(_[1], ib))
                                return;
                            Ma(ib, _[1]),
                                X || (X = !0,
                                    Da("zoomGestureStarted"));
                            var b = yb(hb, ib),
                                c = Vb(b);
                            c > f.currItem.initialZoomLevel + f.currItem.initialZoomLevel / 15 && (ka = !0);
                            var d = 1,
                                e = Ta(),
                                g = Ua();
                            if (c < e)
                                if (i.pinchToClose && !ka && t <= f.currItem.initialZoomLevel) {
                                    var h = e - c,
                                        j = 1 - h / (e / 1.2);
                                    Fa(j),
                                        Da("onPinchClose", j),
                                        ia = !0
                                } else
                                    d = (e - c) / e,
                                    d > 1 && (d = 1),
                                    c = e - d * (e / 3);
                            else
                                c > g && (d = (c - g) / (6 * e),
                                    d > 1 && (d = 1),
                                    c = g + d * e);
                            d < 0 && (d = 0),
                                ba = b,
                                Gb(hb, ib, rb),
                                na.x += rb.x - vb.x,
                                na.y += rb.y - vb.y,
                                Ma(vb, rb),
                                pa.x = La("x", c),
                                pa.y = La("y", c),
                                S = c > s,
                                s = c,
                                Ha()
                        } else {
                            if (!ga)
                                return;
                            if (ha && (ha = !1,
                                    Math.abs(jb.x) >= gb && (jb.x -= _[0].x - lb.x),
                                    Math.abs(jb.y) >= gb && (jb.y -= _[0].y - lb.y)),
                                kb.x = hb.x,
                                kb.y = hb.y,
                                0 === jb.x && 0 === jb.y)
                                return;
                            if ("v" === ga && i.closeOnVerticalDrag && !Bb()) {
                                na.y += jb.y,
                                    pa.y += jb.y;
                                var k = Ib();
                                return T = !0,
                                    Da("onVerticalDrag", k),
                                    Fa(k),
                                    void Ha()
                            }
                            Hb(Ea(), hb.x, hb.y),
                                Y = !0,
                                da = f.currItem.bounds;
                            var l = Nb("x", jb);
                            l || (Nb("y", jb),
                                Na(pa),
                                Ha())
                        }
                }
            },
            Rb = function(a) {
                if (N.isOldAndroid) {
                    if (U && "mouseup" === a.type)
                        return;
                    a.type.indexOf("touch") > -1 && (clearTimeout(U),
                        U = setTimeout(function() {
                            U = 0
                        }, 600))
                }
                Da("pointerUp"),
                    Eb(a, !1) && a.preventDefault();
                var b;
                if (F) {
                    var c = e.arraySearch(mb, a.pointerId, "id");
                    if (c > -1)
                        if (b = mb.splice(c, 1)[0],
                            navigator.pointerEnabled)
                            b.type = a.pointerType || "mouse";
                        else {
                            var d = {
                                4: "mouse",
                                2: "touch",
                                3: "pen"
                            };
                            b.type = d[a.pointerType],
                                b.type || (b.type = a.pointerType || "mouse")
                        }
                }
                var g, h = Mb(a),
                    j = h.length;
                if ("mouseup" === a.type && (j = 0),
                    2 === j)
                    return _ = null, !0;
                1 === j && Ma(lb, h[0]),
                    0 !== j || ga || fa || (b || ("mouseup" === a.type ? b = {
                            x: a.pageX,
                            y: a.pageY,
                            type: "mouse"
                        } : a.changedTouches && a.changedTouches[0] && (b = {
                            x: a.changedTouches[0].pageX,
                            y: a.changedTouches[0].pageY,
                            type: "touch"
                        })),
                        Da("touchRelease", a, b));
                var k = -1;
                if (0 === j && (V = !1,
                        e.unbind(window, p, f),
                        zb(),
                        aa ? k = 0 : sb !== -1 && (k = Ea() - sb)),
                    sb = 1 === j ? Ea() : -1,
                    g = k !== -1 && k < 150 ? "zoom" : "swipe",
                    aa && j < 2 && (aa = !1,
                        1 === j && (g = "zoomPointerUp"),
                        Da("zoomGestureEnded")),
                    _ = null,
                    Y || X || fa || T)
                    if (cb(),
                        R || (R = Sb()),
                        R.calculateSwipeSpeed("x"),
                        T) {
                        var l = Ib();
                        if (l < i.verticalDragRange)
                            f.close();
                        else {
                            var m = pa.y,
                                n = ja;
                            db("verticalDrag", 0, 1, 300, e.easing.cubic.out, function(a) {
                                    pa.y = (f.currItem.initialPosition.y - m) * a + m,
                                        Fa((1 - n) * a + n),
                                        Ha()
                                }),
                                Da("onVerticalDrag", 1)
                        }
                    } else {
                        if (($ || fa) && 0 === j) {
                            var o = Ub(g, R);
                            if (o)
                                return;
                            g = "zoomPointerUp"
                        }
                        if (!fa)
                            return "swipe" !== g ? void Wb() : void(!$ && s > f.currItem.fitRatio && Tb(R))
                    }
            },
            Sb = function() {
                var a, b, c = {
                    lastFlickOffset: {},
                    lastFlickDist: {},
                    lastFlickSpeed: {},
                    slowDownRatio: {},
                    slowDownRatioReverse: {},
                    speedDecelerationRatio: {},
                    speedDecelerationRatioAbs: {},
                    distanceOffset: {},
                    backAnimDestination: {},
                    backAnimStarted: {},
                    calculateSwipeSpeed: function(d) {
                        ob.length > 1 ? (a = Ea() - Q + 50,
                                b = ob[ob.length - 2][d]) : (a = Ea() - P,
                                b = lb[d]),
                            c.lastFlickOffset[d] = kb[d] - b,
                            c.lastFlickDist[d] = Math.abs(c.lastFlickOffset[d]),
                            c.lastFlickDist[d] > 20 ? c.lastFlickSpeed[d] = c.lastFlickOffset[d] / a : c.lastFlickSpeed[d] = 0,
                            Math.abs(c.lastFlickSpeed[d]) < .1 && (c.lastFlickSpeed[d] = 0),
                            c.slowDownRatio[d] = .95,
                            c.slowDownRatioReverse[d] = 1 - c.slowDownRatio[d],
                            c.speedDecelerationRatio[d] = 1
                    },
                    calculateOverBoundsAnimOffset: function(a, b) {
                        c.backAnimStarted[a] || (pa[a] > da.min[a] ? c.backAnimDestination[a] = da.min[a] : pa[a] < da.max[a] && (c.backAnimDestination[a] = da.max[a]),
                            void 0 !== c.backAnimDestination[a] && (c.slowDownRatio[a] = .7,
                                c.slowDownRatioReverse[a] = 1 - c.slowDownRatio[a],
                                c.speedDecelerationRatioAbs[a] < .05 && (c.lastFlickSpeed[a] = 0,
                                    c.backAnimStarted[a] = !0,
                                    db("bounceZoomPan" + a, pa[a], c.backAnimDestination[a], b || 300, e.easing.sine.out, function(b) {
                                        pa[a] = b,
                                            Ha()
                                    }))))
                    },
                    calculateAnimOffset: function(a) {
                        c.backAnimStarted[a] || (c.speedDecelerationRatio[a] = c.speedDecelerationRatio[a] * (c.slowDownRatio[a] + c.slowDownRatioReverse[a] - c.slowDownRatioReverse[a] * c.timeDiff / 10),
                            c.speedDecelerationRatioAbs[a] = Math.abs(c.lastFlickSpeed[a] * c.speedDecelerationRatio[a]),
                            c.distanceOffset[a] = c.lastFlickSpeed[a] * c.speedDecelerationRatio[a] * c.timeDiff,
                            pa[a] += c.distanceOffset[a])
                    },
                    panAnimLoop: function() {
                        if ($a.zoomPan && ($a.zoomPan.raf = H(c.panAnimLoop),
                                c.now = Ea(),
                                c.timeDiff = c.now - c.lastNow,
                                c.lastNow = c.now,
                                c.calculateAnimOffset("x"),
                                c.calculateAnimOffset("y"),
                                Ha(),
                                c.calculateOverBoundsAnimOffset("x"),
                                c.calculateOverBoundsAnimOffset("y"),
                                c.speedDecelerationRatioAbs.x < .05 && c.speedDecelerationRatioAbs.y < .05))
                            return pa.x = Math.round(pa.x),
                                pa.y = Math.round(pa.y),
                                Ha(),
                                void ab("zoomPan")
                    }
                };
                return c
            },
            Tb = function(a) {
                return a.calculateSwipeSpeed("y"),
                    da = f.currItem.bounds,
                    a.backAnimDestination = {},
                    a.backAnimStarted = {},
                    Math.abs(a.lastFlickSpeed.x) <= .05 && Math.abs(a.lastFlickSpeed.y) <= .05 ? (a.speedDecelerationRatioAbs.x = a.speedDecelerationRatioAbs.y = 0,
                        a.calculateOverBoundsAnimOffset("x"),
                        a.calculateOverBoundsAnimOffset("y"), !0) : (bb("zoomPan"),
                        a.lastNow = Ea(),
                        void a.panAnimLoop())
            },
            Ub = function(a, b) {
                var c;
                fa || (qb = m);
                var d;
                if ("swipe" === a) {
                    var g = kb.x - lb.x,
                        h = b.lastFlickDist.x < 10;
                    g > fb && (h || b.lastFlickOffset.x > 20) ? d = -1 : g < -fb && (h || b.lastFlickOffset.x < -20) && (d = 1)
                }
                var j;
                d && (m += d,
                    m < 0 ? (m = i.loop ? ac() - 1 : 0,
                        j = !0) : m >= ac() && (m = i.loop ? 0 : ac() - 1,
                        j = !0),
                    j && !i.loop || (ua += d,
                        ra -= d,
                        c = !0));
                var k, l = ta.x * ra,
                    n = Math.abs(l - tb.x);
                return c || l > tb.x == b.lastFlickSpeed.x > 0 ? (k = Math.abs(b.lastFlickSpeed.x) > 0 ? n / Math.abs(b.lastFlickSpeed.x) : 333,
                        k = Math.min(k, 400),
                        k = Math.max(k, 250)) : k = 333,
                    qb === m && (c = !1),
                    fa = !0,
                    Da("mainScrollAnimStart"),
                    db("mainScroll", tb.x, l, k, e.easing.cubic.out, Ka, function() {
                        cb(),
                            fa = !1,
                            qb = -1,
                            (c || qb !== m) && f.updateCurrItem(),
                            Da("mainScrollAnimComplete")
                    }),
                    c && f.updateCurrItem(!0),
                    c
            },
            Vb = function(a) {
                return 1 / ca * a * t
            },
            Wb = function() {
                var a = s,
                    b = Ta(),
                    c = Ua();
                s < b ? a = b : s > c && (a = c);
                var d, g = 1,
                    h = ja;
                return ia && !S && !ka && s < b ? (f.close(), !0) : (ia && (d = function(a) {
                        Fa((g - h) * a + h)
                    }),
                    f.zoomTo(a, 0, 200, e.easing.cubic.out, d), !0)
            };
        za("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var a = function(a, b, c, d, e) {
                        A = a + b,
                            B = a + c,
                            C = a + d,
                            D = e ? a + e : ""
                    };
                    F = N.pointerEvent,
                        F && N.touch && (N.touch = !1),
                        F ? navigator.pointerEnabled ? a("pointer", "down", "move", "up", "cancel") : a("MSPointer", "Down", "Move", "Up", "Cancel") : N.touch ? (a("touch", "start", "move", "end", "cancel"),
                            G = !0) : a("mouse", "down", "move", "up"),
                        p = B + " " + C + " " + D,
                        q = A,
                        F && !G && (G = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1),
                        f.likelyTouchDevice = G,
                        r[A] = Ob,
                        r[B] = Pb,
                        r[C] = Rb,
                        D && (r[D] = r[C]),
                        N.touch && (q += " mousedown",
                            p += " mousemove mouseup",
                            r.mousedown = r[A],
                            r.mousemove = r[B],
                            r.mouseup = r[C]),
                        G || (i.allowPanToNext = !1)
                }
            }
        });
        var Xb, Yb, Zb, $b, _b, ac, bc, cc = function(b, c, d, g) {
                Xb && clearTimeout(Xb),
                    $b = !0,
                    Zb = !0;
                var h;
                b.initialLayout ? (h = b.initialLayout,
                    b.initialLayout = null) : h = i.getThumbBoundsFn && i.getThumbBoundsFn(m);
                var j = d ? i.hideAnimationDuration : i.showAnimationDuration,
                    k = function() {
                        ab("initialZoom"),
                            d ? (f.template.removeAttribute("style"),
                                f.bg.removeAttribute("style")) : (Fa(1),
                                c && (c.style.display = "block"),
                                e.addClass(a, "pswp--animated-in"),
                                Da("initialZoom" + (d ? "OutEnd" : "InEnd"))),
                            g && g(),
                            $b = !1
                    };
                if (!j || !h || void 0 === h.x)
                    return Da("initialZoom" + (d ? "Out" : "In")),
                        s = b.initialZoomLevel,
                        Ma(pa, b.initialPosition),
                        Ha(),
                        a.style.opacity = d ? 0 : 1,
                        Fa(1),
                        void(j ? setTimeout(function() {
                            k()
                        }, j) : k());
                var n = function() {
                    var c = l,
                        g = !f.currItem.src || f.currItem.loadError || i.showHideOpacity;
                    b.miniImg && (b.miniImg.style.webkitBackfaceVisibility = "hidden"),
                        d || (s = h.w / b.w,
                            pa.x = h.x,
                            pa.y = h.y - K,
                            f[g ? "template" : "bg"].style.opacity = .001,
                            Ha()),
                        bb("initialZoom"),
                        d && !c && e.removeClass(a, "pswp--animated-in"),
                        g && (d ? e[(c ? "remove" : "add") + "Class"](a, "pswp--animate_opacity") : setTimeout(function() {
                            e.addClass(a, "pswp--animate_opacity")
                        }, 30)),
                        Xb = setTimeout(function() {
                            if (Da("initialZoom" + (d ? "Out" : "In")),
                                d) {
                                var f = h.w / b.w,
                                    i = {
                                        x: pa.x,
                                        y: pa.y
                                    },
                                    l = s,
                                    m = ja,
                                    n = function(b) {
                                        1 === b ? (s = f,
                                                pa.x = h.x,
                                                pa.y = h.y - M) : (s = (f - l) * b + l,
                                                pa.x = (h.x - i.x) * b + i.x,
                                                pa.y = (h.y - M - i.y) * b + i.y),
                                            Ha(),
                                            g ? a.style.opacity = 1 - b : Fa(m - b * m)
                                    };
                                c ? db("initialZoom", 0, 1, j, e.easing.cubic.out, n, k) : (n(1),
                                    Xb = setTimeout(k, j + 20))
                            } else
                                s = b.initialZoomLevel,
                                Ma(pa, b.initialPosition),
                                Ha(),
                                Fa(1),
                                g ? a.style.opacity = 1 : Fa(1),
                                Xb = setTimeout(k, j + 20)
                        }, d ? 25 : 90)
                };
                n()
            },
            dc = {},
            ec = [],
            fc = {
                index: 0,
                errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
                forceProgressiveLoading: !1,
                preload: [1, 1],
                getNumItemsFn: function() {
                    return Yb.length
                }
            },
            gc = function() {
                return {
                    center: {
                        x: 0,
                        y: 0
                    },
                    max: {
                        x: 0,
                        y: 0
                    },
                    min: {
                        x: 0,
                        y: 0
                    }
                }
            },
            hc = function(a, b, c) {
                var d = a.bounds;
                d.center.x = Math.round((dc.x - b) / 2),
                    d.center.y = Math.round((dc.y - c) / 2) + a.vGap.top,
                    d.max.x = b > dc.x ? Math.round(dc.x - b) : d.center.x,
                    d.max.y = c > dc.y ? Math.round(dc.y - c) + a.vGap.top : d.center.y,
                    d.min.x = b > dc.x ? 0 : d.center.x,
                    d.min.y = c > dc.y ? a.vGap.top : d.center.y
            },
            ic = function(a, b, c) {
                if (a.src && !a.loadError) {
                    var d = !c;
                    if (d && (a.vGap || (a.vGap = {
                                top: 0,
                                bottom: 0
                            }),
                            Da("parseVerticalMargin", a)),
                        dc.x = b.x,
                        dc.y = b.y - a.vGap.top - a.vGap.bottom,
                        d) {
                        var e = dc.x / a.w,
                            f = dc.y / a.h;
                        a.fitRatio = e < f ? e : f;
                        var g = i.scaleMode;
                        "orig" === g ? c = 1 : "fit" === g && (c = a.fitRatio),
                            c > 1 && (c = 1),
                            a.initialZoomLevel = c,
                            a.bounds || (a.bounds = gc())
                    }
                    if (!c)
                        return;
                    return hc(a, a.w * c, a.h * c),
                        d && c === a.initialZoomLevel && (a.initialPosition = a.bounds.center),
                        a.bounds
                }
                return a.w = a.h = 0,
                    a.initialZoomLevel = a.fitRatio = 1,
                    a.bounds = gc(),
                    a.initialPosition = a.bounds.center,
                    a.bounds
            },
            jc = function(a, b, c, d, e, g) {
                b.loadError || d && (b.imageAppended = !0,
                    mc(b, d, b === f.currItem && ya),
                    c.appendChild(d),
                    g && setTimeout(function() {
                        b && b.loaded && b.placeholder && (b.placeholder.style.display = "none",
                            b.placeholder = null)
                    }, 500))
            },
            kc = function(a) {
                a.loading = !0,
                    a.loaded = !1;
                var b = a.img = e.createEl("pswp__img", "img"),
                    c = function() {
                        a.loading = !1,
                            a.loaded = !0,
                            a.loadComplete ? a.loadComplete(a) : a.img = null,
                            b.onload = b.onerror = null,
                            b = null
                    };
                return b.onload = c,
                    b.onerror = function() {
                        a.loadError = !0,
                            c()
                    },
                    b.src = a.src,
                    b
            },
            lc = function(a, b) {
                if (a.src && a.loadError && a.container)
                    return b && (a.container.innerHTML = ""),
                        a.container.innerHTML = i.errorMsg.replace("%url%", a.src), !0
            },
            mc = function(a, b, c) {
                if (a.src) {
                    b || (b = a.container.lastChild);
                    var d = c ? a.w : Math.round(a.w * a.fitRatio),
                        e = c ? a.h : Math.round(a.h * a.fitRatio);
                    a.placeholder && !a.loaded && (a.placeholder.style.width = d + "px",
                            a.placeholder.style.height = e + "px"),
                        b.style.width = d + "px",
                        b.style.height = e + "px"
                }
            },
            nc = function() {
                if (ec.length) {
                    for (var a, b = 0; b < ec.length; b++)
                        a = ec[b],
                        a.holder.index === a.index && jc(a.index, a.item, a.baseDiv, a.img, !1, a.clearPlaceholder);
                    ec = []
                }
            };
        za("Controller", {
            publicMethods: {
                lazyLoadItem: function(a) {
                    a = Aa(a);
                    var b = _b(a);
                    b && (!b.loaded && !b.loading || x) && (Da("gettingData", a, b),
                        b.src && kc(b))
                },
                initController: function() {
                    e.extend(i, fc, !0),
                        f.items = Yb = c,
                        _b = f.getItemAt,
                        ac = i.getNumItemsFn,
                        bc = i.loop,
                        ac() < 3 && (i.loop = !1),
                        Ca("beforeChange", function(a) {
                            var b, c = i.preload,
                                d = null === a || a >= 0,
                                e = Math.min(c[0], ac()),
                                g = Math.min(c[1], ac());
                            for (b = 1; b <= (d ? g : e); b++)
                                f.lazyLoadItem(m + b);
                            for (b = 1; b <= (d ? e : g); b++)
                                f.lazyLoadItem(m - b)
                        }),
                        Ca("initialLayout", function() {
                            f.currItem.initialLayout = i.getThumbBoundsFn && i.getThumbBoundsFn(m)
                        }),
                        Ca("mainScrollAnimComplete", nc),
                        Ca("initialZoomInEnd", nc),
                        Ca("destroy", function() {
                            for (var a, b = 0; b < Yb.length; b++)
                                a = Yb[b],
                                a.container && (a.container = null),
                                a.placeholder && (a.placeholder = null),
                                a.img && (a.img = null),
                                a.preloader && (a.preloader = null),
                                a.loadError && (a.loaded = a.loadError = !1);
                            ec = null
                        })
                },
                getItemAt: function(a) {
                    return a >= 0 && (void 0 !== Yb[a] && Yb[a])
                },
                allowProgressiveImg: function() {
                    return i.forceProgressiveLoading || !G || i.mouseUsed || screen.width > 1200
                },
                setContent: function(a, b) {
                    i.loop && (b = Aa(b));
                    var c = f.getItemAt(a.index);
                    c && (c.container = null);
                    var d, g = f.getItemAt(b);
                    if (!g)
                        return void(a.el.innerHTML = "");
                    Da("gettingData", b, g),
                        a.index = b,
                        a.item = g;
                    var h = g.container = e.createEl("pswp__zoom-wrap");
                    if (!g.src && g.html && (g.html.tagName ? h.appendChild(g.html) : h.innerHTML = g.html),
                        lc(g),
                        ic(g, qa), !g.src || g.loadError || g.loaded)
                        g.src && !g.loadError && (d = e.createEl("pswp__img", "img"),
                            d.style.opacity = 1,
                            d.src = g.src,
                            mc(g, d),
                            jc(b, g, h, d, !0));
                    else {
                        if (g.loadComplete = function(c) {
                                if (j) {
                                    if (a && a.index === b) {
                                        if (lc(c, !0))
                                            return c.loadComplete = c.img = null,
                                                ic(c, qa),
                                                Ia(c),
                                                void(a.index === m && f.updateCurrZoomItem());
                                        c.imageAppended ? !$b && c.placeholder && (c.placeholder.style.display = "none",
                                            c.placeholder = null) : N.transform && (fa || $b) ? ec.push({
                                            item: c,
                                            baseDiv: h,
                                            img: c.img,
                                            index: b,
                                            holder: a,
                                            clearPlaceholder: !0
                                        }) : jc(b, c, h, c.img, fa || $b, !0)
                                    }
                                    c.loadComplete = null,
                                        c.img = null,
                                        Da("imageLoadComplete", b, c)
                                }
                            },
                            e.features.transform) {
                            var k = "pswp__img pswp__img--placeholder";
                            k += g.msrc ? "" : " pswp__img--placeholder--blank";
                            var l = e.createEl(k, g.msrc ? "img" : "");
                            g.msrc && (l.src = g.msrc),
                                mc(g, l),
                                h.appendChild(l),
                                g.placeholder = l
                        }
                        g.loading || kc(g),
                            f.allowProgressiveImg() && (!Zb && N.transform ? ec.push({
                                item: g,
                                baseDiv: h,
                                img: g.img,
                                index: b,
                                holder: a
                            }) : jc(b, g, h, g.img, !0, !0))
                    }
                    Zb || b !== m ? Ia(g) : (ea = h.style,
                            cc(g, d || g.img)),
                        a.el.innerHTML = "",
                        a.el.appendChild(h)
                },
                cleanSlide: function(a) {
                    a.img && (a.img.onload = a.img.onerror = null),
                        a.loaded = a.loading = a.img = a.imageAppended = !1
                }
            }
        });
        var oc, pc = {},
            qc = function(a, b, c) {
                var d = document.createEvent("CustomEvent"),
                    e = {
                        origEvent: a,
                        target: a.target,
                        releasePoint: b,
                        pointerType: c || "touch"
                    };
                d.initCustomEvent("pswpTap", !0, !0, e),
                    a.target.dispatchEvent(d)
            };
        za("Tap", {
            publicMethods: {
                initTap: function() {
                    Ca("firstTouchStart", f.onTapStart),
                        Ca("touchRelease", f.onTapRelease),
                        Ca("destroy", function() {
                            pc = {},
                                oc = null
                        })
                },
                onTapStart: function(a) {
                    a.length > 1 && (clearTimeout(oc),
                        oc = null)
                },
                onTapRelease: function(a, b) {
                    if (b && !Y && !W && !_a) {
                        var c = b;
                        if (oc && (clearTimeout(oc),
                                oc = null,
                                xb(c, pc)))
                            return void Da("doubleTap", c);
                        if ("mouse" === b.type)
                            return void qc(a, b, "mouse");
                        var d = a.target.tagName.toUpperCase();
                        if ("BUTTON" === d || e.hasClass(a.target, "pswp__single-tap"))
                            return void qc(a, b);
                        Ma(pc, c),
                            oc = setTimeout(function() {
                                qc(a, b),
                                    oc = null
                            }, 300)
                    }
                }
            }
        });
        var rc;
        za("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    L || (G ? Ca("mouseUsed", function() {
                        f.setupDesktopZoom()
                    }) : f.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(b) {
                    rc = {};
                    var c = "wheel mousewheel DOMMouseScroll";
                    Ca("bindEvents", function() {
                            e.bind(a, c, f.handleMouseWheel)
                        }),
                        Ca("unbindEvents", function() {
                            rc && e.unbind(a, c, f.handleMouseWheel)
                        }),
                        f.mouseZoomedIn = !1;
                    var d, g = function() {
                            f.mouseZoomedIn && (e.removeClass(a, "pswp--zoomed-in"),
                                    f.mouseZoomedIn = !1),
                                s < 1 ? e.addClass(a, "pswp--zoom-allowed") : e.removeClass(a, "pswp--zoom-allowed"),
                                h()
                        },
                        h = function() {
                            d && (e.removeClass(a, "pswp--dragging"),
                                d = !1)
                        };
                    Ca("resize", g),
                        Ca("afterChange", g),
                        Ca("pointerDown", function() {
                            f.mouseZoomedIn && (d = !0,
                                e.addClass(a, "pswp--dragging"))
                        }),
                        Ca("pointerUp", h),
                        b || g()
                },
                handleMouseWheel: function(a) {
                    if (s <= f.currItem.fitRatio)
                        return i.modal && (!i.closeOnScroll || _a || V ? a.preventDefault() : E && Math.abs(a.deltaY) > 2 && (l = !0,
                            f.close())), !0;
                    if (a.stopPropagation(),
                        rc.x = 0,
                        "deltaX" in a)
                        1 === a.deltaMode ? (rc.x = 18 * a.deltaX,
                            rc.y = 18 * a.deltaY) : (rc.x = a.deltaX,
                            rc.y = a.deltaY);
                    else if ("wheelDelta" in a)
                        a.wheelDeltaX && (rc.x = -.16 * a.wheelDeltaX),
                        a.wheelDeltaY ? rc.y = -.16 * a.wheelDeltaY : rc.y = -.16 * a.wheelDelta;
                    else {
                        if (!("detail" in a))
                            return;
                        rc.y = a.detail
                    }
                    Sa(s, !0);
                    var b = pa.x - rc.x,
                        c = pa.y - rc.y;
                    (i.modal || b <= da.min.x && b >= da.max.x && c <= da.min.y && c >= da.max.y) && a.preventDefault(),
                        f.panTo(b, c)
                },
                toggleDesktopZoom: function(b) {
                    b = b || {
                        x: qa.x / 2 + sa.x,
                        y: qa.y / 2 + sa.y
                    };
                    var c = i.getDoubleTapZoom(!0, f.currItem),
                        d = s === c;
                    f.mouseZoomedIn = !d,
                        f.zoomTo(d ? f.currItem.initialZoomLevel : c, b, 333),
                        e[(d ? "remove" : "add") + "Class"](a, "pswp--zoomed-in")
                }
            }
        });
        var sc, tc, uc, vc, wc, xc, yc, zc, Ac, Bc, Cc, Dc, Ec = {
                history: !0,
                galleryUID: 1
            },
            Fc = function() {
                return Cc.hash.substring(1)
            },
            Gc = function() {
                sc && clearTimeout(sc),
                    uc && clearTimeout(uc)
            },
            Hc = function() {
                var a = Fc(),
                    b = {};
                if (a.length < 5)
                    return b;
                var c, d = a.split("&");
                for (c = 0; c < d.length; c++)
                    if (d[c]) {
                        var e = d[c].split("=");
                        e.length < 2 || (b[e[0]] = e[1])
                    }
                if (i.galleryPIDs) {
                    var f = b.pid;
                    for (b.pid = 0,
                        c = 0; c < Yb.length; c++)
                        if (Yb[c].pid === f) {
                            b.pid = c;
                            break
                        }
                } else
                    b.pid = parseInt(b.pid, 10) - 1;
                return b.pid < 0 && (b.pid = 0),
                    b
            },
            Ic = function() {
                if (uc && clearTimeout(uc),
                    _a || V)
                    return void(uc = setTimeout(Ic, 500));
                vc ? clearTimeout(tc) : vc = !0;
                var a = m + 1,
                    b = _b(m);
                b.hasOwnProperty("pid") && (a = b.pid);
                var c = yc + "&gid=" + i.galleryUID + "&pid=" + a;
                zc || Cc.hash.indexOf(c) === -1 && (Bc = !0);
                var d = Cc.href.split("#")[0] + "#" + c;
                Dc ? "#" + c !== window.location.hash && history[zc ? "replaceState" : "pushState"]("", document.title, d) : zc ? Cc.replace(d) : Cc.hash = c,
                    zc = !0,
                    tc = setTimeout(function() {
                        vc = !1
                    }, 60)
            };
        za("History", {
                publicMethods: {
                    initHistory: function() {
                        if (e.extend(i, Ec, !0),
                            i.history) {
                            Cc = window.location,
                                Bc = !1,
                                Ac = !1,
                                zc = !1,
                                yc = Fc(),
                                Dc = "pushState" in history,
                                yc.indexOf("gid=") > -1 && (yc = yc.split("&gid=")[0],
                                    yc = yc.split("?gid=")[0]),
                                Ca("afterChange", f.updateURL),
                                Ca("unbindEvents", function() {
                                    e.unbind(window, "hashchange", f.onHashChange)
                                });
                            var a = function() {
                                xc = !0,
                                    Ac || (Bc ? history.back() : yc ? Cc.hash = yc : Dc ? history.pushState("", document.title, Cc.pathname + Cc.search) : Cc.hash = ""),
                                    Gc()
                            };
                            Ca("unbindEvents", function() {
                                    l && a()
                                }),
                                Ca("destroy", function() {
                                    xc || a()
                                }),
                                Ca("firstUpdate", function() {
                                    m = Hc().pid
                                });
                            var b = yc.indexOf("pid=");
                            b > -1 && (yc = yc.substring(0, b),
                                    "&" === yc.slice(-1) && (yc = yc.slice(0, -1))),
                                setTimeout(function() {
                                    j && e.bind(window, "hashchange", f.onHashChange)
                                }, 40)
                        }
                    },
                    onHashChange: function() {
                        return Fc() === yc ? (Ac = !0,
                            void f.close()) : void(vc || (wc = !0,
                            f.goTo(Hc().pid),
                            wc = !1))
                    },
                    updateURL: function() {
                        Gc(),
                            wc || (zc ? sc = setTimeout(Ic, 800) : Ic())
                    }
                }
            }),
            e.extend(f, eb)
    };
    return a
});

/*! PhotoSwipe Default UI - 4.1.2 - 2017-04-05
 * http://photoswipe.com
 * Copyright (c) 2017 Dmitry Semenov; */
! function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipeUI_Default = b()
}(this, function() {
    "use strict";
    var a = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = this,
            w = !1,
            x = !0,
            y = !0,
            z = {
                barsSize: {
                    top: 44,
                    bottom: "auto"
                },
                closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
                timeToIdle: 4e3,
                timeToIdleOutside: 1e3,
                loadingIndicatorDelay: 1e3,
                addCaptionHTMLFn: function(a, b) {
                    return a.title ? (b.children[0].innerHTML = a.title, !0) : (b.children[0].innerHTML = "", !1)
                },
                closeEl: !0,
                captionEl: !0,
                fullscreenEl: !0,
                zoomEl: !0,
                shareEl: !0,
                counterEl: !0,
                arrowEl: !0,
                preloaderEl: !0,
                tapToClose: !1,
                tapToToggleControls: !0,
                clickToCloseNonZoomable: !0,
                shareButtons: [{
                    id: "facebook",
                    label: "Share on Facebook",
                    url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
                }, {
                    id: "twitter",
                    label: "Tweet",
                    url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
                }, {
                    id: "pinterest",
                    label: "Pin it",
                    url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
                }, {
                    id: "download",
                    label: "Download image",
                    url: "{{raw_image_url}}",
                    download: !0
                }],
                getImageURLForShare: function() {
                    return a.currItem.src || ""
                },
                getPageURLForShare: function() {
                    return window.location.href
                },
                getTextForShare: function() {
                    return a.currItem.title || ""
                },
                indexIndicatorSep: " / ",
                fitControlsWidth: 1200
            },
            A = function(a) {
                if (r)
                    return !0;
                a = a || window.event,
                    q.timeToIdle && q.mouseUsed && !k && K();
                for (var c, d, e = a.target || a.srcElement, f = e.getAttribute("class") || "", g = 0; g < S.length; g++)
                    c = S[g],
                    c.onTap && f.indexOf("pswp__" + c.name) > -1 && (c.onTap(),
                        d = !0);
                if (d) {
                    a.stopPropagation && a.stopPropagation(),
                        r = !0;
                    var h = b.features.isOldAndroid ? 600 : 30;
                    s = setTimeout(function() {
                        r = !1
                    }, h)
                }
            },
            B = function() {
                return !a.likelyTouchDevice || q.mouseUsed || screen.width > q.fitControlsWidth
            },
            C = function(a, c, d) {
                b[(d ? "add" : "remove") + "Class"](a, "pswp__" + c)
            },
            D = function() {
                var a = 1 === q.getNumItemsFn();
                a !== p && (C(d, "ui--one-slide", a),
                    p = a)
            },
            E = function() {
                C(i, "share-modal--hidden", y)
            },
            F = function() {
                return y = !y,
                    y ? (b.removeClass(i, "pswp__share-modal--fade-in"),
                        setTimeout(function() {
                            y && E()
                        }, 300)) : (E(),
                        setTimeout(function() {
                            y || b.addClass(i, "pswp__share-modal--fade-in")
                        }, 30)),
                    y || H(), !1
            },
            G = function(b) {
                b = b || window.event;
                var c = b.target || b.srcElement;
                return a.shout("shareLinkClick", b, c), !!c.href && (!!c.hasAttribute("download") || (window.open(c.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)),
                    y || F(), !1))
            },
            H = function() {
                for (var a, b, c, d, e, f = "", g = 0; g < q.shareButtons.length; g++)
                    a = q.shareButtons[g],
                    c = q.getImageURLForShare(a),
                    d = q.getPageURLForShare(a),
                    e = q.getTextForShare(a),
                    b = a.url.replace("{{url}}", encodeURIComponent(d)).replace("{{image_url}}", encodeURIComponent(c)).replace("{{raw_image_url}}", c).replace("{{text}}", encodeURIComponent(e)),
                    f += '<a href="' + b + '" target="_blank" class="pswp__share--' + a.id + '"' + (a.download ? "download" : "") + ">" + a.label + "</a>",
                    q.parseShareButtonOut && (f = q.parseShareButtonOut(a, f));
                i.children[0].innerHTML = f,
                    i.children[0].onclick = G
            },
            I = function(a) {
                for (var c = 0; c < q.closeElClasses.length; c++)
                    if (b.hasClass(a, "pswp__" + q.closeElClasses[c]))
                        return !0
            },
            J = 0,
            K = function() {
                clearTimeout(u),
                    J = 0,
                    k && v.setIdle(!1)
            },
            L = function(a) {
                a = a ? a : window.event;
                var b = a.relatedTarget || a.toElement;
                b && "HTML" !== b.nodeName || (clearTimeout(u),
                    u = setTimeout(function() {
                        v.setIdle(!0)
                    }, q.timeToIdleOutside))
            },
            M = function() {
                q.fullscreenEl && !b.features.isOldAndroid && (c || (c = v.getFullscreenAPI()),
                    c ? (b.bind(document, c.eventK, v.updateFullscreen),
                        v.updateFullscreen(),
                        b.addClass(a.template, "pswp--supports-fs")) : b.removeClass(a.template, "pswp--supports-fs"))
            },
            N = function() {
                q.preloaderEl && (O(!0),
                    l("beforeChange", function() {
                        clearTimeout(o),
                            o = setTimeout(function() {
                                a.currItem && a.currItem.loading ? (!a.allowProgressiveImg() || a.currItem.img && !a.currItem.img.naturalWidth) && O(!1) : O(!0)
                            }, q.loadingIndicatorDelay)
                    }),
                    l("imageLoadComplete", function(b, c) {
                        a.currItem === c && O(!0)
                    }))
            },
            O = function(a) {
                n !== a && (C(m, "preloader--active", !a),
                    n = a)
            },
            P = function(a) {
                var c = a.vGap;
                if (B()) {
                    var g = q.barsSize;
                    if (q.captionEl && "auto" === g.bottom)
                        if (f || (f = b.createEl("pswp__caption pswp__caption--fake"),
                                f.appendChild(b.createEl("pswp__caption__center")),
                                d.insertBefore(f, e),
                                b.addClass(d, "pswp__ui--fit")),
                            q.addCaptionHTMLFn(a, f, !0)) {
                            var h = f.clientHeight;
                            c.bottom = parseInt(h, 10) || 44
                        } else
                            c.bottom = g.top;
                    else
                        c.bottom = "auto" === g.bottom ? 0 : g.bottom;
                    c.top = g.top
                } else
                    c.top = c.bottom = 0
            },
            Q = function() {
                q.timeToIdle && l("mouseUsed", function() {
                    b.bind(document, "mousemove", K),
                        b.bind(document, "mouseout", L),
                        t = setInterval(function() {
                            J++,
                            2 === J && v.setIdle(!0)
                        }, q.timeToIdle / 2)
                })
            },
            R = function() {
                l("onVerticalDrag", function(a) {
                    x && a < .95 ? v.hideControls() : !x && a >= .95 && v.showControls()
                });
                var a;
                l("onPinchClose", function(b) {
                        x && b < .9 ? (v.hideControls(),
                            a = !0) : a && !x && b > .9 && v.showControls()
                    }),
                    l("zoomGestureEnded", function() {
                        a = !1,
                            a && !x && v.showControls()
                    })
            },
            S = [{
                name: "caption",
                option: "captionEl",
                onInit: function(a) {
                    e = a
                }
            }, {
                name: "share-modal",
                option: "shareEl",
                onInit: function(a) {
                    i = a
                },
                onTap: function() {
                    F()
                }
            }, {
                name: "button--share",
                option: "shareEl",
                onInit: function(a) {
                    h = a
                },
                onTap: function() {
                    F()
                }
            }, {
                name: "button--zoom",
                option: "zoomEl",
                onTap: a.toggleDesktopZoom
            }, {
                name: "counter",
                option: "counterEl",
                onInit: function(a) {
                    g = a
                }
            }, {
                name: "button--close",
                option: "closeEl",
                onTap: a.close
            }, {
                name: "button--arrow--left",
                option: "arrowEl",
                onTap: a.prev
            }, {
                name: "button--arrow--right",
                option: "arrowEl",
                onTap: a.next
            }, {
                name: "button--fs",
                option: "fullscreenEl",
                onTap: function() {
                    c.isFullscreen() ? c.exit() : c.enter()
                }
            }, {
                name: "preloader",
                option: "preloaderEl",
                onInit: function(a) {
                    m = a
                }
            }],
            T = function() {
                var a, c, e, f = function(d) {
                    if (d)
                        for (var f = d.length, g = 0; g < f; g++) {
                            a = d[g],
                                c = a.className;
                            for (var h = 0; h < S.length; h++)
                                e = S[h],
                                c.indexOf("pswp__" + e.name) > -1 && (q[e.option] ? (b.removeClass(a, "pswp__element--disabled"),
                                    e.onInit && e.onInit(a)) : b.addClass(a, "pswp__element--disabled"))
                        }
                };
                f(d.children);
                var g = b.getChildByClass(d, "pswp__top-bar");
                g && f(g.children)
            };
        v.init = function() {
                b.extend(a.options, z, !0),
                    q = a.options,
                    d = b.getChildByClass(a.scrollWrap, "pswp__ui"),
                    l = a.listen,
                    R(),
                    l("beforeChange", v.update),
                    l("doubleTap", function(b) {
                        var c = a.currItem.initialZoomLevel;
                        a.getZoomLevel() !== c ? a.zoomTo(c, b, 333) : a.zoomTo(q.getDoubleTapZoom(!1, a.currItem), b, 333)
                    }),
                    l("preventDragEvent", function(a, b, c) {
                        var d = a.target || a.srcElement;
                        d && d.getAttribute("class") && a.type.indexOf("mouse") > -1 && (d.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(d.tagName)) && (c.prevent = !1)
                    }),
                    l("bindEvents", function() {
                        b.bind(d, "pswpTap click", A),
                            b.bind(a.scrollWrap, "pswpTap", v.onGlobalTap),
                            a.likelyTouchDevice || b.bind(a.scrollWrap, "mouseover", v.onMouseOver)
                    }),
                    l("unbindEvents", function() {
                        y || F(),
                            t && clearInterval(t),
                            b.unbind(document, "mouseout", L),
                            b.unbind(document, "mousemove", K),
                            b.unbind(d, "pswpTap click", A),
                            b.unbind(a.scrollWrap, "pswpTap", v.onGlobalTap),
                            b.unbind(a.scrollWrap, "mouseover", v.onMouseOver),
                            c && (b.unbind(document, c.eventK, v.updateFullscreen),
                                c.isFullscreen() && (q.hideAnimationDuration = 0,
                                    c.exit()),
                                c = null)
                    }),
                    l("destroy", function() {
                        q.captionEl && (f && d.removeChild(f),
                                b.removeClass(e, "pswp__caption--empty")),
                            i && (i.children[0].onclick = null),
                            b.removeClass(d, "pswp__ui--over-close"),
                            b.addClass(d, "pswp__ui--hidden"),
                            v.setIdle(!1)
                    }),
                    q.showAnimationDuration || b.removeClass(d, "pswp__ui--hidden"),
                    l("initialZoomIn", function() {
                        q.showAnimationDuration && b.removeClass(d, "pswp__ui--hidden")
                    }),
                    l("initialZoomOut", function() {
                        b.addClass(d, "pswp__ui--hidden")
                    }),
                    l("parseVerticalMargin", P),
                    T(),
                    q.shareEl && h && i && (y = !0),
                    D(),
                    Q(),
                    M(),
                    N()
            },
            v.setIdle = function(a) {
                k = a,
                    C(d, "ui--idle", a)
            },
            v.update = function() {
                x && a.currItem ? (v.updateIndexIndicator(),
                        q.captionEl && (q.addCaptionHTMLFn(a.currItem, e),
                            C(e, "caption--empty", !a.currItem.title)),
                        w = !0) : w = !1,
                    y || F(),
                    D()
            },
            v.updateFullscreen = function(d) {
                d && setTimeout(function() {
                        a.setScrollOffset(0, b.getScrollY())
                    }, 50),
                    b[(c.isFullscreen() ? "add" : "remove") + "Class"](a.template, "pswp--fs")
            },
            v.updateIndexIndicator = function() {
                q.counterEl && (g.innerHTML = a.getCurrentIndex() + 1 + q.indexIndicatorSep + q.getNumItemsFn())
            },
            v.onGlobalTap = function(c) {
                c = c || window.event;
                var d = c.target || c.srcElement;
                if (!r)
                    if (c.detail && "mouse" === c.detail.pointerType) {
                        if (I(d))
                            return void a.close();
                        b.hasClass(d, "pswp__img") && (1 === a.getZoomLevel() && a.getZoomLevel() <= a.currItem.fitRatio ? q.clickToCloseNonZoomable && a.close() : a.toggleDesktopZoom(c.detail.releasePoint))
                    } else if (q.tapToToggleControls && (x ? v.hideControls() : v.showControls()),
                    q.tapToClose && (b.hasClass(d, "pswp__img") || I(d)))
                    return void a.close()
            },
            v.onMouseOver = function(a) {
                a = a || window.event;
                var b = a.target || a.srcElement;
                C(d, "ui--over-close", I(b))
            },
            v.hideControls = function() {
                b.addClass(d, "pswp__ui--hidden"),
                    x = !1
            },
            v.showControls = function() {
                x = !0,
                    w || v.update(),
                    b.removeClass(d, "pswp__ui--hidden")
            },
            v.supportsFullscreen = function() {
                var a = document;
                return !!(a.exitFullscreen || a.mozCancelFullScreen || a.webkitExitFullscreen || a.msExitFullscreen)
            },
            v.getFullscreenAPI = function() {
                var b, c = document.documentElement,
                    d = "fullscreenchange";
                return c.requestFullscreen ? b = {
                        enterK: "requestFullscreen",
                        exitK: "exitFullscreen",
                        elementK: "fullscreenElement",
                        eventK: d
                    } : c.mozRequestFullScreen ? b = {
                        enterK: "mozRequestFullScreen",
                        exitK: "mozCancelFullScreen",
                        elementK: "mozFullScreenElement",
                        eventK: "moz" + d
                    } : c.webkitRequestFullscreen ? b = {
                        enterK: "webkitRequestFullscreen",
                        exitK: "webkitExitFullscreen",
                        elementK: "webkitFullscreenElement",
                        eventK: "webkit" + d
                    } : c.msRequestFullscreen && (b = {
                        enterK: "msRequestFullscreen",
                        exitK: "msExitFullscreen",
                        elementK: "msFullscreenElement",
                        eventK: "MSFullscreenChange"
                    }),
                    b && (b.enter = function() {
                            return j = q.closeOnScroll,
                                q.closeOnScroll = !1,
                                "webkitRequestFullscreen" !== this.enterK ? a.template[this.enterK]() : void a.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
                        },
                        b.exit = function() {
                            return q.closeOnScroll = j,
                                document[this.exitK]()
                        },
                        b.isFullscreen = function() {
                            return document[this.elementK]
                        }
                    ),
                    b
            }
    };
    return a
});

/*!
Zoom 1.7.21
license: MIT
http://www.jacklmoore.com/zoom
*/
(function(o) {
    var t = {
        url: !1,
        callback: !1,
        target: !1,
        duration: 120,
        on: "mouseover",
        touch: !0,
        onZoomIn: !1,
        onZoomOut: !1,
        magnify: 1
    };
    o.zoom = function(t, n, e, i) {
            var u, c, a, r, m, l, s, f = o(t),
                h = f.css("position"),
                d = o(n);
            return t.style.position = /(absolute|fixed)/.test(h) ? h : "relative",
                t.style.overflow = "hidden",
                e.style.width = e.style.height = "",
                o(e).addClass("zoomImg").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0,
                    width: e.width * i,
                    height: e.height * i,
                    border: "none",
                    maxWidth: "none",
                    maxHeight: "none"
                }).appendTo(t), {
                    init: function() {
                        c = f.outerWidth(),
                            u = f.outerHeight(),
                            n === t ? (r = c,
                                a = u) : (r = d.outerWidth(),
                                a = d.outerHeight()),
                            m = (e.width - c) / r,
                            l = (e.height - u) / a,
                            s = d.offset()
                    },
                    move: function(o) {
                        var t = o.pageX - s.left,
                            n = o.pageY - s.top;
                        n = Math.max(Math.min(n, a), 0),
                            t = Math.max(Math.min(t, r), 0),
                            e.style.left = t * -m + "px",
                            e.style.top = n * -l + "px"
                    }
                }
        },
        o.fn.zoom = function(n) {
            return this.each(function() {
                var e = o.extend({}, t, n || {}),
                    i = e.target && o(e.target)[0] || this,
                    u = this,
                    c = o(u),
                    a = document.createElement("img"),
                    r = o(a),
                    m = "mousemove.zoom",
                    l = !1,
                    s = !1;
                if (!e.url) {
                    var f = u.querySelector("img");
                    if (f && (e.url = f.getAttribute("data-src") || f.currentSrc || f.src), !e.url)
                        return
                }
                c.one("zoom.destroy", function(o, t) {
                            c.off(".zoom"),
                                i.style.position = o,
                                i.style.overflow = t,
                                a.onload = null,
                                r.remove()
                        }
                        .bind(this, i.style.position, i.style.overflow)),
                    a.onload = function() {
                        function t(t) {
                            f.init(),
                                f.move(t),
                                r.stop().fadeTo(o.support.opacity ? e.duration : 0, 1, o.isFunction(e.onZoomIn) ? e.onZoomIn.call(a) : !1)
                        }

                        function n() {
                            r.stop().fadeTo(e.duration, 0, o.isFunction(e.onZoomOut) ? e.onZoomOut.call(a) : !1)
                        }
                        var f = o.zoom(i, u, a, e.magnify);
                        "grab" === e.on ? c.on("mousedown.zoom", function(e) {
                                1 === e.which && (o(document).one("mouseup.zoom", function() {
                                        n(),
                                            o(document).off(m, f.move)
                                    }),
                                    t(e),
                                    o(document).on(m, f.move),
                                    e.preventDefault())
                            }) : "click" === e.on ? c.on("click.zoom", function(e) {
                                return l ? void 0 : (l = !0,
                                    t(e),
                                    o(document).on(m, f.move),
                                    o(document).one("click.zoom", function() {
                                        n(),
                                            l = !1,
                                            o(document).off(m, f.move)
                                    }), !1)
                            }) : "toggle" === e.on ? c.on("click.zoom", function(o) {
                                l ? n() : t(o),
                                    l = !l
                            }) : "mouseover" === e.on && (f.init(),
                                c.on("mouseenter.zoom", t).on("mouseleave.zoom", n).on(m, f.move)),
                            e.touch && c.on("touchstart.zoom", function(o) {
                                o.preventDefault(),
                                    s ? (s = !1,
                                        n()) : (s = !0,
                                        t(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0]))
                            }).on("touchmove.zoom", function(o) {
                                o.preventDefault(),
                                    f.move(o.originalEvent.touches[0] || o.originalEvent.changedTouches[0])
                            }).on("touchend.zoom", function(o) {
                                o.preventDefault(),
                                    s && (s = !1,
                                        n())
                            }),
                            o.isFunction(e.callback) && e.callback.call(a)
                    },
                    a.setAttribute("role", "presentation"),
                    a.alt = "",
                    a.src = e.url
            })
        },
        o.fn.zoom.defaults = t
})(window.jQuery);

var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.querySelectorAll(".shb-gallery-item:not(.slick-cloned)"),
            numNodes = thumbElements.length,
            items = [],
            figureEl, linkEl, size, item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i];
            // <figure> element

            // include only element nodes
            if (figureEl.nodeType !== 1) {
                continue;
            }

            var imgEl = figureEl.children[0];
            // <img> element

            // create slide object
            item = {
                src: imgEl.getAttribute('data-large'),
                w: parseInt(imgEl.width * 2),
                h: parseInt(imgEl.height * 2)
            };

            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (imgEl.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = imgEl.getAttribute('src');
            }

            item.msrc = imgEl.getAttribute('src');

            item.el = figureEl;
            // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.querySelectorAll(".shb-gallery-item:not(.slick-cloned)"),
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        if (clickedGallery.parentNode.parentNode.getAttribute("inchange") === '0' || clickedGallery.parentNode.parentNode.getAttribute("inchange") === null) {

            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }

            if (index >= 0) {
                // open PhotoSwipe if valid index found
                openPhotoSwipe(index, clickedGallery);
            }
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery, options, items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            fullscreenEl: document.querySelectorAll('.shb-main-gallery')[0].getAttribute('data-fullscreen') === '1',
            shareEl: false,
            zoomEl: false,
            showHideOpacity: !0,
            tapToClose: true,
            closeOnScroll: !1

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

/*
 * Responsively Lazy
 * http://ivopetkov.com/b/lazy-load-responsive-images/
 * Copyright 2015-2017, Ivo Petkov
 * Free to use under the MIT license.
 */
var responsivelyLazy = "undefined" !== typeof responsivelyLazy ? responsivelyLazy : function() {
    var r = !1,
        t = !1,
        l = null,
        p = null,
        m = "undefined" !== typeof IntersectionObserver,
        q = !1,
        u = [],
        v = function(a) {
            if (null === l)
                return !1;
            var b = a.getBoundingClientRect();
            a = b.top;
            var c = b.left,
                d = b.width,
                b = b.height;
            return a < p && 0 < a + b && c < l && 0 < c + d
        },
        w = function(a, b) {
            for (var c = a.length, d = b; d < c; d++) {
                var h = !1,
                    f = a[d],
                    e = document.createElement("script"),
                    g = f.getAttribute("type");
                null !== g && e.setAttribute("type", g);
                g = f.getAttribute("src");
                null !== g && (e.setAttribute("src", g),
                    ("undefined" === typeof f.async || !1 === f.async) && d + 1 < c && (h = !0,
                        e.addEventListener("load", function() {
                            w(a, d + 1)
                        })));
                e.innerHTML = f.innerHTML;
                f.parentNode.insertBefore(e, f);
                f.parentNode.removeChild(f);
                if (h)
                    break
            }
        },
        x = function(a, b) {
            var c = b.getAttribute("data-srcset");
            if (null !== c)
                if (c = c.trim(),
                    0 < c.length) {
                    var c = c.split(","),
                        d = [];
                    var h = c.length;
                    for (var f = 0; f < h; f++) {
                        var e = c[f].trim();
                        if (0 !== e.length) {
                            var g = e.lastIndexOf(" ");
                            if (-1 === g) {
                                var k = e;
                                e = 999998
                            } else
                                k = e.substr(0, g),
                                e = parseInt(e.substr(g + 1, e.length - g - 2), 10);
                            g = !1; -
                            1 !== k.indexOf(".webp", k.length - 5) ? r && (g = !0) : g = !0;
                            g && d.push([k, e])
                        }
                    }
                    d.sort(function(a, b) {
                        if (a[1] < b[1])
                            return -1;
                        if (a[1] > b[1])
                            return 1;
                        if (a[1] === b[1]) {
                            if (-1 !== b[0].indexOf(".webp", b[0].length - 5))
                                return 1;
                            if (-1 !== a[0].indexOf(".webp", a[0].length - 5))
                                return -1
                        }
                        return 0
                    });
                    c = d
                } else
                    c = [];
            else
                c = [];
            k = a.offsetWidth * ("undefined" !== typeof window.devicePixelRatio ? window.devicePixelRatio : 1);
            d = null;
            h = c.length;
            for (f = 0; f < h; f++)
                if (e = c[f],
                    e[1] >= k) {
                    d = e;
                    break
                }
            null === d && (d = [b.getAttribute("src"), 999999]);
            "undefined" === typeof a.responsivelyLazyLastSetOption && (a.responsivelyLazyLastSetOption = ["", 0]);
            a.responsivelyLazyLastSetOption[1] < d[1] && (a.responsivelyLazyLastSetOption = d,
                h = d[0],
                "undefined" === typeof a.responsivelyLazyEventsAttached && (a.responsivelyLazyEventsAttached = !0,
                    b.addEventListener("load", function() {
                        var b = a.getAttribute("data-onlazyload");
                        null !== b && (new Function(b)).bind(a)()
                    }, !1),
                    b.addEventListener("error", function() {
                        a.responsivelyLazyLastSetOption = ["", 0]
                    }, !1)),
                h === b.getAttribute("src") ? b.removeAttribute("srcset") : b.setAttribute("srcset", h))
        },
        y = function(a) {
            if (-1 === u.indexOf(a) && v(a)) {
                var b = a.getAttribute("data-lazycontent");
                null !== b ? (u.push(a),
                    q = !0,
                    a.innerHTML = b,
                    a = a.querySelectorAll("script"),
                    0 < a.length && w(a, 0),
                    q = !1) : t && ("img" === a.tagName.toLowerCase() ? x(a, a) : (b = a.querySelector("img"),
                    null !== b && x(a, b)))
            }
        },
        z = function() {
            for (var a = document.querySelectorAll(".responsively-lazy"), b = a.length, c = 0; c < b; c++)
                y(a[c])
        };
    if ("undefined" !== typeof window.addEventListener && "undefined" !== typeof document.querySelectorAll) {
        var l = window.innerWidth,
            p = window.innerHeight,
            n = new Image;
        n.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEADMDOJaQAA3AA/uuuAAA=";
        n.onload = n.onerror = function() {
            r = 2 === n.width;
            t = "srcset" in document.createElement("img");
            var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) {
                    window.setTimeout(a, 1E3 / 60)
                },
                b = !0,
                c = function() {
                    b && (b = !1,
                        z());
                    a.call(null, c)
                };
            c();
            if (m) {
                var d = function() {
                    for (var a = document.querySelectorAll(".responsively-lazy"), b = a.length, c = 0; c < b; c++) {
                        var e = a[c];
                        "undefined" === typeof e.responsivelyLazyObserverAttached && (e.responsivelyLazyObserverAttached = !0,
                            h.observe(e))
                    }
                };
                var h = new IntersectionObserver(function(a) {
                    for (var b in a) {
                        var c = a[b];
                        0 < c.intersectionRatio && y(c.target)
                    }
                });
                var f = null
            }
            var e = function() {
                    m ? (window.clearTimeout(f),
                        f = window.setTimeout(function() {
                            b = !0
                        }, 300)) : b = !0
                },
                g = function() {
                    for (var a = document.querySelectorAll(".responsively-lazy"), b = a.length, c = 0; c < b; c++)
                        for (var d = a[c].parentNode; d && "html" !== d.tagName.toLowerCase();)
                            "undefined" === typeof d.responsivelyLazyScrollAttached && (d.responsivelyLazyScrollAttached = !0,
                                d.addEventListener("scroll", e)),
                            d = d.parentNode
                },
                k = function() {
                    window.addEventListener("resize", function() {
                        l = window.innerWidth;
                        p = window.innerHeight;
                        e()
                    });
                    window.addEventListener("scroll", e);
                    window.addEventListener("load", e);
                    m && d();
                    g();
                    "undefined" !== typeof MutationObserver && (new MutationObserver(function() {
                        q || (m && d(),
                            g(),
                            e())
                    })).observe(document.querySelector("body"), {
                        childList: !0,
                        subtree: !0
                    })
                };
            "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", k) : k()
        }
    }
    return {
        run: z,
        isVisible: v
    }
}();
/*
 * jRange
 * */
! function($, t, i, s) {
    "use strict";
    var o = function() {
        return this.init.apply(this, arguments)
    };
    o.prototype = {
        defaults: {
            onstatechange: function() {},
            ondragend: function() {},
            onbarclicked: function() {},
            isRange: !1,
            showLabels: !0,
            showScale: !0,
            step: 1,
            format: "%s",
            theme: "theme-green",
            width: 300,
            disable: !1,
            snap: !1
        },
        template: '<div class="slider-container">			<div class="back-bar">                <div class="selected-bar"></div>                <div class="pointer low"></div><div class="pointer-label low">123456</div>                <div class="pointer high"></div><div class="pointer-label high">456789</div>                <div class="clickable-dummy"></div>            </div>            <div class="scale"></div>		</div>',
        init: function(t, i) {
            this.options = $.extend({}, this.defaults, i),
                this.inputNode = $(t),
                this.options.value = this.inputNode.val() || (this.options.isRange ? this.options.from + "," + this.options.from : "" + this.options.from),
                this.domNode = $(this.template),
                this.domNode.addClass(this.options.theme),
                this.inputNode.after(this.domNode),
                this.domNode.on("change", this.onChange),
                this.pointers = $(".pointer", this.domNode),
                this.lowPointer = this.pointers.first(),
                this.highPointer = this.pointers.last(),
                this.labels = $(".pointer-label", this.domNode),
                this.lowLabel = this.labels.first(),
                this.highLabel = this.labels.last(),
                this.scale = $(".scale", this.domNode),
                this.bar = $(".selected-bar", this.domNode),
                this.clickableBar = this.domNode.find(".clickable-dummy"),
                this.interval = this.options.to - this.options.from,
                this.render()
        },
        render: function() {
            return 0 !== this.inputNode.width() || this.options.width ? (this.options.width = this.options.width || this.inputNode.width(),
                this.domNode.width(this.options.width),
                this.inputNode.hide(),
                this.isSingle() && (this.lowPointer.hide(),
                    this.lowLabel.hide()),
                this.options.showLabels || this.labels.hide(),
                this.attachEvents(),
                this.options.showScale && this.renderScale(),
                void this.setValue(this.options.value)) : void console.log("jRange : no width found, returning")
        },
        isSingle: function() {
            return "number" == typeof this.options.value ? !0 : -1 === this.options.value.indexOf(",") && !this.options.isRange
        },
        attachEvents: function() {
            this.clickableBar.click($.proxy(this.barClicked, this)),
                this.pointers.on("mousedown touchstart", $.proxy(this.onDragStart, this)),
                this.pointers.bind("dragstart", function(t) {
                    t.preventDefault()
                })
        },
        onDragStart: function(t) {
            if (!(this.options.disable || "mousedown" === t.type && 1 !== t.which)) {
                t.stopPropagation(),
                    t.preventDefault();
                var s = $(t.target);
                this.pointers.removeClass("last-active"),
                    s.addClass("focused last-active"),
                    this[(s.hasClass("low") ? "low" : "high") + "Label"].addClass("focused"),
                    $(i).on("mousemove.slider touchmove.slider", $.proxy(this.onDrag, this, s)),
                    $(i).on("mouseup.slider touchend.slider touchcancel.slider", $.proxy(this.onDragEnd, this))
            }
        },
        onDrag: function(t, i) {
            i.stopPropagation(),
                i.preventDefault(),
                i.originalEvent.touches && i.originalEvent.touches.length ? i = i.originalEvent.touches[0] : i.originalEvent.changedTouches && i.originalEvent.changedTouches.length && (i = i.originalEvent.changedTouches[0]);
            var s = i.clientX - this.domNode.offset().left;
            this.domNode.trigger("change", [this, t, s])
        },
        onDragEnd: function(t) {
            this.pointers.removeClass("focused").trigger("rangeslideend"),
                this.labels.removeClass("focused"),
                $(i).off(".slider"),
                this.options.ondragend.call(this, this.options.value)
        },
        barClicked: function(t) {
            if (!this.options.disable) {
                var i = t.pageX - this.clickableBar.offset().left;
                if (this.isSingle())
                    this.setPosition(this.pointers.last(), i, !0, !0);
                else {
                    var s = Math.abs(parseFloat(this.pointers.first().css("left"), 10)),
                        o = this.pointers.first().width() / 2,
                        e = Math.abs(parseFloat(this.pointers.last().css("left"), 10)),
                        n = this.pointers.first().width() / 2,
                        a = Math.abs(s - i + o),
                        h = Math.abs(e - i + n),
                        l;
                    l = a == h ? s > i ? this.pointers.first() : this.pointers.last() : h > a ? this.pointers.first() : this.pointers.last(),
                        this.setPosition(l, i, !0, !0)
                }
                this.options.onbarclicked.call(this, this.options.value)
            }
        },
        onChange: function(t, i, s, o) {
            var e, n;
            e = 0,
                n = i.domNode.width(),
                i.isSingle() || (e = s.hasClass("high") ? parseFloat(i.lowPointer.css("left")) + i.lowPointer.width() / 2 : 0,
                    n = s.hasClass("low") ? parseFloat(i.highPointer.css("left")) + i.highPointer.width() / 2 : i.domNode.width());
            var a = Math.min(Math.max(o, e), n);
            i.setPosition(s, a, !0)
        },
        setPosition: function(t, i, s, o) {
            var e, n, a = parseFloat(this.lowPointer.css("left")),
                h = parseFloat(this.highPointer.css("left")) || 0,
                l = this.highPointer.width() / 2;
            if (s || (i = this.prcToPx(i)),
                this.options.snap) {
                var r = this.correctPositionForSnap(i);
                if (-1 === r)
                    return;
                i = r
            }
            t[0] === this.highPointer[0] ? h = Math.round(i - l) : a = Math.round(i - l),
                t[o ? "animate" : "css"]({
                    left: Math.round(i - l)
                }),
                this.isSingle() ? e = 0 : (e = a + l,
                    n = h + l);
            var d = Math.round(h + l - e);
            this.bar[o ? "animate" : "css"]({
                    width: Math.abs(d),
                    left: d > 0 ? e : e + d
                }),
                this.showPointerValue(t, i, o),
                this.isReadonly()
        },
        correctPositionForSnap: function(t) {
            var i = this.positionToValue(t) - this.options.from,
                s = this.options.width / (this.interval / this.options.step),
                o = i / this.options.step * s;
            return o + s / 2 >= t && t >= o - s / 2 ? o : -1
        },
        setValue: function(t) {
            var i = t.toString().split(",");
            i[0] = Math.min(Math.max(i[0], this.options.from), this.options.to) + "",
                i.length > 1 && (i[1] = Math.min(Math.max(i[1], this.options.from), this.options.to) + ""),
                this.options.value = t;
            var s = this.valuesToPrc(2 === i.length ? i : [0, i[0]]);
            this.isSingle() ? this.setPosition(this.highPointer, s[1]) : (this.setPosition(this.lowPointer, s[0]),
                this.setPosition(this.highPointer, s[1]))
        },
        renderScale: function() {
            for (var t = this.options.scale || [this.options.from, this.options.to], i = Math.round(100 / (t.length - 1) * 10) / 10, s = "", o = 0; o < t.length; o++)
                s += '<span style="left: ' + o * i + '%">' + ("|" != t[o] ? "<ins>" + t[o] + "</ins>" : "") + "</span>";
            this.scale.html(s),
                $("ins", this.scale).each(function() {
                    $(this).css({
                        marginLeft: -$(this).outerWidth() / 2
                    })
                })
        },
        getBarWidth: function() {
            var t = this.options.value.split(",");
            return t.length > 1 ? parseFloat(t[1]) - parseFloat(t[0]) : parseFloat(t[0])
        },
        showPointerValue: function(t, i, o) {
            var e = $(".pointer-label", this.domNode)[t.hasClass("low") ? "first" : "last"](),
                n, a = this.positionToValue(i);
            if ($.isFunction(this.options.format)) {
                var h = this.isSingle() ? s : t.hasClass("low") ? "low" : "high";
                n = this.options.format(a, h)
            } else
                n = this.options.format.replace("%s", a);
            var l = e.html(n).width(),
                r = i - l / 2;
            r = Math.min(Math.max(r, 0), this.options.width - l),
                e[o ? "animate" : "css"]({
                    left: r
                }),
                this.setInputValue(t, a)
        },
        valuesToPrc: function(t) {
            var i = 100 * (parseFloat(t[0]) - parseFloat(this.options.from)) / this.interval,
                s = 100 * (parseFloat(t[1]) - parseFloat(this.options.from)) / this.interval;
            return [i, s]
        },
        prcToPx: function(t) {
            return this.domNode.width() * t / 100
        },
        isDecimal: function() {
            return -1 !== (this.options.value + this.options.from + this.options.to).indexOf(".")
        },
        positionToValue: function(t) {
            var i = t / this.domNode.width() * this.interval;
            if (i = parseFloat(i, 10) + parseFloat(this.options.from, 10),
                this.isDecimal()) {
                var s = Math.round(Math.round(i / this.options.step) * this.options.step * 100) / 100;
                if (0 !== s)
                    for (s = "" + s, -1 === s.indexOf(".") && (s += "."); s.length - s.indexOf(".") < 3;)
                        s += "0";
                else
                    s = "0.00";
                return s
            }
            return Math.round(i / this.options.step) * this.options.step
        },
        setInputValue: function(t, i) {
            if (this.isSingle())
                this.options.value = i.toString();
            else {
                var s = this.options.value.split(",");
                t.hasClass("low") ? this.options.value = i + "," + s[1] : this.options.value = s[0] + "," + i
            }
            this.inputNode.val() !== this.options.value && (this.inputNode.val(this.options.value).trigger("change"),
                this.options.onstatechange.call(this, this.options.value))
        },
        getValue: function() {
            return this.options.value
        },
        getOptions: function() {
            return this.options
        },
        getRange: function() {
            return this.options.from + "," + this.options.to
        },
        isReadonly: function() {
            this.domNode.toggleClass("slider-readonly", this.options.disable)
        },
        disable: function() {
            this.options.disable = !0,
                this.isReadonly()
        },
        enable: function() {
            this.options.disable = !1,
                this.isReadonly()
        },
        toggleDisable: function() {
            this.options.disable = !this.options.disable,
                this.isReadonly()
        },
        updateRange: function(t, i) {
            var s = t.toString().split(",");
            this.interval = parseInt(s[1]) - parseInt(s[0]),
                i ? this.setValue(i) : this.setValue(this.getValue())
        }
    };
    var e = "jRange";
    $.fn[e] = function(i) {
        var s = arguments,
            n;
        return this.each(function() {
                var a = $(this),
                    h = $.data(this, "plugin_" + e),
                    l = "object" == typeof i && i;
                h || (a.data("plugin_" + e, h = new o(this, l)),
                        $(t).resize(function() {
                            h.setValue(h.getValue())
                        })),
                    "string" == typeof i && (n = h[i].apply(h, Array.prototype.slice.call(s, 1)))
            }),
            n || this
    }
}(jQuery, window, document);