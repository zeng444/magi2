/**
 * 网页历史的存储器
 * 需要传入当前APP的Cache对象
 */
(function (window, undefined, $) {

    "use strict";

    var Historys = function (cacheObject) {

        //cache对象
        this.cache = cacheObject;

        //存取history的键名
        this.key = "magi_history_list";

        //如果有缓存从缓存中继承历史记录
        var list = this._getListCache();

        //历史页路由记录
        this.list = ( list ) ? list : [];

        //历史记录条数
        this.page_number = 20;

    };


    /**
     * 记录一条历史记录 ["index","index",{id:9}],["index","index"]
     * @param _class
     * @param _method
     * @param _query
     * @returns {*}
     */
    Historys.prototype.write = function (_class, _method, _query) {

        var absolute_page, historyList = this.lists();
        if (historyList.length >= this.page_number + 1) {
            this.remove(0);
        }
        _query = ( _query) ? _query : {};
        absolute_page = [_class, _method, _query];
        this.list.push(absolute_page);
        return  this._save();

    };


    /**
     * 删除一条历史记录
     * @param index 索引从0开始
     */
    Historys.prototype.remove = function (index) {

        index = parseInt(index);
        this.list.splice(index, 1);
        return this._save();

    };

    /**
     * 清空浏览器日志
     * @param index
     */
    Historys.prototype.clear = function () {
        this.list = [];
        return this.cache.remove(this.key);

    };

    /**
     * 获得浏览器日志
     * @returns {*}
     */
    Historys.prototype.lists = function () {
        return this.list;
    };


    /**
     * 将变量中记录的历史记录存储到APP Cache
     */
    Historys.prototype._save = function () {
        return  this.cache.set(this.key, this.list);
    };

    /**
     * 从App CACHE获得浏览器日志
     * @private
     */
    Historys.prototype._getListCache = function () {
        this.cache.get(this.key);
    };

    window.Historys = Historys;

}(window, undefined, S));