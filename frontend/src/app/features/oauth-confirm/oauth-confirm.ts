import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isValidUsername, sanitizeDisplayName } from '../../shared/validation';

@Component({
  selector: 'app-oauth-confirm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './oauth-confirm.html',
  styleUrl: './oauth-confirm.scss'
})
export class OAuthConfirm implements OnInit {
  googleData: any = null;
  
  username = '';
  email = '';
  displayName = '';
  googleId = '';

  error: string | null = null;
  loading = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.googleData = navigation?.extras.state?.['googleData'];
  }

  ngOnInit(): void {
    if (!this.googleData) {
      this.router.navigate(['/registro']);
      return;
    }

    this.email = this.googleData.email;
    this.username = this.googleData.username;
    this.displayName = this.googleData.displayName;
    this.googleId = this.googleData.googleId;
  }

  get isFormValid(): boolean {
    return isValidUsername(this.username);
  }

  onSubmit() {
    if (!this.isFormValid) return;

    this.loading = true;
    const safeDisplay = sanitizeDisplayName(this.displayName);

    this.http.post<any>('http://localhost:8080/api/oauth/register', {
      username: this.username,
      email: this.email,
      displayName: safeDisplay || this.username,
      googleId: this.googleId
    }).subscribe({
      next: (res) => {
        // Now it returns a pendingId for the email verification flow
        this.router.navigate(['/verify', res.pendingId]);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al procesar el registro';
      }
    });
  }
}
