import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAccountService } from '../user-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {

  isLoggenIn:boolean=false;
  loginForm: FormGroup;
  submitted = false;

     constructor(private formBuilder: FormBuilder,private userService:UserAccountService,private router:Router)
     {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.required]]
          
      },);

      this.isLoggenIn=userService.currentUser();
    
     }


onSubmit() 
{
  this.submitted = true;
  
  if (this.loginForm.valid) 
    {
      const loginData = {
        userName: this.loginForm.value.username,
        passwordHash: this.loginForm.value.password 
      };

      this.userService.login(loginData).subscribe({
        next:_  => {
          this.isLoggenIn = true;
          this.router.navigateByUrl('/taskform')
          
        },
       
        
      });
    }
}

logout() {
  this.isLoggenIn = false;
  this.userService.logout();
 
}
}
