//mvc控制，加载模版、控制器、
var mvc =function(config){

	this.config= config;


}


//构建mvc的结构
mvc.prototype.build=function(_class ,_method,_query,_effect){

	//载入模版
	this.viewer(_class,_method,function( html ){

		//载入模版到当前场景
		this.playground.load(_class,_method,_query,_effect)

	})
	
}

//加载视图
mvc.prototype.viewer = function(_class ,_method,_callback){

	//是否存在内存模版
	var page_cache_name = this.parse_page_name(_class,_method);

	if ( !window.view_page_cache[page_cache_name] ) {
		
		$.ajax.get( this.get_remote_tpl_path(_class,_method ) , {}, function(html) {
			if (_callback) {
				_callback( html );
			}
			window.view_page_cache[page_cache_name] = html;
		});

	} else {

		if (_callback) {

			_callback(window.view_page_cache[page_cache_name]);
		}

	}

	


}

//获得远程模版文件路径
mvc.prototype.get_remote_tpl_path=function(_class,_method){
	var file = this.config.tpl_rule.replace(/\{\$class\}/,_class);
	file = file.replace( /\{\$method\}/ ,_method);
	file = this.config.view_path + file;
	return file;


}

//获取内存模版缓存名
mvc.prototype.parse_page_name=function(_class ,_method){
	return 'page_'+_class+'_'+_method;

}