<?php

define("DROPDOWN", <<< EODD
{indent}<li class="{class_li}dropdown{dropdown_dir}">
{indent}    <a href="#"
{indent}        class="{class_a} dropdown-toggle"
{indent}        data-bs-toggle="dropdown"
{indent}        aria-expanded="false"
{indent}        >
{indent}        {title}
{indent}    </a>
{indent}    {submenu}
{indent}</li>
EODD
);

define("MENU", <<< EOM
{indent}<ul class="dropdown-menu{dropdown_menu_dir}">
{indent}    <li><a class="dropdown-item" href="#">Action</a></li>
{indent}    <li><a class="dropdown-item" href="#">Another action</a></li>
{indent}    {dropdown}
{indent}</ul>
EOM
);

define("BYP3", <<<EOP3
{indent}<span class="d-inline-block mt-1 me-1">by</span>
{indent}<a href="https://github.com/pine3ree" class="d-inline-block" target="_blank" title="pine3ree">
{indent}<img src="./img/p3-logo.png" class="img-fluid" style="width:{width};" alt="pine3ree">
{indent}</a>
EOP3
);

function byPine3ree(int $spaces, string $width = "1.75rem", bool $exclude_first_line = true) {

    $indent = str_repeat(' ', $spaces);

    $html = str_replace('{indent}', $indent, BYP3);
    $html = str_replace('{width}', $width, $html);

    if ($exclude_first_line) {
        return ltrim($html);
    }

    return $html;
}

function e($string) {
    return htmlspecialchars((string)$string, ENT_HTML5 | ENT_QUOTES | ENT_SUBSTITUTE | ENT_DISALLOWED);
}

function level(int $n) {
    return $n;
//
//    if ($n < 1)   return '';
//    if ($n < 4)   return str_repeat('i', $n);
//    if ($n === 4) return 'iv';
//    if ($n < 9)   return 'v' . str_repeat('i', $n - 5);
//    if ($n == 9)  return 'ix';
//
//    return $n;
}

function list_item(string $indent, string $type, string $title, string $href = '#') {
    if ($type === 'nav') {
        $li_attrs = " class=\"nav-item\"";
        $a_class  = "nav-link";
    } else {
        $li_attrs = "";
        $a_class  = "dropdown-item";
    }
    return  "{$indent}<li{$li_attrs}><a class=\"{$a_class}\" href=\"{$href}\">{$title}</a></li>";
}

function renderDropdownMenu(
    int $depth = 9,
    int $spaces = 0,
    string $dropdir = '',
    string $bp = null,
    int $level = null
) {

    $html = '';

    $dropdown_dir = '';
    $dropdown_menu_dir = '';
    if ($dropdir !== '') {
        $dropdown_menu_dir = " dropdown-menu-{$dropdir}";
        $dropdown_dir = $dropdir === 'start' ? " dropend" : " dropstart";
    }

    $level = max(0, (int)$level);

    if ($level > $depth) {
        return '';
    }

    $extra_links = $bp !== 'sm';
    $dropdown_toggle_title = $level === 0 ? 'Dropdown' : "Dropdown " . level($level);

    $indent = str_repeat(' ', $spaces);

    if ($level === 0) {
        $dropdown = DROPDOWN;
        $dropdown = str_replace('{indent}', $indent, $dropdown);
        $dropdown = str_replace('{class_li}', 'nav-item ', $dropdown);
        $dropdown = str_replace('{dropdown_dir}', '', $dropdown);
        $dropdown = str_replace('{class_a}', 'nav-link', $dropdown);
        $dropdown = str_replace('{title}', $dropdown_toggle_title, $dropdown);
        $dropdown = str_replace('{submenu}', renderDropdownMenu($depth, $spaces + 4, $dropdir, $bp, $level + 1), $dropdown);

        $html .= $dropdown;

        if ($dropdir === 'start' && $extra_links) {
            $html .= "\n" . list_item($indent, 'nav', 'Link');
            $html .= "\n" . list_item($indent, 'nav', 'Another link');
        }

        return $html;
    }

    $spaces_dd = $spaces + 4;
    $indent_dd = str_repeat(' ', $spaces_dd);

    if ($level < $depth) {
        $dropdown = DROPDOWN;
        $dropdown = str_replace('{indent}', $indent_dd, $dropdown);
        $dropdown = str_replace('{class_li}', '', $dropdown);
        $dropdown = str_replace('{dropdown_dir}', $dropdown_dir, $dropdown);
        $dropdown = str_replace('{class_a}', 'dropdown-item', $dropdown);
        $dropdown = str_replace('{title}', $dropdown_toggle_title, $dropdown);
        $dropdown = str_replace('{submenu}', renderDropdownMenu($depth, $spaces_dd + 4, '', $bp, $level + 1), $dropdown);
    } else {
        $dropdown = $indent_dd . '    <li><a class="dropdown-item" href="#">Stop here</a></li>';
    }
    $dropdown = ltrim($dropdown);

    $menu = MENU;
    $menu = str_replace('{indent}', $indent, $menu);
    $menu = str_replace('{dropdown_menu_dir}', $dropdown_menu_dir, $menu);
    $menu = str_replace('{dropdown_dir}', $dropdown_dir, $menu);
    $menu = str_replace('{dropdown}', $dropdown, $menu);

    $html .= ltrim($menu);

    return $html;
}


