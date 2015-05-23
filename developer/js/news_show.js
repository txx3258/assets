$.fn.news = function () {

    function repeat(str, num) {
        return new Array(num + 1).join(str);
    }

    return this.each(function () {
        var $box = $('> div', this).css('overflow', 'hidden'),
                $slider = $box.find('> ul'),
                $items = $slider.find('> li'),
                $single = $items.filter(':first'),
                singleWidth = $single.outerWidth(),
                visible = Math.ceil($box.innerWidth() / singleWidth),
                currentPage = 1,
                pages = Math.ceil($items.length / visible);

        if (($items.length % visible) != 0) {
            $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
            $items = $slider.find('> li');
        }


        $items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
        $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
        $items = $slider.find('> li'); // reselect


        $box.scrollLeft(singleWidth * visible);

        function gotoPage(page) {
            var dir = page < currentPage ? -1 : 1,
                    n = Math.abs(currentPage - page),
                    left = singleWidth * dir * visible * n;
            $box.filter(':not(:animated)').animate({
                scrollLeft : '+=' + left
            }, 500, function () {
                if (page == 0) {
                    $box.scrollLeft(singleWidth * visible * pages);
                    page = pages;
                } else if (page > pages) {
                    $box.scrollLeft(singleWidth * visible);                   // reset back to start position
                    page = 1;
                }

                currentPage = page;
            });

            return false;
        }

        $box.after('<a class="arrow back"></a><a class="arrow forward"></a>');

        $('a.back', this).click(function () {
            return gotoPage(currentPage - 1);
        });
        $('a.forward', this).click(function () {
            return gotoPage(currentPage + 1);
        });

        $(this).bind('goto', function (event, page) {
            gotoPage(page);
        });
    });
};

$(document).ready(function () {
    $('.news').news();
});