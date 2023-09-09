import { Component, OnInit } from '@angular/core';
import { product } from '../seller-add-product/addProduct';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  updateProduct: product = {
    id: undefined,
    productName: '',
    productPrice: 0,
    productColor: '',
    productCategory: '',
    productDescription: '',
    productImage: '',
    quantity: undefined,
    length: undefined,
    forEach: function (arg0: (product: product) => void): unknown {
      throw new Error('Function not implemented.');
    },
    productId: undefined
  }
  productId: any;
  productData!: product;
  showMessage: boolean=false;
  updateProductMessage: string='';
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private router:Router) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log("product id", this.productId);
    this.getOneProduct()
  }

  getOneProduct() {
    this.productService.getProduct(this.productId).subscribe((result) => {
      this.updateProduct = result;
      console.log(this.updateProduct)
    })
  }
  updateProducts(updateProductForm: NgForm) {
  this.productService.updateProduct(this.updateProduct).subscribe((result)=>{
    console.log(result);
    if(result)
      {
        this.showMessage=true;
        this.updateProductMessage ="Product updated Successfully...";
      
      }
      setTimeout(()=>{
        this.showMessage=false;
        this.updateProductMessage = '';
        this.router.navigate(['/seller-home']);
      },3000);
  })
  }

}
