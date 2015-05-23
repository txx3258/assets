$(function() {
	var ctxH = $('#ctxH').val() ;
	
	$('#pkgNameSelected').change(function(e){
		var targetURL = ctxH+'/showAdvertPlanList.jspx' ;
		targetURL += '?pkg='+$(this).val() ;
		targetURL += '&state='+$('#planStateSelected').val() ;
		$("#advertPlaceListSection").load(targetURL, function() {
			
        });
	}) ;
	
	$('#planStateSelected').change(function(e){
		var targetURL = ctxH+'/showAdvertPlanList.jspx' ;
		targetURL += '?pkg='+$('#pkgNameSelected').val() ;
		targetURL += '&state='+$(this).val() ;
		$("#advertPlaceListSection").load(targetURL, function() {
			
        });
	}) ;
	
	$('#buildAdvertPlan').click(function(e) {
		location.href=ctxH+"/gotoBuildAdvertPlanHome.jspx" ;
	}) ;
	
	dialog=new Prompt($('#prompt'), function(){
		var ctxH = $('#ctxH').val() ;
		location.href=ctxH + "/removeAdvertPlanHome.jspx?planid=" + planIdToRemove ;
	});
	
});

var dialog ;
var planIdToRemove ;

function changeAdvertPlace(planId){	
	var ctxH = $('#ctxH').val() ;
	location.href=ctxH + "/changeAdvertPlaceBidStatus.jspx?planid=" + planId;
}

function changeAdvertPlan(planId){
	var ctxH = $('#ctxH').val() ;
	location.href=ctxH + "/gotoChangeAdvertPlan.jspx?planid=" + planId;
}

function stopAdvertPlan(planId,pageNum){
	var ctxH = $('#ctxH').val() ;
	location.href=ctxH + "/changeAdvertPlanState.jspx?planid=" + planId+"&pagenum="+pageNum;
}

function removeAdvertPlan(planId){
	planIdToRemove=planId ;
	dialog.show();	
}