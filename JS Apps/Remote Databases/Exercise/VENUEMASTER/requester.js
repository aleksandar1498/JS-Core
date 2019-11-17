
const username = "guest";
const password = "pass";
const baseUrl = "https://baas.kinvey.com";
const appKey = "kid_BJ_Ke8hZg";
const appSecret ="382fbf39ca89477ab64e06b8d4068736";

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
export function get(kinveyModule,endpoint){
    const header = makeHeaders('GET');
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;
    return fetch(url,header)
    .then(handleErrors)
    .then(serializeData);
}
export function post(kinveyModule,endpoint,data){
    const header = makeHeaders('POST',data);
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}`;
    return fetch(url,header)
    .then(handleErrors)
    .then(serializeData);
}
export function put(kinveyModule,endpoint,id,data){
    const header = makeHeaders('PUT',data);
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}/${id}`;
    return fetch(url,header)
    .then(handleErrors)
    .then(serializeData);
}

export function remove(kinveyModule,endpoint,id){
    const header = makeHeaders('DELETE');
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endpoint}/${id}`;
    return fetch(url,header)
    .then(handleErrors)
    .then(serializeData);
}