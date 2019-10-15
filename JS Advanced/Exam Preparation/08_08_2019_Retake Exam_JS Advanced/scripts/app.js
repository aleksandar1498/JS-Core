function solve() {
   /*
			**** Add Book ***
			check input
				submit
				check if year < 2000 
					decrease the price is the book is old
					create element in proper section
		
			*** Buy Book ***
			increase the store profit
			delete the book from the section
		
			*** Move Book ***
			clone the parent of the clicked button and move it to the old section
				decrease the price
   */
	const formElement = document.getElementsByTagName("form")[0];
	const newSection  = document.querySelector("#outputs section:nth-child(2) div.bookShelf");
	const oldSection  = document.querySelector("#outputs section:nth-child(1) div.bookShelf");
	let totStoreProfit = document.querySelector("body > h1:nth-child(3)");
	let regPrice = new RegExp("[0-9]+(\.[0-9]+)?");
	
	const formInputs = formElement.getElementsByTagName('input');
	formElement.getElementsByTagName("button")[0].addEventListener('click',addToBookStore);
			
	
   
   function addToBookStore(evt){
	   evt.preventDefault();
	   let bookName = formInputs[0].value;
	   let year = Number(formInputs[1].value);
	   let price = (year >  2000 )?Number(formInputs[2].value):Number(formInputs[2].value)*.85;
	   
	   console.log(year,typeof year);
	   if(validateString(bookName) && validateNumeric(year) && validateNumeric(price)){
		   let book = createBook(bookName,year,price);
		   if(year < 2000){
			   oldSection.appendChild(book);
		   }else{
			   newSection.appendChild(book);
		   }
		  
	   }
   }
   function createBook(bookName,year,price){
	   let bookDiv = document.createElement("div");
	   bookDiv.classList.add("book");
	   let p = document.createElement("p");
	   p.innerHTML = `${bookName} [${year}]`
	   let btnB = document.createElement("button");
	   btnB.innerHTML = `Buy it only for ${price.toFixed(2)} BGN`;
	   btnB.addEventListener('click',function(evt){
		  buyBook(evt);
	   });
	   bookDiv.appendChild(p);
	   bookDiv.appendChild(btnB);
	   if(year > 2000){
		  let btnMTO = document.createElement("button");
		  btnMTO.innerHTML = 'Move to old section';
		  btnMTO.addEventListener('click',moveToOld);
		  bookDiv.appendChild(btnMTO);
		  
	   }
	   
	   return bookDiv;
	   
	  
   }
   function moveToOld(evt){
	    let current = evt.target;
		let buyBtn = current.previousSibling;
		let currentPrice = Number(regPrice.exec(buyBtn.innerHTML)[0]);
		currentPrice*=.85;
		buyBtn.innerHTML = buyBtn.innerHTML.replace(/[0-9]+(\.[0-9]+)?/gi,currentPrice.toFixed(2));
		oldSection.appendChild(current.parentNode);
		current.remove();
   }
   function buyBook(evt,price){
	   let current = evt.target;
	   let currentPrice = Number(regPrice.exec(totStoreProfit.innerHTML)[0]);
	   currentPrice+=Number(regPrice.exec(current.innerHTML)[0]);
	   totStoreProfit.innerHTML = totStoreProfit.innerHTML.replace(/[0-9]+(\.[0-9]+)?/gi,currentPrice.toFixed(2));
	   current.parentNode.remove();
	}
   function validateString(string){
	   if(string == undefined || string == ''){
		   return false;
	   }
	   return true;
   }
   function validateNumeric(num){
	   if(num < 0){
		   return false;
	   }
	   return true;
   }
}