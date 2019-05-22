/// <reference path="../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../node_modules/@types/gapi.auth2/index.d.ts" />
/// <reference path="../../node_modules/@types/gapi.client/index.d.ts" />

import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GAPIService {
  private readonly url: string = 'https://apis.google.com/js/api.js';
  private loaded = false;

  private loadGapi(): Observable<void> {
    return new Observable((observer: Observer<void>) => {
      if (this.loaded) {
        observer.next();
        observer.complete();
        return;
      }
      const node = document.createElement('script');
      node.src = this.url;
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);
      node.onload = () => {
        this.loaded = true;
        observer.next();
        observer.complete();
      };
      node.onerror = (error) => {
        observer.error(error);
      };
    });
  }

  public async initClient(baseScopes: string[] = ['email']) {
    await this.loadGapi().toPromise();
    return new Promise<void>(async (resolve, reject) => {
      try {
        const initClient = async (error) => {
          if (error) {
            return reject(error);
          }
          try {
            await gapi.client.init({
              apiKey: environment.firebase.apiKey,
              clientId: environment.firebase.clientId,
              scope: baseScopes.join(' ')
            });
            return resolve();
          } catch (error) {
            return reject(error);
          }
        }
        gapi.load('client:auth2', initClient);
      } catch (error) {
        return reject(error);
      }
    });
  }
}