import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../seller-add-product/addProduct';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResult:undefined| product[];

  constructor(private route: ActivatedRoute,
    private productService:ProductService) { }

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query');
    console.log(query);
    query && this.productService.searchProducts(query).subscribe((result)=>{
      console.log(result);
      this.searchResult = result;
    });
  }

}
