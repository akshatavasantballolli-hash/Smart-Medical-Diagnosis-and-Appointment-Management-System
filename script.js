// DATABASE

const database = [

{
disease:"PCOD",
specialist:"Gynecologist",
symptoms:["pcod","irregular periods"],
medicine:"Metformin",
syrup:"Iron Syrup",
goodFood:"Leafy vegetables",
avoidFood:"Junk food"
},

{
disease:"Fever",
specialist:"General Physician",
symptoms:["fever","cold"],
medicine:"Paracetamol",
syrup:"Crocin Syrup",
goodFood:"Soup",
avoidFood:"Cold drinks"
},

{
disease:"Skin Allergy",
specialist:"Dermatologist",
symptoms:["rash","itching","acne"],
medicine:"Cetirizine",
syrup:"Antihistamine Syrup",
goodFood:"Vegetables",
avoidFood:"Seafood"
}

];

let currentPatientIndex=null;
let lastReport=null;


// REGISTER

function registerPatient(){

let name=document.getElementById("name").value;
let age=document.getElementById("age").value;
let gender=document.getElementById("gender").value;
let spec=document.getElementById("specialist").value;

if(name===""||age===""||gender===""||spec===""){

document.getElementById("message")
.innerText="Fill all fields";
return;

}

let patients=
JSON.parse(localStorage.getItem("patients"))||[];

let found=patients.findIndex(p=>

p.name===name &&
p.age===age &&
p.gender===gender &&
p.spec===spec

);

if(found!=-1){

currentPatientIndex=found;

document.getElementById("message")
.innerText="Existing Patient Found";

}

else{

patients.push({

name,
age,
gender,
spec,
reports:[],
appointments:[]

});

currentPatientIndex=
patients.length-1;

localStorage.setItem(
"patients",
JSON.stringify(patients)
);

document.getElementById("message")
.innerText="New Patient Added";

}

loadPatient();

}


// LOAD

function loadPatient(){

let patients=
JSON.parse(localStorage.getItem("patients"));

let p=patients[currentPatientIndex];

document.getElementById("displayName").innerText=p.name;
document.getElementById("displayAge").innerText=p.age;
document.getElementById("displayGender").innerText=p.gender;
document.getElementById("displaySpec").innerText=p.spec;

document.getElementById("formContainer").style.display="none";
document.getElementById("mainContainer").style.display="block";

loadHistory();
loadAppointments();

}


// CHECK

function checkSymptoms(){

let input=
document.getElementById("symptoms")
.value.toLowerCase();

let patients=
JSON.parse(localStorage.getItem("patients"));

let p=patients[currentPatientIndex];

let matched=null;

database.forEach(d=>{

d.symptoms.forEach(s=>{

if(input.includes(s))
matched=d;

});

});

if(matched){

if(matched.specialist!=p.spec){

document.getElementById("result")
.innerHTML=

"Specialist mismatch.<br>" +
"Suggested Specialist: "+
matched.specialist;

return;

}

document.getElementById("result")
.innerHTML=

"Disease: "+matched.disease+
"<br>Medicine: "+matched.medicine+
"<br>Syrup: "+matched.syrup+
"<br>Good Food: "+matched.goodFood+
"<br>Avoid Food: "+matched.avoidFood;

lastReport=matched;

saveReport(matched);

}

else{

document.getElementById("result")
.innerText="No Match Found";

}

}


// SAVE REPORT

function saveReport(data){

let patients=
JSON.parse(localStorage.getItem("patients"));

patients[currentPatientIndex]
.reports.push(data);

localStorage.setItem(
"patients",
JSON.stringify(patients)
);

loadHistory();

}


// HISTORY

function loadHistory(){

let patients=
JSON.parse(localStorage.getItem("patients"));

let table=
document.getElementById("historyTable");

table.innerHTML=

"<tr><th>Disease</th><th>Medicine</th><th>Syrup</th></tr>";

patients[currentPatientIndex]
.reports.forEach(r=>{

let row=table.insertRow();

row.insertCell(0).innerText=r.disease;
row.insertCell(1).innerText=r.medicine;
row.insertCell(2).innerText=r.syrup;

});

}


// APPOINTMENT

function bookAppointment(){

let date=document.getElementById("date").value;
let time=document.getElementById("time").value;

let patients=
JSON.parse(localStorage.getItem("patients"));

patients[currentPatientIndex]
.appointments.push({date,time});

localStorage.setItem(
"patients",
JSON.stringify(patients)
);

loadAppointments();

}


// LOAD APPOINTMENTS

function loadAppointments(){

let patients=
JSON.parse(localStorage.getItem("patients"));

let table=
document.getElementById("appointmentTable");

table.innerHTML=

"<tr><th>Date</th><th>Time</th></tr>";

patients[currentPatientIndex]
.appointments.forEach(a=>{

let row=table.insertRow();

row.insertCell(0).innerText=a.date;
row.insertCell(1).innerText=a.time;

});

}


// PDF

function downloadPDF(){

if(!lastReport){

alert("Generate report first");
return;

}

const { jsPDF } = window.jspdf;

let doc=new jsPDF();

doc.text("Medical Report",20,20);

doc.text(
"Disease: "+lastReport.disease,
20,
40
);

doc.text(
"Medicine: "+lastReport.medicine,
20,
60
);

doc.text(
"Syrup: "+lastReport.syrup,
20,
80
);

doc.save("Medical_Report.pdf");

}