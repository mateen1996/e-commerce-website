import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../seller-add-product/addProduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }

  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  productDetails: product | undefined;

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId');
    console.log(productId);
    productId && this.productService.getProduct(productId).subscribe((result) => {
      console.log(result);
      this.productDetails = result;
      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString())
        {
          if (items.length) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
        this.productService.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() == item.productId?.toString)
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }
    })
  }

  handleQuenctity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity = this.productQuantity + 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity = this.productQuantity - 1;
    }
  }

  addTocart() {
    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productDetails);
        this.removeCart = true;
      } else {
        console.log("user is Logged in ");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productDetails,
          userId,
          productID: this.productDetails.id
        };
        delete cartData.id;
        console.log(cartData);
        this.productService.addToCart(cartData).subscribe((result) => {
          console.log(result);
          if (result) {
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  removeTocart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);

    } else {
      this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((result) => {
        if (result) {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          this.productService.getCartList(userId);
        }
      })
      this.removeCart = false;
    }

  }
}
