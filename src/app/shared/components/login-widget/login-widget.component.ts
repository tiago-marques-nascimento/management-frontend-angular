import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { JwtService } from '../../services/jwt/jwt.service';

@Component({
  selector: 'app-loginwidget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent implements OnInit {

  login = false;
  subject = '';

  constructor(private jwtService: JwtService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.jwtService.getLogin().subscribe(login => {
      if (login) {
        this.login = true;
        this.subject = this.jwtService.subject;
      } else {
        this.login = false;
        this.alertService.triggerSuccess('Successful logout attempt');
      }
    });
  }

  logout(): void {
    this.jwtService.logout();
  }
}
