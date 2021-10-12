import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  counter = 0;

  constructor(private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.getLoading().subscribe(increment => {
      this.counter += increment;
    });
  }
}
