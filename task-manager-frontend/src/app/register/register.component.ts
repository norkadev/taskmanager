import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { NotificationService } from '../common/notification.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  mouseOverRegisterButton: boolean = false;

  constructor(
      private router: Router,
      private authService: AuthService,
      private tokenStorage: TokenStorageService,
      private notificationService: NotificationService
  ) { }

  ngOnInit() {  }

  register(formValues){
    console.log("Inside register!!");
    this.authService.register(formValues).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token.token);
        this.tokenStorage.saveUser(data.user);
        this.router.navigate(['dashboard']);
      },
      err => {
        this.notificationService.showError("An error has ocurred: "+err.error.message, "Error");
      }
    );
  }

  goToLogin() {
    this.router.navigate(['home']);
  }

}
