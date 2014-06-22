var playground=function(params){

	//app播放容器ID名
	this.playgroud_idname = params.playground_name;

	//app播放容器的容器对象
	this.playgroud_dom_object = params.app_playground_obj;
}

//创建APP场景的平台
playground.prototype.create=function(){
	
	var parent = this.playgroud_dom_object;
	var ground = document.createElement('div');
	ground.id = this.playgroud_idname;
	ground.style.position = 'relative';
	var mask = document.createElement('div');
	mask.id = this.playgroud_idname + '_mask';
	ground.appendChild(mask);
	((parent) ? parent : document.body).appendChild(ground);

}

//载入页面
playground.prototype.load =function(_class,_method,_query,_effect){

	var parent = $('#' + this.playground_idname)[0]; //page contenter: contenter >contenter mask >page
	var id = this.playground_name + '_mask'; //new page's parentNode named mask
	var page_mask_obj = $('#' + page_mask_name)[0]; //contenter mask
	var append_page_name = dojob.route.page_name(_class, _method, _query); //new page id name
	parent.style.overflowX = 'hidden';
	page_mask_obj.style.width = '100%';
	parent.style.minHeight = '100%';
	page_mask_obj.style.minHeight = '100%';
	if (!window._this) { //frist page
		var page = document.createElement('div');
		page.style.minHeight = '100%';
		page.id = '_blank';
		page_mask_obj.appendChild(page);
		dojob.effect.none(append_page_name, page, page_mask_obj, parent, _construct, _callback);
	} else { //switch page
		if (!$('#' + append_page_name)[0]) {
			_effect = (_effect && _effect!='undefined') ? _effect : define.default_page_effection;
			eval('var effect_fun = dojob.effect.' + _effect);
			if (effect_fun) {
				effect_fun(append_page_name, window._this, page_mask_obj, page_group_obj, _construct, _callback);
			} else {
				dojob.effect.none(append_page_name, window._this, page_mask_obj, page_group_obj, _construct, _callback);
			}
		}
	}
}



