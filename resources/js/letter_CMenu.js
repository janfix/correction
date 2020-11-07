// Licence Create commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author : Jean-Philippe Rivière - Wiquid - January 2020 project
// Base idea of project DEPP. Ministère de l'éducation nationale - France

import closeAllMC from './closeAll';
import badgeSystem from './badgeSystem';

// Context menu for letter
export default function letterCMenu() {
    $('.letter').on('contextmenu', function(e) {
        var left = e.originalEvent.layerX;
        var top = e.originalEvent.layerY;

        e.preventDefault();

        closeAllMC(); //Close all precedent contextMenu

        $(".letterError").off();
        $(".letterConfusion").off();
        $(".letterComplexGraph").off();
        $(".letterInversion").off();
        $(".letterRepetition").off();
        $(".letterScaling").off();
        $(".letterBlock").off();
        $(".letterNotRead").off();


        let elementClass = $(e.target).attr("class");
        //console.log(elementClass);
        if (elementClass === "exactLetter" || elementClass === "exactLetter normalLetter") {
            $("#letterCMenu").css({
                "font-size": "0.8em",
                background: "#FBF2EF",
                display: "block",
                top: top,
                left: left
            }).addClass("show");

            $(".letterConfusion").on("click", function() {
                let bdgType = {};
                bdgType.initial = "G";
                bdgType.mention = "Graphème mal lu";
                bdgType.pHolder = "You can precise the type of confusion : symetry b/d or p/b or more phonological : m/n, s/c";
                bdgType.unit = "letter"
                badgeSystem(e.target, bdgType, "creation");
                $(".dropdown-item").off();
                $("#letterCMenu").removeClass("show").hide();
            });
            $(".letterInversion").on("click", function() {
                let bdgType = {};
                bdgType.initial = "I";
                bdgType.mention = "Inversion de lettres(I)";
                bdgType.pHolder = "You can precise the inversion";
                bdgType.unit = "letter"
                badgeSystem(e.target, bdgType, "creation");
                $(".dropdown-item").off();
                $("#letterCMenu").removeClass("show").hide();
            });
            $(".letterRepetition").on("click", function() {
                let bdgType = {};
                bdgType.initial = "R";
                bdgType.mention = "Répétition de lettres";
                bdgType.pHolder = "You can precise the repetition (strong/incident...)";
                bdgType.unit = "letter"
                badgeSystem(e.target, bdgType, "creation");
                $(".dropdown-item").off();
                $("#letterCMenu").removeClass("show").hide();
            });

            $(".letterAjout").on("click", function() {
                let bdgType = {};
                bdgType.initial = "+";
                bdgType.mention = "Ajout de lettre/son";
                bdgType.pHolder = "You can precise the repetition (strong/incident...)";
                bdgType.unit = "letter"
                badgeSystem(e.target, bdgType, "creation");
                $(".dropdown-item").off();
                $("#letterCMenu").removeClass("show").hide();
            });

            $(".letterBlock").on("click", function() {
                let bdgType = {};
                bdgType.initial = "A";
                bdgType.mention = "Point d'arrêt";
                bdgType.pHolder = "You can comment";
                bdgType.unit = "letter"
                badgeSystem(e.target, bdgType, "creation");
                $(".dropdown-item").off();
                $("#letterCMenu").removeClass("show").hide();
            });
            $(".letterNotRead").on("click", function() {
                let bdgType = {};
                bdgType.initial = "O";
                bdgType.mention = "Ommission";
                bdgType.pHolder = "You can comment the ommission";
                bdgType.unit = "letter"
                badgeSystem(e.target, bdgType, "creation");
                $(".dropdown-item").off();
                $("#letterCMenu").removeClass("show").hide();
            });
        }
        return false; //blocks default Webbrowser right click menu
    }).on("click", function() {
        $("#letterCMenu").removeClass("show").hide();

    });

    $("#letterCMenu a").on("click", function() {
        $(this).parent().removeClass("show").hide();
    });


}