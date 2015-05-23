$(function() {
	var ctxH = $('#ctxH').val() ;
	var advertPlanId = $('#advertPlanIdH').val() ;
	$('#viewAdvertPlaceAndPrice').click(function(e) {
		location.href=ctxH+"/changeAdvertPlaceBidStatus.jspx?planid="+advertPlanId ;
	}) ;
}) ;