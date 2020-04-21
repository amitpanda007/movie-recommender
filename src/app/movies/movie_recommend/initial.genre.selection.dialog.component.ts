import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'genre-setup',
  template: `
  <h1 mat-dialog-title>Thanks for Logging In !</h1>
    <div mat-dialog-content>
      <p>For us to know your preferrences, Please choose <b>5</b> genres shown on the page to get better <b>Recommendation</b></p>
    </div>
    <div mat-dialog-actions>
      <!-- <button mat-button (click)="onNoClick()">No Thanks</button> -->
      <button class="btn" mat-button [mat-dialog-close]="OK" cdkFocusInitial>Ok</button>
    </div>
    `,
  styles: ['.btn {background-color: pink;}']
})
export class InitialGenreSelectionDialogComponent {


}
