import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {NatureView} from "../../models/NatureView.model";

@IonicPage()
@Component({
  selector: 'page-single-view',
  templateUrl: 'single-view.html',
})
export class SingleViewPage implements OnInit {

  natureView: NatureView;

  constructor(private navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleViewPage');
  }

  ngOnInit() {
      this.natureView = this.navParams.get('natureView');
  }
}
