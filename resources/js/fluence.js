import { COPYFILE_FICLONE_FORCE } from "constants";
import tagtext from "./textTagger";
import closeAllMC from './closeAll';
import * as Rconti from './Rcontainer';
import wordActivator from './wordActivator';
import wordCMenu from './Word_CMenu';
import spaceCMenu from './space_Cmenu';
import punctCMenu from './punctCMenu';
import timerCmenu from './timer_CMenu';
/* import badgeSystem from './badgeSystem';
import markLiaison from './markLiaison';
import { each } from "jquery"; */
import editorMode from "./editormode";


$(function() {

    //Get Structural Data : 
    try {
        var CData = JSON.parse($(".hiddenData").html());
    } catch (error) {
        var CData = [{
            Corr_Code: "",
            Corr_cluster_id: "",
            item_id: "",
            id: "",
            results: ""
        }];

    }


    try {
        var CItem = JSON.parse($(".hiddenItem").html());
    } catch (error) {
        var CItem = [{
            content: "",
            instructions: ""
        }];

    }

    Rconti.RContainer.liaisons = [];


    var textRef = CItem[0].content;
    var instructions = CItem[0].instructions;
    /*  var CorrCode = CData[0].Corr_Code;
     var CorrCluster = CData[0].Corr_cluster_id;
     var Corritem = CData[0].item_id;
     var ttID = CData[0].id;
     var results = CData[0].results; */

    //var PerfStat = CData[0].state; // TODO
    var originalText = textRef;

    var hesiWords = []; //List of word id 

    var workState = countState();
    var mediaFolderName = CData[0].mediafolder;
    //console.log(mediaFolderName);
    $(".mediaFolderName").html(mediaFolderName);
    $(".todo").html(workState.todo);
    $(".done").html(workState.done);

    $("audio").attr("src", "/../uploads/" + mediaFolderName + "/" + CData[0].mediafilename + ".mp3");

    $(".itemInfo").html(
        "Correction Media folder : " + CItem[0].mediapath +
        " - Title: " + CItem[0].corrname +
        " - Subject: " + CItem[0].subject +
        " - Level: " + CItem[0].level +
        " - Grade: " + CItem[0].grade
    );

    if (CItem[0].corrname == "Cette correction est terminée") {
        $(".editZone").html("<div class='fini'>Cette correction est terminée.</div>");
        $(".testtaker ").hide();
        $(".toolbarCorrection").hide();
        $(".bigReset").hide();
        $("#commentPerf").hide();
        $(".commentTitle").hide();
        $(".textSpace").hide();
    }

    $("#mp3").attr("src", "/../uploads/" + mediaFolderName + "/" + CData[0].mediafilename + ".mp3");

    //Hide time tagger button
    $(".timeOption").hide();

    // Array of all test takers selected For new correction (TODO)
    var alltt = [];
    for (let i = 0; i < CData.length; i++) {
        alltt.push(CData[i].id);
        $("#jump").append("<option value =" + CData[i].id + ">" + CData[i].id + "</option>");
    }
    $("#jump").prop("selectedIndex", 1);
    // Jump from selector list
    $("#jump").on("change", function() {
        let newval = $(this).val();
        loadTTData(newval);

    });

    $("body").on("click", function() {
        closeAllMC();
    })


    $(".openEditorMode").on("click", function() {
        editorMode();
    });

    $(".HLliaisons").on("click", function() {
        $(".liaisonTrack").css("backgroundColor", "green");
        $(".liaisonTrackED").css("backgroundColor", "green");
        Rconti.RContainer.tracker[3] = true;
        $(".liaiOblig").toggleClass("spaceRed");
    });

    $(".HLcomplexWords").on("click", function() {
        $(".mComplexTrack").css("backgroundColor", "green");
        $(".mComplexTrackED").css("backgroundColor", "green");
        Rconti.RContainer.tracker[2] = true;
        $(".complexWord").toggleClass("yellowWord").removeClass("h_word");
    });

    installModal(instructions);
    installModalTTagger();
    displayWarningLiaisons();
    displayEditorInfo();


    function countState() {
        var stateCounter = {
            "todo": "0",
            "done": "0"
        };
        var todo = 0,
            done = 0;
        for (let i = 0; i < CData.length; i++) {
            if (CData[i].state == "todo") {
                todo++
            }
            if (CData[i].state == "done") {
                done++
            }
        }
        stateCounter.todo = todo;
        stateCounter.done = done;
        return stateCounter
    }

    // load TT Data   
    function loadTTData(nextOne) {
        //console.log("Depuis LoadTTdata");
        for (let i = 0; i < CData.length; i++) {
            if (CData[i].id == nextOne) {
                //Load media    
                $("audio").attr("src", "/../uploads/" + mediaFolderName + "/" + CData[i].mediafilename + ".mp3");

                // Reset the text
                $(".h_word").each(function() {
                    $(this).removeClass("h_word")
                });
                $(".stop_word").each(function() {
                    $(this).removeClass("stop_word")
                });
                $(".badgeWord").trigger("dblclick");
                $(".firstWordRead").each(function() {
                    $(this).removeClass("firstWordRead")
                });
                $(".ctimeBox").remove();
                $(".liaigroup").remove();

                $('#jump option[value=' + nextOne + ']').prop('selected', true);


            }

        }
    }

    // window.AudioContext = window.AudioContext || window.webkitAudioContext;

    //var originalText = "Il y avait en Westphalie, dans le château de M. le baron de Thunder−ten−tronckh, un jeune garçon à qui la nature avait donné les mœurs les plus douces. Sa physionomie annonçait son âme. Il avait le jugement assez droit, avec l'esprit le plus simple ; c'est, je crois, pour cette raison qu'on le nommait Candide. Les anciens domestiques de la maison soupçonnaient qu'il était fils de la sœur de monsieur le baron et d'un bon et honnête gentilhomme du voisinage, que cette demoiselle ne voulut jamais épouser parce qu'il n'avait pu prouver que soixante et onze quartiers, et que le reste de son arbre généalogique avait été perdu par l'injure du temps. Monsieur le baron était un des plus puissants seigneurs de la Westphalie, car son château avait une porte et des fenêtres. Sa grande salle même était ornée d'une tapisserie. Tous les chiens de ses basses−cours composaient une meute dans le besoin ; ses palefreniers étaient ses piqueurs ; le vicaire du village était son grand aumônier. Ils l'appelaient tous monseigneur, et ils riaient quand il faisait des contes."





    tagtext(originalText);

    //Install modal
    function installModal(nextOne) {
        $('body').prepend('<div class="modalContainer">' +
            '<div class="modal fade" id="modalInstruct" tabindex="-1" role="dialog" aria-labelledby="modalInstructlLabel" aria-hidden="true">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><h5 class="modal-title" id="modalInstructLabel">Instructions</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>' +
            '</button></div><div class="modal-body">' + nextOne + '</div><div class="modal-footer">' +
            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></div>');
    }


    function installModalTTagger() {
        $('body').prepend(
            '<div class="modal" id="TimeTaggerInfo" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">' +
            'Vous êtes en mode Chrono-marqueur, vous allez pouvoir accoler à chaque mot son temps de lecture. ' +
            'Pour cela faites démarrer l\'enregistrement et lorsque vous entendez le mot visé, cliquez dessus, le temps s\'affichera dessous. Pour l\'effacer double cliquer sur ce temps.' +
            '</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-footer">' +
            /*  '<button type="button" class="btn btn-primary" id="confirmDelete">Yes, sure</button>' + */
            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>')
    }

    function displayWarningLiaisons() {
        $('body').prepend(
            '<div class="modal" id="warningDelModal" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">Attention... Êtes-vous sûr(e) de vouloir supprimer cet élément de correction?' +
            '</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-primary" id="confirmDelete">Oui, tout à fait sûr(e)</button>' +
            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Non, pas du tout!</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }

    function displayEditorInfo() {
        $('body').prepend(
            '<div class="modal" id="modalEditInfo" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title">Rappel des règles d\'encodage</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p>Les informations obligatoires sont : </p>' +
            '<ul><li>Qualité audio</li><li>Marquage des temps</li><li>Mots complexes</li><li>Liaisons obligatoires</li></ul>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
    }



    $("#convertor").on("click", function() {
        tagtext();
    });

    $(".word").on("click", function() {
        closeAllMC();
        var isItLast = $(this).attr("class").split(/\s+/);
        if (isItLast.indexOf("lastWordRead") == -1) {
            mark_hesitation(this);
        }

    });

    //How many words ? 
    var allWords = $(".textSpace").find(".word");
    $(".motslus").html(allWords.length)



    jQuery(".text-muted").on('mousedown', function(e) {
        e.preventDefault();
        closeAllMC();
    });

    function mark_hesitation(word) {

        // From stop_word to h-word 
        var isItLast = $(word).attr("class").split(/\s+/);

        // From word to h-word and reverse
        $(word).toggleClass("h_word");
        // Constitution of Array hesiWords based on unique Word ID
        if (hesiWords.indexOf($(word).attr("id")) === -1) {
            hesiWords.push($(word).attr("id"));
            $(word).attr("data", getCurTime());
        } else {
            hesiWords.splice(hesiWords.indexOf($(word).attr("id")), 1)
        }
    }

    $("#QaudioSelect").on("change", function() {
        $(".audioTrack").css("backgroundColor", "green");
        Rconti.RContainer.tracker[0] = true;

        if ($(this).val() == "inaudible" || $(this).val() == "Contenu_Inap") {
            var maskHeight = $(".textSpace").css("height");
            var maskWidth = $(".textSpace").css("width");
            $(".textSpace").prepend("<div class='textMask'></div>");
            $(".textMask").css({ "width": maskWidth, "height": maskHeight });
        } else {
            $(".textMask").remove();
        }
    })

    $("#QaudioSelectEDITOR").on("change", function() {
        $(".audioTrackED").css("backgroundColor", "green");
        Rconti.RContainer.tracker[0] = true;

        if ($(this).val() == "inaudible" || $(this).val() == "Contenu_Inap") {
            var maskHeight = $(".textSpace").css("height");
            var maskWidth = $(".textSpace").css("width");
            $(".textSpace").prepend("<div class='textMask'></div>");
            $(".textMask").css({ "width": maskWidth, "height": maskHeight });
        } else {
            $(".textMask").remove();
        }
    })



    //Building JSON RESPONSE To send to Database CREATION

    $('#dataFlex').on("submit", function() {
        var jsondata = {};
        Rconti.RContainer.audioQ = $("#QaudioSelect option:selected").val();
        console.log(Rconti.RContainer);
        //debugger
        Rconti.RContainer.comment = $("#commentPerf").val();
        $(".h_word").each(function() {
            $(this).attr("id");
            Rconti.RContainer.Hword.push($(this).attr("id"));
        })

        console.log(Rconti.RContainer);
        jsondata = Rconti.RContainer;


        $("#datacorr").val(JSON.stringify(jsondata));
        $("#perfid").val((getPerfActiv()));
        console.log(jsondata);

        return true; // return false to cancel form action
    });

    //Building JSON RESPONSE To send to Database MODIFY EDITION
    $('#EMdataFlex').on('submit', function() {
        var jsondata = {};

        Rconti.RContainer.audioQ = $("#QaudioSelectEDITOR option:selected").val();

        Rconti.RContainer.comment = $("#commentPerf").val();
        $(".h_word").each(function() {
            $(this).attr("id");
            Rconti.RContainer.Hword.push($(this).attr("id"));
        })
        console.log(Rconti.RContainer)

        //Results
        jsondata = Rconti.RContainer;
        $("#EMdatacorr").val(JSON.stringify(jsondata));
        var perfActiv = $("#jumpDone option:selected").val();
        $("#EMperfid").val(perfActiv);
        console.log(jsondata);


        return true; // return false to cancel form action
    });


    var audioQSelected;


    $('#audioQ').on("change", function() {
        audioQSelected = $('.audioQ option:selected').attr('value');
        $(".audioChoice").html("{audio:" + audioQSelected + "}");
    })

    var prosodySelected
    $('#prosodyQ').on("change", function() {
        prosodySelected = $('.prosodyQ option:selected').attr('value');
        $(".prosodyChoice").html("{prosody:" + prosodySelected + "}");
    })

    var fluenceSelected
    $('#fluenceQ').on("change", function() {
        fluenceSelected = $('.fluenceQ option:selected').attr('value');
        $(".fluenceChoice").html("{fluence:" + fluenceSelected + "}");
    })

    function sendResult() {
        // for hesitation
        var recupHesit = []
        $(".hesi").each(function() {
            recupHesit.push($(this).html())
        });
        $(".hesitationItems").html(JSON.stringify(recupHesit));
        // for stop word
        $(".lastWordItem").html($(".lastWordRead").html());
        $(".commentData").html($('.commentText').val());
    }

    function getCurTime() {
        return audio.currentTime;
    }

    function getPerfActiv() {
        var perfActive = $("#jump option:selected").text();
        return perfActive;
    }


    function defaultWdays() {
        var counttt = 50;
        var wdays = counttt / parseInt($(this).val());
        $("#wdays").html(wdays);
    }

    defaultWdays();
    // Time tagger Mode------------------------------

    var wordTimerArray = [];
    //Time tagger installation
    $(".timeTagger").on("click", function() {
        var modeActif = $(".mode").html();
        if (modeActif == "Edition") {
            //Load data !!! 
            var actifRecord = $("#jumpDone").val();
            console.log(actifRecord);
            $(".ctimeBox").remove(); // Clean timetagger state if used in creation mode before.
            for (let i = 0; i < Rconti.CorrDoneData.length; i++) {
                if (Rconti.CorrDoneData[i].id == actifRecord) {
                    console.log(Rconti.CorrDoneData[i].id)
                    var editResult = JSON.parse(Rconti.CorrDoneData[i].results);
                    console.log(editResult.timer)
                    for (let y = 0; y < editResult.timer.length; y++) {
                        $("#" + editResult.timer[y].origin).after("<div data-w=" + editResult.timer[y].origin + " class='ctimeBox'>" + editResult.timer[y].time + "</div>")
                    }
                }

            }




        }

        $(".chronoTrack").css("backgroundColor", "green");
        $(".chronoTrackED").css("backgroundColor", "green");
        Rconti.RContainer.tracker[1] = true;

        //show chrono-mark
        $(".ctimeBox").show();

        //Prepare context
        $(".editZone").slideUp();
        $(".textSpace").find("input").prop("disabled", true).css("cursor", "default");

        //Hidding Buttons 
        $(".HLcomplexWords").hide();
        $(".HLliaisons").hide();
        $(".displayInstruction").hide();
        $(".B1 a").css({ "color": "gainsboro", "cursor": "default" });
        $(this).hide();
        //Hidding footer element
        $(".commentTitle").hide();
        $("#commentPerf").hide();
        $(".bigReset").hide();
        //Word re-init
        $(".word").off().on("mouseover", function() {
            $(this).css("background", "#77ddff");
        }).on("mouseout", function() {
            $(this).css("background", "none");
        }).on("contextmenu", function() {
            return false;
        });
        // Inib space
        $(".space").off().on("mouseover", function() {
            $(this).css("background", "none");
        }).on("mouseout", function() {
            $(this).css("background", "none");
        }).on("contextmenu", function() {
            return false;
        });

        // Inib ponct
        $(".ponct").off().on("mouseover", function() {
            $(this).css("background", "none");
        }).on("mouseout", function() {
            $(this).css("background", "none");
        }).on("contextmenu", function() {
            return false;
        });

        //Add img
        $(".textSpace").css('background', 'url(../images/chrono.png) 750px 46px no-repeat');
        $(".textSpace").css('background-color', "#effbff");

        //Show Time tagger button
        $(".timeOption").show();

        var startTime = 0
            //Redifine start
        $(".redifStart").on("click", function(e) {
            startTime = getCurTime();
            $(".startValue").html(startTime.toFixed(3));
            Rconti.RContainer.timeReset = startTime.toFixed(3);

        });

        timerCmenu();

        //Time tagger word listener
        $(".word").on("click", function(e) {
            let ctime = getCurTime();
            ctime = ctime - startTime;
            ctime = ctime.toFixed(3)
            $(this).attr("data-ctime", ctime);
            timebadge(e.target, ctime);
        });

        $(".h_word").on("click", function(e) {
            let ctime = getCurTime();
            ctime = ctime - startTime;
            ctime = ctime.toFixed(3)
            $(this).attr("data-ctime", ctime);
            timebadge(e.target, ctime);
        });

        //Reset Timer data
        $(".resetTimer").on("click", function() {
            $("#timerCmenu").hide();
            $(".ctimeBox").remove();
            //wordTimerArray = [];
            Rconti.RContainer.timer = [];

        });



    })

    // Closer Timetagger and restore marker UI !:::::!!!!! 
    $(".closeTTagger ").on("click", function() {
        //Edit Zone
        $(".editZone").slideDown();
        //Line elements
        $(".textSpace").find("input").prop("disabled", false).css("cursor", "default");
        // Button - toolbar 2
        $(".HLcomplexWords").show();
        $(".HLliaisons").show();
        $(".displayInstruction").show();
        $(".timeTagger").show();
        $(".timeOption").hide();

        // Canceler color and func.
        $(".B1 a").css({ "color": "#3490dc", "cursor": "pointer" });
        //Footer elements
        $(".commentTitle").show();
        $("#commentPerf").show();
        $(".bigReset").show();

        //Hide chrono-mark
        $(".ctimeBox").hide();

        //hide contextMenu
        $("#timerCmenu").hide();

        //Click on elements
        $(".word").off();
        wordActivator();
        $(".word").on("click", function() {
            closeAllMC();
            var isItLast = $(this).attr("class").split(/\s+/);
            if (isItLast.indexOf("lastWordRead") == -1) {
                mark_hesitation(this);
            }
        });
        $(".space").off();
        $(".ponct").off();

        //Calling Context Menu for Space, Word, Punctuation
        spaceCMenu();
        wordCMenu();
        punctCMenu();

        //Remove img
        $(".textSpace").css('background', 'none');
        $(".textSpace").css('background-color', "none");


    });


    function getCurTime() {
        return audio.currentTime;
    }

    function timebadge(target, ctime) {
        let wtid = $(target).attr("id");

        if (wordTimerArray.indexOf(wtid) === -1) {
            //console.log(wtid);
            //console.log(wordTimerArray);
            wordTimerArray.push(wtid);
            $(target).after('<div class="ctimeBox" data-w ="' + wtid + '" >' + ctime + '</div>');
            let timeData = new Rconti.timeMark(wtid, ctime);
            //console.log(timeData);
            Rconti.RContainer.timer.push(timeData);
            $(".ctimeBox").on('dblclick', function(e) {

                let delwtid = $(e.target).attr("data-w");
                console.log(delwtid);
                for (let i = 0; i < wordTimerArray.length; i++) {
                    if (wordTimerArray[i] == delwtid) {
                        wordTimerArray.splice(i, 1);
                    }
                }
                //Suppression de la data dans le RContainer à faire
                // Trouver l'ID à virer et la virer ...
                for (let i = 0; i < Rconti.RContainer.timer.length; i++) {
                    if (Rconti.RContainer.timer[i].origin == delwtid) {
                        Rconti.RContainer.timer.splice(i, 1);
                    }

                }
                $(e.target).remove();
            })
        }
    }


    $(".bigReset").on("click", function() {
        window.location.reload(true);
    })

});