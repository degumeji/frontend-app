import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.authApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post(this.apiUrl + '/login', credentials, { responseType: 'text' })
      .pipe(
        tap((token: string) => {
          var cleanToken = token.replace(/"/g, '').trim();
          cleanToken = cleanToken.replace("{token:",'');
          cleanToken = cleanToken.replace("}",'');

          console.log('Token LIMPIO:', cleanToken);
          localStorage.setItem('authToken', cleanToken);
        })
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
