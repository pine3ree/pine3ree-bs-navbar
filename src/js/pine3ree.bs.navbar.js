/*!
 * @package pine3ree-bs-navbar A multilevel-menu navbar for bootstrap 5.3.x (https://github.com/pine3ree/pine3ree-bs-navbar/)
 * @author pine3ree https://github.com/pine3ree
 * @copyright Copyright 2023-today pine3ree
 * @license Licensed under BSD-3 Clear License (https://github.com/pine3ree/pine3ree-bs-navbar/blob/master/LICENSE)
 */

/* jslint browser:true */
/* global document, window */

'use strict';

// Check bootstrap library
if (!window.bootstrap || !window.bootstrap.Dropdown) {
    throw new Error('bootstrap.Dropdown library was not found');
}

(function(bootstrap, $) {

    const P3_NAME = 'p3bsNavbar';

    const P3_DATA_KEY = 'p3.navbar.dropdown';
    const P3_EVENT_KEY = `.${P3_DATA_KEY}`;
    const P3_EVENT_OPTS = { bubbles: true, cancelable: true };
    const P3_EVENT_CLICK = `click${P3_EVENT_KEY}`;
    const P3_EVENT_HIDE = `hide${P3_EVENT_KEY}`;
    const P3_EVENT_HIDDEN = `hidden${P3_EVENT_KEY}`;
    const P3_EVENT_SHOW = `show${P3_EVENT_KEY}`;
    const P3_EVENT_SHOWN = `shown${P3_EVENT_KEY}`;
    const P3_EVENT_KEYDOWN = `keydown${P3_EVENT_KEY}`;
    const P3_EVENT_KEYUP = `keyup${P3_EVENT_KEY}`;
    const P3_DATA_TIMEOUT_ID = `timeoutID.${P3_DATA_KEY}`;

    const BS_NAME = 'dropdown';
    const BS_DATA_KEY = 'bs.dropdown';
    const BS_EVENT_KEY = `.${BS_DATA_KEY}`;
    const BS_DATA_API_KEY = '.data-api';

    const ENTER_KEY = 'Enter';
    const ESCAPE_KEY = 'Escape';
    const TAB_KEY = 'Tab';
    const ARROW_UP_KEY = 'ArrowUp';
    const ARROW_DOWN_KEY = 'ArrowDown';
    const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

    const BS_EVENT_HIDE = `hide${BS_EVENT_KEY}`;
    const BS_EVENT_HIDDEN = `hidden${BS_EVENT_KEY}`;
    const BS_EVENT_SHOW = `show${BS_EVENT_KEY}`;
    const BS_EVENT_SHOWN = `shown${BS_EVENT_KEY}`;
    const BS_EVENT_CLICK_DATA_API = `click${BS_EVENT_KEY}${BS_DATA_API_KEY}`;
    const BS_EVENT_KEYDOWN_DATA_API = `keydown${BS_EVENT_KEY}${BS_DATA_API_KEY}`;
    const BS_EVENT_KEYUP_DATA_API = `keyup${BS_EVENT_KEY}${BS_DATA_API_KEY}`;

    const BS_CLASS_SHOW = 'show';
    const BS_CLASS_DROPUP = 'dropup';
    const BS_CLASS_DROPEND = 'dropend';
    const BS_CLASS_DROPSTART = 'dropstart';
    const BS_CLASS_DROPUP_CENTER = 'dropup-center';
    const BS_CLASS_DROPDOWN_CENTER = 'dropdown-center';

    const BS_SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)';
    const BS_SELECTOR_DATA_TOGGLE_SHOWN = `${BS_SELECTOR_DATA_TOGGLE}.${BS_CLASS_SHOW}`;
    const BS_SELECTOR_DROPDOWN = '.dropdown';
    const BS_SELECTOR_DROPDOWN_SHOWN = `${BS_SELECTOR_DROPDOWN}.${BS_CLASS_SHOW}`;
    const BS_CLASS_DROPDOWN_ITEM = 'dropdown-item';
    const BS_CLASS_MENU = 'dropdown-menu';
    const BS_SELECTOR_MENU = `.${BS_CLASS_MENU}`;
    const BS_SELECTOR_MENU_SHOWN = `${BS_SELECTOR_MENU}.${BS_CLASS_SHOW}`;
    const BS_CLASS_NAVBAR = 'navbar';
    const BS_SELECTOR_NAVBAR = `.${BS_CLASS_NAVBAR}`;
    const BS_CLASS_MENU_END = `${BS_CLASS_MENU}-end`;
    const BS_SELECTOR_MENU_END = `${BS_SELECTOR_MENU}.${BS_CLASS_MENU_END}`;
    const BS_SELECTOR_NAVBAR_NAV = '.navbar-nav';
    const BS_SELECTOR_VISIBLE_ITEMS = `.dropdown-menu .${BS_CLASS_DROPDOWN_ITEM}:not(.disabled):not(:disabled)`;
    const P3_SELECTOR_VISIBLE_ITEMS = `.${BS_CLASS_DROPDOWN_ITEM}:not(.disabled):not(:disabled)`;

    // dropdown-menu-(sm|md|lg)-end
    const menuEndRegex = new RegExp(`${BS_CLASS_MENU}(?:-[a-z]{2,3})?-end`);

    const isRTL = document.documentElement.dir === 'rtl';
    const isTouchDevice = 'ontouchstart' in window;

    const BsDropdown = bootstrap.Dropdown;


    /**
     * Get the html document width
     *
     * @return {Number}
     */
    function getClientWidth() {
        return Math.max(window.innerWidth, document.documentElement.clientWidth);
    }

    /**
     * Get an Array of siblings of an HTMLElement
     *
     * @param {HTMLElement} element
     * @param {string} selector
     * @return {Array}
     */
    function getSiblings(element, selector = '*') {

        const siblings = [];

        if (element instanceof HTMLElement) {
            const parent = element.parentElement;
            if (parent instanceof HTMLElement) {
                parent.querySelectorAll(`:scope > ${selector}`).forEach(function(child) {
                    if (child !== element && child instanceof HTMLElement) {
                        siblings.push(child);
                    }
                });
            }
        }

        return siblings;
    }

    /**
     * Check if element is an enabled dropdown toggler
     *
     * @param {HTMLElement} toggle
     * @return {Boolean}
     */
    function isEnabledToggle(toggle) {

        if (toggle && toggle instanceof HTMLElement) {
            return (
                toggle.getAttribute('data-bs-toggle') === 'dropdown'
                && !toggle.disabled
                && !toggle.classList.contains('disabled')
            );
        }

        return false;
    }

    /**
     * Helper function for BS_EVENT_SHOWN event handlers
     *
     * @param {Event} e
     * @param {Number} breakpoint
     * @param {Boolean} closeOthers
     * @param {Boolean} stopPropagation
     * @return {undefined}
     */
    function handleShownEvent(e, breakpoint, closeOthers, stopPropagation = false) {

        const target = e.relatedTarget || e.target;

        if (!isEnabledToggle(target)) {
            return;
        }

        // If toggler is matched prevent bubbling up?
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

        // MUST dispatch custom event (used to close external dropdowns)
        target.dispatchEvent(new Event(P3_EVENT_SHOWN, P3_EVENT_OPTS));
    }

    /**
     * Helper function for BS_EVENT_HIDDEN event handlers
     *
     * @param {Event} e
     * @param {Boolean} stopPropagation
     * @param {Boolean} dispatchCustomEvent Dispatch a custom event?
     * @return {undefined}
     */
    function handleHiddenEvent(e, stopPropagation = false, dispatchCustomEvent = false) {

        const target = e.relatedTarget || e.target;

        if (!isEnabledToggle(target)) {
            return;
        }

        // If it is a toggler prevent bubbling?
        if (stopPropagation) {
            e.stopPropagation();
        }

        const dropdown = target.parentElement.closest(BS_SELECTOR_DROPDOWN);
        if (dropdown instanceof HTMLElement) {
            dropdown.classList.remove(BS_CLASS_SHOW);
            closeInnerDropdowns(dropdown);
        }

        // Dispatch custom event?
        if (dispatchCustomEvent) {
            target.dispatchEvent(new Event(P3_EVENT_HIDDEN, P3_EVENT_OPTS));
        }
    }

    /**
     *  Helper function for BS_EVENT_CLICK_DATA_API event handlers
     *
     * @param {Event} e
     * @param {Boolean} hover
     * @param {Number} timeout
     * @param {Boolean} dispatchCustomEvent Dispatch a custom event?
     * @return {undefined}
     */
    function handleClickDataApiEvent(e, hover, timeout, dispatchCustomEvent = false) {

        const target = e.relatedTarget || e.target;

        if (!isEnabledToggle(target)) {
            return;
        }

        // If it is a toggler we MUST stop bubbling to prevent parent menu from
        // being close by bootstrap handler
        e.stopPropagation();

        // Remove any running timer
        if (hover && timeout > 0) {
            const timeoutID = target.getAttribute(`data-${P3_DATA_TIMEOUT_ID}`);
            if (timeoutID > 0) {
                clearTimeout(timeoutID);
            }
        }

        // Dispatch custom event?
        if (dispatchCustomEvent) {
            target.dispatchEvent(new MouseEvent(P3_EVENT_CLICK, e));
        }
    }

    /**
     * Close any dropdown not contained in this navbar
     *
     * @param {HTMLElement} navbar
     * @return {undefined}
     */
    function closeExternalDropdowns(navbar) {

        if (!(navbar instanceof HTMLElement)) {
            return;
        }

        document.querySelectorAll(BS_SELECTOR_DATA_TOGGLE_SHOWN).forEach(function(toggleElement) {
            if (!navbar.contains(toggleElement)) {
                const toggle = BsDropdown.getOrCreateInstance(toggleElement);
                if (toggle instanceof BsDropdown) {
                    toggle.hide();
                }
            }
        });
    }

    /**
     * Hides all dropdowns inside the given container
     *
     * @param {HTMLElement|Array|NodeList} container
     * @param {Event} event
     * @param {boolean} [stopPropagation=true]
     * @return {undefined}
     */
    function closeInnerDropdowns(container, event, stopPropagation = false) {

        const containers = [];

        if (container instanceof Array || container instanceof NodeList) {
            container.forEach(function(c) {
                if (c instanceof HTMLElement) {
                    containers.push(c);
                }
            });
        } else if (container instanceof HTMLElement) {
            containers.push(container);
        }

        if (containers.length > 0) {
            containers.forEach(function(container) {
                container.querySelectorAll(BS_SELECTOR_DATA_TOGGLE_SHOWN).forEach(function(toggleElement) {
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

    /**
     * Close siblings nav menu-items
     *
     * @param {HTMLElement} dropdown
     * @param {Event} event
     * @param {Boolean} stopPropagation
     * @return {undefined}
     */
    function closeSiblingDropdowns(dropdown, event, stopPropagation = false) {

        getSiblings(dropdown, BS_SELECTOR_DROPDOWN).forEach(function(sibling) {
            const toggleElement = sibling.querySelector(BS_SELECTOR_DATA_TOGGLE_SHOWN);
            if (toggleElement) {
                const toggle = BsDropdown.getOrCreateInstance(toggleElement);
                if (toggle instanceof BsDropdown) {
                    toggle.hide();
                }
            }
        });
    }

    /**
     * Close other navbar-nav in the same navbar
     *
     * @param {HTMLElement} dropdown
     * @param {Event} event
     * @param {Boolean} stopPropagation
     * @return {undefined}
     */
    function closeOtherNavs(dropdown, event, stopPropagation = false) {

        const otherNavs = document.querySelectorAll(`${BS_SELECTOR_NAVBAR} ${BS_SELECTOR_NAVBAR_NAV}`);
        const currentNav = dropdown.parentElement.closest(BS_SELECTOR_NAVBAR_NAV);

        otherNavs.forEach(function(otherNav) {
            if (otherNav !== currentNav) {
                closeInnerDropdowns(otherNav, event, stopPropagation);
            }
        });
    }

    /**
     * Set the direction of a dropdown's children/submenu
     *
     * @param {HTMLElement} dropdown
     * @param {Number} clientWidth
     * @param {Number} breakpoint
     * @return {undefined}
     */
    function setChildrenDropDirection(dropdown, clientWidth, breakpoint) {

        const menu = dropdown.querySelector(`:scope > ${BS_SELECTOR_MENU}`);

        if (!(menu instanceof HTMLElement)) {
            return;
        }

        if (clientWidth < breakpoint) {
            menu.querySelectorAll(BS_SELECTOR_DROPDOWN).forEach(function(child) {
                child.classList.remove(BS_CLASS_DROPEND);
                child.classList.remove(BS_CLASS_DROPSTART);
            });
            return;
        }

        const left = menu.getBoundingClientRect().left;
        const right = left + menu.offsetWidth;

        const isDropStart = dropdown.classList.contains(BS_CLASS_DROPSTART) || (
            !dropdown.classList.contains(BS_CLASS_DROPEND)
            && (menuEndRegex.test(menu.className))
        );

        menu.querySelectorAll(`:scope > ${BS_SELECTOR_DROPDOWN}`).forEach(function(menuItem) {

            const submenu = menuItem.querySelector(`:scope > ${BS_SELECTOR_MENU}`);

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

    /**
     * CLOSE MENUS AND REMOVE DROP-CLASSES ON OPT.breakpoint CROSSING
     *
     * @param {HTMLElement} navbar
     * @param {Number} breakpoint
     * @param {Number|undefined} previousWidth
     * @return {undefined}
     */
    function handleBreakpointCrossing(navbar, breakpoint, previousWidth) {

        const currentWidth = getClientWidth();

        if (previousWidth < breakpoint && currentWidth >= breakpoint) {
            closeInnerDropdowns(navbar);
        } else if (previousWidth >= breakpoint && currentWidth < breakpoint) {
            closeInnerDropdowns(navbar);
            navbar.querySelectorAll(`.${BS_CLASS_DROPEND}, .${BS_CLASS_DROPEND}`).forEach(function(menuItem) {
                menuItem.classList.remove(BS_CLASS_DROPSTART);
                menuItem.classList.remove(BS_CLASS_DROPEND);
            });
        }

        return currentWidth;
    }

    /**
     * Move to next/previous element in a list or cycle through it
     *
     * @param {Array} list
     * @param {HTMLElement} element
     * @param {Boolean} shouldGetNext
     * @param {Boolean} cycle
     * @return {HTMLElement}
     */
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

    /**
     * Handler function for ENTER | UP | DOWN keypress
     *
     * This is used inside a capturing handler
     *
     * @param {Event} e
     * @param {HTMLElement} navbar
     * @param {Boolean} dispatchCustomEvent Dispatch a custom event?
     * @return {undefined}
     */
    function handleKeydown(e, navbar, dispatchCustomEvent) {

        // Let bootstrap handlers deal with ESCAPE and TAB
        if (!e.key || e.key === ESCAPE_KEY || e.key === TAB_KEY) {
            return;
        }

        // ENTER | UP | DOWN keypress are handled
        const isValidKeyEvent = [ENTER_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(e.key);
        if (!isValidKeyEvent) {
            return;
        }

        const target = e.target;
        // Let bootstrap dropdown handle top-level (nav-link) dropdown-items and
        // other elements such as form inputs
        if (!target || !target.classList.contains(BS_CLASS_DROPDOWN_ITEM)) {
            return;
        }

        // DO NOT HANDLE events for targets outside our navbar
        if (navbar instanceof HTMLElement && !navbar.contains(target)) {
            return;
        }

        // STOP DOWNWARD propagation from here
        e.stopPropagation();

        if (e.key === ENTER_KEY) {
            if (target.matches(BS_SELECTOR_DATA_TOGGLE)) {
                // Only prevent default behaviour on dropdown togglers
                e.preventDefault();
                target.click();
                // Apply focus on 1st submenu item if any
                const subItem = target.parentElement.querySelector(`:scope ${BS_SELECTOR_VISIBLE_ITEMS}`);
                if (subItem) {
                    subItem.focus();
                }
            }
        } else {
            const menu = target.closest(BS_SELECTOR_MENU);
            if (menu instanceof HTMLElement) {
                const items = [].concat(
                    ...menu.querySelectorAll(`:scope > li > ${P3_SELECTOR_VISIBLE_ITEMS}`)
                );

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

        // Dispatch custom event?
        if (dispatchCustomEvent) {
            target.dispatchEvent(new KeyboardEvent(P3_EVENT_KEYDOWN, e));
        }
    }

    /**
     * SHOW/HIDE ON HOVER
     *
     * @param {HTMLElement} navbar
     * @param {Number} breakpoint
     * @param {Number} timeout
     * @return {undefined}
     */
    function activateHover(navbar, breakpoint, timeout) {

        const dropdowns = navbar.querySelectorAll(BS_SELECTOR_DROPDOWN);

        dropdowns.forEach(function(menuItem) {
            menuItem.addEventListener('mouseenter', function(e) {
                handleMouseEnter(menuItem, breakpoint, timeout);
            });
            menuItem.addEventListener('mouseleave', function(e) {
                handleMouseLeave(menuItem, breakpoint, timeout);
            });
        });
    }

    /**
     * Helper method for mouseenter event handler
     *
     * @param {HTMLElement} menuItem
     * @param {Number} breakpoint
     * @param {Number} timeout
     * @return {undefined}
     */
    function handleMouseEnter(menuItem, breakpoint, timeout) {

        if (getClientWidth() < breakpoint) {
            return;
        }

        const toggleElement = menuItem.querySelector(BS_SELECTOR_DATA_TOGGLE);

        if (toggleElement instanceof HTMLElement) {
            if (timeout > 0) {
                // Clear the previously registered timeout, if any
                const timeoutID = toggleElement.getAttribute(`data-${P3_DATA_TIMEOUT_ID}`);
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

    /**
     * Helper method for mouseleave event handler
     *
     * @param {HTMLElement} menuItem
     * @param {Number} breakpoint
     * @param {Number} timeout
     * @return {undefined}
     */
    function handleMouseLeave(menuItem, breakpoint, timeout) {

        if (getClientWidth() < breakpoint) {
            return;
        }

        const toggleElement = menuItem.querySelector(BS_SELECTOR_DATA_TOGGLE);

        if (toggleElement instanceof HTMLElement) {
            // Clear the previously registered timeout, if any
            if (toggleElement.classList.contains(BS_CLASS_SHOW) && timeout > 0) {
                const timeoutID = toggleElement.getAttribute(`data-${P3_DATA_TIMEOUT_ID}`);
                if (timeoutID > 0) {
                    clearTimeout(timeoutID);
                }
            }
            // Add a timeout for delaying hide events so that the mouse leaving
            // the control will not immediatly close the submenu
            toggleElement.setAttribute(`data-${P3_DATA_TIMEOUT_ID}`, setTimeout(
                function() {
                    if (toggleElement.classList.contains(BS_CLASS_SHOW)) {
                        const toggle = BsDropdown.getOrCreateInstance(toggleElement);
                        if (toggle instanceof BsDropdown) {
                            toggle.hide();
                        }
                    }
                },
                timeout
            ));
        }
    }

    /**
     * Determine navbar expand breakpoint form expand-(sm|md|lg|xl) class if present
     *
     * @param {HTMLElement} navbar
     * @return {integer|null}
     */
    function getExpandBreakpoint(navbar) {
        for (const nc of navbar.classList) {
            const rootStyle = window.getComputedStyle(document.documentElement);
            const breakpoint = parseInt(rootStyle.getPropertyValue(`--p3-bs-${nc}`));
            if (Number.isInteger(breakpoint)) {
                return breakpoint;
            }
        }
        return null;
    }

    /**
     * p3bsNavbar main function
     *
     * @param {string} selector A valid string selector, an HTMLElement, an
     *      Array of elements or a NodeList
     * @param {Object} options
     * @return {undefined}
     */
    const p3bsNavbar = function(selector, options) {

        const OPTIONS = Object.assign({}, p3bsNavbar.defaults, options);

        let navbars = [];

        if (typeof(selector) === 'string') {
            navbars = document.querySelectorAll(selector);
        } else if (selector instanceof HTMLElement) {
            navbars = [selector];
        } else if (selector instanceof Array || selector instanceof NodeList) {
            selector.forEach(function(element) {
                if (element instanceof HTMLElement) {
                    navbars.push(element);
                }
            });
        }

        navbars.forEach(function(navbar) {
            // Make a copy to preserve the original OPTIONS object
            const OPT = Object.assign({}, OPTIONS);

            // Determine navbar expand breakpoint
            const breakpoint = getExpandBreakpoint(navbar);
            if (breakpoint > 0) {
                OPT.breakpoint = breakpoint;
            }

            if (OPT.customEvents) {
                // Dispatch custom event on BS_EVENT_SHOW
                navbar.addEventListener(BS_EVENT_SHOW, function(e) {
                    const target = e.relatedTarget || e.target;
                    target.dispatchEvent(new Event(P3_EVENT_SHOW, P3_EVENT_OPTS));
                });

                // Dispatch custom event on BS_EVENT_HIDE
                navbar.addEventListener(BS_EVENT_HIDE, function(e) {
                    const target = e.relatedTarget || e.target;
                    target.dispatchEvent(new Event(P3_EVENT_HIDE, P3_EVENT_OPTS));
                });
            }

            // handle BS_EVENT_SHOWN events
            navbar.addEventListener(BS_EVENT_SHOWN, function(e) {
                handleShownEvent(e, OPT.breakpoint, OPT.closeOthers, OPT.stopPropagation);
            });

            // handle BS_EVENT_HIDDEN events
            navbar.addEventListener(BS_EVENT_HIDDEN, function(e) {
                handleHiddenEvent(e, OPT.stopPropagation, OPT.customEvents);
            });

            // handle CLICK events (BS_EVENT_CLICK_DATA_API not used)
            navbar.addEventListener('click', function(e) {
                handleClickDataApiEvent(e, OPT.hover, OPT.timeout, OPT.customEvents);
            });

            // handle KEYDOWN events (BS_EVENT_KEYDOWN_DATA_API not used)
            document.addEventListener('keydown', function(e) {
                handleKeydown(e, navbar, OPT.customEvents);
            }, true); // CAPTURE events before document where bs listeners are registered

            // Close menus on OPT.breakpoint crossing
            let previousWidth = getClientWidth();
            window.addEventListener('resize', function(e) {
                previousWidth = handleBreakpointCrossing(navbar, breakpoint, previousWidth);
            });

            // Activate hover dropdown
            if (OPT.hover && !isTouchDevice) {
                activateHover(navbar, OPT.breakpoint, OPT.timeout);
            }

            // Close external dropdowns on showing navbar dropdowns
            navbar.addEventListener(P3_EVENT_SHOWN, function(e) {
                closeExternalDropdowns(navbar);
                if (OPT.stopPropagation) {
                    e.stopPropagation(); // no need to propagate outside the navbar
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
        customEvents: false,
    };

    // Define the vendor namespace and library namespace and if not already set
    window.pine3ree = window.pine3ree || {};
    window.pine3ree.bs = window.pine3ree.bs || {};

    // Assign the main function to the right namespace
    window.pine3ree.bs.navbar = p3bsNavbar;
    // Assign the main function to the window object using the same name for the
    // jQuery plugin
    window.p3bsNavbar = p3bsNavbar;

    // Add jQuery plugin if jQuery is loaded
    if (typeof($) === 'function' && $().fn === $.jquery) {
        $.fn.p3bsNavbar = function(options) {
            const opts = $.extend($.fn.p3bsNavbar.defaults, options);
            p3bsNavbar(this.get(), opts);
        };

        $.fn.p3bsNavbar.defaults = p3bsNavbar.defaults;
    }
})(window.bootstrap, window.jQuery);
