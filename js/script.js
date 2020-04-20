function checkCursorOn(){
    $(document).on('mouseenter, mousemove', function(){
        checkCursor();
    });
    $(document).on('mouseleave', function(){
        if($('main').find('#cursor').length > 0){
            deleteCursor();
        }else{
            return;
        }
    });
}

function checkCursor() {
    if (!$('main').find('#cursor').length > 0) {
        createCursor();
    }
}

function createCursor() {
    var newCursor = '';
    newCursor += '<div id="cursor"><span></span></div>';
    $('html, body').css({"cursor": "none"});
    $('main').prepend(newCursor);
    cursorPosition();
}

function deleteCursor() {
    $('#cursor').remove();
}

function cursorPosition() {
    $(document).mousemove(function(event){
        var cursorX = event.clientX;
        var cursorY = event.clientY;
        $("#cursor span").css({"top": cursorY + "px", "left": cursorX + "px"});
    });
    $(document).on('mouseenter', 'a, button', function(e){
        e.stopPropagation();
        if (!$('#cursor').hasClass('active')) {
            $('#cursor').addClass('active');
        } else {
            return;
        }
    });
    $(document).on('mouseenter, mousemove', '.btn-logo, button .area-obj, #works-popup', function(){
        if (!$('#cursor span').hasClass('reverse')) {
            $('#cursor span').addClass('reverse');
        } else {
            return;
        }
    });
    $(document).on('mouseleave', 'a, button', function(){
        if ($('#cursor').hasClass('active')) {
            $('#cursor').removeClass('active');
        } else {
            return;
        }
    });
    $(document).on('mouseleave', '.btn-logo, button .area-obj, #works-popup', function(){
        if ($('#cursor span').hasClass('reverse')) {
            $('#cursor span').removeClass('reverse');
        } else {
            return;
        }
    });
    cursorColor();
}

function cursorColor() {
    if (viewMode === 'device' && modeChange === false) {
        $(document).on('mousemove', 'nav, #section-contact, footer', function(){
            if (!$('#cursor span').hasClass('reverse')) {
                $('#cursor span').addClass('reverse');
            } else {
                return;
            }
        });
        $(document).on('mouseleave', 'nav, #section-contact, footer', function(){
            if ($('#cursor span').hasClass('reverse')) {
                $('#cursor span').removeClass('reverse');
            } else {
                return;
            }
        });
    }else{
        $(document).on('mousemove', 'nav, #section-contact, footer', function(){
            if ($('#cursor span').hasClass('reverse')) {
                $('#cursor span').removeClass('reverse');
            } else {
                return;
            }
        });
    }
}

var navOpened = false;

function nav() {
    $('.btn-nav').on('click', function(){
        if (navOpened === true) {
            $('.btn-nav').removeClass('active').text('menu');
            $('nav > *').stop().animate({"opacity": "0"}, 300, function(){
                $('nav').stop().animate({"opacity": "0", "width": "0", "height": "0"}, 300, function(){
                    $(this).css({"display": "none"});
                });
            });
            navOpened = false;
        } else if (navOpened === false) {
            $('.btn-nav').addClass('active').text('back');
            $('nav').css({"display": "block", "opacity": "0", "width": "0", "height": "0"}).stop().animate({"opacity": "1", "width": "100%", "height": "100%"}, 300, function(){
                $('nav > *').stop().animate({"opacity": "1"}, 300);
            });
            navOpened = true;
        }
    });

    $('nav').on('click', 'a, button', function(e){
        e.preventDefault();
        var thisTarget = $(this);
        var thisTagName = e.target.tagName || e.srcElement.tagName;
        if(viewMode === 'pc') {
            headerHeight = $('header').height() / 2;
        } else {
            headerHeight = 0;
        }
        $('.btn-nav').removeClass('active').text('menu');
        if (navOpened === true) {
            $('nav > *').stop().animate({"opacity": "0"}, 300, function(){
                $('nav').stop().animate({"opacity": "0", "width": "0", "height": "0"}, 300, function(){
                    $(this).css({"display": "none"});
                    if (thisTagName.toLowerCase() === 'a') {
                        var thisLink = thisTarget.attr('href');
                        var thisTop = $(thisLink).offset().top;
                        var windowTop = $(window).scrollTop();
                        if (windowTop <= 0)  {
                            windowTop = $(document).height() - thisTop;
                        }
                        speed = windowTop / 5;
                        if (thisLink === '#contact' && ($('#contact').height() <= windowHeight)) {
                            thisTop = $(document).height() - windowHeight;
                        }
                        $("html, body").stop().animate({scrollTop: thisTop - headerHeight}, speed, 'swing');
                    }
                });
            });
        } else {
            if (thisTagName.toLowerCase() === 'a') {
                var thisLink = $(this).attr('href');
                var thisTop = $(thisLink).offset().top;
                var windowTop = $(window).scrollTop();
                if (windowTop <= 0)  {
                    windowTop = $(document).height() - thisTop;
                }
                speed = windowTop / 5;
                if (thisLink === '#contact' && ($('#contact').height() <= windowHeight)) {
                    thisTop = $(document).height() - windowHeight;
                }
                $("html, body").stop().animate({scrollTop: thisTop - headerHeight}, speed, 'swing');
            }
        }
        navOpened = false;
    });
}

function navReset() {
    $('.btn-nav').removeClass('active').text('menu');
    $('nav').css({"opacity": "", "display": "", "width": "", "height": ""});
    $('nav > *').css({"opacity": ""});
    navOpened = false;
}

function navOn() {
    $('main div section').each(function(){
        var thisTop = $(this).offset().top;
        var thisLink = $(this).attr('id');
        var headerHeight;
        if(viewMode === 'pc') {
            headerHeight = $('header').height();
        } else {
            headerHeight = 0;
        }
        if (thisTop - windowHeight + headerHeight <= scrollTop) {
            if (scrollTop <= windowHeight / 3) {
                $('nav a').parent('li').removeClass('active');
            }else{
                $('nav a').parent('li').removeClass('active');
                $('nav a[href="#' + thisLink +'"').parent('li').addClass('active');
            }
        }
    });
}

function goIntro() {
    $(document).on("click", ".btn-logo", function(){
        speed = $(window).scrollTop() / 5;
        if(navOpened === true){
            $('.btn-nav').removeClass('active').text('menu');
            $('nav > *').stop().animate({"opacity": "0"}, 300, function(){
                $('nav').stop().animate({"opacity": "0", "width": "0", "height": "0"}, 300, function(){
                    $(this).css({"display": "none"});
                    $("html, body").stop().animate({scrollTop: 0}, speed, 'swing');
                });
            });
            navOpened = false;
        }else{
            $("html, body").stop().animate({scrollTop: 0}, speed, 'swing');
        }
    });
}

var popupOpened = false;

function popupReset() {
    if (popupOpened === true) {
        $('#works-popup').stop().animate({"opacity": "0"}, 300, function(){
            $(this).css({"display": "none"});
            $('html, body').css({"overflow": ""});
            $('#works-popup .obj-bg').css({"background-image": "none", "background-position": "center"});
            $('#works-popup .area-txt h3').text('');
            $('#works-popup .area-txt .date').text('');
            $('#works-popup .area-txt .desc').remove();
            $('#works-popup .area-txt .conttribution ul').empty();
            $('#works-popup .area-txt .links .link-site').remove();
            $('#works-popup .area-txt .links .link-code').remove();
        });
        popupOpened = false;
    } else {
        return;
    }
}

function popupClose() {
    $(document).on('click', '#works-popup .btn-close', function(e){
        e.stopPropagation();
        popupReset();
    });
}

function kvData() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);
            var mainTxt = '';
            var mainContent = '';
            for (var i = 0; i < responseObject.works.length; i++) {
                if (responseObject.works[i].onMain === true) {
                    mainTxt += '<li class="valign"><div class="middle"><p>' + responseObject.works[i].title + '</p></div></li>'
                    mainContent += '<li class="work' + i + '"><button type="button" title="see detail of ' + responseObject.works[i].title + '">';
                    mainContent += '<div class="area-obj"><img src="./images/works/thumbs/thumb' + responseObject.works[i].number + '.jpg" alt="thumbnail of ' + responseObject.works[i].title + '" /></div></button></li>'
                }
            }
            $('#section-intro .title-lists ul').html(mainTxt);
            $('#section-intro .kv-lists').html(mainContent);

            kvSlider();
        }
    };

    xhr.open('GET', '/data/works.json', true);
    xhr.send(null);
}

function loadWork() {
    $('#section-works .btn-more').on('click', function(){
        var maxLength = Math.ceil((responseObject.works.length / 4));
        if (workLength <= maxLength) {
            workLength++;
        }
        workData(workLength);
        scrollIndicator();
    })
}

function workData(workLenght) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);
            var newContent = '';
            for (var j = 0; j < 4 * workLenght; j++) {
                if (j < responseObject.works.length) {
                var skillsArray = [];
                Object.keys(responseObject.works[j].skills).forEach(function(key){
                    var value = responseObject.works[j].skills[key];
                    if (value > 0) {
                        skillsArray.push(key);
                    }
                });

                newContent += '<li><button type="button" title="see detail of '+ responseObject.works[j].title + '"><div class="btn_wrap"><h3>' + responseObject.works[j].title + '</h3>';
                newContent += '<div class="thumb_wrap"><div class="area-txt"><div class="valign"><div class="middle"><p>' + skillsArray + '</p></div></div></div>';
                newContent += '<div class="area-obj"><img src="./images/works/thumbs/thumb' + responseObject.works[j].number + '.jpg" alt="thumbnail of ' + responseObject.works[j].title + '"></div></div></div></button></li>';
                } else {
                    $('#section-works .btn-more').remove();
                }
            }
            $('#section-works .work-lists > ul').html(newContent);
        }
    };

    xhr.open('GET', '/data/works.json', true);
    xhr.send(null);
}

function popupData(i) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.status === 200) {
            responseObject = JSON.parse(xhr.responseText);
            $('#works-popup .obj-bg').css({"background-image": "url('./../images/works/details/detail" + responseObject.works[i].number + ".jpg')"});
            $('#works-popup .area-txt h3').text(responseObject.works[i].title);
            $('#works-popup .area-txt .date').text(responseObject.works[i].date);
            $('#works-popup .area-txt .conttribution ul').empty();
            var workDesc = '';
            if (responseObject.works[i].desc === null) {
                $('#works-popup .area-txt .desc').remove('');
            } else {
                workDesc += '<p class="desc">' + responseObject.works[i].desc + '</p>';
                $('#works-popup .area-txt .desc').remove('');
                $('#works-popup .area-txt .info').append(workDesc);
            }
            var listContent = '';
            Object.keys(responseObject.works[i].skills).forEach(function(key){
                var skills = responseObject.works[i].skills[key];
                if (skills > 0) {
                    listContent += '<li>' + key + ': ' + skills + '%</li>'
                }
            });
            $('#works-popup .area-txt .conttribution ul').append(listContent);
            var siteLink = '';
            var codeLink = '';
            if (responseObject.works[i].site === null) {
                $('#works-popup .area-txt .link-site').remove();
            } else {
                $('#works-popup .area-txt .link-site').remove();
                siteLink += '<li class="link-site"><a href="' + responseObject.works[i].site + '" target="_blank" title="open in new window: go to website of ' + responseObject.works[i].title + '">view <br>site</a></li>'
                $('#works-popup .area-txt .links ul').append(siteLink);
            }
            if (responseObject.works[i].code === null) {
                $('#works-popup .area-txt .link-code').remove();
            } else {
                $('#works-popup .area-txt .link-code').remove();
                codeLink += '<li class="link-code"><a href="' + responseObject.works[i].code + '" target="_blank" title="open in new window: see the code of ' + responseObject.works[i].title + '">view <br>code</a></li>'
                $('#works-popup .area-txt .links ul').append(codeLink);
            }
        }
    };

    xhr.open('GET', '/data/works.json', true);
    xhr.send(null);
}