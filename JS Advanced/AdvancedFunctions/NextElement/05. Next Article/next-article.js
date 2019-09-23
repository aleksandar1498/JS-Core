function getArticleGenerator(input){   
	let content = document.getElementById("content");
	let i = 0;
	return function(){
		if(i < input.length){
			content.innerHTML+= "<article>"+input[i]+"</article>";
			i++;
		}
	}
}