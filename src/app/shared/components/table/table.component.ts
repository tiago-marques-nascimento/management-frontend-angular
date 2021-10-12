import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from '../../services/confimation/confirmation.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  columns: {label: string, value: string, length: string}[] = [];

  @Input()
  list: any[] = [];

  @Input()
  view: Subject<any> | undefined;

  @Input()
  edit: Subject<any> | undefined;

  @Input()
  remove: Subject<any> | undefined;

  constructor(private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
  }

  beforeRemove(item: any): void {
    this.confirmationService.triggerOpen();
    this.confirmationService.getConfirmation().subscribe(resposta => {
      if (resposta) {
        this.triggerRemove(item);
      }
    });
  }

  triggerView(item: any): void {
    if (this.view) {
      this.view.next(item);
    }
  }

  triggerEdit(item: any): void {
    if (this.edit) {
      this.edit.next(item);
    }
  }

  triggerRemove(item: any): void {
    if (this.remove) {
      this.remove.next(item);
    }
  }
}
