import "bootstrap";
import jquery from "jquery"


/** This is just a quick and dirty example showing how to write some custom functionality */

var Foundation = Foundation || {};
Foundation.Theming = Foundation.Theming || {};

Foundation.Theming.themeSwitcher = {
    init: () => {
        let $themeSwitchers = jquery(".js-theme-switcher");
        if ($themeSwitchers.length <= 0) return;
        $themeSwitchers.click((e) => {
            let themeFile = jquery(e.target).data("theme-file");
            if (themeFile.length <= 0) return;
            jquery("head link#themeStylesheet").attr("href", themeFile);
        });
    }
}
Foundation.Theming.themeSwitcher.init();
