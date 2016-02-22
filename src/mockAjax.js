/**
 * Created by zhangyatao on 16/1/14.
 */
(function (global, $) {
    if ($ === void 0) {
        throw new Error('please use jQuery');
    }
    var toString = Object.prototype.toString;
    var Mapping = function (queue) {
        this.queue = queue || [];
    };
    Mapping.prototype = {
        isPureObject: function (data) {
            return !!(toString.call(data) === '[object Object]' && data.constructor === Object);
        },
        getItem: function (src) {
            src = String(src);
            var temp = null;
            for (var i = 0, l = this.queue.length; i < l; i++) {
                temp = this.queue[i];
                if (temp.url === src) {
                    break;
                }
            }
            return temp;
        },
        pushQueue: function (infos) {
            var res = null;
            var me = this;
            if (toString.call(infos) !== '[object Array]') {
                if (!me.isPureObject(infos)) {
                    throw new Error('please set pure object');
                }
                res = [infos]
            }
            $.each(res, function (inde, item) {
                me.check(item);
            });
            [].push.apply(this.queue, res);
        },
        /**
         * check param
         * @param data {Object} param
         */
        check: function (data) {
            if (data.url === void 0) {
                throw new Error('You must set the url attribute');
            }
            data.url = String(data.url);
            if (typeof data.infos === 'string') {
                data.infos = {success: data.infos};
            }
            data.status = data.status || 'success';
            data.wait = data.wait || 0;
        }
    };
    var map = new Mapping();
    var setWait = function (time, callback) {
        var sym = null;
        if (toString.call(time) === '[object Boolean]') {
            sym = time;
        } else {
            sym = time > 0;
        }
        if (sym) {
            setTimeout(function () {
                callback.call(null);
            }, time | 0)
        } else {
            callback.call(null)
        }
    };
    var mockAjax = function (options) {
        var deferred = $.Deferred();
        var item = map.getItem(options.url || '');
        var suc = function () {
            options.success && options.success.call(options.context, item.infos.success);
            deferred.resolve(item.infos.success);
            options.complete && options.complete();
        };
        var err = function () {
            options.error && options.error.call(options.context, item.infos.error);
            deferred.reject(item.infos.error);
            options.complete && options.complete();
        };
        setWait(options.async, function () {
            options.beforeSend && options.beforeSend();
            switch (item.status) {
                case 'success':
                    setWait(item.wait, function () {
                        suc();
                    });
                    break;
                case 'error':
                    setWait(item.wait, function () {
                        err();
                    });
                    break;
                case 'timeout':
                    if (!options.timeout) {
                        throw new Error('not set timeout');
                    }
                    setTimeout(function () {
                        err();
                    }, options.timeout);
                    break;
            }
        });
        return deferred.promise();
    };
    /**
     * set mock info
     * @config {Object} config mock信息
     */
    mockAjax.setMockMap = function (config) {
        map.pushQueue(config);
    };
    /**
     * initialization mock status
     */
    mockAjax.init = function () {
        var origin = $.ajax;
        $.ajax = function (options) {
            if (options.mock === true) {
                return mockAjax(options);
            } else {
                return origin(options)
            }
        }
    };
    $.extend({
        mockAjax: mockAjax
    });
})(window, jQuery);
