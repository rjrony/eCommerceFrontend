import { Component, OnInit } from '@angular/core';
import {ContactService} from './contact.service';
import {fromArray} from 'rxjs/internal/observable/fromArray';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private service: ContactService) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    // console.log(form);
    // const contactFormData = {
    //   voornaam: form.voornaam,
    //   achternaam: form.achternaam,
    //   telefoon: form.telefoon,
    //   email: form.email,
    //   ordernummer: form.ordernummer,
    //   onderwerp: form.onderwerp,
    //   opmerking: form.opmerking,
    //   senderEmail: 'humayun.ju@gmail.com'
    // };

    var emailHtml = '<table>';
    for (const property in form) {
      emailHtml += `<tr><td style="text-align:right; text-transform: capitalize"><b>${property}</b>:</td><td> ${form[property]}</td></tr>`;
    }
    emailHtml += '</table>';

    var sendEmailModel = {
      email: 'humayun.ju@gmail.com',
      subject: 'Contact form submitted by ' + form.voornaam,
      body: emailHtml
    }

    this.service.sendMessage(sendEmailModel);
  }
}
