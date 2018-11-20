/**
 * Pipe to format a time duration.
 */

import { Pipe, PipeTransform } from '@angular/core'
import * as moment from 'moment'
import 'moment-duration-format'

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: string): string {
        const duration = moment.duration(value)
        return (duration as any).format(() => {
            return duration.asMinutes() > 59 ? 'h:mm' : 'm[m]'
        })
    }
}