var lasyload = function () {

    //加载单个文件超时时间
    this.timeout = 3000;

    //缓载成功的文件列表
    this.loaded_file_list = [];
}

//加载一个文件
lasyload.prototype.file = function (src, callback) {

    if (!this.loaded_file_list[src]) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        //script.src = src + '?' + (+new Date());
        $('head')[0].appendChild(script);
        script.onload = function () {
            this.loaded_file_list[src] = true;
            if (callback) callback();
        };
        script.src = src;

    } else {
        if (callback) callback();
    }

}
//加载一组文件
lasyload.prototype.files = function (src_json, callback) {
    if (src_json[0]) {
        var loaded_rate = src_json.length;
        var absolute_rate = 0;
        var rate_trace = setInterval(function () {
            if (loaded_rate == absolute_rate) {
                clearInterval(rate_trace);
                if (callback) callback();
            }
        }, 50);
        //outdate setting
        setTimeout(function () {
            if (loaded_rate != absolute_rate) clearInterval(rate_trace);
        }, this.timeout);
        //loading file one by one
        for (var i = 0; i < src_json.length; i++) {
            dojob.lasyload.file(src_json[i], function () {
                absolute_rate++;
            });
        }
        ;
    } else {
        if (callback) callback();
    }
}
