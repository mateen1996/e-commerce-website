import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/seller-add-product/addProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProductsList!:product[];
  trendyProductsList!:product[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.popularProducts();
    this.trendyProducts()
  }

  popularProducts()
  {
    this.productService.popularProduct().subscribe((result)=>{
      console.log("popular products",result);
      this.popularProductsList = result;
    })

  }

  trendyProducts()
  {
    this.productService.treandyProducts().subscribe((result)=>{
      console.log("popular products",result);
      this.trendyProductsList = result;
    });
  }
}
