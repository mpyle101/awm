import { Injectable } from '@angular/core'

import * as moment from "moment"
import { extendMoment } from 'moment-range'
const { range, rangeFromInterval, rangeFromISOString } = extendMoment(moment)

@Injectable({
    providedIn: 'root'
})
export class MomentRangeService {

    constructor() {}

    create(start, end?) {
        return range(start, end)
    }

    fromInterval(interval, count, date) {
        return rangeFromInterval(interval, count, date)
    }

    fromISOString(interval) {
        return rangeFromISOString(interval)
    }

}
