/*
 * ---------------------------------------------
 * website:
 * filename: jquery.lc.scrolltop.js
 * revision: 1.0
 * createdate: 2012-06-05
 * author:wangkun
 * description: 返回顶部效果
 * ---------------------------------------------
 */
; (function($) {
    $.fn.extend({
        scrolltop: function(options) {
            var defaults = {
                speed:400,
                right:50,
                bottom:20
            };
            var o = $.extend(defaults, options);
            var $this = $(this);
            $this.css({
                "display": "none",
                "right": o.right + "px",
                "cursor": "pointer"
            });
            if (!window.XMLHttpRequest) {
                $this.css({
                    "position": "absolute",
                    "bottom": "auto"
                });
            } else {
                $this.css({
                    "position": "fixed",
                    "bottom": o.bottom + "px"
                });
            }
            var h = $this.outerHeight(true);
            $this.click(function() {
                $("html, body").animate({
                    scrollTop: 0
                },
                o.speed, "linear");
            });
            var backToTop = function() {
                var doc_scroll_top = $(document).scrollTop(),
                win_height = $(window).height(); (doc_scroll_top > 0) ? $this.fadeIn(400) : $this.fadeOut(400);
                if (!window.XMLHttpRequest) {
                    $this.css("top", doc_scroll_top + win_height - parseInt(o.bottom) - h);
                }
            };
			backToTop();
            $(window).bind("scroll resize", backToTop);
        }
    });
})(jQuery);
