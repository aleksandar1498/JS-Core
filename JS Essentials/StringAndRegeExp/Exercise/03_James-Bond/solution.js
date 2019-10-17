function solve() {
   let array = JSON.parse(document.getElementById('array').value);

   let specialKeyRegex = new RegExp('(^|\s)[A-Za-z]+');
   let specialKey = specialKeyRegex.exec(array[0]);

   let regex = `(?:\\s|^)(?:${specialKey}\\s+)([A-Z!#$%]{8,})(?:\\.|\\,\\s|$)`;
   // (?:\\s|^)(?:${key}\\s+)([A-Z!#$%]{8,})(?:\\.|\\s|$)
	
   let encodedMessageRegex = new RegExp(regex,'gi');
   console.log(encodedMessageRegex.exec(array[1]));
}
