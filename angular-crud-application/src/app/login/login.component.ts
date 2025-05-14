import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  isLoading = false;
  message = '';
  isSuccess = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    if (!this.username || !this.password) {
      this.message = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.message = '';

    this.loginService.login(this.username, this.password).subscribe({
      next: (response: any) => {
  const body = response.body;  // Ajoute ceci

  this.isSuccess = true;
  this.message = body.message;

  if (body.token) {
    localStorage.setItem('token', body.token);
  }

  setTimeout(() => {
    this.router.navigate(['/users-list']);
  }, 1500);


      },
      error: (error: any) => {
        this.isSuccess = false;
        this.message = error.error?.message || 'Nom d\'utilisateur ou mot de passe incorrect';
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
