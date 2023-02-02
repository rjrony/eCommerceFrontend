import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Product } from '../../classes/product';
import { ProductService } from '../../services/product.service';
import {CategoryModel} from '../../classes/category';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Output() categoryFilter: EventEmitter<any> = new EventEmitter<any>();
  public products: Product[] = [];
  public collapse = true;
  public categories: any = [];
  categoriesOnQuery: string[] = [];

  constructor(
      public productService: ProductService,
      private route: ActivatedRoute
  ) {
    this.productService.getProducts.subscribe(product => this.products = product);
    this.route.queryParams.subscribe(params => {
      this.categoriesOnQuery = [];
      for (const key in params){
        if (key === 'category'){
          const categories = params[key];
          if ( Array.isArray(categories)) {
            categories.forEach((category => this.categoriesOnQuery.push(category)));
          } else {
            this.categoriesOnQuery.push(categories);
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.getCategory();
  }

  get filterbyCategory() {
    const category = [...new Set(this.products.map(product => product.type))]
    return category;
  }

  appliedFilter(categoryName) {
    const indexOfBrandOnQuery = this.categoriesOnQuery.indexOf(categoryName);
    if ( indexOfBrandOnQuery < 0){
      this.categoriesOnQuery.push(categoryName);
    }else {
      this.categoriesOnQuery.splice(indexOfBrandOnQuery, 1);
    }
    this.categoryFilter.emit({category: this.categoriesOnQuery});
  }

  private getCategory(): void{
    this.productService.getCategory.subscribe((categories: CategoryModel[]) => {
      this.categories = categories;
    });
  }


}
