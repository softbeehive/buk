# [Buk](http://yakviter.com.ua/buk/)
Buk is mobile-ready, multidimensional presentation tool with flexible navigation and controls designed under influence of board, well known educational attribute.

Demo: [http://yakviter.com.ua/buk/](http://yakviter.com.ua/buk/)
## Name and idea
It may seem wierd but I spent a day iterating through possible variants searching for a great name. Final result I came with was even better then expected. Because of its symbolism.

- Buk [bük] - means beech, a large tree with smooth grey bark and small nuts.
- Bukovina, Bucovina - historical region of Ukraine and Romania named of buk, lovely place I live.
- Book is homophone, kind of homonym, the most recognizable source of knowledge, don't forget what paper is made from.
- Board, in Ukrainian board and plank are homonyms as well, it is written and spelled as "дошка" [do':shka].

It perfectly combines idea and materia, its educational nature and representation.

## Quickstart & Requirements
Buk depends on jQuery 1.8+, theme is based on Twitter Bootstrap 3.

Recently buk is structure oriented tool. It is provided as boilerplate, which is easy to modify. Basically you need 4 items to start include jQuery, buk.js (presentation tool core), bootstrap.css (basic styles) and buk.css (theme).

Follow initial structure or just use [index.html](https://github.com/softbeehive/buk/blob/master/index.html) as a start template.

```html

<div class="buk-atmosphere">

    <!-- Content container -->
    <div class="buk-lithosphere">
        <div id="1" class="buk-board active">
            <article class="buk-board-article">Slide #1 content</article>
        </div>
        <div id="2" class="buk-board">
            <article class="buk-board-article">Slide #2 content</article>
        </div>
    </div>

    <!-- Index menu -->
    <div class="buk-menu">
        <div class="buk-menu-hwrap">
            <a class="buk-menu-gate" href="javascript:void(0)">
                <span class="buk-menu-bar"></span>
                <span class="buk-menu-bar"></span>
                <span class="buk-menu-bar"></span>
            </a>
            <h3>Index</h3>
        </div>
        <div class="buk-menu-iwrap">
            <ol class="buk-menu-index">
                <li><a class="active" href="#1">Slide #1</a></li>
                <li><a href="#2">Slide #2</a></li>
                ...
            </ol>
        </div>
    </div>

    <!-- Dimension switcher -->
    <div class="buk-multi">
        <div class="buk-multi-inner">
            <a class="buk-multi-gate" href="javascript:void(0)">
                <i class="glyphicon glyphicon-th"></i>
            </a>
            <div class="buk-multi-choice">
                <a class="x" href="javascript:void(0)" data="2">
                    <span class="badge">x2</span></a>
                <a class="x" href="javascript:void(0)" data="3">
                    <span class="badge">x3</span>
                </a>
            </div>
        </div>
    </div>

    <!-- Arrow controls -->
    <div class="buk-ao">
        <a class="buk-to alpha invisible" href="javascript:void(0)">
            <i class="glyphicon glyphicon-chevron-left"></i>
        </a>
        <a class="buk-to omega" href="javascript:void(0)">
            <i class="glyphicon glyphicon-chevron-right"></i>
        </a>
    </div>

    <!-- Navigation, page number indication -->
    <div class="buk-navi">
        <div class="buk-navi-inner">
            <input class="buk-navi-enter" type="text" name="go-to-slide" value="1">
        </div>
    </div>

    <!-- Wooden frame -->
    <div class="buk-frame buk-frame-t"></div>
    <div class="buk-frame buk-frame-r"></div>
    <div class="buk-frame buk-frame-b"></div>
    <div class="buk-frame buk-frame-l"></div>

</div>
```

## Controls

Navigating through the slides is quite flexible and easy. There are several ways available:
- arrow keys (left - right, up - down)
- visual arrow icons (left - right)
- context menu
- slide number input + enter

## Planned improvements
I believe buk will be socially useful, planting a seed I'm pretty sure we can grow a great tree. Main priorities:
- dynamic content structure
- visual flexibility, adding multiple theme support
- better mobile readiness
- perfomance optimization
- error handling
