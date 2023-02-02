import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import {Picture} from '../../shared/classes/picture';
import {PictureService} from '../../shared/services/picture.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any[] = [];

  constructor(public productService: ProductService, private pictureService: PictureService) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Increament
  increment(product, qty = 1) {
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
  }
  public getPictureUrl(pictures){
    let url = 'assets/images/product/placeholder.jpg';

    if(pictures.length > 0){
      const picture: Picture = this.pictureService.getProductImageUrl(pictures[0].pictureId);
      url = picture.url === undefined ? url : picture.url;
    }
    return url;
  }
}
