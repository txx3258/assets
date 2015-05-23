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
	});

	$('#applyFreeFormform :radio').change(function(e) {
		var radioBtn = e.target;
		if (radioBtn.value == '0') {
			$(':input[name="imgFile"]').each(function(idx, obj) {
				obj.disabled = true;
			});

		} else if (radioBtn.value == '1') {
			$(':input[name="imgFile"]').each(function(idx, obj) {
				obj.disabled = false;
			});
		} else {
			$(':input[name="imgFile"]').each(function(idx, obj) {
				obj.disabled = true;
			});
		}
	});
});

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

function initInputValue() {
	$('#childrenTypeH').val("");
}

function getAllOnlineApp(childrenType) {
	var option;
	var appNames = $("#appNameSel");
	emptyAppNameOptionList();
	var temp = $("#lcaIdH").val();
	var ctx = $("#ctxH").val();
	$.ajax({
		url : ctx + '/getAllOnlineApp4FreeFlow.jspx?childrenType='
				+ childrenType,
		type : 'post',
		dataType : 'json',
		success : function(appNameData) {
			for (var i = 0; i < appNameData.length; i++) {
				option = "<option value='" + appNameData[i].lcaId + "'";
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

var appInfoMap = new SimpleHashMap();
var uploadFlagMap = new SimpleHashMap();

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

function submitFreeFlowApply(submitButton) {
	if (uploadFlagMap.isEmpty()) {
		submitButton.form.submit();
		submitButton.value = '保存中，请稍候...';
		submitButton.disabled = true;
	} else {
		$("#submitAlertMsg").text("有APK文件正在上传，请稍候  ...") ;
	}
}

function clearUploadFlag(channelNumber){
	uploadFlagMap.remove(channelNumber);
	if(uploadFlagMap.isEmpty()){
		$("#submitAlertMsg").text("") ;
	}
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


function UploadApp() {
}
UploadApp.prototype.uploadChannelFile = function(fileObj, channelNum) {
	
	
	var loadingImg = '<img src="' + $('#ctxH').val()
			+ '/images/loading_circle.gif" />';
	var objId = fileObj.id;
	
	if($('#apkFileUploaded.errors') !=null){
		$('#apkFileUploaded.errors').text("") ;
	}

    if(!checkOnsaleAppSelected()){
    	$('#appSelAlertMessage').text("请选择在售应用再上传") ;
    	fileObj.value='' ;
    	return ;
	}else{
		$('#appSelAlertMessage').text("") ;
	}
	
	uploadFlagMap.put(channelNum, objId);	
	$('#origApkFile' + channelNum).val("");
	$('#uploadApkFile' + channelNum).val("");
	$('#uploadFileName'+channelNum).val("") ;
	$('#uploadFileSize'+channelNum).val("") ;
	$('#uploadAlertMessage'  + channelNum).text('') ;
	$('#channelFile' + channelNum).hide();
	$('#channelFile' + channelNum + ' i').text("");
	$('#fileuploadLoadingMsg' + channelNum).html(loadingImg);
	$("#fileuploadMsg" + channelNum).text("开始上传");
	uploadProgressCallMap.put(channelNum,setInterval(function(){
		var callURL = $('#ctxH').val()+"/uploadprogress.jspx?token="+$('#uploadToken'+channelNum).val() ;
	   	$.ajax({   
		   	  url:callURL,   
		   	  type:"GET", 
		   	  dataType: 'text',      
		   	  success:function(data, status){
		   		  if(data !=''){
		   			$("#fileuploadMsg" + channelNum).text("上传 "+data);
		   		  }
		   		  if(data=='100%'){
		   			clearInterval4UploadProgressCall(channelNum) ;
		   			$("#fileuploadMsg" + channelNum).text("开始解析... ");
		   		  }
		   	  },
		   	  error: function (status, e) {
		   		clearInterval4UploadProgressCall(channelNum) ;
              }
	   	});   
	},100)
	);
	
	$.ajaxFileUpload({
		url : 'fileupload/freeFlowUpload.jspx?uploadTokenId='+$('#uploadToken'+channelNum).val(),
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
				$('#uploadAlertMessage'  + channelNum).text(data.error);
			} else {
				console.debug(data.file);
				$('#channelFile' + channelNum).show();
				$('#channelFile' + channelNum + ' i').text(data.origfilename);
				$('#origApkFile' + channelNum).val(data.origfilename) ;
				$('#uploadApkFile' + channelNum).val(data.file);
				$('#uploadFileName'+channelNum).val(data.filename) ;
				$('#uploadFileSize'+channelNum).val(data.filesize) ;
			}
			
			clearInterval4UploadProgressCall(channelNum) ;
			clearUploadFlag(channelNum) ;
			
			$("#fileuploadMsg" + channelNum).text("上传安装包");
			$('#fileuploadLoadingMsg' + channelNum).text("");
			
		},
		error : function(data, status, e) {
			$('#fileuploadLoadingMsg' + channelNum).text("");
			$('#channelFile' + channelNum).hide();
			$('#channelFile' + channelNum + ' i').text("");
			console.debug(e + ";" + "status:" + status);
			clearInterval4UploadProgressCall(channelNum) ;
			clearUploadFlag(channelNum) ;
			$('#uploadAlertMessage'  + channelNum).text("上传出错");
		}
	});
};


UploadApp.prototype.deleteChannelFile = function(channelNum) {
	$('#uploadApkFile' + channelNum).val("");
	$('#uploadFileName'+channelNum).val("") ;
	$('#uploadFileSize'+channelNum).val("") ;
	
	var channelFileSpan = $('#channelFile' + channelNum);
	var channelFileLabel = $('#channelFile' + channelNum + ' i');
	channelFileSpan.hide();
	channelFileLabel.text("");
};

var uploadApp = new UploadApp();

