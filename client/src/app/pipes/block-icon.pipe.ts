/**
 * Pipe to format a time duration.
 */

import { Pipe, PipeTransform } from '@angular/core'
import { WorkoutService } from '../services'

@Pipe({
    name: 'blockIcon'
})
export class BlockIconPipe implements PipeTransform {

    constructor(private ws: WorkoutService) {}

    transform(item): string {
        return this.ws.getIcon(item.type)
    }
}