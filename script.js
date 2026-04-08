// REGISTER PATIENT

function registerPatient(){

let name=document.getElementById("regName").value;
let age=document.getElementById("regAge").value;
let gender=document.getElementById("regGender").value;
let spec=document.getElementById("regSpec").value;

if(name===""||age===""||gender===""||spec===""){

alert("Fill all fields");
return;

}

let patients=
JSON.parse(localStorage.getItem("patients"))||[];

patients.push({

name,
age,
gender,
spec,
reports:[],
appointments:[]

});

localStorage.setItem(
"patients",
JSON.stringify(patients)
);

alert("Registration Successful");

}


// LOGIN PATIENT

function loginPatient(){

let name=document.getElementById("loginName").value;
let age=document.getElementById("loginAge").value;
let gender=document.getElementById("loginGender").value;
let spec=document.getElementById("loginSpec").value;

let patients=
JSON.parse(localStorage.getItem("patients"))||[];

let found=patients.findIndex(p=>

p.name===name &&
p.age===age &&
p.gender===gender &&
p.spec===spec

);

if(found!=-1){

localStorage.setItem(
"currentPatientIndex",
found
);

window.location.href="dashboard.html";

}

else{

document.getElementById("message")
.innerText="Patient Not Found";

}

}