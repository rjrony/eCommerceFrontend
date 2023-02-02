import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact/contact.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {
  
  constructor(private service: ContactService) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    var emailHtml = '<table>';
    for (const property in form) {
      emailHtml += `<tr><td style="text-align:right; text-transform: capitalize"><b>${property}</b>:</td><td> ${form[property]}</td></tr>`;
    }
    emailHtml += '</table>';

    var sendEmailModel = {
      email: 'humayun.ju@gmail.com',
      subject: 'Service form submitted by ' + form.voornaam,
      body: emailHtml
    }

    this.service.sendMessage(sendEmailModel);
  }
}
