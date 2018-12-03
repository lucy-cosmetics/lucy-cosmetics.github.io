$(document).ready(function () {
    var navigacia = document.getElementsByClassName("lipstick-text");
    if (navigacia) {
        for (var i = 0; i < navigacia.length; i++) {
            var ruz = $(navigacia[i]).hasClass("otvoreny") ? "ruz" : "ruz-zatvoreny";
            var ruzElementHidden = document.getElementById(ruz);
            var ruzElementVisible = ruzElementHidden.innerHTML;
            navigacia[i].parentElement.append($.parseHTML(ruzElementVisible)[0]);
        }          
    }
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
        }          
    }
    
}