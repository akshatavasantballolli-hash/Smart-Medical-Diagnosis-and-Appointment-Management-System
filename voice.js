function startVoice(){

if (!('webkitSpeechRecognition' in window)) {

alert("Voice not supported");
return;

}

let recognition =
new webkitSpeechRecognition();

recognition.lang="en-US";

recognition.start();

recognition.onresult=function(event){

let speechText=
event.results[0][0].transcript;

document.getElementById("symptoms")
.value=speechText;

};

}