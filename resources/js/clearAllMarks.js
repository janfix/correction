export default function clearAllMarks() {
    $(".h_word").removeClass("h_word");
    $(".badgeWord").trigger("dblclick");
    $(".badgeLetter").trigger("dblclick");
    $(".space").html(" ");
    $(".firstWordRead").removeClass("firstWordRead");
    $(".lastWordRead").removeClass("lastWordRead");
    $(".offLine").prop("checked", true);
}