function solve() {
   let kingdoms = Array.from(document.getElementById("map").getElementsByClassName("kingdom")).reduce((obj, item) => {
      obj[item.id] = item
      return obj
   }, {})


   document.getElementById("kingdom").getElementsByTagName("button")[0].addEventListener("click", function (ev) {
      let current = ev.target;
      let kingdom = current.previousElementSibling.previousElementSibling;

      let king = current.previousElementSibling;
      let invalid = false;
      if (!kingdoms[kingdom.value.toLowerCase()]) {
         kingdom.value = "";
         invalid = true;
      }
      if (king.value.length < 2) {

         king.value = "";
         invalid = true;
      }
      if (invalid) {
         return;
      }
      rebuild(kingdoms[kingdom.value.toLowerCase()], king.value);

   });
   function rebuild(kingdom, king) {
      if (kingdom.style.display != "none") {
         kingdom.innerHTML = "";
         kingdom.style.display = "none";
      }
      kingdom.style.display = 'inline-block';
      let h1 = document.createElement("h1");
      h1.innerHTML = kingdom.id.toUpperCase();
      let castleDiv = document.createElement("div");
      castleDiv.className = "castle";
      let h2 = document.createElement("h2");
      h2.innerHTML = king.toUpperCase();
      let fieldSet = document.createElement("fieldset");
      let legend = document.createElement("legend");
      legend.innerHTML = "Army";
      let p = document.createElement("p");
      p.innerHTML = "TANKS - 0";
      let p1 = document.createElement("p");
      p1.innerHTML = "FIGHTERS - 0";
      let p2 = document.createElement("p");
      p2.innerHTML = "MAGES - 0";
      let armyOutput = document.createElement("div");
      armyOutput.className = "armyOutput";
      fieldSet.appendChild(legend);
      fieldSet.appendChild(p);
      fieldSet.appendChild(p1);
      fieldSet.appendChild(p2);
      fieldSet.appendChild(armyOutput);
      kingdom.appendChild(h1);
      kingdom.appendChild(castleDiv);
      kingdom.appendChild(h2);
      kingdom.appendChild(fieldSet);
   }
   document.getElementById("characters").getElementsByTagName("div")[3].getElementsByTagName("button")[0].addEventListener("click", function (ev) {
      let current = ev.target;
      let invalid = false;
      let kingdom = current.previousElementSibling;
      let character = current.previousElementSibling.previousElementSibling;
      let characterType = Array.from(document.getElementById("characters").getElementsByTagName("input")).find(i => i.name == "characterType" && i.checked == true);
      if (!characterType) {
         invalid = true;
      }
      if (character.value.length < 2) {
         character.value = "";
         invalid = true;
      }
      if (!kingdoms[kingdom.value.toLowerCase()] || kingdoms[kingdom.value.toLowerCase()].style.display == 'none') {
         kingdom.value = "";
         invalid = true;
      }

      if (invalid) {
         return;
      }
      kingdoms[kingdom.value.toLowerCase()].getElementsByClassName("armyOutput")[0].innerHTML += character.value + " ";



      let charactersCounts = kingdoms[kingdom.value.toLowerCase()].getElementsByTagName("fieldset")[0].getElementsByTagName("p");
      let position = -1;
      switch (characterType.value) {
         case "tank":
            position = 0;
            break;
         case "fighter":
            position = 1;
            break;
         case "mage":
            position = 2;
            break;
      }

      let currentVal = Number(charactersCounts[position].innerHTML.match(/[0-9]+/));
      currentVal++;
      charactersCounts[position].innerHTML = charactersCounts[position].innerHTML.replace(/[0-9]+/g, currentVal);

   });


   document.getElementById("actions").getElementsByTagName("button")[0].addEventListener("click", (ev) => {
      let current = ev.target;
      let invalid = false;
      let attacker = current.previousElementSibling.previousElementSibling;
      let defender = current.previousElementSibling;
      if (!kingdoms[attacker.value.toLowerCase()] || kingdoms[attacker.value.toLowerCase()].style.display == 'none') {
         attacker.value = "";
         invalid = true;
      }
      if (!kingdoms[defender.value.toLowerCase()] || kingdoms[defender.value.toLowerCase()].style.display == 'none') {
         defender.value = ""; 
         invalid = true;
      }
      if (invalid) {
         return;
      }
      if (getTotalAttack(kingdoms[attacker.value.toLowerCase()]) > getTotalDefense(kingdoms[defender.value.toLowerCase()])) {
         kingdoms[defender.value.toLowerCase()].getElementsByTagName("h2")[0].innerHTML = kingdoms[attacker.value.toLowerCase()].getElementsByTagName("h2")[0].innerHTML;
      }


   });
   function getTotalAttack(attacker) {
      let paragraphs = attacker.getElementsByTagName("fieldset")[0].getElementsByTagName("p");
      let totalAttack = 0;
      for (let p of paragraphs) {
         totalAttack += getAttacks()[p.innerHTML.match(/[A-Z]+/g)[0].toLowerCase()] * Number(p.innerHTML.match(/[0-9]+/g));
      }
      return totalAttack;

   }
   function getTotalDefense(defender) {
      let paragraphs = defender.getElementsByTagName("fieldset")[0].getElementsByTagName("p");
      let totalDefense = 0;
      for (let p of paragraphs) {
         totalDefense += getDefenses()[p.innerHTML.match(/[A-Z]+/g)[0].toLowerCase()] * Number(p.innerHTML.match(/[0-9]+/g));
      }
      return totalDefense;
   }

   function getDefenses() {
      return {
         "mages": 30,
         "fighters": 50,
         "tanks": 80
      };
   }
   function getAttacks() {
      return {
         "mages": 70,
         "fighters": 50,
         "tanks": 20
      };
   }
}
solve();



