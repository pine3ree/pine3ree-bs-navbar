"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
if (!window.bootstrap || !window.bootstrap.Dropdown) {
  throw new Error('bootstrap.Dropdown library was not found');
}
var P3BsNavbar = function ($) {
  var P3_NAME = 'p3bsnavbar';
  var P3_DATA_KEY = 'p3.navbar.dropdown';
  var P3_EVENT_KEY = ".".concat(P3_DATA_KEY);
  var P3_EVENT_OPTS = {
    bubbles: true,
    cancelable: true
  };
  var P3_EVENT_CLICK = "click".concat(P3_EVENT_KEY);
  var P3_EVENT_HIDE = "hide".concat(P3_EVENT_KEY);
  var P3_EVENT_HIDDEN = "hidden".concat(P3_EVENT_KEY);
  var P3_EVENT_SHOW = "show".concat(P3_EVENT_KEY);
  var P3_EVENT_SHOWN = "shown".concat(P3_EVENT_KEY);
  var P3_EVENT_KEYDOWN = "keydown".concat(P3_EVENT_KEY);
  var P3_EVENT_KEYUP = "keyup".concat(P3_EVENT_KEY);
  var P3_DATA_TIMEOUT_ID = "timeoutID.".concat(P3_DATA_KEY);
  var BS_NAME = 'dropdown';
  var BS_DATA_KEY = 'bs.dropdown';
  var BS_EVENT_KEY = ".".concat(BS_DATA_KEY);
  var BS_DATA_API_KEY = '.data-api';
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var TAB_KEY = 'Tab';
  var ARROW_UP_KEY = 'ArrowUp';
  var ARROW_DOWN_KEY = 'ArrowDown';
  var RIGHT_MOUSE_BUTTON = 2;
  var BS_EVENT_HIDE = "hide".concat(BS_EVENT_KEY);
  var BS_EVENT_HIDDEN = "hidden".concat(BS_EVENT_KEY);
  var BS_EVENT_SHOW = "show".concat(BS_EVENT_KEY);
  var BS_EVENT_SHOWN = "shown".concat(BS_EVENT_KEY);
  var BS_EVENT_CLICK_DATA_API = "click".concat(BS_EVENT_KEY).concat(BS_DATA_API_KEY);
  var BS_EVENT_KEYDOWN_DATA_API = "keydown".concat(BS_EVENT_KEY).concat(BS_DATA_API_KEY);
  var BS_EVENT_KEYUP_DATA_API = "keyup".concat(BS_EVENT_KEY).concat(BS_DATA_API_KEY);
  var BS_CLASS_SHOW = 'show';
  var BS_CLASS_DROPUP = 'dropup';
  var BS_CLASS_DROPEND = 'dropend';
  var BS_CLASS_DROPSTART = 'dropstart';
  var BS_CLASS_DROPUP_CENTER = 'dropup-center';
  var BS_CLASS_DROPDOWN_CENTER = 'dropdown-center';
  var BS_SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  var BS_SELECTOR_DATA_TOGGLE_SHOWN = "".concat(BS_SELECTOR_DATA_TOGGLE, ".").concat(BS_CLASS_SHOW);
  var BS_SELECTOR_DROPDOWN = '.dropdown';
  var BS_SELECTOR_DROPDOWN_SHOWN = "".concat(BS_SELECTOR_DROPDOWN, ".").concat(BS_CLASS_SHOW);
  var BS_CLASS_DROPDOWN_ITEM = 'dropdown-item';
  var BS_CLASS_MENU = 'dropdown-menu';
  var BS_SELECTOR_MENU = ".".concat(BS_CLASS_MENU);
  var BS_SELECTOR_MENU_SHOWN = "".concat(BS_SELECTOR_MENU, ".").concat(BS_CLASS_SHOW);
  var BS_CLASS_NAVBAR = 'navbar';
  var BS_SELECTOR_NAVBAR = ".".concat(BS_CLASS_NAVBAR);
  var BS_CLASS_MENU_END = "".concat(BS_CLASS_MENU, "-end");
  var BS_SELECTOR_MENU_END = "".concat(BS_SELECTOR_MENU, ".").concat(BS_CLASS_MENU_END);
  var BS_SELECTOR_NAVBAR_NAV = '.navbar-nav';
  var BS_SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .".concat(BS_CLASS_DROPDOWN_ITEM, ":not(.disabled):not(:disabled)");
  var P3_SELECTOR_VISIBLE_ITEMS = ".".concat(BS_CLASS_DROPDOWN_ITEM, ":not(.disabled):not(:disabled)");
  var menuEndRegex = new RegExp("".concat(BS_CLASS_MENU, "(?:-[a-z]{2,3})?-end"));
  var isRTL = document.documentElement.dir === 'rtl';
  var isTouchDevice = ('ontouchstart' in window);
  var Dropdown = bootstrap.Dropdown;
  function getClientWidth() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }
  function getSiblings(element) {
    var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';
    var siblings = [];
    if (element instanceof HTMLElement) {
      var parent = element.parentElement;
      if (parent instanceof HTMLElement) {
        parent.querySelectorAll(":scope > ".concat(selector)).forEach(function (child) {
          if (child !== element && child instanceof HTMLElement) {
            siblings.push(child);
          }
        });
      }
    }
    return siblings;
  }
  function isEnabledToggle(toggle) {
    if (toggle && toggle instanceof HTMLElement) {
      return toggle.getAttribute('data-bs-toggle') === "dropdown" && !toggle.disabled && !toggle.classList.contains('disabled');
    }
    return false;
  }
  function handleShownEvent(e, breakpoint, closeOthers) {
    var stopPropagation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var target = e.relatedTarget || e.target;
    if (!isEnabledToggle(target)) {
      return;
    }
    if (stopPropagation) {
      e.stopPropagation();
    }
    var dropdown = target.closest(BS_SELECTOR_DROPDOWN);
    if (dropdown instanceof HTMLElement) {
      var clientWidth = getClientWidth();
      dropdown.classList.add(BS_CLASS_SHOW);
      setChildrenDropDirection(dropdown, clientWidth, breakpoint);
      if (closeOthers || clientWidth >= breakpoint) {
        closeOtherNavs(dropdown);
        closeSiblingDropdowns(dropdown);
      }
    }
    target.dispatchEvent(new Event(P3_EVENT_SHOWN, P3_EVENT_OPTS));
  }
  function handleHiddenEvent(e) {
    var stopPropagation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var dispatchCustomEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var target = e.relatedTarget || e.target;
    if (!isEnabledToggle(target)) {
      return;
    }
    if (stopPropagation) {
      e.stopPropagation();
    }
    var dropdown = target.parentElement.closest(BS_SELECTOR_DROPDOWN);
    if (dropdown instanceof HTMLElement) {
      dropdown.classList.remove(BS_CLASS_SHOW);
      closeInnerDropdowns(dropdown);
    }
    if (dispatchCustomEvent) {
      target.dispatchEvent(new Event(P3_EVENT_HIDDEN, P3_EVENT_OPTS));
    }
  }
  function handleClickDataApiEvent(e, hover, timeout) {
    var dispatchCustomEvent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var target = e.relatedTarget || e.target;
    if (!isEnabledToggle(target)) {
      return;
    }
    e.stopPropagation();
    if (hover && timeout > 0) {
      var timeoutID = target.getAttribute("data-".concat(P3_DATA_TIMEOUT_ID));
      if (timeoutID > 0) {
        clearTimeout(timeoutID);
      }
    }
    if (dispatchCustomEvent) {
      target.dispatchEvent(new MouseEvent(P3_EVENT_CLICK, e));
    }
  }
  function closeExternalDropdowns(navbar) {
    if (!(navbar instanceof HTMLElement)) {
      return;
    }
    document.querySelectorAll(BS_SELECTOR_DATA_TOGGLE_SHOWN).forEach(function (toggleElement) {
      if (!navbar.contains(toggleElement)) {
        var toggle = Dropdown.getOrCreateInstance(toggleElement);
        if (toggle instanceof Dropdown) {
          toggle.hide();
        }
      }
    });
  }
  function closeInnerDropdowns(container, event) {
    var stopPropagation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var containers = [];
    if (container instanceof Array || container instanceof NodeList) {
      container.forEach(function (c) {
        if (c instanceof HTMLElement) {
          containers.push(c);
        }
      });
    } else if (container instanceof HTMLElement) {
      containers.push(container);
    }
    if (containers.length > 0) {
      containers.forEach(function (container) {
        container.querySelectorAll(BS_SELECTOR_DATA_TOGGLE_SHOWN).forEach(function (toggleElement) {
          var toggle = Dropdown.getOrCreateInstance(toggleElement);
          if (toggle instanceof Dropdown) {
            toggle.hide();
          }
        });
      });
    }
    if (event instanceof Event && stopPropagation === true) {
      event.stopPropagation();
    }
  }
  function closeSiblingDropdowns(dropdown, event) {
    var stopPropagation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    getSiblings(dropdown, BS_SELECTOR_DROPDOWN).forEach(function (sibling) {
      var toggleElement = sibling.querySelector(BS_SELECTOR_DATA_TOGGLE_SHOWN);
      if (toggleElement) {
        var toggle = Dropdown.getOrCreateInstance(toggleElement);
        if (toggle instanceof Dropdown) {
          toggle.hide();
        }
      }
    });
  }
  function closeOtherNavs(dropdown, event) {
    var stopPropagation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var otherNavs = document.querySelectorAll("".concat(BS_SELECTOR_NAVBAR, " ").concat(BS_SELECTOR_NAVBAR_NAV));
    var currentNav = dropdown.parentElement.closest(BS_SELECTOR_NAVBAR_NAV);
    otherNavs.forEach(function (otherNav) {
      if (otherNav !== currentNav) {
        closeInnerDropdowns(otherNav, event, stopPropagation);
      }
    });
  }
  function setChildrenDropDirection(dropdown, clientWidth, breakpoint) {
    var menu = dropdown.querySelector(":scope > ".concat(BS_SELECTOR_MENU));
    if (!(menu instanceof HTMLElement)) {
      return;
    }
    if (clientWidth < breakpoint) {
      menu.querySelectorAll(BS_SELECTOR_DROPDOWN).forEach(function (child) {
        child.classList.remove(BS_CLASS_DROPEND);
        child.classList.remove(BS_CLASS_DROPSTART);
      });
      return;
    }
    var left = menu.getBoundingClientRect().left;
    var right = left + menu.offsetWidth;
    var parentMenu;
    var isDropStart = dropdown.classList.contains(BS_CLASS_DROPSTART) || !dropdown.classList.contains(BS_CLASS_DROPEND) && (parentMenu = dropdown.closest(BS_SELECTOR_MENU)) && menuEndRegex.test(parentMenu.className);
    menu.querySelectorAll(":scope > ".concat(BS_SELECTOR_DROPDOWN)).forEach(function (menuItem) {
      var submenu = menuItem.querySelector(":scope > ".concat(BS_SELECTOR_MENU));
      submenu.style.visibility = 'hidden';
      submenu.classList.add(BS_CLASS_SHOW);
      var subwidth = submenu.offsetWidth;
      submenu.classList.remove(BS_CLASS_SHOW);
      submenu.style.visibility = null;
      var classList = menuItem.classList;
      if (isRTL) {
        if (isDropStart) {
          if (right + subwidth > clientWidth) {
            classList.remove(BS_CLASS_DROPSTART);
            classList.add(BS_CLASS_DROPEND);
          } else {
            classList.remove(BS_CLASS_DROPEND);
            classList.add(BS_CLASS_DROPSTART);
          }
        } else {
          if (left - subwidth < 0) {
            classList.remove(BS_CLASS_DROPEND);
            classList.add(BS_CLASS_DROPSTART);
          } else {
            classList.remove(BS_CLASS_DROPSTART);
            classList.add(BS_CLASS_DROPEND);
          }
        }
      } else {
        if (isDropStart) {
          if (left - subwidth < 0) {
            classList.remove(BS_CLASS_DROPSTART);
            classList.add(BS_CLASS_DROPEND);
          } else {
            classList.remove(BS_CLASS_DROPEND);
            classList.add(BS_CLASS_DROPSTART);
          }
        } else {
          if (right + subwidth > clientWidth) {
            classList.remove(BS_CLASS_DROPEND);
            classList.add(BS_CLASS_DROPSTART);
          } else {
            classList.remove(BS_CLASS_DROPSTART);
            classList.add(BS_CLASS_DROPEND);
          }
        }
      }
    });
  }
  function handleBreakpointCrossing(navbar, breakpoint, previousWidth) {
    var currentWidth = getClientWidth();
    if (previousWidth < breakpoint && currentWidth >= breakpoint) {
      closeInnerDropdowns(navbar);
    } else if (previousWidth >= breakpoint && currentWidth < breakpoint) {
      closeInnerDropdowns(navbar);
      navbar.querySelectorAll(".".concat(BS_CLASS_DROPEND, ", .").concat(BS_CLASS_DROPEND)).forEach(function (menuItem) {
        menuItem.classList.remove(BS_CLASS_DROPSTART);
        menuItem.classList.remove(BS_CLASS_DROPEND);
      });
    }
    return currentWidth;
  }
  function getNextElement(list, element, shouldGetNext, cycle) {
    var listLength = list.length;
    var index = list.indexOf(element);
    if (index === -1) {
      return list[0];
    }
    index += shouldGetNext ? 1 : -1;
    if (cycle) {
      index = (index + listLength) % listLength;
    }
    return list[Math.max(0, Math.min(index, listLength - 1))];
  }
  function handleKeydown(e, navbar, dispatchCustomEvent) {
    if (!e.key || e.key === ESCAPE_KEY || e.key === TAB_KEY) {
      return;
    }
    var isValidKeyEvent = [ENTER_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(e.key);
    if (!isValidKeyEvent) {
      return;
    }
    var target = e.target;
    if (!target || !target.classList.contains(BS_CLASS_DROPDOWN_ITEM)) {
      return;
    }
    if (navbar instanceof HTMLElement && !navbar.contains(target)) {
      return;
    }
    e.stopPropagation();
    if (e.key === ENTER_KEY) {
      if (target.matches(BS_SELECTOR_DATA_TOGGLE)) {
        e.preventDefault();
        target.click();
        var subItem = target.parentElement.querySelector(":scope ".concat(BS_SELECTOR_VISIBLE_ITEMS));
        if (subItem) {
          subItem.focus();
        }
      }
    } else {
      var menu;
      menu = target.closest(BS_SELECTOR_MENU);
      if (menu instanceof HTMLElement) {
        var items = [].concat(...menu.querySelectorAll(":scope > li > ".concat(P3_SELECTOR_VISIBLE_ITEMS)));
        var isNavKeyEvent = e.key === ARROW_DOWN_KEY || e.key === ARROW_UP_KEY;
        if (isNavKeyEvent) {
          var nextItem = getNextElement(items, target, e.key !== ARROW_UP_KEY, true);
          if (nextItem) {
            nextItem.focus();
            closeSiblingDropdowns(nextItem.parentElement);
          }
        }
      }
    }
    if (dispatchCustomEvent) {
      target.dispatchEvent(new KeyboardEvent(P3_EVENT_KEYDOWN, e));
    }
  }
  function activateHover(navbar, breakpoint, timeout) {
    var dropdowns = navbar.querySelectorAll(BS_SELECTOR_DROPDOWN);
    dropdowns.forEach(function (menuItem) {
      menuItem.addEventListener('mouseenter', function (e) {
        handleMouseEnter(this, breakpoint, timeout);
      });
      menuItem.addEventListener('mouseleave', function (e) {
        handleMouseLeave(this, breakpoint, timeout);
      });
    });
  }
  function handleMouseEnter(menuItem, breakpoint, timeout) {
    if (getClientWidth() < breakpoint) {
      return;
    }
    var toggleElement = menuItem.querySelector(BS_SELECTOR_DATA_TOGGLE);
    if (toggleElement instanceof HTMLElement) {
      if (timeout > 0) {
        var timeoutID = toggleElement.getAttribute("data-".concat(P3_DATA_TIMEOUT_ID));
        if (timeoutID > 0) {
          clearTimeout(timeoutID);
        }
      }
      if (!toggleElement.classList.contains(BS_CLASS_SHOW)) {
        var toggle = Dropdown.getOrCreateInstance(toggleElement);
        if (toggle instanceof Dropdown) {
          toggle.show();
        }
      }
    }
  }
  function handleMouseLeave(menuItem, breakpoint, timeout) {
    if (getClientWidth() < breakpoint) {
      return;
    }
    var toggleElement = menuItem.querySelector(BS_SELECTOR_DATA_TOGGLE);
    if (toggleElement instanceof HTMLElement) {
      if (toggleElement.classList.contains(BS_CLASS_SHOW) && timeout > 0) {
        var timeoutID = toggleElement.getAttribute("data-".concat(P3_DATA_TIMEOUT_ID));
        if (timeoutID > 0) {
          clearTimeout(timeoutID);
        }
      }
      toggleElement.setAttribute("data-".concat(P3_DATA_TIMEOUT_ID), setTimeout(function () {
        if (toggleElement.classList.contains(BS_CLASS_SHOW)) {
          var toggle = Dropdown.getOrCreateInstance(toggleElement);
          if (toggle instanceof Dropdown) {
            toggle.hide();
          }
        }
      }, timeout));
    }
  }
  function getNavbarBreakpoint(navbar) {
    var _iterator = _createForOfIteratorHelper(navbar.classList),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var nc = _step.value;
        var rootStyle = window.getComputedStyle(document.documentElement);
        var breakpoint = parseInt(rootStyle.getPropertyValue("--p3-bs-".concat(nc)));
        if (Number.isInteger(breakpoint)) {
          return breakpoint;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return null;
  }
  var P3BsNavbar = function P3BsNavbar(selector, options) {
    var OPTIONS = Object.assign({}, P3BsNavbar.defaults, options);
    var navbars = [];
    if (typeof selector === 'string') {
      navbars = document.querySelectorAll(selector);
    } else if (selector instanceof HTMLElement) {
      navbars = [selector];
    } else if (selector instanceof Array || selector instanceof NodeList) {
      selector.forEach(function (element) {
        if (element instanceof HTMLElement) {
          navbars.push(element);
        }
      });
    }
    navbars.forEach(function (navbar) {
      var OPT = Object.assign({}, OPTIONS);
      var breakpoint = getNavbarBreakpoint(navbar);
      if (breakpoint > 0) {
        OPT.breakpoint = breakpoint;
      }
      if (OPT.customEvents) {
        navbar.addEventListener(BS_EVENT_SHOW, function (e) {
          var target = e.relatedTarget || e.target;
          target.dispatchEvent(new Event(P3_EVENT_SHOW, P3_EVENT_OPTS));
        });
        navbar.addEventListener(BS_EVENT_HIDE, function (e) {
          var target = e.relatedTarget || e.target;
          target.dispatchEvent(new Event(P3_EVENT_HIDE, P3_EVENT_OPTS));
        });
      }
      navbar.addEventListener(BS_EVENT_SHOWN, function (e) {
        handleShownEvent(e, OPT.breakpoint, OPT.closeOthers, OPT.stopPropagation);
      });
      navbar.addEventListener(BS_EVENT_HIDDEN, function (e) {
        handleHiddenEvent(e, OPT.stopPropagation, OPT.customEvents);
      });
      navbar.addEventListener('click', function (e) {
        handleClickDataApiEvent(e, OPT.hover, OPT.timeout, OPT.customEvents);
      });
      document.addEventListener('keydown', function (e) {
        handleKeydown(e, navbar, OPT.customEvents);
      }, true);
      var previousWidth = getClientWidth();
      window.addEventListener('resize', function (e) {
        previousWidth = handleBreakpointCrossing(navbar, breakpoint, previousWidth);
      });
      if (OPT.hover && !isTouchDevice) {
        activateHover(navbar, OPT.breakpoint, OPT.timeout);
      }
      navbar.addEventListener(P3_EVENT_SHOWN, function (e) {
        closeExternalDropdowns(navbar);
        if (OPT.stopPropagation) {
          e.stopPropagation();
        }
      });
    });
  };
  P3BsNavbar.defaults = {
    breakpoint: 768,
    hover: false,
    timeout: 250,
    closeOthers: false,
    stopPropagation: false,
    customEvents: false
  };
  if (typeof $ === 'function' && $().fn === $.jquery) {
    $.fn.p3bsnavbar = function (options) {
      var opts = $.extend($.fn.p3bsnavbar.defaults, options);
      P3BsNavbar(this.get(), opts);
    };
    $.fn.p3bsnavbar.defaults = P3BsNavbar.defaults;
  }
  return P3BsNavbar;
}(window.jQuery || null);