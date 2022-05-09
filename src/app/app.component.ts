import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testing2';
  logoutButton=false;
  registerButton=true;
  loginButton=true;
  toggle = true;
  status = 'Enable'; 
  

  constructor(private router:Router){}

  goToLogin(login:string):void{
    this.router.navigate([`${login}`]);
    this.logoutButton=false;
    this.registerButton=false;
    this.loginButton=false;
  }

  goToRegister(register:string):void{
    this.router.navigate([`${register}`]);
    this.logoutButton=false;
    this.registerButton=false;
    this.loginButton=false;
  }
  
  enableDisableRule() {
    this.toggle = !this.toggle;
    this.status = this.toggle ? 'Enable' : 'Disable';
  }
}
