

function growingWord() {
  let colorsEnum = {"blue":0,"green":1,"red":2};
  let colors = document.getElementById("colors").getElementsByTagName("div");
  let growingWord = document.getElementById("exercise").getElementsByTagName("p")[0];
  if(!growingWord.style.color){
    growingWord.style.color = colors[colorsEnum["blue"]].innerHTML.toLowerCase();
  }else{
    let currentIndex = colorsEnum[growingWord.style.color];
    currentIndex++;
    if(currentIndex >= colors.length){
      currentIndex = 0;
    }
    growingWord.style.color = colors[currentIndex].innerHTML.toLowerCase();
  }
  
  let fontSize = growingWord.style.fontSize;
  if(fontSize == 0 ){
    growingWord.style.fontSize = 2+"px";
  }else{
    growingWord.style.fontSize = fontSize*2+"px";
  }

  
  
  
}