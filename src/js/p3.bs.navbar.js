"use strict";
const P3BsNavbar = (function($) {

    const P3_NAME = 'p3bsnavbar';

    const P3_DATA_KEY = 'p3.navbar.dropdown';
    const P3_EVENT_KEY = `.${P3_DATA_KEY}`;
    const P3_EVENT_OPTS = { bubbles: true, cancelable: true };
    const P3_EVENT_CLICK = `click${P3_EVENT_KEY}`;
    const P3_EVENT_HIDE = `hide${P3_EVENT_KEY}`;
    const P3_EVENT_HIDDEN = `hidden${P3_EVENT_KEY}`;
    const P3_EVENT_SHOW = `show${P3_EVENT_KEY}`;
    const P3_EVENT_SHOWN = `shown${P3_EVENT_KEY}`;
    const P3_DATA_TIMEOUT_ID = `timeoutID.${P3_DATA_KEY}`;

    const BS_NAME = 'dropdown';
    const BS_DATA_KEY = 'bs.dropdown';
    const BS_EVENT_KEY = `.${BS_DATA_KEY}`;
    const BS_DATA_API_KEY = '.data-api';

    const ENTER_KEY = 'Enter'
    const ESCAPE_KEY = 'Escape'
    const TAB_KEY = 'Tab'
    const ARROW_UP_KEY = 'ArrowUp'
    const ARROW_DOWN_KEY = 'ArrowDown'
    const RIGHT_MOUSE_BUTTON = 2 // MouseEvent.button value for the secondary button, usually the right button

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
    const BS_SELECTOR_MENU = '.dropdown-menu';
    const BS_SELECTOR_MENU_SHOWN = `${BS_SELECTOR_MENU}.${BS_CLASS_SHOW}`;
    const BS_SELECTOR_NAVBAR = '.navbar';
    const BS_CLASS_MENU_END = 'dropdown-menu-end';
    const BS_SELECTOR_MENU_END = `${BS_SELECTOR_MENU}.${BS_CLASS_MENU_END}`;
    const BS_SELECTOR_NAVBAR_NAV = '.navbar-nav';
    const BS_SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
    const P3_SELECTOR_VISIBLE_ITEMS = '.dropdown-item:not(.disabled):not(:disabled)';

    const isRTL = document.documentElement.dir === 'rtl';

    /**
     * Get the html document width
     *
     * @returns {Number}
     */
    function getClientWidth() {
        return Math.max(window.innerWidth, document.documentElement.clientWidth);
    }

    /**
     * Get an Array of siblings of an HTMLElement
     *
     * @param {HTMLElement} element
     * @param {string} selector
     * @returns {Array}
     */
    function getSiblings(element, selector = '*') {
        let siblings = [];

        if (element instanceof HTMLElement) {
            let parent = element.parentElement;
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
     * @returns {Boolean}
     */
    function isEnabledToggle(toggle) {
        if (toggle && toggle instanceof HTMLElement) {
            return (
            toggle.getAttribute('data-bs-toggle') === "dropdown"
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
     * @returns {undefined}
     */
    function handleShownEvent(e, breakpoint, closeOthers) {
        const toggle = e.target;
        if (!isEnabledToggle(toggle)) {
            return;
        }

        const dropdown = toggle.closest(BS_SELECTOR_DROPDOWN);

        if (dropdown instanceof HTMLElement) {
            let clientWidth = getClientWidth();

            dropdown.classList.add(BS_CLASS_SHOW);

            setChildrenDropDirection(dropdown, clientWidth, breakpoint);

            if (closeOthers || clientWidth >= breakpoint) {
                closeOtherNavs(dropdown);
                closeSiblingDropdowns(dropdown);
            }
        }

        // Dispatch custom event
        toggle.dispatchEvent(new Event(P3_EVENT_SHOWN, P3_EVENT_OPTS));
    }

    /**
     * Helper function for BS_EVENT_HIDDEN event handlers
     *
     * @param {Event} e
     * @returns {undefined}
     */
    function handleHiddenEvent(e) {
        const toggle = e.target;
        if (!isEnabledToggle(toggle)) {
            return;
        }

        const dropdown = toggle.parentElement.closest(BS_SELECTOR_DROPDOWN);

        if (dropdown instanceof HTMLElement) {
            dropdown.classList.remove(BS_CLASS_SHOW);
            closeInnerDropdowns(dropdown);
        }

        // Dispatch custom event
        toggle.dispatchEvent(new Event(P3_EVENT_HIDDEN, P3_EVENT_OPTS));
    }

    /**
     *  Helper function for BS_EVENT_CLICK_DATA_API event handlers
     *
     * @param {Event} e
     * @param {Boolean} hover
     * @param {Number} timeout
     * @returns {undefined}
     */
    function handleClickDataApiEvent(e, hover, timeout) {
        const toggle = e.target;
        if (!isEnabledToggle(toggle)) {
            return;
        }

        // If it is a toggler prevent bubbling and parent menu from closing
        e.stopPropagation();

        // Dispatch custom event
        toggle.dispatchEvent(new Event(P3_EVENT_CLICK, P3_EVENT_OPTS));

        // Remove any running timer
        if (hover && timeout > 0) {
            let timeoutID = toggle.getAttribute(`data-${P3_DATA_TIMEOUT_ID}`);
            if (timeoutID > 0) {
                clearTimeout(timeoutID);
            }
        }
    }

    /**
     * Close any dropdown not contained in this navbar
     *
     * @param {HTMLElement} navbar
     * @returns {undefined}
     */
    function closeExternalDropdowns(navbar) {
        document.querySelectorAll(BS_SELECTOR_DATA_TOGGLE_SHOWN).forEach(function(toggleElement) {
            if (!navbar.contains(toggleElement)) {
                let toggle = bootstrap.Dropdown.getOrCreateInstance(toggleElement);
                if (toggle) toggle.hide();
            }
        });
    }

    /**
     * Hides all dropdowns inside the given container
     *
     * @param {HTMLElement|Array|NodeList} container
     * @param {Event} event
     * @param {boolean} [stopPropagation=true]
     * @returns {undefined}
     */
    function closeInnerDropdowns(container, event, stopPropagation = false) {
        let containers = [];

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
                    const toggle = bootstrap.Dropdown.getOrCreateInstance(toggleElement);
                    if (toggle) {
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
     * @returns {undefined}
     */
    function closeSiblingDropdowns(dropdown, event, stopPropagation = false) {
        getSiblings(dropdown, BS_SELECTOR_DROPDOWN).forEach(function(sibling) {
            const toggleElement = sibling.querySelector(BS_SELECTOR_DATA_TOGGLE_SHOWN);
            if (toggleElement) {
                let toggle = bootstrap.Dropdown.getOrCreateInstance(toggleElement);
                if (toggle) toggle.hide();
            }
        });
    }

    /**
     * Close other navbar-nav in the same navbar
     *
     * @param {HTMLElement} dropdown
     * @param {Event} event
     * @param {Boolean} stopPropagation
     * @returns {undefined}
     */
    function closeOtherNavs(dropdown, event, stopPropagation = false) {
        let otherNavs = getSiblings(
        dropdown.parentElement.closest(BS_SELECTOR_NAVBAR_NAV),
        BS_SELECTOR_NAVBAR_NAV
        );
        if (otherNavs instanceof Array && otherNavs.length > 0) {
            closeInnerDropdowns(otherNavs, event, stopPropagation);
    }
    }

    /**
     * Set the direction of a dropdown's children/submenu
     *
     * @param HTMLElement dropdown
     * @param number clientWidth
     * @param number breakpoint
     * @returns {undefined}
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

        let left = menu.getBoundingClientRect().left;
        let right = left + menu.offsetWidth;

        const rootMenuEnd = !!dropdown.closest(`.${BS_CLASS_MENU_END}`);
        const isDropStart = dropdown.classList.contains(BS_CLASS_DROPSTART) || (
            dropdown.classList.contains(BS_CLASS_DROPEND) && rootMenuEnd
        );

        menu.querySelectorAll(`:scope > ${BS_SELECTOR_DROPDOWN}`).forEach(function(menuItem) {

            const submenu = menuItem.querySelector(`:scope > ${BS_SELECTOR_MENU}`);

            submenu.style.visibility = 'hidden';
            submenu.classList.add(BS_CLASS_SHOW);

            let subwidth = submenu.offsetWidth;

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
     * @param {Number|undefined} initialWidth
     * @returns {undefined}
     */
    function handleBreakpointCrossing(navbar, breakpoint, previousWidth) {
        let currentWidth = getClientWidth();
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
     * @returns {p3.bs.navbarP3BsNavbar.getNextElement.list}
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
     * @returns {undefined}
     */
    function handleKeydown(e, navbar) {
        // Let bootstrap handlers deal with ESCAPE and TAB
        if (!e.key || e.key === ESCAPE_KEY || e.key === TAB_KEY) {
            return;
        }

        // ENTER | UP | DOWN keypress are handled
        const isValidKeyEvent = [ENTER_KEY, ARROW_UP_KEY, ARROW_DOWN_KEY].includes(e.key)
        if (!isValidKeyEvent) {
            return;
        }

        const target = e.target;
        // Let bootstrap dropdown handle top-level (nav-link) dropdown-items and
        // other elements such as form inputs
        if (!target || !target.classList.contains('dropdown-item')) {
            return;
        }

        // DO NOT HANDLE events for targets outside our navbar
        if (navbar instanceof HTMLElement && !navbar.contains(target)) {
            return;
        }

        // Stop downward propagation from here
        e.stopPropagation();

        if (e.key === ENTER_KEY) {
            if (target.matches(BS_SELECTOR_DATA_TOGGLE)) {
                // Only prevent default behaviour on dropdown togglers
                e.preventDefault();
                target.click();
                // Apply focus on 1st submenu item if any
                let subItem = target.parentElement.querySelector(`:scope ${BS_SELECTOR_VISIBLE_ITEMS}`);
                if (subItem) {
                    subItem.focus();
                }
            }
            return;
        }

        let menu;
        menu = target.closest(BS_SELECTOR_MENU);
        if (!menu) {
            return;
        }

        const items = [].concat(
            ...menu.querySelectorAll(`:scope > li > ${P3_SELECTOR_VISIBLE_ITEMS}`)
        );

        const isNavKeyEvent = e.key === ARROW_DOWN_KEY || e.key === ARROW_UP_KEY;
        if (isNavKeyEvent) {
            let nextItem = getNextElement(items, target, e.key !== ARROW_UP_KEY, true);
            if (nextItem) {
                nextItem.focus();
                closeSiblingDropdowns(nextItem.parentElement);
            }
            return;
        }
    }

    /**
     * SHOW/HIDE ON HOVER
     *
     * @param {HTMLElement} navbar
     * @param {Number} breakpoint
     * @param {Number} timeout
     * @returns {undefined}
     */
    function activateHover(navbar, breakpoint, timeout) {

        const dropdowns = navbar.querySelectorAll(BS_SELECTOR_DROPDOWN);

        dropdowns.forEach(function(menuItem) {
            menuItem.addEventListener('mouseenter', function(e) {
                handleMouseEnter(this, breakpoint, timeout);
            });
            menuItem.addEventListener('mouseleave', function(e) {
                handleMouseLeave(this, breakpoint, timeout);
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
                let timeoutID = toggleElement.getAttribute(`data-${P3_DATA_TIMEOUT_ID}`);
                if (timeoutID > 0) {
                    clearTimeout(timeoutID);
                }
            }
            if (!toggleElement.classList.contains(BS_CLASS_SHOW)) {
                let toggle = bootstrap.Dropdown.getOrCreateInstance(toggleElement);
                if (toggle) toggle.show();
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
                let timeoutID = toggleElement.getAttribute(`data-${P3_DATA_TIMEOUT_ID}`);
                if (timeoutID > 0) {
                    clearTimeout(timeoutID);
                }
            }
            toggleElement.setAttribute(`data-${P3_DATA_TIMEOUT_ID}`, setTimeout(
            function() {
                if (toggleElement.classList.contains(BS_CLASS_SHOW)) {
                    let toggle = bootstrap.Dropdown.getOrCreateInstance(toggleElement);
                    if (toggle) toggle.hide();
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
     * @returns {integer|null}
     */
    function getNavbarBreakpoint(navbar) {
        for (const nc of navbar.classList) {
            let rootStyle = window.getComputedStyle(document.documentElement);
            let breakpoint = parseInt(rootStyle.getPropertyValue(`--p3-bs-${nc}`));
            if (Number.isInteger(breakpoint)) {
                return breakpoint;
            }
        }
        return null;
    }

    /**
     * P3BsNavbar MAIN FUNCTION
     *
     * @param {string} selector A valid string selector, an HTMLElement, an
     *      Array of elements or a NodeList
     * @param {Object} options
     * @returns {P3BsNavbar}
     */
    let P3BsNavbar = function(selector, options) {

        const OPTIONS = Object.assign({}, P3BsNavbar.defaults, options);
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
            const OPT = Object.assign({}, OPTIONS);

            // Determine navbar expand breakpoint
            let breakpoint = getNavbarBreakpoint(navbar);
            if (breakpoint > 0) {
                OPT.breakpoint = breakpoint;
            }

            // Dispatch custom event on BS_EVENT_SHOW
            navbar.addEventListener(BS_EVENT_SHOW, function(e) {
                e.target.dispatchEvent(new Event(P3_EVENT_SHOW, P3_EVENT_OPTS));
            });

            // Dispatch custom event on BS_EVENT_HIDE
            navbar.addEventListener(BS_EVENT_HIDE, function(e) {
                e.target.dispatchEvent(new Event(P3_EVENT_HIDE, P3_EVENT_OPTS));
            });

            // handle BS_EVENT_SHOWN events
            navbar.addEventListener(BS_EVENT_SHOWN, function(e) {
                return handleShownEvent(e, OPT.breakpoint, OPT.closeOthers);
            });

            // handle BS_EVENT_HIDDEN events
            navbar.addEventListener(BS_EVENT_HIDDEN, function(e) {
                return handleHiddenEvent(e);
            });

            // handle BS_EVENT_CLICK_DATA_API events
            navbar.addEventListener(BS_EVENT_CLICK_DATA_API, function(e) {
                return handleClickDataApiEvent(e, OPT.hover, OPT.timeout);
            });
            navbar.addEventListener('click', function(e) {
                return handleClickDataApiEvent(e, OPT.hover, OPT.timeout);
            });

            // handle BS_EVENT_KEYDOWN_DATA_API events
            window.addEventListener('keydown', function(e) {
                //console.log('p3-key = ' + e.key);
                handleKeydown(e, navbar);
            }, true); // capture events before document where bs listeners are registered

            //------------------------------------------------------------------
            // CLOSE MENUS ON OPT.breakpoint CROSSING
            //------------------------------------------------------------------
            let previousWidth = getClientWidth();
            window.addEventListener('resize', function(e) {
                previousWidth = handleBreakpointCrossing(navbar, breakpoint, previousWidth);
            });
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            // ACTIVATE HOVER DROPDOWN
            //------------------------------------------------------------------
            if (OPT.hover) {
                activateHover(navbar, OPT.breakpoint, OPT.timeout)
            }
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            // CLOSE EXTERNAL DROPDOWNS ON SHOWING NAVBAR DROPDOWNS
            //------------------------------------------------------------------
            document.addEventListener(P3_EVENT_SHOWN, function(e) {
                closeExternalDropdowns(navbar);
            });
            //------------------------------------------------------------------
        });
    };

    P3BsNavbar.defaults = {
        breakpoint: 768,
        hover: false,
        timeout: 250,
        closeOthers: false,
    };

    // Add jQuery plugin if jQuery loaded
    if (typeof ($) === 'function' && $().fn === $.jquery) {
        $.fn.p3bsnavbar = function(options) {
            const OPT = $.extend($.fn.p3bsnavbar.defaults, options);
            P3BsNavbar(this.get());
        }

        $.fn.p3bsnavbar.default = P3BsNavbar.defaults;
    }

    return P3BsNavbar;
//------------------------------------------------------------------------------
}(window.jQuery || null));
