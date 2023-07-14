# pine3ree.bs.navbar

A multilevel-menu navbar for bootstrap 5.3

## Intro

This library leverage the bootstrap `Drodpown` component capabilities in order to
add nested menus in the bootstrap navbar element.

The inner level dropdown direction is set using the following rules:

- if the parent `dropdown` list-item has a `dropend` entry in its class list it
  will try to continue opening the inner `dropdown-menu` towards the `end` direction

- if the parent `dropdown-menu` list a `dropdown-menu-end` entry in its class list
  the `dropdown` list-item  will try to continue opening the inner `dropdown-menu`
  towards the end direction

- The same applies for `dropdown` list-items with a `dropstart`class entry and
  for `dropdown-menu` lists  with a `dropdown-menu-start`class entry but in the
  opposite `start` direction

In any case if there is not enough space in the current preferred direction, the
next direction will be set to the opposite.

Keyboard navigation is supported using the following keys:

- `TAB`: navigate menu-items
- `ENTER`: open dropdown-menu
- `ESC`: close current dropdown-menu

## Basic usage:

The following assets are required:

CSS assets

```html
<link href="path/or/css/url/bootstrap.min.css?v=5.3.0" rel="stylesheet">
<link href="path/or/url/to/css/pine3ree-bs-navbar.min.css?v=5.3.0-1.0.0" rel="stylesheet">
```
Javascript assets

```html
<script src="path/or/url/to/js/jquery.slim.min.js?v=3.7.0"></script> <!-- optional -->
<script src="path/or/url/to/js/bootstrap.bundle.min.js?v=5.3.0"></script>
<script src="path/or/url/to/js/pine3ree.bs.navbar.min.js?v=5.3.0-1.0.0"></script>
```

Online examples available at https://pine3ree.github.io/pine3ree-bs-navbar for
further yet simple customization suggestions.

Add multilevel-menu behaviour to a navbar with `my-navbar` id attribute by including
the following code:

```html
<script>
// 0. Basic usage
pine3ree.bs.navbar(document.getElementById('my-navbar'));

// Custom options, used here with default values to explain what they do
const navbarOptions = {
    // The default navbar breakpoint, it will be determined from the :root styles
    // and
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