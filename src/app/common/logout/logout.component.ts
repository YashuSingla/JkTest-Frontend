import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  router = inject(Router);
  authService = inject(AuthService);
  async logout() {
    // Example: clear token, redirect to login
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

}
