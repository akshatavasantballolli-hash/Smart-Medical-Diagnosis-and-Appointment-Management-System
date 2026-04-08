const database=[

{
disease:"PCOD",
specialist:"Gynecologist",
symptoms:["pcod"],
medicine:"Metformin",
syrup:"Iron Syrup"
},

{
disease:"Fever",
specialist:"General Physician",
symptoms:["fever"],
medicine:"Paracetamol",
syrup:"Crocin Syrup"
}

];

let index=
localStorage.getItem("currentPatientIndex");

let patients=
JSON.parse(localStorage.getItem("patients"));

let p=patients[index];

document.getElementById("displayName").innerText=p.name;
document.getElementById("displayAge").innerText=p.age;
document.getElementById("displayGender").innerText=p.gender;
document.getElementById("displaySpec").innerText=p.spec;

loadHistory();

function checkSymptoms(){

let input=
document.getElementById("symptoms")
.value.toLowerCase();

let matched=null;

database.forEach(d=>{

d.symptoms.forEach(s=>{

if(input.includes(s))
matched=d;

});

});

if(matched){

document.getElementById("result")
.innerHTML=

"Disease:"+matched.disease+
"<br>Medicine:"+matched.medicine+
"<br>Syrup:"+matched.syrup;

p.reports.push(matched);

localStorage.setItem(
"patients",
JSON.stringify(patients)
);

loadHistory();

}

}


function loadHistory(){

let table=
document.getElementById("historyTable");

table.innerHTML=

"<tr><th>Disease</th><th>Medicine</th><th>Syrup</th></tr>";

p.reports.forEach(r=>{

let row=table.insertRow();

row.insertCell(0).innerText=r.disease;
row.insertCell(1).innerText=r.medicine;
row.insertCell(2).innerText=r.syrup;

});

}


function logout(){

window.location.href="index.html";

}