
function uploadImage(fileObj, step) {
    var str = fileObj.value;
    var index = str.lastIndexOf('.');
    var strtype = str.substr(index, 4);
    strtype = strtype.toLowerCase();
    if (strtype == ".png" || strtype == ".jpg" || strtype == ".gif" || strtype == ".PNG" || strtype == ".JPG" || strtype == ".GIF") {
        var objid = fileObj.id;
        $.ajaxFileUpload({ url:'coopImgUpload.jspx?step=' + objid,
            secureuri:false, fileElementId:objid, dataType: 'json',
            success: function (data, status) {
                if (data.error != "" && data.error != undefined && data.error != null) {
                    alert(data.error);
                } else {
                    $("#imagePath" + step).val(data.file1);
                    var str = "<img id='img' name='img' width='170' height='108'/>";
                    var tdObj = $("#imgp" + step);
                    $(tdObj).html(str);
                    //$(str).appendTo(tdObj);
                    $("#img").attr("src", "./ReadImageServlet?path=" + data.file1);
                    $("#imgp" + step).next('div.change_box').hide();
                }
            },
            error: function (data, status, e) {
                alert(e + ";" + "status:" + status + ";data:" + data.file1);
            }
        });
    } else {
        alert("请上传gif,jpg,png格式的图片！");
    }
}

function LTrim(str) { //去掉字符串 的头空格
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) != " " && str.charAt(i) != " ") {
            break;
        }
    }
    str = str.substring(i, str.length);
    return str;
}

function RTrim(str) {
    for (var i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) != " " && str.charAt(i) != " ") {
            break;
        }
    }
    str = str.substring(0, i + 1);
    return str;
}

function Trim(str) {
    return LTrim(RTrim(str));
}

//AJAX声明
var xmlHttp;
var stateString;
function createXMLHttpRequestPerReg() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
}

//验证个人开发者注册
function validatePerReg() {
    createXMLHttpRequestPerReg();
    var email = document.getElementById("regEmail");
    var phone = document.getElementById("contactPhone");
    var showName = document.getElementById("showName");
    var perdName = document.getElementById("realName");
    //通讯地址
    var address = document.getElementById("allAddress");
    //邮编
    var post = document.getElementById("zipCode");
    //QQ号
    var qqNumber = document.getElementById("regQQ");
    //证件号码
    var docNumber = document.getElementById("cardNumber");
    var docType = $("#docType").attr("data-value");
    var proselect = $('#regAgreementBtn').find('span');
    
    var newperdName = Trim(perdName.value);
    if (newperdName == null || newperdName == "") {
        var obj = document.getElementById("errorperdName");
        obj.innerHTML = "真实姓名不可为空!";
        perdName.focus();
        perdName.select();
        return;
    }
    if (newperdName.length > 20) {
        var obj = document.getElementById("errorperdName");
        obj.innerHTML = "真实姓名长度不可超过20!";
        perdName.focus();
        perdName.select();
        return;
    }
    
    var newshowname = Trim(showName.value);
    if (newshowname == null || newshowname == "") {
        var obj = document.getElementById("errorshowName");
        obj.innerHTML = "显示名称不能为空!";
        showName.focus();
        showName.select();
        return;
    }

    if (newshowname != null && newshowname != "") {
        var shownamereg = /^([\u4e00-\u9fa5]|[a-zA-Z0-9]|[-_\.]){2,20}$/;
        if (!shownamereg.test(newshowname)) {
            var obj = document.getElementById("errorshowName");
            obj.innerHTML = "请输入2-20位中文、英文、-、_和.任意组合显示名称!";
            showName.focus();
            showName.select();
            return;
        }
    }
    
    //证件号码
    var docNumberVal = docNumber.value;
    if (docNumberVal.length == 0) {
        var obj = document.getElementById("errordocNumber");
        obj.innerHTML = "证件号码不可为空!";
        docNumber.focus();
        docNumber.select();
        return;
    }
    if (docType == 0) {
        if (!/^\d{17}[\dx]{1}$/i.test(docNumberVal) && !/^\d{15}$/.test(docNumberVal)) {
	        var obj = document.getElementById("errordocNumber");
	        obj.innerHTML = "身份证号码格式错误！";
	        docNumber.focus();
	        docNumber.select();
            return;
        }
    }

    if ($("#imagePath1").val() == 0) {
        var obj = document.getElementById("errorpath");
        obj.innerHTML = "请上传证件图片！";
        document.getElementById("docFile").focus();
        return;
    }

    //通讯地址
    var newaddress = Trim(address.value);
    if (newaddress == null || newaddress == "") {
        var obj = document.getElementById("erroraddress");
        obj.innerHTML = "通讯地址不能为空!";
        address.focus();
        address.select();
        return;
    }
    if (newaddress.length > 50) {
        var obj = document.getElementById("erroraddress");
        obj.innerHTML = "通讯地址长度不可超过50!";
        address.focus();
        address.select();
        return;
    }
    //邮编
    var postVal = post.value;
    if (postVal.length != 0 && !((postVal.length == 5 || postVal.length == 6) && !isNaN(postVal))) {
        var obj = document.getElementById("errorpost");
        obj.innerHTML = "邮编须五到六位数字";
        post.focus();
        post.select();
        return;
    }

	if (phone.value == null || phone.value == "") {
        var obj = document.getElementById("errorphone");
        obj.innerHTML = "联系电话不能为空!";
        phone.focus();
        return;
    }
    var pattern = /^[-#+（）*p0-9]+$/;
    if (!/^[\d（）#*+\-p"]{7,30}$/.test(phone.value)) {
    	var obj = document.getElementById("errorphone");
        obj.innerHTML = "联系电话格式错误，请使用引号中规定的字符'#+*p-0123456789'！";
        phone.focus();
        return;
    }

	if (email.value == null || email.value == "") {
        var obj = document.getElementById("erroremail");
        obj.innerHTML = "邮箱地址不能为空!";
        email.focus();
        return;
    }

    var patrn = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!patrn.test(email.value)) {
        var obj = document.getElementById("erroremail");
        obj.innerHTML = "邮箱地址格式有错，请重新输入！";
        email.focus();
        email.select();
        return;
    }

	//QQ号
    var qqNumberVal = qqNumber.value;
    if (qqNumberVal.length != 0 && isNaN(qqNumberVal)) {
        var obj = document.getElementById("errorqqNumber");
        obj.innerHTML = "QQ号必须是数字";
        qqNumber.focus();
        qqNumber.select();
        return;
    }

    if(!proselect.hasClass('selected')) {
        var obj = document.getElementById("errorprotocol");
        obj.innerHTML = "请阅读合同和协议并勾选同意！";
        proselect.focus();
        return;
    }
    var showname = encodeURI(newshowname);
    showname = encodeURI(showname);
    
    var sUrl = "addPerDcDeveloper.jspx?ajaxEmail=" + email.value + "&ajaxShowName=" + showname + "&docType=" + docType;
    document.getElementById("perform").action = sUrl;
	document.getElementById("perform").submit();
}

function clearInnerHTML() {
    document.getElementById("erroremail").innerHTML = "";
    document.getElementById("errorphone").innerHTML = "";
    document.getElementById("errorshowName").innerHTML = "";
    document.getElementById("errorperdName").innerHTML = "";
    document.getElementById("errorqqNumber").innerHTML = "";
    document.getElementById("erroraddress").innerHTML = "";
    document.getElementById("errorpost").innerHTML = "";
    document.getElementById("errordocNumber").innerHTML = "";
    document.getElementById("errorpath").innerHTML = "";
    document.getElementById("errorprotocol").innerHTML = "";
}

function clearentInnerHTML() {
    document.getElementById("enterroremail").innerHTML = "";
    document.getElementById("enterrorshowName").innerHTML = "";
    document.getElementById("errorentName").innerHTML = "";
    document.getElementById("enterroraddress").innerHTML = "";
    document.getElementById("errorbusinessPost").innerHTML = "";
    document.getElementById("errorgsNumber").innerHTML = "";
    document.getElementById("enterrorpath").innerHTML = "";
    document.getElementById("errorbusinessName").innerHTML = "";
    document.getElementById("errorbusinessPhone").innerHTML = "";
    document.getElementById("errorbusinessEmail").innerHTML = "";
    document.getElementById("enterrorqqNumber").innerHTML = "";
    document.getElementById("errorentprotocol").innerHTML = "";
}

function perRegReSet() {
    document.addPerDcDeveloperForm.reset();
    clearInnerHTML();
    clearEntHTML();
}

//页面第一个文本框获得焦点
function InputFocus() {
    var inputlist = document.getElementsByTagName("input");
    for (var i = 0; i < inputlist.length; i++) {
        if (inputlist[i].type == "text" && inputlist[i].style.display.toLowerCase() != "none") {
            inputlist[i].focus();
            break;
        }
    }
}

//企业开发者
function createXMLHttpRequestEntReg() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
}

function validateEntReg() {
    createXMLHttpRequestEntReg();
    var entEmail = document.getElementById("entemail");
    var entShowName = document.getElementById("entshowName");
    var entName = document.getElementById("entName");
    var address = document.getElementById("entaddress");
    var businessPost = document.getElementById("businessPost");
    var gsNumber = document.getElementById("gsNumber");
    var imagePath2 = document.getElementById("imagePath2");
    var businessName = document.getElementById("businessName");
    var businessPhone = document.getElementById("businessPhone");
    var businessEmail = document.getElementById("businessEmail");
    var businessPost = document.getElementById("businessPost");
    var qqNumber = document.getElementById("entqqNumber");
	
	var proselect = $('#regAgreementBtn').find('span');

	var newentName = Trim(entName.value);
    if (newentName == null || newentName == "") {
        var obj = document.getElementById("errorentName");
        obj.innerHTML = "企业名称不能为空!";
        entName.focus();
        return;
    }
    if (newentName.length > 50) {
        var obj = document.getElementById("errorentName");
        obj.innerHTML = "企业名称长度不可超过50!";
        entName.focus();
        return;
    }
	
	var newshowname = Trim(entShowName.value);
    if (newshowname == null || newshowname == "") {
        var obj = document.getElementById("enterrorshowName");
        obj.innerHTML = "显示名称不能为空!";
        entShowName.focus();
        entShowName.select();
        return;
    }

    if (newshowname != null && newshowname != "") {
        var shownamereg = /^([\u4e00-\u9fa5]|[a-zA-Z0-9]|[-_\.]){2,20}$/;
        if (!shownamereg.test(newshowname)) {
            var obj = document.getElementById("enterrorshowName");
            obj.innerHTML = "请输入2-20位中文、英文、-、_和.任意组合显示名称!";
            entShowName.focus();
            entShowName.select();
            return;
        }
    }
	
	//企业地址
    var newaddress = Trim(address.value);
    if (newaddress == null || newaddress == "") {
        var obj = document.getElementById("enterroraddress");
        obj.innerHTML = "企业地址不能为空!";
        address.focus();
        address.select();
        return;
    }
    if (newaddress.length > 50) {
        var obj = document.getElementById("enterroraddress");
        obj.innerHTML = "企业地址长度不可超过50!";
        address.focus();
        address.select();
        return;
    }
    //邮编
    var postVal = businessPost.value;
    if (postVal.length != 0 && !((postVal.length == 5 || postVal.length == 6) && !isNaN(postVal))) {
        var obj = document.getElementById("errorbusinessPost");
        obj.innerHTML = "邮编须五到六位数字";
        businessPost.focus();
        businessPost.select();
        return;
    }
	
	//工商营业执照号
    var gsNumberVal = gsNumber.value;
    if (gsNumberVal.length == 0) {
        var obj = document.getElementById("errorgsNumber");
        obj.innerHTML = "工商营业执照号不可为空!";
        gsNumber.focus();
        gsNumber.select();
        return;
    }

    if ($("#imagePath2").val() == 0) {
        var obj = document.getElementById("enterrorpath");
        obj.innerHTML = "请上传工商营业执照扫描件！";
        document.getElementById("entdocFile").focus();
        return;
    }
	
	if (entEmail.value == null || entEmail.value == "") {
	    var obj = document.getElementById("enterroremail");
	    obj.innerHTML = "邮箱地址不能为空!"
	    entEmail.focus();
	    return;
	}
	
	var patrn = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	if (!patrn.test(entEmail.value)) {
	    var obj = document.getElementById("enterroremail");
	    obj.innerHTML = "邮箱地址格式有错，请重新输入！";
	    entEmail.focus();
	    entEmail.select();
	    return;
	}
	
    var newbusinessName = Trim(businessName.value);
    if (newbusinessName == null || newbusinessName == "") {
        var obj = document.getElementById("errorbusinessName");
        obj.innerHTML = "联系人姓名不能为空!"
        businessName.focus();
        return;
    }
    if (newbusinessName.length > 15) {
        var obj = document.getElementById("errorbusinessName");
        obj.innerHTML = "联系人姓名长度不可超过15!";
        businessName.focus();
        return;
    }
    if (businessPhone.value == null || businessPhone.value == "") {
        var obj = document.getElementById("errorbusinessPhone");
        obj.innerHTML = "联系电话不能为空!";
        businessPhone.focus();
        return;
    }
    if (!/^[\d（）#*+\-p"]{7,30}$/.test(businessPhone.value)) {
    	var obj = document.getElementById("errorbusinessPhone");
        obj.innerHTML = "联系电话格式错误，请使用引号中规定的字符'#+*p-0123456789'！";
        businessPhone.focus();
        return;
    }
    
    if (businessEmail.value == null || businessEmail.value == "") {
        var obj = document.getElementById("errorbusinessEmail");
        obj.innerHTML = "联系人邮箱不能为空!"
        businessEmail.focus();
        return;
    }
    var patrn = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!patrn.test(businessEmail.value)) {
        var obj = document.getElementById("errorbusinessEmail");
        obj.innerHTML = "联系邮箱格式有错，请重新输入!"
        businessEmail.focus();
        businessEmail.select();
        return;
    }
	//QQ号
    var qqNumberVal = qqNumber.value;
    if (qqNumberVal.length != 0 && isNaN(qqNumberVal)) {
        var obj = document.getElementById("enterrorqqNumber");
        obj.innerHTML = "QQ号必须是数字";
        qqNumber.focus();
        qqNumber.select();
        return;
    }
    if (!proselect.hasClass('selected')) {
        var obj = document.getElementById("errorentprotocol");
        obj.innerHTML = "请阅读协议并勾选同意！";
        document.getElementById("entprotocol").focus();
        return;
    }
    //replace
    var replaceEntShowName = entShowName.value.replace(/(^\s*)|(\s*$)/g, "");
    var entShowName = encodeURI(replaceEntShowName);
    entShowName = encodeURI(entShowName);

    //AJAX提交方式
    var sUrl = "addEntDcDeveloper.jspx?ajaxEmail=" + entEmail.value + "&ajaxShowName=" + entShowName;
    document.getElementById("entform").action = sUrl;
	document.getElementById("entform").submit();
}

function entRegReSet() {
    document.addEntDcDeveloperForm.reset();
}

function hover(obj, tabBox, cotBox, info) {
    chkinfo = info;
    hoverLi(obj, tabBox, cotBox);
}

function subForm() {
	clearInnerHTML();
    validatePerReg();
}

function gotostep2() {
	$("#entform").submit();
	//clearInnerHTML();
	//validateEntReg();
}

function saveEnt() {
	clearentInnerHTML();
	validateEntReg();
}

function uploadDoc(fileObj) {
    var FileName=new String(fileObj.value);
    var extension=new String (FileName.substring(FileName.lastIndexOf(".")+1,FileName.length));
    if(extension=="doc"||extension=="DOC")
    {
        var objid = fileObj.id;
        $.ajaxFileUpload({ url:'coopDocUpload.jspx?obj=' + objid,
            secureuri:false, fileElementId:objid, dataType: 'json',
            success: function (data, status) {
                if (data.error != "" && data.error != undefined && data.error != null) {
                    alert(data.error);
                } else {
                	$("#docPath").val(data.file1);
                	var tdObj = $("#docList");
                    tdObj.empty();
                    var str = '<a href="#">' + data.file1 + '</a> <a href="javascript:deleteDoc()" class="delete"><img src="img/delete.gif" width="13" height="13" alt="" /></a>';
                    $(str).appendTo(tdObj);
                    $("#docFile").val("");
                }
            },
            error: function (data, status, e) {
                alert(e + ";" + "status:" + status + ";data:" + data.file1);
            }
        });
    }else{
    	alert("文件格式错误，请上传doc的文件！");
    }
}

function deleteDoc(){
	$("#docList").empty();
}

//协议tab
$(document).ready(function() {
	$(".con_12>div").hide();
	$(".con_12>div:first").show();
  $(".xy_tab li").hover(function() {
		var sd = $(".xy_tab li").index(this);
		$(".xy_tab li").removeClass("on");
		$(".con_12>div").hide();
		$(this).addClass("on");
    $(".con_12>div").eq(sd).show();
  });
});
