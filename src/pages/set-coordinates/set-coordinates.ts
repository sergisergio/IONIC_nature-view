import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-set-coordinates',
    templateUrl: 'set-coordinates.html',
})
export class SetCoordinatesPage implements OnInit {

    latitude: number;
    longitude: number;
    marker: {
        latitude: number,
        longitude: number,
        draggable: true
    };

    constructor(private viewCtrl: ViewController) {}

    ngOnInit() {
        this.latitude = 57.28;
        this.longitude = -2.58;
    }

    onCancel() {
        this.viewCtrl.dismiss();
    }

}