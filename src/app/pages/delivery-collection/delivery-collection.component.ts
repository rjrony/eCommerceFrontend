import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/shared/classes/Page';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-delivery-collection',
  templateUrl: './delivery-collection.component.html',
  styleUrls: ['./delivery-collection.component.scss']
})
export class DeliveryCollectionComponent implements OnInit {
  private pageId: string;
  public page: Page = new Page();
  constructor(private route: ActivatedRoute, private router: Router,
    public productService: ProductService) { }

  ngOnInit(): void {
    this.getPage();
  }

  private getPage(){
    this.pageId='62b1ae8d5b4c62f2c54e4b4d';
    this.productService.getPageById(this.pageId).subscribe(page => {
      console.log(page);
      if(!page) { // When product is empty redirect 404
        this.router.navigateByUrl('/pages/404', {skipLocationChange: true});
      } else {
        this.page = page;

      }
    });
  }

}
