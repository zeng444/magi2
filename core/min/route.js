/*! gruntjs.cn 2014-05-31 */
var route=function(a,b){this.history=a,this.mvc=new mvc(b)};route.prototype.url_to_query=function(a){var b=/\?(.*)/i,c=b.exec(a);if(c){for(var d={},c=c[1].split("&"),e=0;e<c.length;e++){var f=c[e].split("=");d[f[0]]=decodeURIComponent(f[1])}delete d.job}return d},route.prototype.url_to_route=function(){var a=window.location.href,b=/job=([\d\w\-\_]+)#([\d\w\-\_]+)/i,c=b.exec(a),d=this.url_to_query(window.location.href),e="",f="";return c&&c[1]&&c[2]&&(e=c[1],f=c[2]),{_class:e,_method:f,_query:d}},route.prototype.name=function(a,b,c){var d="";for(var e in c)"job"!=e&&(d+="_"+e+"_"+encodeURIComponent(c[e]));return a+"-"+b+d.replace(/\%|\.|\(|\)/g,"")},route.prototype.to=function(a,b,c){this.build_url_change(a,b,c),this.history.write(a,b,c),this.mvc.build(a,b,c)},route.prototype.build_url_change=function(a,b,c){if(history.replaceState){var c=this.build_http_query(c),d="?job="+a+"#"+b+c,e=(a+"#"+b+c).replace("&","?"),f={title:document.title,url:d,route:e};history.pushState(f,document.title,d),window.onpopstate=function(a){return a&&a.state&&this.url(a.state.route,"none"),!1}}},route.prototype.build_http_query=function(a){var b=[];for(var c in a)b.push("&"+c+"="+encodeURIComponent(a[c]));return b.join("")},route.prototype.url=function(){},route.prototype.back=function(){},route.prototype.history=function(){};