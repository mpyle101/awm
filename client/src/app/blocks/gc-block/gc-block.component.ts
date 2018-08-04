/**
 * General Conditioning Component
 */

import { Component } from '@angular/core'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-gc-block',
    templateUrl: './gc-block.component.html',
    styleUrls: ['./gc-block.component.scss']
})
export class GeneralConditionComponent extends TrainingBlockComponent {

    constructor() {
        super()
    }

    ngOnInit() {}

}
