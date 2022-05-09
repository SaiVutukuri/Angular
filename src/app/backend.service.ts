import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BackendService {
// loginURL=" http://35.230.79.86:80/user/login";
loginURL=" http://localhost:8080/user/login";
registerURL="http://localhost:8080/user";
getAllAdmins="http://localhost:8080/user/role/admin";
getAllUsers= "http://localhost:8080/user/role/user";
upDateUser=" http://localhost:8080/user/updateuser";
getAllCourses="http://localhost:8080/courses";
addCourses="http://localhost:8080/courses";
getStatusByLive="http://localhost:8080/courses/status/live";
updateCoursesStatus="http://localhost:8080/courses/updatestatus";
  constructor(private httpClient:HttpClient) { }

  private message:any;
  private coursesData:any;

  setData(data:any){
    this.message = data;
    console.log(this.message);
  }

  getData(){
    console.log(this.message);
    return this.message;
  }

  setcoursesData(data:any){
    this.coursesData = data;
    console.log(this.coursesData);
  }

  getcoursesData(){
    console.log(this.coursesData);
    return this.coursesData;
  }

  getUserDetailsById(id:number){
    return this.httpClient.get("http://localhost:8080/user/"+id);
  }

  deleteUserById(id:number){
    return this.httpClient.delete("http://localhost:8080/user/"+id);
  }

  getCourseDetailsById(id:number){
    return this.httpClient.get("http://localhost:8080/courses/"+id);
  }

  deleteCourseById(id:number){
    return this.httpClient.delete("http://localhost:8080/courses/"+id);
  }

}
