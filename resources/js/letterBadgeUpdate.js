import badgeSystem from './badgeSystem';


export default function letterBadgeUpdate(bdgInfo) {
    console.log(bdgInfo);
    var zeTarget = bdgInfo.origin,
        bdgType = bdgInfo.type,
        iconLabel, exactTarget;

    //console.log($("#"+zeTarget).find('.exactLetter'));
    exactTarget = $("#" + zeTarget).find('.exactLetter');
    if (bdgType == "Graphème mal lu") {
        let bdgType = {};
        bdgType.initial = "G";
        bdgType.mention = "Graphème mal lu";
        bdgType.comment = "You can precise the type of confusion : symetry b/d or p/b or more phonological : m/n, s/c";
        badgeSystem(exactTarget, bdgType, "update");
    } else if (bdgType == "Inversion de lettres") {
        let bdgType = {};
        bdgType.initial = "><";
        bdgType.mention = "Inversion de lettres";
        bdgType.comment = "You can precise the inversion";
        badgeSystem(exactTarget, bdgType, "update");
    } else if (bdgType == "Répétition de lettres") {
        let bdgType = {};
        bdgType.initial = "R";
        bdgType.mention = "Répétition de lettres";
        bdgType.comment = "You can precise the repetition (strong/incident...)";
        badgeSystem(exactTarget, bdgType, "update");
    } else if (bdgType == "Point d'arrêt") {
        let bdgType = {};
        bdgType.initial = "A";
        bdgType.mention = "Point d'arrêt";
        bdgType.comment = "You can comment";
        badgeSystem(exactTarget, bdgType, "update");
    } else if (bdgType == "Ommission") {
        let bdgType = {};
        bdgType.initial = "O";
        bdgType.mention = "Ommission";
        bdgType.comment = "You can comment the ommission";
        badgeSystem(exactTarget, bdgType, "update");
    }


}