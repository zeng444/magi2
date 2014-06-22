//执行路由
var route = function(history,config){

	//浏览器虚拟历史记录
	this.history = history;
	
	//
	this.mvc = new mvc( config );

}

//解析浏览器地址中的GET为数组转换为数组
route.prototype.url_to_query=function(url) {

	var regEx = /\?(.*)/i;
	var query_array = regEx.exec(url);
	 
	
	if (query_array) {
	    var _GET= {},query_array = query_array[1].split('&');

		for (var i = 0; i < query_array.length; i++) {
			var key_val = query_array[i].split('=');
			_GET[key_val[0]] = decodeURIComponent(key_val[1]);
		}
		delete(_GET['job']) 
	}

	return _GET;

}

//解析浏览器地址为路由方法
route.prototype.url_to_route=function() {

	var url = window.location.href;
	var regEx = /job=([\d\w\-\_]+)#([\d\w\-\_]+)/i;
	var route = regEx.exec(url);
	var _query = this.url_to_query(window.location.href);
	var _class='',_method='';
	if (route) {
		if (route[1] && route[2]) {
			
			_class = route[1];
			_method = route[2];
		}
	}
	return {
		_class: _class,
		_method: _method,
		_query: _query
	}
}
//生成出的场景名
route.prototype.name =function(_class, _method, _query) {

	var json_str = '';
	for (var i in _query) {
		if (i != 'job') json_str += '_' + i + '_' + encodeURIComponent(_query[i]);
	};
	return _class + '-' + _method + json_str.replace(/\%|\.|\(|\)/g, '');
}

//分析一个路由并把操作发送给调度器
route.prototype.to = function(_class, _method, _query, _effect) {
	
	//浏览器跟随运动
	this.build_url_change( _class ,_method,_query );
	
	//记录日志
	this.history.write( _class ,_method,_query );

	//执行mvc
	this.mvc.build(_class ,_method,_query );

};
//浏览器跟随路由移动
route.prototype.build_url_change = function(_class, _method, _query) {
	
	if( history.replaceState ){

		var _query = this.build_http_query(_query);
		var location_url = "?job="+_class+'#'+_method+_query;
		var route = ( _class+'#'+_method+ _query ).replace('&','?');
		var state = {  title : document.title, url : location_url,route:route};
		// if( _without_history ){
		// 	history.replaceState(state, document.title, location_url);
		// }else{
		// 	history.pushState(state, document.title, location_url);
		// }
		history.pushState(state, document.title, location_url);
	    window.onpopstate = function(event){
	       if(event && event.state){
	            this.url(event.state.route,'none');
	        }
	        return false;
	    }
	}
}

//将数组拼装为get请求
route.prototype.build_http_query=function (array) {
	var str = [];
	for (var i in array) {
		// if (i != 'job') str += '&' + i + '=' + encodeURIComponent(array[i]);
		str.push(   '&' + i + '=' + encodeURIComponent(array[i]) );
		// str += '&' + i + '=' + encodeURIComponent(array[i]);
	}
	return str.join('');
}
route.prototype.url = function(_url, _effect) {
	


};
route.prototype.back = function(_url, _effect) {
	

};

route.prototype.history= function(_no, _effect) {


}