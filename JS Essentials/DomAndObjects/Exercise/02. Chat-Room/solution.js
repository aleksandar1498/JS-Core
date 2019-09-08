	function solve() {
   document.getElementById("send").addEventListener('click' , function (){
	   let divElement = document.createElement("div");
	   divElement.className = 'message my-message';
	   divElement.innerText = document.getElementById("chat_input").value;
	   console.log(divElement);
	   document.getElementById("chat_messages").append(divElement);
	   document.getElementById("chat_input").value = ""
   });
}


