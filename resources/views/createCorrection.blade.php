@extends(backpack_view('blank'))

@section('content')

<h1>{{trans("correction.Create a new correction")}}</h1>



<!-- <form action="http://127.0.0.1:8000/admin/iteminfo" method="post"> -->
<p>{{trans('correction.New Corr Presentation')}}</p>
<p>{{trans('correction.Precorrection validation format')}} : <a href="https://jsonlint.com/">JsonLint</a> ; 
{{trans('correction.JSON models for')}} :  <a href="../uploads/json_Model_Text/manifest.json">{{trans('correction.Text simple correction')}}</a>  ; <a href="../uploads/json_Model_TextPrecorr/manifest.json">{{trans('correction.Text with precorrection')}}</a> ; <a href="../uploads/Json_Model_Word/manifest.json">{{trans('correction.Word reading fluency correction')}}</a></p>

<form action="createCorrection/addrecords" method="post">
 @csrf
         <div class="row mb-2">
            <div class="col">
            <div class="btn-group btn-group-toggle">
            <label class="btn btn-primary active textCorr">
                <input type="radio" name="itemtype" class="textCorr gtype" autocomplete="off" value="Text_reading"> {{trans('correction.Fluency in text reading')}}
            </label>
             <label class="btn btn-primary active textPreCodedCorr">
                <input type="radio" name="itemtype" class="oralProdCorr gtype" autocomplete="off" value="Oral_production">{{trans('correction.Oral production')}}
            </label>
            <label class="btn btn-primary wordCorr">
                <input type="radio" name="itemtype" class="wordCorr gtype" autocomplete="off" value="Word_reading">{{trans('correction.Fluency Word reading')}}
            </label>
            </div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
            <div class="alert alert-warning IDMCorrAlert" role="alert">
                {{trans('correction.Word correction presentation')}}
            </div>
            <div class="alert alert-warning texCorrAlert" role="alert">
                  {{trans('correction.text correction presentation')}}
            </div>
            <div class="alert alert-warning texPreCodedCorrAlert" role="alert">
                  {{trans('correction.precoded correction presentation')}}               
            </div>

            </div>
        </div>
        <div class="row mb-4">
            <div class="col">
            <input type="text" placeholder= "{{trans('correction.Audio Folder name...')}}" class="form-control" name="mediapath" id="mediapath" title="Audio folder's name" required /> 
            </div>
            <div class="col">
            <button type="button" class="btn btn-primary loaderbt ">{{trans('correction.Verify Path and data')}}</button> 
            </div>
        </div>
            <!-- <div class="CheckExist checkMessage"></div>  -->
        <div class="row mb-3">
            <div class="col">
            <div class="checkData checkers" role="alert"></div>
            <div class="checkitemType checkers" role="alert"></div>
            <div class="checkCorrMode checkers" role="alert"></div>
            </div>
        </div>
         
        <div class="row mb-3">
            <div class="col">
            <input required type="text" placeholder= "{{trans('correction.Correction title...')}}" class="form-control" name="corrname" id="corrname" title="Name your correction" /> 
            </div>
        </div>
        <div class="form-row">
         <div class="form-group col-md-3">
         <!--  <input type="text" class="form-control" id="subject" name="subject" placeholder="Subject"> -->
            <div class="input-group ">
            <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">{{trans('correction.Subject')}}</label>
            </div>
            <select required class="custom-select" id="subject" name="subject" title="Authorize to target corrector by subjects.">
                <option value="">{{trans('correction.Choose a subject...')}} </option>
                <option value="French">{{trans('correction.French')}}</option>
                <option value="Math">{{trans('correction.Math')}}</option>
                <option value="Sciences">{{trans('correction.Sciences')}}</option>
                <option value="History">{{trans('correction.History')}}</option>
            </select>
            </div>
        </div>
        <div class="form-group col-md-3">
         <!--  <input type="text" class="form-control" name="language" id="language" placeholder="Language"> -->
            <div class="input-group ">
            <div class="input-group-prepend">
                <label class="input-group-text" for="language">{{trans('correction.Language')}}</label>
            </div>
            <select required class="custom-select" name="language" id="language" title="Define the language of the corrector.">
                <option value="">{{trans('correction.Choose a language...')}}</option>
                <option value="French">{{trans('correction.French')}}</option>
                <option value="German">{{trans('correction.German')}}</option>
                <option value="English">{{trans('correction.English')}}</option>
            </select>
            </div>
        </div>
        <div class="form-group col-md-3">
         <!--  <input type="text" class="form-control" name="level" id="level" placeholder="Level"> -->
          <div class="input-group ">
            <div class="input-group-prepend">
                <label class="input-group-text" for="level">{{trans('correction.Level')}}</label>
            </div>
            <select required  class="custom-select" name="level" id="level" title="Define the level.">
                <option value="">{{trans('correction.Choose a level...')}}</option>
                <option value="Primary">{{trans('correction.Primary')}}</option>
                <option value="Secondary">{{trans('correction.Secondary')}}</option>
                <option value="Tertiary">{{trans('correction.Tertiary')}}</option>
            </select>
            </div>
        </div>
        <div class="form-group col-md-3">
          <!-- <input type="text" class="form-control" name="grade" id="grade" placeholder="grade"> -->
          <div class="input-group ">
            <div class="input-group-prepend">
                <label class="input-group-text" for="grade">{{trans('correction.Grade')}}</label>
            </div>
            <select required class="custom-select" name="grade" id="grade" title="Precise the year in the level">
                <option value="">{{trans('correction.Choose a grade...')}}</option>
                <option value="First">{{trans('correction.First')}}</option>
                <option value="Second">{{trans('correction.Second')}}</option>
                <option value="Third">{{trans('correction.Third')}}</option>
                <option value="Fourth">{{trans('correction.Fourth')}}</option>
                <option value="Fifth">{{trans('correction.Fifth')}}</option>
            </select>
            </div>
          
        </div>
      </div> <!-- end row --> 
        <div class="row mb-2">
            <div class="col">
            <textarea required type="text" placeholder= "{{trans('correction.instructions...')}}" class="form-control" name="instructions" id="instructions" /></textarea>    
            </div>
        </div> 

        <div class="row mb-2 textItemType">
            <div class="col">
           <textarea required type="text" placeholder= "{{trans('correction.Here paste the text, or the words list separated by a coma...')}}" class="form-control" name="content" id="content" /></textarea>   
             </div>
        </div> 
        <div class="row mb-2">
            <div class="col">
            <input required type="text" placeholder= "{{trans('correction.Additional references (author, edition, publication year)...')}}" class="form-control" id="content_ref" name="content_ref"/>  
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
                <div class="input-group ">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="correction_mode">{{trans('correction.Correction mode')}}</label>
                </div>
                <select required class="custom-select" id="correction_mode" name="corrtype">
                    <option value="">{{trans('correction.Choose...')}}</option>
                    <option value="simple">{{trans('correction.Simple')}}</option>
                    <option value="double">{{trans('correction.Double')}}</option>
                </select>
                </div>
            </div>
            <div class="col">
                <div class="input-group ">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="correction_mode" hidden>Mots complexes</label>
                </div>
            <input type="text" hidden placeholder= "Mots complexes séparés par des virgules" class="form-control" id="Mcomplex"  name="Mcomplex"/>
        </div>    
        </div>
            <div class="col">
            <input type="text" placeholder= "Author" class="form-control" id="Author" hidden name="Author" value="{{ backpack_auth()->user()->name }}" />
            <input required type="text" placeholder= "{{trans('correction.Institution')}}" class="form-control" id="institution"  name="Institution"/>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
             <input  type="text" placeholder= "{{trans('correction.related to test...')}}" class="form-control" name="test_session_id" id="test_session_id"  title="Precise the code of the test that include this item if available" />
            </div>
             <div class="col">
                <input type="text" placeholder= "{{trans('correction.Paste link for item\'s Additionnal references here...')}}" class="form-control" name="docLink" id="doclink" />
            </div>
        </div>
        <div class="row mb-2">
<!--             <div class="col">
             <input type="number" placeholder= "Number of testTakers" class="form-control" id="testTakers" />
            </div> -->
            <div class="col">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">{{trans('correction.Start on')}}</span>
                </div>
                 <input type="date"  class="form-control" id="datestart" name="datestart" />
                </div>
           
            </div>
        </div>
        <div class="row mb-2">
            <div class="col">
        
            </div>
        </div>
   
<input type="text" placeholder= "status" class="form-control" id="status" hidden/>
        <div id="saveActions" class="form-group">

    <input type="hidden" name="save_action" value="save_and_back">

    <div class="btn-group" role="group">

        <button type="submit" class="btn btn-success">
            <span class="fa fa-save" role="presentation" aria-hidden="true"></span> &nbsp;
            <span data-value="save_and_back">{{trans('correction.Save')}}</span>
        </button>


    </div>

    <a href="{{url('admin/correctionList')}}" class="btn btn-secondary"><span class="fa fa-ban"></span> &nbsp;{{trans('correction.Cancel')}}</a>
</div>
    </form>    


@endsection