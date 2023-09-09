import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../seller-add-product/addProduct';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orderData: order[] | undefined;
  constructor(private product: ProductService) { }

  ngOnInit(): void {

    this.orderList();
  }


  orderList() {
    this.product.orderList().subscribe((result) => {
      console.log(result);
      this.orderData = result
    });
  }

  cancelOrder(orderId: number | undefined) {
    console.log(orderId);
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      console.log(result);
    })
    this.orderList();
  }
}
