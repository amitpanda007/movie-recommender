import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "login",
  templateUrl: "login.component.html",
  styleUrls : ["login.compoennt.scss"]
})
export class LoginComponent implements OnInit{
  private loginForm;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm.value);
  }

}
