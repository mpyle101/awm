import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import * as moment from 'moment'

@Injectable({
    providedIn: 'root'
})
export class CurrentDateService {

    private subject = new BehaviorSubject(moment())

    connect() {
        return this.subject.asObservable()
    }

    next(date) {
        // Hack to get around ExpressionChangedAfterItHasBeenCheckedError
        // This creates a mirotask which is not evaluated until the current
        // change detection cycle is done which gets us out of updating a
        // parent component during the current cycle and causing an ECAIHBCE.
        Promise.resolve(null).then(() => this.subject.next(date))
    }

}
