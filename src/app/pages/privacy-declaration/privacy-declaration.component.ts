import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/shared/classes/Page';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-privacy-declaration',
  templateUrl: './privacy-declaration.component.html',
  styleUrls: ['./privacy-declaration.component.scss']
})
export class PrivacyDeclarationComponent implements OnInit {

  private pageId: string;
  public page: Page = new Page();
  constructor(private route: ActivatedRoute, private router: Router,
    public productService: ProductService) { }

  ngOnInit(): void {
    this.getPage();
  }

  private getPage(){
    this.pageId='625d94a93e0586e5db64bc48';
    this.productService.getPageById(this.pageId).subscribe(page => {
      console.log(page);
      if(!page) { // When product is empty redirect 404
        this.router.navigateByUrl('/pages/404', {skipLocationChange: true});
      } else {
        this.page = page;

      }
    });
  }

}
