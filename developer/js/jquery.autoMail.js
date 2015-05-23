(function($){
    $.fn.autoMail = function(options){
        var autoMail = $(this);
        var _value   = '';
        var _index   = -1;
        var _width   = autoMail.outerWidth();
        var _height  = autoMail.outerHeight();
        var _left    = autoMail.offset().left;
        var _top     = autoMail.offset().top;
        autoMail.defaults = {
            deValue : '',
            textCls : 'text-gray',
            listCls : 'list-mail',
            listTop : 1,
            mailArr : ["qq.com","163.com","gmail.com","126.com","sina.com","hotmail.com","yahoo.com","yahoo.com.cn","live.com","sohu.com"]
        }
        //初始化
        autoMail.init = function(){
            autoMail.vars = $.extend({},autoMail.defaults,options);
            autoMail.val(autoMail.vars.deValue).addClass(autoMail.vars.textCls);
            autoMail.click(function(event){
							
                autoMail.select().removeClass(autoMail.vars.textCls);
								
                if(autoMail.val() != autoMail.vars.deValue){
                    autoMail.add();
                    autoMail.order(_value);
                    autoMail.list.find('.item').each(function(){
											
                        if($(this).text() == autoMail.val()){
                            $(this).siblings('.item').removeClass('select');
                            $(this).addClass('select');
                            return false;
                        }
                    })
                }
                event.stopPropagation();
            })
            autoMail.blur(function(event){
                if(autoMail.val() == '' || autoMail.val() == autoMail.vars.deValue){
					/*alert(autoMail.val())*//*无输入值时的提示*/
                    autoMail.val(autoMail.vars.deValue).addClass(autoMail.vars.textCls);
                }
            })
            //文本域键盘松开事件
            autoMail.keyup(function(event){
                if($(autoMail.list).length == 0){
                    autoMail.add();
                }
                if(autoMail.list.length > 0){
                    var keyCode = event.keyCode;
                    //alert(keyCode)
                    switch(keyCode){
                        case 13: 
                            autoMail.remove();
                            /*autoMail.blur();*/
                            break;
                        case 38:
                            _index--;
                            if(_index < 0){
                                _index = 0;
                            }
                            autoMail.keyOperate(_index);
                            break;
                        case 40: 
                            _index++;
                            if(_index > $('.item',autoMail.list).length - 1){
                                _index = ('.item',autoMail.list).length - 1
                            }
                            autoMail.keyOperate(_index);
                            break;
                        default:
                            if(autoMail.val().indexOf('@') < 0){
                                _value = autoMail.val();
                                autoMail.order(_value);     
                            }    
                    }  
                }
            })
            $(document).click(function(){
                if($(autoMail.list).length > 0){
                    autoMail.remove();
                    autoMail.blur();
                }
            })
        }
        //创建列表
        autoMail.create = function(){
            var li = '';
            for(var i = 0; i < autoMail.vars.mailArr.length; i++){
                li += '<li class="item">'+ '<span class="style">' + '@' + autoMail.vars.mailArr[i] + '</span>' + '</li>';
            }
            autoMail.list = $('<div class="'+ autoMail.vars.listCls +'"><ul>'+ li +'</ul></div>');
            autoMail.list.css({
                'position' : 'absolute',
                'left'     : _left,
                'top'      : _top + _height + autoMail.vars.listTop,
                'min-width': _width
            })
            autoMail.list.appendTo($('body'));
            //邮箱列表绑定事件
            autoMail.list.find('.item').click(function(event){
                autoMail.getVal($(this));
                autoMail.remove();
                event.stopPropagation();
            })
            autoMail.list.find('.item').hover(
                function(){ $(this).addClass('hover'); },
                function(){ $(this).removeClass('hover'); }
            )
            return autoMail.list;
        }
        //序列化列表
        autoMail.order = function(_value){
            $('.name',autoMail.list).remove();
            var name = $('<span class="name">'+ _value +'</span>');
            $('.item',autoMail.list).prepend(name);
        }
        //添加列表
        autoMail.add = function(){
            if(typeof autoMail.list == 'undefined' || autoMail.list.length < 1) autoMail.create();
        }
        //移除列表
        autoMail.remove = function(){
            if(autoMail.list.length > 0){
                autoMail.list.remove();
                delete autoMail.list;
            }
        }
        //获取值
        autoMail.getVal = function(obj){
            if($('.name',obj).text() != ''){
                var selectValue = obj.text();
                autoMail.val(selectValue); 
								autoMail.blur(); 
            }else{
                return false;
            }
        }
        //键盘操作
        autoMail.keyOperate = function(_index){
            $('.item',autoMail.list).eq(_index).addClass('hover').siblings('.item').removeClass('hover');
            autoMail.val($('.item',autoMail.list).eq(_index).text());
        }
        //开始初始话动作...
        autoMail.init();
    }
})(jQuery)