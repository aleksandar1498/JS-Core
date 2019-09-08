function solve() {
   let sectionElement = document.getElementsByClassName("cards")[0];
   let historyElement = document.getElementById("history");
   let firstCard = null;
   let secondCard = null ;
   let cardsFirstUser = document.getElementById("player1Div").getElementsByTagName("img");
   
   for(const card of cardsFirstUser){
	   card.addEventListener('click',function(){
			if(firstCard){
				return;
			}
			firstCard = this;
		    let result = document.getElementById("result");
			let resultSpan1 = result.getElementsByTagName("span")[0];
			resultSpan1.textContent = firstCard.name;
			let resultSpan2 = result.getElementsByTagName("span")[2];
			if(resultSpan2.innerHTML != ''){
				if(Number(resultSpan1.innerHTML) > Number(resultSpan2.innerHTML)){
					firstCard.style.border = "2px solid green";
					secondCard.style.border = "2px solid red";
				}else{
					secondCard.style.border = "2px solid green";
					firstCard.style.border = "2px solid red";
				}
				firstCard.style.pointerEvents = 'none';
				secondCard.style.pointerEvents = 'none';
				historyElement.innerHTML+=`[${resultSpan1.innerHTML} vs ${resultSpan2.innerHTML}] `;
				resultSpan1.innerHTML = '';
				resultSpan2.innerHTML = '';
				firstCard = null;
				secondCard = null ;
			}
			
		//	resultSpan1.click();
			this.src = "images/whiteCard.jpg";
			
	   });
   }
   
   let cardsSecondUser = document.getElementById("player2Div").getElementsByTagName("img");

   for(const card of cardsSecondUser){
	   card.addEventListener('click',function(){
			if(secondCard){
				return;
			}
			secondCard = this;
			let result = document.getElementById("result");
			let resultSpan1 = result.getElementsByTagName("span")[0];
			let resultSpan2 = result.getElementsByTagName("span")[2];
			resultSpan2.textContent = secondCard.name;
			if(resultSpan1.innerHTML != ''){
				if(Number(resultSpan1.innerHTML) > Number(resultSpan2.innerHTML)){
					firstCard.style.border = "2px solid green";
					secondCard.style.border = "2px solid red";
					
				}else{
					secondCard.style.border = "2px solid green";
					firstCard.style.border = "2px solid red";
				}
				firstCard.style.pointerEvents = 'none';
				secondCard.style.pointerEvents = 'none';
				historyElement.innerHTML+=`[${resultSpan1.innerHTML} vs ${resultSpan2.innerHTML}]`;
				resultSpan1.innerHTML = '';
				resultSpan2.innerHTML = '';
				firstCard = null;
				secondCard = null ;
			}
			this.src = "images/whiteCard.jpg";
			
	   });
   }

   
}