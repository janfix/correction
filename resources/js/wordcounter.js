export default function RWordCount() { // This function is called to verify how many words were read...
    //Je checke si on a enlevé des marques ou pas...On est ainsi toujours à jour!
    var premMot, derMot, nbMotAbs, WordsBeforeEnd, RWord;
    const Qmots = $(".textSpace").find(".word").length;
    if ($(".textSpace").find(".firstWordRead").length > 0) {
        premMot = $(".textSpace").find(".firstWordRead").attr("id").split("w");
    } else {
        var premMot = ["w", "0"];
    }
    if ($(".textSpace").find(".lastWordRead").length > 0) {
        derMot = $(".textSpace").find(".lastWordRead").attr("id").split("w");
    } else {
        derMot = $(".textSpace").find(".word").last().attr("id").split("w");
    }
    nbMotAbs = $(".textSpace").find(".missingLetter").length;

    WordsBeforeEnd = Qmots - parseInt(derMot[1]);

    RWord = Qmots - (parseInt(premMot[1]) - 1) - WordsBeforeEnd - nbMotAbs;
    $(".motslus").html(RWord);
    console.log(Qmots, parseInt(premMot[1]), parseInt(derMot[1]));
}