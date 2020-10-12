// Licence Create commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author : Jean-Philippe Rivière - Wiquid - January 2020 project
// Base idea of project DEPP. Ministère de l'éducation nationale - France

import * as Rconti from './Rcontainer';
import letterCMenu from './letter_CMenu';
import letterBadgeUpdate from './letterBadgeUpdate';




// Add listeners on Words and listeners on word's letters...
export default function wordActivator() {


    $(".word").on("click", function() {
        console.log("Loading CorrDoneData");
        var CorrDoneData = Rconti.CorrDoneData;
        var whatMode = $(".mode").html();

        var wordToDisplay = "";
        var lineNumber = $(this).parent().find(".lineNumber").html();
        $(".word").removeClass("activWord");
        $(this).addClass("activWord");
        let precoCheck = $(this).attr("data-precorr");
        $(".linePointer").css("opacity", "0");
        $("#LProw" + lineNumber).css("opacity", "1");
        var wordCandidate = $(this).html();
        for (let i = 0; i < wordCandidate.length; i++) {
            wordToDisplay = wordToDisplay + '<div id="' + $(this).attr("id") + 'L' + i + '" class="letter normalLetter " data-type="letter" data-state="normal" data-word="' + $(this).attr("id") + '"><div data-type="letter" class="exactLetter">' + wordCandidate[i] + '</div><div class="badgeContainer"></div></div>';
        }
        $(".letterControl").html(wordToDisplay);

        if (whatMode == "Creation") {
            $(wordToDisplay).each(function(index) {
                var idLet = $(this).attr("id"); // ID of letters WXLYY
                var bdginfo = {};
                for (let i = 0; i < Rconti.RContainer.letterBadges.length; i++) {
                    //Check solo badge
                    if (Rconti.RContainer.letterBadges[i][1].origin == idLet) {
                        //console.log(idLet);
                        bdginfo.id = Rconti.RContainer.letterBadges[i][1].id;
                        bdginfo.origin = Rconti.RContainer.letterBadges[i][1].origin;
                        bdginfo.type = Rconti.RContainer.letterBadges[i][1].type;
                        console.log(bdginfo);
                        letterBadgeUpdate(bdginfo);
                    };

                }
            });
        }

        letterCMenu();
        addLetterListener();



        if (whatMode == "Edition") {
            console.log("Edition --------");
            var idtt = $("#jumpDone").val();

            for (let i = 0; i < CorrDoneData.length; i++) {
                if (CorrDoneData[i].id == idtt) {
                    var PersonalResults = JSON.parse(CorrDoneData[i].results)

                }
            }


            for (let y = 0; y < PersonalResults.letterBadges.length; y++) {
                var zeTarget = PersonalResults.letterBadges[y][1].origin;
                var bdgType = PersonalResults.letterBadges[y][1].type;
                var codeError = PersonalResults.letterBadges[y][1].codeError;
                var id = PersonalResults.letterBadges[y][1].id;
                console.log(zeTarget, bdgType, codeError, id);

                console.log(this);
                console.log(PersonalResults);

                $("#" + zeTarget).find(".badgeContainer").append('<div id= ' + id + ' class="badgeLetter" title="' + bdgType + '">' + codeError + '</div>');
                $(".badgeLetter:contains('A')").parent().parent().find(".exactLetter").append("<span class='DIA'>|</span>");
                var wBlocked = $(".badgeLetter:contains('A')").parent().parent().attr("data-word");
                if (wBlocked) {
                    var wordCandidate = $("#" + wBlocked).html();
                    console.log(PersonalResults.letterBadges[y][1].origin.split("L"))
                    let startLetter = PersonalResults.letterBadges[y][1].origin.split("L");
                    console.log(wordCandidate.length)
                    console.log(startLetter)

                    for (let i = (parseInt(startLetter[1]) + 1); i < wordCandidate.length; i++) {
                        let Restselector = startLetter[0] + "L" + i;
                        console.log(Restselector);
                        $("#" + Restselector).addClass('missingLetter');

                    }
                }

                $(".badgeLetter:contains('O')").parent().parent().addClass("missingLetter");

            }

        }

        function addLetterListener() {
            $(".exactLetter").on("click", function() {
                let getState = $(this).attr("data-state");
                if (getState == "normal") {
                    $(this).addClass("missingLetter");
                    $(this).removeClass("normalLetter");
                    $(this).attr("title", "lettre omise");
                    $(this).attr("data-state", "cross");
                    let wclass = $(this).attr("class");
                    let wclassarray = wclass.split(" ");
                    $("#" + wclassarray[0]).addClass("attention");
                } else {
                    $(this).addClass("normalLetter");
                    $(this).removeClass("missingLetter");
                    $(this).attr("title", "");
                    $(this).attr("data-state", "normal");
                }
                checkDiff(this);
            });
        }

        // The word in text must have a mark if one letter is marked !
        function checkDiff(verifletter) {
            var verifCross = false;
            let wordTarget = $(verifletter).attr("data-word");
            $(".letter").each(function(index, element) {
                let state = $(element).attr("data-state");
                if (state == "cross") {
                    verifCross = true;
                    return
                }
            })
            if (verifCross) {
                $("#" + wordTarget).addClass("attention");
            } else {
                $("#" + wordTarget).removeClass("attention");
            }
        }
    });



}