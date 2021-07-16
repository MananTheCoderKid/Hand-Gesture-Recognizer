Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90,
    dest_width: 350,
    dest_height: 300
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src= ' " + data_uri + " ' >";
    });
}

console.log("ml5 version  |  ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/LDrcpsrc2/model.json", modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name_1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (results[0].label == "Thumbs Up") {
            document.getElementById("update_emoji_1").innerHTML = "&#128077;";
        }
        if (results[0].label == "Thumbs Down") {
            document.getElementById("update_emoji_1").innerHTML = "&#128078;";
        }
        if (results[0].label == "Five") {
            document.getElementById("update_emoji_1").innerHTML = "&#9995;";
        }
        if (results[0].label == "Peace") {
            document.getElementById("update_emoji_1").innerHTML = "&#9996;";
        }




        if (results[1].label == "Thumbs Up") {
            document.getElementById("update_emoji_2").innerHTML = "&#128077;";
        }
        if (results[1].label == "Thumbs Down") {
            document.getElementById("update_emoji_2").innerHTML = "&#128078;";
        }
        if (results[1].label == "Five") {
            document.getElementById("update_emoji_2").innerHTML = "&#9995;";
        }
        if (results[1].label == "Peace") {
            document.getElementById("update_emoji_2").innerHTML = "&#9996;";
        }

    }

    function speak() {
        synth = window.speechSynthesis;
        speakData1 = "The first prediction is " + prediction_1;
        speakData2 = "The second prediction is " + prediction_2;
        utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
        synth.speak(utterThis);
    }