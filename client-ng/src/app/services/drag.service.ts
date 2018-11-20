import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class DragService {

    private _zone: string

    set zone(value) {
        this._zone = value
    }

    accepts(zone) {
         return this._zone ? zone == this._zone : true
    }

}
