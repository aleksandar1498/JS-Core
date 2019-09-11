function solve() {
  let textValue  = document.getElementById("text").value;
  let namingValue  = document.getElementById("naming-convention").value;
  textValue = textValue.split(/\s+/g);
  textValue = textValue.map(word => {
	  return word[0].toUpperCase()+word.substr(1).toLowerCase();
  });
  if(namingValue == "Camel Case"){
	  textValue[0] = textValue[0].charAt(0).toLowerCase() + textValue[0].substr(1);
	  document.getElementById("result").innerHTML = textValue.join("");
  }else if(namingValue == "Pascal Case"){
	  document.getElementById("result").innerHTML = textValue.join("");
  }else{
	  document.getElementById("result").innerHTML = "Error!";
  }
  
}