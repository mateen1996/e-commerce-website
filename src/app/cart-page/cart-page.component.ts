import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../seller-add-product/addProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    deliveryCharge: 0,
    total: 0
  }
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.getCurrentCart();
  }

  getCurrentCart() {
    this.productService.currentCart().subscribe((result) => {
      console.log("cartList", result);
      this.cartData = result
      let price = 0
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.productPrice * +item.quantity)

        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.deliveryCharge = 100;
      this.priceSummary.total = price + (price / 10) + 100 - (price / 10);
      console.log(this.priceSummary);

      if (!this.cartData) {
        this.router.navigate(['/']);
      }
    });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.productService.removeToCart(cartId).subscribe((result) => {
      console.log(result);

      this.getCurrentCart();
    })
  }
}
