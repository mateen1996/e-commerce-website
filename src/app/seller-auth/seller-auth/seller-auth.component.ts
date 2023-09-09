import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/services/seller.service';
import { loginForm, signUp } from './sellersignup';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  authError:string ='';
  authSuccess:string ='';
  successMsg:string = '';
  hideAlert: boolean=false;
  constructor(private seller:SellerService,public router:Router) { }

  sellerSignUp : signUp ={
    name: '',
    email: '',
    password: ''
  }

  LoginFormSeller :loginForm =
  {
    email: '',
    password: ''
  }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(sellerSignUpForm:NgForm):void
  {
   console.log("this is seller sign up",sellerSignUpForm.value);
   this.seller.sellerAuthSignUp(this.sellerSignUp);
   setTimeout(()=>{
     sellerSignUpForm.reset();
   },1000);
   this.seller.isSellerRegisterSucessMsg.subscribe((sucess)=>{
    if(sucess)
    {
      this.hideAlert=true;
      this.successMsg = "Seller Registration Sucessfull ... Please Go to Seller Login Page for Login...";
      setTimeout(() => {
        this.hideAlert=false
      }, 5000);
    }
  });
  }

  sellerLogin(sellerLoginForm:NgForm)
  {
    this.authError="";
    this.seller.sellerAuthLogin(this.LoginFormSeller);
    this.seller.isSellerLogginSucessMsg.subscribe((success)=>{
      if(success)
      {
       this.hideAlert=true;
       this.authSuccess = "Seller Login SuccessFully....";
       setTimeout(() => {
         this.hideAlert=false;
       }, 5000);
      }
     });
    this.seller.isLogginError.subscribe((error)=>{
      if(error)
      {
        this.authError="user Email or password is not Correct";
      }
    })
  }

  openLogin()
  {
    this.showLogin = true;
  }

  openSignUp()
  {
    this.showLogin = false;
  }
}
