import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import {Product, ProductModel} from '../classes/product';
import { ProductService } from './product.service';

@Injectable({
	providedIn: 'root'
})
export class Resolver implements Resolve<Product> {
  
  public product: ProductModel = new ProductModel();

  constructor(
    private router: Router,
    public productService: ProductService
  ) {}

  // Resolver
  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));    
    this.productService.getProductById(route.params.slug).subscribe(product => {
      if(!product) { // When product is empty redirect 404
          this.router.navigateByUrl('/pages/404', {skipLocationChange: true});
      } else {
          this.product = product;
      }
    })
    return this.product;
  }
}
