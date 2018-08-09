/**
 * Super Sets Component
 */

import { Component } from '@angular/core'
import { WorkoutService } from '../../services'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-ss-block',
    templateUrl: './ss-block.component.html',
    styleUrls: ['./ss-block.component.scss']
})
export class SuperSetComponent extends TrainingBlockComponent {

    constructor(ws: WorkoutService) {
        super(ws)
    }

    ngOnInit() {}
    
}
