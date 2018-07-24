/**
 * High Intensity General Conditioning Component
 */

import { Component } from '@angular/core'
import { TrainingBlockComponent } from '../training-block.component'

@Component({
    selector: 'awm-hgc-block',
    templateUrl: './hgc-block.component.html',
    styleUrls: ['./hgc-block.component.css']
})
export class HighIntensityGCComponent extends TrainingBlockComponent {

    constructor() {
        super()
    }

    ngOnInit() {}
    
}
