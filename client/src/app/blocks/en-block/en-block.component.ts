/**
 * General Endurance Component
 */

import { Component } from '@angular/core'
import { WorkoutService } from '../../services'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-en-block',
    templateUrl: './en-block.component.html',
    styleUrls: ['./en-block.component.scss']
})
export class EnduranceComponent extends TrainingBlockComponent {

    constructor(ws: WorkoutService) {
        super(ws)
    }

    ngOnInit() {}

    public get meta() {
        let meta = this.block.met
        if (this.block.meta) {
            meta = this.block.meta.toLowerCase()
            meta = meta[0].toUpperCase() + meta.slice(1)
        }

        return meta
    }

    public get icon() {
        if (this.block.meta) {
            if (typeof this.block.meta === 'string') {
                return this.block.meta.toUpperCase()
            } else {
                return this.block.key.toUpperCase()
            }
        } else {
            return 'BIKE'
        }
    }
}
