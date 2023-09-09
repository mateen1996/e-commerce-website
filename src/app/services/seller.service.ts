import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginForm, signUp } from '../seller-auth/seller-auth/sellersignup';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { product } from '../seller-add-product/addProduct';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLogginError = new EventEmitter<boolean>(false);
  isSellerRegisterSucessMsg = new EventEmitter<boolean>(false);
  isSellerLogginSucessMsg = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient,
    private router: Router) { }

  sellerAuthSignUp(data: signUp) {
    this.http.post("http://localhost:3000/seller",
      data, { observe: 'response' }).subscribe((result) => {
        console.log("result in service file", result);
        if (result) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          // this.router.navigate(['seller-home']);
          this.isSellerRegisterSucessMsg.emit(true);
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  sellerAuthLogin(data: loginForm) {
    console.log("service data", data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {
      observe: 'response'
    }).subscribe((result: any) => {
      console.log(result);
      if (result && result.body && result.body.length) {
        console.log("user Logged In");
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.isSellerLogginSucessMsg.emit(true);
        setTimeout(() => {
          this.router.navigate(['seller-home']);

        }, 1000);
      }
      else {
        console.log("Login Failed...")
        this.isLogginError.emit(true);
      }
    })
  }


}
