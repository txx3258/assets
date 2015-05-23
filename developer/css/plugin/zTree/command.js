var ui = {},_global_variable = {};


ui.selectOneMenu=function(id,defaultLabel,treeId,treeSetting,treeData){
	var $select=$("#"+id),
	defaultLabel= !defaultLabel ? "" : defaultLabel;
	tempHtml='<div class="ui-selectOneMenu"><div class="ui-selectOneMenu-text">'+defaultLabel+'</div><div class="ui-selectOneMenu-handle"></div></div><ul id='+treeId+' class="ztree"></ul>';
	$select.append(tempHtml).addClass("ui-selectOneMenu-ztree");
	_global_variable.zTree_1 = $.fn.zTree.init($("#"+treeId), treeSetting, treeData);
	var $selectOneMenu=$select.find(".ui-selectOneMenu"),
		$ztree=$select.find(".ztree");
	$selectOneMenu.on("click",function(e){
 					var zTreeObj = $.fn.zTree.getZTreeObj(treeId);
 					var checkedGroup=zTreeObj.getCheckedNodes();
 			    	
					zTreeObj.destroy();
					$.fn.zTree.init($("#"+treeId), treeSetting, treeData);
					
					var zTreeObj = $.fn.zTree.getZTreeObj(treeId);
					for(var i =0;i<checkedGroup.length;i++){
						 var node = zTreeObj.getNodeByParam("value", checkedGroup[i].value, null);
						 zTreeObj.checkNode(node, true, true); 
	 			    }
					
					e.stopPropagation(); 
					if($ztree.css("display")=="none"){
						$ztree.show();   
			            var _h=$ztree.height(),
				            _top = $selectOneMenu.offset().top-$(window).scrollTop(),
				            _wh = $(window).height();
			            if ( _h + _top > _wh) {
			                $ztree.css("top",-(_h)+"px");
			            }else {
			                $ztree.css("top","20px");
			            }       
					}else{
						$ztree.hide();
					}
		
	})
	$ztree.on("click",function(e){
		e.stopPropagation(); 
	})
	$(document).on("click",function(e) {
		$ztree.hide();
	});
//	setObjectValue();
};

