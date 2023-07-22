"use strict";

/* 
 * @author pine3ree https://github.com/pine3ree
 */

// docs navbar
$('#navbar').p3bsNavbar({
  // options here
});

// Activate nested menus for all examples
$('.navbar.navbar-example').p3bsNavbar();
document.querySelectorAll('.navbar a[href="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
  });
});
document.querySelectorAll('button[data-copy-target]').forEach(function (button) {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const target_attr_id = button.getAttribute('data-copy-target');
    const target = document.getElementById(target_attr_id);
    if (target) {
      navigator.clipboard.writeText(target.innerHTML);
    }
  });
});