/*!
 * @package pine3ree-bs-navbar (https://github.com/pine3ree/pine3ree-bs-navbar/)
 * @description A multilevel-menu navbar for bootstrap 5.3.x
 * @author pine3ree https://github.com/pine3ree
 * @copyright Copyright 2023-today pine3ree
 * @license Licensed under BSD-3 Clear License (https://github.com/pine3ree/pine3ree-bs-navbar/blob/master/LICENSE)
 */


'use strict';

if (!window.bootstrap || !window.bootstrap.Dropdown) {
  throw new Error('bootstrap.Dropdown library was not found');
}
(function (bootstrap, $) {
  const P3_NAME = 'p3bsNavbar';
  const P3_DATA_KEY = 'p3.navbar.dropdown';
  const P3_EVENT_KEY = ".".concat(P3_DATA_KEY);
  const P3_EVENT_OPTS = {
    bubbles: true,
    cancelable: true
  };
  const P3_EVENT_CLICK = "click".concat(P3_EVENT_KEY);
  const P3_EVENT_HIDE = "hide".concat(P3_EVENT_KEY);
  const P3_EVENT_HIDDEN = "hidden".concat(P3_EVENT_KEY);
  const P3_EVENT_SHOW = "show".concat(P3_EVENT_KEY);
  const P3_EVENT_SHOWN = "shown".concat(P3_EVENT_KEY);
  const P3_EVENT_KEYDOWN = "keydown".concat(P3_EVENT_KEY);
  const P3_EVENT_KEYUP = "keyup".concat(P3_EVENT_KEY);
  const P3_DATA_TIMEOUT_ID = "timeoutID.".concat(P3_DATA_KEY);
  const BS_NAME = 'dropdown';
  const BS_DATA_KEY = 'bs.dropdown';
  const BS_EVENT_KEY = ".".concat(BS_DATA_KEY);
  const BS_DATA_API_KEY = '.data-api';
  const ENTER_KEY = 'Enter';
  const ESCAPE_KEY = 'Escape';
  const TAB_KEY = 'Tab';
  const ARROW_UP_KEY = 'ArrowUp';
  const ARROW_DOWN_KEY = 'ArrowDown';
  const RIGHT_MOUSE_BUTTON = 2; 

  const BS_EVENT_HIDE = "hide".concat(BS_EVENT_KEY);
  const BS_EVENT_HIDDEN = "hidden".concat(BS_EVENT_KEY);
  const BS_EVENT_SHOW = "show".concat(BS_EVENT_KEY);
  const BS_EVENT_SHOWN = "shown".concat(BS_EVENT_KEY);
  const BS_EVENT_CLICK_DATA_API = "click".concat(BS_EVENT_KEY).concat(BS_DATA_API_KEY);
  const BS_EVENT_KEYDOWN_DATA_API = "keydown".concat(BS_EVENT_KEY).concat(BS_DATA_API_KEY);
  const BS_EVENT_KEYUP_DATA_API = "keyup".concat(BS_EVENT_KEY).concat(BS_DATA_API_KEY);
  const BS_CLASS_SHOW = 'show';
  const BS_CLASS_DROPUP = 'dropup';
  const BS_CLASS_DROPEND = 'dropend';
  const BS_CLASS_DROPSTART = 'dropstart';
  const BS_CLASS_DROPUP_CENTER = 'dropup-center';
  const BS_CLASS_DROPDOWN_CENTER = 'dropdown-center';
  const BS_SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
  const BS_SELECTOR_DATA_TOGGLE_SHOWN = "".concat(BS_SELECTOR_DATA_TOGGLE, ".").concat(BS_CLASS_SHOW);
  const BS_SELECTOR_DROPDOWN = '.dropdown';
  const BS_SELECTOR_DROPDOWN_SHOWN = "".concat(BS_SELECTOR_DROPDOWN, ".").concat(BS_CLASS_SHOW);
  const BS_CLASS_DROPDOWN_ITEM = 'dropdown-item';
  const BS_CLASS_MENU = 'dropdown-menu';
  const BS_SELECTOR_MENU = ".".concat(BS_CLASS_MENU);
  const BS_SELECTOR_MENU_SHOWN = "".concat(BS_SELECTOR_MENU, ".").concat(BS_CLASS_SHOW);
  const BS_CLASS_NAVBAR = 'navbar';
  const BS_SELECTOR_NAVBAR = ".".concat(BS_CLASS_NAVBAR);
  const BS_CLASS_MENU_END = "".concat(BS_CLASS_MENU, "-end");
  const BS_SELECTOR_MENU_END = "".concat(BS_SELECTOR_MENU, ".").concat(BS_CLASS_MENU_END);
  const BS_SELECTOR_NAVBAR_NAV = '.navbar-nav';
  const BS_SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .".concat(BS_CLASS_DROPDOWN_ITEM, ":not(.disabled):not(:disabled)");
  const P3_SELECTOR_VISIBLE_ITEMS = ".".concat(BS_CLASS_DROPDOWN_ITEM, ":not(.disabled):not(:disabled)");

  const menuEndRegex = new RegExp("".concat(BS_CLASS_MENU, "(?:-[a-z]{2,3})?-end"));
  const isRTL = document.documentElement.dir === 'rtl';
  const isTouchDevice = ('ontouchstart' in window);
  const BsDropdown = bootstrap.Dropdown;

  function getClientWidth() {
    return Math.max(window.innerWidth, document.documentElement.clientWidth);
  }

  function getSiblings(element) {
    let selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';
    const siblings = [];
    if (element instanceof HTMLElement) {
      const parent = element.parentElement;
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
      return toggle.getAttribute('data-bs-toggle') === 'dropdown' && !toggle.disabled && !toggle.classList.contains('disabled');
    }
    return false;
  }

  function handleShownEvent(e, breakpoint, closeOthers) {
    let stopPropagation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const target = e.relatedTarget || e.target;
    if (!isEnabledToggle(target)) {
      return;
    }

    if (stopPropagation) {
      e.stopPropagation();
    }
    const dropdown = target.closest(BS_SELECTOR_DROPDOWN);
    if (dropdown instanceof HTMLElement) {
      const clientWidth = getClientWidth();
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
    let stopPropagation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    let dispatchCustomEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const target = e.relatedTarget || e.target;
    if (!isEnabledToggle(target)) {
      return;
    }

    if (stopPropagation) {
      e.stopPropagation();
    }
    const dropdown = target.parentElement.closest(BS_SELECTOR_DROPDOWN);
    if (dropdown instanceof HTMLElement) {
      dropdown.classList.remove(BS_CLASS_SHOW);
      closeInnerDropdowns(dropdown);
    }

    if (dispatchCustomEvent) {
      target.dispatchEvent(new Event(P3_EVENT_HIDDEN, P3_EVENT_OPTS));
    }
  }

  function handleClickDataApiEvent(e, hover, timeout) {
    let dispatchCustomEvent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    const target = e.relatedTarget || e.target;
    if (!isEnabledToggle(target)) {
      return;
    }

    e.stopPropagation();

    if (hover && timeout > 0) {
      const timeoutID = target.getAttribute("data-".concat(P3_DATA_TIMEOUT_ID));
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
        const toggle = BsDropdown.getOrCreateInstance(toggleElement);
        if (toggle instanceof BsDropdown) {
          toggle.hide();
        }
      }
    });
  }

  function closeInnerDropdowns(container, event) {
    let stopPropagation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const containers = [];
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
          const toggle = BsDropdown.getOrCreateInstance(toggleElement);
          if (toggle instanceof BsDropdown) {
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
    let stopPropagation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    getSiblings(dropdown, BS_SELECTOR_DROPDOWN).forEach(function (sibling) {
      const toggleElement = sibling.querySelector(BS_SELECTOR_DATA_TOGGLE_SHOWN);
      if (toggleElement) {
        const toggle = BsDropdown.getOrCreateInstance(toggleElement);
        if (toggle instanceof BsDropdown) {
          toggle.hide();
        }
      }
    });
  }

  function closeOtherNavs(dropdown, event) {
    let stopPropagation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const otherNavs = document.querySelectorAll("".concat(BS_SELECTOR_NAVBAR, " ").concat(BS_SELECTOR_NAVBAR_NAV));
    const currentNav = dropdown.parentElement.closest(BS_SELECTOR_NAVBAR_NAV);
    otherNavs.forEach(function (otherNav) {
      if (otherNav !== currentNav) {
        closeInnerDropdowns(otherNav, event, stopPropagation);
      }
    });
  }

  function setChildrenDropDirection(dropdown, clientWidth, breakpoint) {
    const menu = dropdown.querySelector(":scope > ".concat(BS_SELECTOR_MENU));
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
    const left = menu.getBoundingClientRect().left;
    const right = left + menu.offsetWidth;
    const isDropStart = dropdown.classList.contains(BS_CLASS_DROPSTART) || !dropdown.classList.contains(BS_CLASS_DROPEND) && menuEndRegex.test(menu.className);
    menu.querySelectorAll(":scope > ".concat(BS_SELECTOR_DROPDOWN)).forEach(function (menuItem) {
      const submenu = menuItem.querySelector(":scope > ".concat(BS_SELECTOR_MENU));
      if (!submenu) {
        return;
      }
      submenu.style.visibility = 'hidden';
      submenu.classList.add(BS_CLASS_SHOW);
      const subwidth = submenu.offsetWidth;
      submenu.classList.remove(BS_CLASS_SHOW);
      submenu.style.visibility = null;
      const classList = menuItem.classList;
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
    const currentWidth = getClientWidth();
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
    const listLength = list.length;
    let index = list.indexOf(element);
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

    const isValidKeyEvent = [ENTER_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(e.key);
    if (!isValidKeyEvent) {
      return;
    }
    const target = e.target;
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
        const subItem = target.parentElement.querySelector(":scope ".concat(BS_SELECTOR_VISIBLE_ITEMS));
        if (subItem) {
          subItem.focus();
        }
      }
    } else {
      const menu = target.closest(BS_SELECTOR_MENU);
      if (menu instanceof HTMLElement) {
        const items = [].concat(...menu.querySelectorAll(":scope > li > ".concat(P3_SELECTOR_VISIBLE_ITEMS)));
        const isNavKeyEvent = e.key === ARROW_DOWN_KEY || e.key === ARROW_UP_KEY;
        if (isNavKeyEvent) {
          const nextItem = getNextElement(items, target, e.key !== ARROW_UP_KEY, true);
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
    const dropdowns = navbar.querySelectorAll(BS_SELECTOR_DROPDOWN);
    dropdowns.forEach(function (menuItem) {
      menuItem.addEventListener('mouseenter', function (e) {
        handleMouseEnter(menuItem, breakpoint, timeout);
      });
      menuItem.addEventListener('mouseleave', function (e) {
        handleMouseLeave(menuItem, breakpoint, timeout);
      });
    });
  }

  function handleMouseEnter(menuItem, breakpoint, timeout) {
    if (getClientWidth() < breakpoint) {
      return;
    }
    const toggleElement = menuItem.querySelector(BS_SELECTOR_DATA_TOGGLE);
    if (toggleElement instanceof HTMLElement) {
      if (timeout > 0) {
        const timeoutID = toggleElement.getAttribute("data-".concat(P3_DATA_TIMEOUT_ID));
        if (timeoutID > 0) {
          clearTimeout(timeoutID);
        }
      }
      if (!toggleElement.classList.contains(BS_CLASS_SHOW)) {
        const toggle = BsDropdown.getOrCreateInstance(toggleElement);
        if (toggle instanceof BsDropdown) {
          toggle.show();
        }
      }
    }
  }

  function handleMouseLeave(menuItem, breakpoint, timeout) {
    if (getClientWidth() < breakpoint) {
      return;
    }
    const toggleElement = menuItem.querySelector(BS_SELECTOR_DATA_TOGGLE);
    if (toggleElement instanceof HTMLElement) {
      if (toggleElement.classList.contains(BS_CLASS_SHOW) && timeout > 0) {
        const timeoutID = toggleElement.getAttribute("data-".concat(P3_DATA_TIMEOUT_ID));
        if (timeoutID > 0) {
          clearTimeout(timeoutID);
        }
      }
      toggleElement.setAttribute("data-".concat(P3_DATA_TIMEOUT_ID), setTimeout(function () {
        if (toggleElement.classList.contains(BS_CLASS_SHOW)) {
          const toggle = BsDropdown.getOrCreateInstance(toggleElement);
          if (toggle instanceof BsDropdown) {
            toggle.hide();
          }
        }
      }, timeout));
    }
  }

  function getExpandBreakpoint(navbar) {
    for (const nc of navbar.classList) {
      const rootStyle = window.getComputedStyle(document.documentElement);
      const breakpoint = parseInt(rootStyle.getPropertyValue("--p3-bs-".concat(nc)));
      if (Number.isInteger(breakpoint)) {
        return breakpoint;
      }
    }
    return null;
  }

  const p3bsNavbar = function (selector, options) {
    const OPTIONS = Object.assign({}, p3bsNavbar.defaults, options);
    let navbars = [];
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
      const OPT = Object.assign({}, OPTIONS);

      const breakpoint = getExpandBreakpoint(navbar);
      if (breakpoint > 0) {
        OPT.breakpoint = breakpoint;
      }
      if (OPT.customEvents) {
        navbar.addEventListener(BS_EVENT_SHOW, function (e) {
          const target = e.relatedTarget || e.target;
          target.dispatchEvent(new Event(P3_EVENT_SHOW, P3_EVENT_OPTS));
        });

        navbar.addEventListener(BS_EVENT_HIDE, function (e) {
          const target = e.relatedTarget || e.target;
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

      let previousWidth = getClientWidth();
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

  p3bsNavbar.defaults = {
    breakpoint: 768,
    hover: false,
    timeout: 250,
    closeOthers: false,
    stopPropagation: false,
    customEvents: false
  };

  window.pine3ree = window.pine3ree || {};
  window.pine3ree.bs = window.pine3ree.bs || {};

  window.pine3ree.bs.navbar = p3bsNavbar;
  window.p3bsNavbar = p3bsNavbar;

  if (typeof $ === 'function' && $().fn === $.jquery) {
    $.fn.p3bsNavbar = function (options) {
      const opts = $.extend($.fn.p3bsNavbar.defaults, options);
      p3bsNavbar(this.get(), opts);
    };
    $.fn.p3bsNavbar.defaults = p3bsNavbar.defaults;
  }
})(window.bootstrap, window.jQuery);
//# sourceMappingURL=pine3ree.bs.navbar.js.map
