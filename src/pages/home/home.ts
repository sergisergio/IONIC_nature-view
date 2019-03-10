import { Component, OnDestroy, OnInit } from '@angular/core';
import { NatureView } from '../../models/NatureView.model';
import { Subscription } from 'rxjs/Subscription';
import { NatureViewService } from '../../services/natureView.service';
import {NewViewPage} from "../new-view/new-view";
import {SingleViewPage} from "../single-view/single-view";
import {NavController} from "ionic-angular";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

    natureViewList: NatureView[];
    natureViewListSubscription: Subscription;
    newViewPage = NewViewPage;

    constructor(private natureViewService: NatureViewService,
                private navCtrl: NavController) {

    }

    ngOnInit() {
        this.natureViewListSubscription = this.natureViewService.natureviewList$.subscribe(
            (natureViews: NatureView[]) => {
                this.natureViewList = natureViews;
            }
        );
        this.natureViewService.emitList();
    }

    onLoadNatureView(view: NatureView) {
        this.navCtrl.push(SingleViewPage, {natureView: view});
    }

    ngOnDestroy() {
        this.natureViewListSubscription.unsubscribe();
    }

}
