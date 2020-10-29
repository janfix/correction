<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use App\Models\Iteminfo;
use App\Models\Coresult;
use App\User;
use App\Http\Controllers\Controller;

class ScoringOralProdController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $perfid = request('perfid');
       $user = auth()->user(); // Scope by user
       //$corrections = Coresult:: where('item_id', $perfid)->where('state','todo')->get();
       $superArray = array();
       $CorrDone = array();
      
       $corrections = $user->coresults->where('item_id', $perfid)->where('state','todo');// Scope by user
        foreach ($corrections as $key => $correction) { //Convert collection to array respecting structure of interface
          array_push($superArray, $correction);
        }

        $correctionsDone = $user->coresults->where('item_id', $perfid)->where('state','done');// Scope by user  
         foreach ($correctionsDone as $key => $correctionDone) { //Convert collection to array respecting structure of interface
          array_push($CorrDone, $correctionDone);
        }
  
        if(sizeof($superArray) > 0){
        $items = Iteminfo::where('id', $perfid)->get();      
        } 
        else{
          $superArray  = array(
          "id" => 1,
          "item_id" => 0,
          "corrector_id" => 1,
          "mediafilename" => "None",
          "mediafolder" => "None",
          "precorrection" => "{'hpreco':[10000],'endpreco':10000}",
          "results" => "_",
          "state" => "todo",
          "created_at" => "2019-11-27 14:47:18",
          "updated_at" => "2019-11-27 14:47:18");
          //$superArray = json_encode($superArray);
          //dd($corrections);

          $items = new collection;
          
          $iteminfos = array(
            "mediapath"=>"-",
            "corrname" =>"This correction is over",          
            "instructions"=> "This correction is over",
            "content"=> "This correction is over",
            "content_ref"=> "This correction is over",
            "subject"=> "-",
            "level"=> "-",
            "grade"=>"-"

          );
          $items[0] = $iteminfos;
         
          //$items->subject = "French";
          //$items->language = "French";
          //$items->level = "Primary";
          //$items->grade = "First";

          //$items->corrtype = "precorr";
          //$items->itemtype = "Text_reading";
          //$items->Author = "Pierre Martin";
          //$items->Institution = "DEPP";
          //$items->datestart = "2019-12-12";
          //$items->test_session_id = "ABCDE1234";
          //$items->docLink = "wwww.wiquid.fr/depp/ent/";
          //$items->corrplan = "50";
          //$items->created_at = "2019-11-28 08:24:37";
          //$items->updated_at = "2019-11-28 08:25:04";
          
          
        }

//dd($items);
       
       
        return view('scoringOral')->with([
            'user' => $user, 
            'correction'=>"[".implode(",",$superArray)."]", 
            'item'=>$items,
            'corrDone' =>"[".implode(",",$CorrDone)."]"
            ]);      
    }

    public function store()
    {
         $perfid = request('perfid');    
         $data = request('datacorr');
         //done
        DB::table('coresults')
                ->where('id',$perfid)
                ->update(['results'=>$data, 'state'=>"done"] );
         

         return back();
    }
    
}
