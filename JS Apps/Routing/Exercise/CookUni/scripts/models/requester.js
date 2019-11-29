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
		if(method == "POST" || method == "PUT" || method == "PATCH"){
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
        return fetch(url,header);
    }

    // Function to return PUT promise
    function update (module, endpoint, auth, data) {
        const url = kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint;
		let header = makeHeader('PUT', module, endpoint, auth,data);
        return fetch(url,header);
    }
	// Function to return PUT promise
    function partialUpdate (module, endpoint, auth, data) {
        const url = kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint;
		let header = makeHeader('PATCH', module, endpoint, auth,data);
        return fetch(url,header);
    }
	
    // Function to return DELETE promise
    function remove (module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }

    return {
        get,
        post,
        update,
		partialUpdate,
        remove
    }
})();

/*
<div class="row form-layout p-5">
		<div class="col-md-12">
			<div class="recepieInfo">
				<div class="detailsFoodImage">
					<img src="{{foodImageURL}}"
						alt="">
				</div>

				<div class="infoPack">
					<h3 class="my-3">Meal Name</h3>
					<p class="prep-method">{{prepMethod}}</p>
					<p class="description">{{description}}</p>
				</div>
				<div class="actions">
				{{#if isAuthor}}
					<a class="btn btn-danger" href="#delete/{{id}}">Archive</a>
					<a class="btn btn-info" href="#/edit/{{id}}">Edit</a>
				{{else}}
					<a class="btn btn-success" href="#/like/{{id}}"> {{likesCounter}} likes</a>
				{{/if}}
				   
				   
				</div>
			</div>

			<div class="detailsIngredients">
				<h3 class="my-3 ingredient">Ingredients</h3>
				<ul>
					{{#each ingredients}}
						<li>{{this}}</li>
					{{/each}}
				</ul>
			</div>
		</div>
	</div>
	*/