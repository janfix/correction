<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Models\Iteminfo;
use App\Models\Coresult;
use App\User;
use App\Http\Controllers\Controller;

class ScoringIdmController extends Controller
{
    public function index()
    {
       $perfid = request('perfid');
       $mfolder= request('mfolder');
       $user = auth()->user(); 
       $corrections = $user->coresults->where('item_id', $perfid)->where('mediafolder', $mfolder);
        
       // dd($corrClean);
       $activWord = "_";
       // dd($corrections);
       $items = Iteminfo::where('id', $perfid)->get();
       //dd($items[0]->content); 
       
        //dd($greyWords);

       $wordsToGrey =  ScoringIdmController::wordToColor( $user, $items, $perfid, $mfolder);
       
        return view('scoringidm')->with([
            'user' => $user, 
            'correction'=> $corrections, 
            'item'=>$items,
            'perfid'=>$perfid,
            'mfolder'=>$mfolder,
            'activWord'=>$activWord,
            'greyWords'=>json_encode($wordsToGrey)
            ]); 

            
    }

    public function wordToColor($user, $items, $perfid, $mfolder){
        //Word to color !
        $wordDoneIndex = array(); 
        $wordTodoIndex = array(); 
        $wordFinishedIndex = array(); 
        $greyWords = array();    
        $alldone = $user->coresults->where('item_id', $perfid)->where('mediafolder', $mfolder)->where('state','done');
        $alltodo =  $user->coresults->where('item_id', $perfid)->where('mediafolder', $mfolder)->where('state','todo');
        // Array : index of done words
        foreach ($alldone as $key => $done) {
           $ixWDone =  explode("_",$done->mediafilename);
           if(!in_array($ixWDone[1], $wordDoneIndex, true)){
               array_push($wordDoneIndex, $ixWDone[1]) ;
            }
        }
        // Array : index of todo words
        foreach ($alltodo as $key => $Todo) {
           $ixWTodo =  explode("_",$Todo->mediafilename);
           if(!in_array($ixWTodo[1], $wordTodoIndex, true)){
               array_push($wordTodoIndex, $ixWTodo[1]) ;
            }
        }

        // Compare if Done index is still in Todo index
        foreach ($wordDoneIndex as $key => $doneIndex) {
            if(!in_array($doneIndex,$wordTodoIndex, true )){
                 array_push($wordFinishedIndex,$doneIndex ) ;    
            }
        }

        $allWordList = json_decode($items[0]->content);
        //dd($allWordList->words);
        // Create the word to change to grey : done with no todo left !
         foreach ($wordFinishedIndex as $key => $FinishedIndex) {
            array_push($greyWords,$allWordList->words[$FinishedIndex]);
        }
        
        return $greyWords;
    }

     public function done()
    {   
        $perfid = request('perfid');
        $mfolder = request('mfolder');
        $recid = request('recid'); // To find the record in database
        $activWord = request('activWord'); // To retreive the original state
        $result= request('result'); // data to write
        $state = request('state'); // data to write 
        //Coresult::where('id', '$recid')->update(array('results'=>'$result'))->update(array('state'=>'$state'));
        $user = auth()->user(); 
        $corer = Coresult::find( $recid );

   
        if($state=="todo" ){ 
            if($corer){
            $corer->results = "_";
            $corer->state = $state;
            $corer->save();
            } 
        }
        else{
            if($corer){
            $corer->results = $result;
            $corer->state = $state;
            $corer->save();
            } 

        }


       // $correction = Coresult:: where('item_id', $perfid)->where('mediafolder', $mfolder)->get();
        $corrections = $user->coresults->where('item_id', $perfid)->where('mediafolder', $mfolder); 
       $items = Iteminfo::where('id', $perfid)->get();
       $wordsToGrey =  ScoringIdmController::wordToColor( $user, $items, $perfid, $mfolder);

         return view('scoringidm')->with([
           'correction'=>$corrections,
           'item'=>$items,
           'perfid'=>$perfid,
           'mfolder'=>$mfolder, 
           'activWord'=>$activWord,
           'greyWords'=>json_encode($wordsToGrey)
           //'users'=>$users 
            ]);

    }


}
