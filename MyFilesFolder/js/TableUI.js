(function ($) {
    $.fn.tableUI = function (options) {
        var defaults = {
            evenRowClass: "evenRow",
            oddRowClass: "oddRow",
            activeRowClass: "activeRow"
        }
        var options = $.extend(defaults, options);
        this.each(function () {
            var thisTable = $(this);

            thisTable.find("tr:even").addClass(options.evenRowClass);
            thisTable.find("tr:odd").addClass(options.oddRowClass);

            $(thisTable).find("tr").bind("mouseover", function () {
                $(this).addClass(options.activeRowClass);
            });

            $(thisTable).find("tr").bind("mouseout", function () {
                $(this).removeClass(options.activeRowClass);
            });
            /* 
            $(thisTable).find("tr").bind("mouseenter mouseleave",function(e){ 
            $(this).toggleClass(options.activeRowClass); 
            }); 
            */
        });
    };
})(jQuery);