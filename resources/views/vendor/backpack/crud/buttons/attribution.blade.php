@if ($crud->hasAccess('update'))
<!-- Single edit button -->
 @if (auth()->user()->isAdministrator())
             <a href="{{ url('admin/attribution/?perfid='.$entry->getKey()) }}" class="btn btn-sm btn-link"><i class="fa fa-exchange"></i> {{trans('correction.Assignment')}}</a>  
 @endif
	
@endif