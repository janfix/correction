// Licence Create commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author : Jean-Philippe Rivière - Wiquid - January 2020 project
// Base idea of project DEPP. Ministère de l'éducation nationale - France


import closeAllMC from './closeAll';
import badgeSystem from './badgeSystem';
import markLiaison from './markLiaison';




export default function spaceCMenu() {
    $(".space").on('contextmenu', function(e) {
        var left = e.originalEvent.layerX;
        var top = e.originalEvent.layerY;

        e.preventDefault();

        closeAllMC(); //Close all precedent contextMenu

        $(".SpaceFreeNote").off();
        $(".missingLiaison").off();
        $(".wrongLiaison").off();
        $(".WordInversion").off();
        $(".addition").off();
        $(".pause").off();

        $("#spaceCMenu").css({
            "font-size": "0.8em",
            background: "#EFFBF8",
            display: "block",
            top: top,
            left: left
        }).addClass("show");

        $(".SpaceFreeNote").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "A";
            bdgType.mention = "Free annotation on Space";
            bdgType.pHolder = "You can write here your annotation..."
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#spaceCMenu").removeClass("show").hide();
        });

        $(".missingLiaison").on("click", function() {
            let type = "missing";
            markLiaison(e.target, type);
            $(".dropdown-item").off();
            $("#spaceCMenu").removeClass("show").hide();
        });

        $(".wrongLiaison").on("click", function() {
            //console.log(e.target);
            let type = "wrong";
            markLiaison(e.target, type);
            $(".dropdown-item").off();
            $("#spaceCMenu").removeClass("show").hide();
        });

        $(".WordInversion").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = 'I';
            bdgType.mention = "Inversion des mots";
            bdgType.pHolder = "You can describe here the kind of Word inversion..."
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#spaceCMenu").removeClass("show").hide();
        });

        $(".addition").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = '+';
            bdgType.mention = "Ajout d'un ou plusieurs mots (invention)";
            bdgType.pHolder = "Precise the reader production..."
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#spaceCMenu").removeClass("show").hide();
        });
        $(".pause").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "P";
            bdgType.mention = "Long pause";
            bdgType.pHolder = "Comment pause..."
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#context-menu").removeClass("show").hide();
        });
    });

}