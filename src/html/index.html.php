<?php

require __DIR__ . "/_common.php";

//------------------------------------------------------------------------------
$rtl = $rtl ?? false;

$breakpoints = $breakpoints ?? ['sm', 'md', 'lg'];

$colors = $colors ?? [
    'dark'    => 'dark',
    'light'   => 'light',
    'primary' => 'dark',
];

$nav_themes = $nav_themes ?? ['light', 'dark'];

$variants = $variants ?? [
    'flat'      => "Custom theme with flat-squared dropdown menus",
    'default'   => "Using the default bootstrap dropdown styles and using combinations of '.navbar' and '.navbar-collapse' dark/light theme",
    'inherit'   => "Same as the default variant but with collapsed navigation menus using the navbar bg-color",
    'blend'     => "Same as the default variant but with collapsed navigation menus using blending bg-color values lighter or darker at different depths",
];

$depth = $depth ?? 9;
//------------------------------------------------------------------------------

$n = 0;

$ts = round(time() / 60);

header('cache-control: no-cache');

$_rtl = $rtl ? ".rtl" : "";

?><!DOCTYPE html>
<html lang="en"<?php if($rtl): ?> dir="rtl"<?php endif ?>>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Multilevel menu for bootstrap navbars">
        <meta name="author" content="pine3ree">

        <title>pine3ree bootstrap multilevel navbar menus</title>

        <link rel="stylesheet" href="./css/bootstrap<?=$_rtl?>.min.css?v=5.3.0">
        <link href="../dist/css/pine3ree-bs-navbar<?=$_rtl?>.min.css?v=5.3.0-<?=$ts?>" rel="stylesheet">
        <link href="../dist/css/pine3ree-bs-navbar.inherit<?=$_rtl?>.min.css?v=5.3.0-<?=$ts?>" rel="stylesheet">
        <link href="../dist/css/pine3ree-bs-navbar.blend<?=$_rtl?>.min.css?v=5.3.0-<?=$ts?>" rel="stylesheet">
        <link href="../dist/css/pine3ree-bs-navbar.flat<?=$_rtl?>.min.css?v=5.3.0-<?=$ts?>" rel="stylesheet">

        <link rel="icon" href="./img/favicon.ico" type="image/png">

        <style>
            body {
                min-width: 25rem;
            }
        </style>
    </head>
    <body>
        <main class="py-5">
            <div class="container-sm">
                <header class="mb-4 text-center">
                    <h1 class="display-4">
                        <span><?= e('multilevel-menu navbar') ?></span>
                        <small class="d-block fs-3 text-body-secondary">for bootstrap</small>
                    </h1>
                    <h3 class="fs-6 fst-italic mt-3 text-body-tertiary d-flex justify-content-center align-items-center">
                        <?= byPine3ree( 6 * 4) ?>
                    </h3>
                </header>
                <div class="intro my-5 text-start">
                    <p class="description">
                        The examples that follow demonstrates the library behaviour using various combinations
                        of <code>.navbar-expand-(sm|md|lg)</code> breakpoints with<code>.navbar</code>
                        and <code>.navbar-collapse</code> themes, and <code>.bg-(dark|light|primary)</code>
                        navbar backgrounds.
                    </p>
                    <p class="description">
                        All the examples need to import, after the bootstrap css and js libraries,
                        two basic library assets: <code>pine3ree-bs-navbar.css</code> and
                        <code>pine3ree.bs.navbar.js</code> or their minified versions
                    </p>
                    <p class="description">
                        The first example uses a custom "flat" theme, provided by
                        the accordingly named asset (<code>pine3ree-bs-navbar.flat.css</code>)
                    </p>
                    <p class="description">
                        The remaining examples use mostly the default bootstrap styles, excluding a
                        little customization for the collapsed navbar loading extra css files
                    </p>
                    <p class="description">
                        All the variants are preceeded by the css files needed and the html-attributes
                        used for the <code>.navbar</code> and the <code>.navbar-collapse</code> elements.<br>
                    </p>
                    <p class="lead">
                        RESIZE your browser and/or activate the developer tools "device mode" (...refresh the page after that) to test the navbar.
                    </p>
                    <p class="text-end">
                        <a href="./simple.html" class="btn btn-outline-primary">Simple demo</a>
<?php if($rtl): ?>
                        <a href="./index.html" class="btn btn-outline-primary">LTR demos</a>
<?php else: ?>
                        <a href="./index.rtl.html" class="btn btn-outline-primary">RTL demos</a>
<?php endif ?>
                    </p>
                </div>
            </div>
<?php foreach($variants as $variant => $description): ?>
<?php $p3_bs_navbar = $variant === 'default' ? '' : " p3-bs-navbar-{$variant}" ?>
            <div class="container-sm text-center">
                <h2><?= "\"{$variant}\" variants" ?></h2>
                <p><?= e($description)?></p>
                <dl class="d-block my-2 text-body-tertiary font-monospace">
                    <dt class="text-nowrap">css files</dt>
                    <dd class="text-nowrap">
                        <span class="text-nowrap d-block"><?= "pine3ree-bs-navbar(.min).css"?></span>
<?php if ($variant !== 'default'): ?>
                        <span class="text-nowrap d-block"><?= "pine3ree-bs-navbar-{$variant}(.min).css"?></span>
<?php endif ?>
                    </dd>
                </dl>
            </div>
<?php foreach($colors as $color => $theme): ?>
<?php $bg_color = $variant === 'flat' ? '' : " bg-{$color}" ?>
<?php foreach($nav_themes as $nav_theme): ?>
<?php foreach(array_reverse($breakpoints) as $bp): ?>
<?php $n += 1 ?>
<?php $combination_id = sprintf('%02d', $n) ?>
<?php //$combination_id = trim("{$variant}-{$color}-{$theme}-{$nav_theme}", '- ') . "-{$combination_id}" ?>
            <div class="mt-4 mb-5">
                <div class="container-sm">
                    <div class="d-block my-2 text-center text-body-tertiary font-monospace small">
                        <dl>
                            <dt class="text-nowrap"><?=e("<navbar>")?></dt>
                            <dd>
                                <span class="text-nowrap"><?="navbar-expand-{$bp}"?></span>
<?php if($bg_color): ?>
                                <span class="text-nowrap"><?=$bg_color?></span>
<?php endif ?>
<?php if($p3_bs_navbar): ?>
                                <span class="text-nowrap"><?=$p3_bs_navbar?></span>
<?php endif ?>
                                <span class="text-nowrap"><?="data-bs-theme=\"{$theme}\""?></span>
                            </dd>
                        </dl>
                        <dl>
                            <dt class="text-nowrap"><?=e("<navbar-collapse>")?></dt>
                            <dd>
                                <span class="text-nowrap"><?="data-bs-theme={$nav_theme}"?></span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <nav
                    id="navbar-<?=$combination_id?>"
                    class="navbar navbar-expand-<?=$bp?><?=$bg_color?><?=$p3_bs_navbar?>"
                    data-bs-theme="<?=$theme?>"
                    >
                    <div class="container-sm">
                        <a class="navbar-brand fs-5" href="#">
                            <span class="fst-italic font-monospace">p3</span> <?="navbar-expand-{$bp}"?>

                        </a>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbar-nav-wrapper-<?=$combination_id?>"
                            aria-controls="navbar-<?=$combination_id?>"
                            aria-expanded="false"
                            aria-label="Toggle navbar-<?=$combination_id?>"
                            >
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div
                            id="navbar-nav-wrapper-<?=$combination_id?>"
                            class="collapse navbar-collapse mt-3 mt-<?=$bp?>-0"
                            data-bs-theme="<?=$nav_theme?>"
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
            </div>
<?php endforeach ?>
<?php if ($variant === 'flat') break; ?>
<?php endforeach ?>
<?php if ($variant === 'flat') break; ?>
<?php endforeach ?>
<?php endforeach ?>
        </main>
        <script src="./js/jquery.slim.min.js?v=3.7.0"></script>
        <script src="./js/bootstrap.bundle.min.js?v=5.3.0"></script>
        <script src="../dist/js/pine3ree.bs.navbar.min.js?v=5.3.0-<?=$ts?>"></script>
        <script>
            pine3ree.bs.navbar(document.querySelectorAll('.navbar'));
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