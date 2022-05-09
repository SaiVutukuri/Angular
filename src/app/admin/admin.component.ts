import { AbstractType, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  userData = "";
  userFirstname = "";
  userLastname = "";
  userRole = "";
  userEmail = "";
  userPassword = "";
  userId: number | undefined;
  allUsers: any;
  allAdmins: any;
  allCourses: any;
  getId: any;
  getCourseId: any;
  getcId:any;
  getcourses:any;
  showID: number | undefined;
  showFirstName: string | undefined;
  showLastName: string | undefined;
  showRole: string | undefined;
  showEmail: string | undefined;
  showUpdateRole = true;
  ifAdmin=true;
  ifUser=true;
  ifDelete=true;
  searchStatus=false;
  CourseStatus=false;
  constructor(private httpClient: HttpClient,
    private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.userFirstname = this.backendService.getData().firstName;
    this.userId = this.backendService.getData().userId;
    this.userLastname = this.backendService.getData().lastName;
    this.userRole = this.backendService.getData().role;
    this.userEmail = this.backendService.getData().email;
    this.userPassword = this.backendService.getData().password;

    this.httpClient.get<any>(this.backendService.getAllUsers).subscribe(userdata => {
      this.allUsers = userdata;
      console.log(this.allUsers);
    });
    this.httpClient.get<any>(this.backendService.getAllAdmins).subscribe(admindata => {
      this.allAdmins = admindata;
      console.log(this.allAdmins);
    });

    this.httpClient.get<any>(this.backendService.getAllCourses).subscribe(coursesrdata => {
      this.allCourses = coursesrdata;
      console.log(this.allCourses);
    });
  }

  homePage() {
    this.router.navigate([`${'login'}`]);
  }
  displayUser() {
    this.ifAdmin=true;
    this.ifUser=true;
    this.searchStatus=false;
    this.ifDelete=true;
    console.log(this.getId);
    this.backendService.getUserDetailsById(this.getId).subscribe(details => {
      if(!details){
        this.searchStatus=true;
        this.ifAdmin=false;
        this.ifUser=false;
        this.ifDelete=false;
      }
      this.backendService.setData(details);
      console.log(details);
      console.log("getting datails from backend service " + this.backendService.getData().firstName);
      this.showID = this.backendService.getData().userId;
      this.showFirstName = this.backendService.getData().firstName;
      this.showLastName = this.backendService.getData().lastName;
      this.showRole = this.backendService.getData().role;
      this.showEmail = this.backendService.getData().email;
      if(this.showRole=='admin'){
        this.ifAdmin=false;
      }else{
        this.ifUser=false;
      }
    });
  }
  updateRoleToAdmin() {
    console.log(this.backendService.getData());
    this.httpClient.put<any>(this.backendService.upDateUser, {
      userId: this.backendService.getData().userId,
      firstName: this.backendService.getData().firstName,
      lastName: this.backendService.getData().lastName,
      role: "admin",
      email: this.backendService.getData().email,
      password: this.backendService.getData().password
    }).subscribe(data => {
      console.log(data);
      this.homePage();
    });
  }
  updateRoleToUser() {
    console.log(this.backendService.getData());
    this.httpClient.put<any>(this.backendService.upDateUser, {
      userId: this.backendService.getData().userId,
      firstName: this.backendService.getData().firstName,
      lastName: this.backendService.getData().lastName,
      role: "user",
      email: this.backendService.getData().email,
      password: this.backendService.getData().password
    }).subscribe(data => {
      console.log(data);
      this.homePage();
    });
  }

  deleteMember(){
    console.log(this.getId);
    this.backendService.deleteUserById(this.getId).subscribe(details => {
      this.homePage();
    });
  }
  
  deleteCourse(){
    this.CourseStatus=false;
    console.log(this.getcId);
    this.backendService.getCourseDetailsById(this.getcId).subscribe(details => {
      if(details ==null){
        this.CourseStatus=true;
      }else{
        this.backendService.deleteCourseById(this.getcId).subscribe(details => {
          this.homePage();
      });
      }
    });

    
  }

  addCourse(){
    console.log(this.backendService.getData());
    this.httpClient.post<any>(this.backendService.addCourses, {
      courses: this.getcourses,
      status: "live"
    }).subscribe(data => {
      console.log(data);
      this.homePage();
    });
  }

  updateCourseStatus(){
    this.CourseStatus=false;
    this.backendService.getCourseDetailsById(this.getCourseId).subscribe(details => {
     if(details ==null){
       this.CourseStatus=true;
     }
      this.backendService.setcoursesData(details);
      console.log(details);
      this.httpClient.put<any>(this.backendService.updateCoursesStatus, {
        cId: this.backendService.getcoursesData().cId,
        courses:this.backendService.getcoursesData().courses,
        status: "live"
      }).subscribe(data => {
        console.log(data);
        this.homePage();
      });

    });

  }
}