import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string | undefined;
  lastName: string | undefined;
  role="user";
  email: string | undefined;
  password: string | undefined;
  cpassword: string | undefined;
  registerStatus=false;
  constructor(
    private httpClient: HttpClient,
    private backendService: BackendService,
    private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.registerStatus=false;
    console.log(this.firstName, this.lastName, this.role, this.email, this.password);
    if (this.password == this.cpassword) {
      this.httpClient.post<any>(this.backendService.registerURL, {
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
        email: this.email,
        password: this.password
      }).subscribe(data => {
        if (data == null) {
          this.registerStatus=true;
        }
        if(data.userId!=null){
          this.router.navigate([`${'login'}`])
        }
      })
    }else{
      alert("The password and confirmation password do not match.");
    }
  }
  clickEmail(){
    this.registerStatus=false;
  }
}
