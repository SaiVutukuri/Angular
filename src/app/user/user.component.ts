import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData="";
  userFirstname="";
  userLastname="";
  userRole="";
  userEmail="";
  userPassword="";
  userId:number |undefined;
  updatepassword="";
  courses="";
  allUsers: any;
  allCourses:any;

  constructor(private backendService:BackendService,private router: Router,
    private httpClient: HttpClient) { 
    
  }
  
  ngOnInit(): void {
    this.userFirstname=this.backendService.getData().firstName;
    this.userId=this.backendService.getData().userId;
    this.userLastname=this.backendService.getData().lastName;
    this.userRole=this.backendService.getData().role;
    this.userEmail=this.backendService.getData().email;
    this.userPassword=this.backendService.getData().password;
    
    this.httpClient.get<any>(this.backendService.getAllUsers).subscribe(userdata => {
      this.allUsers = userdata;
      console.log(this.allUsers);
    });

    this.httpClient.get<any>(this.backendService.getStatusByLive).subscribe(coursesrdata => {
      this.allCourses = coursesrdata;
      console.log(this.allCourses);
    });
  }

  homePage(){
    this.router.navigate([`${'login'}`]);
  }
  
  updatePassword(){
    console.log(this.updatepassword);
    console.log(this.backendService.getData());
    this.httpClient.put<any>(this.backendService.upDateUser, { 
    userId: this.backendService.getData().userId,
    firstName: this.backendService.getData().firstName,
    lastName: this.backendService.getData().lastName,
    role:this.backendService.getData().role,
    email: this.backendService.getData().email,
    password: this.updatepassword
   }).subscribe(data => {
     console.log(data);
      this.homePage();
      
    });
  }
  requestCourses(){
    console.log(this.courses);
    this.httpClient.post<any>(this.backendService.addCourses, {
      courses: this.courses,
      status: "pending"
    }).subscribe(data => {
      console.log(data);
      // this.homePage();
    });
  }

}
