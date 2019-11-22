let requester = (() => {
    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_Bka-PS6jr";
    const kinveyAppSecret = "382fbf39ca89477ab64e06b8d4068736";
    function makeAuth(type) {
        return type === 'basic'
            ?  `Basic ${btoa(`${kinveyAppKey}:${kinveyAppSecret}`)}`
            :  'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    // Creates request object to kinvey
    function makeRequest(method, module, endpoint, auth) {
        return req = {
            method,
            url: kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint,
            headers: {
                'Authorization': makeAuth(auth)
            },
        };
    }
// Creates request object to kinvey
    function makeHeader(method, module, endpoint, auth,data) {
        let req = {
            method,
            headers: {
               "Authorization" : makeAuth(auth),
            "Content-Type" : "application/json"
		   },
        };
		if(method == "POST" || method == "PUT"){
			req['body'] = JSON.stringify(data);
		}
		return req;
    }
    // Function to return GET promise
    function get (module, endpoint, auth) {
        return $.ajax(makeRequest('GET', module, endpoint, auth));
    }

    // Function to return POST promise
    function post (module, endpoint, auth, data) {
        const url = kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint;
		let header = makeHeader('POST', module, endpoint, auth,data);
		console.log(url,header);
        return fetch(url,header);
    }

    // Function to return PUT promise
    function update (module, endpoint, auth, data) {
        let req = makeRequest('PUT', module, endpoint, auth);
       
        return $.ajax(req);
    }

    // Function to return DELETE promise
    function remove (module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }

    return {
        get,
        post,
        update,
        remove
    }
})()