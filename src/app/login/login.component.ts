import { Component, OnInit } from '@angular/core';
import { AngularFireAuth,AngularFireAuthModule } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { auth } from 'firebase/app';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  state: string = '';
  error: any;
  constructor(private afs: AngularFirestore ,private router: Router,private _auth: AuthserviceService) { 
    if(_auth.isLogin()){
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      let record = this.afs.collection('Users');
      let query = record.ref.where('email','==',formData.value.email).where('password','==',formData.value.password)
          .get().then((querySnapshot) => {
            if(querySnapshot.docs.length>0){
              querySnapshot.forEach((doc) => {
                if(doc.id.length>0){
                  this._auth.storeSession(doc);
                }
              });
          } else {
            console.log("Record not Found!");
            this.error = 'Credentials Not Matched!';
          }
       })
       .catch(function(error) {
         console.log("Error getting documents: ", error);
        });
    }
  }  
}
