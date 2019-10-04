function solve() {
	document.getElementById("send").addEventListener('click' , function (){
		let divElement = document.createElement("div");
		divElement.className = 'message my-message';
		divElement.innerHTML = document.getElementById("chat_input").value;
		document.getElementById("chat_messages").appendChild(divElement);
		document.getElementById("chat_input").value = ""
	});
 }
 
 
 