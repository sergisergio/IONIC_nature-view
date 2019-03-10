import { NatureView } from '../models/NatureView.model';
import { Subject } from 'rxjs/Subject';

export class NatureViewService {
    private natureViewList: NatureView[] = [];
    natureviewList$ = new Subject<NatureView[]>();

    emitList() {
        this.natureviewList$.next(this.natureViewList);
    }

    addNatureView(view: NatureView) {
        this.natureViewList.push(view);
        this.emitList();
    }
}