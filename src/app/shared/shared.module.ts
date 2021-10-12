import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TableComponent } from './components/table/table.component';
import { GenericHttpInterceptor } from './http/generic-http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginWidgetComponent } from './components/login-widget/login-widget.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    declarations: [
        CheckboxComponent,
        AlertComponent,
        ConfirmationComponent,
        TableComponent,
        LoadingComponent,
        LoginWidgetComponent
    ],
    exports: [
        CheckboxComponent,
        AlertComponent,
        ConfirmationComponent,
        TableComponent,
        LoadingComponent,
        LoginWidgetComponent
    ],
    imports: [CommonModule, FormsModule],
    providers: [
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: GenericHttpInterceptor, multi: true }
    ]
})
export class SharedModule { }
