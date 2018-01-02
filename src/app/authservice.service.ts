import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
// import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthserviceService {

  constructor(private router: Router) { }

  isLogin(){
    if(localStorage.getItem('session_key')){
     return true;
    }
     return false;

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);    
  }

  storeSession(doc){
    localStorage.setItem('session_key',doc.id);
    localStorage.setItem('user',Object.values(doc.data())[2]);
    this.router.navigate(['/dashboard']);    
  }
  

}
