var chart;
function showDownloadChart(dataX, series, ranges) {
	var arrlength = dataX.length;
	var tickInterval = arrlength > 31 ? Math.ceil(arrlength/31) : 1; 
		chart = new Highcharts.Chart({
			chart : {
				renderTo : 'container',
				type : 'line'
			},
			credits: {
			    enabled : false
			},
			title : {
				text : '',
				y : 10 // 默认对齐是顶部，所以这里代表距离顶部10px
			},
			subtitle : {
				text : ''
			},
			xAxis : {
				showFirstLabel: true,
				tickInterval: tickInterval,
				tickmarkPlacement: 'on',
				tickColor: '#ddd',
				tickPosition: "outside",
				labels : {
					y : 25,
					rotation : -60,
					formatter : function() {
						return dataX[this.value];
					}
				}
			},
			yAxis : {
				title : {
					text : '下载量'
				},
				startOnTick: false,
				showFirstLabel: true,
				allowDecimals: false
			},
			plotOptions : {
				line : {
					dataLabels : {
						enabled : true
					},
					enableMouseTracking : true
				}
			},
			tooltip : {
				crosshairs: true,
				backgroundColor: '#FFFDD4',
				borderColor: '#D7C595',
				shared: true,
				useHTML: true,						
				formatter : function() {
					var temp;
					var s = ''+ dataX[this.x];
					$.each(ranges, function(key, value) {
						if (s == key) {
							temp = value;
						}
				    });							
					for(var i=0;i<series.length;i++){
						if(this.points[i]){
							s += '<br/>下载量：' + this.y + ' 增涨幅度: ' + temp;
						}
					}
					return s;
				}
			},
			series : series
	});
}

function submitDownload(ctx,type){
	var fixedDate = $("#fixedDate").val();
	var startDate = new Date(fixedDate.substring(0,10).replace(/-/g,"/"));
	var endDate = new Date(fixedDate.substring(13,23).replace(/-/g,"/"));
	var days = ((endDate.getTime()-startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
	var flag = true;
	$("#errorMsg").html("&nbsp;");
	if(startDate < new Date(new Date().getFullYear() + ",01,01")){
		$("#errorMsg").html("目前仅开放今年的数据").css({"font-size":"12px","color":"red"});
		return;
	}else if(days > 31){
		$("#errorMsg").html("查询日期跨度已经超过31个自然日").css({"font-size":"12px","color":"red"});
		return;
	}else{
		$("#errorMsg").html("&nbsp;");
	}
	flag = checkName();
	if(flag){
		if(type == '0'){
			$("#downloadForm").attr("action", ctx + "/getDownloadCountList.jspx?type="+type).submit();
		}else{
			$("#downloadForm").attr("action", ctx + "/getDownloadModelList.jspx?type="+type).submit();
		}
	}
}

function checkName(){
	var packName = $.trim($("#inPackageName").val());
	var appName = $.trim($("#inAppName").val());
	var flag = true;
	$("#errorMsg").html("&nbsp;");
	if (packName == '' && appName == '') {
		$("#errorMsg").html("请填写包名或应用名称！").css({"font-size":"12px","color":"red"});
		flag = false;
	}else{
		$("#errorMsg").html("&nbsp;");
		flag = true;
	}
	if(packName != '' || appName != ''){
		$.ajax({
			url : 'checkInputName.jspx',
			type : 'post',
			async : false,
			data : {
				packName: packName,
				appName: appName
				},
			dataType : 'text',
			success : function(data) {
				if(data == '0'){
					$("#errorMsg").html("您输入的包名或应用名称有误，请确认后重新输入，您可以在“在架”或“下架”应用列表中查看到包名或应用名称！").css({"font-size":"12px","color":"red"});
					flag = false;
				}else if(data == '1'){
					$("#errorMsg").html("本查询不含CPD应用，若您要查询的是CPD应用，请<a href='queryCpdFirst.jspx'>点这里</a>").css({"font-size":"12px","color":"red"});
					flag = false;
				}else if(data == '-1'){
					$("#errorMsg").html("&nbsp;");
					flag = true;
				}
			}
		});
	}
	return flag;
}
	
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

function gotoBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

function showPieChart(downCount, data) {
	var datas = eval("("+data+")");
	var dataCount = new Array();
	var str = '[';
	$.each(datas, function(key, value) {
		str += "['"+key+"',"+value+"],";
	});
	str = str.substring(0, str.length-1)+"]";
	
	dataCount = eval(str);
	chart = new Highcharts.Chart({				
		chart : {
			renderTo : 'container2',
			plotBackgroundColor : null,
			plotBorderWidth : null,
			plotShadow : false
		},
		credits : {
			enabled : false
		},
		title : {
			text : ''
		},
		tooltip : {
			formatter : function() {
				var temp;
				var s = this.point.name;
				var count = eval("("+downCount+")");
				$.each(count, function(key, value) {
					if (s == key) {
						temp = value;
					}
				});
				return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage, 2) + ' %'
					+"<br/>下载量：" + temp;
			}
		},
		plotOptions : {
			pie : {
				allowPointSelect : true,
				cursor : 'pointer',
				dataLabels : {
					enabled : true,
					color : '#000000',
					connectorColor : '#000000',
					formatter : function() {
						return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage, 2) + ' %';
					}
				}
			}
		},
		series : [ {
			type : 'pie',
			name : 'Browser share',
			data : dataCount
		} ]
	});
};