@extends(backpack_view('blank'))

@section('content')


<h1>Settings</h1>
<hr />
<h2>Right now, this page is the todo list...</h2> 

<h3>Application settings</h3>  
<ul>
  <li>Grade/Level code that correspond to Country</li>
  <li>Notify to corrector / or not if new attribution or reset of attribution plan</li>    
  <li>Choose the notification system : mail? message ?</li>
  <li></li>
</ul>  


<h3>Correctors attributes</h3>
<ul>
    <li>Correctors language : Pivot table and possibility for one corrector to have many languages.</li>
    <li>Correctors grade/level : Pivot table and possibility for one corrector to have many grade/level.</li>
    <li>Available in corrector profile : recap of all work</li>
    <li>Add a supervisor layer</li>
    <li>In correction interface : messsage when task is finished</li>
    <li class="accomplished">Better attribution table
        <ul>
          <li>Search corrector</li>
          <li>Order by columns</li>
          <li>Pagination</li>
          <li>Select/deselect all correctors</li>
        </ul>
    </li>
    <li>Block autoregistering of corrector</li>
</ul>

<h3>Monitoring correction</h3>
<ul>
  <li>Add time limit and working days</li>
  <li>Better indicator for corrector in correction interface</li>
</ul>


@endsection