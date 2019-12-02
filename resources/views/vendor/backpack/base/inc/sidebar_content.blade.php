<!-- This file is used to store sidebar items, starting with Backpack\Base 0.9.0 -->
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('dashboard') }}"><i class="fa fa-dashboard nav-icon"></i> {{ trans('backpack::base.dashboard') }}</a></li>

@if (auth()->user()->isAdministrator())
<li class=nav-item><a class=nav-link href="{{ backpack_url('elfinder') }}"><i class="nav-icon fa fa-files-o"></i> <span>{{ trans('backpack::crud.file_manager') }}</span></a></li>
<!-- Users, Roles, Permissions -->
<li class="nav-item nav-dropdown">
	<a class="nav-link nav-dropdown-toggle" href="#"><i class="nav-icon fa fa-group"></i> {{trans('correction.Authentication')}}</a>
	<ul class="nav-dropdown-items">
	  <li class="nav-item"><a class="nav-link" href="{{ backpack_url('user') }}"><i class="nav-icon fa fa-user"></i> <span>{{trans_choice('correction.User',2)}}</span></a></li>
	  <li class="nav-item"><a class="nav-link" href="{{ backpack_url('role') }}"><i class="nav-icon fa fa-group"></i> <span>{{trans_choice('correction.Role',2)}}</span></a></li>
	  <li class="nav-item"><a class="nav-link" href="{{ backpack_url('permission') }}"><i class="nav-icon fa fa-key"></i> <span>{{trans_choice('correction.Permission',2)}}</span></a></li>
    </ul>
</li>
<li class="nav-item nav-dropdown">
    <a class="nav-link nav-dropdown-toggle" href="#"><i class="nav-icon fa fa-balance-scale"></i> {{trans('correction.Corrections')}}</a>
	<ul class="nav-dropdown-items">
      <li class="nav-item"><a class="nav-link" href="{{ backpack_url('createCorrection') }}"><i class="nav-icon fa fa-plus-square"></i> <span>{{trans('correction.Create a correction')}}</span></a></li>
      <li class="nav-item"><a class="nav-link" href="{{ backpack_url('correctionList') }}"><i class="nav-icon fa fa-th-list"></i> <span>{{trans('correction.Correction list')}}</span></a></li>
    </ul>
</li>
<!-- <li class='nav-item'><a class='nav-link' href="{{ backpack_url('iteminfo') }}"><i class='nav-icon fa fa-question'></i> Iteminfos</a></li>
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('scoringidm') }}"><i class="nav-icon fa fa-arrow-right"></i> <span>Scoring IDM</span></a></li>-->


<li class='nav-item'><a class='nav-link' href="{{ backpack_url('settings') }}"><i class='nav-icon fa fa-cog'></i>{{trans('correction.Settings')}}</a></li> 

@else
<li class="nav-item"><a class="nav-link" href="{{ backpack_url('correctionList') }}"><i class="nav-icon fa fa-th-list"></i> <span>{{trans('correction.Correction list')}}</span></a></li>
@endif