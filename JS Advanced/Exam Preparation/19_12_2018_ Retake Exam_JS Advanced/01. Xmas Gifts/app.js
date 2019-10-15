function solution() {
	let toyType = document.getElementById("toyType");
	let toyPrice = document.getElementById("toyPrice");
	let toyDescription = document.getElementById("toyDescription");
	let christmasShop = document.getElementById("christmasGiftShop");
	document.querySelector("#fields > button").addEventListener('click',function(){
		addGift(toyType,toyPrice,toyDescription);
	});

	function addGift(toyType,toyPrice,toyDescription){
		
		if(!toyType.value || toyType.value == ''){
			return;
		}
		if(!Number(toyPrice.value)){
			return;
		}
		if(!toyDescription.value || toyDescription.value.replace(/\s+/g,'') == '' || toyDescription.value.length <= 50){
			return;
		}
		let mainDiv = document.createElement("div");
		mainDiv.classList.add("gift");
		
		let img = document.createElement("img");
		img.setAttribute("src","gift.png");
		
		let h2 = document.createElement("h2");
		h2.innerHTML = toyType.value;
		
		let p = document.createElement("p");
		p.innerHTML = toyDescription.value;
		
		let buttons = document.createElement("button");
		buttons.innerHTML = `Buy it for $${toyPrice.value}`;
		buttons.addEventListener('click',removeGift);
		mainDiv.appendChild(img);
		mainDiv.appendChild(h2);
		mainDiv.appendChild(p);
		mainDiv.appendChild(buttons);
		toyType.value = '';
		toyDescription.value = '';
		toyPrice.value = '';
		christmasShop.appendChild(mainDiv);
	}
	function removeGift(evt){
		let current = evt.target;
		current.parentNode.remove();
	}
	
}