function solve() {
   let addBtn = document.querySelector("#add-new > button");
   let productsSection = document.getElementById("products");
   let availableProductsSection = productsSection.getElementsByTagName("ul")[0];
   let myProductsSection = document.getElementById("myProducts");
   addBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      let current = evt.target;
      let name = current.previousElementSibling.previousElementSibling.previousElementSibling;
      let quantity = current.previousElementSibling.previousElementSibling;
      let price = current.previousElementSibling;
      let item = createItem(name.value, quantity.value, price.value);
      availableProductsSection.appendChild(item);

   });

   function createItem(name, quantity, price) {
      let li = document.createElement('li');
      let span = document.createElement("span");
      span.innerHTML = name;
      let strong = document.createElement("strong");
      strong.innerHTML = `Available: ${quantity}`;
      let div = document.createElement("div");
      let strongPrice = document.createElement("strong");
      strongPrice.innerHTML = `${Number(price).toFixed(2)}`;
      let button = document.createElement("button");
      button.innerHTML = "Add to Client's List";
      
      // button add event listener

      div.appendChild(strongPrice);
      div.appendChild(button);

      li.appendChild(span);
      li.appendChild(strong);
      li.appendChild(div);

      button.addEventListener('click',buyElement);
      return li;
   }

   function buyElement(evt) {
      console.log('clicked');
      let current = evt.target;
      let name =current.parentElement.previousElementSibling.previousElementSibling.textContent;
      let price =  Number(current.previousElementSibling.textContent).toFixed(2);
      let remainingQuantity = Number(current.parentElement.previousElementSibling.textContent.replace(/[^0-9]+/g,""));
      addToProducts(name,price);
      remainingQuantity--;
      if(remainingQuantity <= 0){
         current.parentElement.parentElement.remove();
      }else{
         current.parentElement.previousElementSibling.textContent = current.parentElement.previousElementSibling.textContent.replace(/[0-9]+/g,remainingQuantity.toString())
      }
   }

   function addToProducts(name,price) {
      let content = myProductsSection.previousElementSibling.innerHTML.split(':');
      let totPrice = Number(content[1].trim());
     
      let newPrice = totPrice+Number(price);
     
      myProductsSection.previousElementSibling.innerHTML=`${content[0]}: ${Number(newPrice).toFixed(2)}`;
      let productToAdd = document.createElement("li");
      productToAdd.innerHTML = name;
      let strong = document.createElement("strong");
      strong.innerHTML = price;
      productToAdd.appendChild(strong)
      myProductsSection.getElementsByTagName("ul")[0].appendChild(productToAdd);
   }

   let filterBtn = productsSection.getElementsByClassName("filter")[0].getElementsByTagName("button")[0];
   filterBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      let current = evt.target;
      let nameToFilter = current.previousElementSibling.value;
      Array.from(availableProductsSection.getElementsByTagName("li")).forEach(v => v.style.display = 'none');
      Array.from(availableProductsSection.getElementsByTagName("li")).filter(i => {
         return i.getElementsByTagName("span")[0].innerHTML.toLocaleLowerCase() == nameToFilter.toLocaleLowerCase();
      }).forEach(v => v.style.display = '');
   })
   myProductsSection.getElementsByTagName("button")[0].addEventListener("click",(evt)=>{
      let current = evt.target;
      current.previousElementSibling.innerHTML = '';
      current.parentElement.previousElementSibling.innerHTML = 'Total Price: 0.00';
   });

}