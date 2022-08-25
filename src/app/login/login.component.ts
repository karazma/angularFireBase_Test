import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata = { name: "", email: "", password: "" };
  submit = false;
  errorMessage = "";
  loading = false;

  constructor(private auth:AuthService) { }

  imageSrc = 'assets/img/logoLemmel.png'

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit() {
    console.log(this.formdata);
    this.loading=true;
    this.auth.login(this.formdata.email, this.formdata.password)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken);
        console.log("Login idToken is"+ data.idToken);
        this.auth.canAuthenticate();
      },
      error:data=>{
        if(data.error.error.message=="INVALID_EMAIL" || data.error.error.message=="INVALID_PASSWORD"){
          this.errorMessage="Invalid the Credentials!";
        }
        else{
          this.errorMessage="Unknown error message occured while creating this account!!!";
        }
      }
    })
    .add(()=>{
      this.loading=false;
      console.log("Login Successfully");
      
    })
  }
}
