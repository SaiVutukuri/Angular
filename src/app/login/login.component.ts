import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  responceData: any;
  data: any;
  getEmail = "";
  getPassword = "";
  submitStatus=false;
  // submitForm=false;
  constructor(private router: Router,
    private httpClient: HttpClient,
    private backendService: BackendService) { }

  ngOnInit(): void {
  }
  goToRegister(register: string): void {
    this.router.navigate([`${register}`])
  }

  checkLogin() {
    this.submitStatus=false;
    // this.submitForm=true;
    console.info("email: " + this.getEmail);
    console.info("password: " + this.getPassword);
    {
      this.httpClient.post<ResponseData>(this.backendService.loginURL, { email: this.getEmail, password: this.getPassword }).subscribe(data => {
        // this.Userid = data.userId;
        if (data == null) {
          console.log("error...");
          this.submitStatus=true;
        }
        // console.info(data);
        // this.responceData=data;

        if (data.role == "admin") {
          this.backendService.setData(data);
          this.router.navigate([`${'admin'}`]);

        } else {
          this.backendService.setData(data);
          this.router.navigate([`${'user'}`])
        }
      })
    }
    interface ResponseData {
      userId: number;
      firstName: string;
      lastName: string;
      role: string;
      email: string;
      password: string;
    }
  }
}
