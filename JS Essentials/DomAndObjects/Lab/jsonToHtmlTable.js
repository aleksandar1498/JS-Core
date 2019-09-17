 function fromJSONToHTMLTable(input){
			let data = JSON.parse(input);
			let output="<table>";
			
			let first = true;
			for(const info of data){
				let keys = Object.keys(info);
				if(first){
				output+="\n<tr>";
				for(const key of keys){
					output+="<th>"+key+"<\/th>";
				}
				output+="<\/tr>";
				first = false;
				}
				
				output+="\n<tr>";
				for(const key of keys){
					output+="<td>"+escapeHtml(info[key])+"<\/td>";
				}
				output+="<\/tr>";
			}
			output+="\n</table>";
			
			return output;
			function escapeHtml(text) {
				return (text+"").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
			}
        }