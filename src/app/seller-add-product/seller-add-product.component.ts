import { Component, OnInit } from '@angular/core';
import { product } from './addProduct';
import { NgForm } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  showMessage=false;
  addProductMessage:string='';
  newProduct: product={
    id: '',
    productName: '',
    productPrice: 0,
    productColor: '',
    productCategory: '',
    productDescription: '',
    productImage: '',
    quantity: undefined,
    productId: undefined,
    length: undefined,
    forEach: function (arg0: (product: product) => void): unknown {
      throw new Error('Function not implemented.');
    }
  }
  constructor(private seller:SellerService,
    private router:Router,
    private productService:ProductService) { }

  ngOnInit(): void {
  
  }


  addProduct(addProductForm:NgForm)
  {
  console.log(addProductForm.value);
  this.productService.addProduct(this.newProduct).subscribe((result)=>{
    console.log(result);

    if(result)
    {
      this.showMessage=true;
      this.addProductMessage ="Product Added Successfully"
    }
    setTimeout(()=>{
      addProductForm.reset();
      this.showMessage=false;
      this.addProductMessage = ''
      this.router.navigate(['/seller-home']);
    },2000);

  });

  }
}
