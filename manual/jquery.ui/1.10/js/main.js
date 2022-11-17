jqapi = function () {
    var elements = {};

    var values = {
        searchHeight: null,
        selected: 'selected',
        category: 'category',
        open: 'open',
        catSelected: 'cat-selected',
        sub: 'sub',
        hasFocus: true,
        loader: '<div id="loader"></div>',
        title: 'jQuery 1.8  中文API (适用jQuery 1.8/jQuery 1.8.1/jQuery 1.8.2/jQuery 1.8.3)- '
    };

    var keys = {
        enter: 13,
        escape: 27,
        up: 38,
        down: 40,
        array: [13, 27, 38, 40]
    }


    function initialize() {
        elements = {
            search: $('#search-field'),
            searchWrapper: $('#search'),
            content: $('#content'),
            list: $('#static-list'),
            window: $(window),
            results: null,
            category: null
        };

        elements.results = jQuery('<ul>', { id: 'results' }).insertBefore(elements.list);
        elements.category = $('.category', elements.list);
        values.searchHeight = elements.searchWrapper.innerHeight();

        elements.window.resize(function () {
           /* var winH = elements.window.height() - 38;
            var listH = winH - values.searchHeight;

            elements.list.height(listH);
            elements.results.height(listH);
            elements.content.height(winH - 63);
            elements.search.width(elements.searchWrapper.width() - 8);*/
        })
            .mousemove(function (event) {
                if (event.pageX < elements.list.width()) searchFocus();
            })
            .keydown(function (event) {
                if (event.keyCode == keys.escape) {
                    elements.search.val('').focus();
                    elements.results.hide();
                    elements.list.show();
                }
            })
            .trigger('resize'); //trigger resize event to initially set sizes

        elements.search.keyup(function (event) {
            if ($.inArray(event.keyCode, keys.array) != -1) { //it is an event key
                handleKey(event.keyCode);
            } else { //it is a character
                startSearch();
            }
        })
            .focus(function () {
                values.hasFocus = true;
            })
            .blur(function () {
                values.hasFocus = false;
            })
            .focus();

        $('.' + values.category + ' > span', elements.list).toggle(function () {
            clearSelected();
            searchFocus();
            $(this).parent().addClass(values.open).children('ul').show();
        }, function () {
            clearSelected();
            searchFocus();
            $(this).parent().removeClass(values.open).children('ul').hide();
        });

        /*$('.sub a').live('click', function () {
            var el = $(this);

            clearSelected();
            searchFocus();
            el.parent().addClass(values.selected);
            $.bbq.pushState({ p: urlMethodName(el) });

            return false;
        });*/

        $(window).bind('hashchange',function (event) {
            var state = event.getState();

            //if (state.p) loadPage($('.sub a[href*="/' + state.p + '/"]:first'));
        }).trigger('hashchange');

        zebraItems(elements.list); //zebra the items in the static list
        formatArticle();
    } //-initialize


    function searchFocus() {
        elements.search.focus();
    } //-searchFocus


    function zebraItems(list) {
        $('.sub:odd', list).addClass('odd');
    } //-zebraItems


    function clearSelected() {
        $('.' + values.selected).removeClass(values.selected);
    } //-clearSelected


    function handleKey(key) {
        if (values.hasFocus) {
            var selVis = $('.' + values.selected + ':visible');

            if (selVis.length) {
                if (key == keys.up && selVis.prev().length)    selVis.removeClass(values.selected).prev().addClass(values.selected);
                if (key == keys.down && selVis.next().length)  selVis.removeClass(values.selected).next().addClass(values.selected);
                if (key == keys.enter)                         $.bbq.pushState({ p: urlMethodName(selVis.children('a')) });
            } else { //no visible selected item
                var catSel = $('.' + values.catSelected, elements.list);

                if (catSel.length) { //a category is selected
                    if (key == keys.up)    catSel.removeClass(values.catSelected).prev().addClass(values.catSelected);
                    if (key == keys.down)  catSel.removeClass(values.catSelected).next().addClass(values.catSelected);
                    if (key == keys.enter) catSel.removeClass(values.catSelected).children('span').trigger('click');
                } else { //no category selected
                    var subVis = $('.' + values.sub + ':visible', elements.list);

                    if (subVis.length) { //there are visible subs in the static list
                        if (key == keys.up)    subVis.filter(':last').addClass(values.selected);
                        if (key == keys.down)  subVis.filter(':first').addClass(values.selected);
                    } else { //only categories are shown
                        if (key == keys.up)    elements.category.last().addClass(values.catSelected);
                        if (key == keys.down)  elements.category.first().addClass(values.catSelected);
                    }
                }
            }
        }
    } //-handleKey


    function urlMethodName(link) {
        var href = link.attr('href');
        return href.substr(5, href.length - 16);
    } //-urlMethodName


    function loadPage(link) {
        elements.content.html(values.loader).load(link.attr('href'), function () {
            document.title = values.title + link.children('span:first').text();
            pageTracker._trackPageview(urlMethodName(link));
            formatArticle();
        });
    } //-loadPage


    function formatArticle() {
        var pDesc = $('p.desc', elements.content);

        $('.arguement:odd', elements.content).addClass('arguement-odd');
        if (pDesc.text().length <= 13) pDesc.remove();


        $('.signatures', elements.content).each(function () {
            var winner = 0;
            var arg = $(this).find('.arguement');

            arg.children('strong').each(function () {
                var width = $(this).width();
                if (width > winner) winner = width;
            });

            arg.css('padding-left', winner + 50);
        });

        buildDemos();
    } //-formatArticle


    function buildDemos() {
        $( ".entry-example" ).each(function() {
            		var iframeSrc,
            			src = $( this ).find( ".syntaxhighlighter" ),
            			output = $( this ).find( ".code-demo" );

            		if ( !src.length || !output.length ) {
            			return;
            		}

            		// Get the original source
            		iframeSrc = src.find( "td.code .line" ).map(function() {
            			// Convert non-breaking spaces from highlighted code to normal spaces
            			return $( this ).text().replace( /\xa0/g, " " );
            		// Restore new lines from original source
            		}).get().join( "\n" );

            		iframeSrc = iframeSrc
            			// Insert styling for the live demo that we don't want in the
            			// highlighted code
            			.replace( "</head>",
            				"<style>" +
            					"html, body { border:0; margin:0; padding:0; }" +
            					"body { font-family: 'Helvetica', 'Arial',  'Verdana', 'sans-serif'; }" +
            				"</style>" +
            				"</head>" )
            			// IE <10 executes scripts in the order in which they're loaded,
            			// not the order in which they're written. So we need to defer inline
            			// scripts so that scripts which need to be fetched are executed first.
            			.replace( /<script>([\s\S]+)<\/script>/,
            				"<script>" +
            				"window.onload = function() {" +
            					"$1" +
            				"};" +
            				"</script>" );

            		var iframe = document.createElement( "iframe" );
            		iframe.width = "100%";
            		iframe.height = output.attr( "data-height" ) || 250;
            		output.append( iframe );

            		var doc = (iframe.contentWindow || iframe.contentDocument).document;
            		doc.write( iframeSrc );
            		doc.close();
            	});
    } //-buildDemos

    function startSearch() {
        elements.search.doTimeout('text-type', 300, function () {
            var term = elements.search.val();

            if (term.length) {
                elements.results.html('').show();
                elements.list.hide();

                var lastPos = 100;
                var winner = $;

                $('.searchable', elements.list).each(function () {
                    var el = $(this);
                    var name = el.text();
                    var pos = name.toLowerCase().indexOf(term.toLowerCase());

                    if (pos != -1 && elements.results.text().indexOf(name) == -1) {
                        var lastLi = jQuery('<li>', {
                            'class': 'sub',
                            html: el.parent().parent().html()
                        }).appendTo(elements.results);

                        if (pos < lastPos) {
                            lastPos = pos;
                            winner = lastLi;
                        }
                    }
                });

                elements.results.prepend(winner).highlight(term, true, 'highlight').children('li:first').addClass(values.selected);
                zebraItems(elements.results);
            } else {
                elements.results.hide();
                elements.list.show();
            }
        });
    } //-startSearch


    return {
        initialize: initialize
    }
}();


$(document).ready(function () {
    /*var navigation_el = $('#navigation').load('navigation.html', function () { //load the navigation (not static because it gets generated with the api scraping)

    });*/
    jqapi.initialize();

    var feedback = $('#feedback').click(function () {
        var link = $(this).attr('href');
        var fwindow = $('#feedback-window');
        var foverlay = $('#feedback-overlay');

        if (!fwindow.length) {
            var bod = $('body');
            var win = $(window);
            var winw = win.width();
            var winh = win.height();

            fwindow = jQuery('<div>', {
                id: 'feedback-window',
                css: { left: (winw - 920) / 2, height: winh - 100 },
                html: jQuery('<iframe>', { src: link })
            }).appendTo(bod);

            foverlay = jQuery('<div>', {
                id: 'feedback-overlay',
                css: { width: winw, height: winh },
                click: function () {
                    $(this).fadeOut('fast');
                    fwindow.fadeOut('fast');
                }
            }).appendTo(bod);

            jQuery('<a>', {
                html: '&otimes; Close',
                href: '#close',
                css: { left: (winw - 920) / 2 },
                click: function () {
                    foverlay.click();
                    return false;
                }
            }).appendTo(foverlay);
        }

        foverlay.fadeIn('fast');
        fwindow.fadeIn('fast');

        return false;
    });

    $('#feedback-trigger').click(function () {
        feedback.trigger('click');
        return false;
    });


});