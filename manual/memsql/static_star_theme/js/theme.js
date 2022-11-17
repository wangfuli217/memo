window.MemSQLVersionWidget = (function($) {
    function basename(str) {
        var base = new String(str).substring(str.lastIndexOf('/') + 1);
        return base;
    }

    function V($el) {
        this.$el = $el;
        this.product = $el.data('product');
        this.type = $el.data('type');
        this.loaded = false;

        if (this.product.indexOf('.') >= 0) {
            var parts = this.product.split('.');
            this.product = parts[0];
            this.key_path = parts.slice(1);
        }

        this.render();
        this.load();
    }

    V.prototype.render = function() {
        if (!this.loaded) {
            this.$el.html($("<div><i class='fa fa-gear fa-spin'></i> Retrieving latest version</div>").css({ "padding": "10px" }));
        } else if (this.error_message) {
            this.$el.html(this.error_message);
        } else {
            var $pre = $("<pre></pre>");
            $pre.append("$ wget " + this.data[this.type] + "\n");

            switch (this.type) {
                case "rpm":
                    $pre.append("$ rpm -i " + basename(this.data[this.type]) + "\n");
                    break;
                case "deb":
                    $pre.append("$ dpkg -i " + basename(this.data[this.type]) + "\n");
                    break;
                case "tar":
                    $pre.append("$ tar -xzf " + basename(this.data[this.type]) + "\n");
                    break;
            }
            this.$el.html($pre);
        }
    }

    V.prototype.load = function() {
        $.ajax("http://versions.memsql.com/" + this.product + "/latest", {
            dataType: "json",
            success: $.proxy(this.success, this),
            error: $.proxy(this.error, this),
        });
    }

    V.prototype.success = function(data) {
        this.loaded = true;
        if (this.key_path) {
            this.data = data;
            for (var i = 0, l = this.key_path.length; i < l; i++) {
                this.data = this.data[this.key_path[i]];
            }
        } else {
            this.data = data;
        }

        this.render();
    }

    V.prototype.error = function(xhr, text_status, err) {
        this.loaded = true;
        this.error_message = "Error[" + text_status + "]: " + err;
        this.render();
    }

    return V;
}($));

$(document).ready(function() {

    // Shift nav in mobile when clicking the menu.
    $(document).on('click', "[data-toggle='wy-nav-top']", function() {
        $("[data-toggle='wy-nav-shift']").toggleClass("shift");
        $("[data-toggle='rst-versions']").toggleClass("shift");
    });

    // Close menu when you click a link.
    $(document).on('click', ".wy-menu-vertical .current ul li a", function() {
        $("[data-toggle='wy-nav-shift']").removeClass("shift");
        $("[data-toggle='rst-versions']").toggleClass("shift");
    });

    $(document).on('click', "[data-toggle='rst-current-version']", function() {
        $("[data-toggle='rst-versions']").toggleClass("shift-up");
    });

    // Make tables responsive
    $("table.docutils:not(.field-list)").wrap("<div class='wy-table-responsive'></div>");

    function resize_sidebar() {
        var header_height = $('.wy-full-navbar').outerHeight();
        var search_height = $('.wy-side-nav-search').outerHeight();

        var height = $(window).height() - header_height - search_height;
        $('.wy-menu-vertical').height(height);
    };

    resize_sidebar();
    $(window).on('resize', resize_sidebar);

    var version_widgets = $(".memsql-version-widget").map(function() {
        return new window.MemSQLVersionWidget($(this));
    });
});

window.SphinxRtdTheme = (function (jquery) {
    var stickyNav = (function () {
        var navBar,
        win,
        stickyNavCssClass = 'stickynav',
        applyStickNav = function () {
            if (navBar.height() <= win.height()) {
                navBar.addClass(stickyNavCssClass);
            } else {
                navBar.removeClass(stickyNavCssClass);
            }
        },
        enable = function () {
            applyStickNav();
            win.on('resize', applyStickNav);
        },
        init = function () {
            navBar = jquery('nav.wy-nav-side:first');
            win    = jquery(window);
        };
        jquery(init);
        return {
            enable : enable
        };
    }());
    return {
        StickyNav : stickyNav
    };
}($));

