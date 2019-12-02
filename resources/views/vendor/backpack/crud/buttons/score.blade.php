@if ($entry->itemtype == "Text_reading")
<!-- Single edit button -->
	<a href="{{ url('admin/scoring/?perfid='.$entry->getKey()).'&itype='.$entry->itemtype.'&CorrectMode='.$entry->corrtype }}" class="btn btn-sm btn-link"><i class="fa fa-tachometer"></i>{{trans('correction.Score')}}</a>

@elseif ($entry->itemtype == "Word_reading")
	<a href="{{ url('admin/scoringidm/?perfid='.$entry->getKey()).'&mfolder='.$entry->mediapath}}" class="btn btn-sm btn-link"><i class="fa fa-tachometer"></i>{{trans('correction.Score')}}</a>
@endif