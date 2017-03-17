jQuery(function () {
    jQuery.fn.isOnScreen = function () {
        var win = jQuery(window);
        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    var width;
    var isLargeScreen = false;
    var isMediumScreen = false;
    var isSmallScreen = false;
    var isExtraSmallScreen = false;

    // console.log('INIT TEST 0');
    var isInitializationInProgress = false;

    function initialize() {

        // console.log("TEST 1");

        // var triggerRenderingIsFinishedElement = jQuery('#duadvisor-main-header-component');
        // var triggerRenderingIsFinishedElement = jQuery('.duadvisor-home-component-wrapper');
        // console.log(triggerRenderingIsFinishedElement);

        if (isInitializationInProgress) {
            return;
        }
        isInitializationInProgress = true;

        setTimeout(function () {
            // console.log("TEST 2");
            isInitializationInProgress = false;

            updateScreenSize();
            // initMainNavigation();

            if (isSmallScreen) {
                initTop10Slider();
                initClickListeners(75);
                initCalendarSliderMobile();
                initOnScrollMenu(100);
                // initMobilemenu();
                initMobileSubpageSliderFirst();
                initMobileSubpageSliderSecond();
                initTableSlider();
            } else if (isExtraSmallScreen) {
                initOldAndroidSupport(335);
                initTop10Slider();
                initClickListeners(75);
                initCalendarSliderMobile();
                initOnScrollMenu(45);
                // initMobilemenu();
                initMobileSubpageSliderFirst();
                initMobileSubpageSliderSecond();
                initTableSlider();
            } else {
                initClickListeners(82);
                initCalendarSlider();
                initOnScrollMenu(200);
                initHeaderUpSubmenu();
                initTableSlider();
            }

        }, 100);

    }

    // make available to call it from Angular with $window service
    window.initializeExternalUIcomponents = initialize;

    // TODO(stepanic): move to angular
    // setTimeout(function () {
    //     initialize();
    // }, 1000);

    window.onresize = function (event) {
        updateScreenSize();
    };

    jQuery(window).on("orientationchange", function (event) {
        initialize();
    });

    function updateScreenSize() {

        width = (window).innerWidth;

        if (width < 680) {
            isLargeScreen = false;
            isMediumScreen = false;
            isSmallScreen = false;
            isExtraSmallScreen = true;
        } else if (width < 992) {
            isLargeScreene = false;
            isMediumScreen = false;
            isSmallScreen = true;
            isExtraSmallScreen = false;
        } else if (width < 1200) {
            isLargeScreen = false;
            isMediumScreen = true;
            isSmallScreen = false;
            isExtraSmallScreen = false;
        } else {
            isLargeScreen = true;
            isMediumScreen = false;
            isSmallScreen = false;
            isExtraSmallScreen = false;
        }

    }

    // function initMainNavigation() {

    //     /* timeout of 0.05 sec for better Mozilla support */

    //     if (isLargeScreen || isMediumScreen) {

    //         jQuery(".nav-submenu").mouseenter(function () {
    //             jQuery(this).parent().addClass("submenu-active");
    //         });

    //         jQuery(".nav-submenu").mouseleave(function () {
    //             var thisElement = jQuery(this);
    //             if (thisElement.siblings(".nav-link-big:hover").length <= 0) {
    //                 thisElement.parent().removeClass("submenu-active");
    //             }
    //         });

    //         jQuery(".nav-link-big").mouseenter(function () {
    //             jQuery(this).parent().addClass("submenu-active");
    //         });

    //         jQuery(".nav-link-big").mouseleave(function () {
    //             if (jQuery(this).closest(".nav-submenu:hover").length <= 0) {
    //                 jQuery(this).parent().removeClass("submenu-active");
    //             }
    //         });

    //     } else {

    //     }

    // }

    function initHeaderUpSubmenu() {

        /* timeout of 0.2 sec for better Mozilla support */

        // jQuery("#arrow-lang").click(function () {
        //     var thisElement = jQuery(this);

        //     console.log('klik');

        //     if (jQuery("#header-lang").hasClass("submenu-active")) {
        //         thisElement.closest("#header-lang").removeClass("submenu-active");
        //     } else {
        //         thisElement.closest("#header-lang").addClass("submenu-active");
        //     }
        // });

        // jQuery(".nav-submenu-small").mouseleave(function () {
        //     var thisElement = jQuery(this);
        //     setTimeout(function () {
        //         if (thisElement.siblings(".lang-choice-contain:hover").length <= 0) {
        //             thisElement.parent().removeClass("submenu-active");
        //         }
        //     }, 200);
        // });

        // jQuery(".lang-choice-contain").mouseleave(function () {
        //     var thisElement = jQuery(this);
        //     setTimeout(function () {
        //         if (thisElement.siblings(".nav-submenu-small:hover").length <= 0) {
        //             thisElement.parent().removeClass("submenu-active");
        //         } else {

        //         }
        //     }, 200);
        // });

        // jQuery("#arrow-weather").click(function () {
        //     var thisElement = jQuery(this);
        //     if (jQuery("#header-weather").hasClass("submenu-active")) {
        //         thisElement.closest("#header-weather").removeClass("submenu-active");
        //     } else {
        //         thisElement.closest("#header-weather").addClass("submenu-active");
        //     }
        // });

        // jQuery(".nav-submenu-small").mouseleave(function () {
        //     var thisElement = jQuery(this);
        //     setTimeout(function () {
        //         if (thisElement.siblings(".lang-choice-contain:hover").length <= 0) {
        //             thisElement.parent().removeClass("submenu-active");
        //         }
        //     }, 200);
        // });

        // jQuery(".options-contain").mouseleave(function () {
        //     var thisElement = jQuery(this);
        //     setTimeout(function () {
        //         if (thisElement.siblings(".nav-submenu-small:hover").length <= 0) {
        //             thisElement.parent().removeClass("submenu-active");
        //         } else {

        //         }
        //     }, 200);
        // });
    }

    function initOnScrollMenu(pixNum) {

        window.addEventListener('scroll', function (e) {
            var distanceY = window.pageYOffset || document.documentElement.scrollTop
                , shrinkOn = pixNum
            if (distanceY > shrinkOn) {
                jQuery("header").addClass("header-small");
                jQuery("#expand-arrow").fadeOut();
            } else {
                if (jQuery(".header-small").length > 0) {
                    jQuery(".header-small").removeClass("header-small");
                    jQuery("#expand-arrow").fadeIn();
                }
            }
        });

    }

    function initClickListeners(headerHeight) {

        jQuery("#expand-arrow").click(function () {
            jQuery('html, body').animate({
                scrollTop: jQuery("#sec-top-ten").offset().top - headerHeight
            }, 1000);
        });

        //     jQuery(".sidebar-checkbox").click(function () {
        //         var thisElem = jQuery(this);
        //         if (thisElem.parent().index() === 0) {
        //             if (thisElem.hasClass("checkbox-all")) {
        //                 thisElem.parent().siblings().children(".sidebar-checkbox").prop('checked', false);
        //                 thisElem.prop('checked', true);
        //             }
        //         } else {
        //             thisElem.closest("ul").children().eq(0).children(".checkbox-all").prop('checked', false);
        //             // thisElem.prop('checked',false);
        //         }
        //     });

    }

    function initTableSlider() {

        if (isSmallScreen) {
            var tableDrag = new Dragdealer("table-slider", {
                steps: 2
            });
        } else if (isExtraSmallScreen) {
            var tableDrag = new Dragdealer("table-slider", {
                steps: 4
            });
        }

        if (isSmallScreen || isExtraSmallScreen) {
            jQuery("#slider-table-left").click(function () {
                var step = parseInt(tableDrag.getStep()) - 1;
                tableDrag.setStep(step, 0);
            });

            jQuery("#slider-table-right").click(function () {
                var step = parseInt(tableDrag.getStep()) + 1;
                tableDrag.setStep(step, 0);
            });
        }

        var height = jQuery(".discount-single-item-table").height() + 40;
        jQuery("#table-slider").css("height", height + "px");

    }

    function initCalendarSlider() {

        var sliderItemContainWidth = jQuery(".slider-item").width();
        var numberOfSliderItems = jQuery(".slider-item").length;
        var sliderContainerWidth = sliderItemContainWidth * numberOfSliderItems;

        jQuery("#slider-entry-container").css("width", sliderContainerWidth + "px");

        var disabled = false;

        if(isExtraSmallScreen || isSmallScreen) {
            disabled = true;
        }

        var draggie = new Dragdealer("slider", {
            steps: numberOfSliderItems - 3,
            speed: 0.3,
            loose: false,
            requestAnimationFrame: true,
            disabled: disabled
        });

        var mask = jQuery("#slider").width();

        if (sliderContainerWidth <= mask) {
            draggie.disable();
        }

        jQuery("#slider-left").click(function () {
            var step = parseInt(draggie.getStep()) - 1;
            draggie.setStep(step, 0);
        });

        jQuery("#slider-right").click(function () {
            var step = parseInt(draggie.getStep()) + 1;
            draggie.setStep(step, 0);
        });

    /*    jQuery(window).bind('mousewheel DOMMouseScroll', function (event) {
            if (jQuery("#slider:hover").length) {
                if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                    var step = parseInt(draggie.getStep()) - 1;
                    draggie.setStep(step, 0);
                }
                else {
                    var step = parseInt(draggie.getStep()) + 1;
                    draggie.setStep(step, 0);
                }
            }
        });

        jQuery("#slider").mouseenter(function () {
            var jQuerybody = jQuery(document.body);
            var oldWidth = jQuerybody.innerWidth();
            jQuerybody.css("overflow", "hidden");
            jQuerybody.width(oldWidth);
            jQuery("header").width(oldWidth);
        });

        jQuery("#slider").mouseleave(function () {
            var jQuerybody = jQuery(document.body);
            jQuerybody.css("overflow", "auto");
            jQuerybody.width("auto");
            jQuery("header").width("100%");
        });

        jQuery("#slider").click(function () {
            var jQuerybody = jQuery(document.body);
            jQuerybody.css("overflow", "auto");
            jQuerybody.width("auto");
            jQuery("header").width("100%");
        });*/
    }

/*    window.cleanUpCalendarSlider = function () {
        var jQuerybody = jQuery(document.body);
        jQuerybody.css("overflow", "auto");
        jQuerybody.width("auto");
        jQuery("header").width("100%");
    };*/

    function initCalendarSliderMobile() {
        var sliderItemContainWidth = jQuery(".slider-item").width();
        var numberOfSliderItems = jQuery(".slider-item").length;
        var sliderContainerWidth = sliderItemContainWidth * numberOfSliderItems + 15;

        jQuery("#slider-entry-container").css("width", sliderContainerWidth + "px");

        var draggie = new Dragdealer("slider", {
            steps: numberOfSliderItems - 2,
            speed: 0.3,
            loose: false,
            requestAnimationFrame: true,
            disabled: false
        });

        var mask = jQuery("#slider").width();

        if (sliderContainerWidth <= mask) {
            draggie.disable();
        }

        jQuery("#slider-left").click(function () {
            var step = parseInt(draggie.getStep()) - 1;
            draggie.setStep(step, 0);
        });

        jQuery("#slider-right").click(function () {
            var step = parseInt(draggie.getStep()) + 1;
            draggie.setStep(step, 0);
        });

    }

    function initTop10Slider() {
        var sliderItemContainWidth = jQuery(".top-10-item").width();
        var numberOfSliderItems = jQuery(".top-10-item").length;
        var sliderContainerWidth = numberOfSliderItems * sliderItemContainWidth + (15 * numberOfSliderItems);
        jQuery("#mobile-slider-top-10").addClass("dragdealer");
        jQuery(".top-10-items-contain").addClass("handle").css("width", sliderContainerWidth + "px");

        var onScreenItemsCounter = 0;
        var stepNumber;

        jQuery(".top-10-item").each(function () {
            if (jQuery(this).isOnScreen()) {
                onScreenItemsCounter++;
            }
        });

        if(isExtraSmallScreen || isSmallScreen) {
            disabled = false;
        }

        stepNumber = numberOfSliderItems - onScreenItemsCounter + 1;

        var draggieTop10 = new Dragdealer("mobile-slider-top-10", {
            steps: stepNumber,
            speed: 0.3,
            loose: false,
            horizontal: true,
            vertical: false,
            requestAnimationFrame: true,
            disabled: disabled
        });

        var mask = jQuery("#mobile-slider-top-10").width();

        if (sliderContainerWidth <= mask) {
            draggie.disable();
        }

        jQuery("#top-10-slider-left").click(function () {
            var step = parseInt(draggieTop10.getStep()) - 1;
            draggieTop10.setStep(step, 0);
        });

        jQuery("#top-10-slider-right").click(function () {
            var step = parseInt(draggieTop10.getStep()) + 1;
            draggieTop10.setStep(step, 0);
        });
    }

    // function initMobilemenu() {
    //     jQuery("#hamburger-icon").click(function () {
    //         if (jQuery(".menu-opened").length <= 0) {
    //             jQuery("#mobile-menu").addClass("menu-opened");
    //             jQuery("header").css("position", "absolute");
    //             window.scrollTo(0, 0);
    //         }
    //     });
    //     jQuery("#menu-close").click(function () {
    //         if (jQuery(".menu-opened").length > 0) {
    //             jQuery("#mobile-menu").removeClass("menu-opened");
    //             jQuery("header").css("position", "fixed");
    //         }
    //     });
    // }

    function initMobileSubpageSliderFirst() {
        var sliderContainerWidth = 0;
        var onScreenItemsCounter = 0;
        var stepNumber;
        var sliderWidth = jQuery("#slider-up").width();

        jQuery(".slider-up-list-item").each(function () {
            var itemWidth = jQuery(this).width() + 26;
            sliderContainerWidth = sliderContainerWidth + itemWidth;
            if (jQuery(this).isOnScreen()) {
                onScreenItemsCounter++;
            }
        });

        if (sliderContainerWidth > sliderWidth) {

            jQuery("#slider-up").siblings(".fadeout-helper").show();

            jQuery("#slider-up").children(".fadeout-switch").addClass("fadeout");
            jQuery("#slider-up.slider-up-map").children(".fadeout-switch").addClass("fadeout-map");

            var numberOfSliderItems = jQuery(".slider-up-list-item").length;
            jQuery("#slider-up-container").css("width", sliderContainerWidth + "px");

            stepNumber = numberOfSliderItems - onScreenItemsCounter;

            var draggieSubpage1 = new Dragdealer("slider-up", {
                steps: stepNumber,
                speed: 0.3,
                loose: false,
                requestAnimationFrame: true
            });
        }

        // jQuery(".slider-up-list-item").click(function () {
        //     var thisItem = jQuery(this);
        //     if (thisItem.hasClass("list-item-all")) {
        //         jQuery(".subpage-slider-up-active").removeClass("subpage-slider-up-active");
        //     } else {
        //         jQuery(".list-item-all").removeClass("subpage-slider-up-active");
        //     }
        //     if (thisItem.hasClass("subpage-slider-up-active")) {
        //         thisItem.removeClass("subpage-slider-up-active");
        //     } else {
        //         thisItem.addClass("subpage-slider-up-active");
        //     }
        // });
    }

    function initMobileSubpageSliderSecond() {
        var sliderContainerWidth = 0;
        var onScreenItemsCounter = 0;
        var stepNumber;
        var sliderWidth = jQuery("#slider-down").width();

        jQuery(".slider-down-list-item").each(function () {
            var itemWidth = jQuery(this).width() + 26;
            sliderContainerWidth = sliderContainerWidth + itemWidth;
            if (jQuery(this).isOnScreen()) {
                onScreenItemsCounter++;
            }
        });

        if (sliderContainerWidth > sliderWidth) {

            jQuery("#slider-down").siblings(".fadeout-helper").show();

            jQuery("#slider-down").children(".fadeout-switch").addClass("fadeout");

            var numberOfSliderItems = jQuery(".slider-down-list-item").length;
            jQuery("#slider-down-container").css("width", sliderContainerWidth + "px");

            stepNumber = numberOfSliderItems - onScreenItemsCounter;

            var draggieSubpage2 = new Dragdealer("slider-down", {
                steps: stepNumber,
                speed: 0.3,
                loose: false,
                requestAnimationFrame: true
            });
        }

        // jQuery(".slider-down-list-item").click(function () {
        //     var thisItem = jQuery(this);
        //     if (thisItem.hasClass("list-item-all")) {
        //         jQuery(".subpage-slider-down-active").removeClass("subpage-slider-down-active");
        //     } else {
        //         jQuery(".list-item-all").removeClass("subpage-slider-down-active");
        //     }
        //     if (thisItem.hasClass("subpage-slider-down-active")) {
        //         thisItem.removeClass("subpage-slider-down-active");
        //     } else {
        //         thisItem.addClass("subpage-slider-down-active");
        //     }
        // });
    }

    function initOldAndroidSupport(value) {

        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var width = w - ((w - value) / 2);

        // HACK for small screens iPhone 5s SE
        if (width <= 344) {
            width -= 20;
        }

        jQuery(".mobile-slider-width").width(width);
    }

});
