$(function() {
	var ctxH = $('#ctxH').val();
	var advertPlanId = $('#advertPlanIdH').val();

	$('#btn_back').click(
			function(e) {
				var pkgName = $('#pkgNameH').val(); 
				var planStates = $('#planStateH').val();
				location.href = ctxH + '/gotoAdvertPlanHome.jspx?pkg='
						+ pkgName + "&state=" + planStates;
			});

	$('#changeBidStatus').click(
			function(e) {
				location.href = ctxH
						+ '/changeAdvertPlaceBidStatus.jspx?planid='
						+ advertPlanId;
			});

	$('#changeBidSelection').click(
			function(e) {
				location.href = ctxH + '/changeAdvertPlaceBid.jspx?planid='
						+ advertPlanId;
			});

	$(':checkbox').click(function(e) {
		if (this.id == "chkAllBtn") {
			$(":checkbox").attr("checked", this.checked);
			return;
		}
	
		if (this.checked) {
			$('#' + this.id + '_H').val('1');
		} else {
			$('#' + this.id + '_H').val('0');
			$('#chkAllBtn').attr("checked", this.checked);
		}
	});

	var bidSumitted = false;
	

	$('#btn_submit').click(function(e) {
		if (bidSumitted) {
			console.debug("bidform is submitted");			
			return;
		}
		
		if(!hasCheckedBidPlace()){
			$('#submitAlert').text("至少选择一个推广位") ;
			return ;
		}
		
		if(!isInputNumberValid()){
			return ;
		}
		
		bidSumitted = true;
		$('#bidForm').submit();
		$('#btn_submit').text("提交中...");
	});

	$('.showcase').each(function(ix, el) {
		el = $(el);
		var box = el.find('.showBox');
		if (box.length) {
			el.find('.btnShow').click(function() {
				if (box[0].offsetWidth) {
					box.hide();
				} else {
					box.show();
					window.setTimeout(function() {
						$(document).one('mouseup', function() {
							box.hide();
						});
					}, 100);
				}
			});
		}

	});

	$.each(bidPlaceIds, function(i, bidPlaceId) {
		$('#bidPriceH_' + bidPlaceId).blur(function(e) {
			if (!isNumber(this.value)) {
				$('#alertMsg_' + bidPlaceId).hide() ;
				$('#alertMsg_' + bidPlaceId).text('');
				$('#warnMsg_' + bidPlaceId).text('非法数字');
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
				$('#alertMsg_' + bidPlaceId).text('高于建议出价十倍');
				$('#alertMsg_' + bidPlaceId).show() ;
				return ;
			}
			
			$('#warnMsg_' + bidPlaceId).text('');
			$('#alertMsg_' + bidPlaceId).hide() ;
			$('#alertMsg_' + bidPlaceId).text('');
		});
	});
});

function isInputNumberValid(){
	var isNumberValid = true ;
	$.each(bidPlaceIds, function(i, bidPlaceId) {
		if (!isNumber($('#bidPriceH_' + bidPlaceId).val())) {
			$('#alertMsg_' + bidPlaceId).hide() ;
			$('#alertMsg_' + bidPlaceId).text('');
			$('#warnMsg_' + bidPlaceId).text('非法数字');
			isNumberValid = false ;
		}
	}) ;
	return isNumberValid ;
}

function hasCheckedBidPlace(){
	if($('#chkAllBtn')[0].checked){
		return true ;
	}
	var checked = false ;
	$.each(bidPlaceIds, function(i, bidPlaceId) {
		var checkedStatus=$('#checkStatus_'+bidPlaceId+'_H').val() ;
		if(checkedStatus==1){
			checked = true ;
			return false ;
		}
	}) ;
	return checked ;
}

var numReg = /^\d+(\.\d+)*$/ ;
function isNumber(inputValue){
	return numReg.test(inputValue) ;
}
