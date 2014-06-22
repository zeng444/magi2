//对网站浏览历史进行记录
//
var phistory = function(history_ticket){

	//cache对象
	this.cache = new cache();

	//存取history的键名
	this.key = 'magi_history';

	//当前实例的历史记录cache标签
	this.ticket = history_ticket;

	//当前页路由参数
	this.absolute =[];

	//获取cache中的网页浏览记录
	var list = this.cache.get( this.key + '_' + this.ticket );

	//历史页路由参数数组
	this.list = ( list ) ? list : [];

	//历史记录条数
	this.page_number = 30;


}

//记录一条浏览器日志
phistory.prototype.write = function(_class,_method,_query){
	if ( this.list.length >= this.page_number ) {
		this.remove(0);
	}
	this.absolute = [_class,_method,_query];

	this.list.push( this.absolute );
	this.cache.set( this.key + '_' + this.ticket ,this.list );
	return true;
}
//删除第一条浏览器日志
//index为删除的索引从0开始
phistory.prototype.remove =function(index){
	this.list.splice(index, 1);
}

//清空所有日志
phistory.prototype.clear =function(index){
	this.list=[];
}