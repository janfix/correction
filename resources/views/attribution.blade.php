<div hidden class="secret">
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">{{trans('correction.Reset Attribution plan')}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      {{trans('correction.You can reset the correction plan to reattribute the corrections that are still pending.')}}  
      <!-- <li> 1. First it will deattached the corrections from correctors.
        Dans le controlleur = correction()->users()-detach(idofuser)
       <li>2. It will reset the Frequence value to "_" that will signal that no correction plan is set to the app.
       <li>3. It will pass send you back to the list  -->
      
      </div>
      <div class="modal-footer"> 
       <form action="attribution/reset" method="post">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{trans('correction.Close')}}</button>

        
        @csrf
        <input type="hidden" name="perfid" value={{$perfid}}>
        
        @foreach ($buzyUsers as $keys=>$buzyUser)
        
        <input type="hidden" name="buzyUsers[{{$keys}}]" value="{{$buzyUser}}">
        @endforeach
        <button type="submit" class="btn btn-primary">{{trans('correction.Confirm Reset')}}</button>
        </form>

      </div>
    </div>
  </div>
</div>
</div>

@extends(backpack_view('blank'))



@section('content')
<div class=section>
  @if ($ExistAttribution == 0)
<h1>{{trans('correction.Attribution corrections to correctors')}}</h1>
@else
 <h1>{{trans('correction.Monitoring corrections')}}</h1>
 @endif
<div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
          <h3 class="mb-0">{{trans('correction.Correction name')}} : {{$iteminfos[0]->corrname ?? ''}}</h3>
          <div class="mb-1 text-muted">{{trans('correction.Subject')}} : {{$iteminfos[0]->subject ?? ''}} | {{trans('correction.Instructions')}} : {{$iteminfos[0]->instructions ?? ''}}</div>
          <p class="card-text mb-auto">  </p>
          <h4>{{trans('correction.Number of test takers to correct')}} : <span id="TotalItem">{{count($corrections)}}</span></h4>
           {{trans('correction.Number of correction already done for this set of items')}} : {{count($correctionDone)}}.
            {{trans('correction.Total test takers')}} : {{$totalItems}}

            <input type="hidden"  id="ExistAttribution" value="{{$ExistAttribution}}">
           
           <div class="Planned">
            @if ($ExistAttribution == 1) 
            <div class="CorrectionAttribution">
              <h4 class="green"> {{trans('correction.A previous attribution has been build.')}}</h4>
              {{trans('correction.Frequence')}} = {{$iteminfos[0]->corrplan}} {{trans('correction.corrections by day')}} | 
              {{trans('correction.Correction starting date')}} : {{ \Carbon\Carbon::parse($iteminfos[0]->datestart)->format('d/m/Y')}}
            </div>
           @foreach($SuperBuzyUsers as $SuperBuzyUser)
              {{$users->find($SuperBuzyUser[0])->name}} : {{trans('correction.item todo')}} : {{sizeof($SuperBuzyUser[1])}}, {{trans('correction.item done')}} : {{sizeof($SuperBuzyUser[2])}}
           
            @php
            $todo = sizeof($SuperBuzyUser[1]); 
            $done = sizeof($SuperBuzyUser[2]);
            $progression = number_format($done/($todo + $done)*100 , 0,',',' ');
            @endphp
                <div class="progress" style="width:90%">
                  <div class="progress-bar" role="progressbar" style="width: {{$progression}}%;" aria-valuenow="{{$progression}}" aria-valuemin="0" aria-valuemax="100">
                  {{$progression}}%
                  </div>
                </div>

                

            @endforeach    
          <hr>
        <div class="col p-4 ">
          <button type="button" class="btn btn-danger mr-2" data-toggle="modal" data-target="#exampleModalCenter">
           {{trans('correction.Reset attribution plan')}} 
          </button>
          <button type="button" class="btn btn-secondary" onclick="window.location.href='correctionList'">{{trans('correction.Cancel')}}</button>
        </div>
             @endif
          </div>




        
         <!--  <div> Automatic tag selection : 
            <span class="badge badge-pill badge-primary">Subject <i class="fa fa-times" aria-hidden="true"></i></span>
            <span class="badge badge-pill badge-primary">Level <i class="fa fa-times" aria-hidden="true"></i></span>
            <span class="badge badge-pill badge-primary">Language <i class="fa fa-times" aria-hidden="true"></i></span>
            <span class="badge badge-pill badge-warning">Planning <i class="fa fa-times" aria-hidden="true"></i></span>
            <span class="badge badge-pill badge-warning">state=done <i class="fa fa-times" aria-hidden="true"></i></span>
        </div>  -->
        </div>
   
      </div>

</div>



<div class="attributionTool">
<div class="section">

<table class="table table-bordered">
 
  <tbody>
    <tr>
      <th>{{trans('correction.Correctors available')}}</th>
      <th>{{trans('correction.Correctors Selected')}}</th>
      <th>{{trans('correction.Items by corrector')}}</th>
      <th>{{trans('correction.Starting date')}}</th>
      <th>{{trans('correction.Frequence')}}</th>
      <th>{{trans('correction.Working days')}}</th>
      <th>{{trans('correction.Actions')}}</th>
    </tr>
    
    <tr>
      <td>{{ count($users) }}</td>
      <td id="corrSelected"></td>
      <td id="itemByCorrector"></td>
      <td>{{ \Carbon\Carbon::parse($iteminfos[0]->datestart)->format('d/m/Y')}}</td>
      <td>
      <select id=itemFrq>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50" selected>50</option>
        <option value="60">60</option>
      </select> {{trans('correction.items per day')}}</td>
      <td><span id='countCorr' data={{count($corrections)}}></span><span id="wdays"></span></td>
      <td> 
       <!-- Form -->
     <form method='post' action='uploadFile' enctype='multipart/form-data' >
       {{ csrf_field() }}
       <input type="text" name="perfid" hidden value={{$perfid}}>
       <input type='file' name='file' class="btn btn-success btn-sm" >
       <input class="btn btn-success btn-sm" type='submit' name='submit' value= "{{trans('correction.Import correctors')}}">
     </form>
      </td>
    </tr>
   
  </tbody>
</table>

</div>

<div class="section">
<div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">


     <table id="attributionTable" class="bg-white table table-striped table-hover nowrap rounded shadow-xs border-xs" cellspacing="0">
            <thead>
              <tr>
                  <th><input type='checkbox' checked id="Allcheck"> {{trans('correction.Select')}}</th>
                  <th>{{trans('correction.Firstname')}}</th>
                  <th>{{trans('correction.Name')}}</th>
                  <th>{{trans('correction.Language')}}</th>
                  <th>{{trans('correction.Subject')}}</th>
                  <th>{{trans('correction.Level')}}</th>

              </tr>
            </thead>

            <tbody>
            
              @foreach ($users as $user)
             <tr>
              <td><input data="{{$user->id}}" class="corrSelector" type="checkbox" aria-label="Checkbox for following text input" checked></td>
              <td>{{ $user->firstname }}</td>
              <td>{{ $user->name }}</td>
              <td>{{ $user->language }}</td>
              <td>{{ $user->subject }}</td>
              <td>{{ $user->level }}</td>
              
              </tr>
              @endforeach

            </tbody>
            <tfoot>
              <tr>
                <th>{{trans('correction.Select')}}</th>
                 <th>{{trans('correction.Firstname')}}</th>
                  <th>{{trans('correction.Name')}}</th>
                  <th>{{trans('correction.Language')}}</th>
                  <th>{{trans('correction.Subject')}}</th>
                  <th>{{trans('correction.Level')}}</th>

              </tr>
            </tfoot>

          </table>



      </div>

    </div>
<form action="attribution/store" method="post"> 
@csrf
<div class="corList"></div> 
<div class="frequence"><input type="text" name="corrplan" id="corrplan" value="50"></div> 
<input hidden type="text" name="itemid" id="itemId" value="{{$iteminfos[0]->id}}"> 
<button type="submit" class="btn btn-primary">{{trans('correction.Save correction plan')}}</button>
<a href="{{url('admin/correctionList')}}" class="btn btn-secondary"><span class="fa fa-ban"></span> &nbsp;{{trans('correction.Cancel')}}</a>
</form>
<div class="section">



</div>
</div>



@endsection
</div>

@section('footer') 

@endsection