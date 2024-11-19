import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  ngOnInit(): void
  {
    
  }
 
   constructor(private router:Router,public userService:UserAccountService)
   {
    
   }
 
  registerMode=false;
   
  cancelRegisterMode(event:boolean)
  {
       this.registerMode=event;
  }

  registerToggle()
  {
    this.userService.registerMode=!this.userService.registerMode
    this.router.navigateByUrl('/register');
  }

}