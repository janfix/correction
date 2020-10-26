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
        <h1 class="toptitle">{{trans('correction.Scoring text-reading fluency')}}</h1>
            
            
            <div class="testtaker row">
                {{-- <div class="ttID barElement precoTool">{{trans('correction.Pre-correction')}}: <button id ="preCorrBT" type="button" class="btn btn-warning btn-sm instruct" >{{trans('correction.ACTIVATED')}}</button>    </div> --}}                
                <div class="ttID barElement">{{trans('correction.New correction')}}:</div>
                <div class="jumpto barElement">
                <select disabled class="form-control-sm" name="jump" id="jump">
                <option disabled selected value="" >- {{trans('correction.Test-taker code')}} -</option>
                </select>
                </div>
                <div class="cpt barElement ttID">{{trans('correction.To do')}} : <span class="todo">___ </span></div>
                <div class="barElement">
                    <form action ="scoring/store" method="post" id="dataFlex">
                        @csrf
                        <div><input type="text" name="perfid" id="perfid" hidden>
                        <input type="text" name="datacorr" id="datacorr" hidden>
                        <div class="input-group input-group-sm mb-3 ">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="QaudioSelect">Enregistrement</label>
                            </div>
                                <select class="custom-select" id="QaudioSelect">
                                    <option selected disabled>choisissez...</option>
                                    <option value="inaudible">Inaudible</option>
                                    <option value="Contenu_Inap">Contenu inapproprié</option>
                                    <option value="tronque">Tronqué</option>
                                    <option value="interfs">Interférences</option>
                                    <option value="valide">Valide</option>
                                </select>

                           <button class="resultSender btn btn-primary btn-sm" title="{{trans('correction.Save correction')}}" type="submit"><i class="far fa-save"></i> Enregistrer</button>     
                           <button type="button" title="Cliquez sur ce bouton pour faire apparaître les corrections que vous avez déjà encodées afin d'y apporter des modifications ou bien pour les compléter." class="btn btn-info btn-sm openEditorMode"><i class="fas fa-edit"></i> Editer mes corrections</button>
                           <div class="trackCorr">
                               <div title="Attention qualité audio -> contrôle necessaire" class="audioTrack trackIcon"><i class="fas fa-volume-up"></i></div>
                               <div title="Attention encodage des temps -> contrôle necessaire" class="chronoTrack trackIcon"><i class="fas fa-stopwatch"></i></div>
                               <div title="Attention mots complexes ->contrôle necessaire" class="mComplexTrack trackIcon"><i class="fas fa-exclamation"></i></div>
                               <div title="Attention liasions obligatoires ->contrôle necessaire" class="liaisonTrack trackIcon"><i class="fas fa-arrows-alt-h"></i></div>
                           </div>
                        </div> 
                        </div>
                    </form>   
                </div>
                
            </div> 
            <div class="row">
            <div class="ttEditor">
                <div class="ttID barElement"><button type="button" class="btn btn-info btn-sm editorInfo" data-toggle="modal" data-target="#modalEditInfo"><i class="far fa-question-circle"></i></button>Editer</div>
                <div class="jumpto barElement">
                <select class="form-control-sm" name="jumpDone" id="jumpDone">
                <option disabled selected value="" >- {{trans('correction.Test-taker code')}} -</option>
                </select>
                </div>
                <div class="cpt barElement ttID">{{trans('correction.To do')}} : <span class="todo">___ </span></div>
                <div class="barElement">
                    <form action ="scoring/store" method="post" id="EMdataFlex">
                        @csrf
                        <div><input type="text" name="perfid" id="EMperfid" hidden>
                        <input type="text" name="datacorr" id="EMdatacorr" hidden>
                        <div class="input-group input-group-sm mb-3 ">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="QaudioSelectEDITOR">Enregistrement</label>
                            </div>
                                <select class="custom-select" id="QaudioSelectEDITOR" name="audioQ">
                                    <option selected disabled>choisissez...</option>
                                    <option value="inaudible">Inaudible</option>
                                    <option value="Contenu_Inap">Contenu inapproprié</option>
                                    <option value="tronque">Tronqué</option>
                                    <option value="interfs">Interférences</option>
                                    <option value="valide">Valide</option>
                                </select>

                        <button class="resultSender btn btn-primary btn-sm" title="Sauver les modifications" type="submit"><i class="far fa-save"></i> Enregistrer</button>     
                        <button type="button" class="btn btn-info btn-sm closeEditorMode"><i class="fas fa-times"></i> Fermer l'Editeur de correction</button>
                        <div class="trackCorr">
                               <div class="audioTrackED trackIcon"><i class="fas fa-volume-up"></i></div>
                               <div class="chronoTrackED trackIcon"><i class="fas fa-stopwatch"></i></div>
                               <div class="mComplexTrackED trackIcon"><i class="fas fa-exclamation"></i></div>
                               <div class="liaisonTrackED trackIcon"><i class="fas fa-arrows-alt-h"></i></div>
                           </div>
                    
                        </div> 
                        </div>
                    </form>
                       
                </div>
               
            </div>
            </div>
            <div class="row">
                <div class="col">
                    <div id="content">
                        <canvas id="canvas" width="400" height="10"></canvas>
                    </div>
                    <div class="toolbarCorrection">
                        <audio id="audio"  preload="auto" controls ></audio> 
                        <div class="mode">Creation</div>
                       <!--  <audio id="mp3" muted  id="audio" controls>HTML5 Audio element not supported</audio> -->
                        <div class="correctToolBar">   
                        <button type="button" class="btn btn-primary btn-sm displayInstruction"  data-toggle="modal" data-target="#modalInstruct">{{trans('correction.Instructions')}}</button>
                        <button type="button" class="btn btn-info btn-sm timeTagger">{{trans('correction.Time tagger')}}</button>
                        <button type="button" class="btn btn-warning btn-sm HLcomplexWords">{{trans('correction.Complex words')}}</button>
                        <button type="button" class="btn btn-danger btn-sm HLliaisons">Liaisons obligatoires</button>
                        <button type="button" class="btn btn-primary btn-sm displayTimeInstruction timeOption"  data-toggle="modal" data-target="#TimeTaggerInfo"><i class="far fa-clock"> </i>{{trans('correction.Time coding instructions')}}</button>
                        <button type="button" class="btn btn-success btn-sm closeTTagger timeOption"><i class="fas fa-times"></i> {{trans('correction.Close Time tagger')}}</button>
                        <button type="button" class="btn btn-warning btn-sm redifStart timeOption"><i class="fas fa-flag-checkered"> </i> {{trans('correction.Redefine Start')}}</button>
                        <div class="restart startValue timeOption">00:000</div>
                        <button type="button" class="btn btn-danger btn-sm resetTimer timeOption"><i class="far fa-clock"> </i> {{trans('correction.Reset all chrono-tags')}}</button>
                        
                        
                    </div>
                    </div>
            <div class="editZone">
                <div class="activWordGroup">
                    <div class="letterControl" title="Cliquez sur les mots du texte pour les éditer et préciser vos annotations">
                        <span class="letter zoneEdition">Espace d'analyse des mots</span>
                    </div>
                </div>
                <div class="motsLusContainer">
                    Mots lus : <span class="motslus">103</span>
                </div>
            </div>
                    

                
                <div class="textSpace">
             <table class="text-muted ProsodyLine "> </table>
                </div>
                <div class="commentPerfContainer">
                    <span class="commentTitle">Espace commentaire :</span> 
                    <textarea name="commentPerf" id="commentPerf" rows="5"></textarea>
                </div>
                <button title="Efface l'ensemble des annotations de correction" type="button" class="btn btn-danger bigReset">Remise à zéro de la correction</button>

            <div class="dropdown-menu dropdown-menu-sm" id="context-menu">
                <a class="dropdown-item missing_word" href="#">Mot manquant (E)</a>
                <a class="dropdown-item confusion" href="#">Un mot pour un autre (c)</a>
                <a class="dropdown-item bad_pronunciation" href="#">Mot mal prononcé (P)</a>
                <a class="dropdown-item mtronque" href="#">Mot tronqué (T)</a>
                <a class="dropdown-item autocorr" href="#">AutoCorrection(AC)</a>    
            </div>

            <div class="dropdown-menu dropdown-menu-sm" id="letterCMenu">
                <a class="dropdown-item letterConfusion" href="#">Graphème mal lu (G)</a>
                <a class="dropdown-item letterInversion" href="#">Inversion (I)</a>
                <a class="dropdown-item letterRepetition" href="#">Repetition (R)</a>
                <a class="dropdown-item letterAjout" href="#">Ajout de lettre/son (+)</a>
                <hr>
                <a class="dropdown-item letterBlock" href="#">{{trans('correction.Blocking')}} (A)</a>
                <a class="dropdown-item letterNotRead" href="#">Omission (O)</a>

            </div>

            <div class="dropdown-menu dropdown-menu-sm" id="spaceCMenu">
                <a class="dropdown-item missingLiaison" href="#">Liaison manquante</a>
                <a class="dropdown-item wrongLiaison" href="#">Mauvaise liaison</a>
                <hr />
                <a class="dropdown-item WordInversion" href="#">Inversion de mots (i)</a>
                <a class="dropdown-item addition" href="#">Ajout</a>
            </div>

            <div class="dropdown-menu dropdown-menu-sm" id="ponctCMenu">
                <a class="dropdown-item ponctnotconsid" href="#">Intonation finale non marquée</a>
                <a class="dropdown-item ponctnotvalid" href="#">Intonation finale inappropriée</a>
            </div>

            <div class="dropdown-menu dropdown-menu-sm" id="timerCmenu">
                <a class="dropdown-item firstWord" href="#">Premier mot lu</a>
                <a class="dropdown-item 30sWord" href="#">Mot lu à 30s (30)</a>
                <a class="dropdown-item lastWord" href="#">Dernier mot lu</a>
            </div>


            



                  
        </div>
       <!-- Modal -->
    </main>
    
@endsection



