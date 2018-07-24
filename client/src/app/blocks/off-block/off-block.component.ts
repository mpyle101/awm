/**
 * Day Off
 */

import { Component } from '@angular/core'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-off-block',
    templateUrl: './off-block.component.html',
    styleUrls: ['./off-block.component.css']
})
export class DayOffComponent extends TrainingBlockComponent {

    constructor() {
        super()
    }

    ngOnInit() {}
    
}
