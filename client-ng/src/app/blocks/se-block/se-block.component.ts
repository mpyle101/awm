/**
 * Strength Endurance Component
 */

import { Component } from '@angular/core'
import { WorkoutService } from '../../services'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-se-block',
    templateUrl: './se-block.component.html',
    styleUrls: ['./se-block.component.scss']
})
export class StrengthEnduranceComponent extends TrainingBlockComponent {

    constructor(ws: WorkoutService) {
        super(ws)
    }

    ngOnInit() {}
    
}
