$(function(){
	$('#claim_tips_btn').click(function(e) {	
		this.className = this.className === 'arrow_down' ? 'arrow_up' : 'arrow_down';
		SetIframeSize('frame1', this.className);					
        $('dl.first-notice').slideToggle(600);
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
	
	$('#appNameSel').change(function(e){
		var lcaId = $("#appNameSel").val();
        $('#msgInfo').text("");
        $('#msgInfo').text("");
        $('#contactPerson').val("");
        $('#contactPhone').val("");
        $('#contactQQ').val("");
        $('#btn_sub').removeAttr("disabled");
        if(lcaId != '-1'){
	        $.each(appNameData,function (i) {
	       		if(appNameData[i].lcaId == lcaId){
	       			/*alert("===lcaId : "+appNameData[i].lcaId+", pkgName : "+appNameData[i].pkgName +
	       				", appName : "+appNameData[i].appName+", errorInfo : "+appNameData[i].errorInfo +
	       				", appInfoLink : "+appNameData[i].appInfoLink+", version : "+appNameData[i].version +
	       				", canOperate : "+appNameData[i].canOperate);*/
	       			$('#pkgName').text(appNameData[i].pkgName);
	       			$('#versionName').text(appNameData[i].version);
	       			$('#appLink').html("<a target='_blank' style='color:#197DCB;' href='"+appNameData[i].appInfoLink+"'>"+appNameData[i].appInfoLink+"</a>");
	       			$('#pkgNameH').val(appNameData[i].pkgName);
	       			$('#appNameH').val(appNameData[i].appName);
	       			$('#versionCodeH').val(appNameData[i].versionCode);
	       			$('#versionH').val(appNameData[i].version);
	       			$('#infoIdH').val(appNameData[i].infoId);
	       			$('#appLinkH').val(appNameData[i].appInfoLink);
	       			if(appNameData[i].canOperate){		    
	       				$('#msgInfo').text("");
		       			$('#btn_sub').removeAttr("disabled");
	       			}else{
	       				$('#msgInfo').text(appNameData[i].errorInfo);
	       				$('#btn_sub').attr('disabled','true');
	       			}
	       		}
	        });
        }else{
        	initInfo();
        }
	});
	
	var frame1Top = $(window.top.document.getElementById('frame1')).offset().top;
	var formValid = $("#appRecommendApplyForm").Validform({
		tiptype:4,
		postonce:true,
		btnSubmit:"#btn_sub",
		datatype:{
			appNameT: function(){			
				if($("#appNameSel").val() == '-1'){
					window.top.scroll(0, frame1Top+$('#appNameSel').offset().top);
					return false;
				}else{
					return true;
				}
			}
		},
		beforeSubmit: function(){
			$('#btn_sub').attr('disabled','true');
		}
	}); 
	formValid.addRule([
		{
			ele:'#appNameHH',
			datatype:'appNameT',
			nullmsg:'请选择应用!'
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
function initInfo(){
	$("#pkgName").text("------");
	$("#versionName").text("------");
	$("#appLink").text("------");
	$("#appLcaIdH").val("------");
	$('#msgInfo').text("");
	$('#btn_sub').removeAttr("disabled");
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