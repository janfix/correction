<?php

namespace App;
use \App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
//use Backpack\CRUD\CrudTrait;


class Page extends Model {

   public static function insertData($data){

    //dd($data);

    // $value=DB::table('users')->get();
   
       // dd($value);

    DB::table('users')->insert(
        [$data]
    );

   }

}