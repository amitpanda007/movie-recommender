import { NgModule, SkipSelf, Optional } from "@angular/core";
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';
import { CacheService } from './services/cache.service';
import { LocalStorageService } from './services/local.storage.service';
import { MovieService } from './services/movie.service';
import { MovieRecommendService } from './services/movie.recommend.service';
import { UserService } from './services/user.service';
import { EnsureModuleLoadedOnceGuard } from './services/ensure-module-loaded-once.guard';
import { NavComponent } from './nav/nav.component';


@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [NavComponent],
  declarations: [NavComponent],
  providers: [AuthService, CacheService, LocalStorageService, MovieService, MovieRecommendService, UserService]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard{
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
