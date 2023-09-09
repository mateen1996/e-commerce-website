import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, product } from '../seller-add-product/addProduct';
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[]|[]>();
  constructor(private router:Router,
    private http:HttpClient) { }
  addProduct(data:product)
  {
    return this.http.post("http://localhost:3000/products",data);
  }

  getProductList()
  {
    return this.http.get<product[]>("http://localhost:3000/products");
  }

  deleteProduct(id:number)
  {
    console.log("service",id)
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string)
  {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product:product)
  {
  return this.http.put(`http://localhost:3000/products/${product.id}`,product)
  }

  popularProduct()
  {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=6`)
  }

  treandyProducts()
  {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=8`)
  }

  searchProducts(query:string)
  {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddToCart(data:product)
  {
    console.log("product service file grab data",data);
     let cartData =[];
     let localCart = localStorage.getItem('localCart');
     if(!localCart)
     {
      localStorage.setItem('localCart',JSON.stringify([(data)]));
      this.cartData.emit([data])
     }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId:number)
  {
    let cartData = localStorage.getItem('localCart');
    if(cartData)
    {
      let items:product[] =JSON.parse(cartData);
      items =items.filter((item:product)=>productId!== item.id);
      console.log(items)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData:cart)
  {console.log("add data ", cartData)
   return this.http.post('http://localhost:3000/cart',cartData);
  }

  getCartList(userId:number)
  {
    console.log("user id get cart list",userId);
    return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,
    {observe:'response'}).subscribe((result)=>{
      console.log("getcardlist",result.body);
      if(result && result.body)
      {
        this.cartData.emit(result.body)
      }
    });
  }

  removeToCart(cartId:number)
  {
    return this.http.delete('http://localhost:3000/cart/'+cartId)
  }

  currentCart()
  {
    let userStore =localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }

  orderNow(data:order)
  {
    return this.http.post("http://localhost:3000/orders",data);
  }

  orderList()
  {
    let userStore =localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+userData.id)
  }

  deleteCartItems(cartId:number)
  {
    this.http.delete('http://localhost:3000/cart/'+cartId,{
      observe:'response'
    }).subscribe((result)=>{
      console.log(result);
      if(result)
      {
        this.cartData.emit([]);
      }
    })
  }

  cancelOrder(orderId:number |undefined)
  {
    return this.http.delete('http://localhost:3000/orders/'+orderId);
  }
}

