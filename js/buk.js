/* 
   Buk: board-like presentation tool
   Oleksandr Bystrikov, 2013
*/

// General slide switcher
function switchSlide($target) {
    // Preparations
    var $other = $target.siblings(".active"),
        actid = parseInt($target.attr("id")),
        current = getCurrent();
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
    var getid = getCurrent(),
        pid = 0;
    if (dir == "a") pid = getid - 1;
    else if (dir == "o") pid = getid + 1;
    $target = $("#" + pid);
    switchSlide($target);
}

// Get current slide id
function getCurrent() {
    current = parseInt($(".buk-board.active").attr("id"));
    return current;
}
/* ----------------------------------------------------------- */

// Show sidebar
function bringSidebar() {
    $(".buk-menu").toggleClass("buk-menu-expanded");
}

// Hide sidebar
function closeSidebar() {
    $(".buk-menu").removeClass("buk-menu-expanded");
}
/* ----------------------------------------------------------- */

// Syncronize sidebar
function syncSidebar() {
    var canhref = "#" + getCurrent(),
        $candidate = $(".buk-menu-index a[href="+ canhref +"]"),
        $past = $(".buk-menu-index a.active").not($candidate);
    $candidate.addClass("active");
    $past.removeClass("active");
}

// Syncronize bottom navigation
function syncNav(actid) {
    var nav = $(".buk-navi-enter").val();
    if (actid !== '' && !isNaN(actid)) {
        $(".buk-navi-enter").val(actid);
        watchStep(actid);
    }
    else {
        current = getCurrent();
        $(".buk-navi-enter").val(current);
    }
}

// Watch step
function watchStep(actid) {
    var last = parseInt($(".buk-board").last().attr("id")),
        first = parseInt($(".buk-board").first().attr("id"));
    if (actid == first) {
        $(".alpha").addClass("invisible");
        $(".omega").removeClass("invisible");
    }
    else if (actid == last) {
        $(".omega").addClass("invisible");
        $(".alpha").removeClass("invisible");
    }
    else $(".alpha, .omega").removeClass("invisible");
}
/* ----------------------------------------------------------- */

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
    $(".buk-multi-gate").click(function() {
        $(".buk-multi-choice").toggleClass("open");
    });

    // Initial load
    syncNav(1);
});