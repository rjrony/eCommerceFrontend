import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {map, startWith, delay} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Product, ProductModel, ProductTag} from '../classes/product';
import {environment} from '../../../environments/environment';
import {CategoryModel} from '../classes/category';
import {ProductFilterModel} from '../classes/product-filter-model';
import {Brand} from '../classes/brand';
import { Page } from '../classes/Page';
import { Warehouse } from '../classes/warehouse';

const state = {
    products: JSON.parse(localStorage['products'] || '[]'),
    wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
    compare: JSON.parse(localStorage['compareItems'] || '[]'),
    cart: JSON.parse(localStorage['cartItems'] || '[]')
};

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    public Currency = {name: 'Euro', currency: 'EUR', price: 1}; // Default Currency
    public OpenCart: boolean = false;
    public Products;
    public categories: CategoryModel[] = [];
    public productTags: ProductTag[] = [];
    public brands: Brand[] = [];
    public warehouses: Warehouse[] = [];

    constructor(private http: HttpClient,
                private toastrService: ToastrService) {
    }

    /*
      ---------------------------------------------
      ---------------  Product  -------------------
      ---------------------------------------------
    */

    // Product
    private get products(): Observable<Product[]> {
        this.Products = this.http.get<Product[]>('assets/data/products.json').pipe(map(data => data));
        this.Products.subscribe(next => {
            localStorage['products'] = JSON.stringify(next);
        });
        return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
    }

    // Get Products
    public get getProducts(): Observable<Product[]> {
        return this.products;
    }

    // Get Products
    public getFilteredProducts(items: any): Observable<any> {
        return new Observable<any>((observer: any ) => {
            this.getCategory.subscribe((categories: CategoryModel[]) => {
                const queryParams = this.genarateQueryParams(items);
                this.http.get<any>(environment.urlBase + 'odata/Product?' + queryParams).subscribe((data: any) => {
                    observer.next(data);
                });
            });
        });
    }

    private genarateQueryParams(items: any){
        let filters = '';
        let paginations = '$count=true&$top=16&$skip=0&';
        let sorting = '';
        for (const key in items){
            switch (key) {
                case 'category':
                    const categoryOnQuery = Array.isArray(items[key]) ?  items[key] : [ items[key] ];
                    filters = filters === '' ? '$filter=( productCategories/any(c: ' : filters +  ' and ( productCategories/any(c: ';
                    categoryOnQuery.forEach((category, index) => {
                        const categoryId = this.categories.filter(c => c.name === category.replaceAll('-', ' '))[0].id;
                        filters +=  index === 0 ? `c/CategoryId eq '${categoryId}' `
                            : `or c/CategoryId eq '${categoryId}' `;
                    });
                    filters += ')) ';
                    break;
                case 'brand':
                    const brandsOnQuery = items[key];
                    filters = filters === '' ? '$filter=' : filters +  ' and ( ';
                    brandsOnQuery.forEach((brand, index) => {
                        const brandId = this.brands.filter(c => c.name === brand.replaceAll('-', ' '))[0].id;
                        filters +=  index === 0 ? `brandId eq '${brandId}' ` : ` or brandId eq '${brandId}' `;
                    });
                    filters += ') ';
                    break;
                case 'tag':
                    const tagsOnQuery = Array.isArray(items[key]) ?  items[key] : [ items[key] ];
                    if(tagsOnQuery.length > 0){
                        filters = filters === '' ? '$filter=( productTags/any(t: ' : filters +  ' and ( productTags/any(t: ';
                        tagsOnQuery.forEach((tag, index) => {
                            filters +=  index === 0 ? `t eq '${tag}' ` : ` or t eq '${tag}' `;
                        });
                        filters += ')) ';
                    }
                    break;
                case 'minPrice':
                    filters = filters === '' ? '$filter=' : filters +  ' and ';
                    filters += `price gt ${items[key]}`;
                    break;
                case 'maxPrice':
                    filters = filters === '' ? '$filter=' : filters +  ' and ';
                    filters += `price lt ${items[key]}`;
                    break;
                case 'page':
                    paginations = `$count=true&$top=16&$skip=${((items[key] - 1) * 16)}&`;
                    break;
                case 'sortBy':
                    switch (items[key]) {
                        case 'a-z':
                            sorting = '$orderby=name asc &';
                            break;
                        case 'z-a':
                            sorting = '$orderby=name desc &';
                            break;
                        case 'high':
                            sorting = '$orderby=price asc &';
                            break;
                        case 'low':
                            sorting = '$orderby=price asc &';
                            break;
                    }
                    break;
            }
        }
        return (sorting + paginations + filters);
    }

    private generatePaginationSubUrl(items: any){
        let subUrl = '';
        for (const key in items){
            subUrl = subUrl === '' ? '$count=true&' : subUrl +  ' and ';
            switch (key) {
                // case '':
                //     subUrl += `price lt ${items[key]}`;
                //     break;
                // case 'page':
                //     subUrl += `price lt ${items[key]}`;
                //     break;
            }
        }
        return subUrl;
    }

    // Get Products
    public getProductById(id): Observable<ProductModel> {
        return this.http.get<ProductModel>(environment.urlBase + 'odata/product/' + id);
    }

    // Get Products By Slug
    public getProductBySlug(slug: string): Observable<Product> {
        return this.products.pipe(map(items => {
            return items.find((item: any) => {
                return item.title.replace(' ', '-') === slug;
            });
        }));
    }

    public getProductImage(imageId){
        // new Observable((observer) =>{
        //
        // })
    }

    /*
      ---------------------------------------------
      ---------------  Wish List  -----------------
      ---------------------------------------------
    */

    // Get Products
    public get getCategory(): Observable<CategoryModel[]> {
        if (this.categories.length > 0){
            return new Observable<CategoryModel[]> ((observer: any) => {
                observer.next(this.categories);
            });
        }else{
            return this.http.get<CategoryModel[]>(environment.urlBase + 'odata/category').pipe(map((data: any) => {
                this.categories = data.value;
                this.categories = this.categories.sort((a,b)=>a.displayOrder - b.displayOrder)
                return this.categories;
            }));
        }
    }

     // Get Product tags
     public get getProductTags(): Observable<ProductTag[]> {
        if (this.productTags.length > 0){
            return new Observable<ProductTag[]> ((observer: any) => {
                observer.next(this.productTags);
            });
        }else{
            return this.http.get<ProductTag[]>(environment.urlBase + 'odata/productTag').pipe(map((data: any) => {
                this.productTags = data;
                console.log(data);
                return data;           
            }));
        }
    }

    // private getCategories(){
    //     this.http.get<CategoryModel[]>(environment.urlBase + 'odata/category').pipe(map((data: any) => data.value)).subscribe((categories: CategoryModel[]) => {
    //         this.categories = categories;
    //     });
    // }

    /*
      ---------------------------------------------
      ---------------  Wish List  -----------------
      ---------------------------------------------
    */

    // Get Wishlist Items
    public get wishlistItems(): Observable<Product[]> {
        const itemsStream = new Observable(observer => {
            observer.next(state.wishlist);
            observer.complete();
        });
        return <Observable<Product[]>> itemsStream;
    }

    // Add to Wishlist
    public addToWishlist(product): any {
        const wishlistItem = state.wishlist.find(item => item.id === product.id);
        if (!wishlistItem) {
            state.wishlist.push({
                ...product
            });
        }
        this.toastrService.success('Product has been added in wishlist.');
        localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist));
        return true;
    }

    // Remove Wishlist items
    public removeWishlistItem(product: Product): any {
        const index = state.wishlist.indexOf(product);
        state.wishlist.splice(index, 1);
        localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist));
        return true;
    }

    /*
      ---------------------------------------------
      -------------  Compare Product  -------------
      ---------------------------------------------
    */

    // Get Compare Items
    public get compareItems(): Observable<Product[]> {
        const itemsStream = new Observable(observer => {
            observer.next(state.compare);
            observer.complete();
        });
        return <Observable<Product[]>> itemsStream;
    }

    // Add to Compare
    public addToCompare(product): any {
        const compareItem = state.compare.find(item => item.id === product.id);
        if (!compareItem) {
            state.compare.push({
                ...product
            });
        }
        this.toastrService.success('Product has been added in compare.');
        localStorage.setItem('compareItems', JSON.stringify(state.compare));
        return true;
    }

    // Remove Compare items
    public removeCompareItem(product: Product): any {
        const index = state.compare.indexOf(product);
        state.compare.splice(index, 1);
        localStorage.setItem('compareItems', JSON.stringify(state.compare));
        return true;
    }

    /*
      ---------------------------------------------
      -----------------  Cart  --------------------
      ---------------------------------------------
    */

    // Get Cart Items
    public get cartItems(): Observable<any[]> {
        const itemsStream = new Observable(observer => {
            observer.next(state.cart);
            observer.complete();
        });
        return <Observable<any[]>> itemsStream;
    }

    // Add to Cart
    public addToCart(product): any {
        const cartItem = state.cart.find(item => item.id === product.id);
        const qty = product.quantity ? product.quantity : 1;
        const items = cartItem ? cartItem : product;
        const stock = this.calculateStockCounts(items, qty);

        if (!stock) {
            return false;
        }

        if (cartItem) {
            cartItem.quantity += qty;
        } else {
            state.cart.push({
                ...product,
                quantity: qty
            });
        }

        this.OpenCart = true; // If we use cart variation modal
        localStorage.setItem('cartItems', JSON.stringify(state.cart));
        return true;
    }

    // Update Cart Quantity
    public updateCartQuantity(product: Product, quantity: number): Product | boolean {
        return state.cart.find((items, index) => {
            if (items.id === product.id) {
                const qty = state.cart[index].quantity + quantity;
                const stock = this.calculateStockCounts(state.cart[index], quantity);
                if (qty !== 0 && stock) {
                    state.cart[index].quantity = qty;
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cart));
                return true;
            }
        });
    }

    // Calculate Stock Counts
    public calculateStockCounts(product, quantity) {
        const qty = product.quantity + quantity;
        const stock = product.stock;
        if (stock < qty || stock == 0) {
            this.toastrService.error('You can not add more items than available. In stock ' + stock + ' items.');
            return false;
        }
        return true;
    }

    // Remove Cart items
    public removeCartItem(product: Product): any {
        const index = state.cart.indexOf(product);
        state.cart.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(state.cart));
        return true;
    }

    // Total amount
    public cartTotalAmount(): Observable<number> {
        return this.cartItems.pipe(map((product: Product[]) => {
            return product.reduce((prev, curr: Product) => {
                let price = curr.price;
                if (curr.discount) {
                    price = curr.price - (curr.price * curr.discount / 100);
                }
                return (prev + price * curr.quantity) * this.Currency.price;
            }, 0);
        }));
    }

    /*
      ---------------------------------------------
      ------------  Filter Product  ---------------
      ---------------------------------------------
    */

    // Get Product Filter
    public filterProducts(filter: any): Observable<Product[]> {
        return this.products.pipe(map(product =>
            product.filter((item: Product) => {
                if (!filter.length) {
                    return true;
                }
                const Tags = filter.some((prev) => { // Match Tags
                    if (item.tags) {
                        if (item.tags.includes(prev)) {
                            return prev;
                        }
                    }
                });
                return Tags;
            })
        ));
    }

    // Sorting Filter
    public sortProducts(products: Product[], payload: string): any {

        if (payload === 'ascending') {
            return products.sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });
        } else if (payload === 'a-z') {
            return products.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                } else if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        } else if (payload === 'z-a') {
            return products.sort((a, b) => {
                if (a.title > b.title) {
                    return -1;
                } else if (a.title < b.title) {
                    return 1;
                }
                return 0;
            });
        } else if (payload === 'low') {
            return products.sort((a, b) => {
                if (a.price < b.price) {
                    return -1;
                } else if (a.price > b.price) {
                    return 1;
                }
                return 0;
            });
        } else if (payload === 'high') {
            return products.sort((a, b) => {
                if (a.price > b.price) {
                    return -1;
                } else if (a.price < b.price) {
                    return 1;
                }
                return 0;
            });
        }
    }

    /*
      ---------------------------------------------
      ------------- Product Pagination  -----------
      ---------------------------------------------
    */
    public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 16) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // Paginate Range
        let paginateRange = 3;

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage: number, endPage: number;
        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage < paginateRange - 1) {
            startPage = 1;
            endPage = startPage + paginateRange - 1;
        } else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    //Brand
    public get getBrands(){
        return new Observable<ProductModel[]>((observer: any ) => {
            this.http.get<any>(environment.urlBase + 'odata/Brand').pipe(map(data => data.value)).subscribe((brands: Brand[]) => {
                this.brands = brands;
                observer.next(brands);
            });
        });
    }

        //Warehouse
        public get getWarehouses(){
            return new Observable<Warehouse[]>((observer: any ) => {
                this.http.get<any>(environment.urlBase + 'odata/Warehouse').pipe(map(data => data.value)).subscribe((warehouses: Warehouse[]) => {
                    this.warehouses = warehouses;
                    observer.next(warehouses);
                });
            });
        }

    //Attribute
    public get getAttributes(){
        return new Observable<ProductModel[]>((observer: any ) => {
            this.http.get<any>(environment.urlBase + 'odata/ProductAttribute').pipe(map(data => data.value)).subscribe((attributes: any) => {
                observer.next(attributes);
            });
        });
    }


        //Page
        public get getPages(){
            return new Observable<Page[]>((observer: any ) => {
                this.http.get<any>(environment.urlBase + 'odata/Page').pipe(map(data => data.value)).subscribe((pages: Page[]) => {
                    // this.pages = pages;
                    observer.next(pages);
                });
            });
        }

        public getPageById(id): Observable<Page> {
            return this.http.get<Page>(environment.urlBase + 'odata/Page/' + id);
        }

}
