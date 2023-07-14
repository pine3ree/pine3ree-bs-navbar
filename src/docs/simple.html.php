<?php

require __DIR__ . "/_common.php";

$bp = 'md';
$depth = 3;
$ts = round(time() / 60);

header('cache-control: no-cache');

?><!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Multilevel menu for bootstrap navbars">
        <meta name="author" content="pine3ree">

        <title>pine3ree bootstrap multilevel navbar menus</title>

        <link rel="stylesheet" href="./css/bootstrap.min.css?v=5.3.0">
        <link href="./css/pine3ree-bs-navbar.min.css?v=5.3.0-<?=$ts?>" rel="stylesheet">
        <link href="./css/pine3ree-bs-navbar.simple.min.css?v=5.3.0-<?=$ts?>" rel="stylesheet">

        <link href="./img/favicon.ico" rel="icon" type="image/png">

        <style>
            body {
                min-width: 25rem;
            }
        </style>
    </head>
    <body>
        <header>
            <nav
                id="navbar-simple"
                class="navbar navbar-expand-<?=$bp?> static-top p3-bs-navbar-simple"
                data-bs-theme="dark"
                >
                <div class="container-sm">
                    <a class="navbar-brand fs-5" href="#">
                        <span class="fst-italic font-monospace">p3</span> navbar-expand-<?=$bp?>
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar-nav-wrapper-simple"
                        aria-controls="navbar-simple"
                        aria-expanded="false"
                        aria-label="Toggle navbar-simple"
                        >
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div
                        id="navbar-nav-wrapper-simple"
                        class="collapse navbar-collapse mt-3 mt-<?=$bp?>-0"
                        data-bs-theme="dark"
                        >
                        <ul class="navbar-nav me-auto mb-0">
                            <?= renderDropdownMenu($depth, 8 * 4, 'start', $bp) ?>
                        </ul>
                        <ul class="navbar-nav ms-auto mb-0">
                            <?= renderDropdownMenu($depth, 8 * 4, 'end', $bp) ?>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <main class="pb-5">
            <div class="hero py-5 mb-4 bg-body-tertiary text-center">
                <div class="container-sm">
                    <h1 class="display-4">
                        <span>multilevel-menu navbar</span>
                        <small class="d-block fs-3 text-body-secondary">for bootstrap</small>
                    </h1>
                    <h3 class="fs-6 fst-italic mt-3">
                        <span class="d-inline-block align-middle">by</span>
                        <a href="https://github.com/pine3ree" class="btn-link" target="_blank" title="pine3ree">
                            <img src="./img/p3-logo.png" class="img-fluid align-middle" style="width:1.5rem;" alt="pine3ree">
                        </a>
                    </h3>
                </div>
            </div>
            <div class="container-sm">
                <div class="intro my-5 text-center">
                    <p class="description">
                        Simple example with fewer menu nesting levels and padded submenus in
                        collapsed mode.<br>
                        Visit <a href="./index.html">this page</a>
                        for more comprehensive demos.
                    </p>
                </div>
                <div class="d-block my-2 text-center text-body-tertiary font-monospace small">
                    <dl>
                        <dt class="text-nowrap">&lt;navbar&gt;</dt>
                        <dd>
                            <span class="text-nowrap">navbar-expand-<?=$bp?></span>
                            <span class="text-nowrap"> bg-dark</span>
                            <span class="text-nowrap"> p3-bs-navbar-simple</span>
                            <span class="text-nowrap">data-bs-theme="dark"</span>
                        </dd>
                    </dl>
                    <dl>
                        <dt class="text-nowrap">&lt;navbar-collapse&gt;</dt>
                        <dd>
                            <span class="text-nowrap">data-bs-theme=dark</span>
                        </dd>
                    </dl>
                </div>
                <dl class="d-block my-2 text-center text-body-tertiary font-monospace">
                    <dt class="text-nowrap">css files</dt>
                    <dd class="text-nowrap">
                        <span class="text-nowrap d-block">pine3ree-bs-navbar(.min).css</span>
                        <span class="text-nowrap d-block">pine3ree-bs-navbar.simple(.min).css</span>
                    </dd>
                </dl>
            </div>
        </main>
        <script src="./js/jquery.slim.min.js?v=3.7.0"></script>
        <script src="./js/bootstrap.bundle.min.js?v=5.3.0"></script>
        <script src="./js/pine3ree.bs.navbar.min.js?v=5.3.0-<?=$ts?>"></script>
        <script>
            $('#navbar-simple').p3bsNavbar({
                // hover: true,
                // timeout: 500
            });
        </script>
        <script>
            document.querySelectorAll('a[href="#"]').forEach(function(a) {
                a.addEventListener('click', function(e) {
                    e.preventDefault();
                });
            });
        </script>
    </body>
</html>

