import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/User';
import { map, Observable } from 'rxjs';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(private http:HttpClient) { }

  registerMode:boolean=false;

 login(user:any):Observable<void>
 {
    this.registerMode=false;
    return this.http.post<User>('https://localhost:7164/api/Users/login', user).pipe(
      map((response:User)=>
      {
        const user=response;
        if(user)
        {
          this.setCurrentUser(user);
        }
      }
      )
    );
 }

 setCurrentUser(user:User)
  {
    
    localStorage.setItem('user',JSON.stringify(user));
    
    
  }

   public currentUser()
   {
    const user = localStorage.getItem('user');
    if (user) {
      return true; 
    }
    return false;
   }


  getCurrentUser(): Observable<User | null> {
    const user = localStorage.getItem('user');
    if (user) {
      return of(JSON.parse(user)); 
    }
    return of(null); 
  }
  
  
  logout()
  {
    localStorage.removeItem('user');
    this.registerMode=true; 
   
  }

  register(user: any): Observable<any> {  
    this.registerMode=false; 
    return this.http.post<User>('https://localhost:7164/api/Users', user);
  }
  
}
