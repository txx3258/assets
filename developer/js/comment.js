/*
 * ---------------------------------------------
 * website:
 * filename: comment.js
 * revision: 1.0
 * createdate: 2013-09-19
 * author: lc
 * description: 评论
 * ---------------------------------------------
 */
//回复 
//http://beta.test2.surepush.cn/developer/replyOnComment.jspx
//评论
//http://beta.test2.surepush.cn/developer/saveComment.jspx
function setIframeHeight(iframeId){
	var windowTopScrollTop = $(window.top).scrollTop();
	var Object_MainFrame = parent.document.getElementById(iframeId);
	if(Object_MainFrame!=null){
		Object_MainFrame.style.height = '400px';
		try{
			var bHeight = Object_MainFrame.contentWindow.document.body.scrollHeight;
			var dHeight = Object_MainFrame.contentWindow.document.documentElement.scrollHeight;
			var S_height = Math.max(bHeight, dHeight);
			Object_MainFrame.style.height = S_height +'px';
			$(window.top).scrollTop(windowTopScrollTop)
		}catch (ex){}
	}
};

function setInput(_oInput, _oNumber, _size){
	_oInput.setAttribute('maxlength', _size);
	if (window.addEventListener){
		_oInput.addEventListener('input', function() {
			var val = _oInput.value, len = val.length;
			if (len >= _size + 1) {
				_oInput.value = val.substr(0, _size);
			}
			_oNumber.innerHTML = _size - _oInput.value.length;
		}, false);
	}else if (window.attachEvent){
		_oInput.attachEvent('onpropertychange', function() {
			var val = _oInput.value, len = val.length;
			if (len >= _size + 1) {
				_oInput.value = val.substr(0, _size);
			}
			_oNumber.innerHTML = _size - _oInput.value.length;
		});
	}
};
;(function($){
	$.fn.ADP_conment = function(){
		return this.each(function(){
			var $this = $(this);
			var $starBBox = $this.find('p.starBBox>i');
			var $starBBox2 = $('#starBBox2');
			$starBBox.mouseover(function(){
				var ind = $(this).index();
				$starBBox2.val(parseInt(ind, 10) + 1);
				$starBBox.each(function(index, element) {
          if(ind<index){
						$(this).addClass('starHollow');
					}else{
						$(this).removeClass('starHollow');
					}
        });
			});
			//字数限制
			var size = 140;
			setInput($this.find('textarea[name=cnt]')[0], $this.find('div.formHeader>span.tipMsg>span.fred')[0], size);
		});
	};
	$.ADP_reply = function(){
		var createReply = function(_$this, _cid, _pid, _replyCount, _username){
			var textNumber = 140;	//限制文字个数
			var parent = _$this.parent();
			$('.replyForm').remove();
			var $replyForm = parent.siblings('.replyForm');
			var h = '\
				<div class="replyForm fl mt10 w-100" item="reply" current="1">\
          <div class="divTextarea"><span class="errorMsg pa w-100 tcenter"></span>\
            <textarea class="mb10 fgrey4 w-100" name="reply">@' + _username + ':</textarea>\
          </div>\
          <p class="replyHandler"> <span class="fl tipMsg f12">您还可以输入<span class="fred">' + textNumber + '</span>个字</span> <a href="javascript:void(0);" class="fblue simpleBtn tcenter fr" data-cid="' + _cid + '" data-pid="' + _pid + '"">回复</a> <a href="javascript:void(0);" class="fblue simpleBtn tcenter fr borderno mr10 cancelBtn">取消</a> </p>\
        </div>';
			if(!$replyForm.length){
				$replyForm = $(h).insertAfter(parent);
				setInput($replyForm.find('textarea[name=reply]')[0], $replyForm.find('p.replyHandler>span.tipMsg>span.fred')[0], textNumber);
				setIframeHeight('frame1');
				$replyForm.find('textarea[name=reply]').focus(function(){
					$(this).val('');
				})
				//取消回复
				$replyForm.find('a').eq(1).bind('click', function(e){
					_$this.find('a').css({background:'#003A76',color:'#fff',cursor: 'pointer'});
					$replyForm.hide();
					setIframeHeight('frame1');
				});
				//回复
				$replyForm.find('a').eq(0).bind('click', function(e){
					var t = $.trim($replyForm.find('textarea[name=reply]').val());
					if(t.length == 0){
						alert('请输入内容!');
						return;
					};
					//return;
					var $errorMsg = $replyForm.find('span.errorMsg');
					var cid = $(this).attr('data-cid'), pid = $(this).attr('data-pid');
					$.ajax({
						type: 'post',
						url: 'replyOnComment.jspx?',
						data: 'id='+ADP_lcaid+'&cid='+cid+'&pid='+pid+'&cnt=@' + _username + ':' + t,
						dataType: 'json',
						success: function(msg){
							var succ = msg;
							var t = succ.ret ? '回复成功' : '回复失败';
							/*console.log($errorMsg)
							$errorMsg.text(t).show();
							setTimeout(function(){
								$errorMsg.hide();
							}, 1000);*/
							//回复成功
							if(succ.ret){
								var comment = succ.data.comment;
								var m = '\
										<li class="bordertop4 oh fl">\
											<div class="avatar border1 fl">\
												<img src="http://snspic.lenovomm.com/snsimg/pic/get/'+comment.userId + '?t='+new Date().getTime()+'" class="icons bcenter">\
											</div>\
											<div class="commentRight fl">\
												<div class="clear ' + ( comment.developer ? 'emPlugVBox' : '' ) + '">' + (comment.operator ? '<em class="emPlugV"></em>' : '') + '<span class="fl fgrey5">'+comment.userName+'</span></div>\
												<p class="description cl fgrey5">' +comment.content+'</p>\
												<p class="fgrey4 commentBtm">\
													<a href="javascript:void(0);" class="fblue simpleBtn tcenter fr" data-username="'+comment.userName+'" data-cid="' + comment.commentId + '" data-pid="' + comment.id + '">回复</a>\
													<span>来自:<var>'+comment.model+'</var></span>\
													<span>版本编号:<var>'+comment.appVersion+'</var></span>\
													<span>发表时间:<var>'+comment.commentDate+'</var></span>\
												</p>\
											</div>\
										</li>';
								var $commentsSub = $replyForm.siblings('div.commentsSub');
								if($commentsSub.length == 1){
									$(m).prependTo($commentsSub.children('ul'));
								}else{
									var $replyArrow = $replyForm.parent().parent().siblings('i.replyArrow');
									if($replyArrow.length == 1){
										$(m).insertAfter($replyForm.parent());
									}else{
										var $commentsSub = $('<div class="commentsSub fl w-100">\
																						<i class="icons replyArrow"></i>\
																						<ul class="bggrey1 fl"></ul>\
																					</div>').insertAfter($replyForm);
										$(m).appendTo($commentsSub.children('ul'));
									}
								}
								$replyForm.remove();
								_$this.find('a').css({background:'#003A76',color:'#fff',cursor: 'pointer'});
								$('div.commentsSub').find('li').eq(0).removeClass('bordertop4').siblings('li').addClass('bordertop4');
								$('#commentsBox>li>div.commentRight>p.commentBtm>a').each(function(index, element) {
                  var replyCount2 = $('#commentsBox>li').eq(index).find('div.commentsSub>ul.bggrey1>li').length;
									$(this).text('回复(' + parseInt(replyCount2, 10) + ')');
                });
								//$('#commentsBox>li>div.commentRight>p.commentBtm>a').text('回复(' + parseInt(replyCount2, 10) + ')');
							}else{ //回复失败
								alert(succ.data)
							}
							setIframeHeight('frame1');
						}
					})
				})
			}else{
				if($replyForm.css('display') == 'none'){
					$replyForm.show();
					setIframeHeight('frame1');
				}
			}
		};
		$('p.commentBtm').find('a').live('click', function(){
			var $this = $(this).parent();
			$('p.commentBtm').find('a').css({background:'#003A76',color:'#fff',cursor: 'pointer'});
			$(this).css({background:'#ccc',color:'#555', cursor: 'default '});
			var cid = $(this).attr('data-cid'), pid = $(this).attr('data-pid'), replyCount = $(this).attr('data-replyCount'), username = $(this).attr('data-username');
			createReply($this, cid, pid, replyCount, username);
		})
	};
	$.fn.ADP_inputText = function(){
		return this.each(function(){
			
		})
	};
}(jQuery));
$(function(){
	$('#commentsBox>li').removeClass('fl');
	$('#commentForm').ADP_conment();
	$.ADP_reply();
	setIframeHeight('frame1');
})
