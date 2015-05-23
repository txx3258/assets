$(function(){
	$("#claim_tips_btn").toggle(function(){
		$("#claim_tips>span")[0].className = 'arrow_up';
		$("#claim_tips>div.sub_title_hidden")[0].className = 'sub_title';
		$(".claim_con").show();
	},function(){
		$("#claim_tips>span")[0].className = 'arrow_down';
		$("#claim_tips>div")[0].className = 'sub_title_hidden';
		$(".claim_con").hide();
	});	
	
	
	$(".iconuploadbox2").hover(function(){
		if($(this).find('span').html()!=''){
			$(this).find(".change_box").show();	
		}
	},function(){
		if($(this).find('span').html()!=''){
			$(this).find(".change_box").hide();	
		}
	});
	
});


var Prompt=function(ctnr, yesCb){
	this.ctnr=ctnr;
	this.yesCb=yesCb;
	this.init();
};
Prompt.prototype={
	ctnr:null, msgBox:'.promptMsg', btnConfirm:'.promptConfirm', btnCancel:'.promptCancel'
	,init:function(){
		this.msgBox=this.ctnr.find(this.msgBox);
		var t=this;
		this.ctnr.find(this.btnConfirm).click(function(){
			t.hide();
			t.yesCb&&t.yesCb();
		});
		this.ctnr.find(this.btnCancel).click(function(){
			t.hide();
		});
	}
	,show:function(msg){
		this.msgBox.html(msg);
		this.ctnr.show();
	}
	,hide:function(){
		this.ctnr.hide();
	}
};
