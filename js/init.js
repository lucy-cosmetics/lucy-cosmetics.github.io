$(document).ready(function () {
    $('.menu-navigation').removeClass('hidden');
    
    // nastav mapu v kontaktoch
    nastavMapu();
    
    // nastav fotky v galerii
    nastavFotky();
    spustiSlideShow(false);
    
    // nastav scrollbary
    OverlayScrollbars(document.querySelectorAll("body"), {
        className       : "os-theme-dark",
        resize          : "none",
        sizeAutoCapable : true,
        paddingAbsolute : true,
        scrollbars : {
            clickScrolling   : true,
            autoHide         : "leave",
            autoHideDelay    : 800,
            dragScrolling    : true,
            touchSupport     : true,
            snapHandle       : false
        }
    });
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
                nastavMapu(true);
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

function nastavMapu(skipInitialization) {
    
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

    if (!skipInitialization) {
        L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/Koll%C3%A1rova+4439%2F11,+902+01+Pezinok/@48.285483,17.2690945,17z/data=!3m1!4b1!4m5!3m4!1s0x476c90b8cec261dd:0xa9375de7c9ee05e!8m2!3d48.285483!4d17.2712832">GoogleMaps</a>'
        }).addTo(mapa);        
    
        L.marker( [markery.lat, markery.lng] )
          .bindPopup(markery.name)
          .addTo( mapa );
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