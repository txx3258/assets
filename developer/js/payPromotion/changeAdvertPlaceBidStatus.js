$(function() {
	var ctxH = $('#ctxH').val() ;
	var advertPlanId = $('#advertPlanIdH').val() ;
	var uniquePriceDlg=new Prompt($('#uniquePriceDlg'), function(){
		var uniquePrice=$('#uniquePrice').val() ;
		if(!isNumber(uniquePrice)){
			$('#alertMessage').text("价格要求数字类型！") ;
			return ;
		}
		$.post(ctxH+"/updateAdvertPlaceBidInBatch.jspx",
				{"planid":advertPlanId,"bidPrice":uniquePrice},
				function(data){
		       if(data.ret){
		    	   $.each(bidPlaceIds, function(i, bidPlaceId){
		    			$('#bidPriceH_'+bidPlaceId).val(uniquePrice) ;
		    		}) ;
		        }else{
		        	var errorMap = data.error ;
		        	if(errorMap[-1]){
		        		$('#alertMessage').text(errorMap[-1]) ;
		        	}
		        	$.each(bidPlaceIds, function(i, bidPlaceId){
		        		$('#bidPriceH_'+bidPlaceId).val(uniquePrice) ;
		        		if(errorMap[bidPlaceId]){
		        			$('#warnMsg_'+bidPlaceId).text(errorMap[bidPlaceId]) ;
		        		}else{
		        			$('#warnMsg_'+bidPlaceId).text("") ;
		        		}
		    		}) ;
		        }
		       }, "json");
	});

	/*var highAboveDefaultPricePromptDlg=new Prompt($('#highAboveDefaultPricePromptDlg'));*/
	
	$('#btn_back').click(function(e){
		var pkgName = $('#pkgNameH').val() ;
		var planStates = $('#planStateH').val() ;
		location.href= ctxH+'/gotoAdvertPlanHome.jspx?pkg='+pkgName + '&state='+planStates ;
	}) ;	
	
	$('#changeBidStatus').click(function(e){
		location.href= ctxH+'/changeAdvertPlaceBidStatus.jspx?planid=' + advertPlanId ;
	}) ;
	
	$('#changeBidSelection').click(function(e){
		location.href= ctxH+'/changeAdvertPlaceBid.jspx?planid=' + advertPlanId ;
	}) ;
		
	$('#batchPriceBtn').click(function(){
		uniquePriceDlg.show();
	});
	
	$.each(bidPlaceIds, function(i, bidPlaceId) {
		$('#bidPriceH_' + bidPlaceId).blur(function(e) {
			if (!isNumber(this.value)) {
				return;
			}
			var defaultPrice = $('#defaultPriceH_' + bidPlaceId).val();
			var tenDefaultPrice = defaultPrice * 10;
			var basePrice = $('#basePriceH_' + bidPlaceId).val();

			var curValue = parseFloat(this.value) ;
			
			if (curValue < basePrice) {
				$('#alertMsg_' + bidPlaceId).hide() ;
				$('#alertMsg_' + bidPlaceId).text('');
				$('#warnMsg_' + bidPlaceId).text('低于底价');
				return ;
			}
			if (curValue > tenDefaultPrice) {
				$('#warnMsg_' + bidPlaceId).text('');
				$('#alertMsg_' + bidPlaceId).html('<i style="color: #EA9906;">高于建议出价十倍</i>');
				$('#alertMsg_' + bidPlaceId).show() ;
				return ;
			}
			
			$('#warnMsg_' + bidPlaceId).text('');
			$('#alertMsg_' + bidPlaceId).hide() ;
			$('#alertMsg_' + bidPlaceId).text('');
		});
	});
	
	var isSubmitted =false ;
	
	$('#btn_submit').click(function(){
		
		var hasError = false ;
		
		$.each(bidPlaceIds, function(i, bidPlaceId) {
			var bidPrice=$('#bidPriceH_' + bidPlaceId).val() ;
			
			if (!isNumber(bidPrice)) {
				return;
			}
		
			var basePrice = $('#basePriceH_' + bidPlaceId).val();

			if (parseFloat(bidPrice) < basePrice) {
				$('#alertMsg_' + bidPlaceId).hide() ;
				$('#alertMsg_' + bidPlaceId).text('');
				$('#warnMsg_' + bidPlaceId).text('低于底价');
				hasError = true ;
				return ;
			}
			
			$('#warnMsg_' + bidPlaceId).text('');
			$('#alertMsg_' + bidPlaceId).hide() ;
			$('#alertMsg_' + bidPlaceId).text('');
		}) ;
		
		if(hasError || isSubmitted){
			return ;
		}
		isSubmitted = true ;
		$('#advertPlaceBidStatusForm').submit() ;
	});
	
}) ;

var numReg = /^\d+(\.\d+)*$/ ;
function isNumber(inputValue){
	return numReg.test(inputValue) ;
}


