
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
	console.log("called");
	const players = await get("appdata","players");
	const template = Handlebars.compile(playersSource.innerHTML);
	let htmlToAdd = template({players});
	document.getElementById("players").innerHTML = htmlToAdd;
	 loadPlayerEvents();
}
function loadPlayerEvents(){
	$(".delete").on('click',deletePlayer);
	$(".play").on('click',playerStart);
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
	playerName.value = '';
	loadPlayers();
}
async function deletePlayer(evt){
	console.log("clicked");
	const current = evt.target;
	const playerId = current.parentElement;
	console.log(playerId.id);
	
	if(playerId.id == false){
		return;
	}
	
	await remove("appdata","players",playerId.id);
	loadPlayers();
}
function playerStart(evt){
	let current = evt.target;
	console.log(current);
	let values = current.parentElement.getElementsByTagName("p");
	let name = values[0].textContent.replace('Name :','').trim();
	let money = Number(values[1].textContent.replace('Money :','').trim());
	let bullets = Number(values[2].textContent.replace('Bullets :','').trim());
	let player = {name,money,bullets};
	loadCanvas(player);
	showBattlefield();
	
}

function showBattlefield(){
	$("#save").css("display","block");
	$("#reload").css("display","block");
	$("#canvas").css("display","block");
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