function UploadFile() {
}
var uploadFile = new UploadFile();
UploadFile.prototype.uploadImage = function (fileObj,fileType) {
    var objid = fileObj.id;
    var fileInputName = $(fileObj).attr("fileInputName");
    $.ajaxFileUpload(
            {
                url:'commonFileUpload.jspx?&loadid=' + objid + "&fileType=" + fileType,
                secureuri:false,
                fileElementId:objid,
                dataType: 'json',
                success: function (data, status) {
                    if (data.error != "" && data.error != undefined && data.error != null) {
                    	$("#errormasge").html(data.error);
                    	if(fileType == 11 || fileType == 12 || fileType == 13 || fileType == 14 || fileType == 15 || fileType == 16){
                    		$("#errormasge").html(data.error);
                    		$('#tr_msg').removeClass('none');
                    		$('#tr_hid').addClass('none');
                    	}
                    } else {
                    	var iconPath = data.file;
                    	if(fileType == 11 || fileType == 12 || fileType == 13 || fileType == 14 || fileType == 15 || fileType == 16){
                    		$('#cert_com').html('<input id="agreement11H" type="hidden"/><input id="agreement12H" type="hidden"/><input id="agreement13H" type="hidden"/><input id="agreement14H" type="hidden"/><input id="agreement16H" type="hidden"/>&nbsp;');
                    		$("#fileShowSpan"+fileType)[0].innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/>'+ 
	                    	'<input type="hidden" id=imagePath"'+fileType+'" name="'+fileInputName+'" value="'+iconPath+'"/> ';
                    		$('#tr_msg').addClass('none');
                    		$('#tr_hid').removeClass('none');
                    	}else{
	                    	$("#fileShowSpan"+fileType)[0].innerHTML='<img src="./ReadImageServlet?path='+iconPath+'" width="170" height="108" alt=""/>'+ 
	                    	'<input type="hidden" id=imagePath"'+fileType+'" name="'+fileInputName+'" value="'+iconPath+'"/> '+
	                    	'<input type="hidden" name="agreementFiles" value="'+fileInputName+'"/>';
                    	}
                    	$("#fileShowSpan"+fileType).next('div.change_box').hide();                    	
                    	$("#errormasge").html("");
                    }
                },
                error: function (data, status, e) {
                    alert(e + ";" + "status:" + status + ";");
                }
            }
      );
};
function getErrorMsg(type){
	if(type==1){
		return 'datatype="*" nullmsg="请上传营业执照"';
	}
}
/** 上传图标的post跳转  */