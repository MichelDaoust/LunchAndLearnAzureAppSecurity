import { InteractionType, SilentRequest } from '@azure/msal-browser';

import { AppConfigService } from '../../services/app-config.service';
import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: MsalService, private config: AppConfigService) { }

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
      },
      error: (error) => {
        console.error('Erreur de récupération du jeton:', error);
      }
    });
  }


  
}
