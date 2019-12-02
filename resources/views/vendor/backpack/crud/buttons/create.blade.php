
@if ($crud->entity_name == trans_choice('correction.Role',1) || $crud->entity_name == trans_choice('correction.User',1) || $crud->entity_name == trans_choice('correction.permission',1))
<a href="{{ url($crud->route.'/create') }}" class="btn btn-primary" data-style="zoom-in"><span class="ladda-label"><i class="fa fa-plus"></i> {{ trans('backpack::crud.add') }} {{ $crud->entity_name }}</span></a>
@else
	<a href="{{ url('admin/createCorrection') }}" class="btn btn-primary" data-style="zoom-in"><span class="ladda-label"><i class="fa fa-plus"></i>{{trans('correction.Create a new correction')}}</span></a>
@endif
