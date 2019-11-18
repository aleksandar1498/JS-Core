
// CONFIGURATION CONSTANTS FOR HTTP Requests
const appKey ="kid_Bka-PS6jr";
const appSecret="382fbf39ca89477ab64e06b8d4068736";
const username="guest";
const password="guest";
const baseUrl = "https://baas.kinvey.com";

const DEFAULT_INITIAL_MONEY = 500;
const DEFAULT_BULLET_COUNT = 6;

let playersSource;
function attachEvents() {
	playersSource = document.getElementById("playerModule");
	loadPlayers();
	$("#addPlayer").on('click',persistPlayer);
   // loadCanvas({name:"Alex",money:650,bullets:6})
}
async function loadPlayers(){
	const players = await get("appdata","players");
	const template = Handlebars.compile(playersSource.innerHTML);
	let htmlToAdd = template({players});
	document.getElementById("players").innerHTML = htmlToAdd;
}
async function persistPlayer(evt){
	const current = evt.target;
	const playerName = current.previousElementSibling.value;
	console.log(playerName);
	if(playerName == false){
		return;
	}
	const player = {
		name : playerName,
		money : DEFAULT_INITIAL_MONEY,
		bullets : DEFAULT_BULLET_COUNT
	};
	await post("appdata","players",player);
	loadPlayers();
}

// CONFIGURATION FOR HTTP Requests

function makeHeaders(httpMethod,data){
    let requestHeader = {
        "method": httpMethod,
        "headers":{
            "Authorization" : `Basic ${btoa(`${username}:${password}`)}`,
            "Content-Type" : "application/json"
        }
    }
    if(httpMethod == "POST" || httpMethod == "PUT"){
        requestHeader['body'] = JSON.stringify(data);
    }
    return requestHeader;
}

function serializeData(data){
    return data.json();
}
function handleErrors(e){
    if(!e.ok){
        throw new Error(e.statusText);
    }
    return e;
}
function get(kinveyModule,endpoint){
    const header = makeHeaders('GET');
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;
    return fetch(url,header)
    .then(handleErrors)
    .then(serializeData);
}
function post(kinveyModule,endpoint,data){
    const header = makeHeaders('POST',data);
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;
    return fetch(url,header)
    .then(handleErrors)
    .then(serializeData);
}
function put(kinveyModule,endpoint,id,data){
    const header = makeHeaders('PUT',data);
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}/${id}`;
    return fetch(url,header)
    .then(handleErrors)
    .then(serializeData);
}

function remove(kinveyModule,endpoint,id){
    const header = makeHeaders('DELETE');
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}/${id}`;
    return fetch(url,header)
    .then(handleErrors)
    .then(serializeData);
}