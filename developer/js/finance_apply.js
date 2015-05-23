$(function(){
	$('#claim_tips_btn').click(function(e) {	
		this.className = this.className === 'arrow_down' ? 'arrow_up' : 'arrow_down';
		SetIframeSize('frame1', this.className);					
        $('dl.first-notice').slideToggle(1250);
    });
	function SetIframeSize(iframeName, className) {
		eqlHeight();
		var iframe = window.top.document.getElementById(iframeName);
		iframe.height = 1250;
		try {
			var bHeight = iframe.contentWindow.document.body.scrollHeight;
			var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
			var height = Math.max(bHeight, dHeight);					
			if(className == 'arrow_up'){		
				iframe.height = height - 300;
			}else{
				easyCalendar.close();
				iframe.height = height;				
			}
		} catch (ex) {
		}
	}
	$(".iconuploadbox2").hover(function(){
		if($(this).find('span').html()!=''){
			$(this).find(".change_box").show();	
		}
	},function(){
		if($(this).find('span').html()!=''){
			$(this).find(".change_box").hide();	
		}
	});
	$('#unMistakableCom').click(function(e) {
		if($('#unMistakableCom').attr('checked')){  
			$('#btn_com_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
		}else{
			$('#btn_com_sub').attr('disabled','true').css({background:'none repeat scroll 0 0 #ccc'});
		}
    });
	$('#unMistakablePer').click(function(e) {
		if($('#unMistakablePer').attr('checked')){
			$('#btn_per_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
		}else{
			$('#btn_per_sub').attr('disabled','true').css({background:'none repeat scroll 0 0 #ccc'});
		}
    });
	$('#taxPayerType').change(function(e){
		$('#btn_com_chg_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
		$('#infoMsg').html('&nbsp;');
		var taxPayerType = $.trim($("#taxPayerType").val());
		$("#invoiceType").val('1');
		setImageInfo(taxPayerType);		
		if(taxPayerType != '1'){
			$('#in_op').css("display", "none");
		}else{
			$('#in_op').css("display", "block");
		}
	});
	var formComInfoValid = $("#financeComInfoChangeForm").Validform({
		tiptype:4,
		postonce:true,
		btnSubmit:"#btn_com_chg_sub",
		datatype:{
			financeComCertT: function(){
				if($.trim($("#businessLicenceH").val()) == '' || $.trim($("#financialRegCertH").val()) == ''){
					window.scrollTo(0, 99999);
					return false;
				}else if ($.trim($("#taxPayerType").val()) == '1' && $.trim($("#generalTaxpayerH").val()) == ''){
					window.scrollTo(0, 99999);
					return false;
				}else{
					return true;
				}
			}
		},
		beforeSubmit: function(){
			$('#btn_com_chg_sub').attr('disabled','true').css({background:'none repeat scroll 0 0 #ccc'});
		}
	}); 
	formComInfoValid.addRule([
		{
			ele:'#name',
			datatype:'*'
		},
		{
			ele:'#taxNum',
			datatype:'*'
		},
		{
			ele:'#address',
			datatype:'*'
		},
		{
			ele:'#bankName',
			datatype:'*'
		},
		{
			ele:'#bankAccountName',
			datatype:'*'
		},
		{
			ele:'#expressAddress',
			datatype:'*'
		},
		{
			ele:'#bankAccountNum',
			datatype:/^\d{1,40}$/,
			errormsg:'银行帐号格式错误，请重新输入！'
		},
		{
			ele:'#contactPerson',
			datatype:'*2-20',
			errormsg:'长度为2-20位字符以内'
		},
		{
			ele:'#postCode',
			datatype:'p',
			errormsg:'请填写正确的邮政编码！'
		},
		{
			ele:'#phone',
			datatype:/^\d{7,20}$|^\d{2,6}-\d{6,10}$/,
			errormsg:'电话格式错误，请重新输入！'
		},
		{
			ele:'#contactPhone',
			datatype:/^\d{7,20}$|^\d{2,6}-\d{6,10}$/,
			errormsg:'电话格式错误，请重新输入！'
		},
		{
			ele:'#financeComCertH',
			datatype:'financeComCertT',
			errormsg:'请上传完整的资质证明!',
			nullmsg:'请上传完整的资质证明!'
		}
	]);
	
	var formPerChangeValid = $("#financePerChangeForm").Validform({
		tiptype:4,
		postonce:true,
		btnSubmit:"#btn_per_chg_sub",
		datatype:{		
			financePerCertT: function(){
				if($.trim($("#idCardFrontH").val()) == '' || $.trim($("#idCardBackH").val()) == ''){
					window.scrollTo(0, 99999);
					return false;
				}else{
					return true;
				}
			}
		},
		beforeSubmit: function(){
			$('#btn_per_chg_sub').attr('disabled','true').css({background:'none repeat scroll 0 0 #ccc'});
		}
	}); 
	formPerChangeValid.addRule([
		{
			ele:'#name',
			datatype:'*'
		},
		{
			ele:'#address',
			datatype:'*'
		},
		{
			ele:'#bankName',
			datatype:'*'
		},
		{
			ele:'#bankAccountName',
			datatype:'*'
		},
		{
			ele:'#expressAddress',
			datatype:'*'
		},
		{
			ele:'#bankAccountNum',
			datatype:/^\d{1,40}$/,
			errormsg:'银行帐号格式错误，请重新输入！'
		},
		{
			ele:'#contactPerson',
			datatype:'*2-20',
			errormsg:'长度为2-20位字符以内'
		},
		{
			ele:'#postCode',
			datatype:'p',
			errormsg:'请填写正确的邮政编码！'
		},
		{
			ele:'#phone',
			datatype:/^\d{7,20}$|^\d{2,6}-\d{6,10}$/,
			errormsg:'电话格式错误，请重新输入！'
		},
		{
			ele:'#contactPhone',
			datatype:/^\d{7,20}$|^\d{2,6}-\d{6,10}$/,
			errormsg:'电话格式错误，请重新输入！'
		},
		{
			ele:'#financePerCertH',
			datatype:'financePerCertT',
			errormsg:'请上传完整的资质证明!',
			nullmsg:'请上传完整的资质证明!'
		}
	]);

});
function confirmReceived(recordId){
	var ctx = $("#ctxH").val();
	if(recordId != null){
		$.ajax({
	  		url : ctx + '/confirmReceived.jspx?recordId='+recordId,
	    	type : 'post',
	    	dataType : 'text',
	   		success : function(data) {
	        	if(data != null && data != '' && data == 0){
	        		$("#receiptFlag"+recordId).html('发票已收到');
	        		$("#operateFlag"+recordId).html('-');
	        	}
	     	}
		});
	}
}
function checkInput(){
	var flag = true, deposit = $.trim($("#depositAccount").val());
	var amount = /^(([0-9]+\.[0-9]*[1-9][0-9]*)$|^([0-9]*[1-9][0-9]*\.[0-9]+)$|^([0-9]*[1-9][0-9]*))$/;
	if(deposit == ''){
		$('#amount_date').css('display','block').html('请填写打款金额!');
		$('#amount_right').css('display','none');
		flag = false;
	}else if(!amount.test(deposit)){
		$('#amount_date').css('display','block').html('打款金额格式错误，请重新输入!');
		$('#amount_right').css('display','none');
		flag = false;
	}else if(amount.test(deposit) && deposit < 5000){
		$('#amount_date').css('display','block').html('打款金额不得低于5000元!');
		$('#amount_right').css('display','none');
		flag = false;
	}else{
		$('#amount_date').css('display','none');
		$('#amount_right').css('display','block');
	}
	if($("#paidDate").val() == ''){
		$('#paid_date').css('display','block');
		$('#paid_right').css('display','none');
		flag = false;
	}else{
		$('#paid_date').css('display','none');
		$('#paid_right').css('display','block');
	}
	return flag;
}
function submitPaidEnterForm(){
	var flag = checkInput();
	if(flag){
		$('#paidEnterForm').submit();
	}
}
function countWord(obj) {
    var length = $(obj).val().length;
    var str = $(obj).val();
    if (length > 500) {
        $(obj).val(str.substring(0, 500));
    }
    $("#spanWordCount").html($(obj).val().length);
    $("#spanWordCountLeft").html(500 - $(obj).val().length);
}
function submitComConfirm(){
	if($('#unMistakableCom').attr('checked')){
		$('#cofirmComInvoiceInfoForm').submit();
		$('#btn_com_sub').attr('disabled','true').css({background:'none repeat scroll 0 0 #ccc'});
	}
}
function submitPerConfirm(){
	if($('#unMistakablePer').attr('checked')){
		$('#cofirmPerInvoiceInfoForm').submit();
		$('#btn_per_sub').attr('disabled','true').css({background:'none repeat scroll 0 0 #ccc'});
	}
}
function submitThree(){
	$('#generalSerialNumForm').submit();
}
function setImageInfo(taxPayerType){	
	if(taxPayerType == '1'){
		$('#gen_li').css('display','block');
		$('#sma_li').css('display','none'); 
		$('#non_li').css('display','none');		
	}else if(taxPayerType == '2'){
		$('#gen_li').css('display','none');
		$('#sma_li').css('display','block'); 
		$('#non_li').css('display','none');		
	}else if(taxPayerType == '3'){
		$('#gen_li').css('display','none');
		$('#sma_li').css('display','none'); 
		$('#non_li').css('display','block');
	}
	$("#img_type").css("display","block");
	$('#img_type_right').css('display','none');
	$('#img_type_wrong').css('display','none');
	$('#cert_com').html('<input id="financeComCertH" type="hidden"/>&nbsp;');
	$("#finalGeneralTaxpayerPath").html("<input type='hidden' name='generalTaxpayerPath' id='generalTaxpayerH' value=''/> ");
	$("#finalSmallTaxpayerPath").html("<input type='hidden' name='smallTaxpayerPath' id='smallTaxpayerH' value=''/> ");
	$("#finalNonVatTaxpayerPath").html("<input type='hidden' name='nonVatTaxpayerPath' id='nonVatTaxpayerH' value=''/> ");
}
function setInitImageInfo(taxPayerType){
	$("#img_type").css("display","block");
	$('#img_type_right').css('display','none');
	$('#img_type_wrong').css('display','none');
	$('#cert_com').html('<input id="financeComCertH" type="hidden"/>&nbsp;');
	if(taxPayerType == '1'){
		$('#gen_li').css('display','block');
		$('#sma_li').css('display','none'); 
		$('#non_li').css('display','none');		
		$("#finalSmallTaxpayerPath").html("<input type='hidden' name='smallTaxpayerPath' id='smallTaxpayerH' value=''/> ");
		$("#finalNonVatTaxpayerPath").html("<input type='hidden' name='nonVatTaxpayerPath' id='nonVatTaxpayerH' value=''/> ");
	}else if(taxPayerType == '2'){
		$('#gen_li').css('display','none');
		$('#sma_li').css('display','block'); 
		$('#non_li').css('display','none');
		$("#finalGeneralTaxpayerPath").html("<input type='hidden' name='generalTaxpayerPath' id='generalTaxpayerH' value=''/> ");
		$("#finalNonVatTaxpayerPath").html("<input type='hidden' name='nonVatTaxpayerPath' id='nonVatTaxpayerH' value=''/> ");
	}else if(taxPayerType == '3'){
		$('#gen_li').css('display','none');
		$('#sma_li').css('display','none'); 
		$('#non_li').css('display','block');
		$("#finalGeneralTaxpayerPath").html("<input type='hidden' name='generalTaxpayerPath' id='generalTaxpayerH' value=''/> ");
		$("#finalSmallTaxpayerPath").html("<input type='hidden' name='smallTaxpayerPath' id='smallTaxpayerH' value=''/> ");
	}
}
function showPopwindow(w) {
	var frame1Top = $(window.top.document.getElementById('frame1')).offset().top;
	window.top.scroll(0, frame1Top+$('#img_type').offset().top);
	$('#img_type_wrong').css('display','block');
	$('#img_type_right').css('display','none');
	$("#img_type").css("display","none");
}
function errorInfo(){
	var infoHtml = "<div id='pop_info' class='popwindow popc'><div class='bar'><div class='fright'>"+
	"<a href='javascript:cancelPop();' class='closeClass'>Close </a></div></div><div class='pop_content'>"+
	"<div class='black' id='infoPop'></div><div><input class='pop_nn' type='button' onclick='javascript:cancelPop();' value='确定' /></div></div></div>";
	$('body').append(infoHtml);
}
function eqlHeight() {
    $(".newsleft").height("auto");
    $(".newsright").height("auto");
    var lh = $(".newsleft").height();
    var rh = $(".newsright").height();
    var maxHeight = Math.max(lh, rh);
    $(".newsleft").height(maxHeight);
    $(".newsright").height(maxHeight);
}
var calendarWraperWidth = 218;
var easyCalendar = (function(){
	var wraper, element, weeks = ['日','一','二','三','四','五','六'], arrYear = [1949, 1959],
	//获取年份字符串
	getYearString = function(_arrYear){
		var len = _arrYear[1] - _arrYear[0], i, s = '<ul class="clear">';
		for(i=0; i<len; i++){
			s += '<li><a href="#">' + (_arrYear[0] + i) + '</a></li>';
		}
		s += '</ul>';
		return s;
	},
	//返回DOM对象
	$ = function(_id) {
    return document.getElementById(_id);
  },
	//月份总天数数组
	getMonthDays = function(_year){
		return [31, 28 + is_leap(_year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	},
	//获取元素的坐标
	getOffset = function(_element, _type){
		var offset = _element['offset' + _type]; 
		if(_element.offsetParent != null) offset += getOffset(_element.offsetParent, _type); 
		return offset; 
	},
	//判断是否是闰年
	is_leap = function (_year) {
   return (_year % 100 == 0 ? (_year % 400 == 0 ? 1 : 0) : (_year % 4 == 0 ? 1 : 0));
	},
	//设置元素位置
	setPosition = function(_wraper, _element){
		var x1 = _wraper.clientWidth, x2 = _element.clientWidth, x = x2 - x1;
		_wraper.style.position 	= 'absolute';
		_wraper.style.left 			= getOffset(element, 'Left') + x + 'px';
		_wraper.style.top 			= getOffset(element, 'Top') + 1 + element.clientHeight + 'px';
	},
	//获取或创建日历元素calendarWraper
	createDiv = function(){
		var oDiv = $('calendarWraper');
		if(!oDiv){
			oDiv = document.createElement('div');
			oDiv.id = 'calendarWraper';
			document.body.appendChild(oDiv);
		}
		return oDiv;
	},
	//显示日历
	showCalendar = function(_sYear, _sMonth, _sDay){
		var weekHtml = '', dayHtml = '', html,
		nextMonth, nextYear,
		prevMonth, prevYear,
		//当月第一天星期几
		firstday = new Date(_sYear, _sMonth - 1, 1).getDay(),
		m_days = getMonthDays(_sYear);
		if(_sMonth == 12){
			nextMonth = 1;
			nextYear = _sYear + 1;
		}else{
			nextMonth = _sMonth + 1;
			nextYear = _sYear;
		}
		if(_sMonth == 1){
			prevMonth = 12;
			prevYear = _sYear - 1;
		}else{
			prevMonth = _sMonth - 1;
			prevYear = _sYear;
		}
		for(var i=0; i<7; i++){
			weekHtml += '<li>' + weeks[i] + '</li>';
		};
		//var prev = firstday ? firstday : 7;
		var prev = firstday;
		var next = 42 - m_days[_sMonth - 1] - prev;
		next = next < 7 ? next : next - 7;
		for(var i=prev; i>0; i--){
			dayHtml += '<li>&nbsp;</li>';
		};
		for(var i=1; i<=m_days[_sMonth - 1]; i++){
			if((i <= getCurrentDate()[2]&& getCurrentDate()[0] == _sYear && getCurrentDate()[1] == _sMonth) || 
				(getCurrentDate()[0] == _sYear && getCurrentDate()[1] > _sMonth) ||
				(getCurrentDate()[0] > _sYear)){
				dayHtml += '<li><a href="javascript:easyCalendar.set(' + _sYear + ',' + _sMonth + ',' + i + ');easyCalendar.close();" class="calendar-icons ' + (_sDay == i ? 'current' : '') + '">' + i + '</a></li>';
			}else{
				dayHtml += '<li><em class="calendar-icons">' + i + '</em></li>';
			}
		};
		html = '\
			<div class="calendarOuter">\
				<div class="calendarInner">\
					<div class="calendarBox">\
						<ul class="calendarBtn">\
							<li class="calendarBtnLi prev"><a href="javascript:easyCalendar.show(' + prevYear + ", " + prevMonth + ', ' + _sDay + ');" class="calendar-icons">上一月</a></li>\
							<li class="calendarBtnLi calendar-icons-x" style="padding-left: 50px;"><span class="inline-block">' + _sYear + ' 年</span><span class="inline-block">' + _sMonth + '</span>月</li>\
							<li class="calendarBtnLi next"><a href="javascript:easyCalendar.show(' + nextYear + ", " + nextMonth + ', ' + _sDay + ');" class="calendar-icons">下一月</a></li>\
						</ul>\
						<ul class="calendarWeek clear">' + weekHtml + '</ul>\
						<ul class="calendarNum clear">' + dayHtml + '</ul>\
						<div class="calendarClose">\
							<a class="today calendar-icons" id="todayCalendar" href="javascript:easyCalendar.set(' + getCurrentDate()[0] + ',' + getCurrentDate()[1] + ',' + getCurrentDate()[2] + ');easyCalendar.close();">今天</a>\
							<a class="reset calendar-icons" id="resetCalendar" href="javascript:easyCalendar.reset();easyCalendar.close();">清除</a>\
							<a class="close calendar-icons" id="closeCalendar" href="javascript:easyCalendar.close();">关闭</a>\
						</div>\
					</div>\
				</div>\
			</div>';
		if(wraper.innerHTML != html) {
			wraper.innerHTML = html;
		};
		if(wraper.style.display !== 'block'){
			wraper.style.display = 'block';
		};
		setPosition(wraper, element);
	},
	//设置日期
	setCalendar = function(_sYear, _sMonth, _sDate){
		element.value = _sYear + '-' + _sMonth + '-' + _sDate;
		document.getElementById('paid_date').style.display = 'none';
		document.getElementById('paid_right').style.display = 'block';
	},
	//选择年
	selectYear = function(){
	
	},
	//关闭日历
	close = function(){
		wraper.style.display = 'none';
	},
	reset = function(){
		element.value = '';
		document.getElementById('paid_right').style.display = 'none';
		document.getElementById('paid_date').style.display = 'block';
	},
	//获取当前本地日期
	getCurrentDate = function(){
		return [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()];
	},
	//初始化
	init = function(_id){
		var value, arr;
		wraper = createDiv();
		element = $(_id);
		wraper.style.width = calendarWraperWidth + 'px';
		value = $(_id).value;
		if(value != "" && value.indexOf('-') !== -1){
			arr = value.split("-");
			arr[0] = parseInt(arr[0], 10);
			arr[1] = parseInt(arr[1], 10);
			arr[2] = parseInt(arr[2], 10);
		}else{
			arr = getCurrentDate();
		}
		showCalendar(arr[0], arr[1], arr[2]);
	};
	return {
		init	: init,
		close	: close,
		reset	: reset,
		set		: setCalendar,
		show	: showCalendar
	}
}());
