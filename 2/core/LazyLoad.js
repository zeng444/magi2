/**
 * JS图片等文件动态加载
 */
(function (window, undefined, $) {

    "use strict";

    var LazyLoad = function () {

        //缓载成功的脚本文件列表
//        this.loadedScriptList = {};
        window.loadedScriptList={};

        //加载一组JS文件最大超时时间
        this.scriptListExpires = 30000;

        //加载单张图片超时时间
        this.imageExpires = 15000;

        //允许加载的图片文件后缀
        this.allowImageExt = [ "jpg", "jpeg", "bmp", "gif", "png"];

    };

    /**
     * 检查是否是一个符合图片规范的文件
     * @param file
     * @returns {*}
     * @private
     */
    LazyLoad.prototype._getFileExt = function (file) {
        var ext = (/\.([^\.]+)$/).exec(file);
        if (ext) {
            return ext[1].toLowerCase();
        }
    };
    /**
     * 加载一个文件，可以是图片或者是脚本
     * @param file
     * @param callBack
     */
    LazyLoad.prototype.file = function (file, callBack) {
        var fileExtStr = this._getFileExt(file);
        if (fileExtStr === "js") {
            this.script(file, callBack);
        } else {
            this.image(file, callBack);
        }
    };

    /**
     * 下载一组文件，可以是图片或者是脚本
     * @param fileList
     * @param callBack 格式callBack(complete,count) 每次加载成功一个文件都会回调一次
     */
    LazyLoad.prototype.files = function (fileList, callBack) {
        var i, _callback, count = fileList.length, complete = 0;
        _callback = function () {
            if (callBack) {
                callBack(++complete, count);
            }
        };
        for (i in fileList) {
            this.file(fileList[i], _callback);
        }
    };

    /**
     * 加载一张图片
     * @param file
     * @param callBack
     */
    LazyLoad.prototype.image = function (file, callBack) {
        var image, isCallBacked = false, ext = this._getFileExt(file);
        if ($.inArray(ext, this.allowImageExt)) {
            image = new Image();
            image.onload = function () {
                if (callBack && !isCallBacked) {
                    isCallBacked = true;
                    callBack();
                }
            };
            image.src = file;
            setTimeout(function () {
                if (!isCallBacked && callBack) {
                    isCallBacked = true;
                    callBack();
                }
            }, this.imageExpires);
        }
    };

    /**
     * 记载一组图片
     * @param fileList
     * @param callBack
     */
    LazyLoad.prototype.images = function (fileList, callBack) {
        if (fileList[0]) {
            var rateWatch, i, absoluteRateIncrease, absoluteRate = 0, loadedRate = fileList.length;
            rateWatch = setInterval(function () {
                if (loadedRate === absoluteRate) {
                    clearInterval(rateWatch);
                    if (callBack) {
                        callBack();
                    }
                }
            }, 30);

            //loading file one by one
            absoluteRateIncrease = function () {
                absoluteRate++;
            };
            for (i = 0; i < fileList.length; i++) {
                this.image(fileList[i], absoluteRateIncrease);
            }
        }
    };


    /**
     * 加载一个JS文件
     * @param file  JS文件路径
     * @param callBack 加载完成后的回调函数
     */
    LazyLoad.prototype.script = function (file, callBack) {
        var script;
        if (! window.loadedScriptList[file]) {
            script = document.createElement("script");
            script.type = "text/javascript";
            script.onload = script.onreadystatechange = function () {
                if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                    window.loadedScriptList[file] = true;
                    if (callBack) {
                        callBack();
                    }
                    script.onload = script.onreadystatechange = null;
                }

            };
            script.src = file;
            $("head")[0].appendChild(script);
        } else {
            if (callBack) {
                callBack();
            }
        }
    };

    /**
     * 加载一组JS文件
     * @param fileList  JS文件路径JSON格式
     * @param callBack JS文件全部加载完成后执行
     */
    LazyLoad.prototype.scripts = function (fileList, callBack) {
        if (fileList[0]) {
            var absoluteRateIncrease, rateWatch, i, absoluteRate = 0, loadedRate = fileList.length;
            rateWatch = setInterval(function () {
                if (loadedRate === absoluteRate) {
                    clearInterval(rateWatch);
                    if (callBack) {
                        callBack();
                    }
                }
            }, 30);
            //out date setting
            setTimeout(function () {
                if (loadedRate !== absoluteRate) {
                    clearInterval(rateWatch);
                }
            }, this.scriptListExpires);
            //loading file one by one
            absoluteRateIncrease = function () {
                absoluteRate++;
            };
            for (i = 0; i < fileList.length; i++) {
                this.script(fileList[i], absoluteRateIncrease);
            }

        } else {
            if (callBack) {
                callBack();
            }
        }
    };

    /**
     * 获得加载成功的JS文件列表
     */
    LazyLoad.prototype.getLoadedScripts = function () {
        var key, data = [], fileList = window.loadedScriptList;
        for (key in fileList) {
            data.push(key);
        }
        return data;
    };

    window.LazyLoad = LazyLoad;

}(window, undefined, S));
