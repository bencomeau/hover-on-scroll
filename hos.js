/**
 * Hover on Scroll
 * A jQuery plugin that displays hover affects on mobile during scrolling
 * See www.bencomeau.com/hover-on-scroll for more information
 * Version 1.0, October 15 2015
 * by Ben Comeau
 */

(function($) {

    $.hos = function(element, options) {

        /**
         * Default settings/options
         * These can and should be overridden when calling the plugin; avoid changing here
         * small: 
         *     - Defines what screen sizes the plugin should show on: default 768
         *     - Refers to the maximum width of the window that we should show the feature on
         *     - Larger numbers mean the plugin will fire on larger screens
         * showAt:
         *     - Defines when the overlay should show: default 100
         *     - Refers to the number of pixels the element has visible at the bottom of the screen
         * hideAt:
         *     - Defines when the overlay should hide: 250
         *     - Refers to the number of pixels the element is from the top of the screen
         * applyTo:
         *     - Defines what element the style should be applied to: default is element that the plugin is attached to
         *     - User-specific setting MUST be a nested element
         *     - Pass to this the class or ID of the element
         * toggleClass:
         *     - Defines the class that should be toggled on/off during scroll: default false
         *     - User can/should specify the class they want toggled during scroll, otherwise plugin will do inline styles
         *     - Example of a class to toggle: noOpacity { opacity: .9 }
         * opacity:
         *     - Defines the amount of opacity the "hover" element should have: default .9 (allows content to show underneath so user knows they can touch it)
         */
        var defaults = {
            small: 768,
            showAt: 100,
            hideAt: 250,
            applyTo: element,
            toggleClass: false,
            opacity: .9
        };

        /**
         * Current instance of the object (to keep `this` less confusing)
         */
        var plugin = this;

        /**
         * Holds the merged default and the user-provided options
         * Properties will be available in two ways:
         * inside: plugin.settings.propertyName
         * outside: element.data('hos').settings.propertyName
         */
        plugin.settings = {};

        /**
         * Default parameters of the plugin
         * Cannot be adjusted when setting the plugin
         * Not recommended to change
         */
        plugin.parameters = {
            didScroll: false,
            docElem: document.documentElement,
            windowHeight: window.innerHeight || document.documentElement.clientHeight
        };

        /**
         * Method to sort whether or not we actually display the hovering (main functionality)
         * Defines:
         *     - y: scrollY amount
         *     - applyTo: the element to apply the changes to
         *     - offsetTop: top offset of the element
         *     - isActive: boolean and defines whether or not the element is currently showing the hover effect
         * Shows hover effect when:
         *     - The element is within the "viewing port" of the settings, showAt and hideAt
         * Hides hover effect when:
         *     - The element is outside the "viewing port" of the settings, showAt and hideAt, and is active
         */
        plugin.hoverAffect = function() {
            y = plugin.scrollY();
            applyTo = element === plugin.settings.applyTo ? element : $(element).find(plugin.settings.applyTo);
            offsetTop = $(element).offset().top;
            isActive = $(applyTo).hasClass(plugin.settings.toggleClass) || $(applyTo).css('opacity') == plugin.settings.opacity;
        
            if ( (y + plugin.parameters.windowHeight - offsetTop >= plugin.settings.showAt) && (offsetTop - y >= plugin.settings.hideAt) ) {
                plugin.settings.toggleClass ? $(applyTo).addClass(plugin.settings.toggleClass) : $(applyTo).css('opacity', plugin.settings.opacity);
            } else if ( isActive ) {
                plugin.settings.toggleClass? $(applyTo).removeClass(plugin.settings.toggleClass) : $(applyTo).css('opacity', 0);
            }

            plugin.parameters.didScroll = false;
        };

        /**
         * Method to return the scrollY amount
         */
        plugin.scrollY = function() {
            return window.pageYOffset || plugin.parameters.docElem.scrollTop;
        };

        /**
         * Reference to the jQuery version of the DOM element and
         * to the actual DOM element, respectively
         */
        var $element = $(element), element = element;

        /**
         * The "constructor" method that gets called when the object is created
         */
        plugin.init = function() {

            /**
             * Final plugin properties (merged default with user-provided, if any)
             */
            plugin.settings = $.extend({}, defaults, options);

            
            /**
             * Only activate the plugin functionality if the screen size is <= to the plugin's setting of small
             */
            if (window.innerWidth <= plugin.settings.small) {

                /**
                 * Attach an (scroll) event listener to the window
                 */
                window.addEventListener('scroll', function(event) {
                    
                    /**
                     * If not scrolling
                     */
                    if (!plugin.parameters.didScroll) {

                        /**
                         * Set the plugin parameter scroll boolean to true, signaling that we are scrolling
                         */
                        plugin.parameters.didScroll = true;

                        /**
                         * Call hover affect method
                         * setTimeout delays the call to prevent bubbling
                         */
                        setTimeout(plugin.hoverAffect(element), 500);
                    }
                }, false);

            }

        };

        /**
         * Call constructor method to start the plugin
         */
        plugin.init();

    };

    /**
     * Add plugin to the jQuery.fn object
     */
    $.fn.hos = function(options) {

        /**
         * Iterate over the DOM elements we want to attach the plugin to
         */
        return this.each(function() {

            /**
             * IFF the plugin has not already been attached to element
             * Helpful if the window is resized
             */
            if (undefined === $(this).data('hos')) {

                /**
                 * Create a new instance of the plugin
                 * Pass the DOM element and the user-provided options (if any) as arguments
                 */
                var plugin = new $.hos(this, options);

                /**
                 * For the jQuery version of the element, store a reference to the plugin object
                 * You can later access the plug and its methods/properties using two options:
                 * [0] element.data('hos').publicMethod(arg1, arg2, .... argN)
                 * [1] element.data('hos').settings.propertyName
                 */
                $(this).data('hos', plugin);

            }

        });

    };

})(jQuery);