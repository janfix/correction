import letterBadgeUpdate from './letterBadgeUpdate';
import clearAllMarks from './clearAllMarks';
import badgeSystem from './badgeSystem';
import markLiaison from './markLiaison';
import * as Rconti from './Rcontainer';

export default function editorMode() {

    // Load data from JSON generated by request on correction done 
    var CorrDoneData = Rconti.CorrDoneData;

    // Array of all test takers selected For correction done (DONE)
    var allttDone = [];
    $("#jumpDone").empty();
    for (let i = 0; i < CorrDoneData.length; i++) {
        allttDone.push(CorrDoneData[i].id);
        $("#jumpDone").append("<option value =" + CorrDoneData[i].id + ">" + CorrDoneData[i].id + "</option>");
    }
    //Put Select box by default on 1rst Record
    $("#jumpDone").prop("selectedIndex", 0);

    //Build R object for response from RQdone By default 0 (First Record)
    var R = JSON.parse(CorrDoneData[0].results);

    // Install UI for edition
    $(".mode").html("Edition"); //Edition
    $(".ttEditor").css("display", "inline");
    $(".testtaker").hide();
    $(".corrapp").css("background-color", "#fff3ef");
    clearAllMarks();
    $(".closeTTagger").trigger("click");



    //Update data First element by default
    updateData()

    //Install listener on Test Taker Select to get ID value 
    $("#jumpDone").on("change", function() {
        $(".closeTTagger").trigger("click");
        for (let i = 0; i < CorrDoneData.length; i++) {
            if (CorrDoneData[i].id == $(this).val()) {
                R = JSON.parse(CorrDoneData[i].results);

                clearAllMarks();
                // $(".liaigroup").remove();
                updateData(CorrDoneData[i].id);
                Rconti.RContainer.badges = R.badges;
                Rconti.RContainer.liaisons = R.liaisons;
                Rconti.RContainer.letterBadges = R.letterBadges;

            }
        }
    })

    function updateData(IDActif) {
        Rconti.RContainer.timer = R.timer;
        console.log(R.timer)

        //AudioQuality
        $("#QaudioSelectEDITOR").val(R.audioQ);
        $("#commentPerf").val(R.comment);
        console.log(R);
        if (R.tracker[0] == true) {
            $(".audioTrackED").css("backgroundColor", "green");
        } else {
            $(".audioTrackED").css("backgroundColor", "red");
        }
        if (R.tracker[1] == true) {
            $(".chronoTrackED").css("backgroundColor", "green");
        } else {
            $(".chronoTrackED").css("backgroundColor", "red");
        }
        if (R.tracker[2] == true) {
            $(".mComplexTrackED").css("backgroundColor", "green");
        } else {
            $(".mComplexTrackED").css("backgroundColor", "red");
        }
        if (R.tracker[3] == true) {
            $(".liaisonTrackED").css("backgroundColor", "green");
        } else {
            $(".liaisonTrackED").css("backgroundColor", "red");
        }

        //FirstWord and lastW Recovery
        if (R.firstWord.length > 0) { $("#" + R.firstWord).addClass("firstWordRead"); }
        //TODO : cancel lines and words before ! 
        //TODO : Listener to cancel
        if (R.lastWord.length > 0) { $("#" + R.lastWord).addClass("lastWordRead"); }
        //TODO : cancel lines and words after ! 
        //TODO : listener dblckick to cancel


        //Loops automatic manage empty fields
        //Badges
        for (let i = 0; i < R.badges.length; i++) {
            console.log(R.badges[i])
            var badgeData = {}
            badgeData.initial = R.badges[i].codeError;
            badgeData.mention = R.badges[i].type;
            badgeSystem("#" + R.badges[i].origin, badgeData, "load");
        }
        //Highlighted Words 
        for (let i = 0; i < R.Hword.length; i++) {
            $("#" + R.Hword[i]).addClass("h_word");

        }
        //Liaisons
        for (let i = 0; i < R.liaisons.length; i++) {
            var loc = $("#" + R.liaisons[i][1])[0];
            var lType = R.liaisons[i][0];
            console.log(lType);
            markLiaison(loc, lType);
        }

        //Badges For letters - First LOAD - !

        for (let i = 0; i < R.letterBadges.length; i++) {
            var letterData = {};
            letterData.origin = R.letterBadges[i][1].origin;
            letterData.type = R.letterBadges[i][1].type;
            letterBadgeUpdate(letterData);
        }

        //Display only 1 record ChronoTag ! 
        var activRecord = $("#jumpDone").val();
        console.log(activRecord);




    }
    // Close Editor and return to new correction mode
    $(".closeEditorMode").on("click", function() {
        $(".mode").html("Creation");
        $(".ttEditor").hide();
        $(".testtaker").show();
        $(".corrapp").css("background-color", "#F8F9FA");
        clearAllMarks();
        $(".trackIcon").css("background-color", "crimson");
        Rconti.RContainer.liaisons = [];
        $(".textSpace").find(".ctimeBox").remove();

    });


    return R
}