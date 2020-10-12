// Licence Create commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author : Jean-Philippe Rivière - Wiquid - January 2020 project
// Base idea of project DEPP. Ministère de l'éducation nationale - France

import closeAllMC from './closeAll';
import badgeSystem from './badgeSystem';

export default function punctCMenu() {

    $(".ponct").on('contextmenu', function(e) {
        var left = e.originalEvent.layerX;
        var top = e.originalEvent.layerY;

        e.preventDefault();

        closeAllMC(); //Close all precedent contextMenu
        $(".ponctFreeNote").off();
        $(".ponctnotconsid").off();
        $(".ponctpause").off();

        $("#ponctCMenu").css({
            "font-size": "0.8em",
            background: "#FBEFF8",
            display: "block",
            top: top,
            left: left
        }).addClass("show");

        $(".ponctFreeNote").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "A";
            bdgType.mention = "Free annotation on punctuation";
            bdgType.pHolder = "You can write here your annotation..."
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#context-menu").removeClass("show").hide();
        });

        $(".ponctnotconsid").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "X";
            bdgType.mention = "Intonation finale non marquée";
            bdgType.pHolder = "Comment on missing punctuation..."
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#ponctCMenu").removeClass("show").hide();
        });

        $(".ponctnotvalid").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "!!";
            bdgType.mention = "Intonation finale inappropriée";
            bdgType.pHolder = "Comment punctuation pause..."
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#ponctCMenu").removeClass("show").hide();
        });
    });

}