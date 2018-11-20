/**
 * High Intensity General Conditioning Component
 */

import { Component } from '@angular/core'
import { WorkoutService } from '../../services'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-hgc-block',
    templateUrl: './hgc-block.component.html',
    styleUrls: ['./hgc-block.component.scss']
})
export class HighIntensityGCComponent extends TrainingBlockComponent {

    constructor(ws: WorkoutService) {
        super(ws)
    }

    ngOnInit() {}
    
}
