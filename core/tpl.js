var tpl=function(config){

	this.config = config;

}

//载入离线模版
tpl.prototype.load_offline_tpl=function(){

	if(this.config.is_use_tpl_cache==true)  {
		
		this.lasyload.file(this.config.view_path+'_magi_page_cache.js',function(){

			if(call) {
                call();
            }
		});
	}		 

}