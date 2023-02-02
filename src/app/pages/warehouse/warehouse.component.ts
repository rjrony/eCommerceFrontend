import { Component, OnInit } from '@angular/core';
import { PictureService } from 'src/app/shared/services/picture.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  warehouses = [];
  warehouseAvatar = 'assets/images/brand/placeholder.png';
  constructor(private productService: ProductService, public pictureService: PictureService) { }

  ngOnInit(): void {
    this.getWarehouses();
  }

  getWarehouses(){
    this.productService.getWarehouses.subscribe((warehouses) => {
      this.warehouses = warehouses;
    });
  }


}
