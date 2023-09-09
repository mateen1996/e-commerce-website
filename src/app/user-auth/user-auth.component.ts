import { Component, OnInit } from '@angular/core';
import { loginForm, signUp } from '../seller-auth/seller-auth/sellersignup';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { cart, product } from '../seller-add-product/addProduct';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin = false;
  authError: string = '';
  authSucess: string = '';
  registrationSucessMsg = '';
  hideAlert = false;
  userSignUp: signUp = {
    name: '',
    email: '',
    password: ''
  }

  LoginFormUser: loginForm =
    {
      email: '',
      password: ''
    }
  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userAuthReload();
  }
  usersignUp(userSignupForm: NgForm) {
    console.log(userSignupForm.value);
    this.userService.userSignUp(this.userSignUp);
    setTimeout(()=>{
      userSignupForm.reset();
    },1000);
    this.userService.isSuccessMessage.subscribe((sucess) => {
      if (sucess) {
        this.hideAlert = true;
        this.registrationSucessMsg = "Registration Sucessfull ... Please Go to Login Page for Login...";
        setTimeout(() => {
          this.hideAlert = false
        }, 5000);
      }
    });

  }

  userLogin(userLoginForm: NgForm) {
    console.log(userLoginForm.value)
    this.userService.userLogin(this.LoginFormUser);
    this.userService.isLogginSucessMsg.subscribe((success) => {
      if (success) {
        this.hideAlert = true;
        this.authSucess = "User Login SuccessFully....";
        setTimeout(() => {
          this.hideAlert = false;
        }, 5000);
      }
    });
    this.userService.isLogginError.subscribe((error) => {
      if (error) {
        this.authError = "Please Enter Correct User Email and Password";
      }
    });
    this.localCartToRemoteCart();
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }


  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productID: product.id,
          userId
        }

        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("data is stored in DB");
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')
          }
        }, 500);
      });
    }
    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 1000)
  }

}
