function g(o) {
    return document.getElementById(o);
}
function hoverLi(selfobj, parentname, sonname) {
    var obj = g(parentname).getElementsByTagName('li');
    ;
    for (var i = 0; i < obj.length; i++) {
        var tmpstr = (obj[i].id).toString();
        var tmparr = tmpstr.split('_');
        obj[i].className = 'blur';
        g(sonname + '_' + tmparr[1]).className = 'none';
    }
    var selfname = (selfobj.id).toString();
    selfarr = selfname.split('_');
    selfobj.className = 'focus';
    g(sonname + '_' + selfarr[1]).className = 'show';
}

function hover(obj, tabBox, cotBox, info) {
    hoverLi(obj, tabBox, cotBox);
}

function hoverReload(obj,url) {
	   // hoverLi(obj, tabBox, cotBox,url);
		window.location.href= url;
}