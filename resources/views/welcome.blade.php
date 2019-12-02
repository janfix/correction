<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Fluence</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background-color: whitesmoke;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            h1{
                margin-block-end:0em;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
                text-align: center;
            }

            .title {
                font-size: 84px;
            }

            

            
            #bigtitle{
                color:white;
                font-family:fantasy;
            }
            .subtitle{
                color:cadetblue;
                font-size:2em;
                font-family:fantasy;
            }
            .modulename{
                margin-top:30px;
                font-size: 2em;
            }

            .signature{
                margin-top:20em;;
                color : darkgrey;
                font-size:0.8em;
            }
        </style>

       
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <div class="content">
                <div class="title m-b-md">
                    <h1 id="bigtitle">MAAD</h1>
                </div>
               <div class="subtitle">Modular Assessment ADministration</div>
               <div class="modulename">Correction Module</div>
               <div class="restricted">Restricted access</div>
               <div class="signature">By Wiquid - Jean-Philippe Rivière for DEPP - French Ministery of Education dec.2019</div>
                
            </div>
        </div>
         <script src="js/shine.min.js"></script>
        <script src="js/gate.js"></script>
    </body>
</html>
