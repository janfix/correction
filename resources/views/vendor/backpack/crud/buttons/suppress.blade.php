<meta name="csrf-token" content="{{ csrf_token() }}">
@if ($crud->hasAccess('delete'))
	 @if (auth()->user()->isAdministrator())
	<a href="javascript:void(0)" onclick="deleteEntry(this)" data-corr="{{$entry->getKey()}}" data-route="{{url('admin/suppress')}}" class="btn btn-sm btn-link" data-button-type="delete"><i class="fa fa-trash"></i> {{ trans('backpack::crud.delete') }}</a>
	@endif
@endif

<script>

	if (typeof deleteEntry != 'function') {
	  $("[data-button-type=delete]").unbind('click');

	  function deleteEntry(button) {
		// ask for confirmation before deleting an item
		// e.preventDefault();
		var button = $(button);
		var corrid =  button.attr('data-corr');
		var route = button.attr('data-route');		
		var row = $("#crudTable a[data-corr='"+corrid+"']").closest('tr');


		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});

		swal({
		  title: "{!! trans('backpack::base.warning') !!}",
		  text: "{!! trans('backpack::crud.delete_confirm') !!}",
		  icon: "warning",
		  buttons: {
		  	cancel: {
			  text: "{!! trans('backpack::crud.cancel') !!}",
			  value: null,
			  visible: true,
			  className: "bg-secondary",
			  closeModal: true,
			},
		  	delete: {
			  text: "{!! trans('backpack::crud.delete') !!}",
			  value: true,
			  visible: true,
			  className: "bg-danger",
			}
		  },
		}).then((value) => {

			if (value) {
				
				  $.ajax({
					url : route, // La ressource ciblée
					type : 'post', // Le type de la requête HTTP.
					data : 'item_id='+ corrid,
								      success: function(result) {
			          if (result != 1) {
			          	// Show an error alert
			              swal({
			              	title: "{!! trans('backpack::crud.delete_confirmation_not_title') !!}",
			              	text: "{!! trans('backpack::crud.delete_confirmation_not_message') !!}",
			              	icon: "error",
			              	timer: 4000,
			              	buttons: false,
			              });
			          } else {
			          	  // Show a success message
			              swal({
			              	title: "{!! trans('backpack::crud.delete_confirmation_title') !!}",
			              	text: "{!! trans('backpack::crud.delete_confirmation_message') !!}",
			              	icon: "success",
			              	timer: 4000,
			              	buttons: false,
			              });

			              // Hide the modal, if any
			              $('.modal').modal('hide');

			              // Remove the details row, if it is open
			              if (row.hasClass("shown")) {
			                  row.next().remove();
			              }

			              // Remove the row from the datatable
			              row.remove();
			          }
			      },
			      error: function(result) {
			          // Show an alert with the result
			          swal({
		              	title: "{!! trans('backpack::crud.delete_confirmation_not_title') !!}",
		              	text: "{!! trans('backpack::crud.delete_confirmation_not_message') !!}",
		              	icon: "error",
		              	timer: 5000,
		              	buttons: false,
		              });
			      } 		
			});
			}
		});
      }
	}

	// make it so that the function above is run after each DataTable draw event
	// crud.addFunctionToDataTablesDrawEventQueue('deleteEntry');
</script>
@if (!$crud->request->ajax()) 
@endpush @endif