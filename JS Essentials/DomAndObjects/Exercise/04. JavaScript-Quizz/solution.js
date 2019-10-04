function solve() {
  let answerButtons = document.getElementsByClassName("answer-text");
  let sections = document.getElementsByTagName("section");
  let correctAnswers = 0;
  let answers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
  let result = document.getElementById("results");

  Array.from(document.querySelectorAll('p.answer-text')).forEach(p => p.addEventListener('click', function () {
   
      let currentSection = this.parentNode.parentNode.parentNode.parentNode;
      if (answers.includes(this.textContent)) {
        correctAnswers++;
      }
      for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
        if (sections[i] == currentSection) {
          if (i == sections.length - 1) {
            result.style.display = 'block';
            let finalMessage = "";
            if (correctAnswers == 3) {
              finalMessage = "You are recognized as top JavaScript fan!"
            } else {
              finalMessage = `You have ${correctAnswers} right answers.`
            }
            result.getElementsByClassName("results-inner")[0].getElementsByTagName("h1")[0].innerHTML = finalMessage;

          } else {
            sections[i + 1].style.display = 'block';
          }
          break;
        }
      }

    }));


}
