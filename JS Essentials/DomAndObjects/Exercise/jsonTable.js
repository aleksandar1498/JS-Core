  function jsonTable(score){
	console.log("<table>");
	for(const data of score){
		let info = JSON.parse(data);
		console.log("	<tr>");
		console.log(`		<td>${escapeHtml(info.name)}<\/td>`);
		console.log(`		<td>${escapeHtml(info.position)}<\/td>`);
		console.log(`		<td>${escapeHtml(info.salary)}<\/td>`);
		console.log("	<\/tr>");
	}
	console.log("</table>");
	function escapeHtml(text) {
		return (text+"").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
	}
	
  }