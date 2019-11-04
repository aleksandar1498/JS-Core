
function loadRepos() {
	let username = document.getElementById("username").value;
	let ul = document.getElementById("repos");
	let url = `https://api.github.com/users/${username}/repos`;
	//let req = new XMLHttpRequest();
	ul.innerHTML = '';
	/*req.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this);
			ul.innerHTML = '';
			let response = JSON.parse(this.responseText);
			for (const data of response) {
				createRepo(data.full_name, data.html_url);
			}
			username.value = '';
		}else if(this.readyState == 4 && this.status > 400){
			console.log(this);
			let li = document.createElement('li');
			li.textContent = JSON.parse(this.responseText).message;
			ul.appendChild(li);
			
		}


	}

	req.open("GET", url, true);
	req.send();*/
	// testnakov
	fetch(url)
	.then((response) => {
		console.log(response);
		if(response.status > 400){
			throw new Error(response.statusText);
		}
		return response.json();
	}
	)
	.then((data) => {
		displayRows(data);
	})
	.catch((error) => displayError(error));

	function displayRows(response){
		console.log(response);
		for (const data of response) {
		
			const repo = createRepo(data.full_name, data.html_url);
			ul.appendChild(repo);
		}
	}
	function displayError(error){
		let li = document.createElement('li');
		
		li.textContent = error;
		ul.appendChild(li);
	}
	function createRepo(full_name, html_url) {
		let li = document.createElement('li');

		let a = document.createElement('a');
		a.setAttribute('href', html_url);
		a.innerHTML = full_name;

		li.appendChild(a);

		return li;
	}
}