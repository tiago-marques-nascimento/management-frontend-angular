import {ControlValueAccessor} from '@angular/forms';

export class ValueAccessorBase<T> implements ControlValueAccessor {
    private innerValue: T | undefined;

    private changed = new Array<(value: T | undefined) => void>();
    private touched = new Array<() => void>();

    get value(): T | undefined {
        return this.innerValue;
    }

    set value(value: T | undefined) {
        if (this.innerValue !== value) {
            this.innerValue = value;
            this.changed.forEach(f => f(value));
        }
    }

    touch(): void {
        this.touched.forEach(f => f());
    }

    writeValue(value: T | undefined): void {
        this.innerValue = value;
    }

    registerOnChange(fn: (value: T | undefined) => void): void {
        this.changed.push(fn);
    }

    registerOnTouched(fn: () => void): void {
        this.touched.push(fn);
    }
}
