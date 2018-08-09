/**
 * Day Off
 */

import { Component } from '@angular/core'
import { WorkoutService } from '../../services'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-off-block',
    templateUrl: './off-block.component.html',
    styleUrls: ['./off-block.component.scss']
})
export class DayOffComponent extends TrainingBlockComponent {

    constructor(ws: WorkoutService) {
        super(ws)
    }

    ngOnInit() {}
    
}
