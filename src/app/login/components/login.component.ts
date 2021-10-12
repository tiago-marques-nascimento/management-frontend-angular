import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/shared/services/jwt/jwt.service';
import { AlertService } from '../../shared/services/alert/alert.service';
import { Login } from '../models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();

  constructor(
    private router: Router,
    private alertService: AlertService,
    private jwtService: JwtService,
    private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  loginAction(): void {
    if (!this.login.name || !this.login.password) {
      this.alertService.triggerError('Please provide a name and a password');
    } else {
      this.loginService.login(this.login).subscribe(token => {
        this.jwtService.login(token);
        this.alertService.triggerSuccess('You\'ve succesfully logged into User Management! :)');
        this.router.navigate(['/home']);
      }, error => {
        this.alertService.triggerError('Authentication failure');
      });
    }
  }
}
