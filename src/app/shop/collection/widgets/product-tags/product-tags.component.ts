import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductTag } from 'src/app/shared/classes/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-tags',
  templateUrl: './product-tags.component.html',
  styleUrls: ['./product-tags.component.scss']
})
export class ProductTagsComponent implements OnInit {
  tags: ProductTag[] = [];
  @Output() tagsFilter: EventEmitter<any> = new EventEmitter<any>();
  public collapse = true;
  tagsOnQuery: string[] = [];

  constructor(
      private productService: ProductService,
      private route: ActivatedRoute
  ) {
      this.route.queryParams.subscribe(params => {
          this.tagsOnQuery = [];
          for (const key in params){
              if (key === 'tag'){
                  const tags = params[key];
                  if ( Array.isArray(tags)) {
                    tags.forEach((tag => this.tagsOnQuery.push(tag)));
                  } else {
                      this.tagsOnQuery.push(tags);
                  }
              }
          }
      });
  }

  ngOnInit(): void {
      this.getTags();
  }

  private getTags() {
      this.productService.getProductTags.subscribe((tags: any) => {
          this.tags = tags;
      });
  }


  appliedFilter(tag) {
      const indexOf = this.tagsOnQuery.indexOf(tag);
      if ( indexOf < 0){
          this.tagsOnQuery = [];
          this.tagsOnQuery.push(tag);
      }else {
          this.tagsOnQuery.splice(indexOf);
      }
      this.tagsFilter.emit({tag: this.tagsOnQuery});
  }

  // check if the item are selected
  checked(item) {
      // if(this.brands.indexOf(item) != -1){
      //   return true;
      // }
  }

}
