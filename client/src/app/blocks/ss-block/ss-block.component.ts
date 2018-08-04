/**
 * Super Sets Component
 */

import { Component } from '@angular/core'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-ss-block',
    templateUrl: './ss-block.component.html',
    styleUrls: ['./ss-block.component.scss']
})
export class SuperSetComponent extends TrainingBlockComponent {

    constructor() {
        super()
    }

    ngOnInit() {}
    
}
