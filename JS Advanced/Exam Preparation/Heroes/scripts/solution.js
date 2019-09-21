function solve() {
   let kingdoms = Array.from(document.getElementById("map").getElementsByClassName("kingdom")).reduce((obj, item) => {
      obj[item.id] = item
      return obj
   }, {})


   document.getElementById("kingdom").getElementsByTagName("button")[0].addEventListener("click", function (ev) {
      let current = ev.target;
      let kingdom = current.previousElementSibling.previousElementSibling.value;
      let king = current.previousElementSibling.value;
      if (king.length < 2) {
         return;
      }
      if (!kingdoms[kingdom.toLowerCase()]) {
         return;
      }
      rebuild(kingdoms[kingdom.toLowerCase()], king);

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
      let kingdom = current.previousElementSibling.value;
      let character = current.previousElementSibling.previousElementSibling.value;
      let characterType = Array.from(document.getElementById("characters").getElementsByTagName("input")).find(i => i.name == "characterType" && i.checked == true);
      if (!characterType) {
         console.log("character is not selected");
         return;
      } else if (character.length < 2) {
         console.log("Character invalid");
         return;
      } else if (!kingdoms[kingdom.toLowerCase()] || kingdoms[kingdom.toLowerCase()].style.display == 'none') {
         console.log("Kingdom is not rebuild");
         return;
      } else {

         kingdoms[kingdom.toLowerCase()].getElementsByClassName("armyOutput")[0].innerHTML += " " + character;
         console.log(characterType.value);
      }

      let charactersCounts = document.getElementsByTagName("fieldset")[0].getElementsByTagName("p");
      let position = -1;
      switch (characterType) {
         case "tanks":
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
      charactersCounts[position].innerHTML = charactersCounts[position].innerHTML.replace(/[0-9]+/g,currentVal);

   });


}
solve();


