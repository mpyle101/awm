/**
 * High Intensity General Conditioning
 */

import { Component } from '@angular/core'
import { DurationPipe } from '../../pipes'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-hic-block',
    templateUrl: './hic-block.component.html',
    styleUrls: ['./hic-block.component.css'],
    providers: [DurationPipe]
})
export class HighIntensityComponent extends TrainingBlockComponent {

    public work: string

    constructor(private duration: DurationPipe) {
        super()
    }

    ngOnInit() {
        const work = this.block.work
        if (this.block.style == 'INT') {
            const duration = this.duration.transform(work[0].reps)
            this.work = `${work.length}x${duration}`
        } else {
            this.work = this.duration.transform(work)
        }
    }
    
}
