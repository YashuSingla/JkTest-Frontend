import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  providers: [AuthService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    google.accounts.id.initialize({
      client_id: environment.googleClientId, // put client_id in environment.ts
      callback: this.handleGoogleSignIn.bind(this)
    });

    google.accounts.id.renderButton(
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large' }
    );
    if(this.auth.isLoggedIn()) {
      this.router.navigate(['/posts']);
    }
  }

  async handleGoogleSignIn(response: { credential: string }) {
    try {
      console.log('Google sign-in credential:', response.credential);

      await this.auth.loginWithGoogle(response.credential);
      this.router.navigate(['/posts']);
    } catch (err) {
      console.error('Login failed:', err);
    }
  }
}
