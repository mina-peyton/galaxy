define(["mvc/user/user-model","utils/metrics-logger","utils/add-logging","utils/localization","mvc/base-mvc","bootstrapped-data"],function(a,b,c,d,e,f){function g(a){var b=this;return b._init(a||{})}c(g,"GalaxyApp");var h="galaxy:debug",i=h+":namespaces",j=!1;try{j="true"==localStorage.getItem(h)}catch(k){console.log(d("localStorage not available for debug flag retrieval"))}return g.prototype._init=function(a){var b=this;return _.extend(b,Backbone.Events),j&&(b.logger=console),b._processOptions(a),b.debug("GalaxyApp.options: ",b.options),b._initConfig(a.config||f.config||{}),b.debug("GalaxyApp.config: ",b.config),b._patchGalaxy(window.Galaxy),b._initLogger(b.options.loggerOptions||{}),b.debug("GalaxyApp.logger: ",b.logger),b._initLocale(),b.debug("GalaxyApp.localize: ",b.localize),b._initUser(a.user||f.user||{}),b.debug("GalaxyApp.user: ",b.user),b.trigger("ready",b),b._setUpListeners(),b},g.prototype.defaultOptions={patchExisting:!0,root:"/",loggerOptions:{}},g.prototype._processOptions=function(a){var b=this,c=b.defaultOptions;b.debug("_processOptions: ",a),b.options={};for(var d in c)c.hasOwnProperty(d)&&(b.options[d]=a.hasOwnProperty(d)?a[d]:c[d]);return b},g.prototype._initConfig=function(a){var b=this;return b.debug("_initConfig: ",a),b.config=a,b.config.debug=j||b.config.debug,b},g.prototype._patchGalaxy=function(a){var b=this;if(b.options.patchExisting&&a){b.debug("found existing Galaxy object:",a);for(var c in a)a.hasOwnProperty(c)&&(b.debug("	 patching in "+c+" to Galaxy"),b[c]=a[c])}},g.prototype._initLogger=function(a){var c=this;if(c.config.debug){a.consoleLogger=a.consoleLogger||console,a.consoleLevel=a.consoleLevel||b.MetricsLogger.ALL;try{a.consoleNamespaceWhitelist=localStorage.getItem(i).split(",")}catch(d){}}return c.debug("_initLogger:",a),c.logger=new b.MetricsLogger(a),c.emit={},["log","debug","info","warn","error","metric"].map(function(a){c.emit[a]=function(){c.logger.emit(a,arguments[0],Array.prototype.slice.call(arguments,1))}}),c.config.debug&&(e.LoggableMixin.logger=c.logger),c},g.prototype._initLocale=function(a){var b=this;return b.debug("_initLocale:",a),b.localize=d,window._l=b.localize,b},g.prototype._initUser=function(b){var c=this;return c.debug("_initUser:",b),c.user=new a.User(b),c.user.logger=c.logger,c.currUser=c.user,c},g.prototype._setUpListeners=function(){var a=this;return a.lastAjax={},$(document).bind("ajaxSend",function(b,c,d){var e=d.data;try{e=JSON.parse(e)}catch(f){}a.lastAjax={url:location.href.slice(0,-1)+d.url,data:e}}),a},g.prototype.debugging=function(a){var b=this;try{if(void 0===a)return"true"===localStorage.getItem(h);if(a)return localStorage.setItem(h,!0),!0;localStorage.removeItem(h),b.debuggingNamespaces(null)}catch(c){console.log(d("localStorage not available for debug flag retrieval"))}return!1},g.prototype.debuggingNamespaces=function(a){var b=this;try{if(void 0===a){var c=localStorage.getItem(i);return"string"==typeof c?c.split(","):[]}null===a?localStorage.removeItem(i):localStorage.setItem(i,a);var e=b.debuggingNamespaces();return b.logger&&(b.logger.options.consoleNamespaceWhitelist=e),e}catch(f){console.log(d("localStorage not available for debug namespace retrieval"))}},g.prototype.toString=function(){var a=this.user?this.user.get("email")||"(anonymous)":"uninitialized";return"GalaxyApp("+a+")"},{GalaxyApp:g}});
//# sourceMappingURL=../maps/galaxy-app-base.js.map