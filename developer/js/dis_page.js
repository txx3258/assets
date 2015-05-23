/*
 Created by IntelliJ IDEA.
 Date: 2007-9-27
 Time: 14:18:36
 User: weiquan
 */

function jumpPage(pageNo) {
    $("#pageNo").val(pageNo);
    $("#fromPage").val("1");
    document.forms[0].submit();
//    $("form").first().submit();
}

function inputPage() {
    if (/^[0-9_-]+$/.test($("#inPage").val())) {
        $("#pageNo").val($("#inPage").val());
        return $("form").first().submit();
    }
    return alert("只能输入数字");
}

function disPages(page, totalPages) {
    var pageNo = page;
    var totalPages = totalPages;
    var front = pageNo - 4;// 前面一截
    var back = pageNo + 4;// 后面一截
    var str = "";
    // 页码链接
    // 只有一页 就只显示1
    // if (totalPages == 1 && pageNo == 1) { 如果输入的页数大于现有总页数 就可以达到不显示 页码下标
    if (totalPages == 1) {
        str = "<font color = 'red'> 1 </font>";
    }
    // 如果当前页是5,前面一截就是1234,后面一截就是6789
    if (totalPages > 1) {
        var tempBack = totalPages;
        var tempFront = 1;
        if (back < totalPages)
            tempBack = back;
        if (front > 1)
            tempFront = front;
        // 创建连接
        for (var i = tempFront; i <= tempBack; i++) {
            if (pageNo == i) {
                str += "<font color = 'red'> " + i + " </font>";
            } else {
                str += "<a href = 'javascript:jumpPage(" + i + ")" + "'> " + i + " </a>";
            }
        }
    }
    if (pageNo + 4 < totalPages)
        str += "... &nbsp;";
    return str;
}

function sort(orderBy, defaultOrder) {
    if ($("#orderBy").val() == orderBy) {
        if ($("#order").val() == "") {
            $("#order").val(defaultOrder);
        }
        else if ($("#order").val() == "desc") {
            $("#order").val("asc");
        }
        else if ($("#order").val() == "asc") {
            $("#order").val("desc");
        }
    }
    else {
        $("#orderBy").val(orderBy);
        $("#order").val(defaultOrder);
    }
    $("form").first().submit();
}

function search() {
    $("#order").val("");
    $("#orderBy").val("");
    $("#pageNo").val("1");
    encodeURIComponent($("form").first());
    $("form").first().submit();
}

function time() {
    var now = new Date();
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var date1 = year + "-" + month + "-" + day;
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    var date2 = hour + ":" + minute + ":" + second;
    var date = document.getElementById("date");
    date.innerHTML = date1 + "&nbsp;&nbsp;" + date2;
    setTimeout("time()", 1000);
}

function getDdate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var date1 = year + "-" + month + "-" + day;
    return date1;
}

//专门用于应有列表的二级分页
function disPagesForSec(page, totalPages) {
    var pageNo = page;
    var totalPages = totalPages;
    var front = pageNo - 4;// 前面一截
    var back = pageNo + 4;// 后面一截
    var str = "";
    // 页码链接
    // 只有一页 就只显示1
    // if (totalPages == 1 && pageNo == 1) { 如果输入的页数大于现有总页数 就可以达到不显示 页码下标
    if (totalPages == 1) {
        str = "<font color = 'red'> 1 </font>";
    }
    // 如果当前页是5,前面一截就是1234,后面一截就是6789
    if (totalPages > 1) {
        var tempBack = totalPages;
        var tempFront = 1;
        if (back < totalPages)
            tempBack = back;
        if (front > 1)
            tempFront = front;
        // 创建连接
        for (var i = tempFront; i <= tempBack; i++) {
            if (pageNo == i) {
                str += "<font color = 'red'> " + i + " </font>";
            } else {
                str += "<a href = 'javascript:jumpPageforSec(" + i + ")" + "'> " + i + " </a>";
            }
        }
    }
    if (pageNo + 4 < totalPages)
        str += "... &nbsp;";
    return str;
}

function jumpPageForSec(pageNo, appid) {
    $("#pageNo").val(pageNo);
    var url = "queryAppSumbitInfoDetailAction.do?appId=" + $("#appId").val() + "&curr_query_state=8";
    document.forms[0].action = url;
    document.forms[0].submit();
}

