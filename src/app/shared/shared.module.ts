import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CapitalizePipe } from './capitalize.pipe';
import { DefaultPipe } from './default.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, CapitalizePipe, DefaultPipe],
  declarations: [CapitalizePipe, DefaultPipe]
})
export class SharedModule {}
