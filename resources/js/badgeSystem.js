// Licence Create commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author : Jean-Philippe Rivière - Wiquid - January 2020 project
// Base idea of project DEPP. Ministère de l'éducation nationale - France
import * as Rconti from './Rcontainer';
import RWordCount from './wordcounter';


//POP OVER Free Annotation
export default function badgeSystem(zeTarget, bdgType, mode) {
    var ElementType = $(zeTarget).attr("data-type"); // Letter or Word ?
    console.log(bdgType);
    console.log(ElementType);
    console.log(mode);
    if (typeof ElementType == "undefined") {
        ElementType = bdgType.unit;
    }
    var styleElement;
    var Tracker;
    var badgeTracker;

    if (ElementType == "letter") {
        styleElement = "badgeLetter";
    } else {
        styleElement = "badgeWord";
        if (bdgType.initial == "30") {
            $(".badgeWord:contains('30')").remove();
        }
    }

    if (ElementType == "letter") {

        /* console.log(zeTarget);
        console.log(bdgType); */

        Tracker = $(zeTarget).parent().attr('id');
        var uniqID = Tracker + bdgType.initial;
        /*         console.log(uniqID);
                console.log(Tracker);
         */

        badgeTracker = new Rconti.letterBadges(bdgType.initial, bdgType.mention, Tracker, uniqID);
        console.log(badgeTracker);
        var wordCode = badgeTracker.origin.split("L");
        if (mode == "creation") {
            console.log("YYYYYYYYESTU?");
            Rconti.RContainer.letterBadges.push([wordCode[0], badgeTracker]);
            console.log(Rconti.RContainer.letterBadges);
        } else {
            console.log("MODE EDITION BADGE LETTRE")
        }

        $(zeTarget).parent().find(".badgeContainer").append('<div id="' + uniqID + '" title="' + bdgType.mention + '" class="' + styleElement + ' freeNote" data-content="<i>' + bdgType.comment + '</i>">' + bdgType.initial + '</div>');

        if (bdgType.initial == "A") {
            $(zeTarget).append("<span class='DIA'>|</span>");
            var wordCandidate = $("#" + $(zeTarget).parent().data("word")).html();
            let restWord = [];
            restWord = $(zeTarget).parent().attr("id").split("L");
            let startLetter = eval(restWord[1]) + 1;
            for (let i = startLetter; i < wordCandidate.length; i++) {
                let Restselector = restWord[0] + "L" + i;
                $("#" + Restselector).addClass('missingLetter');

            }
        }

        if (bdgType.initial == "O") {
            $(zeTarget).addClass("missingLetter").removeClass("normalLetter");
        }

    } else { //badges word ! 
        Tracker = $(zeTarget).attr('id');
        var uniqID = Tracker + bdgType.initial;
        //badgeTracker = new Rconti.badges(bdgType.initial, bdgType.mention, Tracker, uniqID);
        badgeTracker = {
            codeError: bdgType.initial,
            type: bdgType.mention,
            origin: Tracker,
            id: uniqID
        }
        let modeActif = $(".mode").html();
        if (modeActif == "Creation") { //CREATION MODE 
            Rconti.RContainer.badges.push(badgeTracker);
            let targetID = $(zeTarget).attr("id");
            $(zeTarget).after('<div id="' + uniqID + '" title="' + bdgType.mention + '" class="' + styleElement + ' freeNote " data-content="<i>' + bdgType.comment + '</i>" data-ref="' + targetID + '" >' + bdgType.initial + '</div>');
            if (bdgType.initial == "E") {
                $("#" + targetID).addClass("missingLetter");
            }
            if (bdgType.initial == '><') {
                console.log("INVERSION");
            }
        } else {
            var perfActiv = $("#jumpDone option:selected").text();
            console.log(perfActiv); //INDIVIDU CODE ID
            //REECRIRE A CONDITION QUE CELA SOIT LE BON INDIVIDU ET QUE LE BADGE SOIT UNIQUE SUR L'ELEMENT.
            //Il faut que Badges soit initialisé et maintenu à jour sur la base du done, 
            //puis des modifs faites en cours...et cela affectée à un individu!
            Rconti.RContainer.badges.push(badgeTracker);



            let targetID = $(zeTarget).attr("id");
            $(zeTarget).after('<div id="' + uniqID + '" title="' + bdgType.mention + '" class="' + styleElement + ' freeNote " data-content="<i>' + bdgType.comment + '</i>" data-ref="' + targetID + '" >' + bdgType.initial + '</div>');
            if (bdgType.initial == "E") {
                $("#" + targetID).addClass("missingLetter");
            }
            if (bdgType.initial == '><') {
                console.log("INVERSION");
            }
        }
    }

    console.log(Rconti.RContainer);

    $(document).on("dblclick", ".badgeWord", function() {
        $(".popover").hide();
        removeData(this);
        $(this).remove();
        $("#" + $(this).attr("data-ref")).removeClass("missingLetter");
        RWordCount();
    });

    $(document).on("dblclick", ".badgeLetter", function(e) {
        let specialCase = $(this).attr("title");
        // console.log(specialCase);
        if (specialCase == "Scalling Point" || specialCase == "Point d'arrêt" || specialCase == "Ommission") {
            if (typeof $(e.target).parent().parent().attr("id") !== "undefined") {
                let IdentifWord = $(e.target).parent().parent().attr("id").split("L");
                if (typeof IdentifWord !== "undefined") {}
                console.log(IdentifWord);
                let WordLength = $("#" + IdentifWord[0]).html().length
                $(".DIA").remove();
                for (let i = IdentifWord[1]; i < WordLength; i++) {
                    $("#" + IdentifWord[0] + "L" + i).removeClass("missingLetter");
                    $("#" + IdentifWord[0] + "L" + i).find(".exactLetter").removeClass("missingLetter");
                }
            }
        }

        //Si on est en Creation c'est removeData ci-dessous, si on modifie c'est un nouveau prog. avec R, CAD on écrit dans le HTML caché toutes les modifs à chaud.
        //Donc à chaque modif, on charge tout le json et on le modifie, puis on le réécrit en dur.
        removeData(this);
        $(this).remove();
    });

    function removeData(that) {
        console.log(that)
        let remID = $(that).attr("id"); // ID to remove
        let modeActif = $(".mode").html();
        let TTactif = $("#jumpDone").val();
        let IDLetterBadge = that.id
        console.log($(that).attr("class").search("badgeLetter"));


        if ($(that).attr("class").search("badgeLetter") == -1) { //Simple Word Badge Deletion
            for (let i = 0; i < Rconti.RContainer.badges.length; i++) {
                if (remID == Rconti.RContainer.badges[i].id) {
                    Rconti.RContainer.badges.splice(i, 1);
                }
            }

        } else { //badgeLetter Deletion
            console.log(Rconti.RContainer);

            for (let y = 0; y < Rconti.RContainer.letterBadges.length; y++) {
                console.log(Rconti.RContainer.letterBadges[y][1].id);
                console.log(that.id)
                if (Rconti.RContainer.letterBadges[y][1].id == that.id) {
                    console.log("DELETOR")
                    Rconti.RContainer.letterBadges.splice(y, 1);
                }
            }
        }


    }


    $(document).on("contextmenu", ".badgeWord", function(e) {
        e.preventDefault();
    });



}