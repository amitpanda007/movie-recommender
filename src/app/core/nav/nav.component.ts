import { Component, OnInit } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: "nav",
  templateUrl: "nav.component.html",
  styleUrls: ["nav.component.scss"]
})
export class NavComponent implements OnInit{
  authenticated: boolean;

  constructor(private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    this.auth.subscribe(
      (authenticated) => {
        this.authenticated = authenticated;
      });
  }

  openLogin() {
    this.router.navigate(['/login']);
  }

  openRegister() {
    this.router.navigate(['/register']);
  }

  openMovies() {
    this.router.navigate(['/movies']);
  }
}
