/*! gruntjs.cn 2014-05-31 */
var tpl=function(a){this.config=a};tpl.prototype.load_offline_tpl=function(){1==this.config.is_use_tpl_cache&&this.lasyload.file(this.config.view_path+"_magi_page_cache.js",function(){call&&call()})};