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
                     @php
                    $widgets['before_content'][] = [
                        'type'        => 'jumbotron',
                        'heading'     => trans('correction.Welcome in the correction module'),
                        'content'     => "Bienvenue dans le module de correction. Vous avez été inscrit(e) en tant que correcteur. Trois types de corrections sont désormains disponibles sur cette plateforme : <br/>1.Evaluer la fluence en lecture de texte,<br/> 2. Evaluer la production orale, <br/>3. Evaluer la lecture orale de mots isolés. <br/>En cliquant sur le lien ci-contre : \"Liste de correction\", vous allez pouvoir accéder aux corrections qui vous auront été attribuées. ",
                        'button_link' => backpack_url('logout'),
                        'button_text' => trans('backpack::base.logout'),
                    ];
                    @endphp
                @else
                    Hello standard user
                @endif

@endsection
