<?php

namespace App\Imports;

use App\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;

class UsersImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        
        return new User([
           'firstname'  =>  $row[0], 
           'name'       =>  $row[1],
           'language'   =>  $row[2], 
           'subject'    =>  $row[3], 
           'level'      =>  $row[4],
           'email'      =>  $row[5], 
           'email_verified_at' =>$row[6], 
           'password'   =>  Hash::make($row[7]),
           
        ]);
    }
}
