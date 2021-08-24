import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authImage'
})

export class AuthImagePipe implements PipeTransform {

  constructor(
    private http: HttpClient,
  ) {}

  async transform(src: string): Promise<string> {
    const headers = new HttpHeaders({Authorization: `Bearer ${localStorage.authorization}`});
    try {
      const imageBlob = await this.http.get(src, {headers, responseType: 'blob'}).toPromise();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageBlob);
      });
    } catch {
      return '';
    }

  }

}
