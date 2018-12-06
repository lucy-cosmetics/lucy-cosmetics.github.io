$(document).ready(function () {
    // nastav ruze v navigacnom menu
    var navigacia = document.getElementsByClassName("lipstick-text");
    if (navigacia) {
        for (var i = 0; i < navigacia.length; i++) {
            var ruz = $(navigacia[i]).hasClass("otvoreny") ? "ruz" : "ruz-zatvoreny";
            var ruzElementHidden = document.getElementById(ruz);
            var ruzElementVisible = ruzElementHidden.innerHTML;
            $(navigacia[i].parentElement).append($.parseHTML(ruzElementVisible)[0]);
        }          
    }

    // nastav rozbalovaciu sipku v sluzbach
    var popisy = document.getElementsByClassName("titulok-popisu");
    if (popisy) {
        for (var i = 0; i < popisy.length; i++) {
            var sipka = $(popisy[i]).hasClass("otvoreny") ? "zabalenie" : "rozbalenie";
            var sipkaElementHidden = document.getElementById(sipka);
            var sipkaElementVisible = sipkaElementHidden.innerHTML;
            $(popisy[i]).append($.parseHTML(sipkaElementVisible)[0]);
        }          
    }
    
    // nastav mapu v kontaktoch
    nastavMapu();
    
    // nastav fotky v galerii
    nastavFotky();
    spustiSlideShow(false);
});

function otvorMenu(menuId) {
    let navigacia = document.getElementsByClassName("lipstick-text");
    if (navigacia) {
        for(i=0; i < navigacia.length; i++) {
            if (i === menuId) {
                if (!$(navigacia[i]).hasClass("otvoreny")) {
                    $(navigacia[i]).addClass("otvoreny")
                    var ruz = "ruz";
                    var ruzElementHidden = document.getElementById(ruz);
                    var ruzElementVisible = ruzElementHidden.innerHTML;
                    var oldSvg = navigacia[i].nextElementSibling;
                    if (oldSvg) {
                        navigacia[i].parentElement.removeChild(oldSvg);
                    }
                    $(navigacia[i].parentElement).append($.parseHTML(ruzElementVisible)[0]);
                    $(".menu-content").removeClass("shown");
                    $("#menuContent" + menuId).addClass("shown");
                }
            }
            else if ($(navigacia[i]).hasClass("otvoreny")) {
                $(navigacia[i]).removeClass("otvoreny")
                var ruz = "ruz-zatvoreny";
                var ruzElementHidden = document.getElementById(ruz);
                var ruzElementVisible = ruzElementHidden.innerHTML;
                var oldSvg = navigacia[i].nextElementSibling;
                if (oldSvg) {
                    navigacia[i].parentElement.removeChild(oldSvg);
                }
                $(navigacia[i].parentElement).append($.parseHTML(ruzElementVisible)[0]);                
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
        var sipka = $(titulokPopisu).hasClass("otvoreny") ? "zabalenie" : "rozbalenie";
        var sipkaElementHidden = document.getElementById(sipka);
        var sipkaElementVisible = sipkaElementHidden.innerHTML;
        var oldSipkaSvg = $(titulokPopisu).find(".sipka");
        if (oldSipkaSvg && oldSipkaSvg.length) {
            titulokPopisu.removeChild(oldSipkaSvg[0]);
        }
        $(titulokPopisu).append($.parseHTML(sipkaElementVisible)[0]);
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
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
            autoplay: false,
            autoplaySpeed: 3000,
            adaptiveHeight: true,
            dots: true,
            infinite: true,
            variableWidth: true
        });        
    }
}

function spustiSlideShow(zapnut) {
        var carousel = $('.carousel');
        if (carousel.length && carousel[0].slick) {
            zapnut ? carousel[0].slick.slickPlay() : carousel[0].slick.slickPause();        
        }
}