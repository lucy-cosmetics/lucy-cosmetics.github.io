$(document).ready(function () {
    var navigacia = document.getElementsByClassName("lipstick-text");
    if (navigacia) {
        for (var i = 0; i < navigacia.length; i++) {
            var ruz = $(navigacia[i]).hasClass("otvoreny") ? "ruz" : "ruz-zatvoreny";
            var ruzElementHidden = document.getElementById(ruz);
            var ruzElementVisible = ruzElementHidden.innerHTML;
            $(navigacia[i].parentElement).append($.parseHTML(ruzElementVisible)[0]);
        }          
    }
    
    nastavMapu();
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
                    navigacia[i].parentElement.append($.parseHTML(ruzElementVisible)[0]);
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
                navigacia[i].parentElement.append($.parseHTML(ruzElementVisible)[0]);                
            }
            
            if (menuId === 4) {
                nastavMapu(true);
            }
        }          
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
        L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapa);        
    
        L.marker( [markery.lat, markery.lng] )
          .bindPopup(markery.name)
          .addTo( mapa );
    }
    mapa.invalidateSize();
}