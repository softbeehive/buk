/* 
   Buk: board-like presentation tool
   Oleksandr Bystrikov, 2013
*/

// General slide switcher
function switchSlide($target, candarr) {
    // Preparations
    var $other = $target.siblings(".active"),
        current = getCurrent(true);
    // Detect direction
    if (current[0] > candarr[0]) {
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
        }, 450);        
    }

    // Syncronizing
    setTimeout(function() {
        watchStep();
        syncNav();
        syncSidebar();
    }, 460);
}

// Arrow and keyboard switcher
function switchAlphaOmega(dir) {
    var getid = getCurrent(),
        step = getStep(),
        pid = 0,
        made = [];
    if (getid.length != step) {
        getid = prepareLayout(getid, step);
    }
    if (dir == "a") {
        for (var i = 0; i < getid.length;  i++) {
            made[i] = Number((getid[i]) - step);
        }
    }
    else if (dir == "o") {
        for (var i = 0; i < getid.length;  i++) {
            made[i] = Number((getid[i]) + step);
        }
    }
    $target = $("#" + made.join(", #"));
    return switchSlide($target, made);
}

// Get current slides
function getCurrent() {
    var current = [];
    $(".buk-board.active").each(function() {
        current.push(Number(this.id));
    });
    return current;
}

// Get step
function getStep() {
    var step = Number(1);
    if ($(".x").hasClass("active")) step = Number($(".x.active").attr("data"));
    return step;
}

// Prepare layout
function prepareLayout(getid, step) {
    var len = getid.length;
    if (len > step) {
        for (var i = len; i > step; i--) {
            getid.pop();
        }
        if (len > 1) $(".buk-board.active").not("#" + getid.join(", #")).removeClass("active");
        else $(".buk-board.active").not("#" + getid).removeClass("active");
    }
    else if (step > len){
        for (var i = step; i > len; i--) {
            g1 =  (getid[getid.length - 1]) + 1;
            getid.push(g1);
        }
        if (len > 1) $("#" + getid.join(", #")).addClass("active");
        else $("#" + getid).addClass("active");
    }
    return getid;
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
    $(".buk-menu-index a").removeClass("active");
    var current = getCurrent();
    for (var i = 0; i < current.length; i++) {
        $(".buk-menu-index a[href="+ "#" + current[i] +"]").addClass("active");
    }
}

// Syncronize bottom navigation
function syncNav(current) {
    var current = getCurrent();
        first = current[0], 
        last = current[current.length - 1];
    if (first != last) {
        var range = first + "-" + last;
        $(".buk-navi-enter").val(range).prop("disabled", true);
    }
    else $(".buk-navi-enter").val(current).removeProp("disabled");
}

// Watch step
function watchStep() {
    var current = getCurrent(),
        last = Number($(".buk-board").last().attr("id")),
        first = Number($(".buk-board").first().attr("id"));
    if (first != last) {
        if (current[0] == first) {
            $(".alpha").addClass("invisible");
            $(".omega").removeClass("invisible");
        }
        else if (current[current.length - 1] == last) {
            $(".omega").addClass("invisible");
            $(".alpha").removeClass("invisible");
        }
        else $(".alpha, .omega").removeClass("invisible");
    }
    else $(".alpha, .omega").addClass("invisible");
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
        var canhref = $(this).attr("href"),
            step = getStep(),
            made = [Number($(canhref).attr("id"))];
        for (var i = 0; i < step - 1; i++) {
            made[i+1] = Number(made[i] + 1);
        }
        $target = $("#" + made.join(", #"));
        switchSlide($target, made);
        // closeSidebar();
    });

    // Bottom switcher (on enter press)
    $(".buk-navi-enter").keyup(function(e) {
        if (e.keyCode == 13) {
            var target = [];
            target[0] = "#" + Number($(this).val());
            switchSlide($(target[0]), target[0]);
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

    $(".buk-multi-choice .x").click(function() {
        // Process dimension
        var dim = $(this).attr("data"),
            current = getCurrent(),
            $siblings = $(this).siblings(".active");
        if ($(this).hasClass("active")) {
            $(".buk-board").removeClass("x" + dim);
            prepareLayout(current, 1);
        }
        else {
            $(".buk-board").addClass("x" + dim);
            tp = prepareLayout(current, dim);
            $show = $("#" + tp.join(", #"));
            $show.addClass("active");
        }
        // Clean other dimensions
        if ($siblings.hasClass("active")) {
            $siblings.each(function(index, self) {
                $(".buk-board").removeClass("x" + $(self).attr("data"));
            });
            $siblings.removeClass("active");
        }
        $(this).toggleClass("active");
        syncNav();
        syncSidebar();
    });

    // Initial load
    syncNav();
    watchStep();
});