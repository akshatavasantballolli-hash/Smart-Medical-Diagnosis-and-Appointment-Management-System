function setReminder(){

let med=
document.getElementById("medicineName").value;

let time=
document.getElementById("reminderTime").value;

if(med===""||time===""){

alert("Enter medicine and time");
return;

}

alert(
"Reminder set for "+med+" at "+time
);

setInterval(function(){

let now=new Date();

let currentTime=
now.toTimeString().slice(0,5);

if(currentTime===time){

alert("Take Medicine: "+med);

}

},60000);

}