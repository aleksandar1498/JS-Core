import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ 
   providedIn : 'root'
})
export class CartService {
  productsInCart=[];
  shippingPrice;
  constructor(private http:HttpClient) { }
  addToCart(product){
    this.productsInCart.push(product);
  }
  getAllProducts(){
    return this.productsInCart;
  }
  getShippingPrices(){
    return this.http.get('/assets/shipping.json');
  }
}