import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleViewPage } from './single-view';

@NgModule({
  declarations: [
    SingleViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleViewPage),
  ],
})
export class SingleViewPageModule {}
