import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  sendMessage(data: any){
    const url = 'api/Email/Send';

    this.http.post<any>(environment.urlBase + url, data).subscribe({
      next: data => {
        console.log('Email sent!');
        alert('Email sent!');
      },
      error: error => {
          console.error('There was an error!', error);
          alert('There was an error! Please try again.');
      }
  })
  }
}
