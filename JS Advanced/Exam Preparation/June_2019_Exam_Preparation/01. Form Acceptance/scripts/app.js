function acceptance() {
	let shippingCompany = document.getElementsByName('shippingCompany')[0];
	let productName = document.getElementsByName('productName')[0];
	let productQuantity = document.getElementsByName('productQuantity')[0];
	let productScrape = document.getElementsByName('productScrape')[0];
	
	let warehouse = document.getElementById('warehouse');
	
	document.getElementById('acceptance').addEventListener('click',function(){
		console.log('clicked');
		addProduct(shippingCompany.value,productName.value,Number(productQuantity.value),Number(productScrape.value));
	});
	
	function validInput(shippingCompany,productName,productQuantity,productScrape){
		return isValidString(shippingCompany) 
			&& isValidString(productName) 
			&& isValidNumber(productQuantity) 
			&& isValidNumber(productScrape);
	}
	function addProduct(shippingCompany,productName,productQuantity,productScrape){
		console.log(isValidNumber(productQuantity),productQuantity);
		if(!validInput(shippingCompany,productName,productQuantity,productScrape)){
			return;
		}
		if(productScrape >= productQuantity){
			return;
		}
		let product = createElement(shippingCompany,productName,productQuantity-productScrape);
		clearData();
		warehouse.appendChild(product);
	}
	function isValidString(input){
		return typeof input == 'string' && input != '';
	}
	function isValidNumber(input){
		return typeof input == 'number' && !isNaN(input);
	}
	function removeFromList(evt){
		let current = evt.target;
		current.parentElement.remove();
	}
	function clearData(){
		shippingCompany.value = '';
		productName.value = '';
		productQuantity.value = '';
		productScrape.value = '';
	}
	function createElement(shippingCompany,productName,productQuantity){
		let divElement = document.createElement('div');
		
		let pElement = document.createElement('p');
		pElement.innerHTML = `[${shippingCompany}] ${productName} - ${productQuantity} pieces`;
		
		let btn = document.createElement('button');
		btn.innerHTML = 'Out of stock';
		btn.setAttribute('type','button');
		btn.addEventListener('click',removeFromList);
		
		divElement.appendChild(pElement);
		divElement.appendChild(btn);
		
		return divElement;
	}
	
}