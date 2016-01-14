/**
 * Created by zhangyatao on 16/1/14.
 */
(function (global, $) {
    if ($ === void 0) {
        throw new Error('please use jQuery');
    }
    var Mapping = function (queue) {
        this.queue = queue || [];
    };
    Mapping.prototype = {
        isPureObject: function (data) {
            return !!(Object.prototype.toString.call(data) === '[object Object]' && data.constructor === Object);
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
            if (Object.prototype.toString.call(infos) !== '[object Array]') {
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
        if (time > 0) {
            setTimeout(function () {
                callback.call(null);
            }, time)
        } else {
            callback.call(null)
        }
    };
    var mockAjax = function (options) {
        var deferred = $.Deferred();
        var item = map.getItem(options.url || '');
        switch (item.status) {
            case 'success':
                setWait(item.wait, function () {
                    options.success(item.infos.success);
                    deferred.resolve(item.infos.success);
                });
                break;
            case 'error':
                setWait(item.wait, function () {
                    options.error(item.infos.error);
                    deferred.reject(item.infos.error);
                });
                break;
            case 'timeout':
                if (!options.timeout) {
                    throw new Error('not set timeout');
                }
                setTimeout(function () {
                    options.error(item.infos.error);
                    deferred.reject(item.infos.error);
                }, options.timeout);
                break;
        }
        return deferred.promise();
    };
//            var con = [
//                {
//                    url: '',
//                    infos: {
//                        success: '',
//                        error: ''
//                    },
//                    status: 'timeout'
//                },
//                {
//                    url: '',
//                    infos: {
//                        success: '',
//                        error: ''
//                    },
//                    status: 'timeout'
//                }];
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
        ///<summary>
        /// apply a slider UI
        ///</summary>
        mockAjax: mockAjax
    });
})(window, jQuery);