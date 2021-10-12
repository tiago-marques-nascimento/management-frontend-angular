import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../value-accessor.base';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: CheckboxComponent, multi: true}]
})
export class CheckboxComponent extends ValueAccessorBase<boolean[]> implements OnInit {

  @Input()
  multipleSelection = false;

  @Input()
  options: {label?: string, image?: string}[] = [];

  @Input()
  disabled = false;

  @Output()
  checkboxClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  select(index: number): void {
    if (this.value) {
      if (!this.disabled) {
        if (!this.multipleSelection) {
          for (let n = 0; n < this.value.length; n++) {
            this.value[n] = false;
          }
        }
        this.value[index] = true;
        this.emitClick();
      }
    }
  }

  deselect(index: number): void {
    if (this.value) {
      if (!this.disabled) {
        this.value[index] = false;
        this.emitClick();
      }
    }
  }

  private emitClick(): void {
    this.checkboxClick.emit();
  }
}
