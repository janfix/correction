var correctorTable = $("#attributionTable").DataTable();
correctorTable.page.len(100).draw();

$(document).ready(function() {

    var SelectedCorrector, frq = 50;
    const allitems = parseInt($("#TotalItem").html());
    var correctorList = [];

    $("#Allcheck").on('click', function() {
        if (this.checked) {
            $(".corrSelector").attr('checked', 'checked');
            SelectedCorrector = $("input.corrSelector:checkbox:checked").length;
            SelectedCorrector = parseInt(SelectedCorrector);
            SelCorrecteurDisplay(SelectedCorrector);
            $(".corrSelector").trigger("change");

        } else {
            $(".corrSelector").removeAttr('checked');
            SelectedCorrector = $("input.corrSelector:checkbox:checked").length;
            SelectedCorrector = parseInt(SelectedCorrector);
            SelCorrecteurDisplay(SelectedCorrector);
            $(".corrSelector").trigger("change");
        };
    })

    if ($("#ExistAttribution").val() == 1) {
        $(".attributionTool").hide();
    } else {
        $(".attributionTool").show();
    }



    function defaultWdays() {
        SelectedCorrector = $("input.corrSelector:checkbox:checked").length;
        SelectedCorrector = parseInt(SelectedCorrector);
        SelCorrecteurDisplay(SelectedCorrector);
        itemByCorrector(SelectedCorrector);
        workingDays(frq, SelectedCorrector);
        initCorrectorList();
        displayList(correctorList);
        sendFrequence(frq);
    }

    defaultWdays()

    function itemByCorrector(SelectedCorrector) {
        if (SelectedCorrector == 0) {
            $("#itemByCorrector").html("No corrector selected");
        } else {
            let itembyCorr = (allitems / SelectedCorrector).toFixed(0);;
            $("#itemByCorrector").html(itembyCorr);
        }
    }

    function workingDays(frq, SelectedCorrector) {
        var wdays;
        if (SelectedCorrector == 0) {
            $("#wdays").html("No corrector selected");
        } else {
            wdays = ((allitems / SelectedCorrector) / frq).toFixed(0);;
            $("#wdays").html(wdays);
        }

    }

    function SelCorrecteurDisplay(SelectedCorrector) {
        $("#corrSelected").html(SelectedCorrector);
    }

    function initCorrectorList() {
        $(".corrSelector").each(
            function() { correctorList.push($(this).attr('data')); }
        );

    }

    function addCorrector(corrid) {
        if (correctorList.indexOf(corrid) == -1) {
            correctorList.push(corrid);
            displayList(correctorList);
        }
    };

    function delCorrector(corrid) {
        for (let i = 0; i < correctorList.length; i++) {
            if (correctorList[i] == corrid) {
                correctorList.splice(i, 1);
            }
        }
        displayList(correctorList);
    }

    function displayList(correctorList) {
        $(".corList").empty();
        for (let i = 0; i < correctorList.length; i++) {
            $(".corList").append(
                '<input type="hidden" name="corlist[' + correctorList[i] + ']" value="' + correctorList[i] + '" />');
        }
    }

    function sendFrequence(frq) {
        $(".frequence").html('<input type="hidden" name="corrplan" value="' + frq + '" />');
    }

    $("#itemFrq").on("change", function() {
        frq = $(this).val();
        SelectedCorrector = parseInt($("input:checkbox:checked").length);
        itemByCorrector(SelectedCorrector);
        workingDays(frq, SelectedCorrector);
        SelCorrecteurDisplay(SelectedCorrector);
        sendFrequence(frq);
    })



    $(".corrSelector").on('change', function() {
        console.log("Je change");
        SelectedCorrector = parseInt($("input:checkbox:checked").length);
        frq = $("#itemFrq").val();
        itemByCorrector(SelectedCorrector);
        workingDays(frq, SelectedCorrector);
        SelCorrecteurDisplay(SelectedCorrector);
        if ($(this).prop("checked") == true) {
            addCorrector($(this).attr("data"))
        } else {
            delCorrector($(this).attr("data"))
        }
    });

    $('.secret').removeAttr('hidden');



    //console.log("ready from attribution 11")
});