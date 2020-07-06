import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service'
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
    ) { }

  ngOnInit() {
    this.currentUser = this.tokenStorageService.getUserEmail();
  }

  logout(){
    this.tokenStorageService.signOut();
    this.router.navigate(['home']);
  }

}
