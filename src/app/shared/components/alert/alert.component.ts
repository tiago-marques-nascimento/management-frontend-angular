import { Component, OnInit } from '@angular/core';
import { AlertService, Alert } from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  static readonly ALERT_TIMEOUT: number = 3000;

  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.getAlert().subscribe(alert => {
      this.alerts.push(alert);
      const component = this;
      setTimeout(() => {
        component.alerts.splice(component.alerts.indexOf(alert), 1);
      }, AlertComponent.ALERT_TIMEOUT);
    });
  }
}
