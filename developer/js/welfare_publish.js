$(function(){
	var ctx = $("#ctxH").val();
	var iframe = window.top.document.getElementById("frame1");
	$('#claim_tips_btn').click(function(e) {	
		this.className = this.className === 'arrow_down' ? 'arrow_up' : 'arrow_down';
		SetIframeSize('frame1', this.className);					
        $('dl.first-notice').slideToggle(600);
    });
	$('#statusUn').click(function(e) {
		iframe.height = iframe.contentWindow.document.body.scrollHeight;
		$('#link_tr').addClass('none');
		$('#link_text_tr').addClass('none');
		$('#appName_input_tr').removeClass('none');
		$('#appName_select_tr').addClass('none');
		$('#lcaidH').val('');
		$("#versionName").removeAttr('readOnly'); 
    });
	$('#statusSa').click(function(e) {
		iframe.height = iframe.contentWindow.document.body.scrollHeight + 100;
		$('#link_tr').removeClass('none');
		$('#link_text_tr').removeClass('none');
		$('#appName_input_tr').addClass('none');
		$('#appName_select_tr').removeClass('none');	
		$("#versionName").attr({'readOnly':true});
    });
	
	function SetIframeSize(iframeName, className) {
		eqlHeight();
		var iframe = window.top.document.getElementById(iframeName);
		iframe.height = 600;
		try {
			var bHeight = iframe.contentWindow.document.body.scrollHeight;
			var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
			var height = Math.max(bHeight, dHeight);					
			if(className == 'arrow_up'){
				iframe.height = height + 600;
			}else{
				iframe.height = height - 500;
			}
			eqlHeight();
		} catch (ex) {
		}
	}	
	
	$('#versionName').change(function(e){
		$('#versionH').val($.trim($("#versionName").val()));
	});
	$('input[name="singleWelfarePlatform"]').change(function(e) {
		var iframe = window.top.document.getElementById("frame1");
		if(this.value == 1){
			iframe.height = iframe.contentWindow.document.body.scrollHeight + 180;
			$('#newPlatform_tr').removeClass('none');
		}else{
			iframe.height = iframe.contentWindow.document.body.scrollHeight - 80;
			$('input[name="platforms"]').each(function() {
				$(this).attr("checked", false);
			});
			$("#checkbox-other2").val("");
			$('#newPlatform_tr').addClass('none');
		}
		$('#newIsOnly2').val(this.value);
	});
	$('input[name="otherWelfarePlatform"]').change(function(e) {
	    $('#newPlatform2').val(this.value);
	});
	$('input[name="platforms"]').change(function(e) {
	    $('#newPlatform3').val(this.value);
	    var platNum = 0;
	    $('input[name="platforms"]:checked').each(function(){
	    	platNum++;
	    });
	    $('#platNumH').val(platNum);
	});
	$('input[name="applyAppType"]').change(function(e) {
		 $('#appNameTemp').val(this.value);
		 if(this.value == "1"){
			$('#appNameH').val($('#appNameSel').val());
		 }else{
			 $('#lcaidH').val('');
		 }
	});
	$('input[name="channel"]').change(function(e) {
		 var key="";
	     $('input[name="channel"]:checked').each(function(){
	         key += $(this).val()+",";
	     });
	     $('#channelH').val(key.substring(0, key.length-1));
	});
	$('#appNameSel').change(function(e){
		$('#lcaidH').val('');
		var optionValue = $("#appNameSel").val();
		if($('#appNameTemp').val() == '1' && optionValue != '-1'){
			$.each(appNameData,function (i) {
	       		if(appNameData[i].optionValue == optionValue){
	       			$('#lcaidH').val(appNameData[i].extraValue);
	       		}
			});
		}
		$("#errorInfo").html("");
	});
	var frame1Top = $(window.top.document.getElementById('frame1')).offset().top;
	var repeat=false;
	var formValid = $("#newApplyWelfareform").Validform({
		tiptype:4,
		btnSubmit:"#btn_sub",
		datatype:{
			appNameS: function(){				
				if($('#appNameTemp').val() == '1' && $("#appNameSel").val() == '-1'){
					window.top.scroll(0, frame1Top+$('#appNameSel').offset().top);
					return false;
				}else{
					return true;
				}
			},
			appNameI: function(){
				if($('#appNameTemp').val() == '0' && $.trim($("#appNameI").val()) == ''){
					return false;
				}else{
					return true;
				}
			},
			appLinkI: function(){
				if($('#appNameTemp').val() == '1' && $.trim($("#appLink").val()) == ''){
					window.top.scroll(0, frame1Top+$('#appLink').offset().top);
					return false;
				}else{
					return true;
				}
			},
			versionH: function(){
				var flag = true;
				if($('#appNameTemp').val() == '1' && $.trim($("#versionH").val()) != ''){				
					var packName = $("#appNameSel").val();
					var versionName = $.trim($("#versionH").val());
					$.ajax({
		        		url : ctx + '/checkVersionName.jspx',
		        		data : {
		        				packName: packName,
		        				versionName: versionName
		        				},
		        		type : 'post',
		        		async : false,
		        		dataType : 'text',
		        		success : function(data) {
		        			if(data == "3"){
		        				flag = true;
		        				repeat=false;
		        				$("#errorInfo").html("");
		        			}else{
		        				if(data == "2"){
		        					flag = false;
		        					repeat=true;
		        					$("#errorInfo").html("同一产品每个自然月只可申请1次福利,若有疑问请联系mmbusiness@lenovo.com或企业QQ：800059431");
		        				}else if(data == "0"){
		        					repeat=true;
		        					flag = true;
		        					$("#errorInfo").html("同一产品每个自然月只可申请1次福利,若有疑问请联系mmbusiness@lenovo.com或企业QQ：800059431");
		        				}else{
		        					flag=false;
		        					repeat=false;
		        					$("#errorInfo").html("");
		        				}
		        			}
		        		}
		        	});
				}
				if(!flag){
					window.top.scroll(0, frame1Top+$('#versionName').offset().top);
				}
				return flag;
			},
			applyDate: function(){
				var iframe = window.top.document.getElementById("frame1");
				var publishDate = $('#publishDate');
				var startD = $("#startD").val();
				var days = $("#days").val();
				var date = publishDate.val();
				var dates = date.split(" ");
				
				var sd = new Date(startD.replace(/-/g,"/"));		
				var inSd = new Date(dates[0].replace(/-/g,"/"));
				var temp = inSd.getTime() + (days-1)* 24 * 60 * 60 * 1000;
				var ed = new Date(dateToStr(new Date(temp)).replace(/-/g,"/"));
				var inEd = new Date(dates[2].replace(/-/g,"/"));
				if(inSd < sd){
					iframe.height = iframe.contentWindow.document.body.scrollHeight + 50;
					return false;
				}
				if(ed < inEd){
					iframe.height = iframe.contentWindow.document.body.scrollHeight + 50;
					return false;
				}
				iframe.height = iframe.contentWindow.document.body.scrollHeight;
				return true;
			},
			channels: function(gets){
				var key;
				key = $('#channelH').val();
		        if(key.length > 0){        	
		        	for(var i=1;i<=key.length;i++){        			
		        		if(key[i-1] == 1 && $.trim($("#wb").val()) == ''){
		        			return false;
		        			break;
		        		}
		        		if(key[i-1] == 2 && $.trim($("#wx").val()) == ''){
		        			return false;
		        			break;
		        		}
		        		if(key[i-1] == 3 && $.trim($("#gw").val()) == ''){
		        			return false;
		        			break;
		        		}
		        		if(key[i-1] == 4 && $.trim($("#mt").val()) == ''){
		        			return false;
		        			break;
		        		}
		        		if(key[i-1] == 5 && $.trim($("#other").val()) == ''){
		        			return false;
		        			break;
		        		}
		        	}
		        }
		        return true;				
			},
			//是否独家
			newIsOnly2: function(gets){
				var q = $('input[name="singleWelfarePlatform"]').offset().top;
				if(gets){
					return true;
				}else{					
					window.top.scroll(0, frame1Top+q);
					return false;
				}
			},
			//联合首发平台
			newPlatform3: function(gets){
				if($('input[name="newIsOnly2"]').val() == 0){
					return true;
				}else{
					var q = $('ul.new_appList').offset().top;
					if(gets){
						if($('#checkbox-other')[0].checked){
							if($('#checkbox-other2').val() == ''){
								window.top.scroll(0, frame1Top+q);
								return false;
							}else{
								return true;
							}
						}else if($('#platNumH').val() > 0){
							return true;
						}else{
							window.top.scroll(0, frame1Top+q);
							return false;
						}
					}else{
						window.top.scroll(0, frame1Top+q);
						return false;
					}
				}
			}
		},
		beforeSubmit: function(){
			if(repeat){
				return false;
			}
		}
	}); 
	formValid.addRule([
	    {
			ele:'#versionH',
			datatype:'versionH',
			errormsg:'与应用的版本不一致!'
		},
		{
			ele:'#channelH',
			datatype:'channels',
			errormsg:'请填写信息!'
		},
		{
			ele:'#publishDate',
			datatype:'applyDate',
			errormsg:'福利发布时间有误!'
		},
		{
			ele:'#appNameH',
			datatype:'appNameS',
			errormsg:'请选择应用!'
		},
		{
			ele:'#appNameI',
			datatype:'appNameI',
			nullmsg:'请填写信息!'
		},
		{
			ele:'#versionName',
			datatype:'*'
		},
		{
			ele:'#appLink',
			datatype:'appLinkI',
			nullmsg:'请填写信息!'
		},
		{
			ele:'#welfareName',
			datatype:'*'
		},
		{
			ele:'#welfareIntro',
			datatype:'*'
		},
		{
			ele: '#newPlatform3',
			datatype:'newPlatform3',
			nullmsg:'联合首发平台!',
			errormsg:'联合首发平台!'
		},
		{
			ele:'#contactPerson',
			datatype:'*2-20',
			errormsg:'长度为2-20位字符以内'
		},
		{
			ele:'#contactQQ',
			datatype:'n',
			errormsg:'QQ号必须是数字!'
		},
		{
			ele:'#contactPhone',
			datatype:/^\d{7,20}$|^\d{2,6}-\d{6,10}$/,
			errormsg:'电话格式错误，请重新输入!'
		}
	]);
});

function dateToStr(date) {
	var dateYear = date.getFullYear();
	var dateMonth = date.getMonth() + 1;
	if (dateMonth < 10) {
		dateMonth = "0" + dateMonth;
	}
	var dateDay = date.getDate();
	if (dateDay < 10) {
		dateDay = "0" + dateDay;
	}
	return dateYear + "-" + dateMonth + "-" + dateDay;
}

function setCheckBox(){
	var s='';
	$('input[name="channel"]:checked').each(function(){
		var v = $(this).val();
		if(v == '1'){
			s+=v+"-"+$("#wb").val()+',';
		}
		if(v == '2'){
			s+=v+"-"+$("#wx").val()+',';
		}
		if(v == '3'){
			s+=v+"-"+$("#gw").val()+',';
		}
		if(v == '4'){
			s+=v+"-"+$("#mt").val()+',';
		}
		if(v == '5'){
			s+=v+"-"+$("#other").val()+',';
		}
	});
	s=s.substring(0, s.length-1);
	var appValue = $("#appNameSel").val();
	var appText = $("#appNameSel").find("option:selected").text();
	$("#appNameValue").val(appValue);
	$("#appNameLabel").val(appText);
	$("#boxH").val(s);
}

function countResultWord(obj) {
    var length = $(obj).val().length;
    var str = $(obj).val();
    if (length > 5000) {
        $(obj).val(str.substring(0, 5000));
        errorInfo();
    	$("#infoPop").text('已经达到5000字上限');
    	showPopwindow('pop_info');
    }
    $("#spanWordCount").html($(obj).val().length);
    $("#spanWordCountLeft").html(5000 - $(obj).val().length);
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
}
function resultSubmit(ctx, welfareId){
	var md = $.trim($("#md").val());
	if(md == ''){
		alert("请输入中奖名单！");
		return;
	}else{
		$("#resultForm").attr("action", ctx + "/saveSubmitted.jspx?welfareId="+welfareId).submit();
	}
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
function goToSubmitResult(ctx){
	window.parent.location.href= ctx + '/gotoSubmitResult.jspx';
}
function goToApplyRecord(ctx){
	window.parent.location.href= ctx + '/gotoApplyRecord.jspx';
}