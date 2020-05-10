import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule, MatButtonModule, MatCardModule, MatToolbarModule, MatDialogModule,
  MatFormFieldModule, MatInputModule, MatMenuModule, MatBadgeModule, MatProgressSpinnerModule, MatSlideToggleModule, MatExpansionModule, MatIconModule, MatPaginatorModule } from '@angular/material';


import { CapitalizePipe } from './capitalize.pipe';
import { DefaultPipe } from './default.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, CapitalizePipe, DefaultPipe, MatSnackBarModule, MatButtonModule, MatCardModule, MatToolbarModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatMenuModule, MatBadgeModule, MatProgressSpinnerModule, MatSlideToggleModule, MatExpansionModule, MatIconModule,
    MatPaginatorModule],
  declarations: [CapitalizePipe, DefaultPipe]
})
export class SharedModule {}
