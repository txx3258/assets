$(function() {
	$('#parentType').change(function(e) {
		$("#childrenTypeH").val("");
		emptyAppNameOptionList();
		emptyAppInfoInput();
		initInputValue();
		initChildrenType(apptypeJsonData);
		var parType = $.trim($("#parentType").val());
		$('#parentTypeH').val(parType);
	});

	$('#childrenType').change(function(e) {
		emptyAppInfoInput();
		var cType = $.trim($("#childrenType").val());
		$('#childrenTypeH').val(cType);
		if (cType != '-1') {
			getAllOnlineApp(cType);
		}
	});

	$('#appNameSel').change(function(e) {
		var lcaId = $.trim($("#appNameSel").val());
		var appInfo = appInfoMap.get(lcaId);
		if (appInfo == null) {
			emptyAppInfoInput();
		} else {
			$('#lcaIdH').val(appInfo.lcaId);
			$('#appNameH').val(appInfo.appName);
			$('#pkgNameH').val(appInfo.pkgName);
			$('#versionCodeH').val(appInfo.versionCode);
			$('#versionH').val(appInfo.version);
			
			$('#appSelAlertMessage').text("") ;
		}
		
		var pkgName = $("#appNameSel").find("option:selected").attr('pkgName');
		$.ajax({
			url:'specialPkgList.jspx?pkg='+pkgName,
			dataType: 'html',
			success:function(data){
				$("#specialPkgId").empty();
				$('#specialPkgId').prepend("<option value='-1'>----请选择----</option>");
				$('#specialPkgId').append(data);
			},
			 error: function (status, e) {
	            alert(e);
	            alert(status);
	        }
		});
	});
	$('#specialPkgId').change(function(e) {
		var pkgId = $.trim($("#specialPkgId").val());
		var desc = $("#specialPkgId").find("option:selected").attr('desc');
		if (pkgId != '-1') {
			$("#specialPkgDesc").html(desc);
		}else{
			$("#specialPkgDesc").html("");
		}
	});
	
	$('#advertPlanForm :radio').change(function(e) {
		var radioBtn = e.target;
		if (radioBtn.value == '0') {
			$(':input[name="imgFile"]').each(function(idx, obj) {
				obj.disabled = true;
			});
			$('.specialContent').hide();
			$('.existSpecialPkg').hide();
		} else if (radioBtn.value == '1') {
			$(':input[name="imgFile"]').each(function(idx, obj) {
				obj.disabled = false;
			});
			$('.specialContent').show();
			$('.existSpecialPkg').hide();
		} else {
			$(':input[name="imgFile"]').each(function(idx, obj) {
				obj.disabled = true;
			});
			$('.specialContent').hide();
			$('.existSpecialPkg').show();
		}
	});
	
	$('#btn_submit').click(function(e){
		if(!inputValidate()){
			return ;
		}
		
		if(uploadFlagMap.containsKey(0)){
		    $('#submitAlertMsg').text("APK文件正在上传！请稍候再提交...") ;
			return ;
		}
		if(submittedFlag){
			return  ;
		}
		submittedFlag=true ;
		$('#advertPlanForm').submit() ;
		$('#btn_submit').text("提交中...") ;
	}) ;
	
	$('#dailyLimit').blur(function(e) {
		var numReg = /^\d+(\.\d+)*$/ ;
		var dailyLimit = $('#dailyLimit').val() ;
		if(! numReg.test(dailyLimit)){
			validatePassed = false ;
			$('#dailyLimit_msg').addClass('validateErrorMessage').text("要求数字类型") ;
		}else if( dailyLimit < 20){
			validatePassed = false ;
			$('#dailyLimit_msg').addClass('validateErrorMessage').text("要求金额大于等于20") ;
		}else{
			$('#dailyLimit_msg').removeClass('validateErrorMessage').text("对整个推广计划设置每日消费上限") ;
		}
	}) ;
	
    $('#budgetAmount').blur(function(e) {
    	var numReg = /^\d+(\.\d+)*$/ ;
    	var budgetAmount =$('#budgetAmount').val() ; 
    	if(! numReg.test(budgetAmount)){
    		validatePassed = false ;
    		$('#budgetAmount_msg').addClass('validateErrorMessage').text("要求数字类型") ;
    	}else if(budgetAmount < 20){
    		validatePassed = false ;
    		$('#budgetAmount_msg').addClass('validateErrorMessage').text("要求金额大于等于20") ;
    	}else{
    		$('#budgetAmount_msg').removeClass('validateErrorMessage').text("消费完预算额度后推广计划将自动停止。请注意：您设置的预算额度将不能使用到其他新建计划中，若需要将预算额度中的金额恢复至帐户余额中，您可以终止该推广计划即可") ;
    	}
	}) ;
});

function inputValidate(){
	var numReg = /^\d+(\.\d+)*$/ ;
	
	var validatePassed = true ;
	var dailyLimit = $('#dailyLimit').val() ;
	if(! numReg.test(dailyLimit)){
		validatePassed = false ;
		$('#dailyLimit_msg').addClass('validateErrorMessage').text("要求数字类型") ;
	}else if( dailyLimit < 20){
		validatePassed = false ;
		$('#dailyLimit_msg').addClass('validateErrorMessage').text("要求金额大于等于20") ;
	}
	
	var budgetAmount =$('#budgetAmount').val() ; 
	if(! numReg.test(budgetAmount)){
		validatePassed = false ;
		$('#budgetAmount_msg').addClass('validateErrorMessage').text("要求数字类型") ;
	}else if(budgetAmount < 20){
		validatePassed = false ;
		$('#budgetAmount_msg').addClass('validateErrorMessage').text("要求金额大于等于20") ;
	}
	
	if(!validatePassed){
		return validatePassed ;
	}
	
	if(dailyLimit < 0.0001){
		validatePassed = false ;
		$('#dailyLimit_msg').addClass('validateErrorMessage').text("要求大于0") ;
	}
	
	if(budgetAmount <0.0001){
		validatePassed = false ;
		$('#budgetAmount_msg').addClass('validateErrorMessage').text("要求大于0") ;
	}
	
	return validatePassed ;
}



var submittedFlag = false ;
var appInfoMap = new SimpleHashMap();
function SimpleHashMap() {
	var length = 0;
	var entry = new Object();

	this.isEmpty = function() {
		return length == 0;
	};

	this.containsKey = function(key) {
		return (key in entry);
	};

	this.put = function(key, value) {
		if (!this.containsKey(key)) {
			length++;
		}
		entry[key] = value;
	};

	this.get = function(key) {
		return this.containsKey(key) ? entry[key] : null;
	};

	this.clear = function() {
		length = 0;
		entry = new Object();
	};
	this.size = function() {
		return length;
	};

	this.remove = function(key) {
		if (this.containsKey(key) && (delete entry[key])) {
			length--;
		}
	};
}

function initInputValue() {
	$('#childrenTypeH').val("");
}

function initChildrenType(apptypeJsonData) {
	var idVar = $("#parentType>option:selected").get(0).index;
	var appChildType = $("#childrenType");
	var tempC = $("#childrenTypeH").val();
	$("#childrenType option:gt(0)").remove();
	$.each(apptypeJsonData[idVar - 1].children, function(i) {
		var option = "<option value='" + this.id + "' ";
		if (this.id == tempC) {
			option += " selected ";
		}
		option += ">" + this.name + "</option>";
		appChildType.append(option);
	});

}

function emptyAppNameOptionList() {
	$("#appNameSel option:gt(0)").remove();
	appInfoMap.clear();
}

function emptyAppInfoInput() {
	$('#lcaIdH').val("-1");
	$('#appNameH').val("");
	$('#pkgNameH').val("");
	$('#versionCodeH').val("");
	$('#versionH').val("");
}

function getAllOnlineApp(childrenType) {
	var option;
	var appNames = $("#appNameSel");
	emptyAppNameOptionList();
	var temp = $("#lcaIdH").val();
	var ctx = $("#ctxH").val();
	$.ajax({
		url : ctx + '/getAllOnlineApp4AdvertPlan.jspx?ignore=level&childrenType='
				+ childrenType,
		type : 'post',
		dataType : 'json',
		success : function(appNameData) {
			for (var i = 0; i < appNameData.length; i++) {
				option = "<option value='" + appNameData[i].lcaId + "' pkgName='"+appNameData[i].pkgName+"'";
				if (appNameData[i].lcaId == temp) {
					option += " selected ";
				}
				option += ">" + appNameData[i].appName + "</option>";
				appNames.append(option);
				appInfoMap.put(appNameData[i].lcaId, appNameData[i]);
			}

		}
	});
}

function checkOnsaleAppSelected(){
	var pkgName=$('#pkgNameH').val() ;
	if(pkgName==''){
		return false ;
	}
	return true ;
}

var uploadProgressCallMap = new SimpleHashMap();
function clearInterval4UploadProgressCall(channelNumber) {
	var progressCall = uploadProgressCallMap.get(channelNumber);
	if (progressCall != null) {
		clearInterval(progressCall);
		uploadProgressCallMap.remove(channelNumber) ;
	}
}

function emptyApkUploadFileInfo(){
	$('#origApkFileNameH').val("");
	$('#uploadFileNameH').val("");
	$('#uploadFullFileNameH').val("") ;
	$('#uploadFileSizeH').val("") ;
	$('#md5H').val("") ;
	$('#shaH').val("") ;
}

var uploadFlagMap = new SimpleHashMap();
function clearUploadFlag(channelNumber){
	uploadFlagMap.remove(channelNumber);
	if(uploadFlagMap.isEmpty()){
		$("#submitAlertMsg").text("") ;
	}
}
function setUploadFlag(channelNumber){
	uploadFlagMap.put(channelNumber,true) ;
}

function UploadApp() {
}
UploadApp.prototype.uploadChannelFile = function(fileObj) {
	var loadingImg = '<img src="' + $('#ctxH').val()
			+ '/images/loading_circle.gif" />';
	var objId = fileObj.id;

    if(!checkOnsaleAppSelected()){
    	$('#appSelAlertMessage').text("请选择在售应用再上传") ;
    	fileObj.value='' ;
    	return ;
	}else{
		$('#appSelAlertMessage').text("") ;
	}
	
    $('#uploadAlertMessage').text('') ;
    
    emptyApkUploadFileInfo() ;
	
	$('#channelFile').hide();
	$('#channelFile i').text("");
	$('#fileuploadLoadingMsg').html(loadingImg);
	$("#fileuploadMsg").text("开始上传");
	
	setUploadFlag(0) ;
	
	uploadProgressCallMap.put(0,setInterval(function(){
		var callURL = $('#ctxH').val()+"/fileupload/uploadprogress.jspx?token="+$('#uploadTokenH').val() ;
	   	$.ajax({   
		   	  url:callURL,   
		   	  type:"GET", 
		   	  dataType: 'text',      
		   	  success:function(data, status){
		   		  if(data !=''){
		   			$("#fileuploadMsg").text("上传 "+data);
		   		  }
		   		  if(data=='100%'){
		   			clearInterval4UploadProgressCall(0) ;
		   			$("#fileuploadMsg").text("开始解析... ");
		   		  }
		   	  },
		   	  error: function (status, e) {
		   		clearInterval4UploadProgressCall(0) ;
              }
	   	});   
	},100)
	);
	
	$.ajaxFileUpload({
		url : 'fileupload/advertPlanUpload.jspx?uploadTokenId='+$('#uploadTokenH').val(),
		secureuri : false,
		fileElementId : objId,
		dataType : 'json',
		data:{
			'pkg':$('#pkgNameH').val() ,
			'vc':$('#versionCodeH').val()
		},
		success : function(data, status) {
			if (data.error != "" && data.error != undefined
					&& data.error != null) {
				console.debug(data.error);
				$('#uploadAlertMessage').text(data.error);
			} else {
				console.debug(data.file);
				$('#channelFile').show();
				$('#channelFile i').text(data.origfilename);
				
				$('#origApkFileNameH').val(data.origfilename) ;
				$('#uploadFullFileNameH').val(data.filefullName);
				$('#uploadFileNameH').val(data.filename) ;
				$('#uploadFileSizeH').val(data.filesize) ;
				$('#md5H').val(data.md5) ;
				$('#shaH').val(data.sha) ;
			}
			
			clearInterval4UploadProgressCall(0) ;
			clearUploadFlag(0) ;
			
			$("#fileuploadMsg").text("上传安装包");
			$('#fileuploadLoadingMsg').text("");
			
		},
		error : function(data, status, e) {
			$('#fileuploadLoadingMsg').text("");
			$('#channelFile').hide();
			$('#channelFile i').text("");
			console.debug(e + ";" + "status:" + status);
			clearInterval4UploadProgressCall(0) ;
			clearUploadFlag(0) ;
			$('#uploadAlertMessage').text("上传出错");
			emptyApkUploadFileInfo() ;
		}
	});
};


UploadApp.prototype.deleteChannelFile = function() {
	emptyApkUploadFileInfo() ;
	
	var channelFileSpan = $('#channelFile');
	var channelFileLabel = $('#channelFile i');
	channelFileSpan.hide();
	channelFileLabel.text("");
};

var uploadApp = new UploadApp();

