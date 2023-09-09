import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { loginForm, signUp } from '../seller-auth/seller-auth/sellersignup';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogginError =  new EventEmitter<boolean>(false);
  isLogginSucessMsg =  new EventEmitter<boolean>(false);
  isSuccessMessage = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient,
    private router:Router) { }

  userSignUp(data:signUp)
{
  this.http.post("http://localhost:3000/users",data,
  {
    observe :'response'
  }).subscribe((result)=>{
    console.log(result.body);
    if(result)
    {
      localStorage.setItem('user',JSON.stringify(result.body));
      // this.router.navigate(['/']);
      this.isSuccessMessage.emit(true);
    }

  });
  console.log("user service ",data);
}

userLogin(data:loginForm)
{
  console.log("service data",data);
  this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{
    observe :'response'
  }).subscribe((result:any)=>{
    console.log(result);
    if(result && result.body && result.body.length)
    {
      console.log("user Logged In");
      localStorage.setItem('user',JSON.stringify(result.body));
      this.isLogginSucessMsg.emit(true);
      setTimeout(() => {
        this.router.navigate(['/']);
      },1000);
    }
    else{
      console.log("Login Failed...")
      this.isLogginError.emit(true);
    }
  })
}

userAuthReload()
{
  if(localStorage.getItem('user'))
  {
    this.router.navigate(['/'])
  }
}
}
