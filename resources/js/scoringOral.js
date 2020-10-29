import oralEditorMode from './scoral/oraleditormode';

$(function() {

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
        $(".supportSpace").append('<img width="80%" src="/uploads/' + CItem[0].mediapath + '/' + contentOBJ.img + '"/>');

        //dragElement(document.getElementById("support"));


        $("#QaudioSelect").on("change", function() {

            if ($(this).val() == "4" || $(this).val() == "3" || $(this).val() == "2") {
                var maskHeight = $(".questions").css("height");
                var maskWidth = $(".questions").css("width");
                $(".questions").prepend("<div class='textMaskOral'></div>");
                $(".textMaskOral").css({ "width": maskWidth, "height": maskHeight });
                $(".resultSender").prop("disabled", false);
            } else {
                $(".textMaskOral").remove();
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


        $(".oralEditorMode").on("click", function() {
            $(".mode").html("Edition"); //Edition
            $(".ttEditor").css("display", "inline");
            $(".testtaker").hide();
            $(".corrapp").css("background-color", "#fff3ef");
            console.log("Display editor mode");
            oralEditorMode();
        })

        $(".oralCloseEditorMode").on("click", function() {
            $(".mode").html("Edition"); //Edition
            $(".ttEditor").css("display", "none");
            $(".testtaker").show();
            $(".corrapp").css("background-color", "transparent");
        })


    }



})