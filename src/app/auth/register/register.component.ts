import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  moduleId: module.id,
  selector: "register",
  templateUrl: "register.component.html",
  styleUrls : ["register.compoennt.scss"]
})
export class RegisterComponent implements OnInit{
  private registerForm;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = fb.group({
      firstName: 'Amit',
      lastName: 'Panda',
      userName: 'amitpanda007',
      email: 'amitpanda007@gmail.com',
      password: 'perfect007',
      confirmPassword: 'perfect007'
    });
  }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value);
  }

}
