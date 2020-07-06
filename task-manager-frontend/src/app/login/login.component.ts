import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { NotificationService } from '../common/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  mouseOverLoginButton: boolean = false;
  message: string;

  constructor(private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService
    ) { }

  ngOnInit() {}

  login(formValues){
    this.authService.login(formValues).subscribe(
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

  goToRegister(){
    this.router.navigate(['register']);
  }

}
