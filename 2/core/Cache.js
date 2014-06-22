/**
 * Cache模块
 */
(function (window, undefined, $) {

    "use strict";

    var Cache = function (ticket) {
        this.ticket = ( ticket ) ? ticket : "";
    };

    /**
     * 生成存取HASH KEY
     * @param key
     * @returns {*}
     * @private
     */
    Cache.prototype._generateKey = function (key) {
        key = this.ticket + "_" + key;
        key = $.md5(key);
        return key;
    };

    /**
     * 获取或者读取cache
     * @param key
     * @param val
     * @param expires
     * @returns {*}
     */
    Cache.prototype.val = function (key, val, expires) {
        key = this._generateKey(key);
        if (val) {
            return this.set(key, val, expires);
        } else {
            return this.get(key);
        }
    };

    /**
     * 获取一个cache
     * @param key
     * @returns {*}
     */
    Cache.prototype.get = function (key) {
        key = this._generateKey(key);
        return $.cache.get(key);
    };

    /**
     * 设置一个cache
     * @param key
     * @param val
     * @param expires
     * @returns {boolean|*}
     */
    Cache.prototype.set = function (key, val, expires) {
        key = this._generateKey(key);
        return $.cache.set(key, val, expires);
    };
    /**
     * 删除一个cache
     * @param key
     * @returns {*}
     */
    Cache.prototype.remove = function (key) {
        key = this._generateKey(key);
        return $.cache.remove(key);
    };
    /**
     * 清楚所有cache
     */
    Cache.prototype.clear = function () {
        $.cache.clear();
    };

    window.Cache = Cache;

}(window, undefined, S));