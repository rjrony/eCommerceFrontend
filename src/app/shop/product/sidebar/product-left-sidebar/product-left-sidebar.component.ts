import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import {Product, ProductModel} from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { PictureService } from '../../../../shared/services/picture.service';
import {Picture} from '../../../../shared/classes/picture';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {
  private productId: string;
  public product: ProductModel = new ProductModel();
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(private route: ActivatedRoute, private router: Router,
    public productService: ProductService,
    private pictureService: PictureService
              ) {
      this.productId = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.getProduct();
    this.getImage();
  }
  private getProduct(){
    this.productService.getProductById(this.productId).subscribe(product => {
      if(!product) { // When product is empty redirect 404
        this.router.navigateByUrl('/pages/404', {skipLocationChange: true});
      } else {
        this.product = product;

      }
    });
  }

  private getImage(){
    console.log(this.pictureService.getProductImageUrl(this.productId));
  }
  // Get Product Color
  Color(variants) {
    const uniqColor = [];
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color);
      }
    }
    return uniqColor;
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }
  
  // Increament
  increment() {
    this.counter++ ;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter-- ;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/cart']);
  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

  public getPictureUrl(pictures){
    let url = 'assets/images/product/placeholder.jpg';

    if(pictures.length > 0){
      const picture: Picture = this.pictureService.getProductImageUrl(pictures[0].pictureId);
      url = picture.url === undefined ? url : picture.url;
    }
    return url;
  }

  public getMultiplePictureUrl(pictures, index){
    let url = 'assets/images/product/placeholder.jpg';
    const picture: Picture = this.pictureService.getProductImageUrl(pictures[index].pictureId);
    url = picture.url === undefined ? url : picture.url;
    return url;
  }

}
