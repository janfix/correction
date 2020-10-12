// Licence Create commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author : Jean-Philippe Rivière - Wiquid - January 2020 project
// Base idea of project DEPP. Ministère de l'éducation nationale - France


var obs = function(type, origin, comment, id) {
    this.type = type;
    this.origin = origin;
    this.comment = comment;
    this.id = id;
};

var badges = function(codeError, type, origin, id) {
    this.codeError = codeError;
    this.type = type;
    this.origin = origin;
    this.id = id
}

var timeMark = function(origin, time) {
    this.origin = origin;
    this.time = time;
}

var groupMark = function(firstW, lastW, type) {
    this.firstW = firstW;
    this.lastW = lastW;
    this.type = type;
}

try {
    console.log("LOAD DU JSON DONE");
    var CorrDoneData = JSON.parse($(".hiddenCorrDone").html());
} catch (error) {
    var CorrDoneData = [{
        Corr_Code: "",
        Corr_cluster_id: "",
        item_id: "",
        id: "",
        results: ""
    }];

}


var RContainer = new Object();
RContainer.audioQ = "";
RContainer.global = {};
RContainer.Hword = [];
RContainer.observations = ["notzero"];
RContainer.badges = [];
RContainer.letterBadges = [];
RContainer.group = [];
RContainer.timer = [];
RContainer.timeReset = "";
RContainer.firstWord = "";
RContainer.lastWord = "";
RContainer.textLength = "";
RContainer.liaisons = [];
RContainer.lineJumped = [];
RContainer.global.autoCorr = "";
RContainer.global.comment = "";
RContainer.global.jumpedWord = "";

export { RContainer, obs, badges, timeMark, groupMark, CorrDoneData }