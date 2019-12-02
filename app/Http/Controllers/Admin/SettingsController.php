<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Iteminfo;
use App\Models\Coresult;
use App\User;
use App\Http\Controllers\Controller;

class SettingsController extends Controller
{
    //
    public function index(){
         return view('settings');}
}
