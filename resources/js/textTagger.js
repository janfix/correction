// Licence Create commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)
// https://creativecommons.org/licenses/by-nc-sa/4.0/
// Author : Jean-Philippe Rivière - Wiquid - January 2020 project
// Base idea of project DEPP. Ministère de l'éducation nationale - France

import wordActivator from './wordActivator';
import spaceCMenu from './space_Cmenu';
import * as Rconti from './Rcontainer';
import wordCMenu from './Word_CMenu';
import punctCMenu from './punctCMenu';
import RWordCount from './wordcounter';

export default function tagtext(st_brut) {
    var st_arrLine = [];
    var complexWord = []

    //Identify lines 
    var st_line = st_brut.split("|");

    // Build clean rows in array
    for (let i = 0; i < st_line.length; i++) {
        // Clean first and last lines character + the return invisible sign if present !!! 
        if (st_line[i][st_line[i].length - 1] == " ") {
            st_line[i] = st_line[i].substring(0, st_line[i].length - 1)
        };
        if (st_line[i][0] == " ") {
            st_line[i] = st_line[i].substring(1);
        }
        st_line[i] = st_line[i].replace(/(\r\n|\n|\r)/gm, "");
        //   

        st_arrLine.push(st_line[i].split(" ")); // Identify words but no ponctuation   
    }




    // Process attribution word to cell + ponctuation + margin + Line under
    var prepText = "";
    for (let i = 0; i < st_arrLine.length; i++) {
        let prepLine = "";
        for (let y = 0; y < st_arrLine[i].length; y++) { //scan all words

            //The apostrophe stick to the word so, if the word stick to a coma or a point, the choices are wrong ! The whole condition loop must be reconcidered.
            // Ponctuation : contact on left space on right
            if (st_arrLine[i][y].indexOf(",") > -1) {
                st_arrLine[i][y] = "<td class='word'>" + st_arrLine[i][y].substring(0, st_arrLine[i][y].length - 1) + "</td><td class='coma ponct'>,</td><td class='space'>&nbsp</td>"
                    //<td class="word">Mot</td><td class="coma ponct">,</td>

            } else if (st_arrLine[i][y].indexOf(".") > -1) {
                st_arrLine[i][y] = "<td class='word'>" + st_arrLine[i][y].substring(0, st_arrLine[i][y].length - 1) + "</td><td class='point ponct'>.</td><td class='space'>&nbsp</td>"

            } else if (st_arrLine[i][y].indexOf(";") > -1) {
                st_arrLine[i][y] = "<td class='semicolon ponct'>;</td>"

            } else if (st_arrLine[i][y].indexOf(":") > -1) {
                st_arrLine[i][y] = "<td class='colon ponct'>:</td>"

            } else if (st_arrLine[i][y].indexOf("?") > -1) {
                st_arrLine[i][y] = "<td class='Qmark ponct'>?</td>"

            } else if (st_arrLine[i][y].indexOf("!") > -1) {
                st_arrLine[i][y] = "<td class='Emark ponct'>!</td>"

            } else if (st_arrLine[i][y].indexOf("_") > -1) { // In the text :_ + space !
                var remove_ = st_arrLine[i][y].replace('_', '');;
                st_arrLine[i][y] = "<td class='word'>" + remove_ + "</td><td class='space liaiOblig'>&nbsp</td>"
            } else { //Processing words...
                { st_arrLine[i][y] = "<td class='word'>" + st_arrLine[i][y] + "</td><td class='space'>&nbsp</td>" }
            }

            if (st_arrLine[i][y].indexOf("*") > -1) { // In the text :* + space !
                var remover = st_arrLine[i][y].replace('*', '');
                complexWord.push($(remover).html());
                //$(st_arrLine[i][y]).find(".word").addClass('complexWord');
                st_arrLine[i][y] = remover;
            }
            prepLine = prepLine + st_arrLine[i][y];

        }
        prepLine = "<tr id='row" + i + "'><td class='lineNumber'>" + i +
            "</td><td class='B1'><input class='offLine' data-lineNB =" + i + " type='checkbox' checked title='checked if line is read'></td>" +
            "<td class='B1'><a onclick='tagLineEraser(this)' class='tagLineEraser' href='#'><i title='clean the line of tags and marks' class='fas fa-eraser'></i></a></td>" +
            /*"<td class='B1'><i class='fas fa-i-cursor'></i></td>" + */

            "<td class='B2'>&nbsp </td>" +
            "<td class='linePointer Off' id='LProw" + i + "'><i class='fas fa-caret-right'></i></td>" +
            "<td class='B1'>&nbsp </td>" +

            prepLine; //+            //"<td id='rowComment" + i + "' class='comment'></td></tr>";

        prepText = prepText + prepLine;
        //console.log(st_arrLine[i]);
        //ID attribution for each cell via JS not HTML using search class on word array / ponct Array etc.
        //Add onclick attribute on word via JS not HTML
        //Add hover attribute on word via JS not HTML
        //Add context menu right click listener via JS not HTML


    } // This loop doesn't treat apostrophe and all quote system  Another loop must be build! Another problem with ... because it will be segmented as . Must be before point in the loop.


    $(".text-muted").html(prepText);


    $(".textSelector").on("click", function() {

        $(this).toggleClass("btn-primary").toggleClass("btn-secondary").toggleClass("btpressed");
        let testSelectorOn = $(this).hasClass("btpressed");
        if (testSelectorOn) { wordSelector(); } else {
            $('.word').off();
        }

    });

    for (let i = 0; i < complexWord.length; i++) {

        $(".word:contains('" + complexWord[i] + "')").addClass("complexWord");
    }


    $(".offLine").on("click", function() {
        console.log(this);
        missingLine(this);


    });


    // Line canceller  - On / OFF
    function tagLineEraser(element) {
        let lineToClean = $(element).parent().parent();
        console.log(lineToClean);
        $(lineToClean).find(".selectedWord").removeClass("selectedWord");
    }

    function missingLine(el) {
        let checkLine = $(el).prop("checked");
        let lineNB = parseInt($(el).attr("data-lineNB"));
        //$(el).parent().parent().toggleClass('notReadLine');
        $(el).parent().parent().find(".word").toggleClass('missingLetter');
        if (checkLine == false) { Rconti.RContainer.lineJumped.push(lineNB); } else {
            for (let i = 0; i < Rconti.RContainer.lineJumped.length; i++) {
                if (Rconti.RContainer.lineJumped.indexOf(lineNB) == i) {
                    Rconti.RContainer.lineJumped.splice(i, 1);
                }
            }
        }
        RWordCount();
    }

    //-----------------------------------------------

    //Add Listener on Words
    wordActivator();
    //Calling Context Menu for Space, Word, Punctuation
    spaceCMenu();
    wordCMenu();
    punctCMenu();

    Rconti.RContainer.textLength = $(".textSpace").find(".word").length;

    $(".word").each(function(index, element) {
        $(element).attr("id", "w" + index);
    });
    $(".space").each(function(index, element) {
        $(element).attr("id", "space" + index);
    });
    $(".ponct").each(function(index, element) {
        $(element).attr("id", "ponct" + index);
    });
}