
@extends(backpack_view('blank'))

@section('content')
<main class="mfMain">
     <div class="hiddenData hidden">
          {{$correction}}
     </div>
          <div class="hiddenItem hidden">
          {{$item}}
     </div>
       <div class="container p-3 corrapp">
            <h1 class="toptitle">{{trans('correction.Scoring text-reading fluency')}}</h1>
            
            <div class="itemInfo"></div>
            <hr>
            <div class="testtaker bg-info row mb-2">
                <div class="ttPrevious go col">
                    <div class="fa fa-arrow-circle-left fa-2x previousArrow" aria-hidden="true"></div> 
                    <div class="previous">{{trans('correction.Previous')}}</div>
                </div>
                <div class="bartools">
                <div class="ttID barElement precoTool">{{trans('correction.Pre-correction')}}: <button id ="preCorrBT" type="button" class="btn btn-warning btn-sm instruct" >{{trans('correction.ACTIVATED')}}</button>    </div>                
                <div class="ttID barElement">{{trans('correction.Test taker id')}}:</div>
                <div class="jumpto barElement">
                <select class="form-control-sm" name="jump" id="jump">
                <option disabled selected value="" >- {{trans('correction.Go to test taker...')}} -</option>
                </select>
                </div>
                <div class="cpt barElement ttID">{{trans('correction.To do')}} : <span class="todo">___ </span></div>
                <div class="instruct barElement"><button type="button" class="btn btn-primary btn-sm"  data-toggle="modal" data-target="#modalInstruct">{{trans('correction.Instructions')}}</button>
                </div>
                </div>

                <div class="ttNext col go"><span class="fa fa-arrow-circle-right fa-2x nextArrow" aria-hidden="true"></span><span class="next">{{trans('correction.Next')}}</span> </div>

            </div>
            <div class="row">
                <div class="col leftcol">
                    <div id="content">
                        
                        <canvas id="canvas" width="400" height="200"></canvas>

                        <audio id="audio"  preload="auto" controls ></audio> 
                       <!--  <audio id="mp3" muted  id="audio" controls>HTML5 Audio element not supported</audio> -->
                    </div>
                    <div class="collector">
                    <ul  class="list-group audiQLabelgroup">
                    <li class="list-group-item" id="audioQuality"><div class="audiQLabel">{{trans('correction.Audio quality')}} :</div> 
                        <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="audioQ" id="audioQ1" value="good">
                        <label class="form-check-label" for="audioQ1">{{trans('correction.Good')}}</label>
                        </div>
                        <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="audioQ" id="audioQ2" value="correct">
                        <label class="form-check-label" for="audioQ2">{{trans('correction.Correct')}}</label>
                        </div>
                        <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="audioQ" id="audioQ3" value="low">
                        <label class="form-check-label" for="audioQ3">{{trans('correction.Low')}}</label>
                        </div>
                        <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="audioQ" id="audioQ4" value="unusable">
                        <label class="form-check-label" for="audioQ4">{{trans('correction.unusable')}}</label>
                        </div>
                    </li>
                    <li class="hesinline list-group-item"> <div class="h_count hesinline">{{trans('correction.Hesitations')}} : </div>
                        <div class="h_list hesinline"></div></li>
                    <li class="list-group-item">{{trans('correction.Last word read')}} : <span class="lastWordRead"></span></li> 
<!--                     <li>First silence : 1s</li>
                    <li>Last silence : 3s</li>
                 <li>Silence (ratio): TODO</li> -->   
                    <li class="list-group-item" >
                    <div class="prosody additionalInfo">
                    {{trans('correction.Prosody')}} : 
                        <select name="prosodyQ" id="prosodyQ" class="prosodyQ">
                            <option disabled selected value="--">--</option>
                            <option value="Vgood">{{trans('correction.Very good')}}</option>
                            <option value="good">{{trans('correction.Good')}}</option>
                            <option value="adequate">{{trans('correction.Adequate')}}</option>
                            <option value="Just">{{trans('correction.Just enough')}}</option>
                            <option value="notenough">{{trans('correction.not enough')}}</option>
                        </select> 
                    </div>
                    <div class="fluence additionalInfo">
                    {{trans('correction.Fluency')}} :
                        <select name="fluenceQ" id="fluenceQ" class="fluenceQ">
                            <option disabled selected value="--">--</option>
                            <option value="Vgood">{{trans('correction.Very good')}}</option>
                            <option value="good">{{trans('correction.Good')}}</option>
                            <option value="adequate">{{trans('correction.Adequate')}}</option>
                            <option value="Just">{{trans('correction.Just enough')}}</option>
                            <option value="notenough">{{trans('correction.not enough')}}</option>
                        </select>
                    </div>
                        </li>
                        <li class="comments list-group-item">
                            <textarea class="commentText" rows="2" cols="50" placeholder="{{trans('correction.Your comment')}}"></textarea>
                        </li>
                    </ul>
                    
                    <form action ="scoring/store" method="post" id="dataFlex">
                        @csrf
                        <input type="text" name="perfid" id="perfid" hidden>
                        <input type="text" name="datacorr" id="datacorr" hidden>
                        <button class="resultSender btn btn-primary btn-sm mt-3" type="submit">{{trans('correction.Confirm and save correction')}}</button>
                    </form>
                    <!-- <button type="button" id="FAKER">TEST FAKE SUBMIT</button> -->
                    </div>
                    

                </div>
                <div class="col textSpace">
             <span class="text-muted ProsodyLine "> </span>
                </div>
                  
        </div>
       <!-- Modal -->
    </main>
@endsection


