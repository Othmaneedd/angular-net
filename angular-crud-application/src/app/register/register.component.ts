import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  message = '';

  constructor(private loginService: LoginService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Les mots de passe ne correspondent pas';
      return;
    }
    this.loginService.register(this.username, this.password).subscribe({
  next: (res) => {
    console.log('Réponse du backend:', res); // ← important
    this.message = 'Inscription réussie. Vous pouvez maintenant vous connecter.';
    this.router.navigate(['/login']);
  },
  error: (err) => {
    console.error('Erreur backend :', err); // ← ici aussi
    this.message = 'Erreur lors de l\'inscription. Essayez à nouveau.';
  }
});

  }
}
