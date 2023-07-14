<?php

$__dir = __DIR__;
$__docs = realpath("{$__dir}/../../docs");
$__dist = realpath("{$__dir}/../../dist");


$names = [
    'index',
    'index.rtl',
    'simple',
];

foreach ($names as $name) {
    system("env php {$__dir}/{$name}.html.php > {$__docs}/{$name}.html");
}

$assets = [
    // ltr
    "css/pine3ree-bs-navbar.min.css",
    "css/pine3ree-bs-navbar.min.css.map",
    "css/pine3ree-bs-navbar.inherit.min.css",
    "css/pine3ree-bs-navbar.inherit.min.css.map",
    "css/pine3ree-bs-navbar.blend.min.css",
    "css/pine3ree-bs-navbar.blend.min.css.map",
    "css/pine3ree-bs-navbar.flat.min.css",
    "css/pine3ree-bs-navbar.flat.min.css.map",

    // rtl
    "css/pine3ree-bs-navbar.rtl.min.css",
    "css/pine3ree-bs-navbar.rtl.min.css.map",
    "css/pine3ree-bs-navbar.inherit.rtl.min.css",
    "css/pine3ree-bs-navbar.inherit.rtl.min.css.map",
    "css/pine3ree-bs-navbar.blend.rtl.min.css",
    "css/pine3ree-bs-navbar.blend.rtl.min.css.map",
    "css/pine3ree-bs-navbar.flat.rtl.min.css",
    "css/pine3ree-bs-navbar.flat.rtl.min.css.map",

    // simple (ltr)
    "css/pine3ree-bs-navbar.simple.min.css",
    "css/pine3ree-bs-navbar.simple.min.css.map",

    // js
    "js/pine3ree.bs.navbar.min.js",
    "js/pine3ree.bs.navbar.min.js.map",
];

foreach ($assets as $asset) {
    copy("{$__dist}/{$asset}", "{$__docs}/{$asset}");
}
