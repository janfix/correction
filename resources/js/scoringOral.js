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

        function dragElement(elmnt) {
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                // if present, the header is where you move the DIV from:
                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }

    }



})