// ADMIN LOGIN

function adminLogin(){

let user=
document.getElementById("adminUser").value;

let pass=
document.getElementById("adminPass").value;

if(user==="admin" && pass==="admin123"){

document.getElementById("loginSection")
.style.display="none";

document.getElementById("dashboard")
.style.display="block";

loadPatients();
loadReports();
loadAppointments();

// Small delay ensures chart loads
setTimeout(loadChart,500);

}

else{

document.getElementById("loginMessage")
.innerText="Invalid Credentials";

}

}


// LOGOUT

function logout(){

location.reload();

}


// LOAD PATIENTS

function loadPatients(){

let patients=
JSON.parse(localStorage.getItem("patients"))||[];

let table=
document.getElementById("patientsTable");

table.innerHTML=
"<tr><th>Name</th><th>Age</th><th>Gender</th><th>Specialist</th></tr>";

patients.forEach(p=>{

let row=table.insertRow();

row.insertCell(0).innerText=p.name;
row.insertCell(1).innerText=p.age;
row.insertCell(2).innerText=p.gender;
row.insertCell(3).innerText=p.spec;

});

}


// LOAD REPORTS

function loadReports(){

let patients=
JSON.parse(localStorage.getItem("patients"))||[];

let table=
document.getElementById("reportsTable");

table.innerHTML=
"<tr><th>Patient</th><th>Disease</th><th>Medicine</th><th>Syrup</th></tr>";

patients.forEach(p=>{

if(p.reports){

p.reports.forEach(r=>{

let row=table.insertRow();

row.insertCell(0).innerText=p.name;
row.insertCell(1).innerText=r.disease;
row.insertCell(2).innerText=r.medicine;
row.insertCell(3).innerText=r.syrup;

});

}

});

}


// LOAD APPOINTMENTS

function loadAppointments(){

let patients=
JSON.parse(localStorage.getItem("patients"))||[];

let table=
document.getElementById("appointmentsTable");

table.innerHTML=
"<tr><th>Patient</th><th>Date</th><th>Time</th></tr>";

patients.forEach(p=>{

if(p.appointments){

p.appointments.forEach(a=>{

let row=table.insertRow();

row.insertCell(0).innerText=p.name;
row.insertCell(1).innerText=a.date;
row.insertCell(2).innerText=a.time;

});

}

});

}


// LOAD CHART

function loadChart(){

let patients=
JSON.parse(localStorage.getItem("patients"))||[];

let totalPatients=patients.length;

let totalReports=0;
let totalAppointments=0;

patients.forEach(p=>{

if(p.reports)
totalReports+=p.reports.length;

if(p.appointments)
totalAppointments+=p.appointments.length;

});

let ctx=
document.getElementById("myChart").getContext("2d");

// Create Chart

new Chart(ctx,{

type:"bar",

data:{

labels:[
"Patients",
"Reports",
"Appointments"
],

datasets:[{

label:"Hospital Analytics",

data:[
totalPatients,
totalReports,
totalAppointments
],

backgroundColor:[
"blue",
"green",
"orange"
]

}]

},

options:{
responsive:true
}

});

}
function loadChart(){

let patients =
JSON.parse(localStorage.getItem("patients")) || [];

let totalPatients = patients.length;

let totalReports = 0;
let totalAppointments = 0;

patients.forEach(p=>{

if(p.reports)
totalReports += p.reports.length;

if(p.appointments)
totalAppointments += p.appointments.length;

});

let ctx =
document.getElementById("myChart").getContext("2d");

new Chart(ctx,{

type:"bar",

data:{

labels:[
"Patients",
"Reports",
"Appointments"
],

datasets:[{

label:"Hospital Analytics",

data:[
totalPatients,
totalReports,
totalAppointments
],

backgroundColor:[
"blue",
"green",
"orange"
]

}]

}

});

}