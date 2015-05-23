/*
 * ---------------------------------------------
 * website:
 * filename: js.js
 * revision: 1.0
 * createdate: 
 * author: lc
 * description: 
 * ---------------------------------------------
 */
$(function(){
	(function(){
		var areaList = cityJson.arealist, n = 0, def, opt, xun,
			$provinceList, $cityList, $countyList,
		//获取省
		getProvince = function(){
			var h = '', provinceLen = areaList.length;
			for(var i=0;i<provinceLen;i++){
				h += '<li data-order="'+i+'">' + areaList[i]['p'] + '</li>';
			}
			return h;
		},
		//获取市
		getCity = function(_p){
			var h = '', cityArray = areaList[_p]['c'], cityLen = cityArray.length;
			for(var i=0;i<cityLen;i++){
				h += '<li data-order="'+_p+'_'+i+'">' + cityArray[i]['n'] + '</li>';
			}
			return h;
		},
		//获取县
		getCounty = function(_p, _c){
			var h = '', countyList = areaList[_p]['c'][_c], countyLen;
			if(countyList['a']){
				countyLen = countyList['a'].length;
				for(var i=0;i<countyLen;i++){
					h += '<li data-order="'+_p+'_'+_c+'_'+i+'">' + countyList.a[i].s + '</li>';
				}		
			}else{
				h = '';
			}
			return h;
		},
		setProvince = function(_str, _o, _e, _n){
			var $this = $('#' + _str);
			def = _o;
			opt = _e;
			xun = _n;
			$provinceList = $this.find('.provinceList');
			$cityList = $this.find('.cityList');
			$countyList = $this.find('.countyList');
			$provinceList.find('.modelSelectOption').html(getProvince());
			modelSelect($provinceList, calback, def.a);
		},
		calback = function(){
			var listArray = n.split('_'),
				len = listArray.length, h;
			switch (len){
				case 1 :
					$cityList.find('.modelSelectOption').html(getCity(listArray[0]))
						.end().find('.modelSelectText').text('请选择');
					$countyList.find('.modelSelectText').text('请选择')
						.end().find('.modelSelectOption').html('');
					modelSelect($cityList, calback, def.b);
					break;
				case 2 :
					h = getCounty(listArray[0],listArray[1]);
					if(h){
						$countyList.removeClass('none').find('.modelSelectOption').html(getCounty(listArray[0],listArray[1]))
							.end().find('.modelSelectText').text('请选择');
						modelSelect($countyList, calback, def.c);
					}else{
						$countyList.addClass('none');
						$('#'+opt.p).val($provinceList.find('.modelSelectText').text())
						$('#'+opt.c).val($cityList.find('.modelSelectText').text())
						$('#'+xun.pn).val($provinceList.find('.modelSelectText').attr('data-seleced'))
						$('#'+xun.cn).val($cityList.find('.modelSelectText').attr('data-seleced'))
					}
					break;
				case 3 :
					$('#'+opt.p).val($provinceList.find('.modelSelectText').text())
					$('#'+opt.c).val($cityList.find('.modelSelectText').text())
					$('#'+opt.s).val($countyList.find('.modelSelectText').text())
					$('#'+xun.pn).val($provinceList.find('.modelSelectText').attr('data-seleced'))
					$('#'+xun.cn).val($cityList.find('.modelSelectText').attr('data-seleced'))
					$('#'+xun.sn).val($countyList.find('.modelSelectText').attr('data-seleced'))
					break;
			}
		},
		modelSelect = function (_box, _f, _num){
			var $option = $('.modelSelectOption', _box);
			var $text = $('.modelSelectText', _box);
			var speed = 10;
			$text.unbind('click').click(function(e) {
				var $this = $(this);
				$('.modelSelectOption').not($this.siblings('.modelSelectOption')).slideUp(speed);
				$this.siblings('.modelSelectOption').slideToggle(speed);
				return false;
			});
			$option.find('li').unbind('mousedown mouseover').mousedown(function(e){
				n = $(this).attr('data-order');
				$(this).parent().siblings('.modelSelectText').text($(this).text()).attr('data-seleced', n);
				$option.slideUp(speed, _f);
				return false;
			}).mouseover(function(){
				$(this).addClass('seleced').siblings('li').removeClass('seleced');
			}).eq(_num).mousedown();
			$(document).click(function(e) {
				$option.slideUp(speed);
			});
		};
		var obgCityNum = {pn:'provinceNum',cn:'cityNum',sn:'countyNum'};
		var goDef = $.extend({},{a:0, b:0, c:0},{
			a:$('#'+obgCityNum.pn).val(),
			b:$('#'+obgCityNum.cn).val().substr(2),
			c:$('#'+obgCityNum.sn).val().substr(4)
		});
		//console.log(goDef)
		setProvince('cityArea', goDef, {p:'provinceVal',c:'cityVal',s:'countyVal'},obgCityNum);
	}())
})

/*
 * 模拟网页中所有的下拉列表select
 */
function selectModel(_box,_cardNumber){
	var $box = $('#' + _box);
	var $option = $('ul.modelSelectOption', $box);
	var $txt = $('div.modelSelectText', $box);
	var $input = $('input:hidden', $box);
	var speed = 10;
	/*
	 * 当机某个下拉列表时，显示当前下拉列表的下拉列表框
	 * 并隐藏页面中其他下拉列表
	 */
	$txt.click(function(e) {
			$option.not($(this).siblings('ul.modelSelectOption')).slideUp(speed, function(){
				int($(this));
			});
			$(this).siblings('ul.modelSelectOption').slideToggle(speed, function(){
				int($(this));
			});
			return false;
		});
	//点击选择，关闭其他下拉
	/*
	 * 为每个下拉列表框中的选项设置默认选中标识 data-selected
	 * 点击下拉列表框中的选项时，将选项的 data-option 属性的属性值赋给下拉列表的 data-value 属性，并改变默认选中标识 data-selected
	 * 为选项添加 mouseover 事件
	 */
	$option.find('li').each(function(index, element) {
		if($(this).hasClass('seleced')){
			$(this).addClass('data-selected');
		}
	 }).mousedown(function(e){
		$(this).parent().siblings('.modelSelectText').text($(this).text()).attr('data-value', $(this).attr('data-option'));
		$input.val($(this).attr('data-option'));
		$option.slideUp(speed, function(){
			int($(this));
		});
		$(this).addClass('seleced data-selected').siblings('li').removeClass('seleced data-selected');
		var dataOption = $(this).attr('data-option');
		var dataValue = $('#'+_cardNumber).val();
		if(dataOption!=1){
			if(dataValue!=''){
				$('#'+_cardNumber).removeClass('Validform_error')
					//.addClass('Validform_right');
				$('#'+_cardNumber).next('span.Validform_checktip').removeClass('Validform_wrong').addClass('Validform_right').text('');
			}else{
				$('#'+_cardNumber).addClass('Validform_error').removeClass('Validform_right');
				$('#'+_cardNumber).next('span.Validform_checktip').addClass('Validform_wrong').removeClass('Validform_right').text('请输入有效的证件号码');
			}
			$('#'+_cardNumber).unbind('keyup').keyup(function(e) {
				var dataValue = $(this).val();
				if(dataValue!==''){
					$('#'+_cardNumber).removeClass('Validform_error')
						//.addClass('Validform_right');
					$('#'+_cardNumber).next('span.Validform_checktip').removeClass('Validform_wrong').addClass('Validform_right').text('');
				}else{
					$('#'+_cardNumber).addClass('Validform_error').removeClass('Validform_right');
					$('#'+_cardNumber).next('span.Validform_checktip').addClass('Validform_wrong').removeClass('Validform_right').text('请输入有效的证件号码');
				}
			});
		}else{
			var reg1 = /^\d{18}$|^\d{17}[A-Za-z0-9]$/;
			//console.log(reg1.test(dataValue))
			if(reg1.test(dataValue)){
				$('#'+_cardNumber).removeClass('Validform_error')
					//.addClass('Validform_right');
				$('#'+_cardNumber).next('span.Validform_checktip').removeClass('Validform_wrong').addClass('Validform_right').text('');
			}else{
				$('#'+_cardNumber).addClass('Validform_error').removeClass('Validform_right');
				$('#'+_cardNumber).next('span.Validform_checktip').addClass('Validform_wrong').removeClass('Validform_right').text('请输入有效的身份证号码');
			}
			$('#'+_cardNumber).unbind('keyup').keyup(function(e) {
				var dataValue = $(this).val();
				if(reg1.test(dataValue)){
					$('#'+_cardNumber).removeClass('Validform_error')
						//.addClass('Validform_right');
					$('#'+_cardNumber).next('span.Validform_checktip').removeClass('Validform_wrong').addClass('Validform_right').text('');
				}else{
					$('#'+_cardNumber).addClass('Validform_error').removeClass('Validform_right');
					$('#'+_cardNumber).next('span.Validform_checktip').addClass('Validform_wrong').removeClass('Validform_right').text('请输入有效的身份证号码');
				}
			});
		}
		return false;
	}).mouseover(function(){
			$(this).addClass('seleced').siblings('li').removeClass('seleced');
		});
	//点击文档，隐藏所有下拉
	$(document).click(function(e) {
    $option.slideUp(speed, function(){
			int($(this));
		});
  });
	//初始化默认选择
	function int(obj){
		obj.find('li.data-selected').addClass('seleced').siblings('li').removeClass('seleced');
	}
};
//模拟文件域
function modelTextFile(file,text,input){
	var $file = $('.' + file),
		$text = $('.' + text),
		$input = $('#'+input).val('');
	$file.change(function(e) {
		var valueStr = this.value.substring(this.value.lastIndexOf("\\")+1).toLowerCase();
    $text.text(valueStr);
		$input.val(this.value);
		$input.next('span.Validform_checktip').removeClass('Validform_wrong').addClass('Validform_right').text('');
  });	
};
