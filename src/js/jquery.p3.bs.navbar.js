"use strict";

(function($) {

    const $window = $(window);
    const $document = $(document);

    const P3_NAME = 'p3bsnavbar';

    const P3_DATA_KEY = 'p3.navbar.dropdown';
    const P3_EVENT_KEY = `.${P3_DATA_KEY}`;
    const P3_EVENT_OPTS =  { bubbles: true, cancelable: true };
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

    const isRTL = document.documentElement.dir === 'rtl';


    function getClientWidth() {
        return Math.max(window.innerWidth, document.documentElement.clientWidth);
    }

    /**
     * Check if element is an enabled dropdown toggler
     *
     * @param {jQuery} $toggle
     * @returns {Boolean}
     */
    function isEnabledToggle($toggle) {
        if ($toggle.length > 0) {
             return (
                $toggle.data('bs-toggle') === "dropdown"
//                && !$toggle.prop('disabled')
//                && !$toggle.hasClass('disabled')
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
        const $toggle = $(e.target);
        if (!isEnabledToggle($toggle)) {
            return;
        }

        const $dropdown = $toggle.closest(BS_SELECTOR_DROPDOWN);

        if ($dropdown.length > 0) {
            let clientWidth = getClientWidth();
        
            $dropdown.addClass(BS_CLASS_SHOW);
            
            setChildrenDropDirection($dropdown, clientWidth, breakpoint);

            if (closeOthers || clientWidth >= breakpoint) {
                closeOtherNavs($dropdown);
                closeSiblingDropdowns($dropdown);
            }
        }

        // Dispatch custom event
        $toggle.trigger($.Event(P3_EVENT_SHOWN, P3_EVENT_OPTS));
    }

    /**
     * Helper function for BS_EVENT_HIDDEN event handlers
     *
     * @param {Event} e
     * @returns {undefined}
     */
    function handleHiddenEvent(e) {
        const $toggle = $(e.target);
        if (!isEnabledToggle($toggle)) {
            return;
        }

        const $dropdown = $toggle.closest(BS_SELECTOR_DROPDOWN);

        if ($dropdown.length > 0) {
            $dropdown.removeClass(BS_CLASS_SHOW);
            closeInnerDropdowns($dropdown);
        }

        // Dispatch custom event
        $toggle.trigger($.Event(P3_EVENT_HIDDEN, P3_EVENT_OPTS));
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
        const $toggle = $(e.target);
        if (!isEnabledToggle($toggle)) {
            return;
        }

        // If it is a toggler prevent bubbling and parent menu from closing
        e.stopPropagation();

        $toggle.trigger($.Event(P3_EVENT_CLICK, P3_EVENT_OPTS));

        // Remove any running timer
        if (hover && timeout > 0) {
            let timeoutID = $toggle.data(P3_DATA_TIMEOUT_ID);
            if (timeoutID > 0) {
                clearTimeout(timeoutID);
            }
        }
    }

    /**
     * Close any dropdown not contained in this navbar
     * 
     * @param {jQuery} navbar
     * @returns {undefined}
     */
    function closeExternalDropdowns($navbar) {
        if ($navbar.length === 0) {
            return;
        }

        $(BS_SELECTOR_DATA_TOGGLE_SHOWN).each(function() {
            if (!$.contains($navbar[0], this)) {
                let toggle = bootstrap.Dropdown.getOrCreateInstance(this);
                if (toggle) toggle.hide();
            }
        });
    }

    /**
     * Hides all dropdowns inside the given container
     *
     * @param {jQuery} $container
     * @param {Event} event
     * @param {boolean} [stopPropagation=true]
     * @returns {undefined}
     */
    function closeInnerDropdowns($container, event, stopPropagation = false) {
        if ($container.length === 0) {
            return;
        }
        
        $container.find(BS_SELECTOR_DATA_TOGGLE_SHOWN).each(function() {
            let toggle = bootstrap.Dropdown.getOrCreateInstance(this);
            toggle.hide();
        });

        if (event instanceof Event && stopPropagation === true) {
            event.stopPropagation();
        }
    }

    /**
     * Close siblings nav menu-items
     *
     * @param {jQuery} $dropdown
     * @param {Event} event
     * @param {Boolean} stopPropagation
     * @returns {undefined}
     */
    function closeSiblingDropdowns($dropdown, event, stopPropagation = false) {
        $dropdown.siblings(BS_SELECTOR_DROPDOWN).find(BS_SELECTOR_DATA_TOGGLE_SHOWN).each(function() {
            let toggle = bootstrap.Dropdown.getOrCreateInstance(this);
            toggle.hide();
        })
    }

    /**
     * Close other navbar-nav in the same navbar
     *
     * @param {jQuery} $dropdown
     * @param {Event} event
     * @param {Boolean} stopPropagation
     * @returns {undefined}
     */
    function closeOtherNavs($dropdown, event, stopPropagation = false) {
        closeInnerDropdowns(
            $dropdown.closest(BS_SELECTOR_NAVBAR_NAV).siblings(BS_SELECTOR_NAVBAR_NAV),
            event,
            stopPropagation
        );
    }

    /**
     * Set the direction of a dropdown's children/submenu
     *
     * @param jQuery $dropdown
     * @param number clientWidth
     * @param number breakpoint
     * @returns {undefined}
     */
    function setChildrenDropDirection($dropdown, clientWidth, breakpoint) {
        const $dropdownMenu = $dropdown.children(BS_SELECTOR_MENU).first();
        if ($dropdownMenu.length === 0) {
            return;
        }

        if (clientWidth < breakpoint) {
            $dropdownMenu.children(BS_SELECTOR_DROPDOWN).removeClass(`${BS_CLASS_DROPEND} ${BS_CLASS_DROPSTART}`);
            return;
        }

        let left = $dropdownMenu.offset().left;
        let right = left + $dropdownMenu.outerWidth();

        const rootMenuEnd = $dropdown.closest(`.${BS_CLASS_MENU_END}`).length > 0;
        const isDropStart = $dropdown.hasClass(BS_CLASS_DROPSTART) || (
            !$dropdown.hasClass(BS_CLASS_DROPEND) && rootMenuEnd
        );

        $dropdownMenu.children(BS_SELECTOR_DROPDOWN).each(function () {
            const $this = $(this);
            const $submenu = $this.children(BS_SELECTOR_MENU).first();

            $submenu.css({visibility: 'hidden'}).addClass(BS_CLASS_SHOW);
            let subwidth = $submenu.outerWidth();
            $submenu.removeClass(BS_CLASS_SHOW).css({visibility: ''});

            if (isRTL) {
                if (isDropStart) {
                    if (right + subwidth > clientWidth) {
                        $this.removeClass(BS_CLASS_DROPSTART).addClass(BS_CLASS_DROPEND);
                    } else {
                        $this.removeClass(BS_CLASS_DROPEND).addClass(BS_CLASS_DROPSTART);
                    }
                } else {
                    if (left - subwidth < 0) {
                        $this.removeClass(BS_CLASS_DROPEND).addClass(BS_CLASS_DROPSTART);
                    } else {
                        $this.removeClass(BS_CLASS_DROPSTART).addClass(BS_CLASS_DROPEND);
                    }
                }
            } else {
                if (isDropStart) {
                    if (left - subwidth < 0) {
                        $this.removeClass(BS_CLASS_DROPSTART).addClass(BS_CLASS_DROPEND);
                    } else {
                        $this.removeClass(BS_CLASS_DROPEND).addClass(BS_CLASS_DROPSTART);
                    }
                } else {
                    if (right + subwidth > clientWidth) {
                        $this.removeClass(BS_CLASS_DROPEND).addClass(BS_CLASS_DROPSTART);
                    } else {
                        $this.removeClass(BS_CLASS_DROPSTART).addClass(BS_CLASS_DROPEND);
                    }
                }
            }
        });
    }

    /**
     * CLOSE MENUS AND REMOVE DROP-CLASSES ON OPT.breakpoint CROSSING
     *
     * @param {jQuery} $navbar
     * @param {Number} breakpoint
     * @param {Number|undefined} initialWidth
     * @returns {undefined}
     */
    function handleBreakpointCrossing($navbar, breakpoint, previousWidth) {
        let currentWidth = getClientWidth();
        if (previousWidth < breakpoint && currentWidth >= breakpoint) {
            closeInnerDropdowns($navbar);
        } else if (previousWidth >= breakpoint && currentWidth < breakpoint) {
            closeInnerDropdowns($navbar);
            $navbar.find(`.${BS_CLASS_DROPEND}, .${BS_CLASS_DROPEND}`)
                .removeClass(`${BS_CLASS_DROPEND} ${BS_CLASS_DROPEND}`);
        }
        return currentWidth;
    }

    /**
     * SHOW/HIDE ON HOVER
     *
     * @param {jQuery} navbar
     * @param {Number} breakpoint
     * @param {Number} timeout
     * @returns {undefined}
     */
    function activateHover($navbar, breakpoint, timeout) {

        const $dropdowns = $navbar.find(BS_SELECTOR_DROPDOWN);

        $dropdowns.on('mouseenter', function(e) {
            const $menuItem = $(this);
            $menuItem.on('mouseenter', function(e) {
                handleMouseEnter($menuItem, breakpoint, timeout);
            });
        });

        $dropdowns.on('mouseenter', function(e) {
            const $menuItem = $(this);
            $menuItem.on('mouseleave', function(e) {
                handleMouseLeave($menuItem, breakpoint, timeout);
            });
        });
    }

    function handleMouseEnter($menuItem, breakpoint, timeout) {
        if (getClientWidth() < breakpoint) {
            return;
        }
        const $toggle = $(this).find(BS_SELECTOR_DATA_TOGGLE).first();
        if (!$toggle || $toggle.length === 0) {
            return;
        }

        if (timeout > 0) {
            let timeoutID = $toggle.data(P3_DATA_TIMEOUT_ID);
            if (timeoutID > 0) {
                clearTimeout(timeoutID);
            }
        }
        if (!$toggle.hasClass(BS_CLASS_SHOW)) {
            $toggle.dropdown('show');
        }
    }

    function handleMouseLeave(menuItem, breakpoint, timeout) {
        if (getClientWidth() < breakpoint) {
            return;
        }
        const $toggle = $(this).find(BS_SELECTOR_DATA_TOGGLE).first();
        if (!$toggle || $toggle.length === 0) {
            return;
        }
        if ($toggle.hasClass(BS_CLASS_SHOW) && timeout > 0) {
            let timeoutID = $toggle.data(P3_DATA_TIMEOUT_ID);
            if (timeoutID > 0) {
                clearTimeout(timeoutID);
            }
            $toggle.data(P3_DATA_TIMEOUT_ID, setTimeout(function () {
                if ($toggle.hasClass(BS_CLASS_SHOW)) {
                    $toggle.dropdown('hide');
                }
            }, timeout));
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
    $.fn.p3bsnavbar = function (options) {

        const OPTIONS = $.extend($.fn.p3bsnavbar.defaults, options);

        this.each(function() {
            const $navbar = $(this);
            const $toggles = $navbar.find(BS_SELECTOR_DATA_TOGGLE);
            const OPT = $.extend({}, OPTIONS);

            // Determine navbar expand breakpoint
            let breakpoint = getNavbarBreakpoint(navbar);
            if (breakpoint > 0) {
                OPT.breakpoint = breakpoint;
            }

            // Dispatch custom event on BS_EVENT_SHOW
            $navbar.on(BS_EVENT_SHOW, function(e) {
                $(e.target).trigger($.Event(P3_EVENT_SHOW, P3_EVENT_OPTS));
            });

            // Dispatch custom event on BS_EVENT_HIDE
            $navbar.on(BS_EVENT_HIDE, function(e) {
                $(e.target).trigger($.Event(P3_EVENT_HIDE, P3_EVENT_OPTS));
            });

            // handle BS_EVENT_SHOWN events
            $navbar.on(BS_EVENT_SHOWN, function(e) {
                return handleShownEvent(e, OPT.breakpoint, OPT.closeOthers);
            });

            // handle BS_EVENT_HIDDEN events
            $navbar.on(BS_EVENT_HIDDEN, function(e) {
                return handleHiddenEvent(e);
            });

            // handle BS_EVENT_CLICK_DATA_API events
            $navbar.on(BS_EVENT_CLICK_DATA_API, function(e) {
                return handleClickDataApiEvent(e, OPT.hover, OPT.timeout);
            });

            //------------------------------------------------------------------
            // CLOSE MENUS ON OPT.breakpoint CROSSING
            //------------------------------------------------------------------
            let previousWidth = getClientWidth();
            $window.on('resize', function(e) {
                previousWidth = handleBreakpointCrossing($navbar, breakpoint, previousWidth);
            });
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            // ACTIVATE HOVER DROPDOWN
            //------------------------------------------------------------------
            if (OPT.hover) {
                activateHover($navbar, OPT.breakpoint, OPT.timeout)
            }
            //------------------------------------------------------------------

            //------------------------------------------------------------------
            // CLOSE EXTERNAL DROPDOWNS ON SHOWING NAVBAR DROPDOWNS
            //------------------------------------------------------------------
            $document.on(P3_EVENT_SHOWN, function (e) {
                closeExternalDropdowns($navbar);
            });
            //------------------------------------------------------------------
        });
    };

    $.fn.p3bsnavbar.defaults = {
        breakpoint: 768,
        hover: false,
        timeout: 250,
        closeOthers: false,
    };
//------------------------------------------------------------------------------
}(window.jQuery));
