import { Component, OnInit } from "@angular/core";
import { CartService } from "../cart.service";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  products = [];
  constructor(private service: CartService) {}

  ngOnInit() {
    this.products = this.service.getAllProducts();
  }

}
