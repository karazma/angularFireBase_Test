import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formdata = {name: "", email:"", password:""};
  submit=false; 
  errorMessage="";
  loading=false;

  constructor(private auth:AuthService) { }

  imageSrc = 'assets/img/logoLemmel.png'; 

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(){    
    console.log(this.formdata);
    this.loading=true;
    this.auth.register(this.formdata.name, this.formdata.email, this.formdata.password)
    .subscribe({
      next:data=>{
        //Store the response token in Browser
        this.auth.storeToken(data.idToken);
        console.log("Registerd idToken is"+ data.idToken);
        this.auth.canAuthenticate();
      },
      error:data=>{
        if(data.error.error.message=="INVALID_EMAIL"){
          this.errorMessage="Invalid Mail address";
        }
        else if(data.error.error.message == "EMAIL_EXISTS")
        {
          this.errorMessage="Email already exists!!";
        }
        else{
          this.errorMessage="Unknown error message occured while creating this account!!!";
        }
      }
    }).add(()=>{
      this.loading = false;
      console.log("Registered process Completed!");
    });
  }
}
