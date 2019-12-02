@if ($crud->hasAccess('update'))
<!-- Single edit button -->
 @if (auth()->user()->isAdministrator())
             <a href="{{ url('admin/export/?perfid='.$entry->getKey()) }}" class="btn btn-sm btn-link"><i class="fa fa-download"></i> {{trans('correction.Export')}}</a>  
 @endif
	
@endif