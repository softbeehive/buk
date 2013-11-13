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

// General slide switcher
function switchSlide($target) { 
    $other = $target.siblings(".active");
    if (!$target.hasClass("active")) {
        $other.each(function(index, self) {
            var $this = $(this);
            $this.addClass("left");
        });
        $target.addClass("next");
        setTimeout(function (){
            $target.addClass("left");
        }, 50);
        setTimeout(function (){
            $target.addClass("active").removeClass("next left");
            $other.removeClass("active left");
        }, 600);        
    }
}

// Ready. Steady. Go!
$(document).ready(function(){

    // Index menu switcher
    $(".buk-menu-index a").click(function(e) {
        e.preventDefault();
        var $target = $($(this).attr("href"));
        switchSlide($target);
        closeSidebar();
    });

    // Bottom switcher
    $(".buk-navi-enter").keyup(function(e) {
        if(e.keyCode == 13){
            var $target = $("#" + $(this).val());
            switchSlide($target);
        }
    });

    // Show sidebar
    $(".buk-menu-gate").click(function(){
        bringSidebar();
    });

    // Multi slide
});