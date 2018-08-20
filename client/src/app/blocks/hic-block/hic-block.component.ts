/**
 * High Intensity General Conditioning
 */

import { Component } from '@angular/core'
import { DurationPipe } from '../../pipes'
import { WorkoutService } from '../../services'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-hic-block',
    templateUrl: './hic-block.component.html',
    styleUrls: ['./hic-block.component.scss'],
    providers: [DurationPipe]
})
export class HighIntensityComponent extends TrainingBlockComponent {

    public _work: string

    constructor(ws: WorkoutService, private duration: DurationPipe) {
        super(ws)
    }

    get work() {
        if (this._work === undefined && this.block.work) {
            const work = this.block.work
            if (this.block.style == 'INT') {
                const duration = this.duration.transform(work[0].reps)
                this._work = `${work.length}x${duration}`
            } else {
                this._work = this.duration.transform(work)
            }   
        }

        return this._work
    }
    
}
