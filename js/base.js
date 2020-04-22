$(window)
    .load(onLoad, function(){})
    .resize(onResize)
    .scroll(onScroll);

var windowWidth = $(window).width();
var windowHeight = $(window).height();
var viewMode = '', modeChange = false;
var scrollTop = 0;
var speed;
var workLength;

$(document).ready(function(){
    if (check_allDevice() != "") {
        $("body").addClass("device");
    } else {
        checkCursorOn();
    }
});

function onLoad()
{
    scrollTop = window.pageYOffset;
    navOn();
    resetGuide();
}

function onResize()
{
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    scrollTop = window.pageYOffset;

    if (!$('body').hasClass('device')) {
        if (viewportWidth() <= 768 && viewMode === 'pc') {
            viewMode = 'device';
            modeChange = true;
        } else if (viewportWidth() > 768 && viewMode === 'device') {
            viewMode = 'pc';
            modeChange = true;
        } else {
            modeChange = false;
        }
    }

    if (modeChange === true) {
        var moreBtn = '<button type="button" class="btn-more" title="click to see more work lists">load more</button>';
        if (!$('#section-works').find('.btn-more').length > 0) {
            $('#section-works').append(moreBtn);
        }
        workLength = 1;
        navReset();
        scrollIndicator();
        cursorColor();
        workData(workLength);
        loadWork();
        popupReset();
    }

    resetGuide();
    navOn();
}

function onScroll()
{
    scrollTop = window.pageYOffset;
    navOn();
    scrollIndicator();
}

(function(){
    if (viewportWidth() <= 768) {
        viewMode = 'device';
    } else {
        viewMode = 'pc';
    }

    workLength = 1;
    kvData();
    workData(workLength);
}());

$(function(){
    $(document).on('mousedown', 'button', function(e){
      e.preventDefault();
    });

    modeChanged = false;
    nav();
    goIntro();
    loadWork();
    popupClose();

    $('#section-works').on('click', '.work-lists button', function(){
        var thisIdx = $(this).parents('li').index();
        popupData(thisIdx);
        $('html, body').css({"overflow": "hidden"});
        $('#works-popup').css({"display": "block"}).animate({"opacity": "1"}, 1000);
        popupOpened = true;
    });

    $('#section-intro').on('click', '.kv-lists button', function(){
        var thisIdx = $(this).parents('li').attr('class').replace('work', '');
        popupData(thisIdx);
        $('#works-popup').css({"display": "block"}).animate({"opacity": "1"}, 1000, function(){
            $('html, body').css({"overflow": "hidden"});
        });
        popupOpened = true;
    });
});

var kvHeight;
function resetGuide() {
    kvHeight = $('#section-intro .intro-kv .kv-slide').outerHeight();
    $('#section-intro').css({"height": windowHeight + "px"});
    if (viewMode === 'device' && (windowHeight >= (windowWidth * 1.25))) {
        $('#section-intro .scroll_guide').css({"height": (windowHeight - kvHeight) / 2 - 14 + "px"});
    } else {
        $('#section-intro .scroll_guide').css({"height": ""})
    }
}

function scrollIndicator() {
    var indicator = scrollTop / $(document).height() * 200;
    if (viewMode === 'pc') {
        $('#section-intro .scroll_text').css({'transform': 'translateY(' + indicator + 'px)'});
    } else {
        $('#section-intro .scroll_text').css({'transform': ''});
    }
}

function kvSlider() {
    var kvLenght = $('#section-intro .kv-lists li').length;
    var kvIdx = 0;
    
    $('#section-intro .kv-indicator .total').text(kvLenght);
    setInterval(function(){
        if(kvIdx < kvLenght - 1){
            kvIdx ++;
        }else if(kvIdx >= kvLenght - 1){
            kvIdx = 0;
        }
        $('#section-intro .kv-lists li').eq(kvIdx - 1).animate({"margin-left" : "-100%"}, 500, function(){
            $(this).css({"margin-left" : "100%"});
        });
        $('#section-intro .kv-lists li').eq(kvIdx).animate({"margin-left" : "0"}, 500);
        $('#section-intro .title-lists li p').eq(kvIdx - 1).css({"display": "block", "opacity": "1"}).animate({"opacity": "0", "margin-top" : "20px"}, 500, function(){
            $(this).css({"display" : "none"});
        });
        $('#section-intro .title-lists li p').eq(kvIdx).css({"display": "block", "opacity": "0", "margin-top": "0"}).animate({"opacity": "1", "margin-top" : "0"}, 500);
        $('#section-intro .kv-indicator .current').text(kvIdx + 1);
    }, 3200);
}