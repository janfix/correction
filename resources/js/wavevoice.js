/* * 
 * audio visualizer with html5 audio element
 *
 * v0.1.0
 * 
 * licenced under the MIT license
 * 
 * see my related repos:
 * - HTML5_Audio_Visualizer https://github.com/wayou/HTML5_Audio_Visualizer
 * - 3D_Audio_Spectrum_VIsualizer https://github.com/wayou/3D_Audio_Spectrum_VIsualizer
 * - selected https://github.com/wayou/selected
 * - MeowmeowPlayer https://github.com/wayou/MeowmeowPlayer
 * 
 * reference: http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
 */

window.onload = function() {

    $("canvas").on("click", function() {
        audio.pause();
    })

    $("#audio").on("play", function() {
        var context;
        var audio = document.getElementById('audio');
        try {
            if (!context) {
                context = new AudioContext();
                var analyser = context.createAnalyser();
                var src = context.createMediaElementSource(audio);



                // we have to connect the MediaElementSource with the analyser 
                src.connect(analyser);
                analyser.connect(context.destination);
                // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
                // analyser.fftSize = 64;
                // frequencyBinCount tells you how many values you'll receive from the analyser
                var frequencyData = new Uint8Array(analyser.frequencyBinCount);
                var canvas = document.getElementById("canvas");
                canvas.width = window.innerWidth;
                canvas.height = "20";
                var ctx = canvas.getContext("2d");

                analyser.fftSize = 256;

                var bufferLength = analyser.frequencyBinCount;
                /* console.log(bufferLength);
                console.log(audio.currentTime); */

                var dataArray = new Uint8Array(bufferLength);
                var analyserNode;
                var amplitudeArray;

                var WIDTH = canvas.width;
                var HEIGHT = canvas.height;

                var barWidth = (WIDTH / bufferLength) * 0.5;
                var barHeight;
                var x = 0;


                function renderFrame() {
                    var threshold = 1000;
                    var sum = 0;
                    var r;
                    var silenceArr = [];
                    var silencePos = [];

                    requestAnimationFrame(renderFrame);
                    analyserNode = context.createAnalyser();
                    amplitudeArray = new Uint8Array(analyserNode.frequencyBinCount);
                    x = 0;

                    analyser.getByteFrequencyData(dataArray);

                    ctx.fillStyle = "#000";
                    ctx.fillRect(0, 0, WIDTH, HEIGHT);

                    for (var i = 0; i < bufferLength; i++) {
                        barHeight = dataArray[i];
                        r = barHeight + (25 * (i / bufferLength));

                        var g = 250 * (i / bufferLength);
                        var b = 50;

                        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                        x += barWidth + 1;

                        if (parseFloat(r) < 30) {
                            silenceArr.push([r, x]);
                            //silencePos.push(x);
                        }
                        silencePos.push([r, x]);
                    }

                    audio.onplaying = function() {
                        /* console.log("Playing !");
                        console.log(audio.currentTime); */
                    }
                    audio.onpause = function() {
                        /* console.log("Pausing !");
                        console.log(silenceArr);
                        console.log(silencePos); */
                    }



                }

                //audio.play();
                renderFrame();

            }
        } catch (error) {

        }

    })




};