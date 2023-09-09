import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/seller-add-product/addProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: any;

  constructor(private router: Router,
    private productService: ProductService) { }
  menuType: string = 'default';
  sellerName: string = '';
  cartItems = 0;
  searchResult: undefined | product[];
  ngOnInit(): void {

    this.router.events.subscribe((val: any) => {
      console.log(val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log("in seller area");

          if (localStorage.getItem('seller')) {
            let sellerStrore = localStorage.getItem('seller');
            let sellerData = sellerStrore && JSON.parse(sellerStrore)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }
        } else if (localStorage.getItem('user')) {
          let userStrore = localStorage.getItem('user');
          let userData = userStrore && JSON.parse(userStrore)[0];
          this.username = userData.name;
          this.menuType = 'user';
          this.productService.getCartList(userData.id);
        } else {
          console.log("outside seller");
          this.menuType = 'default';
        }
      }
    })
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
    }
    this.productService.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    })
  }

  logOut() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.productService.cartData.emit([]);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value);
      this.productService.searchProducts(element.value).subscribe((result) => {
        console.log(result);
        if (result.length > 5) {
          result.length = 5

        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(value: string) {
    console.log("search value", value);
    this.router.navigate([`/search/${value}`]);
  }
  redirectTodetails(id: number) {
    this.router.navigate([`/product-details/` + id]);
  }
}

