import { Component, OnInit } from '@angular/core';

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls : ["./login.compoennt.scss"]
})
export class LoginComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {

  }

  login(loginData) {
    console.log(loginData);
  }

}
