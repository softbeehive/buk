/* 
   Buk: board-like presentation tool
   Oleksandr Bystrikov, 2013
*/

function bringSidebar() {
    $(".buk-menu").toggleClass("buk-menu-expanded");
}

function closeSidebar() {
    $(".buk-menu").removeClass("buk-menu-expanded");
}

jQuery(document).ready(function(){

    // Switch slides
    $(".buk-menu-index a").click(function(e) {
        e.preventDefault();

        var $target = $($(this).attr("href")),
            $other = $target.siblings(".active");

        if (!$target.hasClass("active")) {
            $other.each(function(index, self) {
                var $this = $(this);
                $this.removeClass("active");
            });
            
            $target.css({
                    right: -($target.width())
                }).addClass("active").animate({
                    right: 0
                }, 300);
        }

        // Close sidebar, resizing slide area to prevent overlapping is planned in future release
        closeSidebar();
        
    });

    // Sidebar navigation
    $(".buk-menu-gate").click(function(){
        bringSidebar();
    });

    // Bottom navigation
    $(".buk-navi-enter").keyup(function(e) {
        if(e.keyCode == 13){
            console.log($(this).val());
        }
    });

    // Multi slide
});