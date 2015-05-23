function initpackagetype() {
    var postfix;
    var apptypeId2Element = document.getElementById("deviceSupport");
    var x = apptypeId2Element.options.selectedIndex;
    postfix = sofamily[x];
    if (postfix.indexOf("apk;") == -1) {
        if (null != document.getElementById("apkPackage")) {
            document.getElementById("apkPackage").checked = false;
            document.getElementById("apkPackage").disabled = true;
        }
    } else {
        if (null != document.getElementById("apkPackage")) {
            document.getElementById("apkPackage").disabled = false;
        }
    }

    if (postfix.indexOf("jar;") == -1) {
        if (null != document.getElementById("javaPackage")) {
            document.getElementById("javaPackage").checked = false;
            document.getElementById("javaPackage").disabled = true;
        }
    }
    else {
        if (null != document.getElementById("javaPackage")) {
            document.getElementById("javaPackage").disabled = false;
        }
    }

    if (postfix.indexOf("ltp;") == -1) {
        if (null != document.getElementById("ltpPackage")) {
            document.getElementById("ltpPackage").checked = false;
            document.getElementById("ltpPackage").disabled = true;
        }
    }
    else {
        if (null != document.getElementById("ltpPackage")) {
            document.getElementById("ltpPackage").disabled = false;
        }
    }
    $("#ams_deviceSupport").html("&nbsp;&nbsp;\u652F\u6301\u683C\u5F0F\uFF1A" + postfix);
}

//��ѡ��Leos1.0���ϴ�lephone1.0�Ŀ���
function setDefaultDevice() {
    var supportMinVersion = document.getElementById("supportMinVersion").value;
    $.ajax({
        url: "selectDefaultDevice10.do?supportMinVersion=" + supportMinVersion,
        cache: false,
        success: function(result) {
            selectDefaultDevice10(result);
        }
    });
}

/*
 * ��������ѡ����LeOS1.0����Ĭ��ѡ��lephone1.0���豸����Ҫ�ϴ���Ӧ�Ŀ��ա�
 */
function selectDefaultDevice10(defaultDeviceResolution) {

    if (defaultDeviceResolution == null || defaultDeviceResolution == "null") {
        defaultDeviceResolution = "";
    }
    var v_Resolution = "";
    var deviceResolution = "";
    var selectDeviceResolution = document.getElementById("selectDeviceResolution").value;
    var selectResolution = "";

    if (selectDeviceResolution != null &&
            selectDeviceResolution != "" &&
            selectDeviceResolution != "null") {
        selectResolution = selectDeviceResolution;
    }

    v_Resolution = defaultDeviceResolution == null ? "" : defaultDeviceResolution.substr(0, defaultDeviceResolution.length - 1);
    var defaultResArr = v_Resolution.split("#");
    for (var i = 0; i < defaultResArr.length; i++) {
        if (selectResolution.indexOf(defaultResArr[i] + "#") == -1) {
            deviceResolution += defaultResArr[i] + "#";
        }
    }

    var uncheckResolution = "";
    var v_uncheckResolution = "";
    var unselectResolution = "";
    var selectDefaultDeviceResolution = document.getElementById("selectDefaultDeviceResolution").value;
    if (selectDefaultDeviceResolution != null &&
            selectDefaultDeviceResolution != "" &&
            selectDefaultDeviceResolution != "null") {
        v_uncheckResolution = selectDefaultDeviceResolution;
    }

    v_uncheckResolution = v_uncheckResolution == "" ? "" : v_uncheckResolution.substr(0, v_uncheckResolution.length - 1);
    var defaultResolutionArr = v_uncheckResolution.split("#");
    for (var i = 0; i < defaultResolutionArr.length; i++) {
        if (uncheckResolution.indexOf(defaultResolutionArr[i] + "#") == -1
                && deviceResolution.indexOf(defaultResolutionArr[i] + "#") == -1
                && selectResolution.indexOf(defaultResolutionArr[i] + "#") == -1) {
            uncheckResolution += defaultResolutionArr[i] + "#";
        }
    }
    document.getElementById("selectDefaultDeviceResolution").value = defaultDeviceResolution;

    deviceResolution = deviceResolution == "" ? "" : deviceResolution.substr(0, deviceResolution.length - 1);
    uncheckResolution = uncheckResolution == "" ? "" : uncheckResolution.substr(0, uncheckResolution.length - 1);


    var deviceResolutionArr = deviceResolution.split("#");
    for (var i = 0; i < deviceResolutionArr.length; i++) {
        var dResolution = $("#dResolution" + deviceResolutionArr[i]).html();
        if (deviceResolutionArr[i] != null &&
                deviceResolutionArr[i] != "" &&
                deviceResolutionArr[i] != "null" &&
                deviceResolutionArr[i] != dResolution &&
                $("#amsAppimgs_0_upload").html().indexOf(deviceResolutionArr[i]) == -1) {
            addUploadModuleImage1(deviceResolutionArr[i]);
        }
    }
    var uncheckResolutionArr = uncheckResolution.split("#");
    for (var i = 0; i < uncheckResolutionArr.length; i++) {
        var sid = uncheckResolutionArr[i].replace('*', '_');
        $("#amsAppimgs_0_upload_" + sid).remove();
    }

    $("#poplayer").hide();
    $("#popwindow").hide();
    $("select").show();
}