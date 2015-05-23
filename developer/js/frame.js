/*
 * ---------------------------------------------
 * website:
 * filename: frame.js
 * revision: 1.0
 * createdate: 
 * author: lc
 * description: 框架部分公共js效果
 * ---------------------------------------------
 */
/*
 * 框架导航应用滑动切换
 */
function submenus(container, hoverBg) {
	var $menu = $('#' + container),
		$item = $('li', $menu),
		$slider = $('#' + hoverBg, $menu),
		$fristActive = $item.filter('.new-active'),
		set = null;
	action($fristActive); 
	
	$item/*.hover(function() {
			var $this = $(this);
			set = setTimeout( function(){
				action($this);
			}, 300);
		}, function() {
			clearTimeout( set );
			set = setTimeout( function(){
				$fristActive = $item.filter('.new-active');
				action($fristActive);
			}, 300);
		})*/
		.find("a").click(function(){
			$(this).parent().addClass('new-active').siblings().removeClass('new-active');
			action($(this).parent());
		})
		.focus(function(){
			this.blur();
		});
	function action(current) {
		if ($fristActive.size() == 0) {
			return;
		}
		current.addClass('active').siblings().removeClass('active');
		$slider.stop().animate({
			left: current.position().left
		},
		'slow', 'swing', function(){
			
		});
	}
};

$(function(){
	//表格隔行换色
	$('table.app-table-class tbody').find('tr:even').addClass('tr-even');
	//导航滑动
	submenus('app-nav-animate', 'hua-dong-bg');
	//submenus('app-title', 'app-title-bg');
	//框架导航应用折叠
	subnavslide('sub-nav');
	model_select();
})

/*
 * 框架导航应用折叠
 */
function subnavslide(nav){
	var $sub_nav = $('#' + nav);
	var $dt = $('h1', $sub_nav);
	$dt.click(function(){
		var $this = $(this);
		var $dd = $this.next('ul');
		var has = $this.hasClass('show');
		if(has){
			$dd.slideUp('slow');
			$this.removeClass('show');
		}else{
			$dd.slideDown('slow');
			$this.addClass('show');
		}
	})
};
/*
 * 模拟网页中所有的下拉列表select
 */
function model_select(){
	var $box = $('div.model-select-box');
	var $option = $('div.model-select-option', $box);
	var $txt = $('div.model-select-text', $box);
	var speed = 10;
	/*
	 * 当机某个下拉列表时，显示当前下拉列表的下拉列表框
	 * 并隐藏页面中其他下拉列表
	 */
	$txt.click(function(e) {
			$option.not($(this).siblings('.model-select-option')).slideUp(speed, function(){
				int($(this));
			});
			$(this).siblings('.model-select-option').slideToggle(speed, function(){
				int($(this));
			});
			return false;
		});
	//点击选择，关闭其他下拉
	/*
	 * 为每个下拉列表框中的选项设置默认选中标识 data-selected
	 * 点击下拉列表框中的选项时，将选项的 data-option 属性的属性值赋给下拉列表的 data-value 属性，并改变默认选中标识 data-selected
	 * 为选项添加 mouseover 事件
	 */
	$option.find('div').each(function(index, element) {
            if($(this).hasClass('seleced')){
				$(this).addClass('data-selected');
			}
        })
		.mousedown(function(){
			$(this).parent().siblings('div.model-select-text').text($(this).text())
				.attr('data-value', $(this).attr('data-option'));
			$("#optionName").val($(this).text());
			$("#optionPakage").val($(this).attr('data-option'));
			$option.slideUp(speed, function(){
				int($(this));
			});
			$(this).addClass('seleced data-selected').siblings().removeClass('seleced data-selected');
			return false;
		})
		.mouseover(function(){
			$(this).addClass('seleced').siblings().removeClass('seleced');
		});
	//点击文档，隐藏所有下拉
	$(document).click(function(e) {
        $option.slideUp(speed, function(){
			int($(this));
		});
    });
	//初始化默认选择
	function int(obj){
		obj.find('.data-selected').addClass('seleced').siblings().removeClass('seleced');
	}
}


function appTipsText(){
	$('div.app-tip-wraper').each(function(index, element) {
		var $hover = $(this).find('span.app-tip-hover');
		var $text = $(this).find('div.app-tip-text');
		var l = $hover.position().left;
    $(this).hover(function(){
			$text.show().addClass('app-tip-zindex').css('left', (l-400-22));
		}, function(){
			$text.hide().removeClass('app-tip-zindex');
		})
  });
}