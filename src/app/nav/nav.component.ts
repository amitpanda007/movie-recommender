import { Component } from "@angular/core";
import { AuthService } from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: "nav",
  templateUrl: "nav.component.html",
  styleUrls: ["nav.component.scss"]
})
export class NavComponent {

  constructor(private auth: AuthService){}

}
