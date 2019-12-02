<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\Iteminfo;
use App\Models\Coresult;
use App\User;
use App\Http\Controllers\Controller;


class suppressCorrController extends Controller
{
    public function destroy(){
        $item_id = request('item_id');
        $item_toDelete = Iteminfo::find($item_id);
        $users = User::all();
        $perfToDeletes = Coresult::where('item_id', $item_id )->get(); 
        foreach ( $perfToDeletes as $key => $perfToDelete) {
            foreach ($users as $key => $user) {
               $user->coresults()->detach($perfToDelete);
            }
            
            $perfToDelete->delete();
        }
        $item_toDelete->delete();
        return '1';
    }
}
