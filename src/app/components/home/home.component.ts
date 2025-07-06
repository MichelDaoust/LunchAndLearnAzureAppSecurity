import { InteractionType, SilentRequest } from '@azure/msal-browser';

import { AppConfigService } from '../../services/app-config.service';
import { CallAPIService } from '../../services/callAPIService.service';
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {

  tokenReceived: string = '';
  apiResult : string = '';
  blobContent : string = '';

  constructor(private authService: MsalService, private config: AppConfigService, private readonly dataService: CallAPIService) { }

  logout2() {
    console.log('logout called');
    this.authService.logoutRedirect({
      postLogoutRedirectUri: this.config.getConfig().postLogoutUrl,
    });
  }


  accessTokenDefault() {

    if (this.authService.instance.getAllAccounts().length > 0)
        this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0]);
    
    const account = this.authService.instance.getActiveAccount();

    if (!account) {
      console.warn('Aucun compte actif');
      return;
    }

    const request: SilentRequest = {
      scopes: ['bcf02653-e0d8-4bea-9e8c-f4fb22cc2daf/.default'],
      account
    };

    this.authService.acquireTokenSilent(request).subscribe({
      next: (result) => {
        this.tokenReceived = result.accessToken;
        console.log('Access token:', result.accessToken); // <- voici le JWT
      },
      error: (error) => {
        console.error('Erreur de récupération du jeton:', error);
      }
    });
  }

  accessTokenContributor() {

    if (this.authService.instance.getAllAccounts().length > 0)
        this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0]);
    
    const account = this.authService.instance.getActiveAccount();

    if (!account) {
      console.warn('Aucun compte actif');
      return;
    }

    const request: SilentRequest = {
      scopes: ['api://bcf02653-e0d8-4bea-9e8c-f4fb22cc2daf/contributor'],
      account
    };

    this.authService.acquireTokenSilent(request).subscribe({
      next: (result) => {
        this.tokenReceived = result.accessToken;
        console.log('Access token:', result.accessToken); // <- voici le JWT
      },
      error: (error) => {
        console.error('Erreur de récupération du jeton:', error);
      }
    });
  }

  accessTokenReader() {

    if (this.authService.instance.getAllAccounts().length > 0)
        this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0]);
    
    const account = this.authService.instance.getActiveAccount();

    if (!account) {
      console.warn('Aucun compte actif');
      return;
    }

    const request: SilentRequest = {
      scopes: ['api://bcf02653-e0d8-4bea-9e8c-f4fb22cc2daf/reader'],
      account
    };

    this.authService.acquireTokenSilent(request).subscribe({
      next: (result) => {
        console.log('Access token:', result.accessToken); // <- voici le JWT
        this.tokenReceived = result.accessToken;

      },
      error: (error) => {
        console.error('Erreur de récupération du jeton:', error);
      }
    });
  }

  accessTokenOtherAPI() {

    if (this.authService.instance.getAllAccounts().length > 0)
        this.authService.instance.setActiveAccount(this.authService.instance.getAllAccounts()[0]);
    
    const account = this.authService.instance.getActiveAccount();

    if (!account) {
      console.warn('Aucun compte actif');
      return;
    }

    const request: SilentRequest = {
      scopes: ['api://b537fe5e-366d-4e53-a8cf-44c64b3f765e/RegApp2.Read'],
      account
    };

    this.authService.acquireTokenSilent(request).subscribe({
      next: (result) => {
        this.tokenReceived = result.accessToken;
        console.log('Access token:', result.accessToken); // <- voici le JWT
      },
      error: (error) => {
        console.error('Erreur de récupération du jeton:', error);
      }
    });
  }

  
callMainAPI(){
 this.dataService.callAPI1(this.tokenReceived).subscribe( 
          (response) => {
            this.apiResult = JSON.stringify(response)
            ;
            console.log('Data fetched successfully:', this.apiResult);
          },
          (error) => {
            this.apiResult = "error"
            console.error('Error fetching data:', "error");
          }
        );
}
  
callMainAPIStorageGet(){
 this.dataService.callStorageGet(this.tokenReceived).subscribe ({ 
          next: (result) => {
            this.blobContent = result.bContent
            ;
            console.log('Data fetched successfully:', this.blobContent);
          },
          error : (error) => {
            this.blobContent = "error"
            console.error('Error fetching data blob:', "error");
          }
});

        
      }

}
