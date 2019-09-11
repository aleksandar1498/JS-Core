function solve() {
	 let userData = JSON.parse(document.getElementById("arr").value);
	 let result = document.getElementById("result");
	 let separatorP = document.createElement("p");
	 separatorP.innerHTML = "- - -";
	 for(let user of userData){
		 let prs = [];
		 let name = extractName(user);
		 let number = extractNumber(user);
		 let email = extractMail(user);
		 if(validUser(user) && name && number && email){
			prs.push(document.createElement("p"));
			prs.push(document.createElement("p"));
			prs.push(document.createElement("p"));
			prs.push(document.createElement("p"));
			prs[0].innerHTML ="Name: "+ name.trim();
			prs[1].innerHTML = "Phone Number: "+ number.trim();
			prs[2].innerHTML = "Email: "+ email.trim();
			prs[3].innerHTML = "- - -";
		 }else{
			prs.push(document.createElement("p"));
			prs.push(document.createElement("p"));
			prs[0].innerHTML = "Invalid data";
			prs[1].innerHTML = "- - -";
		 }
		
		 for(let pa of prs){
			 result.appendChild(pa);
		 }
		 
		 
	 }
	 function validUser(user){
		 let patt = /^[A-Z]{1}[a-z]* [A-Z]{1}[a-z]* \+359(\s{1}|\-)[\d]{1}(\s{1}|\-)[\d]{3}(\s{1}|\-)[\d]{3} [a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g;
		if(user.match(patt)){
			return true;
		}else{
			return false;
		}
	 }
	 function extractName(user){
		let patt = /[A-Z]{1}[a-z]* [A-Z]{1}[a-z]*/; 
		if(patt.test(user)){
			return user.match(patt)[0];
		}
		return false;
	}
	
	function extractMail(user){
		let patt = / [a-z0-9]+@[a-z]+\.[a-z]{2,3}/g; 
		if(patt.test(user)){
			return user.match(patt)[0];
		}
		return false;
	}
	
	function extractNumber(user){
		let patt = /\+359(\s{1}|\-)[\d]{1}(\s{1}|\-)[\d]{3}(\s{1}|\-)[\d]{3}/g; 
		if(patt.test(user)){
			return user.match(patt)[0];
		}
		return false;
	}
}