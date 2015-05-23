// JavaScript Document
function showPopwindow(w) {
    $w = $("#" + w);
    if ($.browser.msie && $.browser.version == "6.0") {
        $("#shadow").css({"position":"absolute","height":$(document).height()});
        $("select").hide();
    }
    $("#shadow").show();

    $w.show();
}

function setWidthAndHeight() {
    var cssWidth = 133;
    var cssHeight = 220;
    $("#uploadImageElement").css("width", cssWidth);
    $("#uploadImageElement").css("height", cssHeight);
}

function showPopupImage() {
	if($("#verticalPicsList li").size() == 10){
		alert("最多只能上传10个截图");
		return;
	}
    $("#isImageUpload").val("0");
    $("#imgFile").val("");

    $w = $("#pop_one");
    if ($.browser.msie && $.browser.version == "6.0") {
        $("#shadow").css({"position":"absolute","height":$(document).height()});
        $("select").hide();
    }
    $("#shadow").show();

    $w.show();
}

function hidePopwindow(w) {
    $w = $("#" + w);
    $w.hide('slow');
    if ($.browser.msie && $.browser.version == "6.0") {
        $("select").show();
    }
    $("#shadow").hide();
}

function hideImageSelectArea() {
    //alert("ggogogo");
    //imgTd.html('');
    $w = $("#pop_one");
    $w.hide();
    if ($.browser.msie && $.browser.version == "6.0") {
        $("select").show();
    }
    $("#shadow").hide();
}

(function (s) {
    s.Len = function () {
        var l = 0;
        for (var i = 0; i < this.length; i++) {
            if (this.charCodeAt(i) > 255) l += 2; else l++;
        }
        return l;
    }
    s.cut = function (l, m) {
        var r = "", n = 0;
        for (var i = 0; i < this.length && n < l; i++) {
            r += this.charAt(i);
            if (this.charCodeAt(i) > 255) n += 2;
            else n++;
        }
        if (m && r.length < this.length) r += '..';
        return r;

    }
    s.trim = function (p) {
        switch (p) {
            case -1: return this.replace(/(^\s*)/g, "");
            case 0: return this.replace(/(\s*)/g, "");
            case 1: return this.replace(/(\s*$)/g, "");
            default: return this.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
})(String.prototype);

function im_(o, path) {
    with (o)if (getAttribute('v') == null) {
        src = path + '/images/icon.gif';
        setAttribute("v", '1');
    }
    return true;
}

function errorInfo(){
	var infoHtml = "<div id='pop_info' class='popwindow popc'><div class='bar'><div class='fright'>"+
	"<a href='javascript:cancelPop();' class='closeClass'>Close </a></div></div><div class='pop_content'>"+
	"<div class='black' id='infoPop'></div><div><input class='pop_nn' type='button' onclick='javascript:cancelPop();' value='确定' /></div></div></div>";
	$('body').append(infoHtml);
}

function cancelPop() {
	hidePopwindow('pop_info');
}


