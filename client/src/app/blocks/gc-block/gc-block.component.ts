/**
 * General Conditioning Component
 */

import { Component } from '@angular/core'
import { WorkoutService } from '../../services'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-gc-block',
    templateUrl: './gc-block.component.html',
    styleUrls: ['./gc-block.component.scss']
})
export class GeneralConditionComponent extends TrainingBlockComponent {

    constructor(ws: WorkoutService) {
        super(ws)
    }

    ngOnInit() {}

    public get icon() {
        return this.block.key ? this.block.key : 'RUN'
    }
}
