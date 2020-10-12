// Licence Create commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author : Jean-Philippe Rivière - Wiquid - January 2020 project
// Base idea of project DEPP. Ministère de l'éducation nationale - France

import closeAllMC from './closeAll';
import badgeSystem from './badgeSystem';
import * as Rconti from './Rcontainer';
import RWordCount from './wordcounter';


export default function wordCMenu() {

    $(".word").on('contextmenu', function(e) {
        var left = e.originalEvent.layerX;
        var top = e.originalEvent.layerY;

        e.preventDefault();

        closeAllMC(); //Close all precedent contextMenu



        $(".bad_pronunciation").off();
        $(".missing_word").off();
        $(".confusion").off();
        $(".invention").off();
        $(".repetition").off();
        $(".firstWord").off();
        $(".30sWord").off();
        $(".lastWord").off();

        $("#context-menu").css({
            "font-size": "0.8em",
            background: "#FBEFF8",
            display: "block",
            top: top,
            left: left
        }).addClass("show");

        $(".bad_pronunciation").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "P";
            bdgType.mention = "Mot mal prononcé";
            bdgType.pHolder = "You can describe here the strong hésitation..."
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#context-menu").removeClass("show").hide();
        });

        $(".missing_word").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "E";
            bdgType.mention = "Elision";
            bdgType.pHolder = "You can comment..."
            badgeSystem(e.target, bdgType, "creation");
            $(e.target).removeClass("activWord");
            $(".dropdown-item").off();
            $("#context-menu").removeClass("show").hide();
            RWordCount()

        });

        $(".confusion").on("click", function() {
            let bdgType = {};
            bdgType.initial = "c";
            bdgType.mention = "Confusion de mots";
            bdgType.pHolder = "Specify the word produced instead...";
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#context-menu").removeClass("show").hide();
        });

        $(".invention").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "i";
            bdgType.mention = "Mot inventé";
            bdgType.pHolder = "Specify the fake-word produced instead...";
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#context-menu").removeClass("show").hide();
        });

        $(".repetition").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "R";
            bdgType.mention = "Repetition";
            bdgType.pHolder = "What kind of repetition ?...";
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#context-menu").removeClass("show").hide();
        });


        $(".30sWord").on("click", function() {
            //console.log(e.target);
            let bdgType = {};
            bdgType.initial = "30";
            bdgType.mention = "Mot lu à 30 secondes";
            bdgType.pHolder = "Specify the sequential error...";
            badgeSystem(e.target, bdgType, "creation");
            $(".dropdown-item").off();
            $("#context-menu").removeClass("show").hide();
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
            $("#context-menu").removeClass("show").hide();
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
            $("#context-menu").removeClass("show").hide();
        });

    });



}