import { Component } from '@angular/core';
import { UserAccountService } from '../user-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(public userService:UserAccountService,private router:Router)
  {}

  isDropdownOpen = false; // Track if the dropdown is open

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
   // this.isLoggenIn = false;
    this.userService.logout(); 
    this.router.navigateByUrl('/taskform');
  }

  

}
