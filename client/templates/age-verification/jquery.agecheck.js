 /*Reaction CORE functionality */
 getAgeVerification = function(){
    var val = ReactionCore.Collections.AgeVerification.findOne({shopId: ReactionCore.getShopId()});
    if(!val){
        return 18;
    }
    return val;
}
getLogo = function(){
    if (ReactionCore.Subscriptions.Shops.ready()) {
        const shop = ReactionCore.Collections.Shops.findOne(ReactionCore.getShopId());
        if (_.isArray(shop.brandAssets)) {
          const brandAsset = _.find(shop.brandAssets, (asset) => asset.type === "navbarBrandImage");
            if (ReactionCore.Subscriptions.Media.ready()) {
                return ReactionCore.Collections.Media.findOne(brandAsset.mediaId).url();
            }
        }
        return "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOC4xLjEsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4yIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMTAwcHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxyZWN0IHg9IjY2IiB5PSI0NSIgZmlsbD0iIzMzMzMzMyIgd2lkdGg9IjUiIGhlaWdodD0iOCIvPg0KPHJlY3QgeD0iMzkiIHk9IjQ1IiBmaWxsPSIjMzMzMzMzIiB3aWR0aD0iNSIgaGVpZ2h0PSI4Ii8+DQo8cGF0aCBmaWxsPSIjMzMzMzMzIiBkPSJNMTAwLDEyYzAtNi42LTUuNC0xMi0xMi0xMkgxMkM1LjQsMCwwLDUuNCwwLDEydjc2YzAsNi42LDUuNCwxMiwxMiwxMmg3NmM2LjYsMCwxMi01LjQsMTItMTJWMTJ6IE0zMiw1NGgtOQ0KCVY0NGgzdjloNlY1NHogTTQ3LDUzaC0ydjFoLTd2LTFoLTJ2LThoMnYtMWg3djFoMlY1M3ogTTYwLDQ1aC03djhoNHYtM2gtMXYtMmg0djVoLTF2MWgtOHYtMWgtMXYtOGgxdi0xaDlWNDV6IE03NCw1M2gtMnYxaC03di0xDQoJaC0ydi04aDJ2LTFoN3YxaDJWNTN6Ii8+DQo8L3N2Zz4NCg==";
    }
}
/*!
 * Simple Age Verification (https://github.com/Herudea/age-verification))
 */
DEBUG = true;
var modal_content,
modal_screen;

// Start Working ASAP.
$(document).ready(function() {
    if(!ReactionCore.hasAdminAccess() || DEBUG){
        av_legality_check();    
    }
});


av_legality_check = function() {
    if (Cookies.get('is_legal') == "yes") {
        // legal!
        // Do nothing?
    } else {
        av_showmodal();
        // Make sure the prompt stays in the middle.
        $(window).on('resize', av_positionPrompt);
    }
};

av_showmodal = function() {
    var ageCheck = getAgeVerification();
    var logo = getLogo();
    modal_screen = $('<div id="modal_screen"></div>');
    modal_content = $('<div id="modal_content" style="display:none;background-image:url(' + logo + ');"></div>');
    var modal_content_wrapper = $('<div id="modal_content_wrapper" class="content_wrapper"></div>');
    var modal_regret_wrapper = $('<div id="modal_regret_wrapper" class="content_wrapper" style="display:none;"></div>');

    // Question Content
    var content_heading = $('<h2>Are you ' + ageCheck + ' or older?</h2>');
    var content_buttons = $('<nav><ul><li><a href="#nothing" class="av_btn av_go" rel="yes">Yes</a></li><li><a href="#nothing" class="av_btn av_no" rel="no">No</a></li></nav');
    var content_text = $('<p>You must verify that you are ' + ageCheck + ' years of age or older to enter this site.</p>');

    // Regret Content
    var regret_heading = $('<h2>We\'re Sorry!</h2>');
    var regret_buttons = $('<nav><small>I hit the wrong button!</small> <ul><li><a href="#nothing" class="av_btn av_go" rel="yes">I\'m old enough!</a></li></ul></nav');
    var regret_text = $('<p>You must be ' + ageCheck + ' years of age or older to enter this site.</p>');

    modal_content_wrapper.append(content_heading, content_buttons, content_text);
    modal_regret_wrapper.append(regret_heading, regret_text);
    modal_content.append(modal_content_wrapper, modal_regret_wrapper);

    // Append the prompt to the end of the document
    $('html').css('overflow', 'hidden');
    $('body').css('overflow', 'hidden');
    $('body').append(modal_screen, modal_content);
    // Center the box
    av_positionPrompt();

    modal_content.find('a.av_btn').on('click', av_setCookie);
};

av_setCookie = function(e) {
    e.preventDefault();

    var is_legal = $(e.currentTarget).attr('rel');

    Cookies.set('is_legal', is_legal, {
        expires: 30,
        path: '/'
    });

    if (is_legal == "yes") {
        av_closeModal();
        $('html').css('overflow-y', 'scroll');
        $('body').css('overflow-y', '');
        $('html').css('overflow-x', 'hidden');
        $('body').css('overflow-x', 'hidden');
        $(window).off('resize');
    } else {
        av_showRegret();
    }
};

av_closeModal = function() {
    modal_content.fadeOut();
    modal_screen.fadeOut();
};

av_showRegret = function() {
    modal_screen.addClass('nope');
    modal_content.find('#modal_content_wrapper').hide();
    modal_content.find('#modal_regret_wrapper').show();
};

av_positionPrompt = function() {
    var top = ($(window).outerHeight() - $('#modal_content').outerHeight()) / 2;
    var left = ($(window).outerWidth() - $('#modal_content').outerWidth()) / 2;
    modal_content.css({
        'top': top,
        'left': left
    });

    if (modal_content.is(':hidden') && (Cookies.get('is_legal') != "yes")) {
        modal_content.fadeIn('slow')
    }
};