function solve() {
  let buttons = document.getElementsByTagName("button");
  document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[4].getElementsByTagName("input")[0].removeAttribute("disabled");
  let textAreas = document.getElementsByTagName("textarea");

  buttons[0].addEventListener("click",function(){
    let data = JSON.parse(textAreas[0].value);
    console.log(data[0]);

    for(const prod of data){
      let tr = document.createElement("tr");
      let prodKeys = Object.keys(prod);
      let td = [];
      for(const key of prodKeys){
        let tdElem = document.createElement("td");
        if(key == "img"){
          let img = document.createElement("img");
          img.setAttribute("src",prod[key]);
         
          tdElem.appendChild(img);
          td.unshift(tdElem);
        }else{
          let p = document.createElement("p");
          p.innerHTML = prod[key];
          tdElem.appendChild(p);
         td.push(tdElem)
        }
       
        
      }
      let tdCheckBox = document.createElement("td");
      let input = document.createElement("input");
      input.setAttribute("type","checkbox");
      tdCheckBox.appendChild(input);
      td.push(tdCheckBox);
      for(const tdElement of td){
        tr.appendChild(tdElement);
      }
      
      document.getElementsByTagName("tbody")[0].appendChild(tr);
    }
    
  });
  buttons[1].addEventListener("click",function(){
    let allProductSelected = document.querySelectorAll("input[type='checkbox']:checked");

    let totPrice = 0;
    let totDecoration = 0;
    let boughtProducts = [];
    for(const prodEntry of allProductSelected){
      let name =prodEntry.parentElement.parentElement.getElementsByTagName("td")[1].getElementsByTagName("p")[0].innerHTML;
      let price=Number(prodEntry.parentElement.parentElement.getElementsByTagName("td")[2].getElementsByTagName("p")[0].innerHTML);
      let decorationCx=Number(prodEntry.parentElement.parentElement.getElementsByTagName("td")[3].getElementsByTagName("p")[0].innerHTML);
      totPrice+=price;
      totDecoration+=decorationCx;
      if(!boughtProducts[name]){
        boughtProducts.push(name);
      }
    }
    let result = textAreas[1];
    result.value+=`Bought furniture: ${Object(boughtProducts).join(", ")}\n`;
    result.value+=`Total price: ${totPrice.toFixed(2)}\n`;
    result.value+=`Average decoration factor: ${totDecoration/boughtProducts.length}`;
  });
}