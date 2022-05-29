<?php
$t = time();
$rtl = 0;
?><!DOCTYPE html>
<html lang="en"<?php if($rtl): ?> dir="rtl"<?php endif ?>>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="pine3ree">

        <title>MULTILEVEL NAVBAR</title>

        <link href="../node_modules/bootstrap/dist/css/bootstrap<?php if($rtl): ?>.rtl<?php endif ?>.min.css?v=5.2.0-beta1" rel="stylesheet">
        <link href="../dist/css/p3-bs-navbar.min.css?t=<?= $t ?>" rel="stylesheet">

        <!-- Favicons -->
        <!--        <link rel="apple-touch-icon" href="/docs/5.2/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
                <link rel="icon" href="/docs/5.2/assets/img/favicons/favicon-32x32.png" sizes="32x32" type="image/png">
                <link rel="icon" href="/docs/5.2/assets/img/favicons/favicon-16x16.png" sizes="16x16" type="image/png">
                <link rel="manifest" href="/docs/5.2/assets/img/favicons/manifest.json">
                <link rel="mask-icon" href="/docs/5.2/assets/img/favicons/safari-pinned-tab.svg" color="#712cf9">
                <link rel="icon" href="/docs/5.2/assets/img/favicons/favicon.ico">-->
    </head>
    <body>
        <header>
            <nav id="navbar" class="navbar navbar-expand-md navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">MULTILEVEL NAVBAR</a>
                    <button
                        class="navbar-toggler ms-auto"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar-nav-wrapper"
                        aria-controls="#navbar-nav-wrapper"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <!--<div class="display-block display-md-none w-100 mb-3"></div>-->
                    <div id="navbar-nav-wrapper" class="collapse navbar-collapse">
                        <ul class="navbar-nav ms-0 me-auto mb-0 mt-3 mt-md-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                                <ul class="dropdown-menu dropdown-menu-start">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li class="dropdown dropstart">
                                        <a
                                            class="dropdown-item dropdown-toggle"
                                            href="#"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            >
                                            Dropdown L.2
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                            <li class="dropdown dropstart">
                                                <a
                                                    class="dropdown-item dropdown-toggle"
                                                    href="#"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    >
                                                    Dropdown L.3
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li class="dropdown dropstart">
                                                        <a
                                                            class="dropdown-item dropdown-toggle"
                                                            href="#"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                            >
                                                            Dropdown L.4
                                                        </a>
                                                        <ul class="dropdown-menu">
                                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                                            <li class="dropdown dropstart">
                                                                <a
                                                                    class="dropdown-item dropdown-toggle"
                                                                    href="#"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                    >
                                                                    Dropdown L.5
                                                                </a>
                                                                <ul class="dropdown-menu">
                                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                    <li class="dropdown dropstart">
                                                                        <a
                                                                            class="dropdown-item dropdown-toggle"
                                                                            href="#"
                                                                            data-bs-toggle="dropdown"
                                                                            aria-expanded="false"
                                                                            >
                                                                            Dropdown L.6
                                                                        </a>
                                                                        <ul class="dropdown-menu">
                                                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                            <li class="dropdown dropstart">
                                                                                <a
                                                                                    class="dropdown-item dropdown-toggle"
                                                                                    href="#"
                                                                                    data-bs-toggle="dropdown"
                                                                                    aria-expanded="false"
                                                                                    >
                                                                                    Dropdown L.7
                                                                                </a>
                                                                                <ul class="dropdown-menu">
                                                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="navbar-nav ms-auto me-0 my-0">
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link dropdown-toggle"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                    data-bs-auto-close="true"
                                    aria-expanded="false"
                                    >
                                    Dropdown L.1
                                </a>
                                <ul class="dropdown-menu dropdown-menu--end">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li class="dropdown">
                                        <a
                                            class="dropdown-item dropdown-toggle"
                                            href="#"
                                            data-bs-toggle="dropdown"
                                            data-bs-auto-close="true"
                                            aria-expanded="false"
                                            >
                                            Dropdown L.2
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                            <li class="dropdown">
                                                <a
                                                    class="dropdown-item dropdown-toggle"
                                                    href="#"
                                                    data-bs-toggle="dropdown"
                                                    data-bs-auto-close="true"
                                                    aria-expanded="false"
                                                    >
                                                    Dropdown L.3
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li class="dropdown">
                                                        <a
                                                            class="dropdown-item dropdown-toggle"
                                                            href="#"
                                                            data-bs-toggle="dropdown"
                                                            data-bs-auto-close="true"
                                                            aria-expanded="false"
                                                            >
                                                            Dropdown L.4
                                                        </a>
                                                        <ul class="dropdown-menu">
                                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                                            <li class="dropdown">
                                                                <a
                                                                    class="dropdown-item dropdown-toggle"
                                                                    href="#"
                                                                    data-bs-toggle="dropdown"
                                                                    data-bs-auto-close="true"
                                                                    aria-expanded="false"
                                                                    >
                                                                    Dropdown L.5
                                                                </a>
                                                                <ul class="dropdown-menu">
                                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                    <li class="dropdown">
                                                                        <a
                                                                            class="dropdown-item dropdown-toggle"
                                                                            href="#"
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-auto-close="true"
                                                                            aria-expanded="false"
                                                                            >
                                                                            Dropdown L.6
                                                                        </a>
                                                                        <ul class="dropdown-menu">
                                                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                            <li class="dropdown">
                                                                                <a
                                                                                    class="dropdown-item dropdown-toggle"
                                                                                    href="#"
                                                                                    data-bs-toggle="dropdown"
                                                                                    data-bs-auto-close="true"
                                                                                    aria-expanded="false"
                                                                                    >
                                                                                    Dropdown L.7
                                                                                </a>
                                                                                <ul class="dropdown-menu">
                                                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="dropdown">
                                        <a
                                            class="dropdown-item dropdown-toggle"
                                            href="#"
                                            data-bs-toggle="dropdown"
                                            data-bs-auto-close="true"
                                            aria-expanded="false"
                                            >
                                            Dropdown L.2
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                            <li class="dropdown dropstart">
                                                <a
                                                    class="dropdown-item dropdown-toggle"
                                                    href="#"
                                                    data-bs-toggle="dropdown"
                                                    data-bs-auto-close="true"
                                                    aria-expanded="false"
                                                    >
                                                    Dropdown L.3
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                    <li class="dropdown dropstart">
                                                        <a
                                                            class="dropdown-item dropdown-toggle"
                                                            href="#"
                                                            data-bs-toggle="dropdown"
                                                            data-bs-auto-close="true"
                                                            aria-expanded="false"
                                                            >
                                                            Dropdown L.4
                                                        </a>
                                                        <ul class="dropdown-menu">
                                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                                            <li class="dropdown dropstart">
                                                                <a
                                                                    class="dropdown-item dropdown-toggle"
                                                                    href="#"
                                                                    data-bs-toggle="dropdown"
                                                                    data-bs-auto-close="true"
                                                                    aria-expanded="false"
                                                                    >
                                                                    Dropdown L.5
                                                                </a>
                                                                <ul class="dropdown-menu">
                                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                    <li class="dropdown dropstart">
                                                                        <a
                                                                            class="dropdown-item dropdown-toggle"
                                                                            href="#"
                                                                            data-bs-toggle="dropdown"
                                                                            data-bs-auto-close="true"
                                                                            aria-expanded="false"
                                                                            >
                                                                            Dropdown L.6
                                                                        </a>
                                                                        <ul class="dropdown-menu">
                                                                            <li><a class="dropdown-item" href="#">Action</a></li>
                                                                            <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                            <li class="dropdown dropstart">
                                                                                <a
                                                                                    class="dropdown-item dropdown-toggle"
                                                                                    href="#"
                                                                                    data-bs-toggle="dropdown"
                                                                                    data-bs-auto-close="true"
                                                                                    aria-expanded="false"
                                                                                    >
                                                                                    Dropdown L.7
                                                                                </a>
                                                                                <ul class="dropdown-menu">
                                                                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                                                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </li>
                                                                </ul>
                                                            </li>
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
        </header>

        <main>
            <div class="text-center w-auto mx-auto my-5">
                <div class="btn-group">
                    <button type="button" class="btn btn-primary">External Dropdown</button>
                    <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
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
                    <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end ">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                    <button type="button" class="btn btn-primary">Dropstart</button>
                </div>
            </div>
            <div class="text-center w-auto mx-auto my-5">
                <div class="btn-group dropend">
                    <button type="button" class="btn btn-primary">Dropend</button>
                    <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                        <span class="visually-hidden">Toggle Dropdown</span>
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

        <script src="../node_modules/jquery/dist/jquery.min.js"></script>
        <script src="../node_modules/bootstrap/dist/js/bootstrap.bundle.js?v=5.2.0-beta1-t=<?= $t ?>"></script>
        <script src="../dist/js/p3-bs-navbar.js?t=<?= $t ?>"></script>
        <script>
            $('#navbar').p3bsnavbar({
//                hover: true,
//                timeout: 300,
            });
        </script>
    </body>
</html>