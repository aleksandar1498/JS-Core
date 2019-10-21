function solve() {
   document.getElementsByClassName("courseFoot")[0].childNodes[1].addEventListener("click", function () {
      let prices = new Map();
      let ul = document.getElementsByClassName("courseBody")[1].childNodes[1];
      ul.innerHTML = "";
      let result = document.getElementsByClassName("courseFoot")[1].childNodes[1];
      let totPrice = 0;
     
      let liTemplate = document.createElement("li");
      prices.set("js-fundamentals", 170);
      prices.set("js-advanced", 180);
      prices.set("js-applications", 190);
      prices.set("js-web", 490);


      let availableCourses = getCheckedCourses();
      let educationForm = getEducationForm();
      if(educationForm == "online"){
         reducePricesForOnlineStudent(prices);
      }
      if(availableCourses.has("js-advanced") && availableCourses.has("js-fundamentals")){
         prices.set("js-advanced",prices.get("js-advanced")*.9);
      }
      if(availableCourses.has("js-advanced") && availableCourses.has("js-fundamentals") && availableCourses.has("js-applications")){
         prices.set("js-advanced",prices.get("js-advanced")*.94);
         prices.set("js-fundamentals",prices.get("js-fundamentals")*.94);
         prices.set("js-applications",prices.get("js-applications")*.94);
      }
      console.log(availableCourses);
      for (const course of availableCourses) {
         let li = liTemplate.cloneNode();
         totPrice += prices.get(course[0]);
         li.innerHTML = course[1].split(" ").join("-");
         ul.appendChild(li);
      }
      console.log(totPrice);
      result.innerHTML = result.innerHTML.replace(/[0-9]+(\.[0-9]+)?/g, "" + Math.floor(totPrice).toFixed(0)+".00");
      console.log(availableCourses.size);
      if (availableCourses.size == 4) {
         let li = liTemplate.cloneNode();
         li.innerHTML = "HTML and CSS";
         ul.appendChild(li);
      }
   });
   function getEducationForm() {
         return Array.from(document.getElementById("educationForm").getElementsByTagName("input")).filter(x => x.checked)[0].value;
      }
   function getCheckedCourses() {
         let map = new Map();
         Array.from(document.getElementById("availableCourses")
            .getElementsByTagName("input"))
            .filter(x => x.type == "checkbox" && x.checked == true)
            .forEach(ch => map.set(ch.name, ch.nextElementSibling.innerHTML.split(" - ")[0]));
         return map;
      }
   function reducePricesForOnlineStudent(prices) {
        
         for (const element of prices.entries()) {
            console.log(element[1]);
            prices.set(element[0], element[1] * .94);

         }
      }
}

solve();