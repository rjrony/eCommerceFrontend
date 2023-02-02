import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class PageService{
    pages = [];

    constructor(private http: HttpClient) {
        this.getPages();
    }

    public getPages(){
        this.http.get<any>(environment.urlBase + 'odata/Page').pipe(map(data => data.value)).subscribe((pages: any[]) => {
            this.pages = pages;
        });
    }
    public getMenuItemsFooterOne(){
        return this.pages.filter(page => page.includeInFooterRow1);
    }
    public getMenuItemsFooterTwo(){
        return this.pages.filter(page => page.includeInFooterRow2);
    }
    public getMenuItemsFooterThree(){
        return this.pages.filter(page => page.includeInFooterRow3);
    }
    public getMenuItems(){
        return this.pages.filter(page => page.includeInMenu);
    }
}