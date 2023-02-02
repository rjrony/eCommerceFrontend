import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Product} from '../../../../shared/classes/product';
import {ProductService} from '../../../../shared/services/product.service';
import {Brand} from '../../../../shared/classes/brand';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-brands',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

    brands: Brand[] = [];
    @Output() brandsFilter: EventEmitter<any> = new EventEmitter<any>();
    public collapse = true;
    brandsOnQuery: string[] = [];
    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe(params => {
            this.brandsOnQuery = [];
            for (const key in params){
                if (key === 'brand'){
                    const brands = params[key];
                    if ( Array.isArray(brands)) {
                        brands.forEach((brand => this.brandsOnQuery.push(brand)));
                    } else {
                        this.brandsOnQuery.push(brands);
                    }
                }
            }
        });
    }

    ngOnInit(): void {
        this.getBrands();
    }

    private getBrands() {
        this.productService.getBrands.subscribe((brands: any) => {
            this.brands = brands;
        });
    }


    get filterbyBrand() {
        const uniqueBrands = [];
        // this.products.filter((product) => {
        //   if (product.brand) {
        //     const index = uniqueBrands.indexOf(product.brand)
        //     if (index === -1) uniqueBrands.push(product.brand)
        //   }
        // })
        return uniqueBrands;
    }

    appliedFilter(brandName) {
        const indexOfBrandOnQuery = this.brandsOnQuery.indexOf(brandName);
        if ( indexOfBrandOnQuery < 0){
            this.brandsOnQuery.push(brandName);
        }else {
            this.brandsOnQuery.splice(indexOfBrandOnQuery);
        }
        this.brandsFilter.emit({brand: this.brandsOnQuery});
    }

    // check if the item are selected
    checked(item) {
        // if(this.brands.indexOf(item) != -1){
        //   return true;
        // }
    }

}
