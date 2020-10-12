@extends(backpack_view('blank'))



@section('content')

                @if (auth()->user()->isAdministrator())
                    Hello Admin
                    @php
                    $widgets['before_content'][] = [
                        'type'        => 'jumbotron',
                        'heading'     => trans('correction.Welcome in the correction module'),
                        'content'     => trans('correction.explication'),
                        'button_link' => backpack_url('logout'),
                        'button_text' => trans('backpack::base.logout'),
                    ];
                    @endphp
                @elseif(auth()->user()->isCorrector())
                    Hello Corrector
                @else
                    Hello standard user
                @endif

@endsection
