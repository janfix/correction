import badgeSystem from './badgeSystem';


export default function letterBadgeUpdate(bdgInfo) {
    console.log(bdgInfo);
    var zeTarget = bdgInfo.origin,
        bdgType = bdgInfo.type,
        exactTarget;

    console.log($("#" + zeTarget).find('.exactLetter'));
    exactTarget = $("#" + zeTarget).find('.exactLetter');
    if (bdgType == "Graphème mal lu") {
        let bdgType = {};
        bdgType.initial = "G";
        bdgType.mention = "Graphème mal lu";
        bdgType.comment = "You can precise the type of confusion : symetry b/d or p/b or more phonological : m/n, s/c";
        bdgType.unit = "letter"
        badgeSystem(exactTarget, bdgType, "update");
    } else if (bdgType == "Inversion de lettres(I)") {
        let bdgType = {};
        bdgType.initial = "I";
        bdgType.mention = "Inversion de lettres";
        bdgType.comment = "You can precise the inversion";
        bdgType.unit = "letter"
        badgeSystem(exactTarget, bdgType, "update");
    } else if (bdgType == "Répétition de lettres") {
        let bdgType = {};
        bdgType.initial = "R";
        bdgType.mention = "Répétition de lettres";
        bdgType.comment = "You can precise the repetition (strong/incident...)";
        bdgType.unit = "letter"
        badgeSystem(exactTarget, bdgType, "update");
    } else if (bdgType == "Ajout de lettre/son") {
        let bdgType = {};
        bdgType.initial = "+";
        bdgType.mention = "Ajout de lettre/son";
        bdgType.comment = "...";
        bdgType.unit = "letter"
        badgeSystem(exactTarget, bdgType, "update");
    } else if (bdgType == "Point d'arrêt") {
        let bdgType = {};
        bdgType.initial = "A";
        bdgType.mention = "Point d'arrêt";
        bdgType.comment = "You can comment";
        bdgType.unit = "letter"
        badgeSystem(exactTarget, bdgType, "update");
    } else if (bdgType == "Ommission") {
        let bdgType = {};
        bdgType.initial = "O";
        bdgType.mention = "Ommission";
        bdgType.comment = "You can comment the ommission";
        bdgType.unit = "letter"
        badgeSystem(exactTarget, bdgType, "update");
    }


}