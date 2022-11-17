$(document).ready(function() {
    var $u = _.noConflict();

    var query;
    function set_query()  {
        var hash_params = window.location.hash.replace('#', '').split('&');
        var q_str =  $u.find(hash_params, function(i) {
            var s = i.split('='); return s[0] === 'stq';
        });
        query = q_str && decodeURIComponent(q_str.split('=')[1]);
    }

    function search_renderer(document_type, item) {
        item.query = query;
        return _search_renderer(item);
    };

    // Search item renderer
    var _search_renderer = $u.template(
        '<li style="overflow: hidden;">' +
            '<a href="<%= url %>?highlight=<%= query %>"><%= title %></a>' +
            '<div class="context"><%= highlight.body %></div>' +
        '</li>'
    );

    var results_renderer = function (ctx, data) {
        var $resultContainer = ctx.resultContainer,
        config = ctx.config;

        $resultContainer.html('');

        $.each(data.records, function (documentType, items) {
            $.each(items, function (idx, item) {
                ctx.registerResult($(config.renderFunction(documentType, item)).hide().appendTo($resultContainer).fadeIn(), item);
            });
        });

        pagination_renderer(ctx, data.info);
    };

    function pagination_renderer(ctx, resultInfo) {
        var maxPagesType, maxPages = -1,
        config = ctx.config;
        $.each(resultInfo, function(documentType, typeInfo) {
            if (typeInfo.num_pages > maxPages) {
                maxPagesType = documentType;
                maxPages = typeInfo.num_pages;
            }
        });
        var currentPage = resultInfo[maxPagesType].current_page,
        totalPages = resultInfo[maxPagesType].num_pages;

        var pages = '<div class="st-page">', previousPage, nextPage;
        if (currentPage != 1) {
            previousPage = currentPage - 1;
            pages = pages +
                '<a href="#" class="btn btn-neutral" data-hash="true" data-page="' + previousPage + '">' +
                    '<span class="fa fa-arrow-circle-left"></span> Previous' +
                '</a>';
        }
        if (currentPage < totalPages) {
            nextPage = currentPage + 1;
            pages = pages +
                '<a href="#" class="btn btn-neutral float-right" data-hash="true" data-page="' + nextPage + '">' +
                    'Next <span class="fa fa-arrow-circle-right"></span>' +
                '</a>';
        }
        pages += '</div>';
        return $(pages).appendTo(ctx.resultContainer);
    };

    // All the Swifttype bindings
    $("#st-search-input").swiftype({
        engineKey: "q5hCbAAGod8wgvgC5Hwq"
    });

    $("#search-form").submit(function(event) {
        event.preventDefault();
        var $container = $('#search-results');
        if (!$container) {
            var $container = $('<div>').attr('id', 'search-results');
            $container.appendTo($('.document'));
            $('<h2>').text('Search Results').appendTo($container);
            $('<ul>').addClass('search-results-list').appendTo($container);
        }

        var query = $('#st-search-input').val();
        if (!query.length) { return false; }
        $('#search-results h2').text('Search Results For: "' + query + '"');

        var loc = window.location.pathname.split('/');
        var new_loc = loc.splice(0, 3).concat('search.html#stq=' + encodeURIComponent(query));
        window.location = new_loc.join('/');
    });

    // set up search
    $("#st-search-input").swiftypeSearch({
        engineKey: "q5hCbAAGod8wgvgC5Hwq",
        resultContainingElement: ".search-results-list",
        renderFunction: search_renderer,
        renderResultsFunction: results_renderer,
        preRenderFunction: set_query
    });

    set_query();
    if (query) {
        $('#st-search-input').val(query);
        $('#search-results h2').text('Search Results For: "' + query + '"');
    }

});
