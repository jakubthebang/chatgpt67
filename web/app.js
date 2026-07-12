async function update(){


const res =
await fetch(
"/api/status"
);


const data =
await res.json();



document.getElementById(
"status"
).innerHTML = `

HP: ${data.health}

<br>

Food: ${data.food}

<br>

Position:
${data.position.x}
${data.position.y}
${data.position.z}

`;



}



async function sendCommand(){


const command =
document.getElementById(
"command"
).value;



await fetch(
"/api/command",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},


body:
JSON.stringify({
command
})


}
);



}



setInterval(
update,
2000
);


update();
