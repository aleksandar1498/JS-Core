// NOTE: The comment sections inside the index.html file is an example of how suppose to be structured the current elements.
//       - You can use them as an example when you create those elements, to check how they will be displayed, just uncomment them.
//       - Also keep in mind that, the actual skeleton in judge does not have this comment sections. So do not be dependent on them!
//       - Тhey are present in the skeleton just to help you!


// This function will be invoked when the html is loaded. Check the console in the browser or index.html file.
function mySolution() {
    let pendingQuestionsSection = document.getElementById("pendingQuestions");



    document.querySelector("#inputSection > div > button").addEventListener("click", sendQuestionToPending);
   



    function sendQuestionToPending() {
        let question = document.querySelector("#inputSection > textarea").value;
        let username = document.querySelector("#inputSection > div > input").value;
        let pendingQuestionTemplate = document.createElement("div");
        pendingQuestionTemplate.className = "pendingQuestion";

        let imageTemplateElement = document.createElement("img");
        imageTemplateElement.src = "./images/user.png";
        imageTemplateElement.width = 32;
        imageTemplateElement.heigth = 32;

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

        pendingQuestionTemplate.appendChild(imageTemplateElement);
        pendingQuestionTemplate.appendChild(spanUsernameElement);
        pendingQuestionTemplate.appendChild(pQuestionElement);
        actionsDiv.appendChild(buttonArchive);
        actionsDiv.appendChild(buttonOpen);
        pendingQuestionTemplate.appendChild(actionsDiv);
        pendingQuestionsSection.appendChild(pendingQuestionTemplate);
    }
    function removeElement(ev) {
        let current = ev.target;
      console.log(current.parentElement.parentElement.remove());
    }
}
