import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductService } from "../../../shared/services/product.service";
import {Product, ProductModel} from '../../../shared/classes/product';
import {ProductFilterModel} from '../../../shared/classes/product-filter-model';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {
  
  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public products: ProductModel[] = [];
  public brands: any[] = [];
  public colors: any[] = [];
  public size: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 10000;
  public tags: any[] = [];
  public category: string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;
  private params;
  public productNotFound = false;
  constructor(private route: ActivatedRoute, private router: Router,
    private viewScroller: ViewportScroller, public productService: ProductService) {
      // Get Query params..
      this.route.queryParams.subscribe(params => {
        this.params = params;
        this.pageNo =  params.page ? parseInt(params.page) : this.pageNo;
        this.getProducts();
      });
  }

  ngOnInit(): void {
    this.getProductAttributes();
  }

  private getProducts(){
    this.productService.getFilteredProducts(this.params).subscribe((data: any) => {
      this.products = data.value;
      this.productNotFound = this.products.length < 1;
      this.paginate = this.productService.getPager(data['@odata.count'], +this.pageNo);
    });
  }

  private getProductAttributes(){
    this.productService.getAttributes.subscribe((attributes: any) => {
      this.colors = attributes.find(atrribute => atrribute.name === 'Color').predefinedProductAttributeValues;
      this.size = attributes.find(atrribute => atrribute.name === 'Size').predefinedProductAttributeValues;
    });
  }

  // Append filter value to Url
  updateFilter(tags: any, addParam = true) {
    tags.page = null; // Reset Pagination
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      // this.viewScroller.setOffset([120, 120]);
      // this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      // this.viewScroller.setOffset([120, 120]);
      // this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {
  
    this.brands = this.brands.filter(val => val !== tag);
    this.colors = this.colors.filter(val => val !== tag);
    this.size = this.size.filter(val => val !== tag );

    let params = { 
      brand: this.brands.length ? this.brands.join(",") : null, 
      color: this.colors.length ? this.colors.join(",") : null, 
      size: this.size.length ? this.size.join(",") : null
    }

    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      // this.viewScroller.setOffset([120, 120]);
      // this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if(value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
