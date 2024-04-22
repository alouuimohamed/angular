import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      role: ['USER', [Validators.required]], // Initialise le rôle à USER par défaut
    });
  }
  emailExistsAlert: boolean = false;
  submitForm() {
    console.log(this.registerForm.value);
    // Appeler votre service pour envoyer les données du formulaire au backend
    this.service.register(this.registerForm.value).subscribe(
      (response) => {
        console.log(response);
        // Si la réponse contient un message d'erreur, l'afficher dans le front-end
        if (response && response.statusCode === 400) {
          // Afficher le message d'erreur dans le front-end
          alert(response.message); // Vous pouvez utiliser une autre méthode pour afficher l'alerte
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
