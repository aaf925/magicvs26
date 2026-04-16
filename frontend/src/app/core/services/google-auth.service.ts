import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private readonly CLIENT_ID = '676945457635-7pqnrpq4gebcph27b300jgr6ce70jfra.apps.googleusercontent.com';
  private readonly authUrl = 'http://localhost:8080/api/oauth/google';
  private currentSource: 'login' | 'register' = 'login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  private showRegisterPromptSource = new Subject<any>();
  showRegisterPrompt$ = this.showRegisterPromptSource.asObservable();

  /**
   * INICIA EL FLUJO DE REDIRECCIÓN (OAuth2 Implicit Flow)
   * Esto garantiza un botón 100% genérico y controlado por nosotros en el HTML.
   */
  loginWithGoogleRedirect(source: 'login' | 'register' = 'login') {
    this.currentSource = source;
    localStorage.setItem('google_auth_source', source);

    const state = Math.random().toString(36).substring(2);
    const nonce = Math.random().toString(36).substring(2);
    localStorage.setItem('google_auth_state', state);

    // Usamos una URL de redirección fija para que solo tengas que registrar una en Google Console
    const redirectUri = window.location.origin + '/login';

    const url = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${this.CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=id_token&` +
      `scope=openid%20email%20profile&` +
      `state=${state}&` +
      `nonce=${nonce}`;

    window.location.href = url;
  }

  /**
   * PROCESA EL TOKEN RECIBIDO POR URL (Fragmento #id_token=...)
   */
  handleRedirectResult(idToken: string) {
    const savedSource = localStorage.getItem('google_auth_source') as 'login' | 'register';
    if (savedSource) {
      this.currentSource = savedSource;
    }
    this.handleCredentialResponse({ credential: idToken });
  }

  /**
   * Initializes the Google One Tap / Button SDK
   */
  initGoogleAuth(elementId: string, source: 'login' | 'register' = 'login') {
    this.currentSource = source;
    if (typeof google === 'undefined') {
      setTimeout(() => this.initGoogleAuth(elementId), 100);
      return;
    }

    google.accounts.id.initialize({
      client_id: this.CLIENT_ID,
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      document.getElementById(elementId),
      { 
        theme: 'outline', 
        size: 'large', 
        width: '240', // Set to < 280 to disable "Personalization" (showing account name)
        text: 'signin_with', 
        shape: 'rectangular',
        logo_alignment: 'center' 
      }
    );
  }

  private handleCredentialResponse(response: any) {
    const idToken = response.credential;
    
    this.http.post<any>(this.authUrl, { idToken }).subscribe({
      next: (res) => {
        this.ngZone.run(() => {
          if (res.isNewUser) {
            if (this.currentSource === 'login') {
              // On Login page, we Emit an event instead of redirecting immediately
              this.showRegisterPromptSource.next(res);
            } else {
              // Direct from Register, just go to confirmation
              this.router.navigate(['/register/confirm'], { 
                state: { googleData: res } 
              });
            }
          } else {
            // Existing user logged in successfully
            localStorage.setItem('user', JSON.stringify(res));
            if (res.token) {
              localStorage.setItem('token', res.token);
              localStorage.setItem('authToken', res.token);
            }
            this.router.navigate(['/']);
          }
        });
      },
      error: (err) => {
        console.error('Google Auth Error:', err);
      }
    });
  }
}
