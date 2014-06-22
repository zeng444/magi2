/**
 * Created by robert on 14-6-21.
 */
(function (window, undefined, $) {

    "use strict";

    var MAGI_VERSION, DEFAULT_DEFINE, Magi;
    //系统版本
    MAGI_VERSION = "2.0";

    DEFAULT_DEFINE = {

        view_path: "themes/",

        module_path: "model/",

        controller_path: "controller/",

        default_controller: "index",

        default_action: "index",

        //app容器obj
        scene_box: "",

        //app容器的ID
        app_id: "content",

        default_query: {},

        //加载扩展JS文件
        extend_utility: []

    };


    /**
     * 创建对象
     * @param config
     * @constructor
     */
    Magi = function (config) {

        if (!this._browserNotSupport()) {

            //配置文件
            this.config = this._initConfig(config);

            //一个APP实例的唯一ID
            this.appId = this.appUniqueId(this.config.app_id);

            //初始化_get对象
            this._get = {};

            //初始化当前控制器
            this._class = "";

            //初始化当前控制器方法
            this._method = "";

            //初始化场景控制器
            this.scene = new Scene(this.config.scene_box, this.appId);

            //lazyload模块，异步加载扩展文件
            this.lazyLoad = new LazyLoad();

            //实例化缓存对象
            this.cache = new Cache(this.config.scene_box, this.appId);

            //浏览器历史存取对象
            this.history = new Historys(this.cache);

        }

    };

    Magi.prototype.startup = function () {
        this.scene.createTo();
    };

    /**
     * 生成应用唯一ID
     * @param key
     * @returns {*}
     */
    Magi.prototype.appUniqueId = function (key) {
        return  $.md5(key);
    };
    /**
     * 初始化配置文件
     * @private
     */
    Magi.prototype._initConfig = function (config) {
        if (!config) {
            config = {};
        }
        if (!config.view_path) {
            config.view_path = DEFAULT_DEFINE.view_path;
        }
        if (!config.module_path) {
            config.module_path = DEFAULT_DEFINE.module_path;
        }
        if (!config.controller_path) {
            config.controller_path = DEFAULT_DEFINE.controller_path;
        }
        if (!config.default_action) {
            config.default_action = DEFAULT_DEFINE.default_action;
        }
        if (!config.default_query) {
            config.default_query = DEFAULT_DEFINE.default_query;
        }
        if (!config.extend_utility) {
            config.extend_utility = DEFAULT_DEFINE.extend_utility;
        }
        if (!config.app_id) {
            config.app_id = DEFAULT_DEFINE.app_id;
        }

        return config;


    };
    /**
     * 检查浏览器是否支持
     * @returns {boolean}
     * @private
     */
    Magi.prototype._browserNotSupport = function () {

        if ($.browser.isIe() && 1 === 3) {
            $("body")[0].innerHTML = ("<div style=\"margin:15px;\"><h2>Magi js-framework " + this.version() + "</h2><span>Notice:Magi do not  support this browser ,you can try to webkit or mozila browser<br />if you want get more infomation you can mail to:<a href=\"mailto:zeng444@163.com\">zeng444@163.com</a></span></div>");
            return true;
        }
    };

    Magi.prototype.version = function () {
        return MAGI_VERSION;
    };

    window.Magi = Magi;

}(window, undefined, S));

