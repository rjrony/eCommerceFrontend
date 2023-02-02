import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import {ProductService} from '../../../../shared/services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  @Input() colors: any[] = [];
  @Output() colorsFilter : EventEmitter<any> = new EventEmitter<any>();
  public collapse = true;
  colorsOnQuery: string[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.colorsOnQuery = [];
      for (const key in params) {
        if (key === 'color') {
          const colors = params[key];
          if (Array.isArray(colors)) {
            colors.forEach((color => this.colorsOnQuery.push(color)));
          } else {
            this.colorsOnQuery.push(colors);
          }
        }
      }
    });
  }

  ngOnInit(): void {
  }

  get filterbycolor() {
    const uniqueColors = [];
    return uniqueColors;
  }

  appliedFilter(colorName) {
    const indexOfColorOnQuery = this.colorsOnQuery.indexOf(colorName);
    if ( indexOfColorOnQuery < 0){
      this.colorsOnQuery.push(colorName);
    }else {
      this.colorsOnQuery.splice(indexOfColorOnQuery);
    }
    this.colorsFilter.emit({color: this.colorsOnQuery});
  }

  // check if the item are selected
  checked(item){
    if(this.colors.indexOf(item) != -1){
      return true;
    }
  }

}
