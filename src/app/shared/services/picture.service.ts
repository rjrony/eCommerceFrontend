import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import {Picture} from '../classes/picture';

@Injectable({
    providedIn: 'root'
})
export class PictureService {
    pictures: Picture[] = [];
    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    }

    public getProductImageUrl(pictureId): Picture{
        let pictureObj;
        this.pictures.forEach( picture => {
            if(picture.id === pictureId) pictureObj = picture;
        });
        if(pictureObj === undefined){
            pictureObj = new Picture();
            pictureObj.id = pictureId;
            this.pictures.push(pictureObj);
            this.http.get<Picture>(environment.urlBase + 'odata/Picture/' + pictureId).subscribe((data: Picture) => {
                const blob = this.Base64ToBlob(data.pictureBinary, data.mimeType);
                const url = window.URL ;
                const link = url.createObjectURL(blob);
                pictureObj.url  = this.sanitizer.bypassSecurityTrustUrl(link);
            });
        }
        return pictureObj;
    }
    private getExistingPicture(pictureId: string){
        let pictureObj;
        this.pictures.forEach( picture => {
            if(picture.id === pictureId) pictureObj = picture;
        });
        if(pictureObj === undefined){
            pictureObj = new Picture();
            pictureObj.id = pictureId;
            this.http.get<Picture>(environment.urlBase + 'odata/Picture/' + pictureId).subscribe((data: Picture) => {
                const blob = this.Base64ToBlob(data.pictureBinary, data.mimeType);
                const url = window.URL ;
                const link = url.createObjectURL(blob);
                pictureObj.url  = this.sanitizer.bypassSecurityTrustUrl(link);
                this.pictures.push(pictureObj);
            });
        }
        return pictureObj;
    }

    public Base64ToBlob(base64: any, mimetype: any) {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: mimetype});
        return blob;
    }

    getPictureUrl(pictures) {
        let url = 'assets/images/product/placeholder.jpg';
        const pictureId = (Array.isArray(pictures) && pictures.length>0) ? pictures[0].pictureId : undefined;
        if (pictureId === undefined){
            return url;
        }
        const picture: Picture = this.getProductImageUrl(pictureId);
        url = picture.url === undefined ? url : picture.url;
        return url;
    }
}
