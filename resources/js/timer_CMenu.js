// Licence Create commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author : Jean-Philippe Rivière - Wiquid - January 2020 project
// Base idea of project DEPP. Ministère de l'éducation nationale - France

import closeAllMC from './closeAll';
import badgeSystem from './badgeSystem';
import * as Rconti from './Rcontainer';
import RWordCount from './wordcounter';


export default function timerCmenu() {

    $(".word").on('contextmenu', function(e) {
        var left = e.originalEvent.layerX;
        var top = e.originalEvent.layerY;

        e.preventDefault();

        closeAllMC(); //Close all precedent contextMenu

        $(".firstWord").off();
        $(".30sWord").off();
        $(".lastWord").off();

        $("#timerCmenu").css({
            "font-size": "0.8em",
            background: "#FBEFF8",
            display: "block",
            top: top,
            left: left
        }).addClass("show");

        $(".30sWord").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "30";
            bdgType.mention = "Mot lu à 30 secondes";
            bdgType.pHolder = "Specify the sequential error...";
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#timerCmenu").removeClass("show").hide();
        });


        $(".firstWord").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "1";
            bdgType.mention = "Premier mot";
            bdgType.pHolder = "Specify the sequential error...";
            // badgeSystem(e.target, bdgType, "creation");
            $(".notreadBefore").removeClass("notreadBefore");
            $(".firstWordRead").removeClass("firstWordRead");
            $(".dropdown-item").off();
            $("#timerCmenu").removeClass("show").hide();
            var firstWordIndex = $(e.target).attr("id").split("w");
            console.log(firstWordIndex)
            $(e.target).addClass("firstWordRead");
            let idFirsttWord = $(e.target).attr("id");
            Rconti.RContainer.firstWord = idFirsttWord;
            for (let i = 0; i < firstWordIndex[1]; i++) {
                $("#w" + i).addClass("notreadBefore");
            }
            //Uncheck lines
            var markedLine = $(".textSpace").find(".firstWordRead").parent().attr("id").split("row");
            for (let i = 0; i < markedLine[1]; i++) {
                $("#row" + i).find("input").prop("checked", false);
            }


            RWordCount(); //Count read words!

            $(e.target).on("dblclick", function() {
                $(".notreadBefore").removeClass("notreadBefore");
                $(this).removeClass("firstWordRead");
                for (let i = 0; i < markedLine[1]; i++) {
                    $("#row" + i).find("input").prop("checked", true);
                }
                Rconti.RContainer.firstWord = "";
                console.log(Rconti.RContainer)
                RWordCount(); //Count read words!
            });
        });



        $(".lastWord").on("click", function() {
            //Reset Styles
            $(".lastWordRead").removeClass("lastWordRead");
            $(".afterEnd").removeClass("afterEnd");
            $(".afterEnd").removeClass("afterEnd");
            $(e.target).addClass("lastWordRead").removeClass("activWord");
            let idLastWord = $(e.target).attr("id");
            Rconti.RContainer.lastWord = idLastWord;
            let lastLineIDRead = $(e.target).parent().attr("id"); //this extract row3 for example
            var LLRead = lastLineIDRead.split("row");
            Rconti.RContainer.lastLine = LLRead[1]; // This extract only the row number
            console.log(Rconti.RContainer.lastLine);

            let startToEnd = idLastWord.split("w");
            var LastIndex = parseInt(startToEnd[1]) + 1;
            let totalWordInTextID = $(".textSpace").find('.word').last().attr("id");
            console.log(totalWordInTextID);
            var totalWordInText = totalWordInTextID.split("w");

            for (let i = LastIndex; i < (totalWordInText[1] + 1); i++) {
                $("#w" + i).addClass("afterEnd");
            }
            var allLines = $(".textSpace").find(".lineNumber").length;
            for (let i = (parseInt(LLRead[1]) + 1); i < allLines; i++) {
                $("#row" + i).find("input").prop("checked", false);
            }

            $(".lastWordRead").on("dblclick", function() {
                $(".lastWordRead").removeClass("lastWordRead");
                for (let i = LastIndex; i < totalWordInText[1]; i++) {
                    $("#w" + i).removeClass("afterEnd");
                }
                for (let i = (parseInt(LLRead[1]) + 1); i < allLines; i++) {
                    $("#row" + i).find("input").prop("checked", true);
                }
                Rconti.RContainer.lastWord = "";
                Rconti.RContainer.lastLine = "";
                RWordCount();
            })

            RWordCount()

            //$(".dropdown-item").unbind();
            $("#timerCmenu").removeClass("show").hide();
        });

    });



}