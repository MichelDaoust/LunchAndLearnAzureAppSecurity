import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root'
})
export class CallAPIService {
  private readonly httpClient: HttpClient;

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

   callAPI1(token: string): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const data = this.httpClient.get('https:/localhost:7163/MainAPI', {headers});
      return data;
  }

   callStorageGet(token: string): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const data = this.httpClient.get('https://localhost:7163/MainAPI/storage/Get', {headers});
      return data;
  }


     callKeyVaultSecret(token: string): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const data = this.httpClient.get('https://localhost:7163/MainAPI/keyVault/GetSecret', {headers});
      return data;
  }

  
}
