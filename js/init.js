var overlayScrollbarsOptions = {
    className       : "os-theme-dark",
    resize          : "none",
    sizeAutoCapable : true,
    paddingAbsolute : true,
    scrollbars : {
        clickScrolling   : true,
        autoHide         : "move",
        autoHideDelay    : 800,
        dragScrolling    : true,
        touchSupport     : true,
        snapHandle       : false
    }
};

$(document).ready(function () {
    // nastav fotky v galerii
    nastavFotky();
    spustiSlideShow(false);
            
    // nastav menu stránky
    var menuId = 0;
    if (window.location && window.location.href && window.location.href.indexOf('?menu=') >= 0) {
        var pageLocation = window.location.href;
        menuId = pageLocation.indexOf('?menu=o-nas') >= 0 ? 0 : pageLocation.indexOf('?menu=sluzby') >= 0 ? 1 : pageLocation.indexOf('?menu=cennik') >= 0 ? 2 : pageLocation.indexOf('?menu=galeria') >= 0 ? 3 : pageLocation.indexOf('?menu=kontakt') >= 0 ? 4 : 0;

    }
    if (menuId > -1) {
        otvorMenu(menuId);
    }
    
    // nastav scrollbary
    OverlayScrollbars(document.querySelectorAll("body"), overlayScrollbarsOptions);
});


function otvorMenu(menuId) {
    var navigacia1 = document.getElementsByClassName("lipstick-text");
    if (navigacia1) {
        for(i=0; i < navigacia1.length; i++) {
            if (i === menuId) {
                if (!$(navigacia1[i]).hasClass("otvoreny")) {
                    $(navigacia1[i]).addClass("otvoreny")
                    $(".menu-content").removeClass("shown");
                    $("#menuContent" + menuId).addClass("shown");
                }
            }
            else if ($(navigacia1[i]).hasClass("otvoreny")) {
                $(navigacia1[i]).removeClass("otvoreny")
            }
            
            if (menuId === 4) {
                nastavMapu();
            }
            
            spustiSlideShow(menuId === 3);
        }          
    }
    
}

function preklopPopis(titulokPopisu) {
    if (titulokPopisu) {
        $(titulokPopisu).hasClass("otvoreny") ? $(titulokPopisu).removeClass("otvoreny") : $(titulokPopisu).addClass("otvoreny")
    }
}

var mapa = null;
var skipMapInitialization = false;
function nastavMapu() {
    
    if (!mapa) {
        mapa = L.map('map');       
    }
    
    var markery = {
        "name": "KARLOTT",
         "lat": 48.2854865,
         "lng": 17.2690892,
         "zoom": 17
    };

    mapa.setView([markery.lat, markery.lng], markery.zoom);

    if (!skipMapInitialization) {
        L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapa);        
    
        L.marker( [markery.lat, markery.lng] )
          .bindPopup(markery.name)
          .addTo( mapa );
        skipMapInitialization = true;
    }
    mapa.invalidateSize();
}

function nastavFotky() {
    var carousel = $('.carousel');
    if (carousel.length) {
        carousel.slick({
            centerMode: true,
            centerPadding: '100px',
            slidesToShow: 1,
            initialSlide: 0,
            autoplay: false,
            autoplaySpeed: 3000,
            adaptiveHeight: true,
            dots: true,
            infinite: true,
            variableWidth: true
        });
    }
}

function spustiSlideShow(zapnut , skipRefresh) {
        var carousel = $('.carousel');
        if (!skipRefresh) {
            $('.carousel')[0].slick.refresh();            
        }
        if (carousel.length && carousel[0].slick) {
            zapnut ? carousel[0].slick.slickPlay() : carousel[0].slick.slickPause();        
        }
}

function zobrazFotku(source) {
    var fullscreen = $('.fullscreen');
    if (fullscreen && fullscreen.length && source) {
        spustiSlideShow(false, true);
        var zvacsenyObrazok = fullscreen.find('img');
        if (zvacsenyObrazok && zvacsenyObrazok.length) {
            $(zvacsenyObrazok).attr('src', source.src);
        }
        fullscreen.removeClass('hidden');
        $(':focus').blur();
    }
}

function zatvorFotku() {
    var fullscreen = $('.fullscreen');
    if (fullscreen && fullscreen.length) {
        fullscreen.addClass('hidden');
        spustiSlideShow(true, true);
    }
}