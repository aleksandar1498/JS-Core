function createArticle() {

	let articleList = document.getElementById("articles");
	let title = document.getElementById("createTitle");
	let content = document.getElementById("createContent");
	if(!title.value || !content.value){
		title.value="";
		content.value="";
		return;
	}
	let articleElement = document.createElement("article");
	let titleElement = document.createElement("h3");
	titleElement.innerHTML = title.value;
	articleElement.appendChild(titleElement);
	let contentElement = document.createElement("p");
	contentElement.innerHTML = content.value;
	articleElement.appendChild(contentElement);
	articleList.appendChild(articleElement);
	title.value="";
	content.value="";
		
	
}