$(function(){	
	var path1 = $.trim($("#imagePath11").val());
	var path2 = $.trim($("#imagePath12").val());
	var path3 = $.trim($("#imagePath13").val());
	var path4 = $.trim($("#imagePath14").val());
	var path6 = $.trim($("#imagePath16").val());
	var devType = $.trim($("#devType").val());
	
	var formAgreementValid = $("#editAgreementForm").Validform({
		tiptype: 4,
		btnSubmit: "#btn_agree_sub",
		postonce: true,
		datatype:{
			agreementCert11T: function(){
				if(path1 == ''){
					$("#errormasge").html("");
					$('#tr_msg').addClass('none');
					$('#tr_hid').removeClass('none');
					window.top.scroll(0, 99999);
					return false;
				}else{
					$('#tr_hid').removeClass('none');
					return true;
				}
			},
			agreementCert12T: function(){
				if(devType == '2' && path2 == ''){
					$("#errormasge").html("");
					$('#tr_msg').addClass('none');
					$('#tr_hid').removeClass('none');
					window.top.scroll(0, 99999);
					return false;
				}else{
					$('#tr_hid').removeClass('none');
					return true;
				}
			},
			agreementCert13T: function(){
				if(devType == '2' && path3 == ''){
					$("#errormasge").html("");
					$('#tr_msg').addClass('none');
					$('#tr_hid').removeClass('none');
					window.top.scroll(0, 99999);
					return false;
				}else{
					$('#tr_hid').removeClass('none');
					return true;
				}
			},
			agreementCert14T: function(){
				if(devType == '2' && path4 == ''){
					$("#errormasge").html("");
					$('#tr_msg').addClass('none');
					$('#tr_hid').removeClass('none');
					window.top.scroll(0, 99999);
					return false;
				}else{
					$('#tr_hid').removeClass('none');
					return true;
				}
			},
			agreementCert16T: function(){
				if(devType == '2' && path6 == ''){
					$("#errormasge").html("");
					$('#tr_msg').addClass('none');
					$('#tr_hid').removeClass('none');
					window.top.scroll(0, 99999);
					return false;
				}else{
					$('#tr_hid').removeClass('none');
					return true;
				}
			}
		}
	});
	formAgreementValid.addRule([
	    {
	    	ele:'#agreement11H',
	    	datatype:'agreementCert11T',
	    	errormsg:'请上传签署人手持身份证照！',
	    	nullmsg:'请上传签署人手持身份证照！'
	    },
	    {
	    	ele:'#agreement12H',
	    	datatype:'agreementCert12T',
	    	errormsg:'请上传营业执照！',
	    	nullmsg:'请上传营业执照！'
	    },
	    {
	    	ele:'#agreement13H',
	    	datatype:'agreementCert13T',
	    	errormsg:'请上传税务登记证！',
	    	nullmsg:'请上传税务登记证！'
	    },
	    {
	    	ele:'#agreement14H',
	    	datatype:'agreementCert14T',
	    	errormsg:'请上传银行开户证明！',
	    	nullmsg:'请上传银行开户证明！'
	    },
	    {
	    	ele:'#agreement16H',
	    	datatype:'agreementCert16T',
	    	errormsg:'请上传织机构代码证！',
	    	nullmsg:'请上传织机构代码证！'
	    }
	]);
});
