import oralEditorMode from './scoral/oraleditormode';

$(function() {

    console.log("16:28");

    //Result container 
    var Roral = {
        audioQ: "",
        QAnswers: [0],
        comment: ""
    }

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


    var hCorDone = JSON.parse($(".hiddenCorrDone").html());
    console.log(hCorDone);
    if (hCorDone.length == 0) {
        $(".oralEditorMode").prop("disabled", true);
    }
    console.log(CData[0].id)
    if (CData[0].id == "") {
        /*      $(".middlePart").empty();                
                $(".commentPerfContainer").empty(); */
        $(".toptitle").html('<h2>Evaluer la production orale : Correction terminée</h2><p>Vous avez terminé vos corrections, vous pouvez rééditer vos choix et de les modifier.</p>');
        $(".oralEditorMode").prop("disabled", "true");
        $("#QaudioSelect").prop("disabled", "true");


        oralEditorMode();

    }



    if (CItem[0].itemtype == "Oral_production") { // Javascript - Domain definition
        console.log("ORAL");
        /* 1. Get the image path and display it ! */
        /* 2. Get the question and format + display them in a form for Laravel PHP*/

        var contentOBJ = JSON.parse(CItem[0].content);
        //console.log(CItem[0]);
        //console.log(contentOBJ);
        //console.log(contentOBJ.questions);
        var object = contentOBJ.questions;
        var Qgroup = 1;
        var registerable = [false, false];
        for (const property in object) {
            //console.log(Qgroup);
            //console.log(`${property}: ${object[property]}`);
            var question = `${object[property]}`;
            var quesitonArr = question.split(",");
            var gotAnswer = [];
            //console.log(quesitonArr)
            $(".questions").append("<hr><span class='Qlabel'>" + quesitonArr[0] + "</span></br><span class='Qx'></span>");
            for (let i = 1; i < quesitonArr.length; i++) {
                $(".Qx").last().append('<input name="Q' + Qgroup +
                    '" id="Q' + Qgroup + '-' + i +
                    '" type="radio"/> <label for=Q' + Qgroup + '-' + i + '> ' + quesitonArr[i] + '</label><br/>');

                $("#Q" + Qgroup + '-' + i).on("click", function() {
                    if (gotAnswer.indexOf($(this).attr("name")) < 0) {
                        gotAnswer.push($(this).attr("name"));

                    }

                    if (gotAnswer.length == Object.keys(object).length) {
                        registerable[0] = true;


                    }

                    if (registerable[0] && registerable[1]) {
                        $(".resultSender").prop("disabled", false);
                    }
                    console.log(this);
                    var NewPair = false

                    for (let i = 0; i < Roral.QAnswers.length; i++) {

                        if (Roral.QAnswers[i][0] == $(this).attr("name")) {
                            console.log("cas correction")
                            Roral.QAnswers[i][1] = $(this).attr("id");
                            NewPair = false
                        } else {
                            NewPair = true;
                        }

                    }
                    if (NewPair) { Roral.QAnswers.push([$(this).attr("name"), $(this).attr("id")]) }
                    console.log(Roral)

                })


            }
            Qgroup++;
        }

        console.log(CItem);
        $(".supportSpace").append('<img class="imgSupport" title="Cliquez sur l\'image pour l\'agrandir" data-toggle="modal" data-target="#modalIMG" width="80%" src="/uploads/' + CItem[0].mediapath + '/' + contentOBJ.img + '"/>');

        installModalIMG()


        $(window).on("scroll", function(e) {


        });

        var lastScrollTop = 0;
        $(window).on("scroll", function(e) {
            var st = $(this).scrollTop();
            if (st > lastScrollTop) {
                // downscroll code
                console.log("TO BOTTOM")
                var scrollTop = $(window).scrollTop();
                console.log(scrollTop)
                if (scrollTop > $(".supportSpace").offset().top) {
                    $(".supportSpace").css("top", scrollTop);
                }
            } else {
                // upscroll code
                console.log("TO The TOP OF THE PAGE")
                var scrollTop = $(window).scrollTop();
                console.log(scrollTop);
                console.log($(".supportSpace").offset().top)
                if (scrollTop < $(".supportSpace").offset().top) {
                    console.log("vers top")
                    if (scrollTop < 200) { scrollTop = 200 }
                    $(".supportSpace").css("top", scrollTop);
                }

            }
            lastScrollTop = st;
        });

        /* $(window).on('scroll', function() {
            var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
            $(".supportSpace").css("top", scrollBottom);
        }) */


        $("#QaudioSelect").on("change", function() {

            if ($(this).val() == "4" || $(this).val() == "3" || $(this).val() == "2") {
                $(".Qx").find("input").prop("disabled", true);
                $(".Qx").find("input").prop("checked", false);
                $(".resultSender").prop("disabled", false);
            } else {
                $(".Qx").find("input").prop("disabled", false);
                // $(".Qx").find("input").prop("checked", true);
                registerable[1] = true;
                if (registerable[0] && registerable[1]) {
                    $(".resultSender").prop("disabled", false);
                }
            }
        });

        //Building JSON RESPONSE To send to Database CREATION

        function getPerfActiv() {
            var perfActive = $("#jump option:selected").text();
            return perfActive;
        }

        function getPerfActivDone() {
            var perfActive = $("#jumpDone option:selected").text();
            return perfActive;
        }

        $('#dataFlexOral').on("submit", function() {
            var jsondata = {};


            Roral.audioQ = $("#QaudioSelect option:selected").val();
            console.log(Roral);

            Roral.comment = $("#commentPerf").val();

            jsondata = Roral;


            $("#datacorr").val(JSON.stringify(jsondata));
            $("#perfid").val((getPerfActiv()));
            console.log(jsondata);

            return true; // return false to cancel form action
        });

        $('#EMOralDataFlex').on("submit", function() {
            var jsondata = {};
            Roral.QAnswers = [];
            $("input[type=radio]:checked").each(function(index, element) {
                Roral.QAnswers.push([$(element).attr("name"), $(element).attr("id")])
            });
            Roral.audioQ = $("#QaudioSelectEDITOR option:selected").val();
            console.log(Roral);
            Roral.comment = $("#commentPerf").val();
            jsondata = Roral;


            $("#EMdatacorr").val(JSON.stringify(jsondata));
            $("#EMperfid").val((getPerfActivDone()));
            console.log(jsondata);

            return true; // return false to cancel form action
        });





    }

    $(".oralEditorMode").on("click", function() {
        $(".Qx").find("input").prop("checked", false);
        $(".mode").html("Edition"); //Edition
        $(".ttEditor").css("display", "inline");
        $(".testtaker").hide();
        $(".corrapp").css("background-color", "#fff3ef");
        console.log("Display editor modessss");
        oralEditorMode();
    })

    $(".oralCloseEditorMode").on("click", function() {
        $(".mode").html("Edition"); //Edition
        $(".ttEditor").css("display", "none");
        $(".testtaker").show();
        $(".corrapp").css("background-color", "transparent");
        $(".Qx").find("input").prop("checked", false);
        $("#commentPerf").val("");
    })

    function installModalIMG(nextOne) {
        $('body').prepend('<div class="modalContainer">' +
            '<div class="modal fade modal-lg" id="modalIMG" tabindex="-1" role="dialog" aria-labelledby="modalInstructlLabel" aria-hidden="true">' +
            '<div class="modal-dialog modal-lg" role="document">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><h5 class="modal-title" id="modalInstructLabel">Support</h5>' +
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>' +
            '</button></div><div class="modal-body"><img class="imgSupport" data-toggle="modal" data-target="#modalIMG" width="100%" src="/uploads/' + CItem[0].mediapath + '/' + contentOBJ.img + '"/></div><div class="modal-footer">' +
            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div></div>');
    }



})