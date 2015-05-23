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
    my_ajax_html: function (url, container) {
        $.ajax({
            type: "GET",
            url: url,
            success: function (data) {
                var index=data.indexOf('redirect_of_mine');
                if(index>0){
                    window.location.href=data.substring(0,index);
                }else{
                    $(container).html(data);
                }
            },
            error: function (msg) {
                alert(msg.responseText);
            }
        })
    }
});

