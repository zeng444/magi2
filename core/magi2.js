//Name:Magi
//Author:zengweiqi
//Descreption: mini handphone js-framework of MVC-SPA for luohu-wifi;
//Mail:zeng444@163.com
(function (window, $) {

    //系统版本
    var magi_version = '2.0';

    //默认配置文件
    var defult_define = {


        is_mvc: true,

        view_path: 'themes/',

        module_path: 'model/',

        controller_path: 'controller/',

        default_controller: 'index',

        default_action: 'index',

        //app场景容器名
        app_playground_obj: '',

        //app容器
        playground_name: 'contenter',

        ajax_tip_class: '_ajax_loading',

        //默认页面切换样式
        default_page_effection: 'swipeleft',

        is_header_footer_transition_fixed: true,

        //默认的GET参数
        default_query: {},

        //是否开启模版缓存
        is_use_tpl_cache: false,

        tpl_rule: '{$class}.{$method}.html',

        //加载扩展JS文件
        extend_utility: [],


        default_controller_construct: undefined

    };


    var magi = function (config) {

        if (!this._browser_not_support()) {


            //配置文件
            this.config = this._check_config(config);

            //lazyload模块，加载JS扩展文件
            this.lasyload = new lasyload();

            //初始化场景
            this.playground = new playground({

                playground_name: this.config.playground_name,
                app_playground_obj: this.config.app_playground_obj

            });

            //当前_get对象
            this._get = [];

            //当前控制器
            this._class = '';

            //当前控制器方法
            this._method = '';

            //网页浏览记录对象
            this.history = new phistory(this.config.playground_name);

            //路由对象
            this.route = new route(this.history, this.config);

            //实例化缓存对象
            this.cache = new cache();

            //被缓存的模版文件名
            this.cache_tpl_filename = '_magi_page_cache.js';

        }


    }


    magi.prototype._check_config = function (parmas) {

        if (parmas) {

            if (parmas.module_path) defult_define.module_path = parmas.module_path;

            if (parmas.controller_path) defult_define.controller_path = parmas.controller_path;

            if (parmas.view_path) defult_define.view_path = parmas.view_path;

            if (parmas.default_controller) defult_define.default_controller = parmas.default_controller;

            if (parmas.default_action) defult_define.default_action = parmas.default_action;

            if (parmas.default_query) defult_define.default_query = parmas.default_query;


            if (parmas.default_page_effection) defult_define.default_page_effection = parmas.default_page_effection;

            if (parmas.playground_name) defult_define.playground_name = parmas.playground_name;

            if (parmas.ajax_tip_class) defult_define.ajax_tip_class = parmas.ajax_tip_class;

            if (parmas.extend_utility) defult_define.extend_utility = parmas.extend_utility;

            if (parmas.tpl_rule) defult_define.tpl_rule = parmas.tpl_rule;

            if (parmas.default_controller_construct) defult_define.default_controller_construct = parmas.default_controller_construct;

            if (parmas.is_header_footer_transition_fixed) defult_define.is_header_footer_transition_fixed = parmas.is_header_footer_transition_fixed;

            if (parmas.app_playground_obj) defult_define.app_playground_obj = parmas.app_playground_obj;

            if (typeof(parmas.is_use_tpl_cache) == 'boolean') defult_define.is_use_tpl_cache = parmas.is_use_tpl_cache;

            if (typeof(parmas.is_mvc) == 'boolean') defult_define.is_mvc = parmas.is_mvc;
        }
        return defult_define;

    }

    //启动框架
    magi.prototype.startup = function () {

        if (this.config) {

            //当使用模版缓存模式时扩展load中增加模版文件的载入
            if (this.config.is_use_tpl_cache) {

                this.config.extend_utility.push(this.config.view_path + this.config.cache_tpl_filename);

            }

            //加载扩展文件
            this.lasyload.files(this.config.extend_utility, this._start_script);


        }


    };

    //初始化脚本
    magi.prototype._start_script = function () {

        //初始化场景
        this.playground.create();

        var url_route_info = this.route.url_to_route();

        //全局_get参数
        this._get = ( url_route_info._query ) ? url_route_info._query : this.config.default_query;

        //全局控制器_class对象
        this._class = ( url_route_info._class ) ? url_route_info._class : this.config.default_controller;
        //全局控制器方法_method
        this._method = ( url_route_info._method ) ? url_route_info._method : this.config.default_action;

        // this.history.clear();

        //开始载入路由
        this.route.to(this._class, this._method, this._get, this.config.default_page_effection);


    }

    //输出框架版本
    magi.prototype.version = function () {
        return magi_version;
    }

    //检查浏览器是否支持
    magi.prototype._browser_not_support = function () {

        if ($.navigator.is_ie() && !$.navigator.is_ie10() && !$.navigator.is_ie9()) {
            $('body')[0].innerHTML = ('<div style="margin:15px;"><h2>Magi js-framework ' + this.version() + '</h2><span>Notice:This framework do not  support absolute browser ,you can try to webkit or mozila browser<br />if you want get more infomation you can mail to:<a href="mailto:zeng444@163.com">zeng444@163.com</a></span></div>');
            return true;
        }

    }


    window.magi = magi;

})(window, $);
 