/**
 * Pipe to format a time duration.
 */

import { Pipe, PipeTransform } from '@angular/core'
import { WorkoutService } from '../services'

@Pipe({
    name: 'blockIcon'
})
export class BlockIconPipe implements PipeTransform {

    private icons = {
        BIKE: 'directions_bike',
        HIKE: 'directions_walking',
        ROW:  'rowing',
        RUCK: 'transfer_within_a_station',
        RUN:  'directions_running'
    }

    constructor(private ws: WorkoutService) {}

    transform(item): string {
        let icon
        if (item.type == 'EN') {
            if (item.meta) {
                if (typeof item.meta === 'string') {
                    icon = item.meta.toUpperCase()
                } else {
                    icon = item.key.toUpperCase()
                }

                icon = this.icons[icon]
            }
        } else if (item.type == 'GC') {
            if (item.key) {
                icon = this.icons[item.key]
            }
        }

        return icon ? icon : this.ws.getIcon(item.type)
    }
}

