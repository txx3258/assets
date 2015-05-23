//zhangzl
function eqlHeight() {
    $(".newsleft").height("auto");
    $(".newsright").height("auto");
    var lh = $(".newsleft").height();
    var rh = $(".newsright").height();
    var maxHeight = Math.max(lh, rh);
    $(".newsleft").height(maxHeight);
    $(".newsright").height(maxHeight);
}
function isNumber(oNum) {
    if (!oNum) return false;
    var strP = /^\d+(\.\d+)?$/;
    if (!strP.test(oNum)) return false;
    try {
        if (parseFloat(oNum) != oNum) return false;
    }
    catch(ex) {
        return false;
    }
    return true;
}

function selectPrice(vthis) {
    var id_appPrice_info = document.getElementById("appPrice_info");
    var id_jad_package_down = document.getElementById("jad_package_down");// 正式jad下载
    var id_jad_package = document.getElementById("jad_package");// 更新正式jad下载

    var id_try_package_down = document.getElementById("try_package_down");//试用包下载
    var id_try_package = document.getElementById("try_package");//更新试用包

    var id_try_jad_package_down = document.getElementById("try_jad_package_down");//试用jad下载
    var id_try_jad_package = document.getElementById("try_jad_package");//更新试用jad包


    var _packageTypeId = document.getElementsByName("packageTypeId");
    var isjava = 0;
    for (var i = 0; i < _packageTypeId.length; i++) {
        if (_packageTypeId[i].checked) {
            isjava = _packageTypeId[i].value;
            break;
        }
    }

    if (isjava == '1') {
        if (id_jad_package_down != null) {
            //	//20100426 徐祥说暂时不用上传jad文件 何时改回来，不确定
            //id_jad_package_down.style.display="";
        }
        if (id_jad_package != null) {
            ////20100426 徐祥说暂时不用上传jad文件 何时改回来，不确定
            //id_jad_package.style.display="";
        }
    } else {
        //非java包
        if (id_jad_package_down != null) {
            id_jad_package_down.style.display = "none";
        }
        if (id_jad_package != null) {
            id_jad_package.style.display = "none";
        }
    }

    //检查是否是select
    var value = 0;
    try {
        value = vthis.options[vthis.selectedIndex].value;
    } catch(e) {
        //说明只有一项非select
        value = vthis.value;
    }

    if (value == '0') {
        //免费 不显示试用版本
        id_appPrice_info.style.display = "none";
        if (id_try_package_down != null) {
            id_try_package_down.style.display = "none";
        }
        if (id_try_package != null) {
            id_try_package.style.display = "none";
        }
        if (id_try_jad_package_down != null) {
            id_try_jad_package_down.style.display = "none";
        }
        if (id_try_jad_package != null) {
            id_try_jad_package.style.display = "none";
        }

    } else {
        //收费
        //免费 不显示试用版本
        if (id_appPrice_info != null) {
            id_appPrice_info.style.display = "";
        }
        if (id_try_package_down != null) {
            id_try_package_down.style.display = "";
        }
        if (id_try_package != null) {
            id_try_package.style.display = "";
        }
        if (isjava == '1') {
            if (id_try_jad_package_down != null) {
                ////	//20100426 徐祥说暂时不用上传jad文件 何时改回来，不确定
                //id_try_jad_package_down.style.display="";
            }
            if (id_try_jad_package != null) {
                ////	//20100426 徐祥说暂时不用上传jad文件 何时改回来，不确定
                //id_try_jad_package.style.display="";
            }
        } else {
            //非java包
            if (id_try_jad_package_down != null) {
                id_try_jad_package_down.style.display = "none";
            }
            if (id_try_jad_package != null) {
                id_try_jad_package.style.display = "none";
            }
        }

    }
}

function checkPriceFormat(value) {
    var strP = /^\d{1,3}(\.\d{1,2})?$/; //
    if (!strP.test(value))return false;
    return true;
}


function checkPrice(vthis) {
    var value = vthis.value;
    if (!checkPriceFormat(value)) {
        document.getElementById('msg_appPrice').innerHTML = "费用格式:总长度不能大于3位整数及2小数。例最大费用:[999.99]"
    } else if (parseFloat(value) == 0) {
        document.getElementById('msg_appPrice').innerHTML = "收费应用不能为零元!"
    } else {
        document.getElementById('msg_appPrice').innerHTML = ""
    }
}	

