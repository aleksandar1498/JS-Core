	window.addEventListener('load' ,function(){
	let offerForm = document.getElementById("create-offers");
	offerForm.style.display = 'none';
	let createOfferBtn = document.getElementById("create-offer-Btn");
	let offerContainer = document.getElementById("offers-container");
	let loginBtn = document.getElementById("loginBtn");
	let loginUsernameField = document.getElementById("username");
	let notifications = document.getElementById("notification");
	loginBtn.addEventListener('click',function(ev){
		ev.preventDefault();
		let current = ev.target;
		if(current.innerHTML == "Login"){
			if(login()){
				current.innerHTML = "Logout";
			}
		}else{
			logout();
			current.innerHTML = "Login";
			
		}
		
	});
	createOfferBtn.addEventListener('click',function(ev){
	
		ev.preventDefault();
		
		let offerName = document.getElementById('offerName').value;
		let company = document.getElementById('company').value;
		let description = document.getElementById('description').value;
		
		if(offerName == false || company == false || description == false){
			return;
		}
		offerContainer.innerHTML+=  `<div class="col-3">
                <div class="card text-white bg-dark mb-3 pb-3" style="max-width: 18rem;">
                    <div class="card-header">${offerName}</div>
                    <div class="card-body">
                        <h5 class="card-title">${company}</h5>
                        <p class="card-text">${description}</p>
                    </div>
                </div>
            </div>`;
		
			document.getElementById('offerName').value = '';
			document.getElementById('company').value = '';
			document.getElementById('description').value = '';
			
		
	});
	function login(){
		if(loginUsernameField.value.length <= 4 || loginUsernameField.value.length >= 10){
			notifications.innerHTML='The username length should be between 4 and 10 characters.'
			return false;
		}
		notifications.innerHTML='';
		loginUsernameField.value = `Hello, ${loginUsernameField.value}!`;
		loginUsernameField.setAttribute('disabled',true);
		loginUsernameField.className+='border-0 bg-light';
		offerForm.style.display = 'block';
		return true;
	}
	function logout(){
		loginUsernameField.value = "";
		loginUsernameField.removeAttribute('disabled');
		loginUsernameField.className=loginUsernameField.className.replace('border-0 bg-light','');
		offerForm.style.display = 'none';
	}

});