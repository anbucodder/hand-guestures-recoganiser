Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5.Vertion : "+ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0bk0Qn3Qd/model.json ",model_loaded)

function model_loaded(){
    console.log("model loaded!")
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 ="first predection is "+predection_1;
    speak_data2 ="and second predection is "+predection_2;
    var utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utter_this);
}

 function check(){
     img=document.getElementById("captured_image");
     classifier.classify(img,got_results)
 }

 function got_results(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        predection_1=results[0].label;
        predection_2=results[1].label;
        speak();
        if(predection_1=="victory"){
            document.getElementById("result_emogi1").innerHTML="&#9996;";
        }
        if(predection_1=="best"){
            document.getElementById("result_emogi1").innerHTML="&#128077;";
        }
        if(predection_1=="amazing"){
            document.getElementById("result_emogi1").innerHTML="&#128076;";
        }
        if(predection_2=="victory"){
            document.getElementById("result_emogi2").innerHTML="&#9996;";
        }
        if(predection_2=="best"){
            document.getElementById("result_emogi2").innerHTML="&#128077;";
        }
        if(predection_2=="amazing"){
            document.getElementById("result_emogi2").innerHTML="&#128076;";
        }
    }
 }