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

    if (CItem[0].itemtype == "Oral_production") { // Javascript - Domain definition
        console.log("ORAL");
        /* 1. Get the image path and display it ! */
        /* 2. Get the question and format + display them in a form for Laravel PHP*/

        var contentOBJ = JSON.parse(CItem[0].content);
        console.log(CItem[0]);
        console.log(contentOBJ);
        //console.log(contentOBJ.questions);
        var object = contentOBJ.questions;
        var Qgroup = 1;
        for (const property in object) {
            console.log(Qgroup);
            console.log(`${property}: ${object[property]}`);
            var question = `${object[property]}`;
            var quesitonArr = question.split(",");
            console.log(quesitonArr)
            $(".questions").append("<span class='Qlabel'>" + quesitonArr[0] + "</span></br><span class='Qx'></span>");
            for (let i = 1; i < quesitonArr.length; i++) {
                $(".Qx").last().append('<input name="Q' + Qgroup +
                    '" id="Q' + Qgroup + '-' + i +
                    '" type="radio"/> <label for=Q' + Qgroup + '-' + i + '> ' + quesitonArr[i] + '</label><br/>')


            }
            Qgroup++;
        }


        $(".supportSpace").append('<img src="/uploads/fluency_cp/' + contentOBJ.img + '"/>');

        //dragElement(document.getElementById("support"));



    }



})