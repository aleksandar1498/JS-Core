function solve() {
  let answerButtons = document.getElementsByClassName("answer-text");
  let sections = document.getElementById("quizzie").getElementsByTagName("section");
  let correctAnswers = 0;
  let answers = [2,4,2];
  
  let result = document.getElementById("results");
  let visibleSection = 0;
  for(let i = 0; i < answerButtons.length; i++){
  
      answerButtons[i].addEventListener('click',function(){
      let answer = this.parentElement.parentElement.dataset.quizindex;
      if(answer == answers[visibleSection]){
        correctAnswers++;
      }
      sections[visibleSection].style.display = 'none';
      visibleSection++;
      if(visibleSection >= sections.length){
         result.style.display='block';
         let finalMessage = "";
         if(correctAnswers == 3){
            finalMessage = "You are recognized as top JavaScript fan!"
         }else{
            finalMessage = `You have ${correctAnswers} right answers.`
         }
         result.getElementsByClassName("results-inner")[0].getElementsByTagName("h1")[0].innerHTML=finalMessage;
          return;
      }else{
       
        sections[visibleSection].style.display= 'block';
        
      }
      
    });
    

  }

  
}
