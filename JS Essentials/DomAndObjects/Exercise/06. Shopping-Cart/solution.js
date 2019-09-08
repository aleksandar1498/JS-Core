function solve() {
   let products = document.querySelectorAll(".product");
   let boughtProducts = {};
   let textAreaElement = document.getElementsByTagName("textarea")[0];
   let checkoutButton = document.getElementsByClassName("checkout")[0];
   for(let product of products){
      product.getElementsByTagName("button")[0].addEventListener("click",function(){
         let productName  = product.getElementsByClassName("product-title")[0].innerHTML;
         let productPrice  = Number(product.getElementsByClassName("product-line-price")[0].innerHTML);
         if(boughtProducts[productName]){
            boughtProducts[productName]+=productPrice;
         }else{
            boughtProducts[productName]=productPrice;
         }
         textAreaElement.value+=`Added ${productName} for ${productPrice.toFixed(2)} to the cart.\n`;
      });
   }
   checkoutButton.addEventListener("click",function(){
      this.setAttribute("disabled","disabled");
      for(let product of products){
         product.getElementsByTagName("button")[0].setAttribute("disabled","disabled");
      }
      let keys  =  Object.keys(boughtProducts);
      let totalPrice = 0;
      for(const key of keys){
         totalPrice+=boughtProducts[key];
      }
      textAreaElement.value+=`You bought ${keys.join(" ")} for ${totalPrice.toFixed(2)}.`;
   });
   

}