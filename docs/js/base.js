"use strict";

/**
 * Base javascript for mkdocs-pine3ree-bs53-theme
 */

function getSearchTerm() {
  const params = new URLSearchParams(window.location.search);
  return params.get('q');
}
jQuery(function ($) {
  var searchTerm = getSearchTerm();
  var $searchModal = $('#modal-search');
  var $keyboardModal = $('#modal-keyboard');
  if (searchTerm) {
    $searchModal.modal('show');
  }

  // make sure search input gets autofocus every time modal opens.
  $searchModal.on('shown.bs.modal', function () {
    $searchModal.find('#mkdocs-search-query').focus();
  });

  // Close search modal when result is selected
  // The links get added later so listen to parent
  $('#mkdocs-search-results').on('click', function (e) {
    if ($(e.target).is('a')) {
      $searchModal.modal('hide');
    }
  });

  //--------------------------------------------------------------------------
  // Append "*" to visible search input value and assign to hidden input, then
  // dispatch a keyup event to trigger lunr search
  //--------------------------------------------------------------------------
  const searchInput = document.getElementById("search-query");
  const hiddenInput = document.getElementById("mkdocs-search-query");
  searchInput.addEventListener("keyup", function (e) {
    let term = e.target.value;
    if (term) {
      if (/^[^\s]+[\s]+$/.test(term)) {
        term = term.trim();
      }
    }
    if (term && false === /[\s]+/.test(term)) {
      term += '*';
    }
    if (hiddenInput.value !== term) {
      hiddenInput.value = term;
      hiddenInput.dispatchEvent(new Event('keyup'));
    }
  });
  //--------------------------------------------------------------------------
});

/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function (e) {
  e.preventDefault();
});