import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '../../services/confimation/confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  visible = false;

  constructor(private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.confirmationService.getOpen().subscribe(() => {
      this.open();
    });
  }

  yes(): void {
    this.confirmationService.triggerYes();
    this.close();
  }

  no(): void {
    this.confirmationService.triggerNo();
    this.close();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
