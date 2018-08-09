/**
 * Pipe to format a time duration.
 */

import { Pipe, PipeTransform } from '@angular/core'
import { WorkoutService } from '../services'

@Pipe({
    name: 'blockLabel'
})
export class BlockLabelPipe implements PipeTransform {

    constructor(private ws: WorkoutService) {}

    transform(item): string {
        return this.ws.getLabel(item.type)
    }
}