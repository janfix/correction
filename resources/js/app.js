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
require('./fluence');
require('./scoringIDM');
require('./wavevoice');
require('./attribution');

//Scrollable DataTable
/* $('#crudTable').DataTable({
    "scrollY": "400px",
    "scrollCollapse": true,
});
$('.dataTables_length').addClass('bs-select'); */

