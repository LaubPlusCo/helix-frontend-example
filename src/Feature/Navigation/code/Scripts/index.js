import jQuery from "jquery"
import "jquery.easing/jquery.easing.js"

var Feature = Feature || {};
Feature.Navigation = Feature.Navigation || {};

Feature.Navigation.primary = {
    setScroll: () => {
        jQuery('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = jQuery(this.hash);
                target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    jQuery('html, body').animate({
                        scrollTop: (target.offset().top - 54)
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
        });
        jQuery('.js-scroll-trigger').click(function () {
            jQuery('.navbar-collapse').collapse('hide');
        });
        jQuery('body').scrollspy({
            target: '#mainNav',
            offset: 56
        });
    },
    setShrinkClass: () => {
        if (jQuery("#mainNav").offset().top > 100) {
            jQuery("#mainNav").addClass("navbar-shrink");
        } else {
            jQuery("#mainNav").removeClass("navbar-shrink");
        }
    },
    hideOnModal: () => {
        // ...
    },
    init: () => {
        Feature.Navigation.primary.setScroll();
        Feature.Navigation.primary.setShrinkClass();
        jQuery(window).scroll(Feature.Navigation.primary.setShrinkClass);
    }
}

Feature.Navigation.primary.init();
