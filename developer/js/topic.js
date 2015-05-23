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

/*
 * 模拟网页中所有的下拉列表select
 */
function selectModel(_box, _cardNumber) {
	if(_box.jquery){
		_box.each(function(ix, el){
			selectModel(el, _cardNumber);
		});
		return;
	}
	var $box = typeof(_box)=='string'? $('#' + _box) : $(_box);
	var $option = $('ul.modelSelectOption', $box);
	var $txt = $('div.modelSelectText', $box);
	var $input = $('input:hidden', $box);
	var speed = 10;
	/*
	 * 当机某个下拉列表时，显示当前下拉列表的下拉列表框
	 * 并隐藏页面中其他下拉列表
	 */
	$txt.unbind().click(function(e) {
		//$option.not($(this).siblings('ul.modelSelectOption')).slideUp(speed, function() {
		//	int($(this));
		//});
		$(this).parent().css('zIndex', 10000);
		$(this).siblings('ul.modelSelectOption').slideToggle(speed, function() {
			int($(this));
		});
		//return false;
	});
	//点击选择，关闭其他下拉
	/*
	 * 为每个下拉列表框中的选项设置默认选中标识 data-selected
	 * 点击下拉列表框中的选项时，将选项的 data-option 属性的属性值赋给下拉列表的 data-value 属性，并改变默认选中标识 data-selected
	 * 为选项添加 mouseover 事件
	 */
	$option.find('li').each(function(index, element) {
		if ($(this).hasClass('seleced')) {
			$(this).addClass('data-selected');
		}
	}).unbind().mousedown(function(e) {
		$(this).parent().siblings('.modelSelectText').text($(this).text()).attr('data-value', $(this).attr('data-option'));
		$input.val($(this).attr('data-option'));
		//$option.slideUp(speed, function() {
		//	int($(this));
		//});
		$(this).addClass('seleced data-selected').siblings('li').removeClass('seleced data-selected');
		fillByAjax($(this),_cardNumber);
		//return false;
	}).mouseover(function() {
		$(this).addClass('seleced').siblings('li').removeClass('seleced');
	});
	//点击文档，隐藏所有下拉
	$(document).mousedown(function(e) {
		$option.slideUp(speed, function() {
			int($(this));
		});
		$option.parent().css('zIndex', 9999);
	});
	//初始化默认选择
	function int(obj) {
		obj.find('li.data-selected').addClass('seleced').siblings('li').removeClass('seleced');
	}
};
//模拟文件域
function modelTextFile(file, text, input) {
	var $file = $('.' + file),
		$text = $('.' + text),
		$input = $('#' + input).val('');
	$file.change(function(e) {
		var valueStr = this.value.substring(this.value.lastIndexOf("\\") + 1).toLowerCase();
		$text.text(valueStr);
		$input.val(this.value);
		$input.next('span.Validform_checktip').removeClass('Validform_wrong').addClass('Validform_right').text('');
	});
};

function fillByAjax(clickObj,_cardNumber){
	//alert($(clickObj).attr('data-option'));
	//alert(_cardNumber);
	if("catFirstHidden"==_cardNumber){
		var topTypeId = $(clickObj).attr('data-option');
		$.ajax({
			url:'getSecondLeaveType.jspx?topTypeId='+topTypeId,
			dataType: 'html',
			success:function(data){
				//alert(data);
				$(".catSecondHidden").html(data);
				selectModel('catSecond', 'catSecondHidden');
				$("#catSecondHidden").val("");
				$("#secondTypeText").html("二级分类");
				$("#sellingAppHidden").val("");
				$("#sellingAppText").html("选择在售的应用");
				$("#topicPkgName").html("----");
				$("#topicPkgVersion").html("----");
				$(".sellingAppHidden").html("");
			},
			 error: function (status, e) {
	            alert(e);
	            alert(status);
	        }
		});
	};
	if("catSecondHidden"==_cardNumber){
		var typeId = $(clickObj).attr('data-option');
		$.ajax({
			url:'getAppByNewType.jspx?typeId='+typeId,
			dataType: 'html',
			success:function(data){
				//alert(data);
				$(".sellingAppHidden").html(data);
				selectModel('sellingApp', 'sellingAppHidden');
				$("#sellingAppHidden").val("");
				$("#sellingAppText").html("选择在售的应用");
				$("#topicPkgName").html("----");
				$("#topicPkgVersion").html("----");
				
			},
			 error: function (status, e) {
	            alert("获取应用失败！");
	        }
		});
	};
	if("sellingAppHidden"==_cardNumber){
		//var lcaid = $(clickObj).attr('data-option');
		var appVersioncode = $(clickObj).attr('appVersioncode');
		var packageName = $(clickObj).attr('packageName');
		$("#topicPkgName").html(packageName);
		$("#packageName").val(packageName);
		$("#topicPkgVersion").html(appVersioncode);
	}
	if("idCardHidden"==_cardNumber){
		//var lcaid = $(clickObj).attr('data-option');
		var topicEndDate = $(clickObj).attr('topicEndDate');
		var detail = $(clickObj).attr('topicDetail');
		$("#topicDetail").html(detail);
		$("#topicEndDate").html(topicEndDate);
	}
}

