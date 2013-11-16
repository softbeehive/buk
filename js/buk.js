/* 
   Buk: board-like presentation tool
   Oleksandr Bystrikov, 2013
*/

// General slide switcher
function switchSlide($target) {
    // Preparations
    var $other = $target.siblings(".active"),
        actid = parseInt($target.attr("id")),
        current = parseInt($(".buk-board.active").attr("id"));
    // Detect direction
    if (current > actid) {
        var direction = "right",
            order = "prev";
    } 
    else {
        var direction = "left",
            order = "next";
    }
    // Visual part
    if (!$target.hasClass("active")) {
        $other.each(function(index, self) {
            var $this = $(this);
            $this.addClass(direction);
        });
        $target.addClass(order);
        setTimeout(function() {
            $target.addClass(direction);
        }, 50);
        setTimeout(function() {
            $target.addClass("active").removeClass(order +" "+ direction);
            $other.removeClass(direction +" active");
        }, 400);        
    }
    // Syncronizing
    setTimeout(function() {
        syncNav(actid);
        syncSidebar();
    }, 410);
}

// Arrow and keyboard switcher
function switchAlphaOmega(dir) {
    var getid = parseInt($(".buk-board.active").attr("id")),
        pid = 0;
    if (dir == "a") pid = getid - 1;
    else if (dir == "o") pid = getid + 1;
    $target = $("#" + pid);
    switchSlide($target);
}

// Sidebar methods
function syncSidebar() {
    var canhref = "#" + $(".buk-board.active").attr("id"),
        $candidate = $(".buk-menu-index a[href="+ canhref +"]"),
        $past = $(".buk-menu-index a.active").not($candidate);
    $candidate.addClass("active");
    $past.removeClass("active");
}

// Show sidebar
function bringSidebar() {
    $(".buk-menu").toggleClass("buk-menu-expanded");
}

// Hide sidebar
function closeSidebar() {
    $(".buk-menu").removeClass("buk-menu-expanded");
}

// Nav input syncronizer
function syncNav(actid) {
    var nav = $(".buk-navi-enter").val();
    if (nav != actid && actid != null) $(".buk-navi-enter").val(actid);
}

// Ready. Steady. Go!
$(document).ready(function() {

    // Show sidebar
    $(".buk-menu-gate").click(function() {
        bringSidebar();
    });

    // Index menu switcher
    $(".buk-menu-index a").click(function(e) {
        e.preventDefault();
        var $target = $($(this).attr("href"));
        switchSlide($target);
        closeSidebar();
    });

    // Bottom switcher (on enter press)
    $(".buk-navi-enter").keyup(function(e) {
        if (e.keyCode == 13){
            var $target = $("#" + $(this).val());
            switchSlide($target);
        }
    });

    // Arrow switcher
    $(".alpha").click(function() {
        switchAlphaOmega("a");
    });

    $(".omega").click(function() {
        switchAlphaOmega("o");
    });

    // Keyboard switcher
    $(document).keyup(function(ee) {
        if (ee.keyCode == 37 || ee.keyCode == 40) switchAlphaOmega("a");
        else if (ee.keyCode == 39 || ee.keyCode == 38) switchAlphaOmega("o");
    });

    // Multi slide

    // Initial load
    syncNav(1);
});