import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './util/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { SimpleModalComponent } from './common/simpleModal.component';
import { ModalTriggerDirective } from './common/modalTrigger.directive';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    TasklistComponent,
    CreateTaskComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    EditTaskComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    NgSelectModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
