function makeReservation(cont) {
	let fullName = document.getElementById('fullName');
	let email = document.getElementById('email');
	let phoneNumber = document.getElementById('phoneNumber');
	let address = document.getElementById('address');
	let postalCode = document.getElementById('postalCode');

	let submitBtn = document.getElementById('submit');
	let editButton = document.getElementById('edit');
	let continueButton = document.getElementById('continue');

	let preview = document.getElementById('infoPreview');
	let container = document.querySelector(`${cont}`);
	let wrapper = document.getElementById("wrapper");
	let cachedData = {};


	submitBtn.addEventListener('click', (evt) => {
		let current = evt.target;
		if (fullName.value != '' && email.value != '') {

			let fullnameLi = document.createElement('li');
			fullnameLi.textContent = `Name: ${fullName.value}`;
			let emailLi = document.createElement('li');
			emailLi.textContent = `E-mail: ${email.value}`;
			let phoneNumberLi = document.createElement('li');
			phoneNumberLi.textContent = `Phone: ${phoneNumber.value}`;
			let addressLi = document.createElement('li');
			addressLi.textContent = `Address: ${address.value}`;
			let postalCodeLi = document.createElement('li');
			postalCodeLi.textContent = `Postal Code: ${postalCode.value}`;
			cachedData = {
				'fullName': fullName.value,
				'email': email.value,
				'phoneNumber': phoneNumber.value,
				'address': address.value,
				'postalCode': postalCode.value,
			}
			preview.appendChild(fullnameLi);
			preview.appendChild(emailLi);
			preview.appendChild(phoneNumberLi);
			preview.appendChild(addressLi);
			preview.appendChild(postalCodeLi);

			clearInput();
			configureDisable([editButton, continueButton], [submitBtn]);
		}
	});

	editButton.addEventListener('click', function (evt) {
		configureDisable([submitBtn], [editButton, continueButton]);
		loadFromCache();
		clearContent(preview);
	});
	continueButton.addEventListener('click', function () {
		configureDisable([], [editButton, continueButton, submitBtn]);
		let h2 = document.createElement("h2");
		h2.innerText = 'Payment details';

		let select = document.createElement("select");
		select.setAttribute('id', 'paymentOptions');
		select.setAttribute('class', 'custom-select');

		let optionChoose = document.createElement("option");
		optionChoose.innerHTML = 'Choose';
		optionChoose.setAttribute('selected', 'selected');
		optionChoose.setAttribute('disabled', 'disabled');
		optionChoose.setAttribute('hidden', 'hidden');

		let optionCreditCard = document.createElement("option");
		optionCreditCard.innerHTML = 'Credit Card';
		optionCreditCard.value = 'creditCard';

		let optionBankTransfer = document.createElement("option");
		optionBankTransfer.innerHTML = 'Bank Transfer';
		optionBankTransfer.value = 'bankTransfer';

		select.append(optionChoose);
		select.append(optionCreditCard);
		select.append(optionBankTransfer);

		
		let extraDetails = document.createElement("div");
		extraDetails.setAttribute('id',"extraDetails");
		select.addEventListener('change', (evt) => {
			extraDetails.innerHTML = "";
			console.log('called');
			let current = evt.target;
			switch (current.value) {
				case 'bankTransfer':
					let p = document.createElement('p');
					p.innerHTML = "You have 48 hours to transfer the amount to:</br>IBAN: GR96 0810 0010 0000 0123 4567 890";
					extraDetails.append(p);
					break
				case 'creditCard':
					extraDetails.appendChild(createInputLabel('Card Number'));
					extraDetails.appendChild(document.createElement("br"));
					extraDetails.appendChild(createInputLabel('Expiration Date'));
					extraDetails.appendChild(document.createElement("br"));
					extraDetails.appendChild(createInputLabel('Security Numbers'));
					extraDetails.appendChild(document.createElement("br"));
					break;
			}
			let checkoutBtn = document.createElement("button");
			checkoutBtn.setAttribute('id','checkOut');
			checkoutBtn.innerHTML = "Check Out";
			checkoutBtn.addEventListener('click',function(){
				wrapper.innerHTML = 'Thank you for your reservation!';
			});
			extraDetails.appendChild(checkoutBtn);
		});

		container.appendChild(h2);
		container.appendChild(select);
		container.appendChild(extraDetails);
	});

	function configureDisable(enabled, disabled) {
		for (const btn of enabled) {
			btn.removeAttribute('disabled');
		}
		for (const btn of disabled) {
			btn.setAttribute('disabled', 'disabled');
		}
	}

	function clearInput() {
		fullName.value = '';
		email.value = '';
		phoneNumber.value = '';
		address.value = '';
		postalCode.value = '';
	}
	function clearContent(dest) {
		dest.innerHTML = '';
	}
	function loadFromCache() {
		fullName.value = cachedData.fullName;
		email.value = cachedData.email;
		phoneNumber.value = cachedData.phoneNumber;
		address.value = cachedData.address;
		postalCode.value = cachedData.postalCode; '';
	}
	function createInputLabel(content){
		let div = document.createElement("div");
		div.setAttribute("class","inputLabel");
		div.append(`${content}`);
		div.appendChild(document.createElement("input"));
		return div;
	}
}
