import { Component, OnInit, Input } from '@angular/core';
import {PageService} from "../../services/page.service";

@Component({
  selector: 'app-footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss']
})
export class FooterOneComponent implements OnInit {

  @Input() class: string = 'footer-light' // Default class 
  @Input() themeLogo: string = 'assets/images/icon/logo.jpg' // Default Logo
  @Input() newsletter: boolean = false; // Default True

  public today: number = Date.now();

  constructor(public pageService: PageService) { }

  ngOnInit(): void {
  }

}
