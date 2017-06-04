import { NgModule } from '@angular/core';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';
import { HomeService } from './services/home.service';

import { HomePage } from './pages/home';
import {LifestoreDetail} from "./pages/lifestore-detail";
import {LifestoreList} from "./pages/lifestore-list";


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HomePage,
    LifestoreDetail,
    LifestoreList
  ],
  entryComponents: [
    HomePage,
    LifestoreDetail,
    LifestoreList
  ],
  providers: [
    HomeService,
  ],
  exports: [
  ],
})
export class HomeModule {
  constructor(
    public heyApp: AppService
  ) {

    this.subscribeEvents();
  }

  // Subscribe events
  subscribeEvents() {
  }
}
