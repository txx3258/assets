
function exportCpdExcel(){
	var pkgName = $("#optionPakage").val();
	if (pkgName.length < 1) {
		errorInfo();
    	$("#infoPop").text("请先选择应用名");
    	showPopwindow('pop_info');
	} else {
		document.forms[0].action = "exportCpdExcel.jspx";
		document.forms[0].submit();
	}
}

function checkCpd(pageNum){
	var pkgName = $("#optionPakage").val();
	if (pkgName.length < 1) {
		errorInfo();
    	$("#infoPop").text("请先选择应用名");
    	showPopwindow('pop_info');
	} else {
		$("#pageNum").val(pageNum);
		document.forms[0].action = "queryCpd.jspx";
		document.forms[0].submit();
	}
}

//格式化字符串 5785323 > 5,785,323
function formatNum(str){
	str = str.toString();
	if(/[^0-9\.]/.test(str)){return str;}
	var strFloor = '';
	if(RegExp('\\.').test(str)){
		strArr = str.split('.');
		str = strArr[0];
		strFloor = '.' + strArr[1];
	}
	var n = str.length % 3;
	if(n){
		return str.slice(0,n) + str.slice(n).replace(/(\d{3})/g,',$1') + strFloor;
	}else{
		return str.replace(/(\d{3})/g,',$1').slice(1) + strFloor;
	}
}

// 日期转字符串 转换前Thu Sep 01 2011 00:00:00 GMT+0800， 转换后的格式是 2011-08-21
function dateToString(date){
	var dateYear = date.getFullYear();
	var dateMonth = date.getMonth()+1;
	if(dateMonth < 10){
		dateMonth = "0"+dateMonth;
	}
	var dateDay = date.getDate();
	if(dateDay < 10){
		dateDay = "0"+dateDay;
	}
	return dateYear+"-"+dateMonth+"-"+dateDay;
}

function creatChart (dataX, series) {
	var arrlength = dataX.length;
	var tickInterval = arrlength > 25 ? Math.ceil(arrlength/25) : 1; 
   	var chart;
	//定义一个HighCharts 
	chart = new Highcharts.Chart({
		//配置chart选项
		chart: {
            renderTo: 'highChart',  //容器名，和body部分的div id要一致
            type: 'line'						//图表类型，这里选择折线图
        },
//配置链接及名称选项 
        credits: {
        	enabled : false
        },
//配置标题
         title: {
             text: '',
             y:10  //默认对齐是顶部，所以这里代表距离顶部10px 
         },
         //配置x轴
         xAxis: {
         	 	showFirstLabel: true,
				tickInterval: tickInterval,
				tickmarkPlacement: 'on',
				tickColor: '#ddd',
				tickPosition: "outside",
				labels: {
					y: 25 ,
					rotation: -60,
					formatter: function(){
						return dataX[this.value];
					}
				}
         },
         //xAxis_type: 'datetime',		// 默认时间轴 (datetime || line)
         // 配置y轴
         yAxis: {
				title: {
					text: ''
				},
				startOnTick: false,
				showFirstLabel: true,
				allowDecimals: false,
				labels: {
					style: {
						color: '#5aa5e3',
						fontSize: '11px'
					},
					formatter: function(){
						return this.value;
					}
				} 
         },
         //配置数据点提示框
         tooltip: {
         	crosshairs: true,
			backgroundColor: '#FFFDD4',
			borderColor: '#D7C595',
			shared: true,
			style: { //提示框内容的样式
				color: this.color,
				padding: '10px',
				fontSize: '9pt'
			},
			useHTML: true,
			formatter: function() {
				var s = ''+ dataX[this.x];
				for(var i=0;i<series.length;i++){
					if(this.points[i]){
						s += '<br/><font style="color:'+this.points[i].series.color+'">'+ this.points[i].series.name +':</font> <b>'+ formatNum(this.points[i].y)+'</b>';
					}
				}
				return s; 
			} 
         },
         
         //配置数据列 
         series: series
	});
}