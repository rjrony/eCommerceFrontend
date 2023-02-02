import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../shared/services/product.service';
import {PictureService} from "../../shared/services/picture.service";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  brands = [];
  brandAvatar = 'assets/images/brand/brand.jpg';
  constructor(private productService: ProductService, public pictureService: PictureService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.productService.getBrands.subscribe((brands) => {
      this.brands = brands;
    });
  }

}
