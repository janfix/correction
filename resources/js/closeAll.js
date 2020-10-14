export default function closeAllMC() {
    var MCarr = ["context-menu", "letterCMenu", "spaceCMenu", "ponctCMenu", "timerCmenu"];
    for (let i = 0; i < MCarr.length; i++) {
        $("#" + MCarr[i]).removeClass("show").hide();
    }

    $("#context-menu").hide();
}