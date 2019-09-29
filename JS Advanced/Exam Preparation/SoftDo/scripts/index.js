// NOTE: The comment sections inside the index.html file is an example of how suppose to be structured the current elements.
//       - You can use them as an example when you create those elements, to check how they will be displayed, just uncomment them.
//       - Also keep in mind that, the actual skeleton in judge does not have this comment sections. So do not be dependent on them!
//       - Тhey are present in the skeleton just to help you!


// This function will be invoked when the html is loaded. Check the console in the browser or index.html file.
function mySolution() {
    let pendingQuestionsSection = document.getElementById("pendingQuestions");
	let openQuestionsSection = document.getElementById("openQuestions");


    document.querySelector("#inputSection > div > button").addEventListener("click", sendQuestionToPending);
   



    function sendQuestionToPending() {
        let question = document.querySelector("#inputSection > textarea").value;
        let username = document.querySelector("#inputSection > div > input").value;
        let pendingQuestionTemplate = document.createElement("div");
        pendingQuestionTemplate.className = "pendingQuestion";

        let imageTemplateElement = document.createElement("img");
        imageTemplateElement.src = "./images/user.png";
        imageTemplateElement.width = 32;
        imageTemplateElement.height = 32;

        let spanUsernameElement = document.createElement("span");
        spanUsernameElement.innerHTML = (username == '') ? "Anonymous" : username;

        let pQuestionElement = document.createElement("p");
        pQuestionElement.innerHTML = question;

        let actionsDiv = document.createElement("div");
        actionsDiv.className = "actions";

        let buttonArchive = document.createElement("button");
        buttonArchive.className = "archive";
        buttonArchive.innerHTML = "Archive";
        buttonArchive.addEventListener("click",removeElement);
		
        let buttonOpen = document.createElement("button");
        buttonOpen.className = "open";
        buttonOpen.innerHTML = "Open";
		buttonOpen.addEventListener("click",sendFromPendingToOpen);
		buttonOpen.addEventListener("click",removeElement);
		
        pendingQuestionTemplate.appendChild(imageTemplateElement);
        pendingQuestionTemplate.appendChild(spanUsernameElement);
        pendingQuestionTemplate.appendChild(pQuestionElement);
        actionsDiv.appendChild(buttonArchive);
        actionsDiv.appendChild(buttonOpen);
        pendingQuestionTemplate.appendChild(actionsDiv);
        pendingQuestionsSection.appendChild(pendingQuestionTemplate);
    }
	function sendFromPendingToOpen(ev){
		let current = ev.target;
		let openQuestionTemplate = document.createElement("div");
        openQuestionTemplate.className = "openQuestion";

        let imageTemplateElement = document.createElement("img");
        imageTemplateElement.src = "./images/user.png";
        imageTemplateElement.width = 32;
        imageTemplateElement.height = 32;

        let spanUsernameElement = document.createElement("span");
        spanUsernameElement.innerHTML = current.parentElement.previousSibling.previousSibling.innerHTML;
		
		let openQuestionElement = document.createElement("p");
        openQuestionElement.innerHTML = current.parentElement.previousSibling.innerHTML;

        let actionsDiv = document.createElement("div");
        actionsDiv.className = "actions";

        let buttonReply = document.createElement("button");
        buttonReply.className = "reply";
        buttonReply.innerHTML = "Reply";
		
		//TODO add functionality to reply
		actionsDiv.appendChild(buttonReply);
		
		let replySection = document.createElement("div");
		replySection.className = 'replySection';
		replySection.style.display = 'none';
		
		
		let inputReply = document.createElement("input");
		inputReply.className = 'replyInput';
		inputReply.type = 'text';
		inputReply.placeholder = 'Reply to this question here...';
		
		let buttonSend = document.createElement("button");
        buttonSend.className = "replyButton";
        buttonSend.innerHTML = "Send";
		//TODO add functionality to Send
		let ol = document.createElement("ol");
		ol.className = 'reply';
		ol.type='1';
		
		replySection.appendChild(inputReply);
		replySection.appendChild(buttonSend);
		replySection.appendChild(ol);
		buttonSend.addEventListener('click',answer);
		
		
		
		
		openQuestionTemplate.appendChild(imageTemplateElement);
		openQuestionTemplate.appendChild(spanUsernameElement);
		openQuestionTemplate.appendChild(openQuestionElement);
		openQuestionTemplate.appendChild(actionsDiv);
		openQuestionTemplate.appendChild(replySection);
		
		openQuestionsSection.appendChild(openQuestionTemplate);
		buttonReply.addEventListener("click",toggleReplySection);
       // buttonArchive.addEventListener("click",removeElement);
		
	}
	function toggleReplySection(ev){
		let current = ev.target;
		if(current.innerHTML == 'Reply'){
			
			current.parentElement.nextSibling.style.display = 'block';
			current.innerHTML = 'Back'
		}else{
			current.parentElement.nextSibling.style.display = 'none';
			current.innerHTML = 'Reply'
		}
		 
	}
	function answer(ev){
		let current = ev.target;
		let answer = current.previousSibling;
		let answerLi = document.createElement('li');
		answerLi.innerHTML = answer.value;
		
		current.nextSibling.appendChild(answerLi);
		answer.value = '';
	}
    function removeElement(ev) {
        let current = ev.target;
		console.log(current.parentElement.parentElement.remove());
    }
}
