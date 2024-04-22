import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      adress: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.updateForm.valid) {
      const { name, adress, phone } = this.updateForm.value;
      const updateRequest = { name, adress, phone };

      this.jwtService.updateProfile(updateRequest).subscribe(
        (response) => {
          console.log(response); 
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}