function makeReservation(div){
	let fullName = document.getElementById('fullName');
	let email = document.getElementById('email');
	let phoneNumber = document.getElementById('phoneNumber');
	let address = document.getElementById('address');
	let postalCode = document.getElementById('postalCode');
	let submitBtn = document.getElementById('submit');
	let preview = document.getElementById('infoPreview');
	
	
	let editButton = document.getElementById('edit');
	let continueButton = document.getElementById('continue');
	submitBtn.addEventListener('click',(evt) => {
		let current = evt.target;
		if(fullName.value != ''  && email.value != ''){
			
			let fullnameLi = document.createElement('li');
			fullnameLi.textContent = `Name: ${fullName.value}`;
			let	emailLi = document.createElement('li');
			emailLi.textContent = `E-mail: ${email.value}`;
			let phoneNumberLi = document.createElement('li');
			phoneNumberLi.textContent = `Phone: ${phoneNumber.value}`;
			let addressLi = document.createElement('li');
			addressLi.textContent = `Address: ${address.value}`;
			let postalCodeLi = document.createElement('li');
			postalCodeLi.textContent = `Postal Code: ${postalCode.value}`;
			
			preview.appendChild(fullnameLi);
			preview.appendChild(emailLi);
			preview.appendChild(phoneNumberLi);
			preview.appendChild(addressLi);
			preview.appendChild(postalCodeLi);
			
			clearInput();
			current.addAttribute('disabled');
			editButton.removeAttribute('disabled');
			continueButton.removeAttribute('disabled');
		}
	});
	function clearInput(){
		fullName.value = '';
		email.value = '';
		phoneNumber.value = '';
		address.value = '';
		postalCode.value = '';
	}
}
