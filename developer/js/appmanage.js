var cssVal = 0;
var addv = 0;

function querySubmit() {
    var theForm = document.getElementById("queryForm");
    document.getElementById("pageNo").value = 1;
    theForm.submit();
}

function querySubmit2(value) {
    if (value != "") {
        document.appform.pageIndex.value = value;
        theForm.submit();
    }
}

function submitApp(info_id) {
    createXMLHttpRequest();
    var sUrl = "submitApp.do?submit_info_id=" + info_id;
    xmlHttp.open("post", sUrl, true);
    xmlHttp.onreadystatechange = callbacksubmitApp;
    xmlHttp.send(null);
}

function callbacksubmitApp() {
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var fenshu = xmlHttp.responseText;//服务器返回值
            alert(fenshu);
        }
    }
}

function upappid(appid) {
    location.href = "updateAppPre.do?appId=" + appid;
}

/**
 * 修改支付方式（判断原短信支付方式）
 */
function setappMesag(appLcaid, appPrice) {
    $("#errorInfo").remove();
    document.getElementById("tss").innerHTML = "";
    document.getElementById("initAppPrices").value = appPrice;
    document.getElementById("appLcaid").value = appLcaid;
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
    	$("select").css("visibility", "hidden");
    }
    $.ajax
            (
            {
                url:'mesag_support.jspx?&lcaid=' + appLcaid,
                secureuri:false,
                async:false,
                dataType:'json',
                success:function(data, status) {
                    var mesagSupport = data;
                    $("#isMesg1 input:radio").attr("checked", false);
                    if (mesagSupport == '1') {
                        $("#yes1").attr({ checked: "checked"});
                    } else {
                        $("#no1").attr({ checked: "checked"});
                    }
                    showPopwindow('poplogn2');
                },
                error:function(status, e) {
                    alert(e);
                    alert(status);
                }
            }
                    );

}

function upinfoid(infoId) {
    location.href = "updateAppPre.do?infoId=" + infoId;
}

function selectAll() {
    var ck1 = document.getElementById("selAll").checked;
    var arr = document.getElementsByName("checkboxs");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].type == "checkbox") {
            if (ck1 == true) {
                arr[i].checked = ck1;
            }
            else {
                arr[i].checked = ck1;
            }
        }
    }
}

function doDel(infoId) {
    var r = confirm("是否删除应用!")
    if (r == true) {
        document.getElementById("pageNo").value = 1;
        document.forms[0].action = "delAppSubInfo.jspx?infoId=" + infoId;
        document.forms[0].submit();
    }
}

function doDels() {
    if ($("input:[name='checkboxs']:checked").length == 0) {
    	errorInfo();
    	$("#infoPop").text('请先选择！');
    	showPopwindow('pop_info');
        return;
    }
    var r = confirm("是否删除应用!")
    if (r == true) {
        document.forms[0].action = "delAppSubInfo.jspx";
        document.forms[0].submit();
    }
}

function doCheck(infoId) {
    document.forms[0].action = "appSubInfoCheck.do?infoId=" + infoId;
    document.forms[0].submit();
}

function doTest(infoId) {
    document.forms[0].action = "appSubInfoTest.do?infoId=" + infoId;
    document.forms[0].submit();
}

var xmlHttp;
var stateString;

function createXMLHttpRequest() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
}

function gradedt() {
    createXMLHttpRequest();
    document.getElementById("ts").innerHTML = "";
    $("#errorInfo1").remove();
    var appid = document.getElementById("appids").value;
    var appPrices = document.getElementById("appPrices");
    var appPrice = $("#appPrices").val() * 10 / 10;
    var pricesnote = document.getElementById("pricesnote");
    var oo = /^\d{1,3}(\.\d{1,2})?$/;
    var r = /^[0-9]*[1-9][0-9]*$/;
    var pattern = /^\d+$/;
    var mesagSupport;
    if (!pattern.test(appPrice)) {
        document.getElementById("ts").innerHTML = "定价必须填写整数!";
        appPrices.focus();
        appPrices.select();
        return;
    }
    if (parseInt(appPrices.value) != 1000 && !oo.test(appPrices.value)) {
        document.getElementById("ts").innerHTML = "定价必须填写整数，范围[0-1000]!";
        appPrices.focus();
        appPrices.select();
        return;
    }
    if ((pricesnote.value).length > 100) {
        document.getElementById("ts").innerHTML = "说明超长,限定100个字符，请重新输入!";
        pricesnote.focus();
        pricesnote.select();
        return;
    }
    var sUrl = "updappPrice.do?bz=1&appid=" + appid + "&appprice=" + appPrices.value + "&pricesnote=" + encodeURIComponent(pricesnote.value);
	xmlHttp.open("post", sUrl, true);
    xmlHttp.onreadystatechange = callback1;
    xmlHttp.send(null);
}

/**
 * 提交支付方式更改（判断阀值并提交后台存储）
 * wangkl2
 */
function gradedt2() {
    $("#errorInfo").remove();
    document.getElementById("tss").innerHTML = "";
    var initPrice = document.getElementById("initAppPrices").value;
    var appPrices = document.getElementById("appPrices");
    var appLcaid = document.getElementById("appLcaid").value;
    var isMessage = $("#yes1").attr("checked");
    var mesag;
    var r = /^[0-9]*[1-9][0-9]*$/;
    $.ajax
            (
            {
                url:'checkPrice.jspx',
                secureuri:false,
                async:false,
                dataType:'json',
                success:function(data, status) {
                    if (data == null) {
                    	errorInfo();
				    	$("#infoPop").text('数据库短信阀值配置错误，请连接管理员！');
				    	showPopwindow('pop_info');
                    } else {
                        payValue = parseInt(data);
                    }
                },
                error:function(status, e) {
                    alert(status);
                    alert(e);
                }
            }
                    );
    var str2 = '<tr id="errorInfo"><td  height="22" colspan="2"><div style="color: red;" id="extraValue" align="center">短信支付售价必须为正整数，请先修改应用价格</div></td></tr>';
    var str = '<tr id="errorInfo"><td colspan="2"><div class="warning" id="extraValue" align="left">定价超出短信支付价格范围[1-' + payValue + ']</div></td></tr>';
    if (isMessage == true) {
        if (!r.test(initPrice * 10 / 10)) {
            $(document.getElementById('isMesg1')).after(str2);
            return;
        }
        if (initPrice > payValue) {
            $(document.getElementById('isMesg1')).after(str);
            return;
        }
        mesag = "1";
    } else {
        mesag = "0";
    }
    $.ajax
            (
            {
                url:'set_mesag_support.jspx?&lcaid=' + appLcaid + "&mesag=" + mesag,
                secureuri:false,
                async:false,
                dataType:'text',
                success:function(data, status) {
                    $("#errorInfo").remove();
                    document.getElementById("tss").innerHTML = "支付方式修改成功！";
                    setTimeout("cancel2()", 2000);
                },
                error:function(status, e) {
                    alert(status);
                    alert(e);
                }
            }
                    );
}

var txt2;
var infoId;
var appId;

function uploadapkpackage(infoIdMethod, appIdMethod) {
    appId = appIdMethod;
    infoId = infoIdMethod;
    txt2 = "<input name='uploadAPK' id='uploadAPK' type='file'  onpaste='return false' onkeypress='return checkkey(event.keyCode);' oncontextmenu='return false;' />&nbsp;<p id='alertSpan'>文件大小<=1G</p>";
    $.prompt(txt2, { submit: editDevice1, buttons: { 上传应用包:true,取消:false } });
}

function checkResultForApp(infoId) {
	$(".changeTr").remove();
    $.ajax
    (
    {
        url:'flow_check.jspx?&infoId=' + infoId,
        secureuri:false,
        dataType:'json',
        success:function(data) {
        	if(data == null){
        		str = '<tr class="changeTr"><td><span class="gray">无测试不通过原因</span></td></tr>';
        	} else {
        		var flowR = data.list;
	        	var i, str = '';
				var tipLength = flowR.length;
				if(tipLength > 0){
					for(var i=0;i<tipLength;i+=1){
						str += '<tr class="changeTr"><td><span class="gray">'+flowR[i].key+'</span></td><td><span class="gray">'+flowR[i].result+'</span></td><td><span class="gray">'+flowR[i].remark+'</span></td></tr>';
					}
	            } else {
	            	str = '<tr class="changeTr"><td><span class="gray">无测试不通过原因</span></td></tr>';
	            }
        	}
            $(document.getElementById('flowResultList')).after(str);
        },
        error:function(status, e) {
            alert(status);
            alert(e);
        }
    });
    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style){
		$("select").css("visibility", "hidden");
	}
	showPopwindow('poplogn3');
}

function checkApply(lcaid){
	$("#errorMes").empty();
	$.ajax
    (
    {
        url:'checkApply.jspx?lcaid=' + lcaid,
        dataType:'text',
        success:function(data, status) {
            if (data == "no") {
            	$("#applyLcaid").val(lcaid);
            	$("#applyRemark").val('');
            	$("#defaultRadio_1").attr("checked","checked");
            	$("#applyInfo").text('');
            	showPopwindow('poplogn4');
            } else if (data == "yes"){
            	$("#errorMes").append("该应用已经申请过下架处理，请等待审核，谢谢！");
            	showPopwindow('errorPop');
            } else {
            	$("#errorMes").append("<p>下架申请不通过，理由："+data+"</p><br/>如需帮助，可联系<a href='mailto:mmsupport@lenovo.com'>mmsupport@lenovo.com</a>");
            	showPopwindow('errorPop');
            }
        },
        error: function (status, e) {
            alert(e);
            alert(status);
        }
    }
    );	
}

function applyUndercarriage(){
	$("#errorMes").empty();
	var ajax_data = $("#applyFrom").serialize(); 
	var applyRemark = $("#applyRemark").val();
	var length = applyRemark.length;
	if (applyRemark == null || applyRemark == '') {
		$("#applyInfo").text('请填写申请下架原因');
	} else if (length > 1000) {
		$("#applyInfo").text('亲，输入字数请限制在1000字以内哦亲~');
	} else {
		$.ajax
	    (
	    {
	        url:'applyUndercarriage.jspx',
	        secureuri:false,
	        type: 'post',
	        data:ajax_data,
	        dataType:'text',
	        success:function(data, status) {
	            if (data == "ok") {
	            	hidePopwindow("poplogn4");
	                $("#errorMes").append("下架申请已成功！");
	                showPopwindow('errorPop');
	            } else {
	            	hidePopwindow("poplogn4");
	            	$("#errorMes").append("下架申请失败，请重新审核，谢谢！");
            		showPopwindow('errorPop');
	            }
	        },
	        error: function (status, e) {
	            alert(e);
	            alert(status);
	        }
	    });
   	}
}