@extends(backpack_view('blank'))

@section('content')
            
<main class="mfMain">
     <div class="hiddenData hidden">
          {{$correction}}
     </div>
    <div class="hiddenItem hidden">
          {{$item}}
     </div>
      <div class="hiddenCorrDone hidden">
          {{$corrDone}}
     </div>
       <div class="container p-3 corrapp">
        <div class="itemInfo"></div>    
        <h1 class="toptitle">{{trans('correction.Scoring oral production')}}</h1>   
            <div class="testtaker row">
                {{-- <div class="ttID barElement precoTool">{{trans('correction.Pre-correction')}}: <button id ="preCorrBT" type="button" class="btn btn-warning btn-sm instruct" >{{trans('correction.ACTIVATED')}}</button>    </div> --}}                
                <div class="ttID barElement">{{trans('correction.Test taker id')}}:</div>
                <div class="jumpto barElement">
                <select disabled class="form-control-sm" name="jump" id="jump">
                <option disabled selected value="" >- {{trans('correction.Go to test taker...')}} -</option>
                </select>
                </div>
                <div class="cpt barElement ttID">{{trans('correction.To do')}} : <span class="todo">___ </span></div>
                <div class="barElement">
                    <form action ="scoring/store" method="post" id="dataFlexOral">
                        @csrf
                        <div><input type="text" name="perfid" id="perfid" hidden>
                        <input type="text" name="datacorr" id="datacorr" hidden>
                        <div class="input-group input-group-sm mb-3 ">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="QaudioSelect">Enregistrement</label>
                            </div>
                                <select class="custom-select" id="QaudioSelect">
                                    <option selected disabled>choisissez...</option>
                                    <option value="4">Inaudible</option>
                                    <option value="3">Contenu inapproprié</option>
                                    <option value="2">Tronqué</option>
                                    <option value="1">Interférences</option>
                                    <option value="0">Valide</option>
                                </select>

                           <button  disabled class="resultSender btn btn-primary btn-sm mr-1" type="submit">Enregistrer votre correction</button> 
                           <button type="button" title="Cliquez sur ce bouton pour faire apparaître les corrections que vous avez déjà encodées afin d'y apporter des modifications ou bien pour les compléter." class="btn btn-info btn-sm oralEditorMode"><i class="fas fa-edit"></i> Editer mes corrections</button>    
                        </div>
                        

                          
                        </div>

                    </form>
                   
                </div>
                {{-- <div class="jumpto barElement">
                    Editer Correction :
                <select class="form-control-sm" name="jump" id="jump">
                <option disabled selected value="" >- {{trans('correction.Go to test taker...')}} -</option>
                </select>
                </div> --}}
            </div>
            
            <div class="row">
                <div class="ttEditor">
                <div class="ttID barElement">
                    {{-- <button type="button" class="btn btn-info btn-sm editorInfoOral" data-toggle="modal" data-target="#modalEditInfoOral"><i class="far fa-question-circle"></i></button> --}}
                    Editer</div>
                <div class="jumpto barElement">
                <select class="form-control-sm" name="jumpDone" id="jumpDone">
                <option disabled selected value="" >- {{trans('correction.Test-taker code')}} -</option>
                </select>
                </div>
                <div class="cpt barElement ttID">{{trans('correction.To do')}} : <span class="todo">___ </span></div>
                <div class="barElement">
                    <form action ="scoring/store" method="post" id="EMOralDataFlex">
                        @csrf
                        <div><input type="text" name="perfid" id="EMperfid" hidden>
                        <input type="text" name="datacorr" id="EMdatacorr" hidden>
                        <div class="input-group input-group-sm mb-3 ">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="QaudioSelectEDITOR">Enregistrement</label>
                            </div>
                                <select class="custom-select" id="QaudioSelectEDITOR" name="audioQ">
                                    <option selected disabled>choisissez...</option>
                                    <option value="4">Inaudible</option>
                                    <option value="3">Contenu inapproprié</option>
                                    <option value="2">Tronqué</option>
                                    <option value="1">Interférences</option>
                                    <option value="0">Valide</option>
                                </select>

                        <button class="resultSender btn btn-primary btn-sm" title="Sauver les modifications" type="submit"><i class="far fa-save"></i> Enregistrer</button>     
                        <button type="button" class="btn btn-info btn-sm oralCloseEditorMode ml-1"><i class="fas fa-times"></i> Fermer l'Editeur de correction</button>
                        
                    
                        </div> 
                        </div>
                    </form>
                       
                </div>
               
            </div>
            </div>
            
           

         
            <div class="row">
                <div class="topPart col">
                    <div id="content">
                        <canvas id="canvas" width="400" height="10"></canvas>
                    </div>
                    <div class="toolbarCorrection">
                        
                       <!--  <audio id="mp3" muted  id="audio" controls>HTML5 Audio element not supported</audio> -->
                        <div class="correctToolBar">   
                            <button type="button" class="btn btn-primary btn-sm displayOralInstruction"  data-toggle="modal" data-target="#modalInstruct">{{trans('correction.Instructions')}}</button>
                        </div>
                        
                    </div>
                <div class="middlePart row">
                    <div class="questions col-4 "></div>
                </div><div class="commentPerfContainer">
                        <span class="commentTitle">Espace commentaire :</span> 
                        <textarea name="commentPerf" id="commentPerf" rows="5"></textarea>
                    </div>
                      
            </div>
            <div id="support" class="supportSpace">
                <audio id="audio"  preload="auto" controls ></audio>     
            </div> 

       <!-- Modal -->
    </main>
    
@endsection



