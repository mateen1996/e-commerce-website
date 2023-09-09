import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/seller-add-product/addProduct';
import { ProductService } from 'src/app/services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  deleteIcon = faTrash;
  updateIcon = faEdit;
  productList!: product[];
  showMessage: boolean = false;
  deleteProductMessage: string = '';
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productService.getProductList().subscribe((result) => {
      console.log(result);
      this.productList = result;
    })
  }

  deleteProduct(id: any) {
    console.log("seller-home component", id);
    this.productService.deleteProduct(id).subscribe((result) => {
      console.log(result);
      if (result) {
        this.showMessage = true;
        this.deleteProductMessage = "Product Deleted Successfully";
        this.getProduct();
      }
      setTimeout(() => {
        this.showMessage = false;
        this.deleteProductMessage = ''
      }, 2000);
    })
  }
}
