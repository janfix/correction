<?php

// --------------------------
// Custom Backpack Routes
// --------------------------
// This route file is loaded automatically by Backpack\Base.
// Routes you generate using Backpack\Generators will be placed here.


Route::group([
    'prefix'     => config('backpack.base.route_prefix', 'admin'),
    'middleware' => ['web', config('backpack.base.middleware_key', 'admin')],
    'namespace'  => 'App\Http\Controllers\Admin',
], function () { // custom admin routes
    Route::get('/createCorrection', function () {
    return view('createCorrection');
    });

    Route::crud('correctionList', 'IteminfoCrudController');
    Route::get('attribution', 'AttributionController@index');
    Route::get('export', 'ExportController@export');
    Route::get('scoring', 'ScoringController@index');
    Route::get('scoringidm', 'ScoringIdmController@index');
    Route::crud('iteminfo', 'IteminfoCrudController');
    Route::crud('coresult', 'CoresultCrudController');

    Route::post('createCorrection/addrecords', 'createCorrectionRecords@index');
    Route::post('scoringidm', 'ScoringIdmController@done');
    Route::post('uploadFile', 'PagesController@uploadFile');
    Route::post('attribution/store', 'AttributionController@store');
    Route::post('attribution/reset', 'AttributionController@reset');
    Route::post('scoring/store', 'ScoringController@store');

    Route::get("settings", "SettingsController@index");

    //Custom Deleter : 
    Route::post('suppress', 'suppressCorrController@destroy');

}); // this should be the absolute last line of this file