import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/User';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {


  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private userService:UserAccountService) {

    

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$') 
        ]
      ],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    }, {
      validator: this.matchPasswords('password', 'confirmPassword')
    });

  }

  
  matchPasswords(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];
      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }
      confirmPassControl.setErrors(
        passControl.value !== confirmPassControl.value ? { mustMatch: true } : null
      );
    };
  }

  
  onSubmit() {
    this.submitted = true;
  

    if (this.registerForm.valid) {

      const registerData = {
        userName: this.registerForm.value.username,
        email: this.registerForm.value.email,
        passwordHash: this.registerForm.value.password
      };


      this.userService.register(registerData).subscribe({
        next: () => {
        },
       
      });
    }
  }
}
