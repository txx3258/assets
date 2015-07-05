/**
 * Created by txx3258 on 2014/12/13.
 */
var CountNum = (function () {
    function Singleton(args) {
        var args = args || {};
        this.count = args.count || 0;
        this.id = args.id || 0;
    }

    Singleton.prototype.upCount = function () {
        if (this.count < 0) {
            return (this.count = 1);
        }
        return this.count += 1;
    }

    Singleton.prototype.upId = function () {
        if (this.id < 0) {
            return (this.id = 1);
        }
        return this.id += 1;
    }
    Singleton.prototype.downCount = function () {
        return  this.count -= 1;
    }
    Singleton.prototype.downId = function () {
        return  this.id -= 1;
    }

    Singleton.prototype.setCount = function (num) {
        return this.count = num;
    }

    Singleton.prototype.setId = function (id) {
        return this.id = Id;
    }

    var instance;

    var _static = {
        name: 'count',
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Singleton(args);
            }
            return instance;
        }
    };
    return _static;
})();

$.extend({
    my_ajax_html: function (url, container,fn,arg1) {
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                var index=data.indexOf('redirect_of_mine');
                if(index>0){
                    window.location.href=data.substring(0,index);
                }else{
                    $(container).html(data);
		     if (fn!=undefined){
				if (arg1== undefined){
					fn();
				}else{
					fn(arg1);
				}
			}	
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        })
    },
   my_ajax_alert: function (url,redUrl,container) {
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
            	alert(data);
		if(redUrl!=undefined){
			$.my_ajax_html(redUrl,container);
		}
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        })
    },
    my_ajax_xhtml: function (url, container,fn,arg1) {
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                var index=data.indexOf('redirect_of_mine');
                if(index>0){
                    window.location.href=data.substring(0,index);
                }else{
                    $(container).prepend(data);
		     if (fn!=undefined){
				if (arg1== undefined){
					fn();
				}else{
					fn(arg1);
				}
			}	
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        })
    }
});

