import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/pages/account/contact/contact.service';
import { Picture } from 'src/app/shared/classes/picture';
import { PictureService } from 'src/app/shared/services/picture.service';
import { Order } from '../../../shared/classes/order';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  @ViewChild('myDiv') myDiv: ElementRef;
  
  public orderDetails : Order = {};
  public date: Date = new Date();
  public deliveryDate: Date = new Date();

  constructor(public productService: ProductService,
    private orderService: OrderService, 
    private pictureService: PictureService,
    private contactService: ContactService) { 
      this.deliveryDate.setDate(this.date.getDate()+7);
    }

  ngOnInit(): void {	
    this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);
  }

  ngAfterViewInit() {
    console.log("done");
    console.log(this.orderDetails);
    console.log(this.myDiv.nativeElement.innerHTML);
    setTimeout(() => {
      this.sendMail();
    }, 7000);
  }

  private sendMail() : void {
    var emailHtml = this.myDiv.nativeElement.innerHTML;

    var adminEmail = 'humayun.ju@gmail.com';
    var sendEmailModel = {
      email: this.orderDetails?.shippingDetails?.email, 
      ccEmails: [adminEmail],
      subject: 'Submitted Order Id: ' + this.orderDetails.orderId,
      body: emailHtml
    }

    console.log(sendEmailModel);
    this.contactService.sendMessage(sendEmailModel);
  }

  public getPictureUrl(pictures){
    let url = 'assets/images/product/placeholder.jpg';

    if(pictures.length > 0){
      const picture: Picture = this.pictureService.getProductImageUrl(pictures[0].pictureId);
      url = picture.url === undefined ? url : picture.url;
    }
    return url;
  }

}
