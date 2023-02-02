import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Product, ProductModel} from '../../../../shared/classes/product';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-size',
    templateUrl: './size.component.html',
    styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

    @Input() size: any[] = [];

    @Output() sizeFilter: EventEmitter<any> = new EventEmitter<any>();

    public collapse = true;
    sizeOnQuery: string[] = [];

    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
            this.sizeOnQuery = [];
            for (const key in params) {
                if (key === 'size') {
                    const size = params[key];
                    if (Array.isArray(size)) {
                        size.forEach((sz => this.sizeOnQuery.push(sz)));
                    } else {
                        this.sizeOnQuery.push(size);
                    }
                }
            }
        });
    }

    ngOnInit(): void {
    }

    appliedFilter(sizeName) {
        const indexOfSizeOnQuery = this.sizeOnQuery.indexOf(sizeName);
        if (indexOfSizeOnQuery < 0) {
            this.sizeOnQuery.push(sizeName);
        } else {
            this.sizeOnQuery.splice(indexOfSizeOnQuery);
        }
        this.sizeFilter.emit({size: this.sizeOnQuery});
    }


    // check if the item are selected
    checked(item) {
        if (this.size.indexOf(item) != -1) {
            return true;
        }
    }

}
