$(function(){	
	$('#claim_tips_btn').click(function(e) {	
		this.className = this.className === 'arrow_down' ? 'arrow_up' : 'arrow_down';
		SetIframeSize('frame1', this.className);					
        $('dl.first-notice').slideToggle(600);
    });
	$(".iconuploadbox2").hover(function(){
		if($(this).find('span').html()!=''){
			$(this).find(".change_box").show();	
		}
	},function(){
		if($(this).find('span').html()!=''){
			$(this).find(".change_box").hide();	
		}
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
				iframe.height = height + 900;
			}else{
				iframe.height = height - 800;
			}
			eqlHeight();
		} catch (ex) {
		}
	}

	$('#appNameSel').change(function(e){
		$('#errorMsg1_tr').addClass('none');
		$('#errorMsg1').text("");
		$('#btn_sub').removeAttr("disabled");
		$("#msgInfo").html("");
		$('#lcaIdH').val("");
		$('#appNameH').val("");
		$('#pkgNameH').val("");
		$('#versionCodeH').val("");
		$('#versionH').val("");
		$('#infoIdH').val("");
		$('#contactPerson').val("");
		$('#contactPhone').val("");
		$('#contactQQ').val("");
		$("#img_type").css("color","");
		initCertInfo();
		initImages();
		var lcaId = $.trim($("#appNameSel").val());
		$('#appNameHH').val(lcaId);
		if(lcaId != '-1'){			
	        $.each(appNameData,function (i) {
	       		if(appNameData[i].lcaId == lcaId){
//	       			console.debug("===lcaId : "+appNameData[i].lcaId+", pkgName : "+appNameData[i].pkgName +
//	       				", appName : "+appNameData[i].appName+", errorInfo : "+appNameData[i].errorInfo +
//	       				", canOperate : "+appNameData[i].canOperate+",imagePaths : "+appNameData[i].imagePaths);
	       			$('#lcaIdH').val(appNameData[i].lcaId);
	       			$('#appNameH').val(appNameData[i].appName);
	       			$('#pkgNameH').val(appNameData[i].pkgName);
	       			$('#versionCodeH').val(appNameData[i].versionCode);
	       			$('#versionH').val(appNameData[i].version);
	       			$('#infoIdH').val(appNameData[i].infoId);
	       			$('#certDataTypeH').val($("#certDataSel").val());
	       			if(appNameData[i].canOperate){
	       				$('#errorMsg1_tr').addClass('none');
	       				$('#errorMsg1').text("");
	       				$('#btn_sub').removeAttr("disabled");
	       				if(appNameData[i].imagePaths != null && appNameData[i].imagePaths.length > 0){
	       					$('#certDataSel').val('3');
	       					$('#certDataTypeH').val('3');
	       					$('#cert1').addClass('none');
	       					$('#cert2').addClass('none');
	       					$('#cert3').removeClass('none');
	       					for(var j=0;j<appNameData[i].imagePaths.length;j++){
	       						$("#finalOther"+(j+1)).html("<img src='./ReadImageServlet?path="+appNameData[i].imagePaths[j]+"' id='readImage"+(j+1) + "' width='170' height='108' alt=''/>" +
	       							" <input type='hidden' name='otherPath"+(j+1)+"' id='other"+(j+1)+"H' value='"+appNameData[i].imagePaths[j]+"'/> ");
	       					}
	       				}else{
	       					$('#certDataSel').val('1');
	       					$('#certDataTypeH').val('1');
	       					$('#cert1').removeClass('none');
	       					$('#cert2').addClass('none');
	       					$('#cert3').addClass('none');
	       				}
	       			}else{
	       				$('#errorMsg1_tr').removeClass('none');
	       				$('#errorMsg1').text(appNameData[i].errorInfo).css({"font-size":"14px","color":"red"});
	       				$('#btn_sub').attr('disabled','true');
	       				initCertInfo();
	       			}
	       		}
	        });
		}
	});
	$('#parentType').change(function(e){	
		$("#msgInfo").html("");
		$("#childTypeHC").val("");
		$("#img_type").css("color","");
		$('#btn_sub').removeAttr("disabled");
		initAppNameSel();
		initInputValue();
		initCertInfo();
		initImages();
		initChildrenType(apptypeJsonData);
		var parType = $.trim($("#parentType").val());
		$('#parentTypeH').val(parType);			
	});
	$('#childrenType').change(function(e){		
		initAppNameSel();
		initInputValue();
		initCertInfo();
		initImages();
		$("#img_type").css("color","");
		$('#btn_sub').removeAttr("disabled");
		var cType = $.trim($("#childrenType").val());
		$("#msgInfo").html("");	
		$('#childrenTypeH').val(cType);		
		$("#lcaIdHC").val("");	
		if(cType != '-1'){
			$('#childTypeH').val(cType);
			getAllOnlineApp(cType);
		}
	});
	$('#certDataSel').change(function(e){
		$("#msgInfo").html("");
		$("#img_type").css("color","");
		$('#contactPerson').val("");
		$('#contactPhone').val("");
		$('#contactQQ').val("");
		var type = $('#certDataSel').val();
		$('#certDataTypeH').val(type);
		setImageValue(type);	
	});
	var frame1Top = $(window.top.document.getElementById('frame1')).offset().top;
	var formValid = $("#officialAuthApplyForm").Validform({
		tiptype:4,
		postonce:true,
		btnSubmit:"#btn_sub",
		datatype:{			
			parentTypeT: function(){			
				if($("#parentType").val() == '-1'){
					window.top.scroll(0, frame1Top+$('#parentType').offset().top);
					return false;
				}else{
					return true;
				}
			},
			childrenTypeT: function(){			
				if($("#parentType").val() != '-1' && $("#childrenType").val() == '-1'){
					window.top.scroll(0, frame1Top+$('#childrenType').offset().top);
					return false;
				}else{
					return true;
				}
			},
			appNameT: function(){			
				if($("#appNameSel").val() == '-1'){
					window.top.scroll(0, frame1Top+$('#appNameSel').offset().top);
					return false;
				}else{
					return true;
				}
			},
			certDataT: function(){			
				if($("#certDataSel").val() == '1' && $("#cardH1").val() == ''){
					window.top.scroll(0, frame1Top+$('#cardH1').offset().top);
					return false;
				}else if($("#certDataSel").val() == '2' && $("#cardH2").val() == ''){
					window.top.scroll(0, frame1Top+$('#cardH2').offset().top);
					return false;
				}else if($("#certDataSel").val() == '2' && $("#authorizationH").val() == ''){
					window.top.scroll(0, frame1Top+$('#authorizationH').offset().top);
					return false;
				}else if($("#certDataSel").val() == '3' && $("#other1H").val() == '' && $("#other2H").val() == ''
					&& $("#other3H").val() == ''){
					window.top.scroll(0, frame1Top+$('#other3H').offset().top);
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
			ele:'#parentTypeH',
			datatype:'parentTypeT',
			nullmsg:'请选择一级类别!',
			errormsg:'请选择一级类别!'
		},
		{
			ele:'#childrenTypeH',
			datatype:'childrenTypeT',
			nullmsg:'请选择二级类别!',
			errormsg:'请选择二级类别!'
		},
		{
			ele:'#appNameHH',
			datatype:'appNameT',
			nullmsg:'请选择应用!'
		},
		{
			ele:'#certDataSel',
			datatype:'certDataT',
			errormsg:'请上传证明材料!'
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

function eqlHeight() {
    $(".newsleft").height("auto");
    $(".newsright").height("auto");
    var lh = $(".newsleft").height();
    var rh = $(".newsright").height();
    var maxHeight = Math.max(lh, rh);
    $(".newsleft").height(maxHeight);
    $(".newsright").height(maxHeight);
}

function initChildrenType(apptypeJsonData) {
    var idVar = $("#parentType>option:selected").get(0).id;
    var snum = idVar.substring(13, idVar.length);
    var option;
	var appChildType = $("#childrenType");
	var tempC = $("#childTypeH").val();
    $("#childrenType option:gt(0)").remove();
    if (snum - 1 >= 0) {
        $.each(apptypeJsonData[snum - 1].children, function(i) {
        	option ="<option value='"+this.id+"' id='" + (snum + "_" + i) + "'";
    		if(this.id == tempC){
				option += " selected ";
			}
    		option += ">"+this.name+"</option>";
    		appChildType.append(option);
        });
    }
}
function getAllOnlineApp(childrenType){
	var option;
	var appNames = $("#appNameSel");
	var temp = $("#lcaIdH").val();
	var ctx = $("#ctxH").val();
	$.ajax({
  		url : ctx + '/getAllOnlineApp.jspx?childrenType='+childrenType,
    	type : 'post',
    	dataType : 'text',
   		success : function(data) {
        	appNameData = eval("("+data+")");
        	if(appNameData != null){
        		for(var i=0;i<appNameData.length;i++) {        			
    	    		option ="<option value='"+appNameData[i].lcaId+"'";
    	    		if(appNameData[i].lcaId == temp){
	    				option += " selected ";
	    			}
    	    		option += ">"+appNameData[i].appName+"</option>";
    	    	    appNames.append(option);
    	    	}
        	}
     	}
	});
}
function initAppNameSel(){
	$("#appNameSel").val('-1');
	var option;
	var appNames = $("#appNameSel");
	appNames.empty();
	option ="<option value='-1'>------------ 请选择 ------------</option>";
	appNames.append(option);
	$('#errorMsg1_tr').addClass('none');
	$('#errorMsg1').text("");
	$('#btn_sub').removeAttr("disabled");
}
function initInputValue(){	
	$('#lcaIdH').val("");
	$('#appNameH').val("");
	$('#pkgNameH').val("");
	$('#versionCodeH').val("");
	$('#versionH').val("");
	$('#infoIdH').val("");
	$('#childTypeH').val("");
	$('#contactPerson').val("");
	$('#contactPhone').val("");
	$('#contactQQ').val("");
}
function initCertInfo(){
	$('#certDataSel').val('1');
	$('#cert2').addClass('none');
	$('#cert3').addClass('none');
	$('#cert1').removeClass('none');
}
function initImages(){
	$("#finalCardPath").html("<input type='hidden' name='cardPath' id='cardH1' value=''/> ");
	$("#finalCardPath2").html("<input type='hidden' name='cardPath2' id='cardH2' value=''/> ");
	$("#finalAuthorizationPath").html("<input type='hidden' name='authorizationPath' id='authorizationH' value=''/>");
	$("#finalOther1").html("<input type='hidden' name='otherPath1' id='other1H' value=''/> ");
	$("#finalOther2").html("<input type='hidden' name='otherPath2' id='other2H' value=''/> ");
	$("#finalOther3").html("<input type='hidden' name='otherPath3' id='other3H' value=''/> ");
	$("#finalQuaCertFilePath").html("<input type='hidden' name='quaCertFilePath' id='quaCertFilePath' value=''/> ");
}
function setImageValue(type){
	if(type == 1){
		$('#cert2').addClass('none');
		$('#cert3').addClass('none');
		$('#cert1').removeClass('none');
		$("#finalCardPath2").html("<input type='hidden' name='cardPath2' id='cardH2' value=''/> ");
		$("#finalAuthorizationPath").html("<input type='hidden' name='authorizationPath' id='authorizationH' value=''/>");
		$("#finalOther1").html("<input type='hidden' name='otherPath1' id='other1H' value=''/> ");
		$("#finalOther2").html("<input type='hidden' name='otherPath2' id='other2H' value=''/> ");
		$("#finalOther3").html("<input type='hidden' name='otherPath3' id='other3H' value=''/> ");
	}else if(type == 2){
		$('#cert1').addClass('none');
		$('#cert3').addClass('none');
		$('#cert2').removeClass('none');
		$("#finalCardPath").html("<input type='hidden' name='cardPath' id='cardH1' value=''/> ");
		$("#finalOther1").html("<input type='hidden' name='otherPath1' id='other1H' value=''/> ");
		$("#finalOther2").html("<input type='hidden' name='otherPath2' id='other2H' value=''/> ");
		$("#finalOther3").html("<input type='hidden' name='otherPath3' id='other3H' value=''/> ");
	}else if(type == 3){
		$('#cert1').addClass('none');
		$('#cert2').addClass('none');
		$('#cert3').removeClass('none');
		$("#finalCardPath").html("<input type='hidden' name='cardPath' id='cardH1' value=''/> ");
		$("#finalCardPath2").html("<input type='hidden' name='cardPath2' id='cardH2' value=''/> ");
		$("#finalAuthorizationPath").html("<input type='hidden' name='authorizationPath' id='authorizationH' value=''/>");
	}
}
function showPopwindow(w) {
	var frame1Top = $(window.top.document.getElementById('frame1')).offset().top;
	window.top.scroll(0, frame1Top+$('#img_type').offset().top);
	$("#img_type").css("color","red");
}
function errorInfo(){
	var infoHtml = "<div id='pop_info' class='popwindow popc'><div class='bar'><div class='fright'>"+
	"<a href='javascript:cancelPop();' class='closeClass'>Close </a></div></div><div class='pop_content'>"+
	"<div class='black' id='infoPop'></div><div><input class='pop_nn' type='button' onclick='javascript:cancelPop();' value='确定' /></div></div></div>";
	$('body').append(infoHtml);
}