import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ModalController} from "ionic-angular";
import {SetCoordinatesPage} from "../set-coordinates/set-coordinates";

@Component({
    selector: 'page-new-view',
    templateUrl: 'new-view.html',
})
export class NewViewPage implements OnInit {

    natureViewForm: FormGroup;
    latitude: number;
    longitude: number;
    imageUrl: string;

    constructor(private formBuilder: FormBuilder,
                private modalCtrl: ModalController) {
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.natureViewForm = this.formBuilder.group({
            name: ['', Validators.required],
            date: [new Date().toISOString(), Validators.required],
            description: ['']
        });
    }

    onOpenCoordsModal() {
        let modal = this.modalCtrl.create(SetCoordinatesPage);
        modal.present();
    }
}
