// Loading the data session from Json file

$(document).ready(function() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    $('#datestart').val(today);
    var itemType;

    $(".loaderbt").on("click", function() {
        var datafolder = $("#mediapath").val();
        jsonLoader(datafolder);
    });



    // Create Correction
    $(".textCorr").on("click", function() {
        $(".texCorrAlert").show();
        $(".IDMCorrAlert").hide();
        $(".texPreCodedCorrAlert").hide();
        $("#correction_mode").attr("disabled", false).val('simple');
        itemType = $('.textCorr input').val();
        $(".textCorr").removeClass("btn-primary").addClass("btn-success");
        $(".wordCorr").removeClass("btn-success").addClass("btn-primary");
        $(".textPreCodedCorr").removeClass("btn-success").addClass("btn-primary");
        $("#precorrection").hide();
    })


    $(".wordCorr").on("click", function() {
        $(".IDMCorrAlert").show();
        $(".texCorrAlert").hide();
        $(".texPreCodedCorrAlert").hide();
        $("#correction_mode").attr("disabled", false).val('simple');
        itemType = $('.wordCorr input').val();
        $(".textCorr").removeClass("btn-success").addClass("btn-primary");
        $(".wordCorr").removeClass("btn-primary").addClass("btn-success");
        $(".textPreCodedCorr").removeClass("btn-success").addClass("btn-primary");
        $("#precorrection").hide();
    })

    $(".textPreCodedCorr").on("click", function() {
        $(".texPreCodedCorrAlert").show();
        $(".IDMCorrAlert").hide();
        $(".texCorrAlert").hide();
        $("#correction_mode").val('precorr');
        itemType = $('.textPreCodedCorr input').val();
        $(".textCorr").removeClass("btn-success").addClass("btn-primary");
        $(".wordCorr").removeClass("btn-success").addClass("btn-primary");
        $(".textPreCodedCorr").removeClass("btn-primary").addClass("btn-success");
        $("#precorrection").show();

    })

    function jsonLoader(datafolder) {


        if (typeof itemType === "undefined") {
            alert("Please choose a type of correction first !");
        }

        var jsonloader = $.getJSON('../uploads/' + datafolder + '/manifest.json', function(json) {}).done(function(json) {
            // Check json loading
            $(".checkData").html("<div class='alert alert-success' role='alert'><i class='fa fa-check green cross' aria-hidden='true'></i> Data folder found ! </div>").delay(8000).fadeOut(4000);

            if (itemType === json.item_type) {
                $(".checkitemType").html("<div class='alert alert-success' role='alert'><i class='fa fa-check green cross' aria-hidden='true'></i> Item type :" + json.item_type + " </div>").delay(8000).fadeOut(4000);;
            } else {
                $(".checkitemType").html("<div class='alert alert-danger' role='alert'><i class='fa fa-times red cross' aria-hidden='true'></i> The JSON manifest mentionned an other type of item : " + json.item_type + ".</div>").delay(8000).fadeOut(4000);;
            }


            // Todo checkdata looking to mediafiles...  
            if (json.title == "" || typeof json.title === "undefined") {
                $("#corrname").css('border', '3px red solid');
            } else {
                $("#corrname").val(json.title).css('border', '2px lightgreen solid');
            }
            if (json.subject == "" || typeof json.subject === "undefined") {
                $("#subject").css('border', '3px red solid');
            } else {
                $("#subject").val(json.subject).css('border', '2px lightgreen solid');
            }
            if (json.language == "" || typeof json.language === "undefined") {
                $("#language").css('border', '3px red solid');
            } else {
                $("#language").val(json.language).css('border', '2px lightgreen solid');
            }
            if (json.level == "" || typeof json.level === "undefined") {
                $("#level").css('border', '3px red solid');
            } else {
                $("#level").val(json.level).css('border', '2px lightgreen solid');
            }
            if (json.grade == "" || typeof json.grade === "undefined") {
                $("#grade").css('border', '3px red solid');
            } else {
                $("#grade").val(json.grade).css('border', '2px lightgreen solid');
            }
            if (json.instructions == "" || typeof json.instructions === "undefined") {
                $("#instructions").css('border', '3px red solid');
            } else {
                $("#instructions").val(json.instructions).css('border', '2px lightgreen solid');
            }
            if (json.content == "" || typeof json.content === "undefined") {
                $("#content").css('border', '3px red solid');
            } else if (typeof json.content === "object") {
                $("#content").val(JSON.stringify(json.content)).css('border', '2px lightgreen solid');
            } else {
                $("#content").val(json.content).css('border', '2px lightgreen solid');
            }
            if (json.content_ref == "" || typeof json.content_ref === "undefined") {
                $("#content_ref").css('border', '3px red solid');
            } else {
                $("#content_ref").val(json.content_ref).css('border', '2px lightgreen solid');
            }
            if (json.precorrection == "" || typeof json.precorrection === "undefined") {
                $("#precorrection").css('border', '3px red solid');
            } else {
                $("#precorrection").val(JSON.stringify(json.precorrection)).css('border', '2px lightgreen solid');
            }
            if (json.correction_mode == "" || typeof json.correction_mode === "undefined") {
                $("#correction_mode").css('border', '3px red solid');
            } else {
                $("#correction_mode").val(json.correction_mode).css('border', '2px lightgreen solid');
            }
            console.log(json.Motcomplexe);
            if (json.correction_mode == "" || typeof json.Motcomplexe === "undefined") {
                $("#Mcomplex").css('border', '3px red solid');
            } else {
                $("#Mcomplex").val(json.Motcomplexe).css('border', '2px lightgreen solid');
            }
            if (json.item_type == "" || typeof json.item_type === "undefined") {
                $("#item_type").css('border', '3px red solid');
            } else {
                $("#item_type").val(json.item_type).css('border', '2px lightgreen solid');
            }
            if (json.Institution == "" || typeof json.Institution === "undefined") {
                $("#institution").css('border', '3px red solid');
            } else {
                $("#institution").val(json.Institution).css('border', '2px lightgreen solid');
            }
            if (json.test_session_id == "" || typeof json.test_session_id === "undefined") {
                $("#test_session_id").css('border', '3px red solid');
            } else {
                $("#test_session_id").val(json.test_session_id).css('border', '2px lightgreen solid');
            }
            if (json.docLink == "" || typeof json.docLink === "undefined") {
                $("#doclink").css('border', '3px red solid');
            } else {
                $("#doclink").val(json.docLink).css('border', '2px lightgreen solid');
            }
            if (json.startOn == "" || typeof json.startOn === "undefined") {
                $("#datestart").css('border', '3px red solid');
            } else {
                $("#datestart").val(json.startOn).css('border', '2px lightgreen solid');
            }
            if ($("input").val() == "") { $("#datestart").css('border', '3px red solid'); }
            return;
        }).fail(function() {
            $(".checkData").html("<div class='alert alert-danger'  role='alert'> <i class='fa fa-times red cross' aria-hidden='true'></i>There is an error, no folder found : check file name and path in the File Manager!</div>").delay(8000).fadeOut(4000);;
        });









    }

    function publishChecked(itm) {
        if (itm) {
            $(".checkList").append("")
        } else {

        }
    }
});