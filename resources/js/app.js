/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import $ from 'jquery';
window.$ = window.jQuery = $;

import 'datatables.net-bs4/js/dataTables.bootstrap4';
require('./bootstrap');
require('./dataloader');
require('./textTagger');
require('./fluence');
require('./scoringIDM');
require('./scoringOral');
require('./wavevoice');
require('./attribution');

$("body").on("contextmenu", function() {
    return false;
})