function setIframeHeight(iframeId){
	windowTopScrollTop = $(window.top).scrollTop();
	var Object_MainFrame = parent.document.getElementById(iframeId);
	if(Object_MainFrame!=null){
		Object_MainFrame.style.height = '400px';
		try{
			var bHeight = Object_MainFrame.contentWindow.document.body.scrollHeight;
			var dHeight = Object_MainFrame.contentWindow.document.documentElement.scrollHeight;
			var S_height = Math.max(bHeight, dHeight);
			Object_MainFrame.style.height = S_height +'px';
			$(window.top).scrollTop(windowTopScrollTop);
		}catch (ex){}
	}
}

function countWord(obj) {
    var length = $(obj).val().length;
    var str = $(obj).val();
    if (length > 1000) {
        $(obj).val(str.substring(0, 1000));
        errorInfo();
    	$("#infoPop").text('已经达到1000字上限');
    	showPopwindow('pop_info');
    }
    $("#spanWordCount").html($(obj).val().length);
    $("#spanWordCountLeft").html(1000 - $(obj).val().length);
};

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
			if((i - getCurrentDate()[2] >= 3 && getCurrentDate()[0] == _sYear && getCurrentDate()[1] == _sMonth) || 
				(getCurrentDate()[0] == _sYear && getCurrentDate()[1] < _sMonth) ||
				(getCurrentDate()[0] < _sYear)){
				dayHtml += '<li><a href="javascript:easyCalendar.set(' + _sYear + ',' + _sMonth + ',' + i + ');easyCalendar.close();" class="calendar-icons ' + (_sDay == i ? 'current' : '') + '">' + i + '</a></li>';
			}else{
				dayHtml += '<li><em class="calendar-icons">' + i + '</em></li>';
			}
		};
		/*for(var i=1; i<=next; i++){
			dayHtml += '<li><a href="javascript:easyCalendar.set(' + nextYear + ',' + nextMonth + ',' + i + ');easyCalendar.close();">' + i + '</a></li>';
		};*/
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
	},
	//选择年
	selectYear = function(){
	
	},
	//关闭日历
	close = function(){
		wraper.style.display = 'none';
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
		set		: setCalendar,
		show	: showCalendar
	}
}());