function scoreToHTML(score){
	let data = JSON.parse(score);
	console.log("<table>");
	console.log(`  <tr><th>name<\/th><th>score<\/th><\/tr>`);
	for(const info of data){
	
		console.log(` <tr><td>${escapeHtml(info.name)}<\/td><td>${escapeHtml(info.score)}<\/td><\/tr>`);
	}
	console.log("</table>");
	function escapeHtml(text) {
		return (text+"").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	}
	
  }