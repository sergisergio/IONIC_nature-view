import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewViewPage } from './new-view';

@NgModule({
  declarations: [
    NewViewPage,
  ],
  imports: [
    IonicPageModule.forChild(NewViewPage),
  ],
})
export class NewViewPageModule {}
