/* 
   Buk: board-like presentation tool
   Oleksandr Bystrikov, 2013
*/

// Sidebar methods
function bringSidebar() {
    $(".buk-menu").toggleClass("buk-menu-expanded");
}

function closeSidebar() {
    $(".buk-menu").removeClass("buk-menu-expanded");
}

// Ready. Steady. Go!
jQuery(document).ready(function(){

    // Switch slides
    $(".buk-menu-index a").click(function(e) {
        //set start point anywhere you want
        var start = new Date();

        e.preventDefault();

        var $target = $($(this).attr("href")),
            $other = $target.siblings(".active");

        if (!$target.hasClass("active")) {

            $other.each(function(index, self) {

                var $this = $(this);
                $this.css({
                    left: 0
                }).animate({
                    left: -($(".buk-atmosphere").width())
                }, 300);
            });
            setTimeout(function (){
                $other.removeClass("active").removeAttr("style");
            }, 350);

            $target.css({
                right: -($(".buk-atmosphere").width())
            }).addClass("active").animate({
                right: 0
            }, 600);
        }

        // Close sidebar, resizing slide area to prevent overlapping is planned in future release
        closeSidebar();

        //when done,
        var end = new Date();
        //to profile milliseconds, just do 
        var duration = end - start;
        console.log(duration);

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