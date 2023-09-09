import { Component, OnInit } from '@angular/core';
import { cart, order } from '../seller-add-product/addProduct';
import { NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
orderMessage: string |undefined;
hideMessage :boolean = false;
  orderDataForm:order ={
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    mobileNumber: '',
    totalPrice: 0,
    userId: 0,
    id: undefined
  }
cartData:cart[] |undefined
  totalPrice:number |undefined
  constructor(private router:Router, private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result)=>{
      let price=0;
      this.cartData = result;
      result.forEach((item)=>{
      if(item.quantity)
      {
        price=price+(+item.productPrice * +item.quantity)

      }
    });
    this.totalPrice=price+(price/10)+100-(price/10);
      console.log(this.totalPrice);
    });
  }
  // data:{firstname:string,lastname:string,contact:string,address:string,email:string}
  orderNow(orderData:NgForm)
  {
  let user = localStorage.getItem('user');
  let userId= user && JSON.parse(user).id;

  if(this.totalPrice)
  {
    let orderData:order = {
      ...this.orderDataForm,
      totalPrice:this.totalPrice,
      userId,
      id:undefined

    }
    this.cartData?.forEach((item)=>{
        setTimeout(()=>{
         item.id && this.productService.deleteCartItems(item.id);
        },500);
    })

    this.productService.orderNow(orderData).subscribe((result)=>{
      console.log(result);
      if(result)
      {
        this.hideMessage = true;
         this.orderMessage="Your Order has been Placed...";
         setTimeout(()=>{
           this.router.navigate(['/my-order']);
           this.orderMessage=undefined;
           this.hideMessage = false;
         },3000)
      }
     
    })
  }

 
  }
}
