import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup ;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }
  submitForm() {
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response && response.token != null) {
          console.log("Login successful. Token:", response.token);
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('role',response.role)
          // Vérifier le rôle de l'utilisateur
          if (response.role === 'ADMIN') {
            this.router.navigateByUrl('/dashboard');

            // Afficher un message spécifique pour l'administrateur
            console.log("Bonjour Admin!");
          } else if (response.role === 'USER') {
            // Afficher un message spécifique pour l'utilisateur
            console.log("Bonjour User!");
            this.router.navigateByUrl('/accueil');

          } else {
            // Afficher un message par défaut si le rôle n'est pas défini
            console.log("Bonjour!");
          }
          // Ajoutez du code pour naviguer vers une autre page si nécessaire
        } else {
          console.log("Login failed. Response:", response);
          // Afficher un message d'erreur sur le front-end si nécessaire
        }
      },
      (error) => {
        console.error("Login error:", error);
        // Afficher un message d'erreur sur le front-end si nécessaire
      }
    );
  }
}
