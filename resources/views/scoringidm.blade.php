@extends(backpack_view('blank'))

@section('content')
<meta name="csrf-token" content="{{ csrf_token() }}">

<div class="container ">
  <div class="itemAvailable hidden">
   

    @foreach($correction as $mediaitem){{
      ($mediaitem->mediafilename)}},
    @endforeach
    
  </div>
   <div class="IDMhiddenData hidden">{{$correction}}</div>
   <div class="IDMhiddenItem hidden">{{$item}}</div>
   <div class="activWord hidden">{{$activWord}}</div>
   <div class="greyWords hidden">{{$greyWords}}</div>
  <div class="row">
    

    <div class="col IDMttTodo">
      <div class="todoHead">{{trans('correction.TO DO')}}</div>
      <ul class="list-group IDMtodoList"></ul>
    </div>
    <div class="col IDMCenter col-6">

        <div class="input-group mb-3">
          <h1>{{trans('correction.Scoring fluency for word reading')}}</h1>
          <div class="input-group-prepend">
            <label class="input-group-text" for="worditem">{{trans('correction.Choose the word-item to score')}}</label>
          </div>
          <select class="custom-select" id="worditem">

          </select>
        </div>
        
        <div>
        <div class="IDMtestTaker">{{trans('correction.Test taker n°')}}<span id="ttidactiv">-</span> </div>
        <audio id="audioItem"
            controls autoplay>
                Your browser does not support the
                <code>audio</code> element.
        </audio>
      </div>
        <div class="IDMitem">
        
        <h1 id="wordToListen"></h1>
         
        </div>
         <div class="IDMmention">
        <form class="formValBt" action="scoringidm" method="post">
        @csrf
        <input type="text" name="perfid" class="perfid" hidden value="{{$perfid}}">
        <input type="text" name="mfolder" class="mfolder" hidden value="{{$mfolder}}">
        <input type="text" name="activWord" class="activWord" value="{{$activWord}}" hidden>
        <input type="text" name="recid" class="idmttid" hidden>
        <input type="text" name="result" class="idmResult" value="Acceptable" hidden>
        <input type="text" name="state" class="idmState" value="done" hidden>
        <button type="button" class="btn btn-primary idmValidation" onclick="this.form.submit()">{{trans('correction.Acceptable')}}</button>
         </form>
         
        <form class="formValBt" action="scoringidm" method="post">
        @csrf
        <input type="text" name="perfid" class="perfid" hidden value="{{$perfid}}">
        <input type="text" name="mfolder" class="mfolder" hidden value="{{$mfolder}}">
        <input type="text" name="activWord" class="activWord" value="{{$activWord}}" hidden>
        <input type="text" name="recid" class="idmttid" hidden>
        <input type="text" name="result" class="idmResult" value="Insufficient" hidden>
        <input type="text" name="state" class="idmState" value="done" hidden>
        <button type="button" class="btn btn-primary idmValidation" onclick="this.form.submit()">{{trans('correction.Insufficient')}}</button>
        </form>

        <form class="formValBt" action="scoringidm" method="post">
        @csrf
        <input type="text" name="perfid" class="perfid" hidden value="{{$perfid}}">
        <input type="text" name="mfolder" class="mfolder" hidden value="{{$mfolder}}">
        <input type="text" name="activWord" class="activWord" value="{{$activWord}}" hidden>
        <input type="text" name="recid" class="idmttid" hidden>
        <input type="text" name="result" class="idmResult" value="Too noisy" hidden>
        <input type="text" name="state" class="idmState" value="done" hidden>
        <button type="button" class="btn btn-primary idmValidation" onclick="this.form.submit()">{{trans('correction.Too noisy')}}</button>
        </form>

        <form class="formValBt" action="scoringidm" method="post">
        @csrf
        <input type="text" name="perfid" class="perfid" hidden value="{{$perfid}}">
        <input type="text" name="mfolder" class="mfolder" hidden value="{{$mfolder}}">
        <input type="text" name="activWord" class="activWord" value="{{$activWord}}" hidden>
        <input type="text" name="recid" class="idmttid" hidden>
        <input type="text" name="result" class="idmResult" value="Other" hidden>
        <input type="text" name="state" class="idmState" value="done" hidden>
        <button type="button" class="btn btn-primary idmValidation" onclick="this.form.submit()">{{trans('correction.Other')}}</button>
        </form>       
        
       

    </div>
    </div>
    <div class="col IDMttDone">
      <div class="todoHead">{{trans('correction.DONE')}}</div>      
      <ul class="list-group IDMListDone">
          
      </ul>
    </div>
    <div class="backTodoForm">
      <form action="scoringidm" method="post">
        @csrf 
        <input type="text" name="perfid" class="perfid" hidden value="{{$perfid}}">
        <input type="text" name="mfolder" class="mfolder" hidden value="{{$mfolder}}">
        <input type="text" name="activWord" class="activWord" value="{{$activWord}}" hidden>
        <input type="text" name="recid" class="idmttid" hidden>
        <input type="text" name="result" class="idmResult" value="Other" hidden>
        <input type="text" name="state" class="idmState" value="todo" hidden>
        <button class="backTodo fa fa-backward"></button>
      </form>
    </div>
  </div>
  
</div>





@endsection