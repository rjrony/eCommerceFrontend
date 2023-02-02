import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ProductService} from './product.service';
import {CategoryModel} from '../classes/category';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})
export class NavService {

	constructor(private productService: ProductService) {
		this.getCategory();
	}

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [];

	LEFTMENUITEMS: Menu[] = [];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

	getCategory(){
		this.productService.getCategory.subscribe((categories: CategoryModel[]) => {
			this.populateMenu(categories);
		});
	}

	populateMenu(categoreis){
		const parentcategories = categoreis.filter(x => x.parentCategoryId === '');
		parentcategories.forEach((category) => {
			category.childCategories = [];
			const menu: Menu = {
				path: '/shop/collection/left/sidebar',
				title: category.name, active: false,
				type: '',
				children: []
			};
			this.MENUITEMS.push(menu);
			this.LEFTMENUITEMS.push(menu);
			this.pupulateChildCategories(category, categoreis, menu);
			menu.type = (category.childCategories.length > 0) ? 'sub' : 'link';
		});
		console.log(parentcategories);
	}

	pupulateChildCategories(parentCategory, categories, parentMenu){
		categories.forEach((category) => {
			if (category.parentCategoryId === parentCategory.id){
				category.childCategories = [];
				parentCategory.childCategories.push(category);
			}
		});
		parentCategory.childCategories.forEach(category => {
			const menu: Menu = {
				path: '/shop/collection/left/sidebar',
				title: category.name, active: false,
				type: '',
				children: []
			};
			parentMenu.children.push(menu);
			this.pupulateChildCategories(category, categories, menu);
			if (category.childCategories.length === 0){
				menu.type = 'link';
				delete  menu.children;
			}
		});
	}
}
