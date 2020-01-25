import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "register",
  templateUrl: "register.component.html",
  styleUrls : ["register.compoennt.scss"]
})
export class RegisterComponent implements OnInit{
  private registerForm;

  constructor(private fb: FormBuilder) {
    this.registerForm = fb.group({
      fullName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.value);
  }

}
