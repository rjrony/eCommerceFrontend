import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../shared/services/page.service";

@Component({
    selector: 'app-dynamic-page',
    template: '<div class="container"><div [innerHTML]="content"></div> </div>',
})
export class DynamicPageComponent implements OnInit {
    content = '';
    constructor(private route: ActivatedRoute, private pageServcie: PageService, private router: Router) {
        this.router.events.subscribe((val) => this.setView());
    }

    ngOnInit(): void {
    }
    setView(){
        if (this.pageServcie.pages.length > 0 ){
            this.pageServcie.pages.forEach((page) => {
                if (this.route.snapshot.params.page === page.seName){
                    this.content = page.body;
                }
            });
        }else {
            setTimeout(() => {
                this.setView();
            }, 100);
        }
    }
}
