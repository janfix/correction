import { COPYFILE_FICLONE_FORCE } from "constants";

$(document).ready(function () {

    //Get Structural Data : 
    try {
        var CData = JSON.parse($(".hiddenData").html()); 
    } catch (error) {
        var CData = [{
            Corr_Code:"",
            Corr_cluster_id:"",
            item_id:"",
            id:"",
            results:""
        }];
        
    }
    
    try {
        var CItem = JSON.parse($(".hiddenItem").html());
    } catch (error) {
        var CItem = [{
            content: "",
            instructions:""
        }];

    }


    var textRef = CItem[0].content;
    var instructions = CItem[0].instructions;
    console.log(instructions);
   /*  var CorrCode = CData[0].Corr_Code;
    var CorrCluster = CData[0].Corr_cluster_id;
    var Corritem = CData[0].item_id;
    var ttID = CData[0].id;
    var results = CData[0].results; */

    //var PerfStat = CData[0].state; // TODO
    var originalText = textRef;
    try {
        var preCorr = JSON.parse(CData[0].precorrection);
    } catch (error) {
        preCorr = {
            'hpreco': '-'
        };
    }
    
    var HesipreCorr = preCorr.hpreco;
    var EndPreCorr = parseInt(preCorr.endpreco);
    var hesiWords = []; //List of word id 

    var workState = countState();
    var mediaFolderName= CData[0].mediafolder;
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

    $("#mp3").attr("src", "/../uploads/" + mediaFolderName +"/"+ CData[0].mediafilename + ".mp3");

    // Array of all test takers selected
    var alltt = [];
    for (let i = 0; i < CData.length; i++) {
        alltt.push(CData[i].id);
        $("#jump").append("<option value =" + CData[i].id + ">" + CData[i].id + "</option>");
    }
    $("#jump").prop("selectedIndex", 1);
    // Jump from selector list
    $("#jump").on("change", function () {
        let newval = $(this).val();
        loadTTData(newval);
    });
    installModal(instructions);

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
        for (let i = 0; i < CData.length; i++) {
            if (CData[i].id == nextOne) {

                //Load media    
                $("audio").attr("src", "/../uploads/" + mediaFolderName + "/" + CData[i].mediafilename + ".mp3");

                // Reset the text
                $(".h_word").each(function () {
                    $(this).removeClass("h_word")
                });
                $(".stop_word").each(function () {
                    $(this).removeClass("stop_word")
                });

                //Load Precorrection
                try {
                     preCorr = JSON.parse(CData[i].precorrection);
                } catch (error) {
                     preCorr = {
                         hpreco: "",
                         endpreco : ""
                     };
                     
                }
               
                HesipreCorr = preCorr.hpreco;
                EndPreCorr = parseInt(preCorr.endpreco);

                $('#jump option[value=' + nextOne + ']').prop('selected', true);
                preCorrectionTags();
               
            }

        }
    }

    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    //var originalText = "Il y avait en Westphalie, dans le château de M. le baron de Thunder−ten−tronckh, un jeune garçon à qui la nature avait donné les mœurs les plus douces. Sa physionomie annonçait son âme. Il avait le jugement assez droit, avec l'esprit le plus simple ; c'est, je crois, pour cette raison qu'on le nommait Candide. Les anciens domestiques de la maison soupçonnaient qu'il était fils de la sœur de monsieur le baron et d'un bon et honnête gentilhomme du voisinage, que cette demoiselle ne voulut jamais épouser parce qu'il n'avait pu prouver que soixante et onze quartiers, et que le reste de son arbre généalogique avait été perdu par l'injure du temps. Monsieur le baron était un des plus puissants seigneurs de la Westphalie, car son château avait une porte et des fenêtres. Sa grande salle même était ornée d'une tapisserie. Tous les chiens de ses basses−cours composaient une meute dans le besoin ; ses palefreniers étaient ses piqueurs ; le vicaire du village était son grand aumônier. Ils l'appelaient tous monseigneur, et ils riaient quand il faisait des contes."





    tagtext(originalText);

    preCorrectionTags();
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


    //Precorrection
    function preCorrectionTags() {
        console.log(HesipreCorr, 'Hesi precor');
        console.log(EndPreCorr, 'End precor');
        if(HesipreCorr =="-"){
            $(".precoTool").hide();
        }else{
        var markerprecor = [];
        for (let i = 0; i < HesipreCorr.length; i++) {
            $(".textSpace").find("#w" + HesipreCorr[i]).addClass("h_word").attr("title", "Hesitation Pre-Correction").addClass("hesipreCorr");
            markerprecor.push("w" + HesipreCorr[i]);
        }
        $(".textSpace").find("#w" + EndPreCorr).addClass("stop_word").attr("title", "End Pre-Correction").addClass("endpreCorr");
        
        hesiWords = markerprecor;
        addToHList(markerprecor);
        let lastWordPreco = $(".textSpace").find("#w" + EndPreCorr).html();
        $(".lastWordRead").html(lastWordPreco);
        }
    }



    $("#preCorrBT").on("click", function () {
        if ($(this).html() == "ACTIVATED") {
            $(this).html("DEACTIVATED");
            $(".textSpace").find(".hesipreCorr").removeClass("h_word");
            $(".textSpace").find(".endpreCorr").removeClass("stop_word");
        } else {
            preCorrectionTags();
            $(this).html("ACTIVATED");
        }


    });

    $("#convertor").on("click", function () {
        tagtext();
    });

    $(".word").on("click", function () {
        mark_hesitation(this);
    });

    $(".word").on("dblclick", function () {
        mark_stop(this);
    });


    jQuery(".text-muted").mousedown(function (e) {
        e.preventDefault();
    });

    function mark_hesitation(word) {

        // From stop_word to h-word 
        var isItLast = $(word).attr("class").split(/\s+/);
        console.log(isItLast);
        for (let i = 0; i < isItLast.length; i++) {
            console.log(isItLast[i]);
            if (isItLast[i] == "stop_word") {
                console.log("MATCH")
                $(word).removeClass("stop_word");
                removeFromHList();
            }
        }
        // From word to h-word and reverse
        $(word).toggleClass("word").toggleClass("h_word");
        // Constitution of Array hesiWords based on unique Word ID
        if (hesiWords.indexOf($(word).attr("id")) === -1) {
            hesiWords.push($(word).attr("id"));
            $(word).attr("data", getCurTime());
        } else {
            hesiWords.splice(hesiWords.indexOf($(word).attr("id")), 1)
        }
        addToHList(hesiWords);
    }

    function mark_stop(word) {
        var isItHesi = $(word).attr("class").split(/\s+/);
        // From word to stop
        // Only One Stop word can exist
        $('.stop_word').removeClass('stop_word');
        $(word).toggleClass("stop_word");
        addToStopList(word);
    }

    function addToHList(hesiArray) {
        $(".h_list").html("");
        for (let index = 0; index < hesiArray.length; index++) {
            let wordtime = $("#" + hesiArray[index]).attr('data');
            //if (!wordtime) {wordtime = "-"}
            //$(".h_list").append("<li class='hesi' id='" + hesiArray[index] + "' >" + $("#" + hesiArray[index]).html() + " : " + wordtime + " sec. ");
            let checkTWord = $("#" + hesiArray[index]).html()
            if(typeof checkTWord != "undefined"){$(".h_list").append("<li class='hesi' id='" + hesiArray[index] + "' > " + checkTWord +" ");}
            
        }
    }

    function removeFromHList() {
        $(".lastWordRead").empty();
    }

    function addToStopList(word) {
        console.log(word);
        $(".h_list").find($('#' + $(word).attr('id'))).remove(); // If in stopList, never in hlist
        //$(".lastWordRead").html($(word).html() + " : " + $("#" + word.id).attr("data") + "sec.");
         $(".lastWordRead").html($(word).html());
    }

    

    function tagtext(text2tag) {
        var st_brut = text2tag;
        var st_arr = [];
        var st_tag = "";
        //First tag
        //st_tag = '<div id= "w1" class="word" onclick="mark_hesitation(this)" ondblclick="mark_stop(this)">' + st_brut;
        if (st_brut) {
            st_arr = st_brut.split(" ")
        };
        //console.log(st_arr);
        for (let i = 0; i < st_arr.length; i++) {
            st_tag = st_tag + st_arr[i] + '</div><div id= "w' + (i) + '" class="word" > ';
        }

        st_tag = '<div id= "w" class="word">' + st_tag + '</div>';
        //console.log(st_tag);
        $(".text-muted").html(st_tag);
        //var count = (st_brut.match(/ /g) || []).length;

    }

    function insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index);
    }


//Building JSON RESPONSE To send to Database

$('#dataFlex').submit(function () {
     var jsondata = {};
     jsondata.audioQ = $("input[name='audioQ']:checked").val();
     //Prepare Hesitation words
     var hesiResponse = [];
     $(".hesi").each(function () {
         hesiResponse.push($.trim($(this).html()));
     })
     jsondata.hesiW = hesiResponse;
     jsondata.lastW = $.trim($(".lastWordRead").html());
     jsondata.prosody = $("#prosodyQ").val();
     jsondata.fluence = $("#fluenceQ").val();
     jsondata.comment = $(".commentText").val();

     $("#datacorr").val(JSON.stringify(jsondata));
     $("#perfid").val((getPerfActiv()));
     console.log(jsondata);
    return true; // return false to cancel form action
});

$("#FAKER").on("click", function(){
     var jsondata = {};
    jsondata.audioQ = $("input[name='audioQ']:checked").val();
    //Prepare Hesitation words
    var hesiResponse = [];
    $(".hesi").each(function(){
        hesiResponse.push($.trim($(this).html()));
        })
    jsondata.hesiW = hesiResponse;
    jsondata.lastW = $.trim($(".lastWordRead").html());
    jsondata.prosody = $("#prosodyQ").val();
    jsondata.fluence = $("#fluenceQ").val();
    jsondata.comment = $(".commentText").val();
    
    $("#datacorr").val(JSON.stringify(jsondata));
    console.log(jsondata);
    console.log(getPerfActiv());

})

    var audioQSelected;


    $('#audioQ').on("change", function () {
        audioQSelected = $('.audioQ option:selected').attr('value');
        $(".audioChoice").html("{audio:" + audioQSelected + "}");
    })

    var prosodySelected
    $('#prosodyQ').on("change", function () {
        prosodySelected = $('.prosodyQ option:selected').attr('value');
        $(".prosodyChoice").html("{prosody:" + prosodySelected + "}");
    })

    var fluenceSelected
    $('#fluenceQ').on("change", function () {
        fluenceSelected = $('.fluenceQ option:selected').attr('value');
        $(".fluenceChoice").html("{fluence:" + fluenceSelected + "}");
    })

    function sendResult() {
        // for hesitation
        var recupHesit = []
        $(".hesi").each(function () {
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

    //Slider 
    $(".ttPrevious").on("click",
        function () {
            let activePerf = getPerfActiv();
            loadTTData(parseInt(activePerf) - 1);
            $("main").animate({
                marginLeft: '-=2000px'
            }, 1000, function () {
                $("main").hide();
                $("main").css("marginLeft", '0px');
                $("main").show();
            })
        });

    $(".ttNext").on("click",
        function () {
            let activePerf = getPerfActiv();
            console.log(parseInt(activePerf) + 1);
            loadTTData(parseInt(activePerf) + 1);
            $("main").animate({
                marginLeft: '+=2000px'
            }, 1000, function () {
                $("main").hide();
                $("main").css("marginLeft", '0px');
                $("main").show();
            })
        });
    /* console.log("datatable");
    $('#example').DataTable(); */



    function defaultWdays() {
        var counttt = 50;
        var wdays = counttt / parseInt($(this).val());
        $("#wdays").html(wdays);
    }

    defaultWdays();

    console.log("ready!");
});




