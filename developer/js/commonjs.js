function changePage(change) {
    var total = new Number(document.all.totalPage.value);
    var curr = new Number(document.all.pageIndex.value);
    if (change == 'n') {
        if (curr < total) {
            document.all.pageIndex.value = curr + 1;
            document.forms[0].submit();
        }
        else {
            window.alert('当前页已经是最后一页');
            return false;
        }
    }
    if (change == 'p') {
        if (curr > 1) {
            document.all.pageIndex.value = curr - 1;
            document.forms[0].submit();
        }
        else {
            window.alert('当前页已经是第一页');
            return false;
        }
    }
    if (change == 'f') {
        document.all.pageIndex.value = 1;
        document.forms[0].submit();
    }
    if (change == 'l') {
        document.all.pageIndex.value = document.all.totalPage.value;
        document.forms[0].submit();
    }
    if (change != 'l' && change != 'n' && change != 'p' && change != 'f') {
        if (avalidatePageNum(change)) {
            if (change <= 0 || change > total) {
                window.alert('您输入的页数应在1至' + total + '之间');
                return false;
            }
            document.all.pageIndex.value = change;
            document.forms[0].submit();
        } else {
            window.alert('您输入的页数不是合法数字');
            return false;
        }
    }
}

function avalidatePageNum(argvalue) {
    argvalue = argvalue.toString();
    var validChars = "0123456789";
    var startFrom = 0;
    if (argvalue.charAt(0) == "0") {
        validChars = "01234567";
        startFrom = 1;
    } else if (argvalue.charAt(0) == "-") {
        startFrom = 1;
    }
    for (var n = startFrom; n < argvalue.length; n++) {
        if (validChars.indexOf(argvalue.substring(n, n + 1)) == -1) return false;
    }
    return true;
}

