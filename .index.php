<?php

$t = time();

$rtl = false;
$bp = 'md';

const DROPDOWN =<<< DROPDOWN
<li class="dropdown {class_li}">
    <a
        class="{class_a} dropdown-toggle"
        href="#"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        >
        Dropdown
    </a>
    {submenu}
</li>
DROPDOWN;

const MENU =<<< MENU
<ul class="dropdown-menu {class_ul}">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    {dropdowns}
</ul>
MENU;

function dropdown(int $sublevels = 7, int $dditems = 1, bool $top = true, string $end = null) {

    $dditems = max(0, $dditems);
    $sublevels = max(0, $sublevels);
    if ($sublevels === 0) {
        $dditems = 0;
    }

    $html = '';

    if ($sublevels > 0 && $dditems > 0) {
        $dropdown  = str_replace('{class_li}', ($end && $top) ? 'dropstart' : '', DROPDOWN);
        $dropdown  = str_replace('{class_a}', 'dropdown-item', $dropdown);
        $dropdown  = str_replace('{submenu}', '', dropdown($sublevels - 1, 1, false));
        $dropdowns = str_repeat($dropdown, $dditems);
        $submenu  = str_replace('{dropdowns}', $dropdowns, MENU);
        $end = trim($end, " -");
        $submenu  = str_replace('{class_ul}', $end ? "dropdown-menu-{$end}" : '', $submenu);
    } else {
        $submenu = str_replace('{dropdowns}', '', MENU);
    }

    $class_li = $top ? ' nav-item' : '';
    $class_a  = $top ? ' nav-link' : 'dropdown-item';

    return str_replace(['{class_li}', '{class_a}', '{submenu}'], [$class_li, $class_a, $submenu], DROPDOWN);
}

function clone_nav($nav, $src, $dst) {
    if ($src === $dst) {
        return '';
    }

    $nav = str_replace("navbar-expand-{$src}", "navbar-expand-{$dst}", $nav);
    $nav = str_replace("navbar-nav-wrapper-{$src}", "navbar-nav-wrapper-{$dst}", $nav);
    $nav = str_replace("dropdown-menu-{$src}-end", "dropdown-menu-{$dst}-end", $nav);
    $nav = str_replace("mt-{$src}-0", "mt-{$dst}-0", $nav);

    return $nav;
}

?><!DOCTYPE html>
<html lang="en"<?php if($rtl): ?> dir="rtl"<?php endif ?>>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="pine3ree">

        <title>MULTILEVEL NAVBAR</title>

        <link href="../node_modules/bootstrap/dist/css/bootstrap<?php if($rtl): ?>.rtl<?php endif ?>.min.css?v=5.2.0-beta1?t=<?= $t ?>" rel="stylesheet">
        <link href="../dist/css/p3-bs-navbar<?php if($rtl): ?>.rtl<?php endif ?>.css?t=<?= $t ?>" rel="stylesheet">
    </head>
    <body>
        <header>
            <?php ob_start() ?>
            <nav id="navbar-expand-<?=$bp?>" class="navbar navbar-expand-<?=$bp?> navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">MULTILEVEL NAVBAR</a>
                    <button
                        class="navbar-toggler ms-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar-nav-wrapper-<?=$bp?>"
                        aria-controls="#navbar-nav-wrapper-<?=$bp?>"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbar-nav-wrapper-<?=$bp?>" class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-0 me-0 mb-0 mt-3 mt-<?=$bp?>-0">
                            <?= dropdown(7, 2, true) ?>
                        </ul>
                        <ul class="navbar-nav ms-0 me-auto my-0">
                            <?= dropdown(7, 2, true) ?>
                        </ul>
                        <ul class="navbar-nav ms-auto me-0 my-0">
                            <?= dropdown(7, 2, true, "{$bp}-end") ?>
                        </ul>
                    </div>
                </div>
            </nav>
            <?php $nav = ob_get_clean() ?>
            <?= $nav ?>
            <?= clone_nav($nav, $bp, 'sm') ?>
            <?= ''; //clone_nav($nav, $bp, 'lg') ?>
        </header>

        <main>
            <div class="text-center w-auto mx-auto my-5">
                <div class="dropdown-center">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </div>
            </div>
            <div class="text-center w-auto mx-auto my-5">
                <div class="btn-group dropstart">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                        Dropstart
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end ">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </div>
            </div>
            <div class="text-center w-auto mx-auto my-5">
                <div class="btn-group dropend">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                        Dropend
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end ">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </div>
            </div>
        </main>

        <!--<script src="../node_modules/jquery/dist/jquery.min.js"></script>-->
        <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.js?v=5.2.0-beta1-t=<?= $t ?>"></script>
        <script src="../dist/js/p3.bs.navbar.js?t=<?= $t ?>"></script>
        <!--<script src="../dist/js/jquery.p3.bs.navbar.js?t=<?= $t ?>"></script>-->
        <script>
//            console.log(bootstrap);
//            console.log(bootstrap.BaseComponent);
//            console.log(bootstrap.util);
//            console.log(bootstrap.dom);
            P3BsNavbar('.navbar', {
//                hover: true,
                timeout: 500,
//                stopPropagation: true,
//                dispatchCustomEvents: true,
            });
//            jQuery(function($) {
//                $('.navbar').p3bsnavbar({
////                    hover: true,
//                    timeout: 500,
//                });
//            });

//            document.addEventListener('focusin', function(e) {
//               console.log(e.target);
//            });
//            console.log(
//                window.getComputedStyle(document.documentElement).getPropertyValue('--bs-breakpoint-sm')
//            );
        </script>
    </body>
</html>