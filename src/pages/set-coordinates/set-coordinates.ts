import { Component, OnInit } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

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

    constructor(private viewCtrl: ViewController,
                private navParams: NavParams) {}

    ngOnInit() {
        let receivedLatitude = this.navParams.get('latitude');
        let receivedLongitude = this.navParams.get('longitude');
        if (receivedLatitude) {
            this.latitude = receivedLatitude;
            this.longitude = receivedLongitude;
            this.marker = {
                latitude: receivedLatitude,
                longitude: receivedLongitude,
                draggable: true
            }
        } else {
            this.latitude = 57.28;
            this.longitude = -2.58;
        }
    }

    onCancel() {
        this.viewCtrl.dismiss();
    }

    onMapClicked($event) {
        this.marker = {
            latitude: $event.coords.lat,
            longitude: $event.coords.lng,
            draggable: true
        };
    }

    onSave() {
        this.viewCtrl.dismiss({
            latitude: this.marker.latitude,
            longitude: this.marker.longitude
        });
    }

}