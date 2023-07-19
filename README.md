# pine3ree.bs.navbar

A multilevel-menu navbar for bootstrap 5.3

## Intro

This library leverages the bootstrap `Drodpown` component capabilities in order to
provide nested menus in bootstrap navbar elements. When in collapsed mode, nested
menus will behave like a set of nested accordion elements.

The inner level dropdown direction is set using the following rules:

- if the parent `dropdown` list-item has a `dropend` entry in its class list it
  will try to open the inner `dropdown-menu`s towards the `end` direction;

- otherwise, if the parent `dropdown` list-item has a `dropstart` entry in its class 
  list it will try to open the inner `dropdown-menu`s towards the `start` direction;

- otherwise, if the parent `dropdown-menu` has a `dropdown-menu-end` entry in its
  class-list the `dropdown` list-item  will try to open the inner `dropdown-menu`s
  towards the `start` direction. This is used on the first-level `dropdown-menu`s
  to set both the menu horizontal position (bootstrap) and initial dropdown direction;

- otherwise, the initial dropdown direction will be set by default to `end`.

In any case if there is not enough space for the current or preferred direction,
the next direction will be set to the its opposite.

Note: You should not add `dropdown-menu-(start|end)` classes to inner `dropdown-menu`(s).

## Keyboard navigation

Keyboard navigation is supported using the following keys:

- `TAB`: navigate menu-items
- `ENTER`: open dropdown-menu
- `ESC`: close current dropdown-menu

## Basic usage

The following assets are required:

CSS assets

```html
<link href="path/or/css/url/bootstrap.min.css?v=5.3.0" rel="stylesheet">
<link href="path/or/url/to/css/pine3ree-bs-navbar.min.css?v=5.3.0-1.0.x" rel="stylesheet">
```
Javascript assets

```html
<script src="path/or/url/to/js/jquery.slim.min.js?v=3.7.0"></script> <!-- optional -->
<script src="path/or/url/to/js/bootstrap.bundle.min.js?v=5.3.0"></script>
<script src="path/or/url/to/js/pine3ree.bs.navbar.min.js?v=5.3.0-1.0.x"></script>
```

Online examples available at https://pine3ree.github.io/pine3ree-bs-navbar for
further yet simple customization suggestions.

To run the examples locally clone this repo and run the following commands at its root:

node v.16.x is required

Install the dependencies:

```bash
myself@mycomputer:~/my/cloned/repo/path$ npm install
```

Run a local webserver at http://127.0.0.1:8080

```bash
myself@mycomputer:~/my/cloned/repo/path$ npm serve
```

Add multilevel-menu behaviour to a navbar with `my-navbar` id attribute by including
the following code:

```html
<script>
// 0. Basic usage
pine3ree.bs.navbar(document.getElementById('my-navbar'));

// Custom options, used here with default values to explain what they do
const navbarOptions = {
    // The default navbar breakpoint, as a fallback value
    // This will in fact be determined from the :root css variables injected by
    // this library main css asset
    breakpoint: 768,

    // Enable opening menus on mouse hover
     hover: false,
    // The milliseconds to wait before automatically closing a menu opened via
    // mouseenter event
    timeout: 250,

    // Close navbar other open menus in collapsed mode when opening a new menu?
    closeOthers: false,

    // The following options are being used for testing purposes
    
    // Stop propagation of bootstrap 'shown', 'hidden' events?
    stopPropagation: false,

    // Trigger custom events?
    customEvents: false,
}

// 1. Default usage
pine3ree.bs.navbar(document.getElementById('my-navbar', navbarOptions));

// 2. Using other selectors for multiple elements
pine3ree.bs.navbar(document.querySelectorAll('.navbar', navbarOptions));

// 3. Using the provided short-named function
p3bsNavbar(document.getElementById('my-navbar', navbarOptions));

// 4. Using jquery plugin and selectors, if jQuery was loaded before this library
$('#my-navbar').p3bsNavbar(navbarOptions)); // with an uppercase "N"
</script>
```

Example navbar html code for navigation nested menus opening from the "start" towards "end" side:

```html
<nav id="my-navbar" class="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
    <div class="container-sm">
        <a class="navbar-brand fs-5" href="#">
            <span class="fst-italic font-monospace">p3</span> navbar-expand-sm
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#my-navbar-nav-wrapper" aria-controls="my-navbar" aria-expanded="false" aria-label="Toggle Navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="my-navbar-nav-wrapper" class="collapse navbar-collapse mt-3 mt-sm-0" data-bs-theme="dark">
            <ul class="navbar-nav me-auto mb-0">
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu dropdown-menu-start">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown 1
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown 2
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Dropdown 3
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#">Action</a></li>
                                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                                <li><a class="dropdown-item" href="#">Stop here</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
```


Example navbar html code for navigation nested menus opening from the "end" towards the "start" side:

```html
<nav id="my-navbar" class="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
    <div class="container-sm">
        <a class="navbar-brand fs-5" href="#">
            <span class="fst-italic font-monospace">p3</span> navbar-expand-sm
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#my-navbar-nav-wrapper" aria-controls="my-navbar" aria-expanded="false" aria-label="Toggle Navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="my-navbar-nav-wrapper" class="collapse navbar-collapse mt-3 mt-sm-0" data-bs-theme="dark">
            <ul class="navbar-nav ms-auto mb-0">
                <li class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown 1
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown 2
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li class="dropdown">
                                            <a href="#" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Dropdown 3
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#">Action</a></li>
                                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                                <li><a class="dropdown-item" href="#">Stop here</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
```


## Navbar expand breakpoints

By default the navbar css code is compiled with 3 breakpoints: `sm`, `md` and `lg`.
In fact you usually need just one or two breakpoints for a typical project navbars.

You can limit the compiled breakpoints by modifing the sass variable and rebuilding the css assets:

```scss
// file: src/scss/_variables
$nb-breakpoints: map-remove($grid-breakpoints, sm, xl, xxl); // Here only md and lg are included
```

Rebuild css (make sure you are at the repo's root path in all the terminal examples):

```bash
$ npm run build-css
```

You can also run gulp to update the builds automatically on file change:

```bash
$ gulp watch:sass # if you have gulp-cli installed globally
```

or the npm script alias

```bash
$ npm run watch-sass
```

## TODO(s)

- Improve documentation and examples (make them prettier and more readable)
- Re-add custom caret symbols (e.g +/-/arrows) from older private version (implemented for bootstrap 4.5)
- Add better solution for transition (borrow code from boostrap Accordion component?)

## Whislist
- Create a responsive navigation with different modes at different breakpoints like
  zurb-foundation 6.x responsive navigation (dropdown/accordion/drilldown)