// IDM 
$(document).ready(function() {
    var strWord = $(".IDMhiddenItem").html();
    //console.log(strWord);
    try {
        strWord = JSON.parse(strWord);
    } catch (error) {
        strWord = [{ word: "none" }];
    }
    var wordobj;
    try {
        wordobj = JSON.parse(strWord[0].content);
    } catch (error) {
        wordobj = { words: ["none"] }
    }

    var brutMediaNameSTR = $(".itemAvailable").html().trim().slice(0, -1);
    var brutMediaName = brutMediaNameSTR.split(",");
    // console.log(brutMediaName);
    var wordFilter = [];
    var wordOK = [];
    var allWords = wordobj.words;
    //console.log(allWords);
    for (let i = 0; i < brutMediaName.length; i++) {
        let OneItem = brutMediaName[i].split("_")[1];
        wordFilter.push(OneItem);
    }
    //console.log(wordFilter);

    for (let i = 0; i < wordFilter.length; i++) {
        for (let y = 0; y < allWords.length; y++) {
            if (wordFilter[i] == y) {
                wordOK.push(allWords[y]);
            };
        }
    }
    //console.log(wordOK);
    var wordArray = wordobj.words;
    //console.log(wordArray);
    var wordArrayDone = [];

    var strCorr = $(".IDMhiddenData").html();
    var IDMCorrobj;
    try {
        IDMCorrobj = JSON.parse(strCorr);
    } catch (error) {
        IDMCorrobj = [{ state: "", mediafilename: "null_null" }]
    }

    //console.log(IDMCorrobj[0].mediafilename);
    //Scan the item completely done
    console.log(IDMCorrobj);

    for (let i = 0; i < wordArray.length; i++) {
        let itemCpt = 0,
            itemCptTodo = 0;
        for (var key in IDMCorrobj) {
            if (IDMCorrobj.hasOwnProperty(key)) {
                let stritemByTTid = IDMCorrobj[key].mediafilename;
                let itemByTTid = stritemByTTid.split("_");
                if (itemByTTid[1] == i) {
                    if (IDMCorrobj[key].state == "todo") {
                        ++itemCptTodo
                    }
                }
            }
        }
        if (itemCptTodo == 0) {
            wordArrayDone.push(wordArray[i]);
        }

    }
    //Build the done list    
    for (let i = 0; i < wordArrayDone.length; i++) {
        $("#wordDone").append(
            '<option value=' + wordArrayDone[i] + '>' + wordArrayDone[i] + '</option>');
    }



    $(".idmValidation").on("click", function() {
        var btMention = $(this).html();
        var $that = $('.IDMttTodo').find('.active').clone();
        var recordID = $that.attr("data");
        IDMCorrobj[recordID].state = "done";

        $('.IDMttTodo').find('.active').animate({
            left: "+800px",
            opacity: "0"
        }, 500, function() {
            $(this).fadeOut('slow').remove();


            /* $(".IDMListDone").prepend($that);
            $that.append(" : <span class='green'>" + btMention + "</span> | <a href='#'><i class='fa fa-edit'></i></a>");
            $that.animate({
                opacity: "0"
            }, 100, function () {
                $that.removeClass("active");
                $that.animate({
                    opacity: 1
                }, 100);
            }); */
            $('.IDMttTodo ul li:first').addClass("active");


            var active_TT = $('.IDMttTodo ul li:first').html();
            $("#ttidactiv").html(active_TT);

        });

    })

    var zeActiveWord = $(".activWord").html();

    if (zeActiveWord == '_') {
        zeActiveWord = wordArray[0];
        getmediaIDM(wordArray[0]);
    } else {
        $("#worditem").val(zeActiveWord).change();
        $("#wordToListen").html(zeActiveWord);

        getmediaIDM(zeActiveWord);
    }

    $("#worditem").on('change', function() {
        var choosenWord = $(this).val();
        $("#wordToListen").html(choosenWord);
        $(".activWord").html(choosenWord);
        zeActiveWord = $(".activWord").attr('value', choosenWord);
        getmediaIDM(choosenWord);
        audioSourceDef(choosenWord)

    });

    // Default LOAD 
    var uniqWord = [];
    var greyWords = JSON.parse($(".greyWords").html());

    for (let i = 0; i < (wordArray.length); i++) {

        for (let y = 0; y < wordOK.length; y++) {
            if (wordOK[y] == wordArray[i]) {
                if (uniqWord.indexOf(wordOK[y]) == -1) {
                    uniqWord.push(wordOK[y]);
                }
            }
        }

    }
    for (let i = 0; i < uniqWord.length; i++) {
        if (zeActiveWord == uniqWord[i]) {
            $("#worditem").prepend('<option selected  class="' + uniqWord[i] + '"  value="' + uniqWord[i] + '">' + uniqWord[i] + '</option>');
        } else {
            $("#worditem").append('<option class="' + uniqWord[i] + '"  value="' + uniqWord[i] + '">' + uniqWord[i] + '</option>');
        }

    }

    for (let i = 0; i < greyWords.length; i++) {
        $("." + greyWords[i]).css("color", "lightgrey");
    }

    //Delete Done from list
    /* for (let i = 0; i < wordArrayDone.length; i++) {
        $("#worditem ." + wordArrayDone[i]).remove();
    } */

    $("#worditem option:first").attr("selected", 'selected');
    $("#wordToListen").html($("#worditem option:first").val());

    /* $("#wordDone").on('change', function () {
        var choosenWord = $(this).val();
        $("#wordToListen").html(choosenWord);
        $(".activWord").html(choosenWord);
        zeActiveWord = $(".activWord").attr('value', choosenWord);
        getmediaIDM(choosenWord);
        audioSourceDef(choosenWord)

    }); */


    function getmediaIDM(Witem) {
        var idrecord;
        console.log(Witem);

        $(".IDMtodoList").empty();
        $(".IDMListDone").empty();
        for (var key in IDMCorrobj) {

            let strTTid = IDMCorrobj[key].mediafilename;
            let StateItem = IDMCorrobj[key].state;
            let ResultItem = IDMCorrobj[key].results;
            let arrTTid = strTTid.split("_");
            if (Witem == wordArray[arrTTid[1]] && StateItem == "todo") { // Filter word on WordArray index
                // console.log(arrTTid[1]);
                idrecord = IDMCorrobj[key].id;
                $(".IDMtodoList").append(
                    '<li class="list-group-item idmtodoit" name=' + idrecord + ' data="' + i + '">' + arrTTid[0] + '</li>'
                );

            }
            if (Witem == wordArray[arrTTid[1]] && StateItem == "done") { // Filter word on WordArray index
                // console.log(arrTTid[1]);
                idrecord = IDMCorrobj[key].id;
                let bgDone
                if (ResultItem == 'Acceptable') {
                    bgDone = 'bg-success';
                } else if (ResultItem == 'Insufficient') {
                    bgDone = 'bg-danger ';
                } else if (ResultItem == 'Too noisy') {
                    bgDone = 'bg-secondary text-warning ';
                } else {
                    bgDone = "bg-warning text-secondary "
                };

                $(".IDMListDone").append(
                    '<li class="list-group-item idmdoneit ' + bgDone + '" name=' + idrecord + ' data="' + i + '">' + arrTTid[0] + ' - ' + ResultItem + '<div class="backContainer" title="Cancel correction">' + $('.backTodoForm').html() + '</div>'
                );
            }
        }

        var wordToControl = $(".activWord").html();
        if (wordToControl == "_") {
            wordToControl = wordArray[0];
            audioSourceDef(wordToControl);
        } else {
            audioSourceDef(wordToControl);
        }


        function audioSourceDef(zeword) {
            console.log(zeword);
            let ttNumber = $("ul .idmtodoit").first().html();
            let itemNumber = wordArray.indexOf(zeword);
            //console.log(wordArray);
            //console.log(itemNumber);
            $("#audioItem").attr('src', '../uploads/corr1/' + ttNumber + '_' + itemNumber + '.mp3 ');
        }


        $(".backTodo").on('click', function() {
            let recid = $(this).parent().parent().parent().attr("name");
            $(this).parent().parent().parent().find(".idmttid").val(recid);

            $(this).parent().parent().parent().animate({
                left: "-800px",
                opacity: "0"
            }, 500, function() {
                $(this).fadeOut('slow').remove();
            });
        });


        $(".IDMtodoList li:first").addClass("active");
        $("#ttidactiv").html($(".IDMtodoList li:first").html());

        //Fridge the user must send the first of the list ! 
        /*  $(".idmtodoit").on("click", function () {
            $(".idmtodoit").each(function () {
                $(this).removeClass('active');
            })
            $(this).toggleClass("active");
            $("#ttidactiv").html($(".IDMtodoList .active").html());      
        }); */

        let recid = $(".IDMtodoList .active").attr("name"); // grab the id in database
        $(".idmttid").attr("value", recid);

    }


}); //End of doc ready