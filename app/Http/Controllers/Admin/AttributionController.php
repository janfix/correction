<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Models\Iteminfo;
use App\Models\Coresult;
use App\User;
use App\Http\Controllers\Controller;

class AttributionController extends Controller
{

    public function index()
     {
        
        $perfid = request('perfid');
        $iteminfos = Iteminfo::where('id', $perfid)->get();
        $corrections = Coresult:: where('item_id', $perfid)->where('state','todo')->get();
        $correctionDone = Coresult:: where('item_id', $perfid)->where('state','done')->get();
        $language = strtolower($iteminfos[0]->language);
        $level = strtolower($iteminfos[0]->level);
        $subject = strtolower($iteminfos[0]->subject);
        $users = User:: where('language', $language)->where('language',$language)->where('level',$level)->where('subject',$subject)->get();
        $buzyUser = array();
        $SuperBuzyUsers = array();
        $totalItems = Coresult:: where('item_id', $perfid)->count();
        
       /*  if($iteminfos[0]->corrplan == "_"){
          $Existattribution = false; 
        } else{
           $Existattribution = true;
            foreach ($users as $user) {
            $testbusy = $user->coresults->where('item_id',$iteminfos[0]->id);
               if(sizeof($testbusy) >0){
                  array_push($buzyUser, $user->id);
               }           
            }
        } */


         if($iteminfos[0]->corrplan == "_"){
          $Existattribution = false; 
        } else{
           $Existattribution = true;
            foreach ($users as $user) {
            $testbusy = $user->coresults->where('item_id',$iteminfos[0]->id);
            $itemTodo = $user->coresults->where('item_id',$iteminfos[0]->id)->where('state','todo');
            $itemDone = $user->coresults->where('item_id',$iteminfos[0]->id)->where('state','done'); 
               if(sizeof($testbusy) >0){ 
                 array_push($buzyUser, $user->id); 
                 array_push($SuperBuzyUsers, array($user->id, $itemTodo, $itemDone));
               }           
            }
        }
        
       


        return view('attribution')->with([
            'iteminfos'=>$iteminfos,
            'corrections'=>$corrections, 
            'users'=>$users,
            'correctionDone' =>$correctionDone,
            'ExistAttribution' => $Existattribution,
            'buzyUsers' => $buzyUser,
            'SuperBuzyUsers' => $SuperBuzyUsers,
            'totalItems' => $totalItems,
            'perfid' =>$perfid
            ]);
    }

    public function store()
     { 
        // Pass Iteminfo parameters by hidden form fields.
        $itemID = request('itemid');
        $iteminfos =  Iteminfo::where('id', $itemID)->get();
        
         
        $language = strtolower($iteminfos[0]->language);
        $level = strtolower($iteminfos[0]->level);
        $subject = strtolower($iteminfos[0]->subject);
        $users = User:: where('language', $language)->where('language',$language)->where('level',$level)->where('subject',$subject)->get();
       
        // I must determine all the correctionIDs for this Item
        $correctionIDs = Coresult:: where('item_id', $itemID )->where('state','todo')->get();
        $correctorIDs = request('corlist');

        $correctionsDone = Coresult:: where('item_id', $itemID)->where('state','done')->get();

        $frq = request("corrplan");
        $itemset = Iteminfo::find( $itemID );
        $itemset->corrplan = $frq;
        $itemset->save();

        //Number of item by corrector 
        $Qitem = sizeof($correctionIDs)/sizeof($correctorIDs);
        $Qkapital = $Qitem; 
      
        //Number of pack 
        $pack = sizeof($correctionIDs)/$Qitem;

        $next=0;
        $group=1;  
        foreach ($correctorIDs as $correctorID) {    
                     
                for ($y= $next; $y<$Qitem ; $y++) { 
                   
                   $user = User::find($correctorID);
                   if($y >= sizeof($correctionIDs)){ 
                     return back();}
                   else{
                   $user->coresults()->attach( $correctionIDs[$y]['id']); 
                   }  
                  
                }
                  $next = $Qitem;
                 ++$group;
                 $Qitem = $Qkapital * $group; 
            }
      return redirect()->to("admin/correctionList");
     
     }

     public function reset(){
      $perfid = request('perfid');
      $buzyUsers = request('buzyUsers');
      $itemset = Iteminfo::find($perfid);
      $itemset->corrplan="_";
      $itemset->save();
      $correctionIDs = Coresult:: where('item_id', $perfid )->get();
      foreach ($correctionIDs as $key => $correctionID) {
         if($buzyUsers){
         foreach ($buzyUsers as $key => $buzyUser) {
           $correctionID->users()->detach($buzyUser); 
         }}
      }

      return redirect()->to("admin/correctionList");
     }
        
}
