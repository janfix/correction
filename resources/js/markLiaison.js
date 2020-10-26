import * as Rconti from './Rcontainer';

export default function markLiaison(loc, type) {

    console.log(Rconti.RContainer.liaisons);

    let locid = $(loc).attr("id");
    let Wprev = $("#" + locid).prev().attr("id");
    let Wnext = $("#" + locid).next().attr("id");
    let liaisonDuo = [type, locid, Wprev, Wnext];
    Rconti.RContainer.liaisons.push(liaisonDuo);

    if (type == "wrong") {
        $(loc).html("<div class='liaigroup'  data-origin='" + locid + "'>&nbsp<div class='wliai' data-origin='" + locid + "'></div><div class='trait'></div></div>");
        $(loc).find(".trait").html("<span class='liaisonLabel'>Mauvaise liaison &nbsp</span>");

    } else {
        $(loc).html("<div class='liaigroup'  data-origin='" + locid + "'>&nbsp<div class='liai' data-origin='" + locid + "'></div><div class='trait'></div></div>");
        $(loc).find(".trait").html("<span class='liaisonLabel'>Liaison absente &nbsp</span>");
    }
    $(".trait").fadeOut(5000);
    $(".liaigroup").on("mouseover", function() {
        $(this).find(".trait").fadeIn();
    });
    $(".liaigroup").on("dblclick", function(e) {
        let that = this;
        var liaiOrigin = $(that).attr("data-origin");
        $('#warningDelModal').modal();
        $("#confirmDelete").on("click", function() {
            e.stopPropagation();
            $(that).parent().append("&nbsp;");
            $(that).remove();
            $("#warningDelModal").modal('hide');
            let liaisonScan = Rconti.RContainer.liaisons;
            for (let i = 0; i < liaisonScan.length; i++) {
                for (let y = 0; y < liaisonScan[i].length; y++) {
                    if (liaisonScan[i][y] == liaiOrigin) {
                        liaisonScan.splice(i, 1);
                    }
                }
            }
        });

    });
}