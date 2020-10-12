<?php

namespace App\Http\Controllers\Admin;


use Illuminate\Http\Request;
use App\Models\Iteminfo;
use App\Models\Coresult;
use App\User;
use App\Http\Controllers\Controller;

class createCorrectionRecords extends Controller
{
     public function index() { // TODO This should be named Store function
        
        request()->validate([
            'mediapath'=>'required',
            'corrname'=>'required',
            'subject'=>'required',
            'language'=>'required',
            'level'=>'required',
            'grade'=>'required',
            'instructions'=>'required',
            'content'=>'required',
            'content_ref'=>'required',
            'corrtype'=>'required',       
            'itemtype'=>'required',
            'Author'=>'required',
            'Institution'=>'required',
            'test_session_id'=>'required', // TODO Change tolerance in migration for null
            'docLink'=>'required', //TODO Change tolerance in migration for null
            'datestart'=>'required'
            ]);

       $mediapath =  request('mediapath');
       $corrname = request('corrname');
       $subject = request('subject');
       $language = request('language');
       $level = request('level');
       $grade = request('grade');
       $instructions = request('instructions');
       $content = request('content');
       $content_ref = request('content_ref');
       $precorrections = request('precorrection');
       $corrtype = request('corrtype');
       $itemtype = request('itemtype');
       $Author = request('Author');
       $Institution = request('Institution');
       $test_session_id = request('test_session_id');
       $docLink = request('docLink');
       $datestart = request('datestart');

       //Clean precorrection ID
       $precorrections = json_decode($precorrections);
      

        $fileNameList = [];
        $filesInFolder = \File::files('uploads/'.$mediapath);     
            foreach($filesInFolder as $path) { 
                $file = pathinfo($path);
                if($file['extension'] == 'mp3')
                {array_push($fileNameList,$file['filename']);}
            }
        
        // Write the itemData First : (strict image from previous form)
        $iteminfo = new ITeminfo;
        
        $iteminfo->mediapath = $mediapath;
        $iteminfo->corrname = $corrname;
        $iteminfo->subject = $subject;
        $iteminfo->language = $language;
        $iteminfo->level = $level;
        $iteminfo->grade = $grade;
        $iteminfo->instructions = $instructions;
        $iteminfo->content = $content;
        //Precorrection data to include!
        $iteminfo->content_ref = $content_ref;
        $iteminfo->corrtype = $corrtype;
        $iteminfo->itemtype = $itemtype;
        $iteminfo->Author = $Author;
        $iteminfo->Institution = $Institution;
        $iteminfo->test_session_id = $test_session_id;
        $iteminfo->docLink = $docLink;
        $iteminfo->datestart = $datestart;
        $iteminfo->corrplan = "_";
        $iteminfo->save();
        $insertedId = $iteminfo->id;
        //dd($corrtype);
        

        
        // Write the CorrData    
        if($corrtype == 'precorr'){
            foreach ($fileNameList as $filename) {
               
                $coresult = new Coresult;

                $coresult->item_id = $insertedId;
                $coresult->corrector_id = 1; //NOT ATTRIBUTED Default
                $coresult->mediafilename = $filename;
                $coresult->mediafolder = $mediapath;
                $coresult->precorrection = "_";
                $coresult->results = "_";
                $coresult->state = "todo"; 
                $coresult->save();

                foreach ($precorrections as $key => $precorrection) {
                    if($precorrection->id == $filename){
                        $coresult->precorrection = "{\"hpreco\":[" . implode(",", $precorrection->hpreco). "],\"endpreco\":" .$precorrection->endpreco ."}" ; 
                       
                        $coresult->save();
                    }
                }  

            }
            }else{
             foreach ($fileNameList as $filename) {
                
                $coresult = new Coresult;

                $coresult->item_id = $insertedId;
                $coresult->corrector_id = 1; //NOT ATTRIBUTED Default
                $coresult->mediafilename = $filename;
                $coresult->mediafolder = $mediapath;
                $coresult->precorrection = '_'; 
                $coresult->results = "_";
                $coresult->state = "todo" ;
                $coresult->save();
            }
        }
       return redirect('admin/correctionList');
    } 
}
