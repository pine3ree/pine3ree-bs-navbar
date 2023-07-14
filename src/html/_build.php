<?php

$__dir = __DIR__;
$__html = "{$__dir}/../../html";

$names = [
    'index',
    'index.rtl',
    'simple',
];

foreach ($names as $name) {
    system("env php {$__dir}/{$name}.html.php > {$__html}/{$name}.html");
}

