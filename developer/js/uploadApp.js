//原型对象
function UploadApp() {
}

UploadApp.prototype.cleanPackage = function (id) {
    $("#packageName").val("");
    $("#appVersioncode").val("");
    $("#version").val("");
    $("#programeListTd").html("");
    if (id == "apk") {
        $("#programeListTd").html(packageInfo.apk);
    } else if (id == "ltp") {
        $("#programeListTd").html(packageInfo.ltp);
    } else if (id == "intel_apk") {
        $("#programeListTd").html(packageInfo.intel_apk);
    }
};

UploadApp.prototype.addLabel = function(labelId, labelName) {
    if ($("#label" + labelId).length > 0) {
        return;
    }
    if ($("#choosedLabel dd").size() == 10) {
        alert("最多只能选择10个系统标签");
        return;
    }
    var elementLabelId = "label" + labelId;
    var inputId = "choosedLabelInput" + labelId;
    $("#choosedLabel").append('<dd id="' + elementLabelId + '"><a href="javascript:uploadApp.deleteLabel(' + labelId + ');">删除</a>' + labelName + '<input id="' + inputId + '" name="labels" type="hidden" value="' + labelId + '" /></dd>');
    //$("#choosedLabel").append('<input id="'+inputId+'" name="labels" type="hidden" value="'+labelId+'" />');
};

UploadApp.prototype.deleteLabel = function(labelId) {
    $("#label" + labelId).remove();
    //var inputId = "choosedLabelInput" + labelId;
    //$("#"+inputId).remove();
};

UploadApp.prototype.tvChecked = function() {
    var objs = document.getElementsByName("chipType");
    var obj = document.getElementById("onlyTv");
    for (var i = 0; i < objs.length; i++) {
        if (obj.checked) {
            if (objs[i].value == "ARM") {
                objs[i].checked = "checked";
            } else {
                objs[i].checked = "";
                objs[i].disabled = true;
            }
        } else {
            objs[i].disabled = false;
        }
    }
};

//使设备类型勾选框不可选
UploadApp.prototype.disableCheckBox = function(id) {
    var obj = document.getElementsByName("deviceKinds");
    for (var i = 0; i < obj.length; i++) {
        if (id == 3) {
            if (obj[i].value == id) {
                obj[i].disabled = true;
            }
        } else {
            if (!obj[i].checked) {
                obj[i].disabled = true;
            }
        }
    }
};

//使设备类型勾选框可选
UploadApp.prototype.ableCheckBox = function(obj) {
    var objs = document.getElementsByName("deviceKinds");
    for (var i = 0; i < objs.length; i++) {
        if (obj.value == 3 || (!objs[0].checked && !objs[1].checked && !objs[3].checked)) {
            objs[i].disabled = false;
            //document.getElementById("intel_apk").disabled = false;
        }
//		if(obj.value == 4 || (!objs[0].checked && !objs[1].checked && !objs[2].checked)){
//			//document.getElementById("intel_apk").disabled = false; 
//			document.getElementById("ltp").disabled = false;
//			document.getElementById("apk").disabled = false;
//		}
    }
};

//勾选设备类型触发
UploadApp.prototype.deviceChecked = function(obj) {
    if (obj.checked && obj.value == "3") {
        this.disableCheckBox(1);
        //document.getElementById("intel_apk").disabled = true;
    }
    if (obj.checked && obj.value != "3") {
        this.disableCheckBox(3);
        //document.getElementById("intel_apk").disabled = true;
    }
//	if(obj.checked && obj.value=="4"){
//		this.disableCheckBox(1);
    //document.getElementById("intel_apk").disabled = false;
//		document.getElementById("ltp").disabled = true;
//		document.getElementById("apk").disabled = true;
//	}
    if (!obj.checked) {
        this.ableCheckBox(obj);
    }
};

//页面加载时判断设备类型
UploadApp.prototype.deviceCheck = function() {
    var obj = document.getElementsByName("deviceKinds");
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].checked && obj[i].value == "3") {
            this.disableCheckBox(1);
            //document.getElementById("intel_apk").disabled = true;
        } else if (obj[i].checked && obj[i].value != "3") {
            this.disableCheckBox(3);
            //document.getElementById("intel_apk").disabled = true;
//		}else if(obj[i].checked && obj[i].value=="4"){
//			this.disableCheckBox(1); 
            //document.getElementById("intel_apk").disabled = false;
//			document.getElementById("ltp").disabled = true;
//			document.getElementById("apk").disabled = true;
        }
    }
};

UploadApp.prototype.changeImageList = function(resolution) {
    if ($("#verticalPics" + resolution).attr("checked") == true) {
        $("#horizontalPicsList" + resolution).hide();
        $("#verticalPicsList" + resolution).show();
    } else {
        $("#horizontalPicsList" + resolution).show();
        $("#verticalPicsList" + resolution).hide();
    }
};

UploadApp.prototype.changePrice = function() {
    $("#errorInfo").remove();
};

UploadApp.prototype.goToSecondPage = function() {
    var error = this.validateForStep1();
    $("#errorInfo").remove();
    var isMessage = $("#yes").attr("checked");
    var inputValue = $("#appPrice").val();
    var str = '<tr id="errorInfo"><td colspan="5"><div class="warning" id="extraValue">应用价格超出短信支付最大限额</div></td></tr>';
    if (error != null) {
    	errorInfo();
    	$("#infoPop").text(error);
    	showPopwindow('pop_info');
        return false;
    } else if (isMessage == true) {
        $.ajax
                (
                {
                    url:'checkPrice.jspx',
                    secureuri:false,
                    dataType: 'json',
                    success: function (data, status) {
                        var payValue = parseInt(data);
                        if (payValue == null) {
                        	errorInfo();
					    	$("#infoPop").text('数据库短信阀值配置错误，请连接管理员！');
					    	showPopwindow('pop_info');
                        } else if (inputValue > payValue) {
                            $(document.getElementById('isMesg')).after(str);
                            return false;
                        }
                        $("#supportMesg").val("1");
                        $("#form").submit();
                    },
                    error: function (data, status, e) {
                        alert(data);
                        alert(e);
                        alert(status);
                    }
                }
                        );
    } else {
        $("#supportMesg").val("0");
        $("#form").submit();
    }
};

UploadApp.prototype.validateForStep1 = function() {
    var isPay = $("#isPaySelect").val();
    var deKind = $("#deKind").val();
    var priceAlert = "应用价格必须填写正整数";
    var r = /^[0-9]*[1-9][0-9]*$/;
    if (deKind == "tv") {
        r = /^\d+(\.\d+)?$/;
        priceAlert = "应用价格必须为数字";
    }
    if (isPay == "1") {
        var price = $("#appPrice").val() * 10 / 10;
        if ($("#appPrice").val() != "0.01") {
            if (!this.isNumber(price) || !r.test(price)) {
                return priceAlert;
            }
        }
    }

    var author = $("#author").val();
    if (author == null || author.length > 40) {
        return "作者名称最多填写40个字符";
    }
    return null;
};

UploadApp.prototype.isNumber = function (oNum) {
    if (!oNum)
        return false;
    var strP = /^\d+(\.\d+)?$/;
    if (!strP.test(oNum))
        return false;
    try {
        if (parseFloat(oNum) != oNum)
            return false;
    } catch (ex) {
        return false;
    }
    return true;
};

UploadApp.prototype.goToThirdPage = function(obj) {
    //----必须上传了程序包
    if ($("#programeListTd a").size() < 1) {
    	errorInfo();
    	$("#infoPop").text('请先上传程序包');
    	showPopwindow('pop_info');
        return false;
    }
    showLoading();
    $("#form").submit();
};

UploadApp.prototype.submitImage = function () {
    if ($("#isImageUpload").val() == "0") {
        alert("请先上传图片");
        return;
    }
    var imagePath = $("#imagePath").val();
    var imageW = $("#imageWidth").val();
    var imageH = $("#imageHeight").val();
    var width = "90";
    var height = "150";
    var layouts = "0";
    if (parseInt(imageW) >= parseInt(imageH)) {
        width = "150";
        height = "90";
        layouts = "1";
    }
    var imgLiId = "imgLi" + Math.floor(Math.random() * 100000000 + 1);
    var verticalPicsList = $("#verticalPicsList");
    verticalPicsList
            .append('<li id="' + imgLiId + '"><img src="./ReadImageServlet?path=' + imagePath + '" width="' + width + '" height="' + height + '" alt="" />'
            + '<a href="javascript:uploadApp.deleteImageLi(\'' + imgLiId + '\')">删除</a>'
            + '<input type="hidden" name="uploadImages" value="' + imagePath + '"/>'
            + '<input type="hidden" name="imageLayouts" value="' + imagePath + '=' + layouts + '"/>'
            + '</li>');
    verticalPicsList.show();
    hidePopwindow("pop_one");
};

UploadApp.prototype.deleteImageLi = function (imageLiId) {
    //alert(imageLiId+"....."+$("#"+imageLiId).size()+"......"+$("#"+imageLiId).html());
    var size = $("#" + imageLiId).size();
    $("#" + imageLiId).remove();
};

UploadApp.prototype.initPackageType = function (packageTypeId) {
    var str = '<a href="#">' + programeFilePath + '</a> <a href="javascript: uploadApp.deletePrograme()" class="delete"><img src="img/delete.gif" width="13" height="13" alt="" /></a><input type="hidden" name="programeFile" value="' + programeFilePath + ' />';
    if (packageTypeId == null || packageTypeId == 0) {
        $("#apk").attr("checked", true);
        if (packageTypeId == null) {
            packageInfo.apk = "";
        } else {
            packageInfo.apk = str;
        }
    } else if (packageTypeId == 2) {
        $("#ltp").attr("checked", true);
        packageInfo.ltp = str;
    } else if (packageTypeId == 3) {
        $("#intel_apk").attr("checked", true);
        packageInfo.intel_apk = str;
    }
    //-----是否显示填写安装标志的文本框
    if (packageTypeId == null || packageTypeId == 0 || packageTypeId == 3) {
        $(".packageAttr").hide();
    }
    else {
        $(".packageAttr").show();
    }
};

//是否显示应用类型声明-----现在取消了leos可注释掉
/**UploadApp.prototype.displayTypeDeclare = function (){
 if($("#dlleos dd").size()<1){
 $("#trTypeDeclare").hide();
 }else{
 $("#trTypeDeclare").show();
 }
 };**/
var over = false;
var inter;
var analytic = false;
var maxSize = 1024 * 1024 * 1024+200 * 1024 * 1024;
UploadApp.prototype.validateApk = function (fileObj) {
	$("#btn_real").addClass("none");
	$("#btn_none").removeClass("none");
	$(".proBarBox").addClass("none"); 
	over = false;
	analytic = false;
	$(".proRedBar").css("width","0%");
	$(".barMes span:last-child").html("0KB/秒");
    $(".right").html("已上传&nbsp;0%");
	$(".uploadTip").addClass("none"); 
	$("#packageError").empty();
    var objid = fileObj.id;
    var objsrc = fileObj.src;
    var type = 1;
    var error = document.getElementById('packageNameError');
    var error1 = document.getElementById('VersioncodeError');
    var error2 = document.getElementById('versionError');
    if (error != null) {
        error.innerHTML = '';
    }
    if (error1 != null) {
        error1.innerHTML = '';
    }
    if (error2 != null) {
        error2.innerHTML = '';
    }
    var objFileUpload=document.getElementById('imgFile');
    var FileName=new String(objFileUpload.value);
    var extension=new String (FileName.substring(FileName.lastIndexOf(".")+1,FileName.length));
    if(extension=="apk"||extension=="APK")
    {
        $("#fileFrom").submit();
   		inter = setInterval(req,1000);
  		$(".proBarBox").removeClass("none"); 
  		$("#imgFile").attr("disabled",true);
    }else{
    	var tdObj = $("#packageError");
        $("#packageError").prepend("请上传apk类型的文件");
        $(".uploadTip").removeClass("none");
        return;
    }
};

UploadApp.prototype.uploadApk = function (fileObj, formerVersionLcaid) {
    $(".proBarBox").ajaxStart(function(){
		inter = setInterval(req,1000);
    	$(this).removeClass("none"); 
    	$("#imgFile").attr("disabled",true);
	});
    $.ajaxFileUpload
            (
            {
                url:'fileUpload.jspx?&uploadid=' + objid + "&fileType=" + type + "&lcaid=" + formerVersionLcaid,
                secureuri:false,
                fileElementId:objid,
                dataType: 'json',
                success: function (data, status) {
			        over = true;
			        clearInterval(inter);
                    if (data.error != "" && data.error != undefined && data.error != null) {
                    	$(".proBarBox").addClass("none"); 
                        $("#packageError").prepend(data.error);
                		$(".uploadTip").removeClass("none"); 
                    } else {
                    	$(".proRedBar").animate({width:"100%"},500);
                    	$(".barMes span:last-child").html("0KB/秒");
                    	$(".right").html("已上传&nbsp;100%");
                        var tdObj = $("#programeListTd");
                        tdObj.empty();
                        var str = '<a href="#">' + data.file + '</a> <a href="javascript: uploadApp.deletePrograme()" class="delete"><img src="img/delete.gif" width="13" height="13" alt="" /></a><input type="hidden" name="programeFile" value="' + data.file + '" />';
                        $(str).appendTo(tdObj);
                        packageInfo.apk = str;
                        $("#apkChange").val("change");
                        $("#imgFile").val("");
                    }
                    $("#imgFile").attr("disabled",false);
                },
                error: function (data, status, e) {
                	over = true;
                   	clearInterval(inter);
                    alert(e);
                    alert(status);
                }
            }
            );
};

function req(){
	if(over){
		clearInterval(inter);
		return;
	}
   	$.ajax({   
	   	url:"reback_json.jspx",   
	   	type:"GET", 
	   	dataType: 'json',      
	   	success:function(data, status){ 
	   		if(analytic || over){
	   			return;
	   		}
	   		if (data.error != "" && data.error != undefined && data.error != null) {
	   			over = true;
               	clearInterval(inter);
            	$(".proBarBox").addClass("none");
            	$("#programeListTd").empty();
            	$("#packageError").prepend(data.error);
        		$(".uploadTip").removeClass("none");
        		return;
            } else { 
            	var info = data.info; 
				var state = info.split("-");
				if(state[3]>maxSize){
					over = true;
					$(".proBarBox").addClass("none");
					$("#programeListTd").empty();
					$("#packageError").prepend("程序包文件不能大于1G");
					
	        		$(".uploadTip").removeClass("none");
	        		return;
				}
				$(".proRedBar").animate({width:state[1]+"%"},500);
			   	$(".barMes span:last-child").html(state[0]+"/秒");
			   	$(".right").html("已上传&nbsp;"+state[1]+"%");
				if(state[2] == 0){
					over = true;
					analytic = true;
					$(".proRedBar").animate({width:"100%"},500);
				   	$(".barMes span:last-child").html("");
				   	$(".right").html("正在解包...");
				   	$.ajax({   
					   	url:'analyticFile.jspx?&lcaid=' + formerVersionLcaid,
					   	dataType: 'json',     
					   	success:function(data,status){
					   		$("#btn_real").removeClass("none");
							$("#btn_none").addClass("none");
					        clearInterval(inter);
		                    if (data.error != "" && data.error != undefined && data.error != null) {
		                    	var errors = data.error;
		                    	if(errors.indexOf("apkSignerDif")>=0){
		                    		var packagename = errors.split("=");
		                    		var strr = "<span>该应用（包名="+packagename[1]+"）与老版本签名不一致，无法更新。如需帮助，可联系</span><a href='mailto:mmsupport@lenovo.com'>mmsupport@lenovo.com</a>";
		                    		$(strr).appendTo("#packageError");
		                    	}else{
		                    		var aa = "<span>" + errors + "</span>";
		                    		$(aa).appendTo("#packageError");
		                    	}
		                    	$("#programeListTd").empty();
		                    	$(".proBarBox").addClass("none"); 
		                		$(".uploadTip").removeClass("none"); 
		                    } else {
		                    	$(".proRedBar").animate({width:"100%"},500);
		                    	$(".barMes span:last-child").html("");
		                    	$(".right").html("上传成功！");
		                        var tdObj = $("#programeListTd");
		                        tdObj.empty();
		                        var str = '<a href="javascript:;">' + data.file + '</a><a href="javascript: uploadApp.deletePrograme()" class="delete"><img src="img/delete.gif" width="13" height="13" alt="" /></a><input type="hidden" name="programeFile" value="' + data.file + '" />';
		                        $(str).appendTo(tdObj);
		                        packageInfo.apk = str;
		                        $("#apkChange").val("change");
		                        $("#imgFile").val("");
		                    }
		                    $("#imgFile").attr("disabled",false);
		                },
		                error: function (status, e) {
		                	over = true;
		                   	clearInterval(inter);
		                    alert(e);
		                    alert(status);
		                }
				   	});
				} 
			}
	   	}
   	});
};

UploadApp.prototype.deletePrograme = function () {
	$(".uploadTip").addClass("none"); 
	$("#packageError").empty();
    $(".proBarBox").addClass("none"); 
    $(".proRedBar").css("width","0px");
    $("#programeListTd").empty();
    $("#imgFile").val("");
    var error = document.getElementById('packageNameError');
    var error1 = document.getElementById('VersioncodeError');
    var error2 = document.getElementById('versionError');
    if (error != null) {
        error.innerHTML = '';
    }
    if (error1 != null) {
        error1.innerHTML = '';
    }
    if (error2 != null) {
        error2.innerHTML = '';
    }
};

UploadApp.prototype.countWord = function (obj) {
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

UploadApp.prototype.countChar = function (obj) {
    var length = $(obj).val().length;
    var str = $(obj).val();
    if (length > 1000) {
        $(obj).val(str.substring(0, 1000));
        errorInfo();
    	$("#infoPop").text('已经达到1000字上限');
    	showPopwindow('pop_info');
    }
    $("#newCharCount").html($(obj).val().length);
    $("#newCharCountLeft").html(1000 - $(obj).val().length);
};

UploadApp.prototype.showComplain = function () {
	$("#nullerror").text('');
	showPopwindow('pop_one');
}

UploadApp.prototype.submitComplain = function () {
    var complain = $("#complainText").val();
    var packageName = $("#packageName").val();
    //complain=encodeURI(complain);
    //complain=encodeURI(complain);
    if (complain == null || complain == '') {
    	$("#nullerror").text('请填写申诉理由');
        return;
    } else {
        var options = {
            url:'addComplain.jspx?&packageName=' + packageName,
            type:'post',
            dataType:'json',
            clearForm:true,
            success: function (data, status) {
                if (data.error != "" && data.error != undefined && data.error != null) {
                	errorInfo();
			    	$("#infoPop").text(data.error);
			    	showPopwindow('pop_info');
                } else {
                    hidePopwindow("pop_one");
                    errorInfo();
			    	$("#infoPop").text(data.file);
			    	showPopwindow('pop_info');
                }
            },
            error: function (data, status, e) {
                alert(e);
                alert(e + ";" + "status:" + status);
            }
        };
        // 将options传给ajaxForm
        $('#complainFrom').ajaxForm(options);
        $('#complainFrom').submit();
    }
};

UploadApp.prototype.validateLabelWord = function (obj) {
    var length = $(obj).val().length;
    var str = $(obj).val();
    if (length > 8) {
        $(obj).val(str.substring(0, 8));
        alert("自定义标签只能填写8个字符");
    }
};

UploadApp.prototype.uploadFile = function (fileObj) {
    if ($("#verticalPicsList li").size() == 10) {
    	errorInfo();
    	$("#infoPop").text('最多只能上传10个截图');
    	showPopwindow('pop_info');
        return;
    }
    var objid = fileObj.id;
    var objsrc = fileObj.src;
    var st = "width: 133px; height: 220px;";
    $.ajaxFileUpload
            (
            {
                url:'fileUpload.jspx?&uploadid=' + objid + "&fileType=0",
                secureuri:false,
                fileElementId:objid,
                dataType: 'json',
                success: function (data, status) {
                    if (data.error != "" && data.error != undefined && data.error != null) {
                    	errorInfo();
				    	$("#infoPop").text(data.error);
				    	showPopwindow('pop_info');
                    } else {
                        $("#isImageUpload").val("1");
                        var imagePath = data.file;
                        var imageW = data.width;
                        var imageH = data.height;
                        var width = "90";
                        var height = "150";
                        var layouts = "0";
                        if (parseInt(imageW) >= parseInt(imageH)) {
                            width = "150";
                            height = "90";
                            layouts = "1";
                        }
                        var imgLiId = "imgLi" + Math.floor(Math.random() * 100000000 + 1);
                        var verticalPicsList = $("#verticalPicsList");
                        verticalPicsList
                                .append('<li id="' + imgLiId + '"><img src="./ReadImageServlet?path=' + imagePath + '" width="' + width + '" height="' + height + '" alt="" />'
                                + '<a href="javascript:uploadApp.deleteImageLi(\'' + imgLiId + '\')">删除</a>'
                                + '<input type="hidden" name="uploadImages" value="' + imagePath + '"/>'
                                + '<input type="hidden" name="imageLayouts" value="' + imagePath + '=' + layouts + '"/>'
                                + '</li>');
                        verticalPicsList.show();

                    }
                },
                error: function (data, status, e) {
                    alert(e + ";" + "status:" + status + ";data:" + data.file);
                }
            }
                    );
};

/**
 * 上传图标的post跳转
 */
UploadApp.prototype.submitIcon = function() {
    if ($("#preimg img").attr("src") == "images/img64.gif") {
        alert('请选择图片！');
    } else {
        var iconPath = $("#iconPath").val();
        var iconLiId = "iconLi" + Math.floor(Math.random() * 100000000 + 1);
        document.getElementById('finalIcon').innerHTML = '<li id="' + iconLiId + '"><img src="./ReadImageServlet?path=' + iconPath + '" width="64" height="64" alt="" /> <a href="javascript:uploadApp.deleteImageLi(\'' + iconLiId + '\')">删除</a><input type="hidden" name="uploadIcons" value="' + iconPath + '"/></li>';
        hidePopwindow("pop_two");
    }
};

UploadApp.prototype.submitInit = function() {
    hidePopwindow("pop_three");
};

$('#iconFile').live('mousedown', function() {
	$("#clickIcon").attr("src", "images/iconFile2.png");
}); 

$('#iconFile').live('mouseup', function() {
	$("#clickIcon").attr("src", "images/iconFile1.png");
}); 

/**
 *
 * @param fileObj
 */
UploadApp.prototype.uploadImage = function (fileObj,fileType) {
    var objid = fileObj.id;   
    if(fileType == 7 ||fileType == 8 || fileType == 6){
    	$(fileObj).siblings("em").show() ;
    	$("#apkApp7File").hide() ;
    }
    var loadingIcon = $(fileObj).siblings("em");
    $.ajaxFileUpload
            (
            {
                url:'fileUpload.jspx?&loadid=' + objid + "&fileType=" + fileType,
                secureuri:false,
                fileElementId:objid,
                dataType: 'json',
                success: function (data, status) {
                    if (data.error != "" && data.error != undefined && data.error != null) {
                    	errorInfo();
				    	$("#infoPop").text(data.error);
				    	showPopwindow('pop_info');
				    	if (fileType == 6 || fileType == 7 || fileType == 8){				    		
				    		loadingIcon.hide() ;
				    	}
                    } else {
                    	var iconPath = data.file;
						if (fileType == 4) {
							document.getElementById('finalIcon').innerHTML='<input class="iconinputmodify" type="file" name="iconFile" id="iconFile" onchange="uploadApp.uploadImage(this,4)" hidefocus="true"/><img src="./ReadImageServlet?path='+iconPath+'" width="64" height="64" alt="" /> <a id="changeIcon" style="margin-right:10px;" class="btn-class" href="javascript:;">修改</a><div class="gray" style="float:left;margin-left:10px; line-height:30px;width: 310px;">格式png，大小<=500K，尺寸必须为256*256，为不影响展示，游戏类图标建议控制在50K以内</div><input type="hidden" name="uploadIcons" value="'+iconPath+'"/>';	
						} else if (fileType == 5) {
							document.getElementById('finalHdicon').innerHTML='<input class="iconinputmodify" type="file" name="hdiconFile" id="hdiconFile" onchange="uploadApp.uploadImage(this,5)" hidefocus="true"/><img src="./ReadImageServlet?path='+iconPath+'" width="64" height="64" alt="" /> <a id="changeIcon" class="btn-class" href="javascript:;">修改</a><input type="hidden" name="uploadHdicons" value="'+iconPath+'"/>';	
						} else if (fileType == 2) {
							document.getElementById('finalCardPath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="cardPath" value="'+iconPath+'"/>';$('#finalCardPath').next('div.change_box').hide();	
						} else if (fileType == 3) {
							document.getElementById('finalAuthorizationPath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="authorizationPath" value="'+iconPath+'"/>';$('#finalAuthorizationPath').next('div.change_box').hide();	
						} else if (fileType == 9) {
							document.getElementById('finalOtherPath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="otherPath" value="'+iconPath+'"/>';$('#finalOtherPath').next('div.change_box').hide();	
						} else if (fileType == 10) {
							document.getElementById('finalCardPath2').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="cardPath2" value="'+iconPath+'"/>';$('#finalCardPath2').next('div.change_box').hide();	
						} else if (fileType == 11) {
							document.getElementById('finalOther1').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="otherPath1" value="'+iconPath+'"/>';$('#finalOther1').next('div.change_box').hide();	
						} else if (fileType == 12) {
							document.getElementById('finalOther2').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="otherPath2" value="'+iconPath+'"/>';$('#finalOther2').next('div.change_box').hide();	
						} else if (fileType == 13) {
							document.getElementById('finalOther3').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="otherPath3" value="'+iconPath+'"/>';$('#finalOther3').next('div.change_box').hide();	
						} else if (fileType == 14) {
							document.getElementById('finalQuaCertFilePath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="quaCertFilePath" value="'+iconPath+'"/>';$('#finalQuaCertFilePath').next('div.change_box').hide();	
						} else if (fileType == 18) {
							document.getElementById('finalBusinessLicencePath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="businessLicencePath" id="businessLicenceH" value="'+iconPath+'"/>';$('#finalBusinessLicencePath').next('div.change_box').hide();	
							$('#btn_com_chg_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
							$('#infoMsg').html('&nbsp;');
							$("#img_type").css("display","block");
							$('#img_type_right').css('display','block');
							$('#img_type_wrong').css('display','none');
						} else if (fileType == 19) {
							document.getElementById('finalFinancialRegCertPath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="financialRegCertPath" id="financialRegCertH" value="'+iconPath+'"/>';$('#finalFinancialRegCertPath').next('div.change_box').hide();	
							$('#btn_com_chg_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
							$('#infoMsg').html('&nbsp;');
							$("#img_type").css("display","block");
							$('#img_type_right').css('display','block');
							$('#img_type_wrong').css('display','none');
						} else if (fileType == 20) {
							document.getElementById('finalGeneralTaxpayerPath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="generalTaxpayerPath" id="generalTaxpayerH" value="'+iconPath+'"/>';$('#finalGeneralTaxpayerPath').next('div.change_box').hide();	
							$('#btn_com_chg_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
							$('#infoMsg').html('&nbsp;');
							$("#img_type").css("display","block");
							$('#img_type_right').css('display','block');
							$('#img_type_wrong').css('display','none');
						} else if (fileType == 24) {
							document.getElementById('finalIdCardFrontPath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="idCardFrontPath" id="idCardFrontH" value="'+iconPath+'"/>';$('#finalIdCardFrontPath').next('div.change_box').hide();	
							$('#btn_per_chg_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
							$('#infoMsg').html('&nbsp;');
							$('#cert_com').html('<input id="financePerCertH" type="hidden"/>&nbsp;');
							$("#img_type").css("display","block");
							$('#img_type_right').css('display','block');
							$('#img_type_wrong').css('display','none');
						} else if (fileType == 25) {
							document.getElementById('finalIdCardBackPath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="idCardBackPath" id="idCardBackH" value="'+iconPath+'"/>';$('#finalIdCardBackPath').next('div.change_box').hide();	
							$('#btn_per_chg_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
							$('#infoMsg').html('&nbsp;');
							$('#cert_com').html('<input id="financePerCertH" type="hidden"/>&nbsp;');
							$("#img_type").css("display","block");
							$('#img_type_right').css('display','block');
							$('#img_type_wrong').css('display','none');
						} else if (fileType == 26) {
							document.getElementById('finalSmallTaxpayerPath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="smallTaxpayerPath" id="smallTaxpayerH" value="'+iconPath+'"/>';$('#finalSmallTaxpayerPath').next('div.change_box').hide();	
							$('#btn_com_chg_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
							$("#img_type").css("display","block");
							$('#img_type_right').css('display','block');
							$('#img_type_wrong').css('display','none');
						} else if (fileType == 27) {
							document.getElementById('finalNonVatTaxpayerPath').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="nonVatTaxpayerPath" id="nonVatTaxpayerH" value="'+iconPath+'"/>';$('#finalNonVatTaxpayerPath').next('div.change_box').hide();	
							$('#btn_com_chg_sub').removeAttr("disabled").css({background:'none repeat scroll 0 0 #ff9000'});
							$("#img_type").css("display","block");
							$('#img_type_right').css('display','block');
							$('#img_type_wrong').css('display','none');
						} else if (fileType == 6){
							$("#apkApp7File").show() ;
							$("#finalBigImgFile").html('<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt="" /><button>更改</button>');
							loadingIcon.hide() ;
							$("#copyrightPicture").val(data.file) ;
						} else if(fileType == 7  ){
							$("#apkApp7File").show() ;
							loadingIcon.hide() ;
							$("#apkFileToShow").html("<td></td><td><span style=\"color:blue;\">" + iconPath + "</span></td>").show() ;
							$("#apkFileName").val(data.file) ;
							$("#appName").val(data.filename) ;
							$("#pkgName").val(data.packageName) ;
							$("#versionName").val(data.versionName) ;
							$("#versionCode").val(data.versionCode) ;
						} else if(fileType == 8 ){ 
							$("#apkApp7File").show() ;
							loadingIcon.hide() ;
							$("#signFileToShow").html("<td></td><td><span style=\"color:blue;\">" + iconPath + "</span></td>").show() ;
							$("#signFileName").val(data.file) ;
						} else if(fileType == 21){
							document.getElementById('imgp1').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="topicStoryImg" value="'+iconPath+'"/>';$('#imgp1').next('div.change_box').hide();
						} else if(fileType == 22){
							document.getElementById('imgp2').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="topicStoryImg" value="'+iconPath+'"/>';$('#imgp2').next('div.change_box').hide();
						} else if(fileType == 23){
							document.getElementById('imgp3').innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/><input type="hidden" name="topicStoryImg" value="'+iconPath+'"/>';$('#imgp3').next('div.change_box').hide();
						}
                    }
                },
                error: function (data, status, e) {
                    alert(e + ";" + "status:" + status + ";data:" + data.file1 + data.file2);
                }
            }
                    );
};
/** 上传图标的post跳转  */

var uploadApp = new UploadApp();